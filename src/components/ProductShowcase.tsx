import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { addToCart, type Product } from '../services/skincare-ai';
import { toast } from 'sonner@2.0.3';

const products = [
  {
    name: 'Hyaluronic Acid 2% + B5',
    brand: 'The Ordinary',
    category: 'Serum',
    price: '₹649',
    rating: 4.8,
    reviews: 2340,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Hydration', 'All Skin Types'],
    skinTypes: ['Dry', 'Combination', 'Normal'],
  },
  {
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Serum',
    price: '₹599',
    rating: 4.7,
    reviews: 3120,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Oil Control', 'Pore Refining'],
    skinTypes: ['Oily', 'Combination', 'Acne-Prone'],
  },
  {
    name: 'Gentle Skin Cleanser',
    brand: 'Cetaphil',
    category: 'Cleanser',
    price: '₹899',
    rating: 4.9,
    reviews: 5670,
    image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Gentle', 'Sensitive Skin'],
    skinTypes: ['All Skin Types'],
  },
  {
    name: 'Hydro Boost Water Gel',
    brand: 'Neutrogena',
    category: 'Moisturizer',
    price: '₹1,299',
    rating: 4.6,
    reviews: 1890,
    image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Hydration', 'Oil-Free'],
    skinTypes: ['Dry', 'Combination', 'Normal'],
  },
  {
    name: 'Vitamin C Face Serum',
    brand: 'Minimalist',
    category: 'Serum',
    price: '₹699',
    rating: 4.5,
    reviews: 2450,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Brightening', 'Anti-Aging'],
    skinTypes: ['All Skin Types'],
  },
  {
    name: 'Ultra Light Gel Sunscreen SPF 50',
    brand: 'Minimalist',
    category: 'Sunscreen',
    price: '₹549',
    rating: 4.8,
    reviews: 4230,
    image: 'https://images.unsplash.com/photo-1543364148-c43c4e908f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBzdW1tZXJ8ZW58MXx8fHwxNzYwMjYxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['SPF 50', 'PA++++'],
    skinTypes: ['All Skin Types'],
  },
  {
    name: 'Green Tea Day-Light Gel SPF 35',
    brand: 'Plum',
    category: 'Sunscreen',
    price: '₹495',
    rating: 4.7,
    reviews: 3890,
    image: 'https://images.unsplash.com/photo-1543364148-c43c4e908f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBzdW1tZXJ8ZW58MXx8fHwxNzYwMjYxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Green Tea', 'Vegan'],
    skinTypes: ['Oily', 'Combination'],
  },
  {
    name: 'Retinol 0.5% in Squalane',
    brand: 'The Ordinary',
    category: 'Serum',
    price: '₹1,099',
    rating: 4.6,
    reviews: 1560,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Anti-Aging', 'Night Care'],
    skinTypes: ['Normal', 'Combination', 'Mature'],
  },
  {
    name: 'Salicylic Acid 2% Solution',
    brand: 'The Ordinary',
    category: 'Treatment',
    price: '₹579',
    rating: 4.5,
    reviews: 2780,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Acne', 'Exfoliating'],
    skinTypes: ['Oily', 'Acne-Prone'],
  },
  {
    name: 'Ceramide Moisturizing Cream',
    brand: 'CeraVe',
    category: 'Moisturizer',
    price: '₹1,549',
    rating: 4.9,
    reviews: 6740,
    image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Barrier Repair', 'Fragrance-Free'],
    skinTypes: ['Dry', 'Sensitive'],
  },
  {
    name: 'Alpha Arbutin 2% + HA',
    brand: 'Minimalist',
    category: 'Serum',
    price: '₹649',
    rating: 4.6,
    reviews: 1920,
    image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Pigmentation', 'Brightening'],
    skinTypes: ['All Skin Types'],
  },
  {
    name: 'Tea Tree Anti-Dandruff Shampoo',
    brand: 'Plum',
    category: 'Hair Care',
    price: '₹449',
    rating: 4.4,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Scalp Care', 'SLS-Free'],
    skinTypes: ['All Hair Types'],
  },
];

const categories = ['All', 'Serum', 'Moisturizer', 'Cleanser', 'Sunscreen', 'Treatment'];

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedProducts, setSavedProducts] = useState<Set<number>>(new Set());

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
    <div className="py-20 px-6 bg-white/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-purple-900 mb-4">Curated Skincare Products</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Shop from top skincare brands with products verified by dermatologists and AI-matched to your skin type
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`rounded-full ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                  : 'border-2 border-purple-300 hover:bg-purple-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group relative">
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:to-purple-400/10 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.button
                    onClick={() => toggleSave(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  >
                    <motion.div
                      animate={savedProducts.has(index) ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          savedProducts.has(index)
                            ? 'fill-pink-500 text-pink-500'
                            : 'text-purple-400'
                        }`}
                      />
                    </motion.div>
                  </motion.button>
                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-purple-600 text-white border-0 shadow-lg">
                      {product.category}
                    </Badge>
                  </motion.div>
                </div>

                <div className="p-5">
                  <p className="text-purple-600/70 mb-1">{product.brand}</p>
                  <h4 className="text-purple-900 mb-3">{product.name}</h4>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-purple-900">{product.rating}</span>
                    </div>
                    <span className="text-purple-600/70">({product.reviews})</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.slice(0, 2).map((tag, i) => (
                      <Badge
                        key={i}
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-900">{product.price}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-2 border-purple-300 hover:bg-purple-50 rounded-full px-8 py-6"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
