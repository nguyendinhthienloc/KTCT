"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Factory, ShareScenario } from "@/content/schema";
import { computeSnlt, fmt } from "@/lib/economics";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { FactoryArt } from "./FactoryArt";

const SCALE_MAX = 12;
const TICKS = [0, 3, 6, 9, 12];
const pct = (hours: number) => Math.max(0, Math.min(100, (hours / SCALE_MAX) * 100));

/**
 * So sánh thời gian lao động cá biệt của các xưởng với thời gian lao động xã hội cần thiết (FR-40, FR-41).
 * Mọi số liệu lấy từ computeSnlt; chip đổi kịch bản thị phần, thanh + đường đồng bộ chuyển động.
 */
export function FactoryCompare({
  factories,
  scenarios,
  tone,
}: {
  factories: Factory[];
  scenarios: ShareScenario[];
  tone: "light" | "dark";
}) {
  if (scenarios.length === 0 || factories.length === 0) return null;
  return <FactoryCompareInner factories={factories} scenarios={scenarios} tone={tone} />;
}

function FactoryCompareInner({
  factories,
  scenarios,
  tone,
}: {
  factories: Factory[];
  scenarios: ShareScenario[];
  tone: "light" | "dark";
}) {
  const [sid, setSid] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === sid) ?? scenarios[0];
  const res = useMemo(() => computeSnlt(factories, scenario), [factories, scenario]);
  // Giá trị khởi tạo cố định để React không ghi đè style do GSAP điều khiển
  const [initial] = useState(res);

  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const shareRefs = useRef<Record<string, HTMLDivElement | null>>({});
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
    const duration = prefersReducedMotion() ? 0 : 0.8;
    ctx.add(() => {
      if (lineRef.current) {
        gsap.to(lineRef.current, { left: `${pct(res.snlt)}%`, duration, ease: "expo.out", overwrite: true });
      }
      res.rows.forEach((r) => {
        const el = shareRefs.current[r.id];
        if (el) gsap.to(el, { width: `${r.share * 100}%`, duration, ease: "expo.out", overwrite: true });
      });
    });
  }, [res]);

  const light = tone === "light";
  const rule = light ? "border-ink/15" : "border-ivory/15";
  const muted = light ? "text-ink/60" : "text-ivory/60";
  const barBg = light ? "bg-ink" : "bg-ivory";
  const shareBg = light ? "bg-stone" : "bg-stone-light";
  const dominant = res.rows.find((r) => r.id === res.dominant.id);
  const majority = res.dominant.share > 0.5;

  return (
    <div ref={rootRef}>
      <ChipGroup
        label="Kịch bản thị phần"
        options={scenarios.map((s) => ({ id: s.id, label: s.label }))}
        value={sid}
        onChange={setSid}
        tone={tone}
      />

      <div
        className="relative mt-14"
        role="img"
        aria-label={`Thời gian lao động cá biệt của ${factories.length} xưởng so với thời gian lao động xã hội cần thiết, khoảng ${fmt(res.snlt)} giờ mỗi áo`}
      >
        {factories.map((f) => {
          const r = res.rows.find((x) => x.id === f.id)!;
          const ir = initial.rows.find((x) => x.id === f.id)!;
          return (
            <div key={f.id} className="py-4">
              <div className="mb-2 flex items-end gap-4">
                <FactoryArt id={f.id as "A" | "B" | "C"} className="w-24 shrink-0 text-ink md:w-32" />
                <p className="font-display text-sm font-600 md:text-base">{f.name}</p>
              </div>
              <div className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 md:grid-cols-[8rem_1fr]">
              <p className={`text-xs tabular-nums ${muted}`}>{fmt(f.hoursPerShirt)} giờ/áo</p>
              <div>
                <div className={`relative h-3.5 border-b ${rule}`}>
                  <div className={`h-full ${barBg}`} style={{ width: `${pct(f.hoursPerShirt)}%` }} />
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className={`relative h-[3px] flex-1 ${light ? "bg-ink/10" : "bg-ivory/10"}`}>
                    <div
                      ref={(el) => {
                        shareRefs.current[f.id] = el;
                      }}
                      className={`h-full ${shareBg}`}
                      style={{ width: `${ir.share * 100}%` }}
                    />
                  </div>
                  <span className={`w-24 shrink-0 text-right text-[0.7rem] tabular-nums ${muted}`}>
                    Thị phần {fmt(r.share * 100, 0)}%
                  </span>
                </div>
              </div>
              </div>
            </div>
          );
        })}

        {/* trục giờ */}
        <div className="grid grid-cols-[4.5rem_1fr] gap-x-4 md:grid-cols-[8rem_1fr]">
          <span />
          <div className={`relative mt-1 h-5 text-[0.65rem] tabular-nums ${muted}`} aria-hidden>
            {TICKS.map((t) => (
              <span
                key={t}
                className="absolute top-0 -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
                style={{ left: `${pct(t)}%` }}
              >
                {t}h
              </span>
            ))}
          </div>
        </div>

        {/* đường TGLĐXHCT xuyên qua mọi thanh */}
        <div
          className="pointer-events-none absolute inset-y-0 left-[calc(4.5rem+1rem)] right-0 md:left-[calc(8rem+1rem)]"
          aria-hidden
        >
          <div ref={lineRef} className="absolute -top-7 bottom-6 w-px bg-bronze" style={{ left: `${pct(initial.snlt)}%` }}>
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap text-[0.68rem] tabular-nums tracking-wide text-bronze">
              {fmt(res.snlt)} giờ
            </span>
          </div>
        </div>
      </div>

      <div className={`mt-12 grid gap-10 border-t ${rule} pt-10 lg:grid-cols-12`}>
        <div className="lg:col-span-5" aria-live="polite">
          <p className="eyebrow text-bronze">Thời gian lao động xã hội cần thiết</p>
          <p className="mt-4 font-display text-[clamp(3rem,7vw,6rem)] font-700 leading-none tracking-[-0.03em] tabular-nums">
            ≈ {fmt(res.snlt)}
            <span className={`ml-3 text-[0.3em] font-400 tracking-normal ${muted}`}>giờ/áo</span>
          </p>
          <p className={`mt-5 text-[0.95rem] leading-relaxed ${muted}`}>
            {majority && dominant
              ? `${dominant.name} cung cấp ${fmt(res.dominant.share * 100, 0)}% sản lượng nên thời gian xã hội cần thiết gần với thời gian của xưởng này.`
              : "Không xưởng nào cung cấp quá nửa sản lượng nên mức xã hội nằm giữa các xưởng."}
          </p>
          <p className={`mt-3 text-[0.85rem] italic ${muted}`}>{scenario.note}</p>
        </div>

        <ul className="lg:col-span-7 lg:col-start-7" aria-live="polite">
          {res.rows.map((r) => {
            const good = r.advantage > 0.05;
            const bad = r.advantage < -0.05;
            return (
              <li
                key={r.id}
                className={`flex flex-col gap-1 border-b ${rule} py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6`}
              >
                <span className="font-display text-sm font-600">{r.name}</span>
                <span className={`text-[0.9rem] leading-snug sm:text-right ${good ? "" : muted}`}>
                  {good
                    ? `hao phí ít hơn mức xã hội ${fmt(r.advantage)} giờ → có lợi`
                    : bad
                      ? `hao phí nhiều hơn mức xã hội ${fmt(-r.advantage)} giờ → bất lợi`
                      : "hao phí bằng mức xã hội"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-10 max-w-3xl font-serif text-xl italic leading-snug md:text-2xl">
        Giá trị của một chiếc áo không do thời gian riêng của từng xưởng quyết định: xưởng làm chậm hơn mức xã hội
        cần thiết không tạo thêm giá trị, xưởng làm nhanh hơn thì thu về nhiều hơn mức hao phí của mình.
      </p>
    </div>
  );
}
