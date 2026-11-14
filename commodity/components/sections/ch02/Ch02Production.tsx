"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ProductionContent } from "@/content/schema";
import { gsap } from "@/lib/motion";
import { ChapterShell } from "@/components/ui/ChapterShell";
import { LearnMore } from "@/components/ui/LearnMore";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";
import { SourceNote } from "@/components/ui/SourceNote";
import { StageArt } from "./StageArt";

const pad = (n: number) => String(n).padStart(2, "0");
const MATERIALS = ["Bông", "Sợi", "Vải", "Áo"];
const MATERIAL_AT = [0, 0, 1, 2, 2, 3, 3];

function materialIndex(i: number, n: number) {
  return MATERIAL_AT[Math.round((i * 6) / Math.max(n - 1, 1))] ?? 0;
}

export function Ch02Production({ content }: { content: ProductionContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const { visual, academic, check } = content;
  const stages = useMemo(() => [...content.stages].sort((a, b) => a.order - b.order), [content.stages]);
  const n = stages.length;

  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    const track = trackRef.current;
    if (!root || !scene || !track || n === 0) return;

    const setActive = (i: number) => {
      if (counterRef.current) counterRef.current.textContent = `${i + 1} / ${n}`;
      const m = materialIndex(i, n);
      root.querySelectorAll<HTMLElement>("[data-mat]").forEach((el, k) => {
        el.dataset.on = String(k === m);
      });
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const draw = (panel: Element, vars: gsap.TweenVars = {}) =>
        gsap.fromTo(
          panel.querySelectorAll(".draw"),
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.08, clearProps: "strokeDasharray,strokeDashoffset", ...vars },
        );

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);
        gsap.set(scene, { height: "100vh", overflow: "hidden" });
        gsap.set(track, { display: "flex", flexDirection: "row", width: "max-content", height: "100%" });
        gsap.set(panels, { width: "100vw", height: "100vh", flexShrink: 0, borderTopWidth: 0 });
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
              setActive(Math.min(n - 1, Math.round(self.progress * (n - 1))));
            },
          },
        });
        panels.forEach((p, i) => {
          if (i === 0) {
            // Công đoạn 1 (Trồng và thu hoạch bông): kích hoạt ngay khi cuộn tới scene hoặc vào tầm nhìn
            draw(p, {
              scrollTrigger: {
                trigger: scene,
                start: "top 75%",
                once: true,
              },
            });
            return;
          }
          draw(p, {
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 75%", once: true },
          });
        });
        setActive(0);
      });

      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray<HTMLElement>("[data-panel]", track).forEach((p) => {
          draw(p, { scrollTrigger: { trigger: p, start: "top 80%", once: true } });
        });
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.set(".draw", { clearProps: "all" });
      });
    }, root);
    return () => ctx.revert();
  }, [n]);

  const lastMaterial = materialIndex(n - 1, n);

  return (
    <ChapterShell chapterId="san-xuat">
      <div ref={rootRef}>
        {/* Tầng 1 — cảnh cuộn ngang */}
        <div className="container-cinema pb-16 md:pb-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <p className="eyebrow text-bronze lg:col-span-3">Từ bông đến áo</p>
            <p className="font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] italic leading-snug text-ivory/80 lg:col-span-8">
              <RichText text={visual.lead} />
            </p>
          </div>
        </div>

        <div ref={sceneRef} className="relative border-y border-ivory/10">
          <div ref={trackRef} className="flex flex-col">
            {stages.map((s, i) => (
              <article
                key={s.id}
                data-panel
                aria-label={`Công đoạn ${s.order}: ${s.name}`}
                className="relative flex items-center border-t border-ivory/10 py-16 first:border-t-0 md:py-0"
              >
                <div className="container-cinema grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-16">
                  <div className="md:col-span-7">
                    <div className="flex items-end gap-6">
                      <span className="font-display text-[clamp(5rem,14vw,12rem)] font-800 leading-[0.8] tracking-[-0.05em] tabular-nums text-ivory/10">
                        {pad(s.order)}
                      </span>
                      <h3 className="pb-1 font-display text-[clamp(2rem,4.6vw,4.2rem)] font-700 leading-[0.95] tracking-[-0.03em]">
                        {s.name}
                      </h3>
                    </div>
                    <p className="mt-6 max-w-xl leading-relaxed text-ivory/70 md:mt-8">
                      <RichText text={s.description} />
                    </p>
                    <dl className="mt-8 max-w-xl border-t border-ivory/10 text-sm md:mt-10">
                      <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-ivory/10 py-4">
                        <dt className="eyebrow pt-0.5 text-bronze">Lao động cụ thể</dt>
                        <dd className="leading-relaxed text-ivory/85">
                          <RichText text={s.labor} />
                        </dd>
                      </div>
                      <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-ivory/10 py-4">
                        <dt className="eyebrow pt-0.5 text-bronze">Tư liệu sản xuất</dt>
                        <dd className="flex flex-col gap-2 leading-relaxed text-ivory/85">
                          <span>
                            <span className="font-serif italic text-ivory/50">Đối tượng lao động — </span>
                            <RichText text={s.meansOfProduction.objects} />
                          </span>
                          <span>
                            <span className="font-serif italic text-ivory/50">Tư liệu lao động — </span>
                            <RichText text={s.meansOfProduction.instruments} />
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="mx-auto aspect-square w-full max-w-[16rem] md:col-span-5 md:max-w-[min(26rem,52vh)] md:justify-self-center">
                    <StageArt order={s.order} label={`Hình vẽ minh họa công đoạn ${s.name}`} />
                  </div>
                </div>
                {i < n - 1 && (
                  <span aria-hidden className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-bronze md:block">
                    →
                  </span>
                )}
              </article>
            ))}
          </div>

          {/* tiến trình — chỉ hiện khi cảnh được ghim */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden px-[clamp(1.25rem,4vw,4rem)] pb-8 md:motion-safe:block"
          >
            <div className="mx-auto flex max-w-[1312px] items-end justify-between gap-8 pb-4 text-xs">
              <span ref={counterRef} className="font-display text-lg tabular-nums text-ivory">
                1 / {n}
              </span>
              <ol className="flex gap-3 font-serif text-lg italic">
                {MATERIALS.map((m, k) => (
                  <li key={m} data-mat data-on={k === 0} className="flex gap-3 text-ivory/30 transition-colors duration-500 data-[on=true]:text-bronze">
                    {k > 0 && <span className="text-ivory/30">→</span>}
                    {m}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mx-auto h-px max-w-[1312px] bg-ivory/15">
              <div ref={barRef} className="h-px origin-left scale-x-0 bg-bronze" />
            </div>
          </div>
        </div>
        <p className="container-cinema mt-6 text-xs text-ivory/40 md:hidden">
          {MATERIALS.slice(0, lastMaterial + 1).join(" → ")}
        </p>

        {/* Tầng 2 — học thuật */}
        <LearnMore tone="dark">
          <div>
            <p className="eyebrow mb-14 text-bronze">Giải thích học thuật</p>
            <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
              {academic.concepts.map((c, i) => (
                <article key={c.id} id={`kn-${c.id}`} className="scroll-mt-24 border-t border-ivory/15 pt-8">
                  <p className="mb-6 font-display text-sm tabular-nums text-bronze">{pad(i + 1)}</p>
                  <h3 className="font-display text-[clamp(1.9rem,3.4vw,3.2rem)] font-700 leading-[0.98] tracking-[-0.03em]">
                    {c.term}
                  </h3>
                  <p className="mt-6 text-lg leading-relaxed">
                    <RichText text={c.definition} />
                  </p>
                  <p className="mt-4 leading-relaxed text-ivory/60">
                    <RichText text={c.explanation} />
                  </p>
                  <p className="mt-6 font-serif text-lg italic leading-snug text-ivory/80">
                    <RichText text={c.tshirtExample} />
                  </p>
                  <SourceNote source={c.source} className="mt-6" />
                </article>
              ))}
            </div>

            {academic.distinctions?.map((d) => (
              <div key={d.id} className="mt-20 border-t border-ivory/15 pt-14 md:mt-28">
                <p className="eyebrow mb-4 text-bronze">So sánh</p>
                <h3 className="mb-12 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,3rem)] font-700 leading-[1] tracking-[-0.025em]">
                  {d.title}
                </h3>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1px_1fr] md:gap-12">
                  {[d.left, null, d.right].map((side, k) =>
                    side ? (
                      <div key={side.term}>
                        <h4 className="font-serif text-2xl italic text-bronze md:text-3xl">{side.term}</h4>
                        <ul className="mt-6 flex flex-col gap-4">
                          {side.points.map((p, j) => (
                            <li key={j} className="flex gap-4 leading-relaxed text-ivory/75">
                              <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-ivory/40" />
                              <span>
                                <RichText text={p} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div key={`rule-${k}`} aria-hidden className="hidden bg-ivory/15 md:block" />
                    ),
                  )}
                </div>
                <p className="mt-12 max-w-3xl font-display text-xl font-500 leading-snug tracking-tight md:text-2xl">
                  <RichText text={d.takeaway} />
                </p>
                <SourceNote source={d.source} className="mt-5" />
              </div>
            ))}
          </div>
        </LearnMore>

        {/* Tầng 3 — kiểm tra */}
        <div className="container-cinema pb-24 md:pb-36">
          <QuizBlock quizId="ch02" title="Kiểm tra nhanh" questions={check} tone="dark" />
        </div>
      </div>
    </ChapterShell>
  );
}
