"use client";

import { useEffect, useRef } from "react";
import type { LifecycleNode, RecapContent } from "@/content/schema";
import { CHAPTERS } from "@/content/chapters";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { QuizBlock } from "@/components/ui/QuizBlock";

const VB_W = 1000;
const VB_H = 120;

function NodeLink({ node, i }: { node: LifecycleNode; i: number }) {
  const num = CHAPTERS.find((c) => c.id === node.chapterId)?.number ?? "";
  return (
    <a
      href={`#${node.chapterId}`}
      data-node
      className="group block border-t border-ivory/15 pt-4 transition-colors hover:border-bronze"
    >
      <span className="eyebrow tabular-nums text-bronze">
        {String(i + 1).padStart(2, "0")} · Chương {num}
      </span>
      <span className="mt-2 block font-display text-xl font-700 leading-tight">{node.label}</span>
      <span className="mt-2 block text-sm leading-relaxed text-ivory/65">{node.summary}</span>
      <span className="mt-3 block text-xs text-bronze">
        Quay lại chương{" "}
        <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
          ←
        </span>
      </span>
    </a>
  );
}

export function Ch06Recap({ content }: { content: RecapContent }) {
  const root = useRef<HTMLElement>(null);
  const nodes = content.lifecycle;
  const n = nodes.length;

  // Điểm dọc theo đường chảy ngang (viewBox 1000×120), so le lên xuống.
  const pts = nodes.map((_, i) => ({ x: ((i + 0.5) / n) * VB_W, y: i % 2 === 0 ? 38 : 82 }));
  let d = `M0 60 C ${pts[0].x / 2} 60, ${pts[0].x / 2} ${pts[0].y}, ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < n; i++) {
    const q = pts[i - 1];
    const p = pts[i];
    const mx = (q.x + p.x) / 2;
    d += ` C ${mx} ${q.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
  }
  const last = pts[n - 1];
  d += ` C ${(last.x + VB_W) / 2} ${last.y}, ${(last.x + VB_W) / 2} 60, ${VB_W} 60`;

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
          const sel = desktop ? "[data-path-h]" : "[data-path-v]";
          const wrap = desktop ? "[data-life-h]" : "[data-life-v]";
          gsap.fromTo(
            sel,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: { trigger: wrap, start: "top 80%", end: desktop ? "bottom 45%" : "bottom 60%", scrub: true },
            },
          );
          gsap.from(`${wrap} [data-node]`, {
            opacity: 0.2,
            y: 16,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: wrap, start: "top 75%", once: true },
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
        },
      );
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="Tổng kết" className="container-cinema">
      {/* Vòng đời */}
      <div className="pb-24 lg:pb-32">
        <p className="eyebrow mb-10 text-bronze">Vòng đời của một chiếc áo</p>

        {/* Ngang — desktop */}
        <div data-life-h className="hidden md:block">
          <div className="relative h-[120px]">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              role="img"
              aria-label="Đường vòng đời nối các chương từ bông đến thị trường"
              className="absolute inset-0 h-full w-full overflow-visible text-bronze"
            >
              <path
                d={d}
                pathLength={1}
                data-path-h
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {pts.map((p, i) => (
              <span
                key={i}
                aria-hidden
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze"
                style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%` }}
              />
            ))}
          </div>
          <ol className="mt-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {nodes.map((node, i) => (
              <li key={node.id}>
                <NodeLink node={node} i={i} />
              </li>
            ))}
          </ol>
        </div>

        {/* Dọc — mobile */}
        <div data-life-v className="relative md:hidden">
          <svg
            viewBox="0 0 24 1000"
            preserveAspectRatio="none"
            role="img"
            aria-label="Đường vòng đời nối các chương từ bông đến thị trường"
            className="absolute bottom-0 left-0 top-0 h-full w-6 text-bronze"
          >
            <path
              d="M12 0 L12 1000"
              pathLength={1}
              data-path-v
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="flex flex-col gap-8 pl-10">
            {nodes.map((node, i) => (
              <li key={node.id} className="relative">
                <span aria-hidden className="absolute -left-[34px] top-[1.15rem] h-3 w-3 rounded-full bg-bronze" />
                <NodeLink node={node} i={i} />
              </li>
            ))}
          </ol>
        </div>
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
          className="font-display text-[clamp(2.4rem,8.5vw,8rem)] font-800 leading-[0.98] tracking-[-0.03em]"
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
