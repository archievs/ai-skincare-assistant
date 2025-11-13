import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Sparkles, Droplets, Wind, Zap, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

const skinMetrics = [
  { label: 'Hydration', value: 72, icon: Droplets, color: 'blue' },
  { label: 'Oil Control', value: 85, icon: Wind, color: 'pink' },
  { label: 'Acne Risk', value: 45, icon: Zap, color: 'purple' },
  { label: 'Sun Damage', value: 38, icon: Sun, color: 'orange' },
];

export default function ScanSection() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="py-20 px-6 bg-white/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-purple-900 mb-4">AI Facial Skin Analysis</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Upload a selfie and let our advanced AI analyze your skin in seconds
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Card className="relative bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-xl rounded-3xl p-12 overflow-hidden group">
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-pink-300/30"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  <div className="relative">
                    <motion.div 
                      className="w-full aspect-square max-w-md mx-auto rounded-3xl border-4 border-dashed border-purple-300 flex items-center justify-center bg-white/40 backdrop-blur"
                      animate={{
                        borderColor: ['#d8b4fe', '#f0abfc', '#d8b4fe']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {!isScanning ? (
                        <div className="text-center p-8">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Camera className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                          </motion.div>
                          <motion.p 
                            className="text-purple-700 mb-2"
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Position your face here
                          </motion.p>
                          <p className="text-purple-600/70">
                            Make sure your face is well-lit
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"
                          />
                          <p className="text-purple-900">Analyzing your skin...</p>
                          <p className="text-purple-600/70 mt-2">This may take a few seconds</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleScan}
                      disabled={isScanning}
                      className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Camera className="mr-2 w-5 h-5" />
                      Take Photo
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleScan}
                      disabled={isScanning}
                      variant="outline"
                      className="w-full border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 rounded-2xl py-6 hover:shadow-lg transition-all"
                    >
                      <Upload className="mr-2 w-5 h-5" />
                      Upload
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-lg rounded-3xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-green-900">Analysis Complete!</h3>
                      <p className="text-green-700/70">Here are your results</p>
                    </div>
                  </div>
                </Card>

                {skinMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white border-0 shadow-lg rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-full bg-${metric.color}-100 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-purple-900">{metric.label}</span>
                              <span className="text-purple-600">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                          </div>
                        </div>
                        <p className="text-purple-600/70 ml-15">
                          {metric.value > 70 ? 'Good condition' : metric.value > 50 ? 'Moderate' : 'Needs attention'}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}

                <Button
                  onClick={() => {
                    setShowResults(false);
                    setIsScanning(false);
                  }}
                  variant="outline"
                  className="w-full border-2 border-purple-300 hover:bg-purple-50 rounded-2xl py-6 mt-4"
                >
                  Scan Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-purple-900 mb-6">What We Analyze</h3>
            
            <div className="space-y-4">
              <Card className="bg-white border-0 shadow-md rounded-2xl p-6">
                <h4 className="text-purple-900 mb-2">Skin Texture & Tone</h4>
                <p className="text-purple-600/70">
                  Detect smoothness, evenness, and overall skin quality
                </p>
              </Card>

              <Card className="bg-white border-0 shadow-md rounded-2xl p-6">
                <h4 className="text-purple-900 mb-2">Problem Areas</h4>
                <p className="text-purple-600/70">
                  Identify acne, dark spots, fine lines, and other concerns
                </p>
              </Card>

              <Card className="bg-white border-0 shadow-md rounded-2xl p-6">
                <h4 className="text-purple-900 mb-2">Hydration Levels</h4>
                <p className="text-purple-600/70">
                  Measure moisture content and recommend hydration products
                </p>
              </Card>

              <Card className="bg-white border-0 shadow-md rounded-2xl p-6">
                <h4 className="text-purple-900 mb-2">Environmental Damage</h4>
                <p className="text-purple-600/70">
                  Assess sun damage, pollution effects, and aging signs
                </p>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-2xl p-6">
              <p className="text-purple-700">
                💡 <strong>Tip:</strong> For best results, take your photo in natural lighting with a clean face
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
