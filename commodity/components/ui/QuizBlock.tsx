"use client";

import { useEffect, useMemo } from "react";
import type { QuizQuestion } from "@/content/schema";
import { clearAnswers, recordAnswer, recordQuizScore, useProgress } from "@/lib/progress";
import { RichText } from "./RichText";
import { SourceNote } from "./SourceNote";

/**
 * Bộ câu hỏi trắc nghiệm, click để trả lời — FR-22, FR-71.
 * Dùng cho cả "Kiểm tra nhanh" mỗi chương và bài tổng hợp Ch.06.
 * Câu trả lời + điểm lưu qua lib/progress (FR-04).
 */
export function QuizBlock({
  quizId,
  title = "Kiểm tra kiến thức",
  questions,
  tone = "dark",
}: {
  quizId: string;
  title?: string;
  questions: QuizQuestion[];
  tone?: "dark" | "light";
}) {
  const { answers } = useProgress();
  const answered = questions.filter((q) => answers[q.id]);
  const correct = answered.filter((q) => answers[q.id] === q.correct).length;

  useEffect(() => {
    if (answered.length === questions.length && questions.length > 0) {
      recordQuizScore(quizId, correct, questions.length);
    }
  }, [answered.length, correct, questions.length, quizId]);

  const border = tone === "dark" ? "border-ivory/15" : "border-ink/15";
  const muted = tone === "dark" ? "text-ivory/60" : "text-ink/60";

  return (
    <div className={`border-t ${border} pt-10`}>
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h3 className="eyebrow text-bronze">{title}</h3>
        <span className={`flex items-baseline gap-4 text-xs tabular-nums ${muted}`}>
          {answered.length === questions.length && questions.length > 0
            ? `Đúng ${correct}/${questions.length}`
            : `${answered.length}/${questions.length} câu`}
          {answered.length > 0 && (
            <button
              type="button"
              onClick={() => clearAnswers(quizId, questions.map((q) => q.id))}
              className="underline decoration-bronze underline-offset-4 transition-colors hover:text-bronze"
            >
              Làm lại
            </button>
          )}
        </span>
      </div>
      <ol className="flex flex-col gap-12">
        {questions.map((q, i) => (
          <Question key={q.id} q={q} index={i} picked={answers[q.id]} tone={tone} />
        ))}
      </ol>
    </div>
  );
}

function Question({
  q,
  index,
  picked,
  tone,
}: {
  q: QuizQuestion;
  index: number;
  picked?: string;
  tone: "dark" | "light";
}) {
  const done = picked !== undefined;
  const isRight = picked === q.correct;
  const idle = useMemo(
    () =>
      tone === "dark"
        ? "border-ivory/15 hover:border-ivory/45"
        : "border-ink/15 hover:border-ink/45",
    [tone],
  );

  return (
    <li>
      <p className="mb-5 font-display text-lg font-500 leading-snug md:text-xl">
        <span className="mr-3 text-sm tabular-nums text-bronze">{String(index + 1).padStart(2, "0")}</span>
        <RichText text={q.prompt} />
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {q.options.map((o) => {
          const chosen = picked === o.id;
          const showRight = done && o.id === q.correct;
          const showWrong = done && chosen && !isRight;
          return (
            <button
              key={o.id}
              type="button"
              disabled={done}
              onClick={() => recordAnswer(q.id, o.id)}
              aria-pressed={chosen}
              className={`flex items-start gap-3 border px-4 py-3 text-left text-[0.92rem] leading-snug transition-colors duration-300 disabled:cursor-default ${
                showRight
                  ? "border-bronze bg-bronze/15"
                  : showWrong
                    ? "border-stone bg-stone/15 line-through decoration-stone/70"
                    : done
                      ? "border-transparent opacity-50"
                      : idle
              }`}
            >
              <span className="mt-px text-xs uppercase text-bronze">{o.id}</span>
              <RichText text={o.text} />
            </button>
          );
        })}
      </div>
      {done && (
        <div className="mt-5 max-w-3xl" role="status">
          <p className="mb-2 text-sm font-600">
            {isRight ? "Chính xác." : "Chưa đúng."}
          </p>
          <p className="text-[0.92rem] leading-relaxed opacity-80">
            <RichText text={q.explanation} />
          </p>
          <SourceNote source={q.source} className="mt-3" />
        </div>
      )}
    </li>
  );
}
