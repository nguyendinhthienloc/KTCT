"use client";

import { useEffect, useRef, useState } from "react";
import type { CommodityContent } from "@/content/schema";
import { gsap } from "@/lib/motion";
import { ChapterShell } from "@/components/ui/ChapterShell";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";
import { TShirt } from "@/components/ui/TShirt";
import { SourceNote } from "@/components/ui/SourceNote";

const pad = (n: number) => String(n).padStart(2, "0");

export function Ch01Commodity({ content }: { content: CommodityContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { visual, academic, hotspots, check } = content;
  const current = hotspots[Math.min(active, hotspots.length - 1)];
  const linked = current ? academic.concepts.find((c) => c.id === current.conceptId) : undefined;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: "[data-stage]", start: "top 75%", once: true };
        gsap.from("[data-shirt]", {
          opacity: 0,
          scale: 0.94,
          y: 30,
          transformOrigin: "50% 60%",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: st,
        });
        gsap.from("[data-hotspot]", {
          opacity: 0,
          scale: 0.6,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.5,
          ease: "back.out(2)",
          scrollTrigger: st,
        });
        gsap.fromTo(
          "[data-pulse]",
          { scale: 1, opacity: 0.45 },
          { scale: 1.9, opacity: 0, duration: 2.2, repeat: -1, ease: "power1.out", stagger: 0.25 },
        );
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 36,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ChapterShell chapterId="hang-hoa">
      <div ref={rootRef}>
        {/* Tầng 1 — khám phá */}
        <div className="container-cinema pb-24 md:pb-40">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <p className="eyebrow text-bronze lg:col-span-3">Thử tương tác</p>
            <p className="font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] italic leading-snug text-ink/80 lg:col-span-8">
              <RichText text={visual.lead} />
            </p>
          </div>

          <div data-stage className="mt-16 grid grid-cols-1 items-center gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="relative mx-auto aspect-[400/470] w-full max-w-[620px]">
                <div
                  data-shirt
                  className="absolute inset-0 [filter:drop-shadow(0_0_0.6px_rgba(16,16,16,0.55))_drop-shadow(0_0_0.6px_rgba(16,16,16,0.35))]"
                >
                  <TShirt className="h-full w-full" label="Chiếc áo thun cotton trắng nhìn từ phía trước, với các điểm đánh số để khám phá" />
                </div>
                {hotspots.map((h, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      data-hotspot
                      aria-pressed={on}
                      aria-label={`Điểm ${i + 1}: ${h.label}`}
                      onClick={() => setActive(i)}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className="absolute z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:size-11"
                    >
                      <span
                        data-pulse
                        aria-hidden
                        className={`absolute inset-1 rounded-full border ${on ? "border-bronze" : "border-ink/50"}`}
                      />
                      <span
                        className={`relative flex size-7 items-center justify-center rounded-full text-[0.7rem] tabular-nums transition-colors duration-500 ease-cinema sm:size-8 sm:text-xs ${
                          on ? "bg-ink text-ivory" : "border border-ink bg-ivory text-ink"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              {current && (
                <div aria-live="polite" className="border-t border-ink/10 pt-8">
                  <p className="eyebrow mb-5 tabular-nums text-bronze">
                    Điểm {pad(active + 1)} / {pad(hotspots.length)}
                  </p>
                  <h3 className="font-display text-[clamp(2rem,3.6vw,3.2rem)] font-700 leading-[0.98] tracking-[-0.025em]">
                    {current.label}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-ink/75">
                    <RichText text={current.body} />
                  </p>
                  {linked && (
                    <p className="mt-6 text-sm text-ink/60">
                      Khái niệm:{" "}
                      <a
                        href={`#${linked.id}`}
                        className="font-serif text-lg italic text-ink underline decoration-bronze decoration-1 underline-offset-4"
                      >
                        {linked.term}
                      </a>
                    </p>
                  )}
                </div>
              )}
              <ol className="mt-8 border-t border-ink/10">
                {hotspots.map((h, i) => (
                  <li key={h.id} className="border-b border-ink/10">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={i === active}
                      className={`flex w-full items-baseline gap-4 py-3 text-left text-sm transition-colors duration-300 ${
                        i === active ? "text-ink" : "text-ink/45 hover:text-ink/80"
                      }`}
                    >
                      <span className="tabular-nums text-bronze">{pad(i + 1)}</span>
                      <span>{h.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-14 border-t border-ink/10 pt-12 md:mt-36 md:grid-cols-3">
            {visual.beats.map((b, i) => (
              <article key={b.id} data-reveal>
                <p className="mb-4 font-display text-sm tabular-nums text-bronze">{pad(i + 1)}</p>
                <h3 className="font-display text-2xl font-600 leading-tight tracking-tight md:text-[1.7rem]">{b.heading}</h3>
                <p className="mt-4 leading-relaxed text-ink/70">
                  <RichText text={b.body} />
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Tầng 2 — học thuật */}
        <div className="border-t border-ink/10 py-24 md:py-40">
          <div className="container-cinema">
            <p className="eyebrow mb-14 text-bronze">Giải thích học thuật</p>
            <div className="flex flex-col">
              {academic.concepts.map((c, i) => (
                <article
                  key={c.id}
                  id={c.id}
                  data-reveal
                  className="grid scroll-mt-24 grid-cols-1 gap-6 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-8 lg:py-16"
                >
                  <div className="lg:col-span-5">
                    <p className="mb-3 text-xs tabular-nums text-ink/40">{pad(i + 1)}</p>
                    <h3 className="font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-700 leading-[0.95] tracking-[-0.03em]">
                      {c.term}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed md:text-xl">
                      <RichText text={c.definition} />
                    </p>
                    <p className="mt-5 leading-relaxed text-ink/65">
                      <RichText text={c.explanation} />
                    </p>
                    <p className="mt-6 border-l border-bronze pl-5 font-serif text-lg italic leading-snug text-ink/80">
                      <RichText text={c.tshirtExample} />
                    </p>
                    <SourceNote source={c.source} className="mt-6" />
                  </div>
                </article>
              ))}
            </div>

            {academic.distinctions?.map((d) => (
              <div key={d.id} data-reveal className="mt-16 border-t border-ink/10 pt-14 md:mt-24">
                <p className="eyebrow mb-4 text-bronze">So sánh</p>
                <h3 className="mb-12 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,3rem)] font-700 leading-[1] tracking-[-0.025em]">
                  {d.title}
                </h3>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1px_1fr] md:gap-12">
                  {[d.left, null, d.right].map((side, k) =>
                    side ? (
                      <div key={side.term}>
                        <h4 className="font-serif text-2xl italic md:text-3xl">{side.term}</h4>
                        <ul className="mt-6 flex flex-col gap-4">
                          {side.points.map((p, j) => (
                            <li key={j} className="flex gap-4 leading-relaxed text-ink/75">
                              <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-bronze" />
                              <span>
                                <RichText text={p} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div key={`rule-${k}`} aria-hidden className="hidden bg-ink/15 md:block" />
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
        </div>

        {/* Tầng 3 — kiểm tra */}
        <div className="container-cinema pb-24 md:pb-36">
          <QuizBlock quizId="ch01" title="Kiểm tra nhanh" questions={check} tone="light" />
        </div>
      </div>
    </ChapterShell>
  );
}
