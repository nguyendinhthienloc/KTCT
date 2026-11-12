"use client";

/**
 * Lưu tiến độ khám phá + điểm quiz (REQUIREMENTS FR-03, FR-04, D13).
 * - localStorage, bọc try/catch: bị chặn lưu trữ thì vẫn chạy trong bộ nhớ.
 * - useSyncExternalStore để mọi component đọc cùng một nguồn.
 */

import { useSyncExternalStore } from "react";

const KEY = "commodity.progress.v1";

export interface ProgressState {
  visited: string[];
  quiz: Record<string, { correct: number; total: number }>;
  answers: Record<string, string>;
}

const EMPTY: ProgressState = { visited: [], quiz: {}, answers: {} };

let state: ProgressState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<ProgressState>;
      state = {
        visited: Array.isArray(p.visited) ? p.visited : [],
        quiz: p.quiz ?? {},
        answers: p.answers ?? {},
      };
    }
  } catch {
    /* lưu trữ bị chặn hoặc dữ liệu hỏng — bỏ qua */
  }
}

function emit(next: ProgressState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* bỏ qua */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function markVisited(chapterId: string) {
  load();
  if (state.visited.includes(chapterId)) return;
  emit({ ...state, visited: [...state.visited, chapterId] });
}

export function recordAnswer(questionId: string, optionId: string) {
  load();
  emit({ ...state, answers: { ...state.answers, [questionId]: optionId } });
}

export function recordQuizScore(quizId: string, correct: number, total: number) {
  load();
  emit({ ...state, quiz: { ...state.quiz, [quizId]: { correct, total } } });
}

export function resetProgress() {
  emit({ visited: [], quiz: {}, answers: {} });
}
