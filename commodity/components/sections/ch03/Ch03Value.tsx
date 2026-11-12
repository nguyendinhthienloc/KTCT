"use client";

import type { ValueContent } from "@/content/schema";
import { FactoryCompare } from "@/components/interactive/factory/FactoryCompare";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { RichText } from "@/components/ui/RichText";
import { SourceNote } from "@/components/ui/SourceNote";
import { Ch03Story } from "./Ch03Story";

/**
 * Chương 03 — Giá trị (nền sáng).
 * Tầng 1: câu chuyện ghim 3 bước + FactoryCompare. Tầng 2: giải thích. Tầng 3: kiểm tra nhanh.
 */
export function Ch03Value({ content }: { content: ValueContent }) {
  const { visual, academic, factories, scenarios } = content;
  const extraBeats = visual.beats.slice(3);

  return (
    <div className="pb-24 md:pb-32">
      {/* ───── Tầng 1 ───── */}
      <div className="container-cinema pb-16 md:pb-24">
        <p className="max-w-3xl font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] italic leading-snug text-ink/80">
          <RichText text={visual.lead} />
        </p>
      </div>

      {scenarios.length > 0 && factories.length > 0 && (
        <Ch03Story factories={factories} scenario={scenarios[0]} beats={visual.beats.slice(0, 3)} />
      )}

      <section aria-labelledby="ch03-explore" className="container-cinema border-t border-ink/10 py-20 md:py-32">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-bronze lg:col-span-3">Thử tương tác</p>
          <h3
            id="ch03-explore"
            className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-700 leading-[1.05] tracking-[-0.02em] lg:col-span-9"
          >
            Ai làm ra phần lớn số áo, thời gian xã hội cần thiết sẽ nghiêng về phía đó.
          </h3>
        </div>
        <FactoryCompare factories={factories} scenarios={scenarios} tone="light" />
      </section>

      {extraBeats.length > 0 && (
        <div className="container-cinema grid gap-10 pb-20 md:grid-cols-2 md:pb-28">
          {extraBeats.map((b) => (
            <div key={b.id} className="border-t border-ink/15 pt-6">
              <h4 className="font-display text-xl font-600">{b.heading}</h4>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                <RichText text={b.body} />
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ───── Tầng 2 ───── */}
      <section aria-labelledby="ch03-academic" className="container-cinema border-t border-ink/10 pt-20 md:pt-28">
        <p id="ch03-academic" className="eyebrow mb-12 text-bronze">
          Giải thích học thuật
        </p>

        <div className="divide-y divide-ink/10">
          {academic.concepts.map((c) => (
            <article key={c.id} className="grid gap-6 py-12 first:pt-0 lg:grid-cols-12 lg:gap-10">
              <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-700 leading-tight tracking-[-0.02em] lg:col-span-4">
                {c.term}
              </h3>
              <div className="lg:col-span-8">
                <p className="font-serif text-xl italic leading-snug md:text-2xl">
                  <RichText text={c.definition} />
                </p>
                <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-ink/75">
                  <RichText text={c.explanation} />
                </p>
                <p className="mt-5 max-w-2xl border-l border-bronze pl-4 text-[0.92rem] leading-relaxed text-ink/70">
                  <span className="eyebrow mr-2 text-bronze">Áo thun</span>
                  <RichText text={c.tshirtExample} />
                </p>
                <SourceNote source={c.source} className="mt-4" />
              </div>
            </article>
          ))}
        </div>

        {/* Cá biệt vs xã hội cần thiết */}
        {academic.distinctions?.map((d) => (
          <div key={d.id} className="mt-8 border-t border-ink pt-10 md:mt-16">
            <p className="eyebrow mb-3 text-bronze">Phân biệt</p>
            <h3 className="mb-10 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-700 leading-tight tracking-[-0.02em]">
              {d.title}
            </h3>
            <div className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/15">
              {[d.left, d.right].map((side, i) => (
                <div key={i} className={i === 0 ? "md:pr-12" : "md:pl-12"}>
                  <h4 className="font-serif text-2xl italic">{side.term}</h4>
                  <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-ink/75">
                    {side.points.map((p, j) => (
                      <li key={j} className="border-t border-ink/10 pt-3">
                        <RichText text={p} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl font-display text-xl font-600 leading-snug md:text-2xl">
              <RichText text={d.takeaway} />
            </p>
            <SourceNote source={d.source} className="mt-3" />
          </div>
        ))}

        {/* Phương pháp tính */}
        <div className="mt-20 grid gap-8 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow text-bronze lg:col-span-4">Mô hình tính TGLĐXHCT</p>
          <p className="max-w-3xl text-[1.05rem] leading-relaxed lg:col-span-8">
            <RichText text={content.method} />
          </p>
        </div>

        {/* Giả định */}
        <div className="mt-12 grid gap-8 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-10">
          <h3 className="eyebrow text-bronze lg:col-span-4">Giả định của mô hình</h3>
          <ol className="lg:col-span-8">
            {content.assumptions.map((a, i) => (
              <li key={a.id} className="flex gap-5 border-b border-ink/10 py-4 first:pt-0 last:border-b-0">
                <span className="w-6 shrink-0 pt-0.5 text-xs tabular-nums text-bronze">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] leading-relaxed text-ink/80">
                  <RichText text={a.text} />
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Nhân tố ảnh hưởng lượng giá trị */}
        <div className="mt-20 border-t border-ink pt-10">
          <p className="eyebrow mb-4 text-bronze">Nhân tố ảnh hưởng đến lượng giá trị</p>
          <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/15">
            {content.factors.map((f, i) => (
              <article key={f.id} className={`md:px-8 ${i === 0 ? "md:pl-0" : ""} ${i === content.factors.length - 1 ? "md:pr-0" : ""}`}>
                <span className="font-serif text-5xl italic text-bronze tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-4 font-display text-xl font-700 leading-tight">{f.term}</h4>
                <p className="mt-4 text-[0.93rem] leading-relaxed text-ink/80">
                  <RichText text={f.definition} />
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/60">
                  <RichText text={f.explanation} />
                </p>
                <p className="mt-3 text-[0.9rem] italic leading-relaxed text-ink/60">
                  <RichText text={f.tshirtExample} />
                </p>
                <SourceNote source={f.source} className="mt-4" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Tầng 3 ───── */}
      <section className="container-cinema mt-24 md:mt-32">
        <QuizBlock quizId="ch03" title="Kiểm tra nhanh" questions={content.check} tone="light" />
      </section>
    </div>
  );
}
