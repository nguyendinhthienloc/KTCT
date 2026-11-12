"use client";

import type { CapitalContent, Distinction } from "@/content/schema";
import { SurplusValue } from "@/components/interactive/surplus/SurplusValue";
import { LearnMore } from "@/components/ui/LearnMore";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";
import { SourceNote } from "@/components/ui/SourceNote";
import { Ch04Scene } from "./Ch04Scene";

const isProfit = (d: Distinction) => /lợi nhuận|loi-nhuan|profit/i.test(`${d.id} ${d.title} ${d.left.term} ${d.right.term}`);

/**
 * Chương 04 — Tư bản (nền tối).
 * Tầng 1: cảnh ghim một ngày lao động + SurplusValue. Tầng 2: giải thích + 3 cặp phân biệt. Tầng 3: kiểm tra nhanh.
 */
export function Ch04Capital({ content }: { content: CapitalContent }) {
  const { visual, academic, baseline, scenarios } = content;
  const allDistinctions = academic.distinctions ?? [];
  const profitDistinctions = allDistinctions.filter(isProfit);
  const distinctions = allDistinctions.filter((d) => !isProfit(d));

  return (
    <div className="pb-24 md:pb-32">
      {/* ───── Tầng 1 ───── */}
      <div className="container-cinema pb-16 md:pb-24">
        <p className="max-w-3xl font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] italic leading-snug text-ivory/80">
          <RichText text={visual.lead} />
        </p>
      </div>

      <Ch04Scene baseline={baseline} />

      {visual.beats.length > 0 && (
        <div className="container-cinema grid gap-10 pt-20 md:grid-cols-3 md:pt-28">
          {visual.beats.map((b) => (
            <div key={b.id} className="border-t border-ivory/20 pt-6">
              <h4 className="font-display text-xl font-600">{b.heading}</h4>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/70">
                <RichText text={b.body} />
              </p>
            </div>
          ))}
        </div>
      )}

      <section aria-labelledby="ch04-explore" className="container-cinema mt-20 border-t border-ivory/10 py-20 md:mt-28 md:py-28">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-bronze lg:col-span-3">Thử tương tác</p>
          <h3
            id="ch04-explore"
            className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-700 leading-[1.05] tracking-[-0.02em] lg:col-span-9"
          >
            Kéo dài ngày lao động, hay rút ngắn thời gian tất yếu: m′ thay đổi thế nào?
          </h3>
        </div>
        <SurplusValue baseline={baseline} scenarios={scenarios} tone="dark" />
      </section>

      {/* ───── Tầng 2 ───── */}
      {profitDistinctions.length > 0 && (
        <section aria-label="Giá trị thặng dư và lợi nhuận" className="container-cinema border-t border-ivory/10 pt-20 pb-20 md:pt-28 md:pb-28">
          {profitDistinctions.map((d) => (
            <DistinctionBlock key={d.id} d={d} prominent />
          ))}
        </section>
      )}

      <LearnMore tone="dark">
      <section aria-labelledby="ch04-academic">
        <p id="ch04-academic" className="eyebrow mb-12 text-bronze">
          Giải thích học thuật
        </p>

        <div className="divide-y divide-ivory/10">
          {academic.concepts.map((c) => (
            <article key={c.id} className="grid gap-6 py-12 first:pt-0 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-700 leading-tight tracking-[-0.02em]">{c.term}</h3>
              </div>
              <div className="grid gap-6 lg:col-span-8 md:grid-cols-2">
                <div>
                  <p className="text-[0.98rem] leading-relaxed text-ivory/85">
                    <RichText text={c.definition} />
                  </p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-ivory/60">
                    <RichText text={c.explanation} />
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-bronze">Áo thun</p>
                  <p className="font-serif text-lg italic leading-snug text-ivory/85">
                    <RichText text={c.tshirtExample} />
                  </p>
                  <SourceNote source={c.source} className="mt-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Công thức */}
        <div className="mt-8 border-t border-ivory/30 pt-10">
          <p className="eyebrow mb-8 text-bronze">Công thức</p>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {content.formulas.map((f) => (
              <div key={f.id} className="border-t border-ivory/15 pt-5">
                <p className="font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] italic leading-tight">{f.expression}</p>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ivory/65">
                  <RichText text={f.meaning} />
                </p>
                <SourceNote source={f.source} className="mt-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Ba cặp phân biệt */}
        {distinctions.length > 0 && (
          <div className="mt-24">
            <p className="eyebrow mb-4 text-bronze">Các cặp khái niệm dễ nhầm khác</p>
            <div className="flex flex-col gap-24 md:gap-32">
              {distinctions.map((d) => (
                <DistinctionBlock key={d.id} d={d} prominent={false} />
              ))}
            </div>
          </div>
        )}

        {/* Giả định */}
        <div className="mt-24 grid gap-8 border-t border-ivory/15 pt-12 lg:grid-cols-12 lg:gap-10">
          <h3 className="eyebrow text-bronze lg:col-span-4">Giả định của mô hình</h3>
          <ol className="lg:col-span-8">
            {content.assumptions.map((a, i) => (
              <li key={a.id} className="flex gap-5 border-b border-ivory/10 py-4 first:pt-0 last:border-b-0">
                <span className="w-6 shrink-0 pt-0.5 text-xs tabular-nums text-bronze">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] leading-relaxed text-ivory/80">
                  <RichText text={a.text} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </LearnMore>

      {/* ───── Tầng 3 ───── */}
      <section className="container-cinema mt-24 md:mt-32">
        <QuizBlock quizId="ch04" title="Kiểm tra nhanh" questions={content.check} tone="dark" />
      </section>
    </div>
  );
}

function DistinctionBlock({ d, prominent }: { d: Distinction; prominent: boolean }) {
  return (
    <div className={prominent ? "border-t-2 border-bronze pt-12" : "border-t border-ivory/30 pt-10"}>
      {prominent && <p className="eyebrow mb-4 text-bronze">Cần phân biệt rõ</p>}
      <h3
        className={
          prominent
            ? "font-display text-[clamp(2rem,5vw,4.5rem)] font-700 leading-[1] tracking-[-0.03em]"
            : "font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-700 leading-tight tracking-[-0.02em]"
        }
      >
        {d.title}
      </h3>

      <div className={`mt-10 grid md:grid-cols-2 md:divide-x ${prominent ? "md:divide-bronze/60" : "md:divide-ivory/15"}`}>
        {[d.left, d.right].map((side, i) => (
          <div key={i} className={`py-6 md:py-2 ${i === 0 ? "md:pr-12" : "md:pl-12"}`}>
            <h4
              className={`font-serif italic ${prominent ? "text-[clamp(2rem,3.6vw,3.2rem)] text-bronze-soft" : "text-2xl"} leading-tight`}
            >
              {side.term}
            </h4>
            <ul className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-ivory/75">
              {side.points.map((p, j) => (
                <li key={j} className="border-t border-ivory/10 pt-3">
                  <RichText text={p} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p
        className={
          prominent
            ? "mt-12 max-w-4xl font-display text-[clamp(1.4rem,2.8vw,2.4rem)] font-600 leading-snug"
            : "mt-10 max-w-3xl font-display text-lg font-600 leading-snug md:text-xl"
        }
      >
        <RichText text={d.takeaway} />
      </p>
      <SourceNote source={d.source} className="mt-3" />
    </div>
  );
}
