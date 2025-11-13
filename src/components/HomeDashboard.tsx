import { motion } from 'motion/react';
import { Sun, Droplets, Wind, Clock, ChevronRight, Camera, FlaskConical } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen } from '../App';

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void;
}

const skinProducts = [
  {
    name: 'Hydrating Serum',
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Night Cream',
    image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'UV Protector',
    image: 'https://images.unsplash.com/photo-1543364148-c43c4e908f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBzdW1tZXJ8ZW58MXx8fHwxNzYwMjYxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Gentle Cleanser',
    image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-pink-50/50 to-purple-50/50 pb-24">
      <div className="p-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <h2 className="text-purple-900">Hi, Archita 🌸</h2>
          <p className="text-purple-600/70 mt-1">Let's check on your skin today</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl p-6 mb-4 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => onNavigate('scan')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-purple-900">AI Analysis Results</h3>
                  <p className="text-purple-600/70">Last scan: 2 days ago</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 backdrop-blur rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-purple-700">Hydration</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-purple-900 mt-1">72%</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur rounded-2xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-pink-500" />
                  <span className="text-purple-700">Oil Control</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-purple-900 mt-1">85%</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="bg-gradient-to-br from-orange-100 to-yellow-100 border-0 shadow-lg rounded-3xl p-6 mb-4 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => onNavigate('sunscreen')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                  <Sun className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-orange-900">Sunscreen Reminder</h3>
                  <p className="text-orange-700/70">UV Index: 7 (High)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-orange-900">2 hrs</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-900">Your Current Products</h3>
            <button 
              onClick={() => onNavigate('recommendations')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {skinProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex-shrink-0"
              >
                <Card className="w-32 bg-white border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 relative">
                    <ImageWithFallback 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-purple-900 text-center">{product.name}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card 
            className="bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-lg rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => onNavigate('quiz')}
          >
            <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur flex items-center justify-center mb-3">
              <FlaskConical className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-blue-900 mb-1">Skin Quiz</h4>
            <p className="text-blue-700/70">Update your profile</p>
          </Card>

          <Card 
            className="bg-gradient-to-br from-pink-100 to-purple-100 border-0 shadow-lg rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => onNavigate('progress')}
          >
            <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur flex items-center justify-center mb-3">
              <ChevronRight className="w-5 h-5 text-pink-600" />
            </div>
            <h4 className="text-pink-900 mb-1">Progress</h4>
            <p className="text-pink-700/70">Track your glow</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
