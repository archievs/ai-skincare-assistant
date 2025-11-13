// Mock AI Backend Service - Simulates the AI skin analysis backend

export interface SkinAnalysis {
  skinType: string;
  concerns: string[];
  severity: Record<string, number>;
  recommendations: string[];
  confidence: number;
  texture: string;
  hydration: number;
  oiliness: number;
  sensitivity: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  category: string;
  rating: number;
  reviews: number;
}

// Simulate AI skin analysis from image
export async function analyzeSkinImage(imageData: File | string): Promise<SkinAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI analysis results
  const skinTypes = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];
  const concerns = [
    'Acne & Blemishes',
    'Dark Spots & Pigmentation',
    'Fine Lines & Wrinkles',
    'Large Pores',
    'Dullness',
    'Redness & Irritation'
  ];
  
  const randomSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  const randomConcerns = concerns
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 2);
  
  const severity: Record<string, number> = {};
  randomConcerns.forEach(concern => {
    severity[concern] = Math.floor(Math.random() * 40) + 60; // 60-100%
  });
  
  return {
    skinType: randomSkinType,
    concerns: randomConcerns,
    severity,
    recommendations: [
      'Use a gentle cleanser twice daily',
      'Apply sunscreen with SPF 30+ every morning',
      'Incorporate a vitamin C serum for brightness',
      'Use a hydrating moisturizer suitable for your skin type'
    ],
    confidence: Math.floor(Math.random() * 10) + 90, // 90-100%
    texture: ['Smooth', 'Rough', 'Uneven', 'Bumpy'][Math.floor(Math.random() * 4)],
    hydration: Math.floor(Math.random() * 40) + 40, // 40-80%
    oiliness: Math.floor(Math.random() * 50) + 30, // 30-80%
    sensitivity: Math.floor(Math.random() * 40) + 20, // 20-60%
  };
}

