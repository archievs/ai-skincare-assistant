import { motion } from 'motion/react';
import { Camera, Sparkles, TrendingUp, ShoppingBag, FlaskConical, Sun } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: Camera,
    title: 'AI Facial Analysis',
    description: 'Advanced AI technology analyzes your skin to identify concerns like acne, dryness, and aging signs.',
    gradient: 'from-pink-100 to-purple-100',
  },
  {
    icon: Sparkles,
    title: 'Personalized Recommendations',
    description: 'Get curated product suggestions from top brands tailored to your unique skin type and concerns.',
    gradient: 'from-purple-100 to-blue-100',
  },
  {
    icon: FlaskConical,
    title: 'Ingredient Scanner',
    description: 'Scan any product to check ingredient compatibility and get instant safety ratings for your skin.',
    gradient: 'from-blue-100 to-pink-100',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your skin improvement journey with AI-powered insights and visual comparisons.',
    gradient: 'from-pink-100 to-orange-100',
  },
  {
    icon: Sun,
    title: 'UV Protection Alerts',
    description: 'Real-time UV index updates and smart sunscreen reminders to keep your skin protected.',
    gradient: 'from-orange-100 to-yellow-100',
  },
  {
    icon: ShoppingBag,
    title: 'Shop with Confidence',
    description: 'Browse 500+ verified skincare products with honest reviews and compatibility scores.',
    gradient: 'from-purple-100 to-pink-100',
  },
];

export default function Features() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-purple-900 mb-4">Why Choose SkinSense?</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Harness the power of AI to transform your skincare routine with personalized insights and expert recommendations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className={`relative overflow-hidden bg-gradient-to-br ${feature.gradient} border-0 shadow-lg rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 group`}>
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div 
                  className="relative w-14 h-14 rounded-2xl bg-white/60 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </motion.div>
                <h3 className="relative text-purple-900 mb-3">{feature.title}</h3>
                <p className="relative text-purple-700/80">{feature.description}</p>
                
                {/* Corner accent */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
