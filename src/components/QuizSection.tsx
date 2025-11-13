import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import RoutineSection from './RoutineSection';

const quizQuestions = [
  {
    question: "What's your primary skin type?",
    type: 'single' as const,
    options: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'],
  },
  {
    question: "What are your main skin concerns? (Select all that apply)",
    type: 'multiple' as const,
    options: ['Acne & Blemishes', 'Dark Spots & Pigmentation', 'Fine Lines & Wrinkles', 'Large Pores', 'Dullness', 'Redness & Irritation', 'Uneven Texture', 'Dark Circles'],
  },
  {
    question: "How would you describe your skin's sensitivity?",
    type: 'single' as const,
    options: ['Very Sensitive', 'Somewhat Sensitive', 'Not Very Sensitive', 'Not Sensitive At All'],
  },
  {
    question: "What skincare products do you currently use? (Select all that apply)",
    type: 'multiple' as const,
    options: ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Eye Cream', 'Face Mask', 'Exfoliator', 'Retinol/Retinoids', 'None'],
  },
  {
    question: "How much sun exposure do you get daily?",
    type: 'single' as const,
    options: ['Minimal (Mostly Indoors)', '1-2 Hours', '3-4 Hours', 'More than 4 Hours', 'Variable/Seasonal'],
  },
  {
    question: "How often do you cleanse your face?",
    type: 'single' as const,
    options: ['Once a Day', 'Twice a Day', 'More than Twice', 'Occasionally', 'Rarely'],
  },
  {
    question: "Which ingredients have you used before? (Select all that apply)",
    type: 'multiple' as const,
    options: ['Vitamin C', 'Niacinamide', 'Hyaluronic Acid', 'Retinol', 'AHA/BHA', 'Peptides', 'Tea Tree Oil', 'Salicylic Acid', 'None/Not Sure'],
  },
  {
    question: "What time of day do you usually break out or notice skin issues?",
    type: 'single' as const,
    options: ['Morning', 'Afternoon', 'Evening/Night', 'All Day', 'No Specific Pattern'],
  },
  {
    question: "What's your budget for monthly skincare?",
    type: 'single' as const,
    options: ['Under ₹1,000', '₹1,000 - ₹2,500', '₹2,500 - ₹5,000', '₹5,000 - ₹10,000', 'Above ₹10,000'],
  },
  {
    question: "What are your skincare goals? (Select all that apply)",
    type: 'multiple' as const,
    options: ['Clear Skin', 'Brighter Complexion', 'Anti-Aging', 'Hydration', 'Oil Control', 'Even Skin Tone', 'Reduce Pores', 'Firm Skin'],
  },
  {
    question: "Do you have any allergies to skincare ingredients? (Select all that apply)",
    type: 'multiple' as const,
    options: ['Fragrance', 'Parabens', 'Sulfates', 'Alcohol', 'Essential Oils', 'Preservatives', 'Silicones', 'None that I know of'],
  },
  {
    question: "How would you describe your current skin texture?",
    type: 'single' as const,
    options: ['Smooth', 'Rough/Bumpy', 'Uneven', 'Very Dry/Flaky', 'Mixed (Some areas smooth, some rough)'],
  },
];

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showRoutine, setShowRoutine] = useState(false);

  const currentQuestionData = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  
  // Get current answer
  const currentAnswer = answers[currentQuestion];
  
  // Check if current question is answered
  const isCurrentAnswered = currentQuestionData.type === 'single' 
    ? typeof currentAnswer === 'string' && currentAnswer.length > 0
    : Array.isArray(currentAnswer) && currentAnswer.length > 0;

  const handleSingleChoice = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: option }));
  };

  const handleMultipleChoice = (option: string) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
    const updated = current.includes(option)
      ? current.filter(a => a !== option)
      : [...current, option];
    setAnswers(prev => ({ ...prev, [currentQuestion]: updated }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-purple-900 mb-4">Personalized Skin Analysis Quiz</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Answer these questions to get AI-powered recommendations tailored specifically to your skin
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="relative bg-white border-0 shadow-xl rounded-3xl p-8 md:p-12 overflow-hidden">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-purple-600">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    {currentQuestionData.type === 'multiple' && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0">
                        Select Multiple
                      </span>
                    )}
                  </div>
                  <Progress value={progress} className="h-2 mb-6" />
                  
                  <h3 className="text-purple-900 mb-2">{currentQuestionData.question}</h3>
                  
                  <AnimatePresence mode="wait">
                    {!isCurrentAnswered ? (
                      <motion.p 
                        key="not-answered"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-orange-600 mb-6 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                        Please select at least one option to continue
                      </motion.p>
                    ) : (
                      <motion.p 
                        key="answered"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-green-600 mb-6 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Great! You can proceed to the next question
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="space-y-3">
                    {currentQuestionData.options.map((option, index) => {
                      const isSelected = currentQuestionData.type === 'single'
                        ? currentAnswer === option
                        : Array.isArray(currentAnswer) && currentAnswer.includes(option);

                      return (
                        <motion.div
                          key={option}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {currentQuestionData.type === 'single' ? (
                            <button
                              onClick={() => handleSingleChoice(option)}
                              className={`relative w-full text-left p-5 rounded-2xl border-2 transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-purple-400 shadow-lg'
                                  : 'bg-white border-purple-200 hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md'
                              }`}
                            >
                              <span className={`${isSelected ? 'text-purple-900' : 'text-purple-700'}`}>
                                {option}
                              </span>
                            </button>
                          ) : (
                            <label
                              className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-purple-400 shadow-lg'
                                  : 'bg-white border-purple-200 hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md'
                              }`}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => handleMultipleChoice(option)}
                                className="border-2"
                              />
                              <span className={`${isSelected ? 'text-purple-900' : 'text-purple-700'}`}>
                                {option}
                              </span>
                            </label>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  {currentQuestion > 0 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 rounded-2xl py-6 shadow-md hover:shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!isCurrentAnswered}
                    className={`flex-1 rounded-2xl py-6 transition-all duration-300 ${
                      isCurrentAnswered
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Get Results' : 'Next'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-xl rounded-3xl p-8 md:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-purple-600" />
                </motion.div>

                <h2 className="text-purple-900 mb-4">Quiz Complete! 🎉</h2>
                <p className="text-purple-700/80 mb-8 max-w-xl mx-auto">
                  Our AI is analyzing your responses to create a personalized skincare routine just for you
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-white/60 backdrop-blur border-0 rounded-2xl p-5">
                    <p className="text-purple-700/70 mb-2">Detected Skin Type</p>
                    <p className="text-purple-900">{answers[0] || 'Combination'}</p>
                  </Card>
                  <Card className="bg-white/60 backdrop-blur border-0 rounded-2xl p-5">
                    <p className="text-purple-700/70 mb-2">Primary Concerns</p>
                    <p className="text-purple-900">
                      {Array.isArray(answers[1]) ? answers[1].length : 0} Selected
                    </p>
                  </Card>
                  <Card className="bg-white/60 backdrop-blur border-0 rounded-2xl p-5">
                    <p className="text-purple-700/70 mb-2">Products Matched</p>
                    <p className="text-purple-900">12 Products</p>
                  </Card>
                </div>

                <Button
                  onClick={() => {
                    setShowRoutine(true);
                    setTimeout(() => {
                      const routineElement = document.getElementById('personalized-routine');
                      if (routineElement) {
                        routineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-8 py-6 shadow-lg"
                >
                  View Your Personalized Routine
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {showRoutine && (
          <motion.div
            id="personalized-routine"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <RoutineSection 
              skinType={answers[0] as string || 'Combination'}
              concerns={answers[1] as string[] || []}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
