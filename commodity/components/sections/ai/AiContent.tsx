import type { ReactNode } from "react";
import Link from "next/link";

// Nội dung trang "AI trong dự án". Server component thuần, không cần JavaScript phía client.

type SectionProps = {
  label: string;
  title: string;
  children: ReactNode;
};

function Section({ label, title, children }: SectionProps) {
  return (
    <section className="border-t border-ink/10 py-16">
      <p className="eyebrow text-bronze">{label}</p>
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
        {title}
      </h2>
      <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink/70 md:text-lg">
        {children}
      </div>
    </section>
  );
}

type Stage = { who: string; what: string; sub: string };

const STAGES: Stage[] = [
  { who: "Phỏng vấn yêu cầu", what: "18 quyết định", sub: "D01 – D18" },
  { who: "REQUIREMENTS.md", what: "Đặc tả", sub: "FR, NFR, tiêu chí" },
  { who: "Lead · Claude Opus", what: "Nền tảng, Hero", sub: "Schema, công thức" },
  { who: "5 sub-agent song song", what: "4 Sonnet · 1 Haiku", sub: "Nội dung, chương, offline" },
  { who: "Verifier · Sonnet", what: "Đối chiếu slide", sub: "Gắn cờ cần đối chiếu" },
  { who: "Nhóm duyệt", what: "Con người quyết định", sub: "Chịu trách nhiệm" },
];

const ARIA_LABEL =
  "Quy trình sáu bước: phỏng vấn yêu cầu với 18 quyết định; đặc tả REQUIREMENTS; agent Lead Claude Opus dựng nền tảng; năm sub-agent song song gồm bốn Sonnet và một Haiku; agent Sonnet kiểm chứng đối chiếu với slide giảng viên; cuối cùng nhóm duyệt và chịu trách nhiệm.";

