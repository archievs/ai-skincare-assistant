import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Menu, X, User, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import type { Section } from '../App';
import { getCart } from '../services/skincare-ai';

interface HeaderProps {
  onNavigate: (section: Section) => void;
  onLogin: () => void;
  onCartClick?: () => void;
  isLoggedIn: boolean;
}

const navItems = [
  { label: 'Home', section: 'home' as Section },
  { label: 'Products', section: 'products' as Section },
  { label: 'Skin Quiz', section: 'quiz' as Section },
  { label: 'AI Scan', section: 'scan' as Section },
  { label: 'Progress', section: 'progress' as Section },
];

export default function Header({ onNavigate, onLogin, onCartClick, isLoggedIn }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    
    updateCartCount();
    
    // Update cart count every second
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-purple-900">SkinSense</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className="text-purple-700 hover:text-purple-900 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            {isLoggedIn ? (
              <Button
                variant="outline"
                className="rounded-full border-2 border-purple-300 hover:bg-purple-50"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            ) : (
              <Button
                onClick={onLogin}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-6"
              >
                Get Started
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-purple-600" />
            ) : (
              <Menu className="w-5 h-5 text-purple-600" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onNavigate(item.section);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-purple-700 hover:text-purple-900 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  onLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full"
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
