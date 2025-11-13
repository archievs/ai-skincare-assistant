import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, TrendingUp, Award, Target, CheckCircle2, X, Plus, Camera } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface ProgressEntry {
  date: string;
  note: string;
  photo?: string;
  skinScore: number;
}

interface SkincareGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

export default function ProgressTracking() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [goals, setGoals] = useState<SkincareGoal[]>([
    { id: '1', title: 'Drink Water Daily', target: 8, current: 0, unit: 'glasses' },
    { id: '2', title: 'Apply Sunscreen', target: 30, current: 0, unit: 'days' },
    { id: '3', title: 'Complete Routine', target: 14, current: 0, unit: 'days' },
  ]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('skinsense_progress');
    const savedGoals = localStorage.getItem('skinsense_goals');
    const savedStreak = localStorage.getItem('skinsense_streak');
    
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedStreak) setCurrentStreak(parseInt(savedStreak));
  }, []);

  // Save data to localStorage
  const saveToStorage = (newEntries: ProgressEntry[], newGoals: SkincareGoal[], streak: number) => {
    localStorage.setItem('skinsense_progress', JSON.stringify(newEntries));
    localStorage.setItem('skinsense_goals', JSON.stringify(newGoals));
    localStorage.setItem('skinsense_streak', streak.toString());
  };

  const addProgressEntry = () => {
    if (!newNote.trim()) return;
    
    const newEntry: ProgressEntry = {
      date: new Date().toISOString(),
      note: newNote,
      skinScore: Math.floor(Math.random() * 30) + 70 // Random score 70-100
    };
    
    const newEntries = [newEntry, ...entries];
    const newStreak = currentStreak + 1;
    
    setEntries(newEntries);
    setCurrentStreak(newStreak);
    setNewNote('');
    setShowAddEntry(false);
    
    saveToStorage(newEntries, goals, newStreak);
  };

  const updateGoalProgress = (goalId: string, increment: boolean) => {
    const newGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = increment 
          ? Math.min(goal.current + 1, goal.target)
          : Math.max(goal.current - 1, 0);
        return { ...goal, current: newCurrent };
      }
      return goal;
    });
    
    setGoals(newGoals);
    saveToStorage(entries, newGoals, currentStreak);
  };

  const getAverageSkinScore = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.skinScore, 0);
    return Math.round(sum / entries.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-0 shadow-md rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-purple-900">{getAverageSkinScore()}</p>
              <p className="text-purple-600/70">Avg Score</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-blue-100 border-0 shadow-md rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-green-900">{currentStreak} days</p>
              <p className="text-green-600/70">Streak</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100 to-yellow-100 border-0 shadow-md rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-orange-900">{entries.length}</p>
              <p className="text-orange-600/70">Total Logs</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-md rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-pink-900">{goals.filter(g => g.current >= g.target).length}/{goals.length}</p>
              <p className="text-pink-600/70">Goals Met</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Goals Section */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl p-6">
        <h3 className="text-purple-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Skincare Goals
        </h3>
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            const isComplete = goal.current >= goal.target;
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl transition-all ${
                  isComplete ? 'bg-gradient-to-r from-green-100 to-blue-100' : 'bg-purple-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {isComplete && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    <span className={isComplete ? 'text-green-900' : 'text-purple-900'}>
                      {goal.title}
                    </span>
                  </div>
                  <span className={isComplete ? 'text-green-700' : 'text-purple-600'}>
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                
                <Progress value={percentage} className="h-2 mb-3" />
                
                <div className="flex gap-2">
                  <button
                    onClick={() => updateGoalProgress(goal.id, false)}
                    disabled={goal.current === 0}
                    className="px-3 py-1 bg-white rounded-lg text-purple-700 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateGoalProgress(goal.id, true)}
                    disabled={goal.current >= goal.target}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Mark Complete for Today
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Progress Log */}
      <Card className="bg-white border-0 shadow-lg rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-purple-900 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Progress Journal
          </h3>
          <Button
            onClick={() => setShowAddEntry(!showAddEntry)}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Entry
          </Button>
        </div>

        <AnimatePresence>
          {showAddEntry && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6"
            >
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="How's your skin today? Any improvements or concerns?"
                  className="w-full p-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none resize-none bg-white"
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={addProgressEntry}
                    disabled={!newNote.trim()}
                    className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl disabled:opacity-50"
                  >
                    Save Entry
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddEntry(false);
                      setNewNote('');
                    }}
                    variant="outline"
                    className="border-2 border-purple-300 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="text-purple-600/70">No entries yet. Start tracking your progress!</p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-200 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                        <span className="text-purple-800">{entry.skinScore}</span>
                      </div>
                      <div>
                        <p className="text-purple-600/70">{formatDate(entry.date)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={entry.skinScore} className="h-1 w-20" />
                          <span className="text-purple-600">{entry.skinScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-purple-800">{entry.note}</p>
                  {entry.photo && (
                    <div className="mt-3">
                      <img 
                        src={entry.photo} 
                        alt="Progress" 
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </Card>

      {/* Achievement Badges */}
      {currentStreak >= 7 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-0 shadow-lg rounded-3xl p-6 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-orange-900 mb-2">🎉 Achievement Unlocked!</h3>
            <p className="text-orange-700">
              7-Day Streak! You're on fire! Keep up the great work! 🔥
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
