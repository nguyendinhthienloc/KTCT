"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatPanel } from "./ChatPanel";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Nút nổi "Hỏi chiếc áo" + bảng hỏi đáp bên phải (toàn màn hình trên điện thoại). */
export function AskTheShirt() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
          className="fixed bottom-5 right-5 z-[60] border border-bronze bg-ink px-5 py-3 text-[0.8rem] tracking-[0.08em] text-bronze-soft shadow-none transition-colors duration-300 hover:bg-bronze hover:text-ink motion-reduce:transition-none"
        >
          Hỏi chiếc áo
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
