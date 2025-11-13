import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center shadow-xl"
        >
          <Sparkles className="w-16 h-16 text-purple-600" strokeWidth={1.5} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300/30 via-purple-300/30 to-blue-300/30 blur-xl"
        />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-purple-900"
      >
        SkinSense
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-2 text-purple-600/80"
      >
        Your AI Skincare Companion
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-2 h-2 rounded-full bg-purple-400"
          />
        ))}
      </motion.div>
    </div>
  );
}
