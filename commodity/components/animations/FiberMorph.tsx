"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { SHIRT_BOX, SHIRT_PATH, TShirt } from "@/components/ui/TShirt";
import { RichText } from "@/components/ui/RichText";
import type { IntroContent } from "@/content/schema";

/**
 * FR-13 — Cảnh biến đổi Bông → Sợi → Vải → Áo bằng hạt Canvas 2D, đồng bộ vị trí cuộn.
 *
 * Mỗi hạt có một vị trí đích ở từng pha. Các tập đích được sắp theo trục x để hạt
 * di chuyển liền mạch (không bay chéo màn hình). Cuộn xuôi/ngược chạy xuôi/ngược.
 */

type Phase = IntroContent["morphCaptions"][number]["phase"];
const PHASES: Phase[] = ["cotton", "thread", "fabric", "shirt"];
const PHASE_LABEL: Record<Phase, string> = { cotton: "Bông", thread: "Sợi", fabric: "Vải", shirt: "Áo" };

/* Mốc giữ – chuyển: [giữ bông][chuyển][giữ sợi][chuyển][giữ vải][chuyển][giữ áo] */
const STOPS = [0, 0.1, 0.3, 0.38, 0.58, 0.66, 0.86, 1];

/** tiến trình cuộn p ∈ [0,1] → pha thực f ∈ [0,3], có các đoạn giữ để kịp đọc */
function phaseAt(p: number): number {
  for (let k = 0; k < 3; k++) {
    const holdEnd = STOPS[k * 2 + 1];
    const moveEnd = STOPS[k * 2 + 2];
    if (p <= holdEnd) return k;
    if (p <= moveEnd) return k + (p - holdEnd) / (moveEnd - holdEnd);
  }
  return 3;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Targets = Float32Array; // [x0,y0,x1,y1,…]

function buildTargets(W: number, H: number, N: number, ctx: CanvasRenderingContext2D): Targets[] {
  const r = mulberry32(7);
  const gauss = () => {
    const u = 1 - r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const S = Math.min(W, H);
  const cx = W / 2;
  const cy = H / 2;

  /* ── Bông: một quả bông 5 múi + sợi tơ bay lơ thơ ── */
  const cotton: [number, number][] = [];
  // mỗi múi là một khối xốp tròn, mép mềm; 5 múi xếp quanh tâm như quả bông nở
  const lobe = S * 0.085;
  const lobes = Array.from({ length: 5 }, (_, k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
    return [cx + Math.cos(a) * lobe * 1.25, cy + Math.sin(a) * lobe * 1.15];
  });
  for (let i = 0; i < N; i++) {
    const roll = r();
    if (roll < 0.05) {
      // sợi tơ bay lơ thơ quanh quả bông
      const a = r() * Math.PI * 2;
      const d = lobe * (2.4 + r() * 1.4);
      cotton.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.85]);
    } else if (roll < 0.1) {
      // đài hoa sẫm ở giữa
      cotton.push([cx + gauss() * lobe * 0.18, cy + gauss() * lobe * 0.18]);
    } else {
      const [lx, ly] = lobes[Math.floor(r() * 5)];
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * lobe * (0.95 + gauss() * 0.06);
      cotton.push([lx + Math.cos(a) * d, ly + Math.sin(a) * d]);
    }
  }

  /* ── Sợi: 7 sợi xe đôi nằm ngang ── */
  const thread: [number, number][] = [];
  const strands = 7;
  const gap = S * 0.045;
  const x0 = W * 0.1;
  const x1 = W * 0.9;
  for (let i = 0; i < N; i++) {
    const k = i % strands;
    const t = r();
    const x = x0 + t * (x1 - x0);
    const yc = cy + (k - (strands - 1) / 2) * gap;
    const ply = i % 2 === 0 ? 1 : -1;
    const twist = Math.sin(x * 0.045 + k * 1.3) * gap * 0.16 * ply;
    thread.push([x, yc + twist + gauss() * 0.9]);
  }

  /* ── Vải: dệt vân điểm (sợi dọc – sợi ngang đan xen) ── */
  const fabric: [number, number][] = [];
  const side = S * 0.62;
  const cells = 16;
  const cs = side / cells;
  const fx = cx - side / 2;
  const fy = cy - side / 2;
  for (let i = 0; i < N; i++) {
    const ci = Math.floor(r() * cells);
    const cj = Math.floor(r() * cells);
    const t = r() - 0.5;
    const across = gauss() * cs * 0.07;
    const px = fx + (ci + 0.5) * cs;
    const py = fy + (cj + 0.5) * cs;
    if ((ci + cj) % 2 === 0) fabric.push([px + t * cs * 0.95, py + across]);
    else fabric.push([px + across, py + t * cs * 0.95]);
  }

  /* ── Áo: lấy mẫu bên trong đường viền áo dùng chung ── */
  const shirt: [number, number][] = [];
  const scale = Math.min((H * 0.7) / SHIRT_BOX.h, (W * 0.86) / SHIRT_BOX.w);
  const ox = cx - (SHIRT_BOX.w * scale) / 2;
  const oy = cy - (SHIRT_BOX.h * scale) / 2;
  const path = new Path2D();
  path.addPath(new Path2D(SHIRT_PATH), new DOMMatrix([scale, 0, 0, scale, ox, oy]));
  let guard = 0;
  while (shirt.length < N && guard < N * 40) {
    guard++;
    const x = ox + r() * SHIRT_BOX.w * scale;
    const y = oy + r() * SHIRT_BOX.h * scale;
    if (ctx.isPointInPath(path, x, y)) shirt.push([x, y]);
  }
  while (shirt.length < N) shirt.push([cx, cy]);

  return [cotton, thread, fabric, shirt].map((set) => {
    set.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const out = new Float32Array(N * 2);
    set.forEach(([x, y], i) => {
      out[i * 2] = x;
      out[i * 2 + 1] = y;
    });
    return out;
  });
}

