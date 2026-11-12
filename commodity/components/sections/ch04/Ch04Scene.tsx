"use client";

import { useEffect, useMemo, useRef } from "react";
import type { SurplusBaseline } from "@/content/schema";
import { computeSurplus, fmt } from "@/lib/economics";
import { gsap } from "@/lib/motion";

/**
 * Tầng 1 — một ngày lao động của một công nhân, điền từng giờ khi cuộn.
 * Mọi con số lấy từ computeSurplus(baseline). Desktop: ghim + scrub; mobile / giảm chuyển động: trạng thái cuối.
 */
export function Ch04Scene({ baseline }: { baseline: SurplusBaseline }) {
  const r = useMemo(() => computeSurplus(baseline), [baseline]);
  const hours = Math.round(r.workdayHours);
  const nec = r.necessaryHours;

  const captions = [
    `Trong ${fmt(nec)} giờ đầu, người công nhân tạo ra lượng giá trị mới bằng giá trị sức lao động của mình (v = ${fmt(r.v)})`,
    `${fmt(r.surplusHours)} giờ còn lại tạo ra giá trị thặng dư (m = ${fmt(r.m)}) mà nhà tư bản chiếm không`,
    `W = c + v + m = ${fmt(r.c)} + ${fmt(r.v)} + ${fmt(r.m)} = ${fmt(r.W)}`,
  ];

  const stageRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLSpanElement>(null);
  const vRef = useRef<HTMLSpanElement>(null);
  const mRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mm = gsap.matchMedia(stage);
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const caps = gsap.utils.toArray<HTMLElement>("[data-cap]", stage);
      const fills = gsap.utils.toArray<HTMLElement>("[data-fill]", stage);
      const finals = gsap.utils.toArray<HTMLElement>("[data-final]", stage);
      const segs = gsap.utils.toArray<HTMLElement>("[data-seg]", stage);

      const render = (t: number) => {
        if (hourRef.current) hourRef.current.textContent = String(Math.ceil(t - 1e-6));
        if (vRef.current) vRef.current.textContent = fmt(r.valuePerHour * Math.min(t, nec));
        if (mRef.current) mRef.current.textContent = fmt(r.valuePerHour * Math.max(0, t - nec));
      };

      if (capsRef.current) gsap.set(capsRef.current, { display: "grid" });
      gsap.set(caps, { gridArea: "1 / 1" });
      render(0);

      const N = hours;
      const clock = { t: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage, start: "top top", end: `+=${(N + 2) * 45}%`, pin: true, scrub: 0.6 },
      });
      tl.to(clock, { t: N, duration: N, onUpdate: () => render(clock.t) }, 0);
      fills.forEach((f, i) => tl.from(f, { scaleX: 0, transformOrigin: "0 50%", duration: 1 }, i));
      // chú thích
      tl.to(caps[0], { autoAlpha: 0, duration: 0.3 }, nec);
      tl.from(caps[1], { autoAlpha: 0, y: 16, duration: 0.3 }, nec + 0.1);
      tl.to(caps[1], { autoAlpha: 0, duration: 0.3 }, N);
      tl.from(caps[2], { autoAlpha: 0, y: 16, duration: 0.3 }, N + 0.1);
      // kết quả
      tl.from(segs, { scaleX: 0, transformOrigin: "0 50%", duration: 0.6, stagger: 0.25 }, N + 0.1);
      tl.from(finals, { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.15 }, N + 0.3);
      tl.to({}, { duration: 0.6 });

      return () => render(N);
    });
    return () => mm.revert();
  }, [r, hours, nec]);

  return (
    <div ref={stageRef} className="container-cinema flex items-center py-20 md:min-h-screen md:py-12">
      <div className="w-full">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3 text-bronze">Một công nhân · một ngày lao động</p>
            <p className="font-display text-[clamp(5rem,13vw,10rem)] font-700 leading-[0.85] tracking-[-0.05em] tabular-nums">
              <span ref={hourRef}>{hours}</span>
              <span className="ml-2 text-[0.22em] font-400 tracking-normal text-ivory/50">/ {hours} giờ</span>
            </p>
          </div>
          <div ref={capsRef} className="flex flex-col gap-4 lg:col-span-8" aria-label="Chú thích các giai đoạn trong ngày lao động">
            {captions.map((c, i) => (
              <p
                key={i}
                data-cap
                className={
                  i === 2
                    ? "font-display text-[clamp(1.4rem,3vw,2.4rem)] font-700 tabular-nums leading-tight"
                    : "font-serif text-[clamp(1.35rem,2.6vw,2.2rem)] italic leading-snug text-ivory/90"
                }
              >
                {c}
              </p>
            ))}
          </div>
        </div>

        <div
          role="img"
          aria-label={`Ngày lao động ${hours} giờ: ${fmt(nec)} giờ đầu tạo giá trị bằng sức lao động, ${fmt(r.surplusHours)} giờ sau tạo giá trị thặng dư`}
          className="mt-12 grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${hours}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: hours }, (_, i) => (
            <div key={i} className="relative h-20 overflow-hidden border border-ivory/20 md:h-32">
              <div data-fill className={`absolute inset-0 ${i < nec ? "bg-stone" : "bg-bronze"}`} />
              <span className="absolute bottom-1.5 left-2 text-[0.65rem] tabular-nums text-ink/70">{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <div className="border-t-2 border-stone pt-3">
            <p className="text-sm text-ivory/60">v · giá trị sức lao động</p>
            <p className="font-display text-4xl font-700 tabular-nums md:text-5xl">
              <span ref={vRef}>{fmt(r.v)}</span>
            </p>
          </div>
          <div className="border-t-2 border-bronze pt-3">
            <p className="text-sm text-ivory/60">m · giá trị thặng dư</p>
            <p className="font-display text-4xl font-700 tabular-nums text-bronze md:text-5xl">
              <span ref={mRef}>{fmt(r.m)}</span>
            </p>
          </div>
          <div data-final className="border-t border-ivory/40 pt-3">
            <p className="text-sm text-ivory/60">c · giá trị tư liệu sản xuất chuyển vào áo</p>
            <p className="font-display text-4xl font-700 tabular-nums md:text-5xl">{fmt(r.c)}</p>
          </div>
        </div>

        <div className="mt-8" data-final>
          <div className="flex h-3 w-full" role="img" aria-label={`W = ${fmt(r.W)}, gồm c ${fmt(r.c)}, v ${fmt(r.v)}, m ${fmt(r.m)}`}>
            <div data-seg className="h-full border border-ivory/60" style={{ width: `${(r.c / r.W) * 100}%` }} />
            <div data-seg className="h-full bg-stone" style={{ width: `${(r.v / r.W) * 100}%` }} />
            <div data-seg className="h-full bg-bronze" style={{ width: `${(r.m / r.W) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
