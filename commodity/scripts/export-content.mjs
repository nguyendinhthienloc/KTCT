// Xuất toàn bộ nội dung học thuật ra docs/noi-dung-hoc-thuat.md (FR-83).
// Chạy: node scripts/export-content.mjs  (Node 24 đọc trực tiếp file .ts)
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { intro } from "../content/intro.ts";
import { commodity } from "../content/commodity.ts";
import { production } from "../content/production.ts";
import { value } from "../content/value.ts";
import { capital } from "../content/capital.ts";
import { market } from "../content/market.ts";
import { recap } from "../content/recap.ts";
import { glossary } from "../content/glossary.ts";

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, "../../docs/noi-dung-hoc-thuat.md");

const out = [];
const push = (...lines) => out.push(...lines);

const src = (s) => {
  if (!s) return "";
  const parts = [s.chapter, s.section, `trang ${s.page}`].filter(Boolean).join(", ");
  const flag = s.needsCheck ? " **(cần đối chiếu)**" : "";
  const note = s.note ? `\n  - Ghi chú: ${s.note}` : "";
  return `${parts}${flag}${note}`;
};

const num = (n) => String(n).replace(".", ",");

const concept = (c) => {
  push(`#### ${c.term}  \`${c.id}\``, "");
  push(`- **Định nghĩa:** ${c.definition}`);
  push(`- **Giải thích:** ${c.explanation}`);
  push(`- **Ví dụ áo thun:** ${c.tshirtExample}`);
  push(`- **Nguồn:** ${src(c.source)}`, "");
};

const distinction = (d) => {
  push(`#### So sánh: ${d.title}  \`${d.id}\``, "");
  push(`**${d.left.term}**`);
  d.left.points.forEach((p) => push(`- ${p}`));
  push("", `**${d.right.term}**`);
  d.right.points.forEach((p) => push(`- ${p}`));
  push("", `> Chốt: ${d.takeaway}`, "", `- **Nguồn:** ${src(d.source)}`, "");
};

const assumptions = (list) => {
  push("#### Giả định của mô hình", "");
  list.forEach((a) => push(`- ${a.text}`));
  push("");
};

const quiz = (qs) => {
  qs.forEach((q, i) => {
    push(`**Câu ${i + 1}.** ${q.prompt}`, "");
    q.options.forEach((o) => {
      push(`- ${o.id === q.correct ? "[x]" : "[ ]"} ${o.id.toUpperCase()}. ${o.text}`);
    });
    push("", `Đáp án đúng: **${q.correct.toUpperCase()}**`);
    push(`Giải thích: ${q.explanation}`);
    push(`Nguồn: ${src(q.source)}`, "");
  });
};

const visual = (v) => {
  push("#### Tầng 1 — Khám phá trực quan", "", v.lead, "");
  v.beats.forEach((b) => push(`- **${b.heading}**: ${b.body}${b.conceptId ? ` _(khái niệm: ${b.conceptId})_` : ""}`));
  push("");
};

const chapterHead = (num_, title, id) => push(`## Chương ${num_} — ${title}  \`${id}\``, "");

/* ───── Đầu tài liệu ───── */
push(
  "# Nội dung học thuật — COMMODITY.",
  "",
  "_Tệp này được sinh tự động từ `commodity/content/*.ts` bằng `node scripts/export-content.mjs`. Đừng sửa trực tiếp ở đây; hãy sửa trong file nội dung rồi chạy lại script._",
  "",
  "## Danh sách việc cho cả nhóm",
  "",
  "- [ ] Mọi mục ghi **(cần đối chiếu)** phải được đối chiếu với giáo trình PDF.",
  "- [ ] Điền số trang thật vào trường `page` (hiện là `?`), rồi xóa `needsCheck: true`.",
  "- [ ] Kiểm tra từng định nghĩa có đúng câu chữ của giáo trình không; sửa nếu khác.",
  "- [ ] Kiểm tra số mục (ví dụ 2.1.2, 3.1) có khớp giáo trình không.",
  "- [ ] Đọc kỹ các giả định của mô hình (Chương 03, 04, 05) và xác nhận không mâu thuẫn với giáo trình.",
  "- [ ] Kiểm tra các câu trắc nghiệm: đáp án đúng, và lời giải thích có nêu vì sao phương án gây nhầm lẫn là sai.",
  "",
  "Giáo trình: Bộ Giáo dục và Đào tạo (2021), Giáo trình Kinh tế chính trị Mác – Lênin (Dành cho bậc đại học hệ không chuyên lý luận chính trị), Nxb Chính trị quốc gia Sự thật, Hà Nội.",
  ""
);

