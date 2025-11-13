import { motion } from 'motion/react';
import { User, Mail, Phone, Bell, Lock, Shield, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { Screen } from '../App';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Edit Profile', action: 'edit-profile' },
      { icon: Mail, label: 'Email Preferences', action: 'email' },
      { icon: Phone, label: 'Phone Number', action: 'phone' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', action: 'notifications', toggle: true, enabled: true },
      { icon: Sparkles, label: 'AI Recommendations', action: 'ai', toggle: true, enabled: true },
    ],
  },
  {
    title: 'Security',
    items: [
      { icon: Lock, label: 'Change Password', action: 'password' },
      { icon: Shield, label: 'Privacy Settings', action: 'privacy' },
    ],
  },
];

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-50/50 to-pink-50/50 pb-24">
      <div className="p-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <h2 className="text-purple-900 mb-6">Profile & Settings</h2>

          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-pink-300 to-purple-300 text-white text-2xl">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-purple-900 mb-1">Archita</h3>
                <p className="text-purple-600/70 mb-2">archita@example.com</p>
                <div className="bg-white/60 backdrop-blur rounded-full px-3 py-1 inline-block">
                  <span className="text-purple-700">Combination Skin</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-purple-200/50">
              <div className="text-center">
                <p className="text-purple-900 mb-1">42</p>
                <p className="text-purple-600/70">Days Active</p>
              </div>
              <div className="text-center">
                <p className="text-purple-900 mb-1">8</p>
                <p className="text-purple-600/70">Products</p>
              </div>
              <div className="text-center">
                <p className="text-purple-900 mb-1">3</p>
                <p className="text-purple-600/70">Scans</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h3 className="text-purple-900 mb-3">{section.title}</h3>
            <Card className="bg-white border-0 shadow-md rounded-3xl overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`${itemIndex !== section.items.length - 1 ? 'border-b border-purple-100' : ''}`}
                  >
                    <button
                      className="w-full p-5 flex items-center justify-between hover:bg-purple-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-purple-900">{item.label}</span>
                      </div>
                      {item.toggle ? (
                        <Switch defaultChecked={item.enabled} />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-purple-400" />
                      )}
                    </button>
                  </div>
                );
              })}
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-lg rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-purple-900 mb-1">Data Privacy</h4>
                <p className="text-purple-700/80">
                  Your skin data is encrypted and never shared with third parties. We take your privacy seriously.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="w-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-2xl py-6 text-red-600"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Log Out
          </Button>
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-purple-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