export function FiberMorph({ captions }: { captions: IntroContent["morphCaptions"] }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shirtRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const el = stage.current;
    if (!canvas || !el) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);

    let W = 0;
    let H = 0;
    let dpr = 1;
    let N = 0;
    let targets: Targets[] = [];
    let size = new Float32Array(0);
    let alpha = new Float32Array(0);
    let delay = new Float32Array(0);
    let progress = isReduced ? 1 : 0;
    let shown = progress;
    let visible = true;
    let lastPhase = -1;

    const setup = () => {
      const rect = el.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      N = W < 768 ? 1400 : 3200;
      const r = mulberry32(42);
      size = Float32Array.from({ length: N }, () => 0.6 + r() * 1.25);
      alpha = Float32Array.from({ length: N }, () => 0.35 + r() * 0.6);
      delay = Float32Array.from({ length: N }, () => r() * 0.35);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      targets = buildTargets(W, H, N, ctx);
    };
    setup();

    const draw = (time: number) => {
      if (!visible || N === 0) return;
      shown += (progress - shown) * 0.14; // làm mượt bánh xe chuột
      const f = phaseAt(shown);
      const seg = Math.min(Math.floor(f), 2);
      const t = f - seg;
      const A = targets[seg];
      const B = targets[seg + 1];
      const fluff = Math.max(0, 1 - f) * 2.2 + 0.25; // bông xốp rung nhiều hơn

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // ánh sáng studio
      const g = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.max(W, H) * 0.55);
      g.addColorStop(0, "rgba(241,238,231,0.09)");
      g.addColorStop(1, "rgba(241,238,231,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#f1eee7";
      const tt = time * 0.0012;
      for (let i = 0; i < N; i++) {
        const local = Math.min(1, Math.max(0, t * 1.35 - delay[i]));
        const e = easeInOut(local);
        const ax = A[i * 2];
        const ay = A[i * 2 + 1];
        const bx = B[i * 2];
        const by = B[i * 2 + 1];
        // đường cong nhẹ khi di chuyển, để hạt "bay" chứ không trượt thẳng
        const lift = Math.sin(e * Math.PI) * 18 * (((i * 7) % 13) / 13 - 0.5);
        const x = ax + (bx - ax) * e + Math.sin(tt + i) * fluff;
        const y = ay + (by - ay) * e + lift + Math.cos(tt * 0.9 + i * 1.3) * fluff;
        ctx.globalAlpha = alpha[i];
        const s = size[i];
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // áo hoàn chỉnh hiện dần ở cuối pha áo
      const solid = Math.min(1, Math.max(0, (shown - 0.9) / 0.1));
      if (shirtRef.current) shirtRef.current.style.opacity = String(solid);
      canvas.style.opacity = String(1 - solid * 0.85);
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;

      const idx = Math.min(3, Math.round(f));
      if (idx !== lastPhase) {
        lastPhase = idx;
        setPhase(idx);
      }
    };

    gsap.ticker.add(draw);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);

    let st: ScrollTrigger | undefined;
    if (!isReduced) {
      st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (W < 768 ? 2.6 : 3.4)}`,
        pin: stage.current,
        scrub: true,
        onUpdate: (self) => {
          progress = self.progress;
        },
      });
    }

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(draw);
      io.disconnect();
      st?.kill();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  const current = captions.find((c) => c.phase === PHASES[phase]) ?? captions[0];

  return (
    <div ref={root} id="hanh-trinh" className="relative">
      <div ref={stage} className="relative h-[100svh] w-full overflow-hidden bg-ink">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Hoạt ảnh các sợi bông dần trở thành sợi chỉ, tấm vải rồi chiếc áo thun"
          className="absolute inset-0"
        />
        <div
          ref={shirtRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
        >
          <TShirt shadow={false} className="h-[70%] max-w-[86%]" />
        </div>

        {/* Thanh pha: Bông → Sợi → Vải → Áo */}
        <div className="container-cinema absolute inset-x-0 top-20 md:top-24">
          <ol className="flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase md:gap-5">
            {PHASES.map((p, i) => (
              <li key={p} className="flex items-center gap-3 md:gap-5">
                <span className={`transition-colors duration-500 ${i === phase ? "text-bronze" : "text-ivory/35"}`}>
                  {PHASE_LABEL[p]}
                </span>
                {i < PHASES.length - 1 && <span aria-hidden className="text-ivory/25">→</span>}
              </li>
            ))}
          </ol>
          <div aria-hidden className="mt-4 h-px w-full max-w-sm bg-ivory/10">
            <div ref={barRef} className="h-px origin-left bg-bronze" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>

        {/* Chú thích khái niệm theo pha */}
        {!reduced && current && (
          <div className="container-cinema absolute inset-x-0 bottom-10 md:bottom-16" aria-live="polite">
            <div key={current.phase} className="anim-fade max-w-md">
              <p className="eyebrow mb-3 text-bronze">
                {String(phase + 1).padStart(2, "0")} / 04 · {PHASE_LABEL[current.phase]}
              </p>
              <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-600 leading-[1.05] tracking-[-0.02em]">
                {current.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">
                <RichText text={current.body} />
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Giảm chuyển động: hiển thị toàn bộ chú thích dạng danh sách */}
      {reduced && (
        <ol className="container-cinema grid gap-10 py-20 md:grid-cols-4">
          {captions.map((c, i) => (
            <li key={c.phase}>
              <p className="eyebrow mb-3 text-bronze">
                {String(i + 1).padStart(2, "0")} · {PHASE_LABEL[c.phase]}
              </p>
              <h3 className="font-display text-xl font-600">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                <RichText text={c.body} />
              </p>
            </li>
          ))}
        </ol>
      )}
      <noscript>
        <ol className="container-cinema py-20">
          {captions.map((c) => (
            <li key={c.phase} className="mb-6">
              <strong>{c.title}</strong> — <RichText text={c.body} />
            </li>
          ))}
        </ol>
      </noscript>
    </div>
  );
}
