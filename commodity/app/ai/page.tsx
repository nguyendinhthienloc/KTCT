import type { Metadata } from "next";
import { AiContent } from "@/components/sections/ai/AiContent";

export const metadata: Metadata = {
  title: "AI trong dự án — COMMODITY.",
};

export default function AiPage() {
  return (
    <main id="noi-dung" className="min-h-dvh bg-ivory pb-24 text-ink" data-theme="light">
      <AiContent />
    </main>
  );
}
