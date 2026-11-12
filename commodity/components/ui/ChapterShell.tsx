"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CHAPTERS, chapterIndex } from "@/content/chapters";
import { markVisited } from "@/lib/progress";

/**
 * Khung một chương: nền tối/sáng, tiêu đề, câu hỏi trung tâm, nút chương trước/sau.
 * - Đánh dấu "đã xem" khi người dùng cuộn qua ≥ 60% chiều cao chương (FR-03).
 * - Component chương chỉ render phần thân bên trong (children).
 */
export function ChapterShell({
  chapterId,
  children,
  hideHeader = false,
}: {
  chapterId: string;
  children: ReactNode;
  hideHeader?: boolean;
}) {
  const idx = chapterIndex(chapterId);
  const chapter = CHAPTERS[idx];
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) {
        markVisited(chapterId);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [chapterId]);

  const light = chapter.theme === "light";

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      data-theme={chapter.theme}
      className={`relative ${light ? "bg-ivory text-ink" : "bg-ink text-ivory"}`}
    >
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-[60%] h-px w-px" />

      {!hideHeader && (
        <header className="container-cinema pb-16 pt-32 md:pb-24 md:pt-44">
          <p className="eyebrow mb-6 text-bronze">Chương {chapter.number}</p>
          <h2
            id={`${chapter.id}-title`}
            className="font-display text-[clamp(3rem,9vw,8.5rem)] font-700 leading-[0.92] tracking-[-0.03em]"
          >
            {chapter.title}.
          </h2>
          <p
            className={`mt-8 max-w-2xl font-serif text-[clamp(1.35rem,2.4vw,2rem)] italic leading-snug ${
              light ? "text-ink/70" : "text-ivory/70"
            }`}
          >
            {chapter.question}
          </p>
        </header>
      )}
      {hideHeader && (
        <h2 id={`${chapter.id}-title`} className="sr-only">
          {chapter.title}
        </h2>
      )}

      {children}

      {(prev || next) && idx > 0 && (
        <nav
          aria-label="Chuyển chương"
          className={`container-cinema flex items-center justify-between border-t py-10 text-sm ${
            light ? "border-ink/10" : "border-ivory/10"
          }`}
        >
          {prev ? (
            <a href={`#${prev.id}`} className="group flex items-center gap-3 opacity-60 transition-opacity hover:opacity-100">
              <span aria-hidden>←</span>
              <span>
                Quay lại <span className="hidden sm:inline">· {prev.title}</span>
              </span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={`#${next.id}`} className="group flex items-center gap-3 text-right">
              <span>
                Chương tiếp theo <span className="hidden sm:inline">· {next.title}</span>
              </span>
              <span aria-hidden className="text-bronze transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          )}
        </nav>
      )}
    </section>
  );
}
