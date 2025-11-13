import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingScreensProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Camera,
    title: "Analyze your skin with AI",
    description: "Take a selfie and let our AI technology identify your unique skin concerns",
    gradient: "from-pink-200 to-purple-200",
  },
  {
    icon: Sparkles,
    title: "Get product recommendations made just for you",
    description: "Discover personalized skincare products tailored to your skin type and concerns",
    gradient: "from-purple-200 to-blue-200",
  },
  {
    icon: TrendingUp,
    title: "Track your progress and glow smarter",
    description: "Monitor your skin's improvement journey with AI-powered insights",
    gradient: "from-blue-200 to-pink-200",
  },
];

export default function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-cream-50 to-pink-50">
      <div className="flex justify-end p-6">
        <button 
          onClick={handleSkip}
          className="text-purple-400 hover:text-purple-600 transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-40 h-40 rounded-full bg-gradient-to-br ${slides[currentSlide].gradient} flex items-center justify-center shadow-lg mb-8`}
            >
              {(() => {
                const IconComponent = slides[currentSlide].icon;
                return <IconComponent className="w-20 h-20 text-white" strokeWidth={1.5} />;
              })()}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-purple-900 mb-4 px-4"
            >
              {slides[currentSlide].title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-purple-600/70 max-w-sm"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentSlide === index ? 24 : 8,
                backgroundColor: currentSlide === index ? '#9333ea' : '#d8b4fe',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full py-6 shadow-lg"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
