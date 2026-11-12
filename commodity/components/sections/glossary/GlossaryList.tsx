"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GlossaryEntry } from "@/content/schema";
import { CHAPTERS } from "@/content/chapters";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { SourceNote } from "@/components/ui/SourceNote";

export function GlossaryList({ entries }: { entries: GlossaryEntry[] }) {
  const [filter, setFilter] = useState<string>("all");

  const chapters = CHAPTERS.filter((c) => entries.some((e) => e.chapterId === c.id));
  const sorted = useMemo(() => [...entries].sort((a, b) => a.term.localeCompare(b.term, "vi")), [entries]);
  const shown = filter === "all" ? sorted : sorted.filter((e) => e.chapterId === filter);

  return (
    <div className="container-cinema pb-32 pt-28 md:pt-40">
      <Link href="/" className="text-sm text-ink/60 transition-colors hover:text-ink">
        ← Quay lại hành trình
      </Link>
      <h1 className="mt-12 font-display text-[clamp(3rem,9vw,8.5rem)] font-700 leading-[0.92] tracking-[-0.03em]">
        Thuật ngữ.
      </h1>
      <p className="mt-6 text-sm tabular-nums text-ink/60" aria-live="polite">
        {shown.length} thuật ngữ
      </p>

      <div className="mt-10">
        <ChipGroup
          label="Lọc theo chương"
          tone="light"
          value={filter}
          onChange={setFilter}
          options={[{ id: "all", label: "Tất cả" }, ...chapters.map((c) => ({ id: c.id, label: c.title }))]}
        />
      </div>

      <dl className="mt-16 border-b border-ink/15">
        {shown.map((e) => {
          const ch = CHAPTERS.find((c) => c.id === e.chapterId);
          return (
            <div key={e.id} id={`kn-${e.id}`} className="scroll-mt-24 grid gap-4 border-t border-ink/15 py-10 lg:grid-cols-12 lg:gap-12">
              <dt className="font-display text-3xl font-700 leading-tight tracking-tight lg:col-span-4 lg:text-4xl">
                {e.term}
              </dt>
              <dd className="lg:col-span-8">
                <p className="text-lg leading-relaxed">{e.definition}</p>
                <p className="mt-4 text-sm">
                  <Link href={`/#${e.chapterId}`} className="text-bronze underline-offset-4 hover:underline">
                    {ch ? `Chương ${ch.number} · ${ch.title}` : e.chapterId} →
                  </Link>
                </p>
                <SourceNote source={e.source} className="mt-2" />
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
