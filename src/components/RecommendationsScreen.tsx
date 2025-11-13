import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, ShoppingCart, Leaf, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Screen } from '../App';

interface RecommendationsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const products = [
  {
    name: 'Hydrating Face Serum',
    category: 'Serum',
    compatibility: 95,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Best for dry skin',
    price: '$45',
  },
  {
    name: 'Gentle Daily Cleanser',
    category: 'Cleanser',
    compatibility: 92,
    image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'pH balanced',
    price: '$28',
  },
  {
    name: 'SPF 50+ Sunscreen',
    category: 'Sunscreen',
    compatibility: 98,
    image: 'https://images.unsplash.com/photo-1543364148-c43c4e908f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBzdW1tZXJ8ZW58MXx8fHwxNzYwMjYxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Essential daily',
    price: '$32',
  },
  {
    name: 'Nourishing Night Cream',
    category: 'Moisturizer',
    compatibility: 88,
    image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Best for oily skin',
    price: '$52',
  },
];

const naturalRemedies = [
  {
    name: 'Honey & Turmeric Mask',
    benefits: 'Brightens and soothes inflammation',
    ingredients: 'Organic honey, turmeric powder',
  },
  {
    name: 'Aloe Vera Gel',
    benefits: 'Hydrates and calms irritated skin',
    ingredients: 'Pure aloe vera extract',
  },
  {
    name: 'Green Tea Toner',
    benefits: 'Reduces oil and tightens pores',
    ingredients: 'Green tea, witch hazel',
  },
];

export default function RecommendationsScreen({ onNavigate }: RecommendationsScreenProps) {
  const [savedProducts, setSavedProducts] = useState<Set<number>>(new Set());

  const toggleSave = (index: number) => {
    const newSaved = new Set(savedProducts);
    if (newSaved.has(index)) {
      newSaved.delete(index);
    } else {
      newSaved.add(index);
    }
    setSavedProducts(newSaved);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-pink-50/50 to-purple-50/50 pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <div>
            <h2 className="text-purple-900">Your Personalized Routine</h2>
            <p className="text-purple-600/70">Curated just for you</p>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur rounded-2xl p-1 mb-6">
            <TabsTrigger value="products" className="rounded-xl">
              <Sparkles className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="natural" className="rounded-xl">
              <Leaf className="w-4 h-4 mr-2" />
              Natural Remedies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-purple-900 mb-1">{product.name}</h3>
                          <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0">
                            {product.tag}
                          </Badge>
                        </div>
                        <button
                          onClick={() => toggleSave(index)}
                          className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              savedProducts.has(index)
                                ? 'fill-pink-500 text-pink-500'
                                : 'text-purple-400'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 h-2 bg-purple-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${product.compatibility}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                          />
                        </div>
                        <span className="text-purple-600">{product.compatibility}%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-purple-900">{product.price}</span>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="natural" className="space-y-4">
            {naturalRemedies.map((remedy, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg rounded-3xl p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-green-900 mb-1">{remedy.name}</h3>
                      <p className="text-green-700/70">{remedy.benefits}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur rounded-2xl p-3 mt-3">
                    <p className="text-green-800">
                      <span className="opacity-70">Ingredients: </span>
                      {remedy.ingredients}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}

            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl p-6 mt-6">
              <p className="text-purple-700 text-center">
                💡 Always do a patch test before trying new remedies
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
