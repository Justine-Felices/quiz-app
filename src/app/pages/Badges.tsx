import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Award, Star, Flame, Target, Zap, Shield, Crown, ChevronLeft } from 'lucide-react';

const badges = [
  {
    id: 'starter',
    name: 'First Step',
    description: 'Completed your very first quiz!',
    icon: Star,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    unlocked: true,
    progress: 100
  },
  {
    id: 'streak-3',
    name: 'Fire Starter',
    description: 'Maintained a 3-day streak!',
    icon: Flame,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    unlocked: true,
    progress: 100
  },
  {
    id: 'math-pro',
    name: 'Math Wizard',
    description: 'Score 100% in a Math quiz.',
    icon: Zap,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    unlocked: true,
    progress: 100
  },
  {
    id: 'scholar',
    name: 'Top Scholar',
    description: 'Reach the Top 3 in your grade leaderboard.',
    icon: Crown,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    unlocked: false,
    progress: 60
  },
  {
    id: 'perfect',
    name: 'Perfect 10',
    description: 'Complete 10 quizzes with no mistakes.',
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    unlocked: false,
    progress: 40
  },
  {
    id: 'diligent',
    name: 'Super Diligent',
    description: 'Answer 100 questions correctly.',
    icon: Target,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    unlocked: false,
    progress: 85
  }
];

export default function Badges() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F6FF] pb-10">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">Your Achievements</h1>
          <p className="text-xs font-bold text-gray-500">3 of 6 Badges Collected</p>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-[32px] border-2 transition-all ${
                badge.unlocked 
                  ? 'bg-white border-white shadow-sm' 
                  : 'bg-gray-50/50 border-gray-100 grayscale opacity-70'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl ${badge.bg} flex items-center justify-center shadow-inner`}>
                  <badge.icon className={`w-8 h-8 ${badge.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-gray-800">{badge.name}</h3>
                    {badge.unlocked && (
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Unlocked</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-gray-500 leading-relaxed">{badge.description}</p>
                </div>
              </div>

              {!badge.unlocked && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Progress</span>
                    <span className="text-[10px] font-black text-gray-600">{badge.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Motivational Footer */}
        <div className="mt-10 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-lg font-black text-gray-800 mb-2">Keep going, Champion!</h2>
          <p className="text-sm font-bold text-gray-500 px-6">
            Complete more quizzes to unlock rare badges and climb the ranks!
          </p>
        </div>
      </div>
    </div>
  );
}