/* ───── Mở đầu ───── */
push("## Chương 00 — Khởi đầu", "", `**Tiêu đề:** ${intro.headline}`, "");
intro.intro.forEach((p) => push(p, ""));
push("**Chú thích bốn pha biến đổi**", "");
intro.morphCaptions.forEach((m) =>
  push(`- **${m.phase}** — ${m.title}: ${m.body}${m.conceptId ? ` _(khái niệm: ${m.conceptId})_` : ""}`)
);
push("");

/* ───── Ch.01 ───── */
chapterHead("01", "Hàng hóa", commodity.chapterId);
visual(commodity.visual);
push("#### Các điểm khám phá trên áo", "");
commodity.hotspots.forEach((h) =>
  push(`- **${h.label}** (x=${h.x}%, y=${h.y}%, khái niệm: ${h.conceptId}): ${h.body}`)
);
push("", "### Tầng 2 — Giải thích học thuật", "");
commodity.academic.concepts.forEach(concept);
(commodity.academic.distinctions ?? []).forEach(distinction);
push("### Tầng 3 — Kiểm tra nhanh", "");
quiz(commodity.check);

/* ───── Ch.02 ───── */
chapterHead("02", "Sản xuất", production.chapterId);
visual(production.visual);
push("#### Bảy công đoạn", "");
production.stages.forEach((s) => {
  push(`${s.order}. **${s.name}** _(khái niệm: ${s.conceptId})_`);
  push(`   - Mô tả: ${s.description}`);
  push(`   - Lao động cụ thể: ${s.labor}`);
  push(`   - Đối tượng lao động: ${s.meansOfProduction.objects}`);
  push(`   - Tư liệu lao động: ${s.meansOfProduction.instruments}`);
});
push("", "### Tầng 2 — Giải thích học thuật", "");
production.academic.concepts.forEach(concept);
(production.academic.distinctions ?? []).forEach(distinction);
push("### Tầng 3 — Kiểm tra nhanh", "");
quiz(production.check);

/* ───── Ch.03 ───── */
chapterHead("03", "Giá trị", value.chapterId);
visual(value.visual);
push("#### Ba nhà sản xuất", "", "| Mã | Tên | Giờ / áo |", "|---|---|---|");
value.factories.forEach((f) => push(`| ${f.id} | ${f.name} | ${f.hoursPerShirt} |`));
push("", "#### Kịch bản thị phần", "");
value.scenarios.forEach((s) => {
  const total = Object.values(s.output).reduce((a, b) => a + b, 0);
  const snlt = value.factories.reduce((sum, f) => sum + f.hoursPerShirt * s.output[f.id], 0) / total;
  push(
    `- **${s.label}** \`${s.id}\` — sản lượng A=${s.output.A}, B=${s.output.B}, C=${s.output.C}; thời gian lao động xã hội cần thiết (tính lại) = ${num(snlt.toFixed(2))} giờ.`,
    `  - ${s.note}`
  );
});
push("", `**Cách tính:** ${value.method}`, "");
assumptions(value.assumptions);
push("#### Các nhân tố ảnh hưởng lượng giá trị", "");
value.factors.forEach(concept);
push("### Tầng 2 — Giải thích học thuật", "");
value.academic.concepts.forEach(concept);
(value.academic.distinctions ?? []).forEach(distinction);
push("### Tầng 3 — Kiểm tra nhanh", "");
quiz(value.check);

