// This is how the kv stores questions in the list
export type Question = {
  question: string;
  answers: [string, string, string, string];
  correctAnswerIndex: number;
};
