import { kv } from "@vercel/kv";
import { createCookie } from "@vercel/remix";

import type { Question } from "./types";
import { differenceInDays } from "date-fns";

export function getTodayIndex() {
  const startDate = new Date(2023, 11, 11);
  return differenceInDays(startDate, new Date()) * -1;
}

export async function getCurrentQuestion() {
  const currentQuestionIndex = getTodayIndex();
  const question = await getQuestionByIndex(currentQuestionIndex);

  return {
    question: question.question,
    answers: question.answers,
    currentQuestionIndex,
  };
}

export async function getQuestionByIndex(questionIndex: number) {
  const question: Question = await kv.lindex("questions", questionIndex);
  return question;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const answeredCookie = createCookie("hasAnsweredToday");
