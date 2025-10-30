
import React, { useState, useCallback, useMemo } from 'react';
import { Question, Answer } from '../types';
import QuestionCard from './QuestionCard';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const handleAnswerSelect = useCallback((questionId: number, answer: string) => {
    setUserAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((a) => a.questionId === questionId);
      if (existingAnswerIndex > -1) {
        const newAnswers = [...prevAnswers];
        newAnswers[existingAnswerIndex] = { questionId, answer };
        return newAnswers;
      }
      return [...prevAnswers, { questionId, answer }];
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(() => {
    onComplete(userAnswers);
  }, [onComplete, userAnswers]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const selectedAnswer = useMemo(() => userAnswers.find((a) => a.questionId === currentQuestion.id)?.answer, [userAnswers, currentQuestion.id]);

  const progressPercentage = (userAnswers.length / questions.length) * 100;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
           <span className="text-sm font-semibold text-slate-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
           <span className="text-sm font-semibold text-cyan-400">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div
            className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
      />

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:cursor-not-allowed disabled:text-slate-500 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
