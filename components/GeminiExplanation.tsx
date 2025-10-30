
import React, { useState, useCallback } from 'react';
import { Question } from '../types';
import { fetchExplanation } from '../services/geminiService';

interface GeminiExplanationProps {
  question: Question;
  userAnswerLabel?: string;
}

const optionLabels = ['A', 'B', 'C', 'D'];

const GeminiExplanation: React.FC<GeminiExplanationProps> = ({ question, userAnswerLabel }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getExplanation = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setExplanation('');
    try {
      const result = await fetchExplanation(question, userAnswerLabel);
      setExplanation(result);
    } catch (err) {
      setError('Failed to get explanation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [question, userAnswerLabel]);

  return (
    <div className="mt-4">
      <button
        onClick={getExplanation}
        disabled={isLoading}
        className="px-4 py-2 text-sm bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:cursor-wait text-white font-semibold rounded-md transition flex items-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Getting Explanation...
          </>
        ) : (
          'Get AI Explanation'
        )}
      </button>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      
      {explanation && (
        <div className="mt-3 p-3 bg-slate-800 rounded-md border border-slate-700 text-sm text-slate-300 whitespace-pre-wrap">
          <p className="font-bold text-cyan-400 mb-2">AI Explanation:</p>
          {explanation}
        </div>
      )}
    </div>
  );
};

export default GeminiExplanation;
