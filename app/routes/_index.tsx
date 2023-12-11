import { RadioGroup } from "@headlessui/react";
import { Form, useLoaderData } from "@remix-run/react";
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunction,
  type MetaFunction,
} from "@vercel/remix";
import { addDays, format, startOfDay } from "date-fns";
import { useState } from "react";

import {
  answeredCookie,
  classNames,
  getCurrentQuestion,
  getQuestionByIndex,
} from "../utils";

import type { Question } from "../types";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Disney Trivia" },
    { name: "description", content: "Daily Disney Trivia!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get("Cookie");
  const hasPlayed = await answeredCookie.parse(cookie);
  const question = await getCurrentQuestion();

  return {
    hasPlayed: hasPlayed === null ? false : true,
    wasCorrect: hasPlayed && hasPlayed.correct ? true : false,
    correctAnswerIndex: hasPlayed ? hasPlayed.correctAnswerIndex : undefined,
    ...question,
  };
};

const answerLabel = ["A", "B", "C", "D"];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const currentQuestionIndex = Number(formData.get("currentQuestionIndex"));
  const answerChosen = Number(formData.get("answerChosen"));

  if (isNaN(answerChosen) || isNaN(currentQuestionIndex)) {
    return json({ errors: ["Something went wrong"] });
  }

  const question = await getQuestionByIndex(currentQuestionIndex);

  if (answerChosen === question.correctAnswerIndex) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await answeredCookie.serialize(
          {
            correct: true,
            answerChosen,
          },
          { expires: startOfDay(addDays(new Date(), 1)) }
        ),
      },
    });
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await answeredCookie.serialize(
        {
          correct: false,
          answerChosen,
          correctAnswerIndex: question.correctAnswerIndex,
        },
        { expires: startOfDay(addDays(new Date(), 1)) }
      ),
    },
  });
}

export default function Index() {
  const [selected, setSelected] = useState<number | undefined>();
  const {
    currentQuestionIndex,
    question,
    answers,
    hasPlayed,
    wasCorrect,
    correctAnswerIndex,
  } = useLoaderData<
    Omit<Question, "correctAnswerIndex"> & {
      currentQuestionIndex: number;
      hasPlayed: boolean;
      wasCorrect: boolean;
      correctAnswerIndex?: number;
    }
  >();

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-6">
      <div className="gap-1 flex flex-col">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-4xl sm:tracking-tight">
          Daily Disney
        </h2>
        <h3 className="text-lg font-bold leading-7 text-gray-800 dark:text-gray-300 sm:truncate sm:tracking-tight text-center">
          {format(new Date(), "P")}
        </h3>
      </div>
      <div>
        <div className="rounded-lg max-w-lg border border-gray-200 dark:border-gray-500 shadow-md bg-white/10 hover:bg-white/2">
          <div className="p-6">
            {hasPlayed ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  {wasCorrect ? "Nice job!" : "Better luck next time!"} You can
                  try again tomorrow!
                </h3>
                {correctAnswerIndex !== undefined ? (
                  <div className="mt-8 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      {question}
                    </h3>
                    <div className="relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between border-gray-300 ring-2 ring-gray-300">
                      <p className="text-white">
                        Answer: {answers[correctAnswerIndex]}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
                  {question}
                </h3>

                <Form method="post" className="flex flex-col space-y-4">
                  <input
                    type="hidden"
                    name="currentQuestionIndex"
                    value={currentQuestionIndex}
                  />
                  <input
                    type="hidden"
                    name="answerChosen"
                    value={selected ?? 0}
                  />
                  <RadioGroup value={selected} onChange={setSelected}>
                    <div className="space-y-4">
                      {answers.map((answer, idx) => (
                        <RadioGroup.Option
                          key={idx}
                          value={idx}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "border-gray-300 ring-2 ring-gray-300"
                                : "border-gray-500",
                              "relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                  <RadioGroup.Label
                                    as="span"
                                    className="font-medium dark:text-white text-gray-700"
                                  >
                                    {answerLabel[idx]}: {answer}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-gray-300"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                  <button
                    type="submit"
                    value="Submit"
                    disabled={selected === undefined}
                    className={classNames(
                      "rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm",
                      selected === undefined
                        ? "cursor-not-allowed bg-gray-600"
                        : "cursor-pointer bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    Submit
                  </button>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
