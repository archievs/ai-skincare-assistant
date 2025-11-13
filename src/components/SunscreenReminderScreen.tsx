import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sun, Clock, Bell, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface SunscreenReminderScreenProps {
  onNavigate: (screen: Screen) => void;
}

const reminderOptions = [
  { id: 'morning', label: 'Morning reminder', time: '8:00 AM', enabled: true },
  { id: 'midday', label: 'Midday reapply', time: '12:00 PM', enabled: true },
  { id: 'afternoon', label: 'Afternoon reapply', time: '3:00 PM', enabled: false },
  { id: 'evening', label: 'Evening reminder', time: '6:00 PM', enabled: false },
];

export default function SunscreenReminderScreen({ onNavigate }: SunscreenReminderScreenProps) {
  const [reminders, setReminders] = useState(reminderOptions);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-orange-50/50 to-yellow-50/50 pb-24">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-orange-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-orange-600" />
          </button>
          <div>
            <h2 className="text-orange-900">Sunscreen Reminder</h2>
            <p className="text-orange-700/70">Stay protected all day</p>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-orange-200 to-yellow-200 border-0 shadow-lg rounded-3xl p-6 mb-6 relative overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"
            />
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                  <Sun className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-orange-900">Current UV Index</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-orange-700" />
                    <span className="text-orange-700">San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-orange-900 mb-2"
                >
                  7
                </motion.div>
                <p className="text-orange-700">High - Protection Required</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-orange-900 mb-4">Reminder Schedule</h3>
          
          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white border-0 shadow-md rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        reminder.enabled 
                          ? 'bg-gradient-to-br from-orange-100 to-yellow-100' 
                          : 'bg-gray-100'
                      }`}>
                        {reminder.enabled ? (
                          <Bell className="w-5 h-5 text-orange-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className={reminder.enabled ? 'text-orange-900' : 'text-gray-500'}>
                          {reminder.label}
                        </p>
                        <p className={reminder.enabled ? 'text-orange-700/70' : 'text-gray-400'}>
                          {reminder.time}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-br from-blue-100 to-purple-100 border-0 shadow-lg rounded-2xl p-6">
            <h4 className="text-purple-900 mb-3">☀️ Sun Safety Tips</h4>
            <ul className="space-y-2 text-purple-700/80">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Reapply sunscreen every 2 hours when outdoors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Use extra protection between 10 AM - 4 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Don't forget ears, neck, and hands</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        <Button
          onClick={() => onNavigate('home')}
          className="w-full mt-6 bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white rounded-2xl py-6 shadow-lg"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