// Sơ đồ ngang cho màn rộng: 6 ô, mỗi ô 170 x 120, khoảng cách 36.
function PipelineHorizontal() {
  return (
    <svg
      viewBox="0 0 1200 200"
      role="img"
      aria-label={ARIA_LABEL}
      className="hidden h-auto w-full md:block"
    >
      {STAGES.map((s, i) => {
        const x = i * 206;
        const last = i === STAGES.length - 1;
        return (
          <g key={s.who}>
            <rect
              x={x}
              y={40}
              width={170}
              height={120}
              fill={last ? "#101010" : "none"}
              stroke="#101010"
              strokeOpacity={last ? 1 : 0.25}
            />
            <text x={x + 14} y={34} fontSize={13} fill="#b59a73" letterSpacing={2}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={x + 14} y={82} fontSize={14} fontWeight={700} fill={last ? "#f1eee7" : "#101010"}>
              {s.who}
            </text>
            <text x={x + 14} y={108} fontSize={13} fill={last ? "#cdb795" : "#101010"} fillOpacity={last ? 1 : 0.7}>
              {s.what}
            </text>
            <text x={x + 14} y={134} fontSize={12} fill={last ? "#a6a29a" : "#77746d"}>
              {s.sub}
            </text>
            {!last && (
              <path
                d={`M${x + 172} 100 H${x + 204} M${x + 197} 94 L${x + 204} 100 L${x + 197} 106`}
                stroke="#b59a73"
                strokeWidth={1.5}
                fill="none"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Sơ đồ dọc cho điện thoại: 6 ô, mỗi ô 300 x 84, khoảng cách 32.
function PipelineVertical() {
  return (
    <svg
      viewBox="0 0 340 700"
      role="img"
      aria-label={ARIA_LABEL}
      className="mx-auto block h-auto w-full max-w-sm md:hidden"
    >
      {STAGES.map((s, i) => {
        const y = i * 116;
        const last = i === STAGES.length - 1;
        return (
          <g key={s.who}>
            <rect
              x={20}
              y={y + 4}
              width={300}
              height={84}
              fill={last ? "#101010" : "none"}
              stroke="#101010"
              strokeOpacity={last ? 1 : 0.25}
            />
            <text x={34} y={y + 28} fontSize={12} fill="#b59a73" letterSpacing={2}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={34} y={y + 50} fontSize={14} fontWeight={700} fill={last ? "#f1eee7" : "#101010"}>
              {s.who}
            </text>
            <text x={34} y={y + 70} fontSize={12} fill={last ? "#cdb795" : "#101010"} fillOpacity={last ? 1 : 0.7}>
              {s.what} · {s.sub}
            </text>
            {!last && (
              <path
                d={`M170 ${y + 90} V${y + 118} M164 ${y + 111} L170 ${y + 118} L176 ${y + 111}`}
                stroke="#b59a73"
                strokeWidth={1.5}
                fill="none"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

const DIVISION: { ai: string; human: string }[] = [
  {
    ai: "Soạn bản nháp nội dung học thuật và các chương.",
    human: "Đối chiếu từng định nghĩa với giáo trình và slide của giảng viên; duyệt học thuật.",
  },
  {
    ai: "Viết mã giao diện, hoạt ảnh Canvas và SVG.",
    human: "Duyệt thị giác; quyết định phong cách và phạm vi.",
  },
  {
    ai: "Cài đặt công thức kinh tế và mô phỏng.",
    human: "Kiểm tra giả định mô hình, ví dụ số và cách diễn giải.",
  },
  {
    ai: "Chạy kiểm thử, build, kiểm tra tràn ngang trên điện thoại.",
    human: "Tự cuộn, bấm thử toàn bộ trang trước khi nộp.",
  },
  {
    ai: "Trả lời câu hỏi của người dùng trong Hỏi chiếc áo.",
    human: "Viết giới hạn cho trợ lý; nhận báo sai và sửa nội dung gốc.",
  },
  {
    ai: "Đề xuất phương án khi gặp mâu thuẫn.",
    human: "Đưa ra quyết định cuối cùng và chịu trách nhiệm về độ chính xác.",
  },
];

const ERRORS: { title: string; body: string }[] = [
  {
    title: "Bông là “thứ có sẵn trong tự nhiên”",
    body: "Chú thích bản nháp mô tả bông là thứ có sẵn trong tự nhiên. Đã sửa: bông thu hoạch là nguyên liệu, tức đối tượng lao động đã qua lao động, không phải tài nguyên thiên nhiên chưa qua lao động.",
  },
  {
    title: "Nội dung viết trước khi có slide",
    body: "Phần nội dung soạn khi chưa có slide bài giảng được đánh dấu “cần đối chiếu” thay vì coi là đúng. Sau đó agent kiểm chứng đối chiếu từng mục với slide của giảng viên và điền số trang.",
  },
];

const CONTROLS: { title: string; body: string }[] = [
  {
    title: "Một schema dùng chung",
    body: "Mọi nội dung đi qua cùng một kiểu dữ liệu. Trích dẫn là trường bắt buộc, được kiểm tra kiểu khi build: thiếu nguồn thì không biên dịch được.",
  },
  {
    title: "Một module công thức duy nhất",
    body: "Toàn bộ công thức kinh tế nằm trong lib/economics.ts. Các mô phỏng chỉ gọi hàm từ đây nên không thể tính ra những con số lệch nhau.",
  },
  {
    title: "Quy tắc sở hữu tệp",
    body: "Mỗi agent chỉ được ghi vào thư mục của mình, nên các agent chạy song song không ghi đè lên nhau.",
  },
  {
    title: "Commit git theo từng giai đoạn",
    body: "Mỗi giai đoạn có một commit, nên mọi thay đổi do agent tạo ra đều xem lại và hoàn tác được.",
  },
  {
    title: "Điểm duyệt của nhóm",
    body: "Hai điểm dừng: duyệt thị giác và duyệt học thuật. Agent không tự chuyển sang bước sau khi nhóm chưa đồng ý.",
  },
];

const IT_POINTS: { title: string; body: string }[] = [
  {
    title: "Kiến trúc phần mềm",
    body: "Tách nội dung, schema, logic và giao diện thành các lớp riêng. Nhờ vậy người không biết code vẫn sửa được nội dung, và logic kinh tế chỉ có một nơi duy nhất.",
  },
  {
    title: "Mô phỏng mô hình kinh tế",
    body: "Giá trị thặng dư, thời gian lao động xã hội cần thiết và giá cả dao động quanh giá trị đều là mô hình có tham số, đầu vào, đầu ra. Đó chính là mô hình hóa và mô phỏng.",
  },
  {
    title: "Quy trình AI nhiều agent",
    body: "Phân vai theo năng lực và chi phí: Opus cho các quyết định nền tảng, Sonnet cho nội dung và kiểm chứng, Haiku cho việc nhẹ. Chia việc song song, kiểm chứng chéo và có người duyệt.",
  },
  {
    title: "Triển khai tĩnh và offline",
    body: "Static export, không máy chủ ứng dụng, không cơ sở dữ liệu, chạy được khi không có mạng. Giảm bề mặt lỗi và bảo vệ quyền riêng tư theo thiết kế.",
  },
];

const SAFEGUARDS: string[] = [
  "Chỉ trả lời dựa trên nội dung của chính website này; không dùng kiến thức ngoài để bổ sung.",
  "Từ chối câu hỏi ngoài chủ đề và nói rõ lý do.",
  "Mỗi câu trả lời kèm liên kết tới chương liên quan để người dùng tự đối chiếu.",
  "Gắn nhãn “Do AI tạo” trên mọi câu trả lời.",
  "Nút “Báo sai” để người dùng phản hồi khi thấy câu trả lời không đúng.",
  "Không có mạng hoặc không có khóa: chuyển sang bộ câu hỏi thường gặp ngoại tuyến.",
  "Khóa API chỉ nằm trên máy demo, không đưa vào mã nguồn hay kho git.",
  "Không đăng nhập, không thu thập dữ liệu người dùng.",
];

export function AiContent() {
  return (
    <div className="bg-ivory text-ink">
      <div className="container-cinema pb-24 pt-32 md:pt-44">
        <p className="eyebrow text-bronze">AI trong dự án</p>

        <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.03em]">
          AI làm.
          <br />
          Con người chịu trách nhiệm.
        </h1>

        <p className="mt-6 max-w-3xl font-serif text-2xl italic text-ink/70 md:text-3xl">
          Website này được dựng trong một phiên làm việc bằng một quy trình nhiều agent AI. Nhóm quyết
          định, duyệt và sở hữu độ chính xác của từng câu chữ.
        </p>

        <section className="mt-16 border-t border-ink/10 py-16">
          <p className="eyebrow text-bronze">Quy trình</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
            Từ yêu cầu đến sản phẩm
          </h2>
          <div className="mt-10 text-ink">
            <PipelineHorizontal />
            <PipelineVertical />
          </div>
          <p className="mt-8 max-w-2xl text-sm text-ink/50">
            Các sub-agent chạy song song trên những thư mục riêng; agent kiểm chứng đối chiếu kết quả
            với slide của giảng viên trước khi đến tay nhóm.
          </p>
        </section>

        <Section label="Phân vai" title="AI làm / Con người kiểm soát">
          <div className="max-w-none overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-base">
              <thead>
                <tr className="border-b border-ink/30 font-display text-sm text-ink">
                  <th scope="col" className="w-1/2 py-3 pr-6 font-semibold">
                    AI làm
                  </th>
                  <th scope="col" className="py-3 font-semibold">
                    Con người kiểm soát
                  </th>
                </tr>
              </thead>
              <tbody>
                {DIVISION.map((row) => (
                  <tr key={row.ai} className="border-b border-ink/10 align-top">
                    <td className="py-4 pr-6 text-ink/70">{row.ai}</td>
                    <td className="py-4 text-ink/70">{row.human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section label="Trung thực về sai sót" title="Lỗi AI đã bắt được">
          <p>
            AI có thể viết trôi chảy nhưng sai. Hai trường hợp dưới đây được phát hiện nhờ bước đối
            chiếu và duyệt của nhóm.
          </p>
          <ol className="space-y-6 pt-2">
            {ERRORS.map((e, i) => (
              <li key={e.title} className="border-l border-bronze pl-6">
                <p className="font-display text-sm text-bronze">Lỗi {i + 1}</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">{e.title}</p>
                <p className="mt-2">{e.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Kỹ thuật" title="Kiểm soát AI thế nào">
          <p>
            Không tin vào việc AI sẽ làm đúng; thay vào đó thiết kế để sai sót khó xảy ra và dễ bị
            phát hiện.
          </p>
          <dl className="space-y-6 pt-2">
            {CONTROLS.map((c) => (
              <div key={c.title} className="border-b border-ink/10 pb-6">
                <dt className="font-display text-lg font-semibold text-ink">{c.title}</dt>
                <dd className="mt-2">{c.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="Chuyên ngành" title="Góc nhìn chuyên ngành CNTT">
          <p>
            Với sinh viên Công nghệ thông tin và Khoa học máy tính, dự án này là một bài tập kinh tế
            chính trị, đồng thời là một bài tập kỹ thuật phần mềm.
          </p>
          <dl className="space-y-6 pt-2">
            {IT_POINTS.map((p) => (
              <div key={p.title} className="border-b border-ink/10 pb-6">
                <dt className="font-display text-lg font-semibold text-ink">{p.title}</dt>
                <dd className="mt-2">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="Hỏi chiếc áo" title="Trợ lý AI có rào chắn">
          <p>
            Hỏi chiếc áo là khung chat dùng Gemini. Vì mô hình ngôn ngữ có thể bịa, trợ lý bị giới hạn
            chặt:
          </p>
          <ul className="space-y-3 pt-2">
            {SAFEGUARDS.map((s) => (
              <li key={s} className="border-b border-ink/10 pb-3">
                {s}
              </li>
            ))}
          </ul>
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
