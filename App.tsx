
import React, { useState, useCallback } from 'react';
import { quizData } from './constants';
import { Question, Answer } from './types';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Header from './components/Header';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<'start' | 'active' | 'results'>('start');
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number>(0);

  const questions: Question[] = quizData;

  const handleStartQuiz = useCallback(() => {
    setUserAnswers([]);
    setScore(0);
    setQuizState('active');
  }, []);

  const handleQuizComplete = useCallback((answers: Answer[]) => {
    let currentScore = 0;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setUserAnswers(answers);
    setQuizState('results');
  }, [questions]);

  const handleRestartQuiz = useCallback(() => {
    setQuizState('start');
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8 bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          {quizState === 'start' && (
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">Bienvenido Gay</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Esta es una simulación de tu examen hecha por tu super carnal, cuando termines en automático te dará tu resultado.
              </p>
              <button
                onClick={handleStartQuiz}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
              >
                Empezar
              </button>
            </div>
          )}
          {quizState === 'active' && (
            <Quiz questions={questions} onComplete={handleQuizComplete} />
          )}
          {quizState === 'results' && (
            <Results
              questions={questions}
              userAnswers={userAnswers}
              score={score}
              onRestart={handleRestartQuiz}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
