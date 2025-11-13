import { motion } from 'motion/react';
import { TrendingUp, Camera, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { week: 'Week 1', hydration: 65, clarity: 58, texture: 60 },
  { week: 'Week 2', hydration: 68, clarity: 62, texture: 63 },
  { week: 'Week 3', hydration: 72, clarity: 68, texture: 67 },
  { week: 'Week 4', hydration: 75, clarity: 72, texture: 70 },
  { week: 'Week 5', hydration: 78, clarity: 75, texture: 73 },
  { week: 'Week 6', hydration: 82, clarity: 80, texture: 78 },
];

const improvements = [
  { metric: 'Fine Lines', change: -12 },
  { metric: 'Hydration', change: +26 },
  { metric: 'Skin Texture', change: +30 },
  { metric: 'Dark Spots', change: -18 },
];

export default function ProgressSection() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-purple-900 mb-4">Track Your Skin Journey</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Monitor your improvements over time with AI-powered insights and visual progress tracking
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="relative bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-xl rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-300/20 via-blue-300/20 to-green-300/20"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-white/60 backdrop-blur flex items-center justify-center shadow-md"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </motion.div>
                <div>
                  <h3 className="text-green-900">Overall Progress</h3>
                  <p className="text-green-700/70">Last 6 weeks</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {improvements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative bg-white/60 backdrop-blur rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <p className="relative z-10 text-green-700/80 mb-2">{item.metric}</p>
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <motion.span 
                        className={`${
                          item.change > 0 ? 'text-green-700' : 'text-blue-700'
                        }`}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </motion.span>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 text-green-600" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-xl rounded-3xl p-8 h-full">
              <h3 className="text-purple-900 mb-6">Skin Health Trends</h3>
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
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-xl rounded-3xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-purple-900 mb-2">Ready to Start Your Journey?</h3>
                <p className="text-purple-700/80">
                  Upload your first progress photo and let AI track your skin improvements over time
                </p>
              </div>
              <Button
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-8 py-6 shadow-lg"
              >
                <Camera className="mr-2 w-5 h-5" />
                Upload Progress Photo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
