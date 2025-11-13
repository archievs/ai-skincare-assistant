import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Camera, Sparkles, Activity, Droplets, Flame, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { analyzeSkinImage, type SkinAnalysis } from '../services/skincare-ai';

export default function AIScanSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      const result = await analyzeSkinImage(selectedImage);
      setAnalysis(result);
      setAnalysisProgress(100);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return 'text-red-600 bg-red-100';
    if (severity >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity >= 80) return 'High';
    if (severity >= 60) return 'Moderate';
    return 'Mild';
  };

  return (
    <div id="ai-scan" className="py-20 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-purple-900 mb-4">AI Skin Analysis Scanner</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Upload a selfie and our AI will analyze your skin in seconds, detecting concerns and providing personalized recommendations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-xl rounded-3xl p-8 h-full">
              <h3 className="text-purple-900 mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-purple-600" />
                Upload Your Photo
              </h3>

              <div className="space-y-6">
                {!selectedImage ? (
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-purple-300 rounded-2xl p-12 hover:border-purple-400 hover:bg-purple-50/50 transition-all">
                      <div className="text-center">
                        <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                        <p className="text-purple-900 mb-2">Click to upload or drag and drop</p>
                        <p className="text-purple-600/70">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full h-64 object-cover"
                      />
                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalysis(null);
                        }}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white transition-all shadow-lg"
                      >
                        ✕
                      </button>
                    </div>

                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6"
                    >
                      {isAnalyzing ? (
                        <>
                          <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Analyze My Skin
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="space-y-2">
                    <Progress value={analysisProgress} className="h-2" />
                    <p className="text-purple-600 text-center">
                      AI is analyzing your skin... {analysisProgress}%
                    </p>
                  </div>
                )}

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-purple-800 flex items-start gap-2">
                    <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Your privacy matters. Images are analyzed locally and not stored on our servers.</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-xl rounded-3xl p-8 h-full">
              <h3 className="text-purple-900 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-600" />
                Analysis Results
              </h3>

              <AnimatePresence mode="wait">
                {!analysis ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-purple-400"
                  >
                    <Sparkles className="w-16 h-16 mb-4" />
                    <p>Upload a photo to see AI analysis</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Confidence Score */}
                    <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-900">Analysis Confidence</span>
                        <span className="text-green-600">{analysis.confidence}%</span>
                      </div>
                      <Progress value={analysis.confidence} className="h-2" />
                    </div>

                    {/* Skin Type */}
                    <div>
                      <p className="text-purple-600/70 mb-2">Detected Skin Type</p>
                      <div className="bg-purple-100 rounded-xl p-4">
                        <p className="text-purple-900">{analysis.skinType}</p>
                      </div>
                    </div>

                    {/* Skin Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="w-5 h-5 text-blue-600" />
                          <span className="text-blue-900">Hydration</span>
                        </div>
                        <p className="text-blue-600">{analysis.hydration}%</p>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Flame className="w-5 h-5 text-orange-600" />
                          <span className="text-orange-900">Oiliness</span>
                        </div>
                        <p className="text-orange-600">{analysis.oiliness}%</p>
                      </div>
                    </div>

                    {/* Main Concerns */}
                    <div>
                      <p className="text-purple-600/70 mb-3">Detected Concerns</p>
                      <div className="space-y-2">
                        {analysis.concerns.map((concern) => (
                          <div
                            key={concern}
                            className="flex items-center justify-between bg-purple-50 rounded-xl p-3"
                          >
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-purple-600" />
                              <span className="text-purple-900">{concern}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full ${getSeverityColor(analysis.severity[concern] || 0)}`}>
                              {getSeverityLabel(analysis.severity[concern] || 0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <p className="text-purple-600/70 mb-3">AI Recommendations</p>
                      <div className="space-y-2">
                        {analysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 text-purple-800">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        const quizSection = document.getElementById('quiz');
                        if (quizSection) {
                          quizSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl py-4"
                    >
                      Get Personalized Products
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
