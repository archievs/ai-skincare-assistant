import { motion } from 'motion/react';
import { Sun, Moon, Droplets, Sparkles, Shield, Star, ShoppingCart, Heart, Leaf, Clock, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { addToCart, type Product } from '../services/skincare-ai';
import { toast } from 'sonner@2.0.3';

interface RoutineSectionProps {
  skinType?: string;
  concerns?: string[];
  onCartUpdate?: () => void;
}

const morningRoutine = [
  {
    step: 1,
    name: 'Cleanser',
    time: 'Morning',
    products: [
      {
        name: 'Gentle Skin Cleanser',
        brand: 'Cetaphil',
        price: '₹899',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'pH balanced, gentle formula for all skin types',
      },
      {
        name: 'Foaming Facial Cleanser',
        brand: 'CeraVe',
        price: '₹749',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'With ceramides to maintain skin barrier',
      },
    ],
    instructions: 'Wet your face with lukewarm water and massage cleanser in circular motions for 60 seconds. Rinse thoroughly and pat dry.',
    icon: Droplets,
  },
  {
    step: 2,
    name: 'Toner/Essence',
    time: 'Morning',
    products: [
      {
        name: 'Glycolic Acid 7% Toning Solution',
        brand: 'The Ordinary',
        price: '₹649',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Exfoliating toner for brighter, smoother skin',
      },
    ],
    instructions: 'Apply to a cotton pad and sweep across face, or pat directly into skin with hands. Avoid eye area.',
    icon: Sparkles,
    optional: true,
  },
  {
    step: 3,
    name: 'Serum',
    time: 'Morning',
    products: [
      {
        name: 'Vitamin C Face Serum',
        brand: 'Minimalist',
        price: '₹699',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Brightening and antioxidant protection',
      },
      {
        name: 'Niacinamide 10% + Zinc 1%',
        brand: 'The Ordinary',
        price: '₹599',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Reduces pores and controls oil',
      },
    ],
    instructions: 'Apply 3-4 drops to face and neck. Gently press into skin until absorbed. Wait 1-2 minutes before next step.',
    icon: Sparkles,
  },
  {
    step: 4,
    name: 'Moisturizer',
    time: 'Morning',
    products: [
      {
        name: 'Hydro Boost Water Gel',
        brand: 'Neutrogena',
        price: '₹1,299',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Oil-free hydration for all skin types',
      },
      {
        name: 'Hyaluronic Acid 2% + B5',
        brand: 'The Ordinary',
        price: '₹649',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Deep hydration and plumping',
      },
    ],
    instructions: 'Apply a nickel-sized amount to face and neck while skin is still slightly damp. Massage in upward motions.',
    icon: Droplets,
  },
  {
    step: 5,
    name: 'Sunscreen',
    time: 'Morning',
    products: [
      {
        name: 'Ultra Light Gel Sunscreen SPF 50',
        brand: 'Minimalist',
        price: '₹549',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1543364148-c43c4e908f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBzdW1tZXJ8ZW58MXx8fHwxNzYwMjYxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Broad spectrum, PA++++, non-greasy',
      },
      {
        name: 'Green Tea Day-Light Gel SPF 35',
        brand: 'Plum',
        price: '₹495',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1543364148-c43c4e908f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjBib3R0bGUlMjBzdW1tZXJ8ZW58MXx8fHwxNzYwMjYxMzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Vegan, with green tea antioxidants',
      },
    ],
    instructions: 'Apply generously 15 minutes before sun exposure. Reapply every 2 hours and after swimming or sweating.',
    icon: Shield,
    important: true,
  },
];

const naturalRemedies = [
  {
    name: 'Honey & Turmeric Face Mask',
    category: 'Brightening & Anti-Inflammatory',
    timeOfDay: 'Evening',
    frequency: '2-3 times per week',
    duration: '15-20 minutes',
    skinTypes: ['All Skin Types', 'Acne-Prone', 'Dull Skin'],
    ingredients: [
      '1 tablespoon raw honey',
      '½ teaspoon turmeric powder',
      '1 teaspoon yogurt (optional, for extra brightness)',
    ],
    benefits: [
      'Brightens skin and reduces dark spots',
      'Anti-inflammatory properties reduce acne',
      'Natural antibacterial action',
      'Hydrates and softens skin',
    ],
    instructions: [
      'Mix honey and turmeric in a small bowl until well combined',
      'Add yogurt if using and mix thoroughly',
      'Apply evenly to clean, dry face avoiding eye area',
      'Leave on for 15-20 minutes',
      'Rinse with lukewarm water and pat dry',
      'Follow with your regular moisturizer',
    ],
    precautions: 'May temporarily stain skin yellow - use less turmeric if concerned. Patch test first.',
    icon: Sparkles,
    gradient: 'from-yellow-100 to-orange-100',
  },
  {
    name: 'Aloe Vera & Rose Water Toner',
    category: 'Hydrating & Soothing',
    timeOfDay: 'Morning & Evening',
    frequency: 'Daily',
    duration: '1 minute',
    skinTypes: ['Sensitive', 'Dry', 'Irritated'],
    ingredients: [
      '2 tablespoons pure aloe vera gel',
      '3 tablespoons rose water',
      '3 drops tea tree oil (optional, for acne)',
    ],
    benefits: [
      'Deeply hydrates and calms skin',
      'Reduces redness and inflammation',
      'Balances skin pH',
      'Tightens pores naturally',
    ],
    instructions: [
      'Mix aloe vera gel and rose water in a clean bottle',
      'Add tea tree oil if using for acne-prone skin',
      'Shake well before each use',
      'Apply to face with cotton pad or spray bottle',
      'Use after cleansing, before serums',
      'Store in refrigerator for up to 1 week',
    ],
    precautions: 'Use pure aloe vera gel, not the colored varieties. Keep refrigerated.',
    icon: Droplets,
    gradient: 'from-green-100 to-blue-100',
  },
  {
    name: 'Green Tea & Witch Hazel Toner',
    category: 'Oil Control & Pore Minimizing',
    timeOfDay: 'Morning & Evening',
    frequency: 'Daily',
    duration: '2 minutes',
    skinTypes: ['Oily', 'Combination', 'Acne-Prone'],
    ingredients: [
      '1 green tea bag (or 1 tbsp loose leaf)',
      '½ cup hot water',
      '2 tablespoons witch hazel',
      '1 drop peppermint oil (optional)',
    ],
    benefits: [
      'Controls excess oil production',
      'Tightens and minimizes pores',
      'Rich in antioxidants',
      'Reduces acne and inflammation',
    ],
    instructions: [
      'Steep green tea in hot water for 10 minutes',
      'Let it cool completely to room temperature',
      'Mix cooled tea with witch hazel',
      'Add peppermint oil if desired',
      'Pour into a clean spray bottle',
      'Apply with cotton pad or spray on face after cleansing',
      'Store in refrigerator for up to 5 days',
    ],
    precautions: 'Always use cooled tea. Witch hazel can be drying - reduce amount if needed.',
    icon: Leaf,
    gradient: 'from-green-100 to-teal-100',
  },
  {
    name: 'Oatmeal & Honey Gentle Exfoliator',
    category: 'Exfoliating & Soothing',
    timeOfDay: 'Evening',
    frequency: '1-2 times per week',
    duration: '10 minutes',
    skinTypes: ['Sensitive', 'Dry', 'Normal'],
    ingredients: [
      '2 tablespoons ground oatmeal',
      '1 tablespoon honey',
      '1 tablespoon milk or yogurt',
    ],
    benefits: [
      'Gentle physical exfoliation',
      'Removes dead skin cells',
      'Soothes irritated skin',
      'Provides deep hydration',
    ],
    instructions: [
      'Grind oatmeal into fine powder in blender',
      'Mix with honey and milk to form paste',
      'Apply to damp face in gentle circular motions',
      'Massage for 2-3 minutes',
      'Leave on for additional 5-7 minutes',
      'Rinse with lukewarm water',
    ],
    precautions: 'Be gentle - don\'t scrub too hard. Avoid if you have active breakouts.',
    icon: Sparkles,
    gradient: 'from-amber-100 to-yellow-100',
  },
  {
    name: 'Cucumber & Mint Cooling Gel',
    category: 'Soothing & De-Puffing',
    timeOfDay: 'Morning',
    frequency: 'Daily or as needed',
    duration: '10-15 minutes',
    skinTypes: ['All Skin Types', 'Puffy', 'Tired Skin'],
    ingredients: [
      '½ cucumber, blended',
      '5-6 fresh mint leaves',
      '1 tablespoon aloe vera gel',
      '1 teaspoon lemon juice (optional)',
    ],
    benefits: [
      'Reduces puffiness and dark circles',
      'Cools and refreshes skin',
      'Hydrates and revitalizes',
      'Tightens skin temporarily',
    ],
    instructions: [
      'Blend cucumber and mint leaves together',
      'Strain to get smooth juice',
      'Mix with aloe vera gel',
      'Add lemon juice if using',
      'Apply to face, especially under eyes',
      'Relax for 10-15 minutes',
      'Rinse with cool water',
    ],
    precautions: 'Skip lemon if you have sensitive skin. Use immediately for best results.',
    icon: Droplets,
    gradient: 'from-green-100 to-blue-100',
  },
  {
    name: 'Coffee & Coconut Oil Scrub',
    category: 'Exfoliating & Energizing',
    timeOfDay: 'Evening',
    frequency: '1-2 times per week',
    duration: '5-10 minutes',
    skinTypes: ['Normal', 'Oily', 'Dull Skin'],
    ingredients: [
      '2 tablespoons used coffee grounds',
      '1 tablespoon coconut oil',
      '1 teaspoon brown sugar (optional)',
    ],
    benefits: [
      'Removes dead skin cells',
      'Improves circulation',
      'Reduces puffiness',
      'Gives instant glow',
    ],
    instructions: [
      'Mix coffee grounds with melted coconut oil',
      'Add brown sugar for extra exfoliation',
      'Apply to damp face in circular motions',
      'Gently massage for 2-3 minutes',
      'Leave on for 5 minutes',
      'Rinse thoroughly with lukewarm water',
    ],
    precautions: 'Be gentle - coffee grounds can be abrasive. Don\'t use on active acne.',
    icon: Sparkles,
    gradient: 'from-brown-100 to-orange-100',
  },
];

const eveningRoutine = [
  {
    step: 1,
    name: 'Double Cleanse',
    time: 'Evening',
    products: [
      {
        name: 'Cleansing Balm',
        brand: 'Plum',
        price: '₹645',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Oil-based cleanser to remove makeup and SPF',
      },
      {
        name: 'Gentle Skin Cleanser',
        brand: 'Cetaphil',
        price: '₹899',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNlciUyMHNraW5jYXJlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjAyNjEzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Water-based cleanser for second cleanse',
      },
    ],
    instructions: 'First cleanse: Apply oil cleanser to dry skin, massage for 1 minute, rinse. Second cleanse: Use water-based cleanser as in morning routine.',
    icon: Droplets,
  },
  {
    step: 2,
    name: 'Treatment/Exfoliation',
    time: 'Evening',
    products: [
      {
        name: 'Salicylic Acid 2% Solution',
        brand: 'The Ordinary',
        price: '₹579',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'For acne-prone skin, use 2-3x per week',
      },
      {
        name: 'AHA 30% + BHA 2% Peeling Solution',
        brand: 'The Ordinary',
        price: '₹899',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Weekly exfoliating treatment',
      },
    ],
    instructions: 'Apply to clean, dry skin. Use 2-3 times per week in the evening only. Do not use with retinol on the same night.',
    icon: Sparkles,
    optional: true,
  },
  {
    step: 3,
    name: 'Serum/Treatment',
    time: 'Evening',
    products: [
      {
        name: 'Retinol 0.5% in Squalane',
        brand: 'The Ordinary',
        price: '₹1,099',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Anti-aging, start 2x per week',
      },
      {
        name: 'Alpha Arbutin 2% + HA',
        brand: 'Minimalist',
        price: '₹649',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Brightening and pigmentation',
      },
    ],
    instructions: 'Apply 3-4 drops after cleansing. If using retinol, start with 2-3 nights per week and gradually increase.',
    icon: Moon,
  },
  {
    step: 4,
    name: 'Eye Cream',
    time: 'Evening',
    products: [
      {
        name: 'Caffeine Solution 5% + EGCG',
        brand: 'The Ordinary',
        price: '₹549',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1745159338135-39f6b462b382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjAyNjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Reduces dark circles and puffiness',
      },
    ],
    instructions: 'Gently pat a small amount around the eye area using your ring finger. Avoid direct contact with eyes.',
    icon: Sparkles,
    optional: true,
  },
  {
    step: 5,
    name: 'Night Moisturizer',
    time: 'Evening',
    products: [
      {
        name: 'Ceramide Moisturizing Cream',
        brand: 'CeraVe',
        price: '₹1,549',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Rich barrier repair for overnight hydration',
      },
      {
        name: 'Natural Moisturizing Factors + HA',
        brand: 'The Ordinary',
        price: '₹649',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1686831758227-1802d0ba5eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwY3JlYW0lMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2MDI2MTMwNXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Lightweight hydration',
      },
    ],
    instructions: 'Apply generously to face and neck. For very dry skin, you can apply a facial oil on top for extra nourishment.',
    icon: Moon,
  },
];

export default function RoutineSection({ skinType = 'Combination', concerns = [] }: RoutineSectionProps) {
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());

  const toggleSave = (productName: string) => {
    const newSaved = new Set(savedProducts);
    if (newSaved.has(productName)) {
      newSaved.delete(productName);
    } else {
      newSaved.add(productName);
    }
    setSavedProducts(newSaved);
  };

  const renderRoutine = (routine: typeof morningRoutine, timeOfDay: string) => (
    <div className="space-y-8">
      {routine.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className={`relative border-0 shadow-xl rounded-3xl overflow-hidden ${
              step.important 
                ? 'bg-gradient-to-br from-orange-100 to-yellow-100' 
                : 'bg-white'
            } group hover:shadow-2xl transition-all duration-300`}>
              {/* Animated border glow */}
              <motion.div
                className={`absolute inset-0 rounded-3xl ${
                  step.important
                    ? 'bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300'
                    : 'bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300'
                } opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              />
              <div className="relative p-6 border-b border-purple-100">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      timeOfDay === 'Morning' 
                        ? 'bg-gradient-to-br from-orange-100 to-yellow-100' 
                        : 'bg-gradient-to-br from-purple-100 to-blue-100'
                    } shadow-lg group-hover:shadow-xl transition-shadow`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`w-6 h-6 ${
                      timeOfDay === 'Morning' ? 'text-orange-600' : 'text-purple-600'
                    }`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-purple-900">
                        Step {step.step}: {step.name}
                      </h3>
                      {step.optional && (
                        <Badge className="bg-purple-100 text-purple-700 border-0">
                          Optional
                        </Badge>
                      )}
                      {step.important && (
                        <Badge className="bg-orange-500 text-white border-0">
                          Essential
                        </Badge>
                      )}
                    </div>
                    <p className="text-purple-600/70 mt-1">{step.instructions}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-purple-900 mb-4">Recommended Products:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {step.products.map((product, pIndex) => (
                    <motion.div
                      key={pIndex}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
                        {/* Shimmer on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="flex gap-4 p-4 relative">
                        <motion.div 
                          className="w-24 h-24 rounded-2xl bg-white overflow-hidden flex-shrink-0 shadow-md"
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-purple-600/70 truncate">{product.brand}</p>
                              <h5 className="text-purple-900 line-clamp-2">{product.name}</h5>
                            </div>
                            <motion.button
                              onClick={() => toggleSave(product.name)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-md"
                            >
                              <motion.div
                                animate={savedProducts.has(product.name) ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <Heart
                                  className={`w-4 h-4 ${
                                    savedProducts.has(product.name)
                                      ? 'fill-pink-500 text-pink-500'
                                      : 'text-purple-400'
                                  }`}
                                />
                              </motion.div>
                            </motion.button>
                          </div>

                          <p className="text-purple-600/70 mb-3 line-clamp-2">{product.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-purple-900">{product.rating}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-purple-900">{product.price}</span>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const productData: Product = {
                                      id: `${step.step}-${pIndex}`,
                                      name: product.name,
                                      brand: product.brand,
                                      price: parseInt(product.price.replace(/[^0-9]/g, '')),
                                      image: product.image,
                                      description: product.description,
                                      ingredients: [],
                                      benefits: [],
                                      category: step.name,
                                      rating: product.rating,
                                      reviews: 0
                                    };
                                    addToCart(productData);
                                    toast.success(`${product.name} added to cart!`);
                                  }}
                                  className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full h-8 px-3 shadow-md"
                                >
                                  <ShoppingCart className="w-3 h-3" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-pink-50/50 to-purple-50/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0 px-4 py-2">
              ✨ Personalized for {skinType} Skin
            </Badge>
          </div>
          <h2 className="text-purple-900 mb-4">Your Custom Skincare Routine</h2>
          <p className="text-purple-600/80 max-w-2xl mx-auto">
            Based on your quiz responses, we've created this personalized morning and evening routine just for you
          </p>
        </motion.div>

        <Tabs defaultValue="morning" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-white rounded-2xl p-1 mb-8 shadow-md">
            <TabsTrigger value="morning" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-yellow-100">
              <Sun className="w-4 h-4 mr-2" />
              Morning
            </TabsTrigger>
            <TabsTrigger value="evening" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100">
              <Moon className="w-4 h-4 mr-2" />
              Evening
            </TabsTrigger>
            <TabsTrigger value="natural" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-100 data-[state=active]:to-teal-100">
              <Leaf className="w-4 h-4 mr-2" />
              Natural
            </TabsTrigger>
          </TabsList>

          <TabsContent value="morning">
            {renderRoutine(morningRoutine, 'Morning')}
          </TabsContent>

          <TabsContent value="evening">
            {renderRoutine(eveningRoutine, 'Evening')}
          </TabsContent>

          <TabsContent value="natural">
            <div className="space-y-6">
              {naturalRemedies.map((remedy, index) => {
                const Icon = remedy.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className={`relative bg-gradient-to-br ${remedy.gradient} border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group`}>
                      {/* Animated sparkles */}
                      <motion.div
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-6 h-6 text-green-600" />
                      </motion.div>
                      <div className="p-6 border-b border-white/50">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/60 backdrop-blur flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-green-700" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-green-900 mb-2">{remedy.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className="bg-white/60 text-green-800 border-0">
                                {remedy.category}
                              </Badge>
                              <Badge className="bg-white/60 text-green-800 border-0">
                                <Clock className="w-3 h-3 mr-1" />
                                {remedy.duration}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {remedy.skinTypes.map((type, i) => (
                                <span key={i} className="text-green-700/80 bg-white/40 px-3 py-1 rounded-full">
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-white/40 backdrop-blur rounded-2xl p-4">
                            <p className="text-green-800 mb-1">When to Use</p>
                            <p className="text-green-900">{remedy.timeOfDay}</p>
                          </div>
                          <div className="bg-white/40 backdrop-blur rounded-2xl p-4">
                            <p className="text-green-800 mb-1">Frequency</p>
                            <p className="text-green-900">{remedy.frequency}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-green-900 mb-3 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Ingredients
                          </h4>
                          <ul className="space-y-2">
                            {remedy.ingredients.map((ingredient, i) => (
                              <li key={i} className="flex items-start gap-2 text-green-800/90">
                                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{ingredient}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-green-900 mb-3 flex items-center gap-2">
                            <Star className="w-5 h-5" />
                            Benefits
                          </h4>
                          <ul className="space-y-2">
                            {remedy.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 text-green-800/90">
                                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-6 bg-white/30 backdrop-blur">
                        <h4 className="text-green-900 mb-3">Instructions</h4>
                        <ol className="space-y-2">
                          {remedy.instructions.map((instruction, i) => (
                            <li key={i} className="flex items-start gap-3 text-green-800/90">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center text-green-900">
                                {i + 1}
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                        
                        {remedy.precautions && (
                          <div className="mt-4 p-4 bg-orange-100/60 rounded-2xl">
                            <p className="text-orange-900">
                              ⚠️ <strong>Note:</strong> {remedy.precautions}
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}

              <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-xl rounded-3xl p-8">
                <h3 className="text-purple-900 mb-4">💚 Natural Skincare Tips</h3>
                <ul className="space-y-3 text-purple-700/80">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Always patch test DIY remedies on your inner arm before applying to your face</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Use fresh, organic ingredients whenever possible for best results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Store DIY products in refrigerator and use within recommended time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Natural remedies work best when combined with a consistent skincare routine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>If you experience any irritation, rinse immediately and discontinue use</span>
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-xl rounded-3xl p-8">
            <h3 className="text-purple-900 mb-4">💡 Pro Tips for Best Results</h3>
            <ul className="space-y-3 text-purple-700/80">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Always patch test new products on your inner arm before applying to your face</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Introduce new products one at a time, waiting 1-2 weeks before adding another</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Wait 60 seconds between each product step to allow proper absorption</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Don't mix vitamin C with retinol - use vitamin C in morning and retinol at night</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span>Consistency is key - stick to your routine for at least 6-8 weeks to see results</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