/* ───── Ch.04 ───── */
chapterHead("04", "Tư bản", capital.chapterId);
visual(capital.visual);
const b = capital.baseline;
push(
  `#### Số liệu gốc`,
  "",
  `c = ${b.c}, v = ${b.v}, m = ${b.m}, W = ${b.c + b.v + b.m}; ngày lao động ${b.workdayHours} giờ, thời gian tất yếu ${b.necessaryHours} giờ.`,
  "",
  "#### Kịch bản (tính lại bằng công thức của mô hình)",
  "",
  "| Mã | Chế độ | Ngày LĐ (giờ) | Tất yếu (giờ) | Thặng dư (giờ) | c | v | m | W | m' (%) |",
  "|---|---|---|---|---|---|---|---|---|---|"
);
const vph = (b.v + b.m) / b.workdayHours;
capital.scenarios.forEach((s) => {
  const v = vph * s.necessaryHours;
  const m = vph * (s.workdayHours - s.necessaryHours);
  const c = b.c * (s.workdayHours / b.workdayHours);
  push(
    `| ${s.id} | ${s.mode === "absolute" ? "tuyệt đối" : "tương đối"} | ${s.workdayHours} | ${s.necessaryHours} | ${s.workdayHours - s.necessaryHours} | ${num(+c.toFixed(2))} | ${num(+v.toFixed(2))} | ${num(+m.toFixed(2))} | ${num(+(c + v + m).toFixed(2))} | ${num(+((m / v) * 100).toFixed(1))} |`
  );
});
push("");
capital.scenarios.forEach((s) => push(`- **${s.label}** \`${s.id}\`: ${s.note}`));
push("");
assumptions(capital.assumptions);
push("#### Công thức", "");
capital.formulas.forEach((f) => {
  push(`- \`${f.expression}\` — ${f.meaning}`);
  push(`  - Nguồn: ${src(f.source)}`);
});
push("", "### Tầng 2 — Giải thích học thuật", "");
capital.academic.concepts.forEach(concept);
(capital.academic.distinctions ?? []).forEach(distinction);
push("### Tầng 3 — Kiểm tra nhanh", "");
quiz(capital.check);

/* ───── Ch.05 ───── */
chapterHead("05", "Thị trường", market.chapterId);
visual(market.visual);
push(`#### Kịch bản giá (giá trị một áo = ${market.valuePerShirt} đơn vị minh họa)`, "");
market.scenarios.forEach((s) =>
  push(
    `- **${s.label}** \`${s.id}\`: độ lệch ${s.priceDeviation > 0 ? "+" : ""}${s.priceDeviation}% → giá ${market.valuePerShirt * (1 + s.priceDeviation / 100)}. ${s.note}`
  )
);
push("", `**So sánh nhà sản xuất:** ${market.competitionNote}`, "");
assumptions(market.assumptions);
push("### Tầng 2 — Giải thích học thuật", "");
market.academic.concepts.forEach(concept);
(market.academic.distinctions ?? []).forEach(distinction);
push("### Tầng 3 — Kiểm tra nhanh", "");
quiz(market.check);

/* ───── Ch.06 ───── */
push("## Chương 06 — Nhìn lại", "", "#### Vòng đời sản phẩm", "");
recap.lifecycle.forEach((n, i) => push(`${i + 1}. **${n.label}** (→ ${n.chapterId}): ${n.summary}`));
push("", "#### Bài kiểm tra tổng hợp (10 câu)", "");
quiz(recap.finalQuiz);
push("#### Tài liệu tham khảo", "");
recap.references.forEach((r) => push(`- ${r.citation}`));
push("", `**Thông điệp kết:** ${recap.closing}`, "");

/* ───── Thuật ngữ ───── */
push("## Bảng thuật ngữ", "", "| Thuật ngữ | Định nghĩa | Chương | Nguồn |", "|---|---|---|---|");
glossary.forEach((g) =>
  push(`| ${g.term} | ${g.definition.replace(/\|/g, "/")} | ${g.chapterId} | ${src(g.source).replace(/\n.*/s, "")} |`)
);
push("");

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, out.join("\n"), "utf8");
console.log(`Đã ghi ${outFile} (${out.length} dòng)`);
