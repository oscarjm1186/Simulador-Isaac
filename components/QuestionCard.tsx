
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
}

const optionLabels = ['A', 'B', 'C', 'D'];

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-slate-100">{question.id}. {question.question}</h3>
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const optionLabel = optionLabels[index];
          const isSelected = selectedAnswer === optionLabel;
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(optionLabel)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'bg-cyan-800 border-cyan-500 shadow-lg scale-102' 
                  : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-cyan-700'}
              `}
            >
              <span className="font-bold mr-3 text-cyan-400">{optionLabel})</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
