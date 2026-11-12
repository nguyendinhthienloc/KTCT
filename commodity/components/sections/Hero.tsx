"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { TShirt } from "@/components/ui/TShirt";
import { FiberMorph } from "@/components/animations/FiberMorph";
import { RichText } from "@/components/ui/RichText";
import type { IntroContent } from "@/content/schema";

/**
 * Chương 00 — Khởi đầu (FR-10…FR-13).
 * Hoạt ảnh vào trang chạy bằng CSS (không chờ JS); hoạt ảnh theo cuộn dùng GSAP.
 */
export function Hero({ content }: { content: IntroContent }) {
  const root = useRef<HTMLDivElement>(null);

  // Chuyển động đầu tiên khi cuộn: áo lùi vào bóng tối, tiêu đề trôi lên
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        });
        tl.to("[data-hero-shirt]", { scale: 0.78, yPercent: -8, opacity: 0.15, ease: "none" }, 0)
          .to("[data-hero-title]", { yPercent: -35, opacity: 0, ease: "none" }, 0)
          .to("[data-hero-light]", { opacity: 0, ease: "none" }, 0)
          .to("[data-hero-cue]", { opacity: 0, duration: 0.15, ease: "none" }, 0);

        gsap.from("[data-intro-line]", {
          yPercent: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: "[data-intro]", start: "top 75%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const lines = splitHeadline(content.headline);

  return (
    <div ref={root}>
      {/* ── Màn hình đầu tiên ── */}
      <div data-hero className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden">
        <div
          data-hero-light
          aria-hidden
          className="anim-fade pointer-events-none absolute left-1/2 top-[42%] h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--color-ivory) 16%, transparent), color-mix(in srgb, var(--color-ivory) 4%, transparent) 55%, transparent)",
            animationDelay: "0.2s",
          }}
        />

        <div className="relative flex flex-1 items-center justify-center pt-14">
          <div data-hero-shirt className="anim-emerge w-[min(56vw,32vh,380px)]" style={{ animationDelay: "0.35s" }}>
            <div className="[perspective:1200px]">
              <div className="anim-sway">
                <TShirt />
              </div>
            </div>
          </div>
        </div>

        <div data-hero-title className="container-cinema relative pb-10 md:pb-14">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow anim-fade mb-5 text-bronze" style={{ animationDelay: "0.9s" }}>
                Chương 00 — Khởi đầu
              </p>
              <h1
                aria-label={content.headline}
                className="font-display text-[clamp(2.6rem,min(7.4vw,10.5vh),7.4rem)] font-800 leading-[1.06] tracking-[-0.03em]"
              >
                {lines.map((line, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="-mb-[0.14em] -mt-[0.2em] block overflow-hidden pb-[0.14em] pt-[0.2em]"
                  >
                    <span className="anim-rise block" style={{ animationDelay: `${0.55 + i * 0.12}s` }}>
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </div>
            <div className="anim-fade lg:col-span-4 lg:pb-3" style={{ animationDelay: "1.3s" }}>
              <a
                href="#hanh-trinh"
                className="group inline-flex items-center gap-4 border border-ivory/25 px-6 py-3.5 text-[0.82rem] tracking-[0.12em] uppercase transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-ink"
              >
                Khám phá hành trình
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>

        <div
          data-hero-cue
          aria-hidden
          className="absolute right-[clamp(1.25rem,4vw,4rem)] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="text-[0.62rem] tracking-[0.3em] text-ivory/40 uppercase">Cuộn</span>
          <span className="anim-scroll-cue block h-10 w-px bg-ivory/40" />
        </div>
      </div>

      {/* ── Lời dẫn ── */}
      <div data-intro className="container-cinema grid gap-10 py-32 md:py-44 lg:grid-cols-12">
        <p
          data-intro-line
          className="font-serif text-[clamp(1.9rem,4vw,3.6rem)] italic leading-[1.12] lg:col-span-8"
        >
          <RichText text={content.intro[0] ?? ""} />
        </p>
        {content.intro.slice(1).map((p, i) => (
          <p
            key={i}
            data-intro-line
            className="max-w-md self-end text-[1.02rem] leading-relaxed text-ivory/65 lg:col-span-4 lg:col-start-9"
          >
            <RichText text={p} />
          </p>
        ))}
      </div>

      {/* ── Bông → Sợi → Vải → Áo ── */}
      <FiberMorph captions={content.morphCaptions} />
    </div>
  );
}

/** "MỌI SẢN PHẨM ĐỀU CÓ MỘT CÂU CHUYỆN." → 3 dòng cân đối */
function splitHeadline(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= 3) return [text];
  const per = Math.ceil(words.length / 3);
  return [words.slice(0, per), words.slice(per, per * 2), words.slice(per * 2)]
    .filter((w) => w.length)
    .map((w) => w.join(" "));
}
