import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Chrome } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-cream-100 via-pink-100 to-peach-100">
      <div className="flex-1 flex flex-col justify-center px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-purple-900 mb-2">
            Welcome to SkinSense
          </h1>
          <p className="text-purple-600/70">
            Your journey to glowing skin starts here
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 py-6 rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 py-6 rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur"
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
                className="pl-12 py-6 rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur"
              />
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl py-6 shadow-lg mt-6"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </motion.form>

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
            {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
