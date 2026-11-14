"use client";

import { useEffect, useRef, useState } from "react";
import type { CommodityContent } from "@/content/schema";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { ChapterShell } from "@/components/ui/ChapterShell";
import { LearnMore } from "@/components/ui/LearnMore";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { TShirt } from "@/components/ui/TShirt";
import { SourceNote } from "@/components/ui/SourceNote";

const COLORS = [
  { id: "ngà", label: "Trắng ngà", tint: undefined },
  { id: "than", label: "Đen than", tint: "#1E1D1B" },
  { id: "đồng", label: "Vàng đồng", tint: "#B59A73" },
  { id: "chàm", label: "Xanh chàm", tint: "#2F3F5C" },
] as const;
type ColorId = (typeof COLORS)[number]["id"];

const pad = (n: number) => String(n).padStart(2, "0");

export function Ch01Commodity({ content }: { content: CommodityContent }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState<ColorId>("ngà");
  const [beatsOpen, setBeatsOpen] = useState(false);
  const { visual, academic, hotspots, check } = content;
  const current = hotspots[Math.min(active, hotspots.length - 1)];
  const dark = color === "than" || color === "chàm";
  const linked = current ? academic.concepts.find((c) => c.id === current.conceptId) : undefined;

  // Khi đóng/mở beats: recalculate ScrollTrigger để không bị lệch các cảnh ghim phía dưới
  const firstBeatsToggle = useRef(true);
  useEffect(() => {
    if (firstBeatsToggle.current) {
      firstBeatsToggle.current = false;
      return;
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [beatsOpen]);

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

          <div data-stage className="mt-12 grid grid-cols-1 items-center gap-10 md:mt-16 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col items-center lg:col-span-7">
              {/* Chọn màu áo đưa lên đầu */}
              <div className="mb-6 flex w-full max-w-[460px] flex-col items-center gap-2 text-center">
                <ChipGroup
                  label="Màu áo"
                  tone="light"
                  options={COLORS.map((c) => ({ id: c.id, label: c.label }))}
                  value={color}
                  onChange={setColor}
                />
                <p className="text-[0.82rem] leading-snug text-ink/60 [text-wrap:balance]">
                  Đổi màu không đổi công dụng của chiếc áo — giá trị sử dụng nằm ở thuộc tính có ích.
                </p>
              </div>

              {/* Chiếc áo thu nhỏ kích thước (max-w-[440px] thay vì 620px) */}
              <div className="relative mx-auto aspect-[400/470] w-full max-w-[440px]">
                <div
                  data-shirt
                  className="absolute inset-0 [filter:drop-shadow(0_0_0.6px_rgba(16,16,16,0.55))_drop-shadow(0_0_0.6px_rgba(16,16,16,0.35))]"
                >
                  {COLORS.map((c) => (
                    <div
                      key={c.id}
                      aria-hidden={c.id !== color}
                      className="absolute inset-0 transition-opacity duration-500 ease-cinema motion-reduce:transition-none"
                      style={{ opacity: c.id === color ? 1 : 0 }}
                    >
                      <TShirt
                        className="h-full w-full"
                        tint={c.tint}
                        label={
                          c.id === "ngà"
                            ? "Chiếc áo thun cotton nhìn từ phía trước, với các điểm đánh số để khám phá"
                            : `Chiếc áo thun cotton màu ${c.label.toLowerCase()}`
                        }
                      />
                    </div>
                  ))}
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
                          on ? `bg-ink text-ivory${dark ? " ring-2 ring-ivory" : ""}` : "border border-ink bg-ivory text-ink"
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
                    <div className="mt-8 border-l border-bronze pl-5">
                      <p className="eyebrow mb-2 text-bronze">Khái niệm</p>
                      <p className="font-serif text-xl italic leading-snug text-ink">{linked.term}</p>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/70">
                        <RichText text={linked.definition} />
                      </p>
                      <a
                        href={`/thuat-ngu/#kn-tn-${linked.id}`}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-ink underline decoration-bronze decoration-1 underline-offset-4 transition-colors hover:text-bronze"
                      >
                        Xem trong Thuật ngữ <span aria-hidden>→</span>
                      </a>
                    </div>
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

          <div className="mt-16 border-t border-ink/10 pt-8 md:mt-24">
            <button
              type="button"
              aria-expanded={beatsOpen}
              onClick={() => setBeatsOpen((v) => !v)}
              className="group flex w-full items-center justify-between gap-6 py-2 text-left transition-opacity hover:opacity-90"
            >
              <div>
                <p className="eyebrow text-bronze">Khám phá sâu hơn</p>
                <h4 className="mt-1 font-display text-xl font-600 text-ink md:text-2xl">
                  4 góc nhìn về chiếc áo
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs font-500 uppercase tracking-wider text-bronze">
                <span>{beatsOpen ? "Thu gọn" : "Mở rộng"}</span>
                <span
                  aria-hidden
                  className="inline-block text-2xl transition-transform duration-300"
                  style={{ transform: beatsOpen ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </div>
            </button>

            {beatsOpen && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {visual.beats.map((b, i) => (
                  <article
                    key={b.id}
                    className="group relative flex flex-col justify-between rounded-xl border border-ink/10 bg-ivory/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-bronze/60 hover:shadow-md"
                  >
                    <div>
                      <span className="flex size-7 items-center justify-center rounded-full border border-bronze/50 font-display text-xs tabular-nums text-bronze group-hover:bg-bronze group-hover:text-ink">
                        {pad(i + 1)}
                      </span>
                      <h3 className="mt-4 font-display text-xl font-700 leading-snug tracking-tight text-ink [text-wrap:balance]">
                        {b.heading}
                      </h3>
                    </div>
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/70">
                      <RichText text={b.body} />
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tầng 2 — học thuật */}
        <LearnMore tone="light">
          <div>
            <p className="eyebrow mb-14 text-bronze">Giải thích học thuật</p>
            <div className="flex flex-col">
              {academic.concepts.map((c, i) => (
                <article
                  key={c.id}
                  id={`kn-${c.id}`}
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
              <div key={d.id} className="mt-16 border-t border-ink/10 pt-14 md:mt-24">
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
        </LearnMore>

        {/* Tầng 3 — kiểm tra */}
        <div className="container-cinema pb-24 md:pb-36">
          <QuizBlock quizId="ch01" title="Kiểm tra nhanh" questions={check} tone="light" />
        </div>
      </div>
    </ChapterShell>
  );
}
