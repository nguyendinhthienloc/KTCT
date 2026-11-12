"use client";

import { useState, type ReactNode } from "react";

/**
 * Khối "Tìm hiểu thêm" — Tầng 2 (giải thích học thuật) thu gọn mặc định,
 * để trải nghiệm chính không "quá nhiều lý thuyết" (rubric). Nội dung vẫn có trong HTML.
 */
export function LearnMore({
  children,
  label = "Tìm hiểu thêm",
  tone = "dark",
}: {
  children: ReactNode;
  label?: string;
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState(false);
  const rule = tone === "dark" ? "border-ivory/15" : "border-ink/15";
  return (
    <div className={`container-cinema border-t ${rule} py-8`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="font-display text-xl font-600 md:text-2xl">{label}</span>
        <span aria-hidden className="text-2xl text-bronze transition-transform duration-500" style={{ transform: open ? "rotate(45deg)" : "none" }}>
          +
        </span>
      </button>
      <div hidden={!open} className="pt-10">
        {children}
      </div>
    </div>
  );
}
