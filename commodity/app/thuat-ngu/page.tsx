import type { Metadata } from "next";
import { GlossaryList } from "@/components/sections/glossary/GlossaryList";
import { glossary } from "@/content/glossary";

export const metadata: Metadata = {
  title: "Thuật ngữ — COMMODITY.",
  description: "Bảng thuật ngữ Kinh tế chính trị Mác – Lênin dùng trong hành trình của chiếc áo thun.",
};

export default function GlossaryPage() {
  return (
    <main id="noi-dung" className="min-h-dvh bg-ivory text-ink" data-theme="light">
      <GlossaryList entries={glossary} />
    </main>
  );
}
