import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Camera, Scan, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Screen } from '../App';

interface ProductScannerScreenProps {
  onNavigate: (screen: Screen) => void;
}

const mockScanResult = {
  name: 'Vitamin C Brightening Serum',
  brand: 'GlowLab',
  compatibility: 78,
  ingredients: [
    { name: 'Vitamin C', status: 'good' },
    { name: 'Hyaluronic Acid', status: 'good' },
    { name: 'Glycerin', status: 'good' },
    { name: 'Fragrance', status: 'warning' },
    { name: 'Parabens', status: 'bad' },
  ],
  warnings: [
    'Contains parabens - may cause irritation for sensitive skin',
    'Fragrance may trigger allergic reactions',
  ],
  recommendation: 'Moderate match for your skin type. Consider alternatives without parabens.',
};

export default function ProductScannerScreen({ onNavigate }: ProductScannerScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 2500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'bad':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'from-green-50 to-blue-50';
      case 'warning':
        return 'from-yellow-50 to-orange-50';
      case 'bad':
        return 'from-red-50 to-pink-50';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-50/50 to-blue-50/50 pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h2 className="text-purple-900">Product Scanner</h2>
            <p className="text-purple-600/70">Check ingredient compatibility</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-0 shadow-lg rounded-3xl p-8 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                
                <div className="relative">
                  <div className="aspect-square max-w-xs mx-auto mb-6 rounded-3xl border-4 border-dashed border-purple-300 flex items-center justify-center bg-white/40 backdrop-blur overflow-hidden">
                    {!isScanning ? (
                      <div className="text-center p-8">
                        <Scan className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                        <p className="text-purple-600">Position barcode here</p>
                        <p className="text-purple-500/70 mt-2">
                          or scan product label
                        </p>
                      </div>
                    ) : (
                      <motion.div
                        className="w-full h-full flex items-center justify-center bg-white/60"
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ 
                              scaleX: [1, 0.8, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-48 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-4"
                          />
                          <p className="text-purple-900">Scanning product...</p>
                          <p className="text-purple-600/70 mt-1">Analyzing ingredients</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>

              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white rounded-2xl py-6 shadow-lg"
              >
                <Camera className="mr-2 w-5 h-5" />
                {isScanning ? 'Scanning...' : 'Scan Product'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-white border-0 shadow-lg rounded-3xl p-6 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-purple-900 mb-1">{mockScanResult.name}</h3>
                    <p className="text-purple-600/70">{mockScanResult.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-900 mb-1">{mockScanResult.compatibility}%</div>
                    <p className="text-purple-600/70">Match</p>
                  </div>
                </div>

                <div className="h-3 bg-purple-100 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mockScanResult.compatibility}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${
                      mockScanResult.compatibility > 80
                        ? 'bg-gradient-to-r from-green-400 to-blue-400'
                        : mockScanResult.compatibility > 60
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                        : 'bg-gradient-to-r from-red-400 to-pink-400'
                    }`}
                  />
                </div>

                <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-0">
                  {mockScanResult.compatibility > 80
                    ? 'Highly Compatible'
                    : mockScanResult.compatibility > 60
                    ? 'Moderately Compatible'
                    : 'Low Compatibility'}
                </Badge>
              </Card>

              <div className="mb-4">
                <h4 className="text-purple-900 mb-3">Ingredients Analysis</h4>
                <div className="space-y-2">
                  {mockScanResult.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className={`bg-gradient-to-br ${getStatusColor(ingredient.status)} border-0 shadow-sm rounded-2xl p-4`}>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-800">{ingredient.name}</span>
                          {getStatusIcon(ingredient.status)}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {mockScanResult.warnings.length > 0 && (
                <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-0 shadow-lg rounded-2xl p-5 mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-orange-700 flex-shrink-0 mt-0.5" />
                    <h4 className="text-orange-900">Warnings</h4>
                  </div>
                  <ul className="space-y-2">
                    {mockScanResult.warnings.map((warning, index) => (
                      <li key={index} className="text-orange-800/80 flex gap-2">
                        <span>•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-0 shadow-lg rounded-2xl p-5 mb-6">
                <h4 className="text-purple-900 mb-2">💡 Recommendation</h4>
                <p className="text-purple-700/80">{mockScanResult.recommendation}</p>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setIsScanning(false);
                  }}
                  variant="outline"
                  className="border-2 border-purple-300 hover:bg-purple-50 rounded-2xl py-6"
                >
                  Scan Another
                </Button>
                <Button
                  onClick={() => onNavigate('recommendations')}
                  className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white rounded-2xl py-6 shadow-lg"
                >
                  View Better Options
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
