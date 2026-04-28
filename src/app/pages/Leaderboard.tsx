import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Trophy, Crown, ChevronLeft, Star, TrendingUp, Users, Medal } from 'lucide-react';

const rankings = [
  { rank: 1, name: 'Alex Rivera', avatar: '👨‍🎓', points: 2850, stars: 142, trend: 'up' },
  { rank: 2, name: 'Sarah Chen', avatar: '👩‍🎓', points: 2720, stars: 136, trend: 'same' },
  { rank: 3, name: 'Liam Wilson', avatar: '👨‍🔬', points: 2540, stars: 127, trend: 'down' },
  { rank: 4, name: 'Emma Stone', avatar: '👩‍🎨', points: 2410, stars: 120, trend: 'up' },
  { rank: 5, name: 'Glaiza Felices', avatar: '👧', points: 2380, stars: 119, trend: 'up', isUser: true },
  { rank: 6, name: 'James Bond', avatar: '🕵️', points: 2250, stars: 112, trend: 'same' },
  { rank: 7, name: 'Peter Parker', avatar: '🕷️', points: 2100, stars: 105, trend: 'down' },
  { rank: 8, name: 'Tony Stark', avatar: '🤖', points: 2050, stars: 102, trend: 'up' },
];

export default function Leaderboard() {
  const [category, setCategory] = useState<'grade' | 'subject' | 'overall'>('grade');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F6FF] pb-10">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-20 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">Leaderboards</h1>
        </div>
        <Users className="w-6 h-6 text-indigo-500" />
      </div>

      <div className="p-6 max-w-md mx-auto">
        {/* Category Tabs */}
        <div className="flex p-1 bg-white rounded-3xl mb-8 shadow-sm border border-gray-100">
          {[
            { id: 'grade', label: 'My Grade' },
            { id: 'subject', label: 'Subjects' },
            { id: 'overall', label: 'Overall' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id as any)}
              className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-tight transition-all ${
                category === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-2 mb-12 px-2 h-48">
          {/* 2nd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 bg-white rounded-full mb-2 flex items-center justify-center text-2xl border-4 border-gray-100 shadow-md">🥈</div>
            <div className="w-24 h-24 bg-white rounded-t-3xl flex flex-col items-center justify-center border-x border-t border-gray-100 shadow-sm relative">
              <span className="text-xs font-black text-gray-700">Sarah</span>
              <span className="text-[10px] font-bold text-gray-400">2,720 pts</span>
              <div className="absolute -bottom-1 w-12 h-1 bg-gray-200 rounded-full" />
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center z-10"
          >
            <Crown className="w-8 h-8 text-yellow-500 mb-1 animate-bounce" />
            <div className="w-20 h-20 bg-white rounded-full mb-2 flex items-center justify-center text-4xl border-4 border-yellow-200 shadow-xl ring-8 ring-yellow-50">🥇</div>
            <div className="w-28 h-32 bg-gradient-to-b from-white to-yellow-50 rounded-t-3xl flex flex-col items-center justify-center border-x border-t border-yellow-100 shadow-lg relative">
              <span className="text-sm font-black text-yellow-800">Alex</span>
              <span className="text-xs font-bold text-yellow-600">2,850 pts</span>
              <div className="absolute -bottom-1 w-16 h-1.5 bg-yellow-400 rounded-full" />
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 bg-white rounded-full mb-2 flex items-center justify-center text-2xl border-4 border-orange-50 shadow-md">🥉</div>
            <div className="w-24 h-20 bg-white rounded-t-3xl flex flex-col items-center justify-center border-x border-t border-orange-50 shadow-sm relative">
              <span className="text-xs font-black text-orange-800">Liam</span>
              <span className="text-[10px] font-bold text-orange-400">2,540 pts</span>
              <div className="absolute -bottom-1 w-12 h-1 bg-orange-200 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Full List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-4 mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Points</span>
          </div>
          {rankings.map((user, index) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-[24px] flex items-center justify-between transition-all ${
                user.isUser 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 ring-4 ring-indigo-50' 
                  : 'bg-white border border-gray-100 hover:border-indigo-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                  user.isUser ? 'bg-white/20' : 'bg-gray-100 text-gray-400'
                }`}>
                  {user.rank}
                </div>
                <div className="text-xl">{user.avatar}</div>
                <div>
                  <h4 className="font-black text-sm">{user.name} {user.isUser && "(You)"}</h4>
                  <div className="flex items-center gap-1">
                    <Star className={`w-3 h-3 ${user.isUser ? 'fill-white text-white' : 'fill-yellow-400 text-yellow-400'}`} />
                    <span className={`text-[10px] font-bold ${user.isUser ? 'text-indigo-100' : 'text-gray-400'}`}>{user.stars} Stars</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-black text-lg">{user.points.toLocaleString()}</p>
                <div className="flex items-center justify-end gap-1">
                  {user.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${user.isUser ? 'text-indigo-200' : 'text-gray-400'}`}>Points</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational Card */}
        <div className="mt-8 bg-indigo-50 rounded-[32px] p-6 flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">🚀</div>
          <div>
            <h4 className="font-black text-indigo-900 leading-tight">Climbing Fast!</h4>
            <p className="text-xs font-bold text-indigo-600 mt-1">You moved up 2 spots this week. Only 63 points to catch Liam!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
