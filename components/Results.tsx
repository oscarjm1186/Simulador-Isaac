
import React from 'react';
import { Question, Answer } from '../types';
import GeminiExplanation from './GeminiExplanation';

interface ResultsProps {
  questions: Question[];
  userAnswers: Answer[];
  score: number;
  onRestart: () => void;
}

const optionLabels = ['A', 'B', 'C', 'D'];

const Results: React.FC<ResultsProps> = ({ questions, userAnswers, score, onRestart }) => {
  const getOptionText = (question: Question, label: string) => {
    const index = optionLabels.indexOf(label);
    return question.options[index] || 'N/A';
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8 p-6 bg-slate-700 rounded-xl">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">Exam Complete!</h2>
        <p className="text-xl text-slate-200">
          Your Score:
          <span className="font-extrabold text-4xl ml-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
            {score} / {questions.length}
          </span>
        </p>
      </div>

      <h3 className="text-2xl font-bold mb-6 border-b-2 border-slate-600 pb-2">Review Your Answers</h3>

      <div className="space-y-8">
        {questions.map((question) => {
          const userAnswerObj = userAnswers.find((a) => a.questionId === question.id);
          const userAnswer = userAnswerObj?.answer;
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <div key={question.id} className="p-4 bg-slate-900/50 rounded-lg">
              <p className="font-semibold text-lg mb-4">{question.id}. {question.question}</p>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">Correct Answer: </span>
                  <span className="text-green-400">{question.correctAnswer}) {getOptionText(question, question.correctAnswer)}</span>
                </p>
                <p>
                  <span className="font-bold">Your Answer: </span>
                  {userAnswer ? (
                    <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {userAnswer}) {getOptionText(question, userAnswer)}
                    </span>
                  ) : (
                    <span className="text-slate-500">Not Answered</span>
                  )}
                </p>
              </div>
              <GeminiExplanation question={question} userAnswerLabel={userAnswer} />
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={onRestart}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          Take Exam Again
        </button>
      </div>
    </div>
  );
};

export default Results;
