"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatPanel } from "./ChatPanel";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Nút nổi "Hỏi chiếc áo" + bảng hỏi đáp bên phải (toàn màn hình trên điện thoại). */
export function AskTheShirt() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Ẩn nút khi đang cuộn để không che nội dung; hiện lại sau khi dừng 0,9s.
  const [idle, setIdle] = useState(true);
  useEffect(() => {
    let timer: number | undefined;
    const onScroll = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Trả tiêu điểm về nút mở, không cuộn trang.
    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }, []);

  // Khi mở: đưa tiêu điểm vào bảng, khóa cuộn nền trên màn hình nhỏ.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus({ preventScroll: true });
    let prev = "";
    try {
      if (window.matchMedia("(max-width: 639px)").matches) {
        prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
    } catch {
      /* bỏ qua */
    }
    return () => {
      if (prev !== "" || document.body.style.overflow === "hidden") document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc đóng; Tab xoay vòng trong bảng (focus trap nhẹ).
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((n) => n.offsetParent !== null);
    if (!nodes.length) return;
    const firstEl = nodes[0];
    const lastEl = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="Hỏi chiếc áo"
          className={`fixed bottom-4 right-4 z-[60] border border-bronze bg-ink/90 px-3.5 py-2.5 text-[0.75rem] tracking-[0.08em] text-bronze-soft backdrop-blur transition-[transform,opacity,background-color,color] duration-500 ease-cinema hover:bg-bronze hover:text-ink motion-reduce:transition-none sm:bottom-5 sm:right-5 sm:px-5 sm:py-3 sm:text-[0.8rem] ${
            idle ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          }`}
        >
          <span aria-hidden className="sm:hidden">Hỏi áo</span>
          <span aria-hidden className="hidden sm:inline">Hỏi chiếc áo</span>
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 hidden bg-ink/50 sm:block" onClick={close} aria-hidden="true" />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-title"
            onKeyDown={onKeyDown}
            className="absolute inset-y-0 right-0 flex w-full flex-col border-l border-ivory/15 bg-ink text-ivory transition-transform duration-300 starting:translate-x-full motion-reduce:transition-none sm:w-[440px]"
          >
            <ChatPanel onClose={close} />
          </div>
        </div>
      )}
    </>
  );
}
