"use client";

/**
 * Quản lý tiến độ khám phá + câu trả lời quiz (REQUIREMENTS FR-03, FR-04, D13).
 * Lưu trữ hoàn toàn trong in-memory (RAM) phiên làm việc:
 * - Khi refresh lại trang: tiến độ và câu hỏi tự động reset về ban đầu.
 * - Đồng thời dọn sạch localStorage cũ nếu có trên trình duyệt của người dùng.
 * - useSyncExternalStore để mọi component đọc cùng một nguồn nhất quán.
 */

import { useSyncExternalStore } from "react";

const PROGRESS_KEY = "commodity.progress.v1";
const REPORTS_KEY = "commodity.reports.v1";

export interface ProgressState {
  visited: string[];
  quiz: Record<string, { correct: number; total: number }>;
  answers: Record<string, string>;
}

const EMPTY: ProgressState = { visited: [], quiz: {}, answers: {} };

let state: ProgressState = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  // Dọn dẹp sạch sẽ các key lưu trữ cũ trong localStorage nếu có
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
    window.localStorage.removeItem(REPORTS_KEY);
  } catch {
    /* bỏ qua */
  }
}

function emit(next: ProgressState) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  init();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => {
  init();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function markVisited(chapterId: string) {
  init();
  if (state.visited.includes(chapterId)) return;
  emit({ ...state, visited: [...state.visited, chapterId] });
}

export function recordAnswer(questionId: string, optionId: string) {
  init();
  emit({ ...state, answers: { ...state.answers, [questionId]: optionId } });
}

export function recordQuizScore(quizId: string, correct: number, total: number) {
  init();
  emit({ ...state, quiz: { ...state.quiz, [quizId]: { correct, total } } });
}

/** Xóa câu trả lời của một bộ câu hỏi để làm lại */
export function clearAnswers(quizId: string, questionIds: string[]) {
  init();
  const answers = { ...state.answers };
  questionIds.forEach((id) => delete answers[id]);
  const quiz = { ...state.quiz };
  delete quiz[quizId];
  emit({ ...state, answers, quiz });
}

export function resetProgress() {
  emit({ visited: [], quiz: {}, answers: {} });
}
