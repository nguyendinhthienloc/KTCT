import { CHAPTERS } from "@/content/chapters";
import { matchFaq } from "./match";

export type AnswerSource = "ai" | "offline";

export interface Answer {
  answer: string;
  chapters: string[];
  source: AnswerSource;
}

export interface Turn {
  role: "user" | "assistant";
  text: string;
}

export const MAX_QUESTION = 500;
export const NO_INFO_OFFLINE =
  "Mình chưa có thông tin đó trong hành trình này. Bạn thử hỏi về hàng hóa, giá trị, giá trị thặng dư hoặc giá cả, hoặc đọc trực tiếp các chương.";

const ENDPOINT = (process.env.NEXT_PUBLIC_API_BASE ?? "") + "/api/hoi";
const CLIENT_TIMEOUT_MS = 20000;
const VALID_IDS = new Set(CHAPTERS.map((c) => c.id));

/** Trả lời bằng bộ hỏi đáp soạn sẵn khi không gọi được máy chủ. */
export function offlineAnswer(question: string): Answer {
  const hit = matchFaq(question);
  if (hit) return { answer: hit.a, chapters: hit.chapters, source: "offline" };
  return { answer: NO_INFO_OFFLINE, chapters: [], source: "offline" };
}

/**
 * Hỏi máy chủ; mọi lỗi (mạng, mã khác 2xx, JSON sai dạng, hết thời gian) đều rơi về chế độ ngoại tuyến.
 * Chỉ ném lỗi khi bị người dùng hủy.
 */
export async function ask(question: string, history: Turn[], signal: AbortSignal): Promise<Answer> {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), CLIENT_TIMEOUT_MS);
  const onAbort = () => timeout.abort();
  signal.addEventListener("abort", onAbort);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, history: history.slice(-6) }),
      signal: timeout.signal,
    });
    if (!res.ok) throw new Error("http " + res.status);
    const data: unknown = await res.json();
    const d = data as Partial<Answer> | null;
    if (!d || typeof d.answer !== "string" || !d.answer.trim()) throw new Error("bad payload");
    const chapters = Array.isArray(d.chapters) ? d.chapters.filter((c) => typeof c === "string" && VALID_IDS.has(c)).slice(0, 2) : [];
    return { answer: d.answer.trim(), chapters, source: d.source === "ai" ? "ai" : "offline" };
  } catch {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return offlineAnswer(question);
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", onAbort);
  }
}

export const REPORTS_KEY = "commodity.reports.v1";

/** Lưu báo sai trong bộ nhớ phiên làm việc (in-memory). Không lưu vĩnh viễn vào localStorage. */
const memoryReports: Array<{ question: string; answer: string; chapters: string[]; source: AnswerSource; at: string }> = [];

export function saveReport(entry: { question: string; answer: string; chapters: string[]; source: AnswerSource }): boolean {
  memoryReports.push({ ...entry, at: new Date().toISOString() });
  return true;
}
