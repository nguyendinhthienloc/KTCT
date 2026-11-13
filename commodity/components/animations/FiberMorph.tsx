"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { SHIRT_BOX, SHIRT_PATH, TShirt } from "@/components/ui/TShirt";
import { RichText } from "@/components/ui/RichText";
import type { IntroContent } from "@/content/schema";

/**
 * FR-13 — Bông → Sợi → Vải → Áo bằng hạt Canvas 2D, đồng bộ vị trí cuộn.
 *
 * TRẠNG THÁI CUỐI (mỗi pha phải nhận ra ngay khi dừng cuộn):
 *   1. Bông  — quả bông nở 5 múi trắng xốp, đài hoa nhọn + cuống + lá màu vàng đồng.
 *   2. Sợi   — 3 sợi xe đôi, vòng xoắn rõ.
 *   3. Vải   — vân điểm: sợi dọc/sợi ngang đan xen.
 *   4. Áo    — hạt lấp kín dáng áo dùng chung, rồi hòa vào áo SVG.
 *
 * CHUYỂN CẢNH MƯỢT:
 *   - Ghép hạt giữa hai hình theo thứ tự đường cong Hilbert (trên khung chuẩn hóa của
 *     từng hình) ⇒ hạt gần nhau vẫn gần nhau, hình "tháo ra rồi dệt lại".
 *   - Giữa chuyển cảnh, hạt bay lượn theo trường xoáy (đỉnh ở giữa, về 0 ở hai đầu).
 *   - Làm mượt cuộn theo thời gian thực (không phụ thuộc FPS). Màu nội suy ngà ↔ đồng.
 */

type Phase = IntroContent["morphCaptions"][number]["phase"];
const PHASES: Phase[] = ["cotton", "thread", "fabric", "shirt"];
const PHASE_LABEL: Record<Phase, string> = { cotton: "Bông", thread: "Sợi", fabric: "Vải", shirt: "Áo" };

/* Mốc giữ – chuyển: [giữ bông][chuyển][giữ sợi][chuyển][giữ vải][chuyển][giữ áo] */
const STOPS = [0, 0.1, 0.3, 0.38, 0.58, 0.66, 0.86, 1];

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

/** smootherstep: đạo hàm bậc 1 và 2 bằng 0 ở hai đầu ⇒ bắt đầu/kết thúc êm */
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** Chỉ số Hilbert của (x, y) trên lưới n×n (n lũy thừa của 2) */
function hilbert(x: number, y: number, n = 1024): number {
  let d = 0;
  for (let s = n >> 1; s > 0; s >>= 1) {
    const rx = (x & s) > 0 ? 1 : 0;
    const ry = (y & s) > 0 ? 1 : 0;
    d += s * s * ((3 * rx) ^ ry);
    if (ry === 0) {
      if (rx === 1) {
        x = n - 1 - x;
        y = n - 1 - y;
      }
      const t = x;
      x = y;
      y = t;
    }
  }
  return d;
}

/** Một điểm đích: vị trí + tỷ lệ màu đồng (0 = ngà, 1 = đồng) + độ sáng */
type Pt = { x: number; y: number; tone: number; lum: number };
type Frame = { pos: Float32Array; tone: Float32Array; lum: Float32Array };

function toFrame(set: Pt[], N: number): Frame {
  // chuẩn hóa theo khung bao của chính hình ⇒ ghép theo vị trí tương đối
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of set) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const sx = 1023 / Math.max(1, maxX - minX);
  const sy = 1023 / Math.max(1, maxY - minY);
  const keyed = set.map((p) => ({ p, k: hilbert(Math.round((p.x - minX) * sx), Math.round((p.y - minY) * sy)) }));
  keyed.sort((a, b) => a.k - b.k);
  const pos = new Float32Array(N * 2);
  const tone = new Float32Array(N);
  const lum = new Float32Array(N);
  keyed.forEach(({ p }, i) => {
    pos[i * 2] = p.x;
    pos[i * 2 + 1] = p.y;
    tone[i] = p.tone;
    lum[i] = p.lum;
  });
  return { pos, tone, lum };
}

