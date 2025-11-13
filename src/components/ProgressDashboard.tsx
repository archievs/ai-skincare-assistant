import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Camera, Calendar, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Screen } from '../App';

interface ProgressDashboardProps {
  onNavigate: (screen: Screen) => void;
}

const progressData = [
  { week: 'Week 1', hydration: 65, clarity: 58, texture: 60 },
  { week: 'Week 2', hydration: 68, clarity: 62, texture: 63 },
  { week: 'Week 3', hydration: 72, clarity: 68, texture: 67 },
  { week: 'Week 4', hydration: 75, clarity: 72, texture: 70 },
  { week: 'Week 5', hydration: 78, clarity: 75, texture: 73 },
  { week: 'Week 6', hydration: 82, clarity: 80, texture: 78 },
];

const improvements = [
  { metric: 'Wrinkles', change: -12, icon: Sparkles },
  { metric: 'Hydration', change: +26, icon: Sparkles },
  { metric: 'Skin Texture', change: +30, icon: Sparkles },
  { metric: 'Dark Spots', change: -18, icon: Sparkles },
];

export default function ProgressDashboard({ onNavigate }: ProgressDashboardProps) {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-blue-50/50 to-purple-50/50 pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h2 className="text-purple-900">Your Skin Journey</h2>
            <p className="text-purple-600/70">Track your improvements</p>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-lg rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-900">Overall Progress</h3>
                <p className="text-green-700/70">Last 6 weeks</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {improvements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur rounded-2xl p-4"
                >
                  <p className="text-green-700/80 mb-1">{item.metric}</p>
                  <div className="flex items-center gap-2">
                    <span className={`${
                      item.change > 0 ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                    <item.icon className="w-4 h-4 text-green-600" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-purple-900 mb-4">Skin Health Trends</h3>
          <Card className="bg-white border-0 shadow-lg rounded-3xl p-6">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
                <XAxis 
                  dataKey="week" 
                  stroke="#a78bfa"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#a78bfa"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hydration" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  name="Hydration"
                />
                <Line 
                  type="monotone" 
                  dataKey="clarity" 
                  stroke="#ec4899" 
                  strokeWidth={2}
                  dot={{ fill: '#ec4899', r: 4 }}
                  name="Clarity"
                />
                <Line 
                  type="monotone" 
                  dataKey="texture" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="Texture"
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-purple-700">Hydration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-purple-700">Clarity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-purple-700">Texture</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-purple-900 mb-4">Progress Photos</h3>
          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl p-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-purple-700">Week {i * 2}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-5 shadow-lg"
            >
              <Camera className="mr-2 w-5 h-5" />
              Upload New Photo
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-lg rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-purple-900 mb-2">AI Insight</h4>
                <p className="text-purple-700/80">
                  Your consistency is paying off! Keep following your routine and you'll see even better results. Your hydration levels have improved significantly since starting.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
