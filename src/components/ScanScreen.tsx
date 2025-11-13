import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, ArrowLeft, Sparkles, Droplets, Wind, Zap, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import type { Screen } from '../App';

interface ScanScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function ScanScreen({ onNavigate }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 3000);
  };

  const skinAnalysis = [
    { label: 'Hydration', value: 72, icon: Droplets, color: 'blue' },
    { label: 'Oil Control', value: 85, icon: Wind, color: 'pink' },
    { label: 'Acne Risk', value: 45, icon: Zap, color: 'purple' },
    { label: 'Sun Damage', value: 38, icon: Sun, color: 'orange' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-50/50 to-pink-50/50 pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h2 className="text-purple-900">AI Facial Scan</h2>
            <p className="text-purple-600/70">Analyze your skin</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="scan-input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl p-8 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                
                <div className="relative">
                  <div className="w-64 h-64 mx-auto mb-6 rounded-full border-4 border-dashed border-purple-300 flex items-center justify-center bg-white/40 backdrop-blur">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-purple-400 mx-auto mb-3" />
                      <p className="text-purple-600">Position your face here</p>
                    </div>
                  </div>

                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur rounded-3xl"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-purple-900">Analyzing your skin...</p>
                        <p className="text-purple-600/70 mt-1">This may take a few seconds</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6 shadow-lg"
                >
                  <Camera className="mr-2 w-5 h-5" />
                  Take Photo
                </Button>
                
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  variant="outline"
                  className="border-2 border-purple-300 hover:bg-purple-50 rounded-2xl py-6"
                >
                  <Upload className="mr-2 w-5 h-5 text-purple-600" />
                  Upload
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scan-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-lg rounded-3xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-green-900">Analysis Complete!</h3>
                    <p className="text-green-700/70">Here are your results</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                {skinAnalysis.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white border-0 shadow-md rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${item.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-purple-900">{item.label}</span>
                              <span className="text-purple-600">{item.value}%</span>
                            </div>
                            <Progress value={item.value} className="h-2" />
                          </div>
                        </div>
                        <p className="text-purple-600/70 ml-13">
                          {item.value > 70 ? 'Good condition' : item.value > 50 ? 'Moderate' : 'Needs attention'}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <Button
                onClick={() => onNavigate('recommendations')}
                className="w-full mt-6 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6 shadow-lg"
              >
                View Product Recommendations
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
