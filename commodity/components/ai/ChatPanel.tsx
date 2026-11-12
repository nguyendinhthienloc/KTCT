"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RichText } from "@/components/ui/RichText";
import { CHAPTERS } from "@/content/chapters";
import { ask, saveReport, MAX_QUESTION, type Answer, type Turn } from "./api";

const SUGGESTIONS = [
  "Giá trị của bạn do đâu mà có?",
  "Giá trị thặng dư khác lợi nhuận thế nào?",
  "Vì sao giá bán của bạn lên xuống?",
  "Tư bản bất biến và khả biến khác nhau ra sao?",
];

const AI_LABEL = "Câu trả lời do AI tạo — hãy đối chiếu với nội dung chương";

interface Message {
  id: number;
  question: string;
  status: "loading" | "done";
  answer?: Answer;
  report?: "saved" | "failed";
}

/** Tách câu đầu làm lời dẫn (serif nghiêng), phần còn lại là thân bài. */
function splitLead(text: string): { lead: string; body: string } {
  const m = text.match(/^([\s\S]+?[.!?…])(?:\s+|$)([\s\S]*)$/);
  if (!m || m[1].length > 220) return { lead: text, body: "" };
  return { lead: m[1], body: m[2].trim() };
}

function ChapterLinks({ ids, onNavigate }: { ids: string[]; onNavigate: () => void }) {
  const list = ids.length ? CHAPTERS.filter((c) => ids.includes(c.id)) : CHAPTERS.filter((c) => c.id !== "khoi-dau" && c.id !== "nhin-lai");
  return (
    <div className="mt-5">
      <p className="eyebrow text-stone-light">{ids.length ? "Đọc tiếp" : "Các chương"}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {list.map((c) => (
          <a
            key={c.id}
            href={`/#${c.id}`}
            onClick={onNavigate}
            className="border border-bronze/60 px-3 py-2 text-[0.8rem] text-bronze-soft transition-colors duration-300 hover:bg-bronze hover:text-ink motion-reduce:transition-none"
          >
            Chương {c.number} · {c.title} <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const idRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<Message[]>([]);
  messagesRef.current = messages;

  useEffect(() => () => abortRef.current?.abort(), []);

  // Đưa câu hỏi mới nhất lên đầu vùng đọc để người đọc đọc từ đầu câu trả lời.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last) document.getElementById(`ai-msg-${last.id}`)?.scrollIntoView({ block: "start" });
  }, [messages.length]);

  const submit = useCallback(
    async (raw: string) => {
      const question = raw.trim().slice(0, MAX_QUESTION);
      if (!question || busy) return;
      const history: Turn[] = [];
      for (const m of messagesRef.current) {
        if (m.answer) history.push({ role: "user", text: m.question }, { role: "assistant", text: m.answer.answer });
      }
      const id = ++idRef.current;
      setDraft("");
      setBusy(true);
      setMessages((prev) => [...prev, { id, question, status: "loading" }]);
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const answer = await ask(question, history.slice(-6), ctrl.signal);
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "done", answer } : m)));
      } catch {
        return; // bị hủy khi đóng bảng
      } finally {
        if (abortRef.current === ctrl) {
          abortRef.current = null;
          setBusy(false);
        }
      }
      inputRef.current?.focus({ preventScroll: true });
    },
    [busy],
  );

  const report = (m: Message) => {
    if (!m.answer || m.report === "saved") return;
    const ok = saveReport({ question: m.question, answer: m.answer.answer, chapters: m.answer.chapters, source: m.answer.source });
    setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, report: ok ? "saved" : "failed" } : x)));
  };

  const remaining = MAX_QUESTION - draft.length;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-start justify-between gap-4 border-b border-ivory/15 px-5 py-4 sm:px-7">
        <div>
          <p className="eyebrow text-bronze">Hỏi chiếc áo</p>
          <h2 id="ai-title" className="mt-2 font-serif text-[1.5rem] italic leading-tight text-ivory">
            Tôi là chiếc áo. Bạn muốn hỏi gì?
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label="Đóng khung hỏi đáp"
          className="shrink-0 border border-ivory/25 px-3 py-2 text-[0.75rem] text-ivory/80 transition-colors duration-300 hover:border-bronze hover:text-bronze motion-reduce:transition-none"
        >
          Đóng <span aria-hidden="true">✕</span>
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Cuộc trò chuyện với chiếc áo">
        {messages.length === 0 && (
          <div>
            <p className="font-sans text-[0.92rem] font-300 leading-relaxed text-ivory/70">
              Tôi chỉ trả lời dựa trên nội dung của hành trình này: hàng hóa, giá trị, giá trị thặng dư, thị trường. Câu hỏi ngoài chủ đề tôi xin phép không bàn.
            </p>
            <p className="eyebrow mt-7 text-stone-light">Gợi ý</p>
            <ul className="mt-3 flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => submit(s)}
                    disabled={busy}
                    className="w-full border border-ivory/20 px-4 py-3 text-left text-[0.88rem] text-ivory/85 transition-colors duration-300 hover:border-bronze hover:text-bronze disabled:opacity-50 motion-reduce:transition-none"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((m) => {
          const parts = m.answer ? splitLead(m.answer.answer) : null;
          return (
            <article key={m.id} id={`ai-msg-${m.id}`} className="scroll-mt-2 border-t border-ivory/15 pb-8 pt-6 first:border-t-0 first:pt-0">
              <p className="eyebrow text-stone-light">Bạn hỏi</p>
              <p className="mt-2 text-[0.8rem] uppercase tracking-[0.12em] text-stone-light [font-variant:small-caps]">{m.question}</p>

              <p className="eyebrow mt-6 text-bronze">Chiếc áo đáp</p>
              {m.status === "loading" || !m.answer || !parts ? (
                <p className="mt-3 font-serif text-[1.2rem] italic text-ivory/60" role="status">
                  Chiếc áo đang nghĩ…
                </p>
              ) : (
                <>
                  <p className="mt-3 font-serif text-[1.3rem] italic leading-snug text-ivory">
                    <RichText text={parts.lead} />
                  </p>
                  {parts.body && (
                    <p className="mt-3 whitespace-pre-line font-sans text-[0.92rem] font-300 leading-relaxed text-ivory/80">
                      <RichText text={parts.body} />
                    </p>
                  )}
                  <ChapterLinks ids={m.answer.chapters} onNavigate={onClose} />
                  <div className="mt-5 border-t border-ivory/10 pt-3">
                    {m.answer.source === "offline" && <p className="eyebrow mb-1 text-bronze-soft">Chế độ ngoại tuyến</p>}
                    <p className="text-[0.72rem] leading-relaxed text-stone-light">{AI_LABEL}</p>
                    <button
                      type="button"
                      onClick={() => report(m)}
                      disabled={m.report === "saved"}
                      className="mt-2 text-[0.75rem] text-ivory/70 underline decoration-ivory/30 underline-offset-4 transition-colors hover:text-bronze disabled:no-underline disabled:opacity-80 motion-reduce:transition-none"
                    >
                      {m.report === "saved" ? "Đã ghi nhận" : "Báo sai"}
                    </button>
                    {m.report === "failed" && <span className="ml-3 text-[0.72rem] text-stone-light">Không lưu được trên trình duyệt này.</span>}
                  </div>
                </>
              )}
            </article>
          );
        })}
        <div ref={endRef} />
      </div>

      <form
        className="border-t border-ivory/15 px-5 py-4 sm:px-7"
        onSubmit={(e) => {
          e.preventDefault();
          submit(draft);
        }}
      >
        <label htmlFor="ai-input" className="sr-only">
          Câu hỏi của bạn
        </label>
        <textarea
          id="ai-input"
          ref={inputRef}
          value={draft}
          rows={2}
          maxLength={MAX_QUESTION}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit(draft);
            }
          }}
          placeholder="Hỏi về hàng hóa, giá trị, giá trị thặng dư…"
          className="w-full resize-none border border-ivory/25 bg-transparent px-3 py-2 text-[0.92rem] text-ivory placeholder:text-stone focus:border-bronze focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className={`text-[0.7rem] ${remaining < 50 ? "text-bronze-soft" : "text-stone"}`}>
            {draft.length}/{MAX_QUESTION}
          </span>
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            className="border border-bronze bg-bronze px-5 py-2 text-[0.8rem] font-500 text-ink transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
          >
            {busy ? "Đang trả lời…" : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
}
