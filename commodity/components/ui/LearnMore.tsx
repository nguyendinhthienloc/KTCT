"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/motion";

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
  // Mở/đóng làm trang cao/thấp đi → tính lại vị trí các cảnh ghim (ScrollTrigger) phía dưới,
  // nếu không các chương sau sẽ ghim sai chỗ và chữ chồng lên nhau.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [open]);
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
