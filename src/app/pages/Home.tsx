import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Calculator, Microscope, LogOut, User, Star, 
  Clock, Trophy, Play, Zap, Award, Target, Flame, 
  ChevronRight, Lock, Crown, Medal, TrendingUp
} from 'lucide-react';
import { quizService, QuizScore } from '../data/quizService';

const subjects = [
  {
    id: 'english',
    name: 'English Kingdom',
    icon: BookOpen,
    gradient: 'from-blue-400 to-indigo-600',
    bgColor: 'bg-blue-50',
    accentColor: 'text-blue-600',
    progress: 65,
    stars: 124,
    status: 'Daily Challenge Ready',
    reward: 'Bonus: +20 XP',
    illustration: '🏰'
  },
  {
    id: 'math',
    name: 'Math Mission',
    icon: Calculator,
    gradient: 'from-purple-400 to-fuchsia-600',
    bgColor: 'bg-purple-50',
    accentColor: 'text-purple-600',
    progress: 42,
    stars: 86,
    status: 'Mission in Progress',
    reward: 'Unlock: Geometry',
    illustration: '🔢'
  },
  {
    id: 'science',
    name: 'Science Lab',
    icon: Microscope,
    gradient: 'from-emerald-400 to-teal-600',
    bgColor: 'bg-emerald-50',
    accentColor: 'text-emerald-600',
    progress: 18,
    stars: 45,
    status: 'New Quest Available',
    reward: 'Next: Space Explorers',
    illustration: '🔬'
  },
];