function buildFrames(W: number, H: number, N: number, ctx: CanvasRenderingContext2D): Frame[] {
  const r = mulberry32(7);
  const gauss = () => {
    const u = 1 - r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const S = Math.min(W, H);
  const cx = W / 2;
  const cy = H / 2;

  /* ── 1. Quả bông ── */
  const cotton: Pt[] = [];
  {
    const R = S * 0.1; // bán kính một múi
    const bx = cx;
    const by = cy - S * 0.06; // tâm quả
    const nLobe = Math.round(N * 0.76);
    const nBract = Math.round(N * 0.1);
    const nStem = Math.round(N * 0.05);
    const nLeaf = Math.round(N * 0.06);
    const lobeAng = (k: number) => -Math.PI / 2 + (k * 2 * Math.PI) / 5;

    // múi bông: lõi đặc, mép xốp, rãnh tối giữa các múi
    for (let i = 0; i < nLobe; i++) {
      const k = i % 5;
      const a0 = lobeAng(k);
      const lx = bx + Math.cos(a0) * R * 1.12;
      const ly = by + Math.sin(a0) * R * 1.12;
      const a = r() * Math.PI * 2;
      const fluff = r() < 0.1 ? 1 + Math.abs(gauss()) * 0.25 : 1;
      const d = Math.pow(r(), 0.55) * R * 0.86 * fluff;
      // múi hơi bầu dục, dài theo hướng tỏa ra
      const ox = Math.cos(a) * d;
      const oy = Math.sin(a) * d * 0.88;
      const x = lx + ox * Math.cos(a0) - oy * Math.sin(a0);
      const y = ly + ox * Math.sin(a0) + oy * Math.cos(a0);
      const edge = d / R; // gần mép thì mờ hơn, như xơ tơi
      cotton.push({ x, y, tone: 0, lum: 1 - edge * 0.45 });
    }
    // đài hoa: 5 lá đài nhọn lộ ra giữa các múi
    for (let i = 0; i < nBract; i++) {
      const k = i % 5;
      const a = lobeAng(k) + Math.PI / 5;
      const t = Math.pow(r(), 0.8); // 0 = gốc, 1 = mũi
      const len = R * (0.6 + t * 1.25);
      const w = (1 - t) * R * 0.32 * (r() - 0.5) * 2;
      cotton.push({
        x: bx + Math.cos(a) * len - Math.sin(a) * w,
        y: by + Math.sin(a) * len + Math.cos(a) * w,
        tone: 1,
        lum: 0.55 + (1 - t) * 0.3,
      });
    }
    // cuống: cong nhẹ xuống dưới
    const stemLen = S * 0.3;
    for (let i = 0; i < nStem; i++) {
      const t = r();
      const x = bx + Math.sin(t * 2.2) * S * 0.035 + gauss() * 0.9;
      const y = by + R * 1.3 + t * stemLen;
      cotton.push({ x, y, tone: 1, lum: 0.6 });
    }
    // lá: hình tim ở bên phải cuống, viền + gân giữa
    const lx0 = bx + S * 0.03;
    const ly0 = by + R * 1.3 + stemLen * 0.55;
    const L = S * 0.13;
    for (let i = 0; i < nLeaf; i++) {
      const onRib = r() < 0.3;
      const t = r();
      let x: number;
      let y: number;
      if (onRib) {
        x = t * L;
        y = 0;
      } else {
        const th = t * Math.PI;
        x = (1 - Math.cos(th)) * 0.5 * L;
        y = Math.sin(th) * L * 0.36 * (r() < 0.5 ? 1 : -1) * (1 - 0.25 * t);
      }
      const rot = -0.55;
      cotton.push({
        x: lx0 + x * Math.cos(rot) - y * Math.sin(rot) + gauss() * 0.6,
        y: ly0 + x * Math.sin(rot) + y * Math.cos(rot) + gauss() * 0.6,
        tone: 1,
        lum: onRib ? 0.45 : 0.6,
      });
    }
    // xơ bông bay lơ thơ
    while (cotton.length < N) {
      const a = r() * Math.PI * 2;
      const d = R * (2.3 + r() * 1.5);
      cotton.push({ x: bx + Math.cos(a) * d, y: by + Math.sin(a) * d * 0.85, tone: 0, lum: 0.35 });
    }
  }

  /* ── 2. Sợi: 3 sợi xe đôi, hơi chéo ── */
  const thread: Pt[] = [];
  {
    const gap = S * 0.15;
    const amp = S * 0.026;
    const pitch = (Math.PI * 2) / (S * 0.1);
    const x0 = W * 0.06;
    const x1 = W * 0.94;
    const tilt = -0.07;
    for (let i = 0; i < N; i++) {
      const k = i % 3;
      const ply = (i >> 2) % 2; // tao 0 / tao 1
      const x = x0 + r() * (x1 - x0);
      const yc = cy + (k - 1) * gap + (x - cx) * tilt;
      const a = x * pitch + ply * Math.PI + k * 0.9;
      // tao phía trước sáng hơn tao phía sau ⇒ thấy được vòng xoắn
      const front = Math.cos(a) > 0 ? 1 : 0.55;
      const across = gauss() * amp * 0.2;
      const stray = r() < 0.025 ? gauss() * amp * 1.4 : 0;
      thread.push({ x, y: yc + Math.sin(a) * amp + across + stray, tone: r() < 0.04 ? 1 : 0, lum: front });
    }
  }

  /* ── 3. Vải: vân điểm ── */
  const fabric: Pt[] = [];
  {
    const side = S * 0.62;
    const cells = 14;
    const cs = side / cells;
    const fx = cx - side / 2;
    const fy = cy - side / 2;
    for (let i = 0; i < N; i++) {
      const ci = Math.floor(r() * cells);
      const cj = Math.floor(r() * cells);
      const t = r() - 0.5;
      const across = gauss() * cs * 0.09;
      const px = fx + (ci + 0.5) * cs;
      const py = fy + (cj + 0.5) * cs;
      const warpOnTop = (ci + cj) % 2 === 0;
      // phần sợi nổi sáng, hai đầu chìm xuống tối dần (cảm giác lên – xuống)
      const lum = 1 - Math.abs(t) * 0.9;
      if (warpOnTop) fabric.push({ x: px + across, y: py + t * cs * 0.96, tone: 0, lum });
      else fabric.push({ x: px + t * cs * 0.96, y: py + across, tone: 0.18, lum: lum * 0.85 });
    }
  }

  /* ── 4. Áo ── */
  const shirt: Pt[] = [];
  {
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
      if (ctx.isPointInPath(path, x, y)) shirt.push({ x, y, tone: 0, lum: 0.75 + r() * 0.25 });
    }
    while (shirt.length < N) shirt.push({ x: cx, y: cy, tone: 0, lum: 0.8 });
  }

  return [cotton, thread, fabric, shirt].map((s) => toFrame(s.slice(0, N), N));
}

