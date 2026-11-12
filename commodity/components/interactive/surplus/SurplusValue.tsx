"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SurplusBaseline, SurplusScenario } from "@/content/schema";
import { computeSurplus, fmt } from "@/lib/economics";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { ChipGroup } from "@/components/ui/ChipGroup";

const BASE_ID = "__base";
type Mode = SurplusScenario["mode"];
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * Mô phỏng giá trị thặng dư tuyệt đối / tương đối (FR-50…52).
 * Mọi con số lấy từ computeSurplus; chip chọn chế độ và kịch bản, các thanh chuyển động mượt giữa các trạng thái.
 */
export function SurplusValue({
  baseline,
  scenarios,
  tone,
}: {
  baseline: SurplusBaseline;
  scenarios: SurplusScenario[];
  tone: "light" | "dark";
}) {
  const [mode, setMode] = useState<Mode>("absolute");
  const [sid, setSid] = useState<string>(BASE_ID);

  const modeScenarios = useMemo(() => scenarios.filter((s) => s.mode === mode), [scenarios, mode]);
  const scenario = scenarios.find((s) => s.id === sid && s.mode === mode);
  const r = useMemo(() => computeSurplus(baseline, scenario), [baseline, scenario]);
  const [initial] = useState(r);

  // Thang đo chung để chuyển cảnh không làm nhảy khung
  const { scale, maxW } = useMemo(() => {
    const all = [computeSurplus(baseline), ...scenarios.map((s) => computeSurplus(baseline, s))];
    return {
      scale: Math.max(12, Math.ceil(Math.max(...all.map((x) => x.workdayHours)))),
      maxW: Math.max(...all.map((x) => x.W)),
    };
  }, [baseline, scenarios]);

  const rootRef = useRef<HTMLDivElement>(null);
  const necRefs = useRef<(HTMLDivElement | null)[]>([]);
  const surRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cSeg = useRef<HTMLDivElement>(null);
  const vSeg = useRef<HTMLDivElement>(null);
  const mSeg = useRef<HTMLDivElement>(null);
  const rateRef = useRef<HTMLSpanElement>(null);
  const rateVal = useRef({ n: initial.rate });
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, rootRef);
    ctxRef.current = ctx;
    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const d = prefersReducedMotion() ? 0 : 0.8;
    ctx.add(() => {
      for (let i = 0; i < scale; i++) {
        const nec = clamp01(r.necessaryHours - i);
        const work = clamp01(r.workdayHours - i);
        const nEl = necRefs.current[i];
        const sEl = surRefs.current[i];
        if (nEl) gsap.to(nEl, { width: `${nec * 100}%`, duration: d, ease: "expo.out", overwrite: true });
        if (sEl) {
          gsap.to(sEl, {
            left: `${nec * 100}%`,
            width: `${Math.max(0, work - nec) * 100}%`,
            duration: d,
            ease: "expo.out",
            overwrite: true,
          });
        }
      }
      const seg = (el: HTMLDivElement | null, val: number) =>
        el && gsap.to(el, { width: `${(val / maxW) * 100}%`, duration: d, ease: "expo.out", overwrite: true });
      seg(cSeg.current, r.c);
      seg(vSeg.current, r.v);
      seg(mSeg.current, r.m);
      gsap.to(rateVal.current, {
        n: r.rate,
        duration: d,
        ease: "expo.out",
        overwrite: true,
        onUpdate: () => {
          if (rateRef.current) rateRef.current.textContent = fmt(rateVal.current.n, 0);
        },
      });
    });
  }, [r, scale, maxW]);

  const light = tone === "light";
  const rule = light ? "border-ink/15" : "border-ivory/15";
  const muted = light ? "text-ink/60" : "text-ivory/60";
  const cellEmpty = light ? "border-ink/20" : "border-ivory/20";
  const cOutline = light ? "border-ink/70" : "border-ivory/70";

  const modeOptions: { id: Mode; label: string }[] = [
    { id: "absolute", label: "Giá trị thặng dư tuyệt đối" },
    { id: "relative", label: "Giá trị thặng dư tương đối" },
  ];
  const scenarioOptions = [{ id: BASE_ID, label: "Điểm xuất phát" }, ...modeScenarios.map((s) => ({ id: s.id, label: s.label }))];

  return (
    <div ref={rootRef}>
      <div className="flex flex-col gap-5">
        <ChipGroup
          label="Phương pháp"
          options={modeOptions}
          value={mode}
          onChange={(m) => {
            setMode(m);
            setSid(BASE_ID);
          }}
          tone={tone}
        />
        <ChipGroup label="Kịch bản" options={scenarioOptions} value={sid} onChange={setSid} tone={tone} />
      </div>

      {/* Hình 1 — ngày lao động chia theo giờ */}
      <div className="mt-14">
        <p className="eyebrow mb-4 text-bronze">Ngày lao động</p>
        <div
          role="img"
          aria-label={`Ngày lao động ${fmt(r.workdayHours)} giờ: ${fmt(r.necessaryHours)} giờ lao động tất yếu và ${fmt(r.surplusHours)} giờ lao động thặng dư`}
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${scale}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: scale }, (_, i) => (
            <div key={i} className={`relative h-14 overflow-hidden border md:h-20 ${cellEmpty}`}>
              <div
                ref={(el) => {
                  necRefs.current[i] = el;
                }}
                className="absolute inset-y-0 left-0 bg-stone"
                style={{ width: `${clamp01(initial.necessaryHours - i) * 100}%` }}
              />
              <div
                ref={(el) => {
                  surRefs.current[i] = el;
                }}
                className="absolute inset-y-0 bg-bronze"
                style={{
                  left: `${clamp01(initial.necessaryHours - i) * 100}%`,
                  width: `${Math.max(0, clamp01(initial.workdayHours - i) - clamp01(initial.necessaryHours - i)) * 100}%`,
                }}
              />
              <span className={`absolute bottom-1 left-1.5 text-[0.6rem] tabular-nums ${light ? "text-ink/50" : "text-ivory/50"}`}>
                {i + 1}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2" aria-live="polite">
          <div className="border-t-2 border-stone pt-2">
            <p className="text-[0.9rem]">Thời gian lao động tất yếu</p>
            <p className="font-display text-2xl font-600 tabular-nums">{fmt(r.necessaryHours)} giờ</p>
          </div>
          <div className="border-t-2 border-bronze pt-2">
            <p className="text-[0.9rem]">Thời gian lao động thặng dư</p>
            <p className="font-display text-2xl font-600 tabular-nums">{fmt(r.surplusHours)} giờ</p>
          </div>
        </div>
      </div>

      {/* Hình 2 — W = c + v + m */}
      <div className="mt-14">
        <p className="eyebrow mb-4 text-bronze">Giá trị hàng hóa W = c + v + m</p>
        <div
          role="img"
          aria-label={`Giá trị hàng hóa W bằng ${fmt(r.W)}, gồm c bằng ${fmt(r.c)}, v bằng ${fmt(r.v)}, m bằng ${fmt(r.m)}`}
          className="flex h-12 w-full md:h-16"
        >
          <div ref={cSeg} className={`h-full shrink-0 border ${cOutline}`} style={{ width: `${(initial.c / maxW) * 100}%` }} />
          <div ref={vSeg} className="h-full shrink-0 bg-stone" style={{ width: `${(initial.v / maxW) * 100}%` }} />
          <div ref={mSeg} className="h-full shrink-0 bg-bronze" style={{ width: `${(initial.m / maxW) * 100}%` }} />
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-4 text-sm" aria-live="polite">
          <div className={`border-t pt-2 ${cOutline}`}>
            <dt className={muted}>c · tư bản bất biến</dt>
            <dd className="font-display text-2xl font-600 tabular-nums">{fmt(r.c)}</dd>
          </div>
          <div className="border-t-2 border-stone pt-2">
            <dt className={muted}>v · tư bản khả biến</dt>
            <dd className="font-display text-2xl font-600 tabular-nums">{fmt(r.v)}</dd>
          </div>
          <div className="border-t-2 border-bronze pt-2">
            <dt className={muted}>m · giá trị thặng dư</dt>
            <dd className="font-display text-2xl font-600 tabular-nums">{fmt(r.m)}</dd>
          </div>
        </dl>
      </div>

      {/* Số đo */}
      <div className={`mt-14 grid gap-12 border-t ${rule} pt-12 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <p className="eyebrow text-bronze">Tỷ suất giá trị thặng dư</p>
          <p
            aria-hidden
            className="mt-2 font-display text-[clamp(5rem,16vw,10rem)] font-700 leading-[0.9] tracking-[-0.04em] tabular-nums"
          >
            <span ref={rateRef}>{fmt(initial.rate, 0)}</span>
            <span className="text-bronze">%</span>
          </p>
          <p className="sr-only" aria-live="polite">
            m phẩy bằng {fmt(r.rate, 0)} phần trăm
          </p>
          {scenario ? (
            <p className={`mt-6 max-w-md text-[0.95rem] leading-relaxed ${muted}`}>{scenario.note}</p>
          ) : (
            <p className={`mt-6 max-w-md text-[0.95rem] leading-relaxed ${muted}`}>
              Điểm xuất phát: ngày lao động {fmt(baseline.workdayHours)} giờ, trong đó {fmt(baseline.necessaryHours)} giờ là lao động tất yếu.
            </p>
          )}
        </div>

        <div className="lg:col-span-6" aria-live="polite">
          <dl className={`grid grid-cols-2 border-t ${rule}`}>
            {[
              ["c", fmt(r.c)],
              ["v", fmt(r.v)],
              ["m", fmt(r.m)],
              ["Giá trị mới (v + m)", fmt(r.newValue)],
              ["W", fmt(r.W)],
              ["m′", `${fmt(r.rate, 0)}%`],
            ].map(([k, v]) => (
              <div key={k} className={`flex items-baseline justify-between gap-3 border-b ${rule} py-3 pr-4 even:pl-4`}>
                <dt className={`text-sm ${muted}`}>{k}</dt>
                <dd className="font-display text-xl font-600 tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className={`mt-6 space-y-2 font-serif text-lg italic tabular-nums leading-snug md:text-xl`}>
            <li>
              Thời gian thặng dư = {fmt(r.workdayHours)} − {fmt(r.necessaryHours)} = {fmt(r.surplusHours)} giờ
            </li>
            <li>
              Giá trị mới = v + m = {fmt(r.v)} + {fmt(r.m)} = {fmt(r.newValue)}
            </li>
            <li>
              W = c + v + m = {fmt(r.c)} + {fmt(r.v)} + {fmt(r.m)} = {fmt(r.W)}
            </li>
            <li>
              m′ = m / v × 100% = {fmt(r.m)} / {fmt(r.v)} × 100% = {fmt(r.rate, 0)}%
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
