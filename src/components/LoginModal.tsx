import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-purple-600" />
              </button>

              <h2 className="text-purple-900 mb-2">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-purple-600/70">
                {isSignup 
                  ? 'Start your journey to better skin' 
                  : 'Continue your skincare journey'}
              </p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-6 rounded-2xl border-purple-200 focus:border-purple-400 bg-purple-50/50"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 py-6 rounded-2xl border-purple-200 focus:border-purple-400 bg-purple-50/50"
                    required
                  />
                </div>

                {isSignup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="relative"
                  >
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      className="pl-12 py-6 rounded-2xl border-purple-200 focus:border-purple-400 bg-purple-50/50"
                    />
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6 shadow-lg mt-6"
                >
                  {isSignup ? 'Sign Up' : 'Log In'}
                </Button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-purple-200" />
                <span className="text-purple-400">or</span>
                <div className="flex-1 h-px bg-purple-200" />
              </div>

              <Button
                onClick={onLogin}
                variant="outline"
                className="w-full border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 rounded-2xl py-6"
              >
                <Chrome className="mr-2 w-5 h-5 text-purple-600" />
                Continue with Google
              </Button>

              <div className="text-center mt-6">
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {isSignup 
                    ? 'Already have an account? Log in' 
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