/** Sprite phát sáng mềm, vẽ một lần rồi tái sử dụng */
function makeSprite(rgb: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grd.addColorStop(0, `rgba(${rgb},1)`);
  grd.addColorStop(0.22, `rgba(${rgb},0.85)`);
  grd.addColorStop(0.5, `rgba(${rgb},0.18)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, 32, 32);
  return c;
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

    const ivory = makeSprite("241,238,231");
    const bronze = makeSprite("181,154,115");

    let W = 0;
    let H = 0;
    let dpr = 1;
    let N = 0;
    let S = 1;
    let frames: Frame[] = [];
    let size = new Float32Array(0);
    let alpha = new Float32Array(0);
    let delay = new Float32Array(0);
    let seedA = new Float32Array(0);
    let progress = isReduced ? 1 : 0;
    let shown = progress;
    let visible = true;
    let lastPhase = -1;
    let lastTime = performance.now();

    const setup = () => {
      const rect = el.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      S = Math.min(W, H);
      const isMobile = W < 768;
      // Trên điện thoại: dpr cố định tối đa 1.25 để giảm tải fill-rate GPU 4-5 lần
      dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      // Giảm số lượng hạt trên mobile từ 1600 xuống 750 (đủ nét nhưng GPU nhẹ nhàng)
      N = isMobile ? 750 : 3400;
      const r = mulberry32(42);
      size = Float32Array.from({ length: N }, () => 1.6 + Math.pow(r(), 2.2) * 3.2);
      alpha = Float32Array.from({ length: N }, () => 0.45 + r() * 0.5);
      delay = Float32Array.from({ length: N }, () => r() * 0.3);
      seedA = Float32Array.from({ length: N }, () => r() * Math.PI * 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      frames = buildFrames(W, H, N, ctx);
    };
    setup();

    const draw = (time: number) => {
      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      if (!visible || N === 0) return;

      // làm mượt theo thời gian: hằng số ~ 0.12s, không phụ thuộc FPS
      shown += (progress - shown) * (1 - Math.exp(-dt / 0.12));
      const f = phaseAt(shown);

      // Khi không cuộn và hạt đã dừng ở hình hoàn chỉnh, ngắt vẽ để tiết kiệm pin & GPU điện thoại
      const diff = Math.abs(progress - shown);
      if (diff < 0.0005 && f >= 0.5 && Math.abs(f - Math.round(f)) < 0.01) {
        return;
      }
      const seg = Math.min(Math.floor(f), 2);
      const t = f - seg;
      const A = frames[seg];
      const B = frames[seg + 1];
      const tt = time * 0.0006;
      const swirl = S * 0.06;
      const breathe = f < 0.5 ? S * 0.0025 : S * 0.0012; // bông "thở" nhẹ khi đứng yên

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);

      // ánh sáng studio
      const g = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, Math.max(W, H) * 0.55);
      g.addColorStop(0, "rgba(241,238,231,0.08)");
      g.addColorStop(1, "rgba(241,238,231,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < N; i++) {
        const local = Math.min(1, Math.max(0, (t * 1.3 - delay[i])));
        const e = ease(local);
        const i2 = i * 2;
        const ax = A.pos[i2];
        const ay = A.pos[i2 + 1];
        const bx = B.pos[i2];
        const by = B.pos[i2 + 1];
        // trường xoáy: lớn nhất giữa chuyển cảnh, bằng 0 ở hai đầu
        const mid = Math.sin(local * Math.PI);
        const sa = seedA[i];
        const fx = Math.sin(ay * 0.012 + tt * 2 + sa) + Math.cos(by * 0.009 - tt + sa * 0.5);
        const fy = Math.cos(ax * 0.011 - tt * 1.7 + sa) + Math.sin(bx * 0.008 + tt + sa * 0.7);
        const x = ax + (bx - ax) * e + fx * swirl * 0.5 * mid + Math.sin(tt * 3 + sa) * breathe;
        const y = ay + (by - ay) * e + fy * swirl * 0.5 * mid + Math.cos(tt * 2.6 + sa) * breathe;

        const tone = A.tone[i] + (B.tone[i] - A.tone[i]) * e;
        const lum = A.lum[i] + (B.lum[i] - A.lum[i]) * e;
        const a = Math.min(1, alpha[i] * lum * 1.05);
        const s = size[i] * 1.35 * (1 + mid * 0.35);
        const h = s / 2;
        if (tone < 0.999) {
          ctx.globalAlpha = a * (1 - tone);
          ctx.drawImage(ivory, x - h, y - h, s, s);
        }
        if (tone > 0.001) {
          ctx.globalAlpha = a * tone;
          ctx.drawImage(bronze, x - h, y - h, s, s);
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // áo hoàn chỉnh hiện dần ở cuối pha áo
      const solid = ease(Math.min(1, Math.max(0, (shown - 0.9) / 0.1)));
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
        // Trên điện thoại chỉ đổi chiều cao (thanh địa chỉ) → bỏ qua, tránh dựng lại hạt khi đang cuộn
        if (Math.abs(el.getBoundingClientRect().width - W) < 1) return;
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
          aria-label="Hoạt ảnh quả bông dần trở thành sợi chỉ, tấm vải rồi chiếc áo thun"
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
