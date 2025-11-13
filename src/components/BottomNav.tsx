import { Home, Camera, ClipboardList, User } from 'lucide-react';
import { motion } from 'motion/react';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { id: 'home' as Screen, icon: Home, label: 'Home' },
  { id: 'scan' as Screen, icon: Camera, label: 'Scan' },
  { id: 'quiz' as Screen, icon: ClipboardList, label: 'Quiz' },
  { id: 'profile' as Screen, icon: User, label: 'Profile' },
];

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-lg"
    >
      <div className="flex items-center justify-around px-6 py-4">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className={`p-2 rounded-2xl transition-colors ${
                isActive ? 'bg-gradient-to-br from-pink-100 to-purple-100' : ''
              }`}>
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-purple-600' : 'text-purple-300'
                  }`}
                  strokeWidth={isActive ? 2 : 1.5}
                />
              </div>
              <span className={`transition-colors ${
                isActive ? 'text-purple-600' : 'text-purple-300'
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
