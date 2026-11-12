"use client";

import { useEffect, useRef, useState } from "react";
import type { RecapContent } from "@/content/schema";
import { CHAPTERS } from "@/content/chapters";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";

/* Vòng đời: các mắt xích nằm trên một vòng tròn — thể hiện tái sản xuất (tích lũy quay về sản xuất). */
const VB = 600;
const C = VB / 2;
const R = 236;
const round = (v: number) => Math.round(v * 100) / 100;

function LifecycleRing({ nodes }: { nodes: RecapContent["lifecycle"] }) {
  const [active, setActive] = useState(0);
  const n = nodes.length;
  const pts = nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    // làm tròn để HTML server và client giống hệt nhau (tránh lệch hydration)
    return { x: round(C + Math.cos(a) * R), y: round(C + Math.sin(a) * R), a };
  });
  const node = nodes[active];
  const chapter = CHAPTERS.find((c) => c.id === node.chapterId);

  // cung sáng từ mắt xích đầu tới mắt xích đang chọn
  const arcLen = round((active / n) * 2 * Math.PI * R);
  const circ = round(2 * Math.PI * R);

  return (
    <div data-ring className="grid items-center gap-12 lg:grid-cols-12">
      <div className="relative mx-auto aspect-square w-full max-w-[600px] lg:col-span-7">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {/* vòng nền */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
          {/* vòng tự vẽ khi cuộn tới */}
          <circle
            data-ring-draw
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="var(--color-bronze)"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray={circ}
            strokeDashoffset={0}
            transform={`rotate(-90 ${C} ${C})`}
          />
          {/* cung tiến trình tới mắt xích đang chọn */}
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="var(--color-bronze)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circ}`}
            transform={`rotate(-90 ${C} ${C})`}
            style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.22,1,0.36,1)" }}
          />
          {/* mũi tên chiều vận động giữa các mắt xích */}
          {pts.map((p, i) => {
            const a = p.a + Math.PI / n;
            const x = round(C + Math.cos(a) * R);
            const y = round(C + Math.sin(a) * R);
            const deg = round((a * 180) / Math.PI + 90);
            return (
              <path
                key={i}
                d="M-5 -4 L0 0 L-5 4"
                transform={`translate(${x} ${y}) rotate(${deg})`}
                fill="none"
                stroke="var(--color-bronze)"
                strokeOpacity="0.7"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Mắt xích */}
        {nodes.map((nd, i) => {
          const on = i === active;
          const p = pts[i];
          return (
            <button
              key={nd.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              aria-label={`Mắt xích ${i + 1}: ${nd.label}`}
              data-node
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${(p.x / VB) * 100}%`, top: `${(p.y / VB) * 100}%` }}
            >
              <span
                className={`flex size-10 items-center justify-center rounded-full border text-xs tabular-nums transition-all duration-500 ease-cinema sm:size-12 sm:text-sm ${
                  on
                    ? "scale-110 border-bronze bg-bronze text-ink"
                    : "border-ivory/30 bg-ink text-ivory/80 group-hover:border-bronze"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`pointer-events-none absolute top-full mt-2 hidden w-28 text-center text-[0.72rem] leading-tight transition-opacity sm:block ${
                  on ? "text-ivory" : "text-ivory/50"
                }`}
              >
                {nd.label}
              </span>
            </button>
          );
        })}

        {/* Tâm vòng: mắt xích đang chọn (desktop) */}
        <div className="pointer-events-none absolute inset-[24%] hidden flex-col items-center justify-center text-center md:flex">
          <p className="eyebrow text-bronze">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <p key={node.id} className="anim-fade mt-3 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-700 leading-tight">
            {node.label}
          </p>
        </div>
      </div>

      {/* Chi tiết mắt xích */}
      <div className="lg:col-span-5" aria-live="polite">
        <p className="eyebrow mb-4 text-bronze">
          Mắt xích {String(active + 1).padStart(2, "0")}
          {chapter ? ` · Chương ${chapter.number}` : ""}
        </p>
        <h4 key={node.id} className="anim-fade font-display text-[clamp(2rem,3.4vw,3rem)] font-700 leading-[1] tracking-[-0.02em]">
          {node.label}
        </h4>
        <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/70">
          <RichText text={node.summary} />
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`#${node.chapterId}`}
            className="inline-flex items-center gap-3 border border-bronze px-5 py-2.5 text-sm text-bronze-soft transition-colors hover:bg-bronze hover:text-ink"
          >
            <span aria-hidden>←</span> Quay lại chương {chapter?.title}
          </a>
          <button
            type="button"
            onClick={() => setActive((active + 1) % n)}
            className="text-sm text-ivory/60 underline decoration-bronze underline-offset-4 transition-colors hover:text-ivory"
          >
            Mắt xích tiếp theo →
          </button>
        </div>
        <p className="mt-10 max-w-md font-serif text-lg italic leading-snug text-ivory/55">
          Vòng khép lại: giá trị thặng dư được tích lũy, quay trở lại mở rộng sản xuất — và hành trình lại bắt đầu.
        </p>
      </div>
    </div>
  );
}

export function Ch06Recap({ content }: { content: RecapContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const circ = 2 * Math.PI * R;
        gsap.fromTo(
          "[data-ring-draw]",
          { strokeDashoffset: circ },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: "[data-ring]", start: "top 85%", end: "center 55%", scrub: true },
          },
        );
        gsap.from("[data-node]", {
          scale: 0.4,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: "[data-ring]", start: "top 70%", once: true },
        });
        gsap.from("[data-close-w]", {
          opacity: 0.1,
          y: 24,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-closing]", start: "top 70%", end: "center 40%", scrub: true },
        });
        gsap.from("[data-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: { trigger: "[data-closing]", start: "center 55%", end: "center 35%", scrub: true },
        });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="Tổng kết" className="container-cinema">
      {/* Vòng đời */}
      <div className="pb-24 lg:pb-32">
        <p className="eyebrow mb-4 text-bronze">Vòng đời của một chiếc áo</p>
        <p className="mb-14 max-w-xl text-sm text-ivory/55">Chạm vào từng mắt xích để xem lại, hoặc quay về chương tương ứng.</p>
        <LifecycleRing nodes={content.lifecycle} />
      </div>

      {/* Bài kiểm tra tổng hợp */}
      <div className="pb-24 lg:pb-32">
        <QuizBlock quizId="tong-ket" title="Kiểm tra kiến thức" questions={content.finalQuiz} tone="dark" />
      </div>

      {/* Tài liệu tham khảo */}
      <div className="border-t border-ivory/15 pb-24 pt-10 lg:pb-32">
        <h3 className="eyebrow mb-8 text-bronze">Tài liệu tham khảo</h3>
        <ol className="grid max-w-4xl gap-4">
          {content.references.map((r, i) => (
            <li key={r.id} className="grid grid-cols-[2.5rem_1fr] text-sm leading-relaxed text-ivory/75">
              <span className="tabular-nums text-bronze">[{i + 1}]</span>
              <span>{r.citation}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Lời kết */}
      <div data-closing className="flex min-h-screen flex-col justify-center py-24">
        <h3 className="sr-only">{content.closing}</h3>
        <p
          aria-hidden
          className="font-display text-[clamp(2.4rem,8.5vw,8rem)] font-800 leading-[1.06] tracking-[-0.03em]"
        >
          {content.closing
            .split(/\s+/)
            .filter(Boolean)
            .map((w, i) => (
              <span key={i}>
                <span data-close-w className="inline-block">
                  {w}
                </span>{" "}
              </span>
            ))}
        </p>
        <div data-rule className="mt-12 h-px w-full bg-bronze" />
        <a
          href="#khoi-dau"
          className="mt-6 self-start text-xs tracking-wide text-ivory/60 transition-colors hover:text-bronze"
        >
          Quay về đầu trang <span aria-hidden>↑</span>
        </a>
      </div>
    </section>
  );
}
