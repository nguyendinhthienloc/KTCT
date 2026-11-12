"use client";

import { useEffect, useRef } from "react";
import type { Factory, MarketContent, ShareScenario } from "@/content/schema";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { MarketSim } from "@/components/interactive/market/MarketSim";
import { LearnMore } from "@/components/ui/LearnMore";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";
import { SourceNote } from "@/components/ui/SourceNote";
import { Words } from "./Words";

function PriceTag() {
  return (
    <svg
      viewBox="0 0 200 260"
      role="img"
      aria-label="Nhãn giá treo trên chiếc áo thun khi ra thị trường"
      className="h-auto w-40 md:w-52"
    >
      <g data-tag style={{ transformOrigin: "100px 20px", transformBox: "view-box" }}>
        <path d="M100 20 C 100 -10, 60 -10, 60 40" fill="none" stroke="currentColor" strokeOpacity="0.5" />
        <path
          d="M100 40 L160 70 L160 240 L40 240 L40 70 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="68" r="6" fill="none" stroke="var(--color-bronze)" strokeWidth="1.5" />
        <text x="100" y="140" textAnchor="middle" fontSize="12" letterSpacing="4" fill="var(--color-bronze)">
          GIÁ CẢ
        </text>
        <text
          x="100"
          y="196"
          textAnchor="middle"
          fontSize="48"
          fontStyle="italic"
          fontFamily="var(--font-cormorant), Georgia, serif"
          fill="currentColor"
        >
          ?
        </text>
      </g>
    </svg>
  );
}

export function Ch05Market({
  content,
  factories,
  baseScenario,
}: {
  content: MarketContent;
  factories: Factory[];
  baseScenario: ShareScenario;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (c) => {
          const desktop = !!c.conditions?.desktop;
          gsap.from("[data-tag]", {
            rotation: -38,
            y: -40,
            opacity: 0,
            duration: 1.6,
            ease: "elastic.out(1, 0.35)",
            scrollTrigger: { trigger: "[data-tag-wrap]", start: "top 75%", once: true },
          });
          gsap.utils.toArray<HTMLElement>("[data-beat]").forEach((beat) => {
            const words = beat.querySelectorAll("[data-w]");
            if (desktop) {
              gsap.from(words, {
                opacity: 0.12,
                y: 12,
                ease: "none",
                stagger: 0.08,
                scrollTrigger: { trigger: beat, start: "top 82%", end: "bottom 55%", scrub: true },
              });
            } else {
              gsap.from(words, {
                opacity: 0.12,
                y: 12,
                duration: 0.6,
                stagger: 0.03,
                ease: "power2.out",
                scrollTrigger: { trigger: beat, start: "top 85%", once: true },
              });
            }
          });
        },
      );
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  const { visual, academic } = content;

  return (
    <div ref={root}>
      {/* Tầng 1 — hàng ra thị trường */}
      <div className="container-cinema grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16 lg:pb-40">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="max-w-md font-serif text-2xl italic leading-snug text-ink/80 md:text-3xl">{visual.lead}</p>
            <div data-tag-wrap className="mt-12 text-ink">
              <PriceTag />
            </div>
          </div>
        </div>
        <ol className="flex flex-col gap-24 lg:col-span-7 lg:gap-40 lg:pt-24">
          {visual.beats.map((b, i) => (
            <li key={b.id} data-beat className="border-t border-ink/15 pt-6">
              <p className="eyebrow tabular-nums text-bronze">{String(i + 1).padStart(2, "0")}</p>
              <Words
                as="h3"
                text={b.heading}
                className="mt-4 block font-display text-[clamp(2rem,4.4vw,3.6rem)] font-700 leading-[1.02] tracking-[-0.02em]"
              />
              <Words as="p" text={b.body} className="mt-6 block max-w-xl text-lg leading-relaxed text-ink/80" />
            </li>
          ))}
        </ol>
      </div>

      {/* Thử tương tác */}
      <div className="container-cinema border-t border-ink/15 pb-24 pt-16 lg:pb-40 lg:pt-24">
        <p className="eyebrow mb-10 text-bronze">Thử tương tác</p>
        <MarketSim content={content} factories={factories} baseScenario={baseScenario} tone="light" />
      </div>

      {/* Tầng 2 — học thuật */}
      <LearnMore tone="light">
      <div>
        <p className="eyebrow mb-12 text-bronze">Khái niệm</p>
        <div className="flex flex-col">
          {academic.concepts.map((c) => (
            <article key={c.id} id={c.id} className="grid gap-4 border-t border-ink/15 py-10 lg:grid-cols-12 lg:gap-12">
              <h3 className="font-display text-3xl font-700 leading-tight tracking-tight lg:col-span-4">{c.term}</h3>
              <div className="lg:col-span-8">
                <p className="text-lg leading-relaxed">
                  <RichText text={c.definition} />
                </p>
                <p className="mt-4 leading-relaxed text-ink/70">
                  <RichText text={c.explanation} />
                </p>
                <p className="mt-4 border-l border-bronze pl-4 font-serif text-lg italic text-ink/80">
                  <RichText text={c.tshirtExample} />
                </p>
                <SourceNote source={c.source} className="mt-4" />
              </div>
            </article>
          ))}
        </div>

        {academic.distinctions?.map((d) => (
          <div key={d.id} className="mt-20 border-t border-ink/15 pt-10">
            <p className="eyebrow mb-8 text-bronze">{d.title}</p>
            <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/15">
              {[d.left, d.right].map((side, k) => (
                <div key={side.term} className={k === 0 ? "md:pr-12" : "md:pl-12"}>
                  <h4 className="font-display text-4xl font-700 tracking-tight">{side.term}</h4>
                  <ul className="mt-6 grid gap-3 text-ink/80">
                    {side.points.map((p) => (
                      <li key={p} className="border-t border-ink/10 pt-3 leading-relaxed">
                        <RichText text={p} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl font-serif text-2xl italic leading-snug">
              <RichText text={d.takeaway} />
            </p>
            <SourceNote source={d.source} className="mt-4" />
          </div>
        ))}

        <div className="mt-20 border-t border-ink/15 pt-10">
          <p className="eyebrow mb-6 text-bronze">Giả định của mô hình</p>
          <ul className="grid max-w-3xl gap-3">
            {content.assumptions.map((a) => (
              <li key={a.id} className="flex gap-4 leading-relaxed text-ink/80">
                <span aria-hidden className="text-bronze">
                  —
                </span>
                <RichText text={a.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      </LearnMore>

      {/* Tầng 3 — kiểm tra */}
      <div className="container-cinema pb-24 lg:pb-32">
        <QuizBlock quizId="ch05" title="Kiểm tra nhanh" questions={content.check} tone="light" />
      </div>
    </div>
  );
}
