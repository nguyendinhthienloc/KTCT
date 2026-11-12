import { faq, type FaqEntry } from "@/content/faq";

/** Chuẩn hóa để so khớp: bỏ dấu tiếng Việt, hạ chữ thường, bỏ ký tự lạ. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const MIN_SCORE = 2;

/**
 * Chọn câu hỏi đáp gần nhất theo mức trùng từ khóa (đã bỏ dấu).
 * Cụm từ khóa trùng nguyên vẹn được tính nặng hơn từng từ lẻ. Dưới ngưỡng thì trả null.
 */
export function matchFaq(question: string, entries: FaqEntry[] = faq): FaqEntry | null {
  const q = " " + normalize(question) + " ";
  const words = new Set(q.trim().split(" ").filter((w) => w.length > 1));
  let best: FaqEntry | null = null;
  let bestScore = 0;
  for (const item of entries) {
    let score = 0;
    for (const kw of item.keywords) {
      const k = normalize(kw);
      if (!k) continue;
      if (q.includes(" " + k + " ")) score += 2 + k.split(" ").length;
      else score += k.split(" ").filter((w) => w.length > 1 && words.has(w)).length * 0.5;
    }
    for (const w of normalize(item.q).split(" ")) if (w.length > 2 && words.has(w)) score += 0.3;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore >= MIN_SCORE ? best : null;
}
