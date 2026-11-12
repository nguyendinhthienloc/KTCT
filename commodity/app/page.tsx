import { CHAPTERS } from "@/content/chapters";
import { ChapterShell } from "@/components/ui/ChapterShell";

/**
 * Trang chính — Lead ghép các chương ở đây (S5).
 * Tạm thời: khung rỗng cho từng chương.
 */
export default function Home() {
  return (
    <main id="noi-dung">
      {CHAPTERS.map((c) => (
        <ChapterShell key={c.id} chapterId={c.id}>
          <div className="container-cinema min-h-[60vh] pb-24 opacity-40">Đang xây dựng…</div>
        </ChapterShell>
      ))}
    </main>
  );
}
