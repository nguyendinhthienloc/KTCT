import { ChapterShell } from "@/components/ui/ChapterShell";
import { Hero } from "@/components/sections/Hero";
import { Ch01Commodity } from "@/components/sections/ch01/Ch01Commodity";
import { Ch02Production } from "@/components/sections/ch02/Ch02Production";
import { Ch03Value } from "@/components/sections/ch03/Ch03Value";
import { Ch04Capital } from "@/components/sections/ch04/Ch04Capital";
import { Ch05Market } from "@/components/sections/ch05/Ch05Market";
import { Ch06Recap } from "@/components/sections/ch06/Ch06Recap";
import { intro } from "@/content/intro";
import { commodity } from "@/content/commodity";
import { production } from "@/content/production";
import { value } from "@/content/value";
import { capital } from "@/content/capital";
import { market } from "@/content/market";
import { recap } from "@/content/recap";

/** Trang chính — 7 chương xen kẽ nền tối/sáng (NFR-01). */
export default function Home() {
  // Ch.05 so sánh nhà sản xuất dựa trên kịch bản thị phần mặc định của Ch.03
  const baseScenario = value.scenarios[0];

  return (
    <main id="noi-dung">
      <ChapterShell chapterId="khoi-dau" hideHeader>
        <Hero content={intro} />
      </ChapterShell>
      {/* Ch.01 và Ch.02 tự bọc ChapterShell bên trong component */}
      <Ch01Commodity content={commodity} />
      <Ch02Production content={production} />
      <ChapterShell chapterId="gia-tri">
        <Ch03Value content={value} />
      </ChapterShell>
      <ChapterShell chapterId="tu-ban">
        <Ch04Capital content={capital} />
      </ChapterShell>
      <ChapterShell chapterId="thi-truong">
        <Ch05Market content={market} factories={value.factories} baseScenario={baseScenario} />
      </ChapterShell>
      <ChapterShell chapterId="nhin-lai">
        <Ch06Recap content={recap} />
      </ChapterShell>
    </main>
  );
}
