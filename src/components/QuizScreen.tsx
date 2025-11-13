import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, Sun, Droplets, Wind, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import type { Screen } from '../App';

interface QuizScreenProps {
  onNavigate: (screen: Screen) => void;
}

const questions = [
  {
    question: "What's your skin type?",
    options: [
      { label: 'Oily', icon: Droplets },
      { label: 'Dry', icon: Wind },
      { label: 'Combination', icon: Sparkles },
      { label: 'Normal', icon: Sun },
    ],
  },
  {
    question: "How much sun exposure do you get daily?",
    options: [
      { label: 'Minimal (Indoors mostly)', icon: Sun },
      { label: 'Moderate (1-2 hours)', icon: Sun },
      { label: 'High (3+ hours)', icon: Sun },
      { label: 'Variable', icon: Sun },
    ],
  },
  {
    question: "What are your main skin concerns?",
    options: [
      { label: 'Acne & Blemishes', icon: Sparkles },
      { label: 'Aging & Wrinkles', icon: Sparkles },
      { label: 'Dark Spots', icon: Sparkles },
      { label: 'Sensitivity', icon: Sparkles },
    ],
  },
  {
    question: "How often do you cleanse your face?",
    options: [
      { label: 'Once a day', icon: Droplets },
      { label: 'Twice a day', icon: Droplets },
      { label: 'More than twice', icon: Droplets },
      { label: 'Occasionally', icon: Droplets },
    ],
  },
];

export default function QuizScreen({ onNavigate }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsComplete(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onNavigate('home');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-blue-50/50 to-purple-50/50 pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div className="flex-1">
            <h2 className="text-purple-900">Skin Type Quiz</h2>
            <p className="text-purple-600/70">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl p-8 mb-6">
                <h3 className="text-purple-900 text-center mb-8">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(index)}
                        className={`p-6 rounded-2xl transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-pink-200 to-purple-200 shadow-lg'
                            : 'bg-white/60 backdrop-blur hover:bg-white/80'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-3 ${
                          isSelected ? 'text-purple-600' : 'text-purple-400'
                        }`} />
                        <p className={`${
                          isSelected ? 'text-purple-900' : 'text-purple-700'
                        }`}>
                          {option.label}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-lg rounded-3xl p-8 mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-purple-600" />
                </motion.div>

                <h2 className="text-purple-900 mb-3">Quiz Complete!</h2>
                <p className="text-purple-600/70 mb-8">
                  We've analyzed your responses and updated your skin profile
                </p>

                <div className="space-y-3 mb-8">
                  <Card className="bg-white/60 backdrop-blur border-0 rounded-2xl p-4">
                    <p className="text-purple-700">Detected Skin Type</p>
                    <p className="text-purple-900">Combination</p>
                  </Card>
                  <Card className="bg-white/60 backdrop-blur border-0 rounded-2xl p-4">
                    <p className="text-purple-700">Primary Concern</p>
                    <p className="text-purple-900">Hydration & Sun Protection</p>
                  </Card>
                </div>

                <Button
                  onClick={() => onNavigate('recommendations')}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6 shadow-lg"
                >
                  View Personalized Recommendations
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
