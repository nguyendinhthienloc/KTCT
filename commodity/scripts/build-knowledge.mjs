// Tạo public/knowledge.json: gói tri thức gọn cho "Hỏi chiếc áo" (dùng ở serve.mjs).
// Chạy: node scripts/build-knowledge.mjs  (Node 24 đọc trực tiếp file .ts)
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { intro } from "../content/intro.ts";
import { commodity } from "../content/commodity.ts";
import { production } from "../content/production.ts";
import { value } from "../content/value.ts";
import { capital } from "../content/capital.ts";
import { market } from "../content/market.ts";
import { glossary } from "../content/glossary.ts";
import { faq } from "../content/faq.ts";
import { CHAPTERS } from "../content/chapters.ts";

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, "../public/knowledge.json");

const chapters = [commodity, production, value, capital, market];
const concepts = [];
const distinctions = [];
const assumptions = [];
const scenarios = [];

for (const c of chapters) {
  const id = c.chapterId;
  for (const k of [...c.academic.concepts, ...(c.factors ?? [])]) {
    concepts.push({ term: k.term, definition: k.definition, explanation: k.explanation, chapterId: id });
  }
  for (const d of c.academic.distinctions ?? []) {
    distinctions.push({
      title: d.title,
      left: { term: d.left.term, points: d.left.points },
      right: { term: d.right.term, points: d.right.points },
      takeaway: d.takeaway,
      chapterId: id,
    });
  }
  for (const a of c.assumptions ?? []) assumptions.push({ text: a.text, chapterId: id });
}

for (const s of value.scenarios) scenarios.push({ chapterId: "gia-tri", label: s.label, note: s.note });
if (value.method) scenarios.push({ chapterId: "gia-tri", label: "Cách tính", note: value.method });
for (const s of capital.scenarios) scenarios.push({ chapterId: "tu-ban", label: s.label, note: s.note });
for (const f of capital.formulas) scenarios.push({ chapterId: "tu-ban", label: f.expression, note: f.meaning });
for (const s of market.scenarios) scenarios.push({ chapterId: "thi-truong", label: s.label, note: s.note });
scenarios.push({ chapterId: "thi-truong", label: "So sánh nhà sản xuất", note: market.competitionNote });

const knowledge = {
  intro: intro.intro.join(" "),
  chapters: CHAPTERS.map((c) => ({ id: c.id, number: c.number, title: c.title, question: c.question })),
  concepts,
  distinctions,
  assumptions,
  scenarios,
  glossary: glossary.map((g) => ({ term: g.term, definition: g.definition, chapterId: g.chapterId })),
  faq,
};

const json = JSON.stringify(knowledge);
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, json);
console.log(`knowledge.json: ${(json.length / 1024).toFixed(1)} KB, ${concepts.length} khái niệm, ${faq.length} FAQ`);
