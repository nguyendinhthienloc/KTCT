import type { ReactNode } from "react";
import Link from "next/link";

// Nội dung trang "Giới thiệu dự án". Đây là server component thuần, không cần JavaScript phía client.

type SectionProps = {
  label: string;
  children: ReactNode;
};

// Một khối nội dung có nhãn nhỏ phía trên, ngăn cách bằng đường kẻ mờ.
function Section({ label, children }: SectionProps) {
  return (
    <section className="border-t border-ink/10 py-16">
      <p className="eyebrow text-bronze">{label}</p>
      <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink/70 md:text-lg">
        {children}
      </div>
    </section>
  );
}

const TEAM_PLACEHOLDERS = [1, 2, 3, 4];

export function AboutContent() {
  return (
    <div className="bg-ivory text-ink">
      <div className="container-cinema pb-24 pt-32 md:pt-44">
        <p className="eyebrow text-bronze">Giới thiệu dự án</p>

        <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.03em]">
          COMMODITY.
        </h1>

        <p className="mt-6 font-serif text-2xl italic text-ink/70 md:text-3xl">
          Mọi sản phẩm đều có một câu chuyện.
        </p>

        <Section label="Dự án">
          <p>
            COMMODITY. là website giáo dục tương tác kể câu chuyện kinh tế đằng sau một chiếc áo thun
            cotton, giúp sinh viên hiểu các khái niệm Kinh tế chính trị Mác – Lênin qua hình ảnh và
            mô phỏng.
          </p>
          <p>
            Thông điệp: đằng sau mỗi hàng hóa là lao động của con người, quá trình sản xuất và những
            quan hệ kinh tế tạo nên giá trị.
          </p>
        </Section>

        <Section label="Thành viên nhóm">
          <ul className="font-display space-y-2 text-sm text-ink/70">
            {TEAM_PLACEHOLDERS.map((n) => (
              <li key={n} className="border-b border-ink/10 pb-2">
                Họ và tên — MSSV — Vai trò
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink/50">(Nhóm điền thông tin trước khi nộp)</p>
        </Section>

        <Section label="Môn học">
          <p>Kinh tế chính trị Mác – Lênin</p>
          <p>Giảng viên hướng dẫn: (điền tên)</p>
        </Section>

        <Section label="Nguồn học thuật">
          <p>
            Giáo trình Kinh tế chính trị Mác – Lênin (Dành cho bậc đại học hệ không chuyên lý luận
            chính trị), Bộ Giáo dục và Đào tạo, NXB Chính trị quốc gia Sự thật, Hà Nội, 2021.
          </p>
          <p className="text-sm text-ink/50">
            Mọi con số trong các mô phỏng là đơn vị minh họa, không phản ánh số liệu thực tế.
          </p>
        </Section>

        <Section label="Công nghệ">
          <p>
            Next.js, React, TypeScript, Tailwind CSS, GSAP ScrollTrigger. Hình ảnh được tạo hoàn toàn
            bằng mã (SVG, Canvas).
          </p>
          <p>
            Trang tĩnh, không cần đăng nhập, không thu thập dữ liệu. Tiến độ chỉ lưu trong trình duyệt
            của bạn.
          </p>
        </Section>

        <div className="border-t border-ink/10 pt-12">
          <Link href="/" className="text-bronze underline underline-offset-4 hover:text-ink">
            ← Quay lại hành trình
          </Link>
        </div>
      </div>
    </div>
  );
}