// Get personalized product recommendations based on quiz/analysis
export async function getProductRecommendations(
  skinType: string,
  concerns: string[],
  budget?: string
): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock product database
  const allProducts: Product[] = [
    {
      id: 'p1',
      name: 'Niacinamide 10% + Zinc 1%',
      brand: 'The Ordinary',
      price: 599,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      description: 'High-strength vitamin and mineral blemish formula',
      ingredients: ['Niacinamide', 'Zinc PCA', 'Tamarindus Indica Seed Gum'],
      benefits: ['Reduces blemishes', 'Balances sebum', 'Minimizes pores'],
      category: 'Serum',
      rating: 4.5,
      reviews: 2340
    },
    {
      id: 'p2',
      name: 'Hyaluronic Acid 2% + B5',
      brand: 'The Ordinary',
      price: 699,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      description: 'Next-generation hydration serum',
      ingredients: ['Hyaluronic Acid', 'Vitamin B5', 'Sodium Hyaluronate'],
      benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines'],
      category: 'Serum',
      rating: 4.7,
      reviews: 3120
    },
    {
      id: 'p3',
      name: 'Daily Hydrating Cleanser',
      brand: 'Cetaphil',
      price: 850,
      image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
      description: 'Gentle cleanser for all skin types',
      ingredients: ['Glycerin', 'Panthenol', 'Niacinamide'],
      benefits: ['Gentle cleansing', 'Maintains moisture', 'Soothes skin'],
      category: 'Cleanser',
      rating: 4.6,
      reviews: 1890
    },
    {
      id: 'p4',
      name: 'Vitamin C Face Serum',
      brand: 'Minimalist',
      price: 699,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
      description: '10% Vitamin C with Ferulic Acid',
      ingredients: ['L-Ascorbic Acid', 'Ferulic Acid', 'Vitamin E'],
      benefits: ['Brightens skin', 'Reduces dark spots', 'Anti-aging'],
      category: 'Serum',
      rating: 4.4,
      reviews: 987
    },
    {
      id: 'p5',
      name: 'Oil-Free Acne Wash',
      brand: 'Neutrogena',
      price: 475,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      description: 'Salicylic acid acne treatment',
      ingredients: ['Salicylic Acid', 'Glycerin', 'C12-15 Alkyl Benzoate'],
      benefits: ['Clears acne', 'Prevents breakouts', 'Oil-free formula'],
      category: 'Cleanser',
      rating: 4.3,
      reviews: 2156
    },
    {
      id: 'p6',
      name: 'Green Tea Moisturizer',
      brand: 'Plum',
      price: 495,
      image: 'https://images.unsplash.com/photo-1556228852-80a49b4e2b3e?w=400&h=400&fit=crop',
      description: 'Oil-free, renewed clarity gel moisturizer',
      ingredients: ['Green Tea Extract', 'Glycerin', 'Mandelic Acid'],
      benefits: ['Oil control', 'Hydrates', 'Antioxidant protection'],
      category: 'Moisturizer',
      rating: 4.5,
      reviews: 1234
    },
    {
      id: 'p7',
      name: 'Moisturizing Cream',
      brand: 'CeraVe',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4f8a2c9?w=400&h=400&fit=crop',
      description: 'Daily face and body moisturizer for dry skin',
      ingredients: ['Ceramides', 'Hyaluronic Acid', 'MVE Technology'],
      benefits: ['24-hour hydration', 'Restores skin barrier', 'Non-comedogenic'],
      category: 'Moisturizer',
      rating: 4.8,
      reviews: 4567
    },
    {
      id: 'p8',
      name: 'Sunscreen SPF 50 PA+++',
      brand: 'Minimalist',
      price: 449,
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&h=400&fit=crop',
      description: 'Multi-vitamin sunscreen with no white cast',
      ingredients: ['Zinc Oxide', 'Vitamin E', 'Niacinamide'],
      benefits: ['Broad spectrum', 'No white cast', 'Lightweight'],
      category: 'Sunscreen',
      rating: 4.6,
      reviews: 876
    },
    {
      id: 'p9',
      name: 'Retinol Serum 0.3%',
      brand: 'The Ordinary',
      price: 899,
      image: 'https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?w=400&h=400&fit=crop',
      description: 'Anti-aging retinol treatment',
      ingredients: ['Retinol', 'Squalane', 'Jojoba Oil'],
      benefits: ['Reduces wrinkles', 'Improves texture', 'Boosts collagen'],
      category: 'Serum',
      rating: 4.7,
      reviews: 1987
    },
    {
      id: 'p10',
      name: 'Salicylic Acid 2% Solution',
      brand: 'The Ordinary',
      price: 550,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
      description: 'Exfoliating solution for blemish-prone skin',
      ingredients: ['Salicylic Acid', 'Witch Hazel', 'Panthenol'],
      benefits: ['Exfoliates', 'Unclogs pores', 'Reduces blackheads'],
      category: 'Treatment',
      rating: 4.4,
      reviews: 1543
    },
    {
      id: 'p11',
      name: 'Hydrating Toner',
      brand: 'Cetaphil',
      price: 650,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      description: 'Alcohol-free hydrating toner',
      ingredients: ['Glycerin', 'Allantoin', 'Panthenol'],
      benefits: ['Hydrates', 'Soothes', 'Prepares skin'],
      category: 'Toner',
      rating: 4.3,
      reviews: 765
    },
    {
      id: 'p12',
      name: 'AHA 30% + BHA 2% Peeling Solution',
      brand: 'The Ordinary',
      price: 749,
      image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&h=400&fit=crop',
      description: 'Exfoliating facial for radiant skin',
      ingredients: ['Glycolic Acid', 'Lactic Acid', 'Salicylic Acid'],
      benefits: ['Deep exfoliation', 'Brightens', 'Smooths texture'],
      category: 'Treatment',
      rating: 4.6,
      reviews: 2890
    }
  ];
  
  // Filter based on skin concerns and type
  let filtered = allProducts;
  
  if (concerns.includes('Acne & Blemishes')) {
    filtered = filtered.filter(p => 
      ['Niacinamide', 'Salicylic Acid'].some(i => p.ingredients.includes(i))
    );
  }
  
  // Return 8 products
  return filtered.slice(0, 8);
}

// Track user progress
export interface ProgressEntry {
  date: string;
  skinScore: number;
  notes: string;
  concerns: string[];
  imageUrl?: string;
}

export async function saveProgress(entry: ProgressEntry): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
  // In real implementation, save to database
  const saved = JSON.parse(localStorage.getItem('skincare_progress') || '[]');
  saved.push(entry);
  localStorage.setItem('skincare_progress', JSON.stringify(saved));
}

export async function getProgress(): Promise<ProgressEntry[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return JSON.parse(localStorage.getItem('skincare_progress') || '[]');
}

// Shopping cart functionality
export interface CartItem {
  product: Product;
  quantity: number;
}

export function addToCart(product: Product): void {
  const cart = JSON.parse(localStorage.getItem('skincare_cart') || '[]');
  const existing = cart.find((item: CartItem) => item.product.id === product.id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  
  localStorage.setItem('skincare_cart', JSON.stringify(cart));
}

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem('skincare_cart') || '[]');
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter(item => item.product.id !== productId);
  localStorage.setItem('skincare_cart', JSON.stringify(cart));
}

export function updateCartQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('skincare_cart', JSON.stringify(cart));
  }
}

export function clearCart(): void {
  localStorage.setItem('skincare_cart', '[]');
}
