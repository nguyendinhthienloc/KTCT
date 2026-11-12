import type { Source } from "@/content/schema";

/** Dòng trích dẫn giáo trình nhỏ dưới mỗi định nghĩa — FR-81 */
export function SourceNote({ source, className = "" }: { source: Source; className?: string }) {
  const parts = [source.chapter, source.section, source.page !== "?" ? `tr. ${source.page}` : null]
    .filter(Boolean)
    .join(" · ");
  return (
    <p className={`text-[0.7rem] tracking-wide opacity-60 ${className}`}>
      <span className="text-bronze">Giáo trình</span> — {parts}
      {source.needsCheck && <span className="ml-1 italic">(cần đối chiếu)</span>}
    </p>
  );
}
