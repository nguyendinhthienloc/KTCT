"use client";

/**
 * Điểm vào duy nhất cho GSAP — mọi component import gsap/ScrollTrigger từ đây
 * để plugin chỉ đăng ký một lần.
 *
 *   import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/motion";
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

if (typeof window !== "undefined") {
  // Tắt tính năng tự động ghi nhớ vị trí cuộn của trình duyệt khi F5:
  // Giúp khi refresh luôn trở về đầu trang (0, 0) và kích hoạt lại toàn bộ animations từ đầu
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  gsap.registerPlugin(ScrollTrigger);
  // Điện thoại: thanh địa chỉ ẩn/hiện khi cuộn gây resize → không refresh lại ScrollTrigger (hết giật)
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Ảnh/font tải xong làm đổi chiều cao trang → tính lại vị trí kích hoạt một lần
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** NFR-08 — true nếu người dùng bật giảm chuyển động */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
