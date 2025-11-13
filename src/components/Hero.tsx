import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles, Camera, TrendingUp, Star, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-3xl"
        />
        
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <motion.span 
                animate={pulseAnimation}
                className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full shadow-lg border border-purple-200/50 backdrop-blur-sm inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Skincare Assistant
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-purple-900 mb-6"
            >
              Your Journey to Radiant Skin Starts Here
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-purple-600/80 mb-8 max-w-xl"
            >
              Discover personalized skincare recommendations powered by AI. Analyze your skin, 
              track your progress, and find the perfect products for your unique skin type.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onGetStarted}
                  className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 hover:from-pink-500 hover:via-purple-500 hover:to-pink-500 text-white rounded-full px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-[length:200%_100%] animate-gradient"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Take the Skin Quiz
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 rounded-full px-8 py-6 backdrop-blur-sm bg-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 mt-12"
            >
              <div>
                <p className="text-purple-900 mb-1">10,000+</p>
                <p className="text-purple-600/70">Happy Users</p>
              </div>
              <div>
                <p className="text-purple-900 mb-1">50+</p>
                <p className="text-purple-600/70">Brands</p>
              </div>
              <div>
                <p className="text-purple-900 mb-1">95%</p>
                <p className="text-purple-600/70">Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-shadow backdrop-blur-sm border border-white/50"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center mb-2"
                >
                  <Camera className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-purple-900">AI Face Scan</p>
                <p className="text-purple-600/70">Instant Analysis</p>
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-shadow backdrop-blur-sm border border-white/50"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center mb-2"
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-purple-900">Track Progress</p>
                <p className="text-purple-600/70">See Results</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-6 bg-purple-400 rounded-full"
                      animate={{ height: [24, 32, 24] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Center glowing orb */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-3xl opacity-40" />
                <motion.div
                  animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl"
                />
              </motion.div>

              {/* Sparkle effects */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/4 right-10"
              >
                <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 left-10"
              >
                <Sparkles className="w-8 h-8 text-pink-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
