"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CHAPTERS } from "@/content/chapters";
import { resetProgress, useProgress } from "@/lib/progress";

/**
 * Thanh điều hướng cố định — FR-01, FR-02, FR-03, FR-06.
 * Đổi màu theo nền của chương đang xem (tối/sáng).
 */
export function SiteNav() {
  const { visited } = useProgress();
  const [active, setActive] = useState<string>(CHAPTERS[0].id);
  const [open, setOpen] = useState(false);

  // FR-02: chương đang cắt đường giữa màn hình là chương hiện tại
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const current = CHAPTERS.find((c) => c.id === active) ?? CHAPTERS[0];
  const onLight = current.theme === "light" && !open;
  const seenCount = CHAPTERS.filter((c) => visited.includes(c.id)).length;
  const pct = Math.round((seenCount / CHAPTERS.length) * 100);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        onLight ? "text-ink" : "text-ivory"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 backdrop-blur-md transition-colors duration-500 ${
          onLight ? "bg-ivory/75" : "bg-ink/55"
        }`}
      />
      <nav aria-label="Điều hướng chính" className="container-cinema flex h-14 items-center justify-between gap-6">
        <Link
          href="/#khoi-dau"
          className="font-display text-[0.95rem] font-700 tracking-[0.18em]"
          onClick={() => setOpen(false)}
        >
          COMMODITY<span className="text-bronze">.</span>
        </Link>

        <ol className="hidden items-center gap-1 lg:flex">
          {CHAPTERS.map((c) => {
            const isActive = c.id === active;
            return (
              <li key={c.id}>
                <a
                  href={`/#${c.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-baseline gap-1.5 px-2.5 py-1.5 text-[0.78rem] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <span className={`text-[0.65rem] tabular-nums ${visited.includes(c.id) ? "text-bronze" : ""}`}>
                    {c.number}
                  </span>
                  <span>{c.title}</span>
                </a>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="/thuat-ngu/" className="hidden text-[0.78rem] opacity-70 transition-opacity hover:opacity-100 sm:block">
            Thuật ngữ
          </Link>
          <Link href="/ai/" className="hidden text-[0.78rem] opacity-70 transition-opacity hover:opacity-100 md:block">
            AI
          </Link>
          <Link href="/gioi-thieu/" className="text-[0.78rem] opacity-70 transition-opacity hover:opacity-100">
            Giới thiệu
          </Link>
          <span className="hidden text-[0.7rem] tabular-nums opacity-60 md:block" title="Tiến độ khám phá">
            {pct}%
          </span>
          <button
            type="button"
            className="flex h-9 items-center gap-2 text-[0.78rem] lg:hidden"
            aria-expanded={open}
            aria-controls="menu-chuong"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="tabular-nums text-bronze">{current.number}</span>
            <span>{open ? "Đóng" : "Chương"}</span>
          </button>
        </div>
      </nav>

      {/* FR-03: thanh tiến độ khám phá */}
      <div
        className="relative h-px w-full"
        role="progressbar"
        aria-label="Tiến độ khám phá"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div aria-hidden className="absolute inset-0 bg-current opacity-10" />
        <div className="absolute inset-y-0 left-0 bg-bronze transition-[width] duration-700 ease-cinema" style={{ width: `${pct}%` }} />
      </div>

      {/* FR-06: menu chương cho điện thoại */}
      {open && (
        <div id="menu-chuong" className="fixed inset-x-0 bottom-0 top-[57px] overflow-y-auto bg-ink text-ivory lg:hidden">
          <ol className="container-cinema flex flex-col py-6">
            {CHAPTERS.map((c) => (
              <li key={c.id} className="border-b border-ivory/10">
                <a href={`/#${c.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-5">
                  <span className={`w-6 text-xs tabular-nums ${visited.includes(c.id) ? "text-bronze" : "text-stone"}`}>
                    {c.number}
                  </span>
                  <span className="font-display text-2xl font-500">{c.title}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="container-cinema flex flex-wrap items-center justify-between gap-4 pb-12 text-sm text-stone-light">
            <Link href="/thuat-ngu/" onClick={() => setOpen(false)}>
              Xem thuật ngữ
            </Link>
            <Link href="/ai/" onClick={() => setOpen(false)}>
              AI trong dự án
            </Link>
            <Link href="/gioi-thieu/" onClick={() => setOpen(false)}>
              Giới thiệu dự án
            </Link>
            <span>Tiến độ khám phá: {pct}%</span>
            <button type="button" className="text-xs underline underline-offset-4" onClick={() => resetProgress()}>
              Làm lại từ đầu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
