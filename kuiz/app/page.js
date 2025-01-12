'use client'; // Car on utilise des hooks et des états

import questions from './question-reponse.json';
import { useState } from 'react';

export default function Home() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ bonnes: 0, mauvaises: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return; // Empêche de sélectionner plusieurs réponses

    setSelectedAnswer(index);
    const isCorrect = questions[currentQuestion].reponses[index].correcte;

    // Mise à jour du score
    if (isCorrect) {
      setScore((prev) => ({ ...prev, bonnes: prev.bonnes + 1 }));
    } else {
      setScore((prev) => ({ ...prev, mauvaises: prev.mauvaises + 1 }));
    }

    // Affiche le feedback pendant 1 seconde
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => (prev + 1) % questions.length); // Passe à la question suivante
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200">
      <div className="w-full max-w-md p-6 space-y-12">
        {/* Question */}
        <p className="text-center font-bold text-lg mb-4 text-black text-3xl">
          {questions[currentQuestion].question}
        </p>
        {/* Réponses */}
        <div className="space-y-4">
          {questions[currentQuestion].reponses.map((reponse, index) => (
              <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-3 rounded-lg transition-all text-black text-xl shadow-md ${
                  selectedAnswer === index
                  ? reponse.correcte
                  ? 'bg-green-500'
                  : 'bg-red-500'
                  : 'bg-white hover:bg-gray-300 '
              }`}
              disabled={selectedAnswer !== null}
              >
              {reponse.texte}
            </button>
          ))}
        </div>
        {/* Counter */}
        <div className="text-center mt-6 text-md text-gray-600">
          Bonnes réponses: {score.bonnes} <br/> 
          Mauvaises réponses: {score.mauvaises}
        </div>
      </div>
    </div>
  );
}