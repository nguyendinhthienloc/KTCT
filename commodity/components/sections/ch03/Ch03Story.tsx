"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Factory, ShareScenario, StoryBeat } from "@/content/schema";
import { computeSnlt, fmt } from "@/lib/economics";
import { gsap } from "@/lib/motion";
import { FactoryArt } from "@/components/interactive/factory/FactoryArt";
import { RichText } from "@/components/ui/RichText";

const SCALE_MAX = 12;
const pct = (h: number) => Math.max(0, Math.min(100, (h / SCALE_MAX) * 100));

/**
 * Tầng 1 — câu chuyện 3 bước: một xưởng → ba xưởng → thị trường chọn một thời gian xã hội.
 * Desktop: ghim + scrub. Mobile / giảm chuyển động: 3 bước xếp dọc, trạng thái cuối.
 */
export function Ch03Story({
  factories,
  scenario,
  beats,
}: {
  factories: Factory[];
  scenario: ShareScenario;
  beats: StoryBeat[];
}) {
  const res = useMemo(() => computeSnlt(factories, scenario), [factories, scenario]);
  const first = factories[0];

  const steps = [
    {
      heading: beats[0]?.heading ?? `${fmt(first.hoursPerShirt)} giờ cho một chiếc áo`,
      body: beats[0]?.body ?? `${first.name} mất ${fmt(first.hoursPerShirt)} giờ để làm xong một chiếc áo. Đó mới chỉ là thời gian riêng của một xưởng.`,
    },
    {
      heading: beats[1]?.heading ?? "Mỗi xưởng một nhịp làm việc",
      body:
        beats[1]?.body ??
        `Ngoài thị trường còn ${factories
          .slice(1)
          .map((f) => `${f.name} (${fmt(f.hoursPerShirt)} giờ/áo)`)
          .join(" và ")}. Cùng một chiếc áo, nhưng thời gian lao động cá biệt mỗi nơi một khác.`,
    },
    {
      heading: beats[2]?.heading ?? `Thị trường chỉ thừa nhận ≈ ${fmt(res.snlt)} giờ`,
      body:
        beats[2]?.body ??
        `Chiếc áo được trao đổi theo thời gian lao động xã hội cần thiết, khoảng ${fmt(res.snlt)} giờ, chứ không theo giờ làm riêng của từng xưởng.`,
    },
  ];

  const stageRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mm = gsap.matchMedia(stage);
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const caps = gsap.utils.toArray<HTMLElement>("[data-cap]", stage);
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", stage);
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", stage);
      if (capsRef.current) gsap.set(capsRef.current, { display: "grid" });
      gsap.set(caps, { gridArea: "1 / 1" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage, start: "top top", end: "+=240%", pin: true, scrub: 0.6 },
      });
      tl.from(bars[0], { scaleX: 0, transformOrigin: "0 50%", duration: 0.8 }, 0.05);
      // bước 2
      tl.to(caps[0], { autoAlpha: 0, duration: 0.3 }, 1);
      tl.from(caps[1], { autoAlpha: 0, y: 16, duration: 0.3 }, 1.1);
      tl.from(rows.slice(1), { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.25 }, 1);
      tl.from(bars.slice(1), { scaleX: 0, transformOrigin: "0 50%", duration: 0.8, stagger: 0.25 }, 1.1);
      // bước 3
      tl.to(caps[1], { autoAlpha: 0, duration: 0.3 }, 2.1);
      tl.from(caps[2], { autoAlpha: 0, y: 16, duration: 0.3 }, 2.2);
      tl.from(lineRef.current, { autoAlpha: 0, left: `${pct(first.hoursPerShirt)}%`, duration: 0.9, ease: "power2.out" }, 2.2);
      tl.to({}, { duration: 0.4 });
    });
    return () => mm.revert();
  }, [first.hoursPerShirt]);

  return (
    <div ref={stageRef} className="container-cinema flex items-center py-20 md:min-h-screen md:py-0">
      <div className="grid w-full gap-14 lg:grid-cols-12 lg:items-center">
        <div ref={capsRef} className="flex flex-col gap-12 lg:col-span-5">
          {steps.map((s, i) => (
            <div key={i} data-cap>
              <p className="eyebrow mb-4 text-bronze">Bước {String(i + 1).padStart(2, "0")} / 03</p>
              <h3 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-700 leading-[1.02] tracking-[-0.025em]">
                {s.heading}
              </h3>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink/70">
                <RichText text={s.body} />
              </p>
            </div>
          ))}
        </div>

        <div
          className="relative lg:col-span-7"
          role="img"
          aria-label={`Thời gian lao động cá biệt của các xưởng và thời gian lao động xã hội cần thiết khoảng ${fmt(res.snlt)} giờ mỗi áo`}
        >
          {factories.map((f) => (
            <div key={f.id} data-row className="py-4">
              <div className="mb-2 flex items-end gap-4">
                <FactoryArt id={f.id as "A" | "B" | "C"} className="w-24 shrink-0 text-ink md:w-28" />
                <p className="font-display text-sm font-600 md:text-base">{f.name}</p>
              </div>
              <div className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 md:grid-cols-[7rem_1fr]">
                <p className="text-xs tabular-nums text-ink/60">{fmt(f.hoursPerShirt)} giờ/áo</p>
                <div className="border-b border-ink/15">
                  <div data-bar className="h-5 bg-ink md:h-7" style={{ width: `${pct(f.hoursPerShirt)}%` }} />
                </div>
              </div>
            </div>
          ))}
          <div className="absolute inset-y-0 left-[calc(4.5rem+1rem)] right-0 md:left-[calc(7rem+1rem)]" aria-hidden>
            <div ref={lineRef} className="absolute -top-8 bottom-0 w-px bg-bronze" style={{ left: `${pct(res.snlt)}%` }}>
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap text-[0.7rem] tabular-nums tracking-wide text-bronze">
                ≈ {fmt(res.snlt)} giờ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
