"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { ShirtPet } from "./ShirtPet";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const BUBBLE_TEXTS = [
  "Chào bạn! Tôi là chiếc áo thun.",
  "Tôi có thể giải thích giá trị của tôi!",
  "Bạn có thắc mắc gì về hành trình của tôi?",
  "Bấm vào tôi để cùng trò chuyện nhé!",
];

/**
 * Linh thú AI Bé Áo (Shirt Pet AI) lơ lửng và di chuyển trên trang
 * - Tương tự phong cách mascot/pet của Claude hoặc Codex
 * - Có khả năng kéo thả (drag & drop) di chuyển vị trí bất kỳ trên màn hình
 * - Tự động nổi bọt thoại trò chuyện (speech bubble) thu hút người đọc
 * - Nhấn vào bé áo để bật/tắt khung hỏi đáp AI
 */
export function AskTheShirt() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bubbleText, setBubbleText] = useState(BUBBLE_TEXTS[0]);
  const [showBubble, setShowBubble] = useState(false);

  // Vị trí (x, y tính từ góc trái-trên của màn hình để GPU translate3d cực mượt)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startX: number; startY: number } | null>(null);
  const hasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Khởi tạo vị trí mặc định ở góc dưới bên phải
  useEffect(() => {
    const initPos = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const petSize = w < 640 ? 70 : 85;
      const margin = 24;
      setPos((prev) => prev ?? { x: w - petSize - margin, y: h - petSize - margin - 20 });
    };
    initPos();
    window.addEventListener("resize", initPos);
    return () => window.removeEventListener("resize", initPos);
  }, []);

  // Chu kỳ đổi câu thoại của bé áo khi người dùng rảnh
  useEffect(() => {
    const timer = setInterval(() => {
      setBubbleText((prev) => {
        const nextIdx = (BUBBLE_TEXTS.indexOf(prev) + 1) % BUBBLE_TEXTS.length;
        return BUBBLE_TEXTS[nextIdx];
      });
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    }, 18000);

    // Lần đầu chào sau 3 giây
    const firstTimeout = setTimeout(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 6000);
    }, 3500);

    return () => {
      clearInterval(timer);
      clearTimeout(firstTimeout);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }, []);

  // Khi mở: đưa tiêu điểm vào bảng, khóa cuộn nền trên màn hình nhỏ.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first =
      panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
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

  // Esc đóng; Tab xoay vòng trong bảng.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    ).filter((n) => n.offsetParent !== null);
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

  // Kéo thả vị trí của Pet trên màn hình (Pointer Events siêu mượt với requestAnimationFrame)
  const onPointerDown = (e: React.PointerEvent) => {
    // Chỉ kích hoạt chuột trái
    if (e.button !== 0 || !pos) return;
    hasDraggedRef.current = false;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: pos.x,
      startY: pos.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;

    if (!hasDraggedRef.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      const petWidth = 85;
      const petHeight = 95;
      const minX = 8;
      const maxX = window.innerWidth - petWidth - 8;
      const minY = 8;
      const maxY = window.innerHeight - petHeight - 8;

      const newX = Math.max(minX, Math.min(maxX, dragStartRef.current.startX + dx));
      const newY = Math.max(minY, Math.min(maxY, dragStartRef.current.startY + dy));
      setPos({ x: newX, y: newY });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* bỏ qua nếu đã tự giải phóng */
      }
      dragStartRef.current = null;
      setTimeout(() => setIsDragging(false), 60);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Nếu vừa mới kéo thả thì không trigger mở hộp thoại
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Khi người dùng ấn nút x để ẩn tạm thời pet: hiện nút nhỏ ở góc để mở lại khi cần */}
      {dismissed && !open && (
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="fixed bottom-4 right-4 z-[75] flex items-center gap-1.5 rounded-full border border-bronze/60 bg-ink/90 px-3 py-1.5 text-[0.72rem] text-bronze-soft shadow-lg backdrop-blur transition-all duration-300 hover:border-bronze hover:bg-bronze hover:text-ink"
          aria-label="Hiện lại Bé Áo AI"
        >
          <span className="size-2 rounded-full bg-bronze animate-pulse" />
          <span>Hỏi Áo</span>
        </button>
      )}

      {/* Container linh thú di chuyển (dùng transform GPU translate3d không giật lag) */}
      {!dismissed && pos && (
        <div
          ref={containerRef}
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
          className="fixed top-0 left-0 z-[80] flex flex-col items-center pointer-events-auto touch-none select-none will-change-transform"
          onMouseEnter={() => {
            if (!isDragging) {
              setIsHovered(true);
              setShowBubble(true);
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowBubble(false);
          }}
        >
          {/* Nút nhỏ 'x' ở góc trên phải để đóng/ẩn Bé Áo */}
          {!open && !isDragging && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
              }}
              title="Ẩn Bé Áo"
              aria-label="Ẩn Bé Áo"
              className={`absolute -top-1 -right-1 z-20 flex size-5 items-center justify-center rounded-full border border-ivory/25 bg-ink text-[0.65rem] text-ivory/70 shadow transition-all duration-200 hover:border-bronze hover:bg-bronze hover:text-ink hover:scale-110 ${
                isHovered ? "opacity-100" : "opacity-0 sm:opacity-0 group-hover:opacity-100"
              }`}
            >
              ✕
            </button>
          )}

          {/* Bong bóng thoại (Speech bubble) */}
          {!open && !isDragging && (
            <div
              className={`absolute bottom-full mb-2 w-max max-w-[220px] rounded-xl border border-bronze/40 bg-ink/90 px-3 py-2 text-[0.78rem] text-ivory shadow-lg backdrop-blur transition-all duration-300 pointer-events-none select-none sm:max-w-[260px] ${
                showBubble || isHovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-95 pointer-events-none"
              }`}
            >
              <p className="leading-snug">
                <span className="font-600 text-bronze mr-1">Áo AI:</span>
                {bubbleText}
              </p>
              {/* Mũi nhọn speech bubble */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 border-b border-r border-bronze/40 bg-ink" />
            </div>
          )}

          {/* Nút bấm hình linh thú Bé Áo */}
          <button
            ref={launcherRef}
            type="button"
            onClick={handleClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={open ? "Đóng bảng trò chuyện với chiếc áo" : "Hỏi chiếc áo"}
            title={isDragging ? "Đang di chuyển..." : "Kéo để di chuyển • Bấm để trò chuyện"}
            className={`group relative flex items-center justify-center p-1 outline-none cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-bronze rounded-full transition-transform duration-200 ${
              open ? "scale-95" : isDragging ? "scale-105 cursor-grabbing" : "hover:scale-105"
            }`}
          >
            {/* Pet graphic */}
            <div className={open || isDragging ? "" : "anim-pet-float"}>
              <ShirtPet
                className="w-16 h-16 sm:w-20 sm:h-20"
                isOpen={open}
                isHovered={isHovered || isDragging}
              />
            </div>

            {/* Huy hiệu nhãn trạng thái nhỏ dưới chân bé áo */}
            <div
              className={`absolute -bottom-1.5 right-1/2 translate-x-1/2 rounded-full border px-2 py-0.5 text-[0.68rem] tracking-wider font-500 whitespace-nowrap shadow transition-colors duration-300 select-none ${
                open
                  ? "border-bronze bg-bronze text-ink"
                  : "border-bronze/60 bg-ink/90 text-bronze-soft group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink"
              }`}
            >
              {open ? "Đóng ✕" : "Hỏi Áo"}
            </div>
          </button>
        </div>
      )}

      {/* Panel hỏi đáp ChatPanel */}
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
