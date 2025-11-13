import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import QuizSection from './components/QuizSection';
import AIScanSection from './components/AIScanSection';
import ProgressSection from './components/ProgressSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ShoppingCart from './components/ShoppingCart';
import { Toaster } from './components/ui/sonner';
import { motion } from 'motion/react';

export type Section = 'home' | 'products' | 'quiz' | 'scan' | 'progress' | 'profile';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const scrollToSection = (section: Section) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <Toaster position="top-right" richColors />
      <Header 
        onNavigate={scrollToSection} 
        onLogin={() => setShowLoginModal(true)}
        onCartClick={() => setShowCart(true)}
        isLoggedIn={isLoggedIn}
      />
      
      <main>
        <section id="home">
          <Hero onGetStarted={() => scrollToSection('quiz')} />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="products">
          <ProductShowcase />
        </section>

        <section id="quiz">
          <QuizSection />
        </section>

        <section id="scan">
          <AIScanSection />
        </section>

        <section id="progress">
          <ProgressSection />
        </section>
      </main>

      <Footer onNavigate={scrollToSection} />

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      <ShoppingCart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </div>
  );
}
