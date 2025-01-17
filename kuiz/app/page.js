'use client'; // Car on utilise des hooks et des états

import questions from './question-reponse.json';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState({ bonnes: 0, mauvaises: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState(null);
  const [categories, setCategories] = useState({
    'Histoire & Géographie': true,
    'Politique & Religion': true,
    'Sport & Loisirs': true,
    'Sciences & Technologie': true,
    'Art & Culture': true,
    'Société & Economie': true,
  });

  const buttonColors = {
    'Sciences & Technologie': 'bg-green-800',
    'Art & Culture': 'bg-pink-800',
    'Histoire & Géographie': 'bg-blue-800',
    'Sport & Loisirs': 'bg-orange-800',
    'Politique & Religion': 'bg-purple-800',
    'Société & Economie': 'bg-yellow-800',
  };

  const bgColors = {
    'Sciences & Technologie': 'bg-science-technologie',
    'Art & Culture': 'bg-art-culture',
    'Histoire & Géographie': 'bg-histoire-geographie',
    'Sport & Loisirs': 'bg-sport-loisir',
    'Politique & Religion': 'bg-politique-religion',
    'Société & Economie': 'bg-societe-economie',
  }

  // Called when user clicks on an answer
  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return; // Empêche de sélectionner plusieurs réponses

    setSelectedAnswer(index);
    const isCorrect = currentQuestion.reponses[index].correcte;

    // Mise à jour du score
    if (isCorrect) {
      setScore((prev) => ({ ...prev, bonnes: prev.bonnes + 1 }));
    } else {
      setScore((prev) => ({ ...prev, mauvaises: prev.mauvaises + 1 }));
    }

    // Affiche le feedback pendant 1 seconde
    setTimeout(() => {
      setSelectedAnswer(null);
      setPreviousQuestions(currentQuestion);
      pickRandomQuestion(); // Choisit une nouvelle question
    }, 1000);
  };

  // Toggle category selection
  const toggleCategory = (category) => {
    setCategories((prev) => {
      let new_categories = { ...prev, [category]: !prev[category] };
      if (Object.values(new_categories).every((val) => val === false)) {
        new_categories = Object.keys(new_categories).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
      }
      return new_categories;
    });
  };

  // Select a random question from active categories
  const pickRandomQuestion = () => {
    const activeCategories = Object.keys(categories).filter((cat) => categories[cat]);
    const filteredQuestions = questions.filter((q) => activeCategories.includes(q.category));
    
    if (filteredQuestions.length === 0) {
      alert("Aucune question disponible pour les catégories sélectionnées.");
      return;
    }

    const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    const answers = ['a', 'b', 'c', 'd'].map((letter) => ({
      texte: randomQuestion[letter],
      correcte: letter === randomQuestion.r,
    }));
    setCurrentQuestion({
      question: randomQuestion.q,
      reponses: shuffleArray(answers),
      category: randomQuestion.category,
      source: randomQuestion.source,
    });
  };

  // Pick a random question when the component mounts
  useEffect(() => {
    pickRandomQuestion();
  }, []);

  return (
    <div className={`flex items-start pt-8 justify-center min-h-screen ${currentQuestion?.category ? bgColors[currentQuestion.category] : 'bg-white'}`}>

      <div className="w-full max-w-md lg:max-w-lg p-2">
        {/* Titre */}
        <h1 className="text-center text-5xl font-bold text-black mb-8">Le Kuiz</h1>

        {/* Boutons de catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`p-2 rounded-lg text-white text-sm font-medium shadow-md transition-all ${
                buttonColors[category]
              } ${categories[category] ? 'opacity-100' : 'opacity-50'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Question */}
        <p className="text-center font-bold text-xl lg:text-2xl mb-8 text-black text-3xl">
          {currentQuestion?.question}
        </p>

        {/* Réponses */}
        <div className="space-y-2 px-4 mb-6">
          {currentQuestion?.reponses.map((reponse, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-2 rounded-lg transition-all text-black text-xl shadow-md ${
                    selectedAnswer === index ? 
                      reponse.correcte ? 
                        'bg-green-500' 
                        : 'bg-red-500' 
                      : selectedAnswer !== null && reponse.correcte ? 
                        'bg-green-500'
                        : 'bg-white hover:bg-gray-300'
                }`}
                disabled={selectedAnswer !== null}
              >
              {reponse.texte}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center text-md text-gray-600">
          Bonnes réponses: {score.bonnes} <br/> 
          Mauvaises réponses: {score.mauvaises}
        </div>

        {/* Floating Bubble button that Link to previous source */}
        {previousQuestions && (
          <Link
            href={"https://fr.wikipedia.org/" + previousQuestions.source}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-4 left-4 p-3 bg-white rounded-full shadow-md"
          >
            <h1 className='text-black'>Source ?</h1>
          </Link>
        )}

      </div>
    </div>
  );
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Choisir un index aléatoire entre 0 et i
    const j = Math.floor(Math.random() * (i + 1));
    // Échanger les éléments array[i] et array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

