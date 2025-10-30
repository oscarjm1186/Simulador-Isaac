
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Answer {
  questionId: number;
  answer: string;
}
