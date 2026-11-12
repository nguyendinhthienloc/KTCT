import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/about/AboutContent";

export const metadata: Metadata = {
  title: "Giới thiệu dự án — COMMODITY.",
};

export default function AboutPage() {
  return (
    <main id="noi-dung" className="min-h-dvh bg-ivory pb-24 text-ink" data-theme="light">
      <AboutContent />
    </main>
  );
}