const quickActions = [
  { id: 'practice', label: 'Practice', icon: Target, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'daily', label: 'Daily Quiz', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 'badges', label: 'Badges', icon: Award, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'leaderboards', label: 'Rankings', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const grades = [1, 2, 3, 4, 5, 6];
const units = [1, 2, 3, 4, 5, 6];

export default function Home() {
  const [userGrade, setUserGrade] = useState<number>(4);
  const [selectedUnit, setSelectedUnit] = useState<number>(4);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [leaderboardTab, setLeaderboardTab] = useState<'weekly' | 'grade' | 'subject' | 'overall'>('grade');
  const [userScores, setUserScores] = useState<QuizScore[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedGrade = localStorage.getItem('userGrade');
    if (storedGrade) {
      setUserGrade(parseInt(storedGrade));
    }
  }, []);

  const username = localStorage.getItem('username') || 'Student';

  useEffect(() => {
    const scores = quizService.getUserScores(username);
    setUserScores(scores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [username]);

  const handleStart = (subjectName: string) => {
    const cleanSubject = subjectName.split(' ')[0]; // Extract English, Math, Science
    navigate(`/quiz?grade=${userGrade}&subject=${cleanSubject}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userGrade');
    navigate('/login');
  };

  const handleQuickAction = (id: string) => {
    switch (id) {
      case 'badges':
        navigate('/badges');
        break;
      case 'leaderboards':
        navigate('/leaderboard');
        break;
      case 'practice':
        // Start a practice quiz (Math by default for now)
        navigate(`/quiz?grade=${userGrade}&subject=Math&mode=practice`);
        break;
      case 'daily':
        // Start a daily challenge
        navigate(`/quiz?grade=${userGrade}&subject=Science&mode=daily`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FF] pb-24">
      {/* 1. Hero Progress Card */}
      <div className="px-5 pt-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#3B82F6] rounded-[32px] p-6 text-white shadow-2xl shadow-indigo-200"
        >
          {/* Subtle Glow Overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                  <span className="text-3xl">👧</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Hi, {username}!</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-sm border border-white/20">
                      Grade {userGrade} Explorer
                    </span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20"
              >
                <LogOut className="w-5 h-5 text-white/80" />
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center" onClick={() => navigate('/badges')}>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Total Stars</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-black">1,240</span>
                </div>
              </div>
              <div className="text-center border-x border-white/10 px-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Streak</p>
                <div className="flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xl font-black">7 Days</span>
                </div>
              </div>
              <div className="text-center" onClick={() => navigate('/leaderboard')}>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Current Rank</p>
                <div className="flex items-center justify-center gap-1">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-xl font-black">#5</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStart('English Kingdom')}
              className="w-full py-4 bg-white text-[#6366F1] rounded-2xl font-black text-lg shadow-xl shadow-indigo-900/10 flex items-center justify-center gap-2 group transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              Continue Quiz
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-5">
        {/* 2. Quick Actions Grid */}
        {/* <div className="grid grid-cols-2 gap-4 mb-10">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAction(action.id)}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 ${action.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <span className="font-black text-gray-700">{action.label}</span>
            </motion.button>
          ))}
        </div> */}

        {/* 4. Grade Journey Section -> Path Journey Section */}
        <div className="mb-10 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-gray-800">Grade {userGrade} Journey</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Unit {selectedUnit} of 6</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide -mx-2">
            {units.map((unit) => {
              const isSelected = selectedUnit === unit;
              const isLocked = unit > 4;
              return (
                <motion.button
                  key={unit}
                  whileHover={{ scale: isLocked ? 1 : 1.1 }}
                  onClick={() => !isLocked && setSelectedUnit(unit)}
                  className={`relative flex-shrink-0 w-20 h-24 rounded-3xl flex flex-col items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                      : isLocked 
                        ? 'bg-gray-100 text-gray-400' 
                        : 'bg-white text-gray-600 border border-gray-100 shadow-sm'
                  }`}
                >
                  <span className={`text-xs font-black uppercase tracking-tighter mb-1 ${isSelected ? 'text-indigo-200' : 'text-gray-400'}`}>Unit</span>
                  <span className="text-2xl font-black">{unit}</span>
                  {isLocked && <Lock className="w-3 h-3 mt-1 text-gray-400" />}
                  {isSelected && (
                    <motion.div 
                      layoutId="grade-glow"
                      className="absolute -bottom-1 w-8 h-1 bg-white rounded-full shadow-[0_0_8px_white]" 
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 3. Subject Mission Cards */}
        <div className="mb-10">
          <h3 className="text-xl font-black text-gray-800 mb-6">Active Missions</h3>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                whileHover={{ x: 8 }}
                onClick={() => handleStart(subject.name)}
                className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 flex items-center gap-5 cursor-pointer relative group"
              >
                <div className={`w-20 h-20 rounded-2xl ${subject.bgColor} flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform`}>
                  {subject.illustration}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-lg font-black text-gray-800">{subject.name}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-black">{subject.stars}</span>
                    </div>
                  </div>
                  <p className={`text-xs font-bold mb-3 ${subject.accentColor}`}>{subject.status}</p>
                  
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${subject.gradient}`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400">{subject.progress}% Completed</span>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{subject.reward}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Leaderboard Podium Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-800">Top Students</h3>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>

            {/* Podium */}
            <div className="flex items-end justify-center gap-2 mb-10 mt-4 px-2">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full mb-2 flex items-center justify-center text-xl border-2 border-white shadow-md">🥈</div>
                <div className="w-20 h-16 bg-gray-100 rounded-t-2xl flex flex-col items-center justify-center border-x border-t border-gray-200">
                  <span className="text-xs font-black text-gray-600">Sarah</span>
                  <span className="text-[10px] font-bold text-gray-400">2,720</span>
                </div>
              </div>
              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <Crown className="w-6 h-6 text-yellow-500 mb-1" />
                <div className="w-16 h-16 bg-yellow-100 rounded-full mb-2 flex items-center justify-center text-3xl border-2 border-white shadow-xl ring-4 ring-yellow-50 shadow-yellow-200">🥇</div>
                <div className="w-24 h-24 bg-gradient-to-b from-yellow-100 to-white rounded-t-2xl flex flex-col items-center justify-center border-x border-t border-yellow-200">
                  <span className="text-sm font-black text-yellow-700">Alex</span>
                  <span className="text-xs font-bold text-yellow-600">2,850</span>
                </div>
              </div>
              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-50 rounded-full mb-2 flex items-center justify-center text-xl border-2 border-white shadow-md">🥉</div>
                <div className="w-20 h-12 bg-orange-50 rounded-t-2xl flex flex-col items-center justify-center border-x border-t border-orange-100">
                  <span className="text-xs font-black text-orange-700">Liam</span>
                  <span className="text-[10px] font-bold text-orange-400">2,540</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-50 rounded-2xl mb-6">
              {['Weekly', 'Grade', 'Subject', 'Overall'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setLeaderboardTab(tab.toLowerCase() as any)}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all ${
                    leaderboardTab === tab.toLowerCase() 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* User Rank Card */}
            <div className="bg-indigo-600 rounded-3xl p-4 text-white flex items-center justify-between shadow-xl shadow-indigo-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">5</div>
                <div>
                  <p className="text-sm font-black">{username} (You)</p>
                  <p className="text-[10px] font-bold text-white/70">Only 63 stars to reach #4!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black">2,680</p>
                <p className="text-[10px] font-black uppercase opacity-70">Stars</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 px-8 flex items-center justify-between z-50">
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-indigo-600 flex flex-col items-center"
        >
          <Play className="w-6 h-6 fill-current" />
          <span className="text-[10px] font-black mt-1 uppercase">Learn</span>
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => navigate('/badges')}
          className="text-gray-400 flex flex-col items-center"
        >
          <Award className="w-6 h-6" />
          <span className="text-[10px] font-black mt-1 uppercase">Awards</span>
        </motion.button>
        <div className="w-14 h-14 bg-indigo-600 rounded-full -mt-10 border-4 border-[#F8F6FF] flex items-center justify-center shadow-lg shadow-indigo-200">
          <User className="w-6 h-6 text-white" />
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => navigate('/leaderboard')}
          className="text-gray-400 flex flex-col items-center"
        >
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-black mt-1 uppercase">Rank</span>
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => handleQuickAction('daily')}
          className="text-gray-400 flex flex-col items-center"
        >
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-black mt-1 uppercase">Daily</span>
        </motion.button>
      </div>
    </div>
  );
}
