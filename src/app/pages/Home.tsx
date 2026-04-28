import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calculator, Microscope, LogOut, User, Star, Clock, Trophy } from 'lucide-react';
import { quizService, QuizScore } from '../data/quizService';

const subjects = [
  {
    name: 'English',
    icon: BookOpen,
    gradient: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-100',
    emoji: '📚'
  },
  {
    name: 'Math',
    icon: Calculator,
    gradient: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-100',
    emoji: '🔢'
  },
  {
    name: 'Science',
    icon: Microscope,
    gradient: 'from-green-400 to-green-600',
    bgColor: 'bg-green-100',
    emoji: '🔬'
  },
];

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [leaderboardTab, setLeaderboardTab] = useState<'subjects' | 'overall'>('subjects');
  const [userScores, setUserScores] = useState<QuizScore[]>([]);
  const navigate = useNavigate();
  
  // Set default username if not exists
  useEffect(() => {
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', 'Glaiza Felices');
    }
  }, []);

  const username = localStorage.getItem('username') || 'Glaiza Felices';

  useEffect(() => {
    const scores = quizService.getUserScores(username);
    setUserScores(scores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [username]);

  const handleStart = () => {
    if (selectedGrade && selectedSubject) {
      navigate(`/quiz?grade=${selectedGrade}&subject=${selectedSubject}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Mock Database of users for Leaderboard
  const allUsers = [
    { name: 'Alex Rivera', avatar: '👨‍🎓', basePoints: 2500 },
    { name: 'Sarah Chen', avatar: '👩‍🎓', basePoints: 2400 },
    { name: 'Liam Wilson', avatar: '👨‍🔬', basePoints: 2300 },
    { name: 'Emma Stone', avatar: '👩‍🎨', basePoints: 2200 },
    { name: 'Glaiza Felices', avatar: '👧', basePoints: 2100 },
    { name: 'James Bond', avatar: '🕵️', basePoints: 2000 },
    { name: 'Peter Parker', avatar: '🕷️', basePoints: 1900 },
    { name: 'Tony Stark', avatar: '🤖', basePoints: 1800 },
    { name: 'Bruce Wayne', avatar: '🦇', basePoints: 1700 },
    { name: 'Clark Kent', avatar: '🦸', basePoints: 1600 },
    { name: 'Diana Prince', avatar: '👸', basePoints: 1500 },
    { name: 'Barry Allen', avatar: '⚡', basePoints: 1400 },
  ];

  // Generate dynamic leaderboard based on selection
  const getLeaderboardData = () => {
    // Deterministic shuffle/scoring based on selection
    const seed = (selectedGrade || 0) + (selectedSubject?.length || 0);
    return [...allUsers]
      .map(user => ({
        ...user,
        // Add some variation based on grade/subject
        points: user.basePoints + (seed * 10) + (Math.sin(user.basePoints + seed) * 200),
        score: `${Math.floor(90 + (Math.sin(seed + user.basePoints) * 10))}%`
      }))
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  };

  const currentLeaderboard = getLeaderboardData();
  const top10 = currentLeaderboard.slice(0, 10);
  
  // Get subject stars for the selected grade (or default)
  const subjectBest = subjects.map(s => {
    const seed = (selectedGrade || 1) + s.name.length;
    const bestUser = allUsers[seed % allUsers.length];
    return {
      subject: s.name,
      user: bestUser.name,
      avatar: bestUser.avatar,
      score: `${Math.floor(95 + (Math.sin(seed) * 4))}%`
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-4 pb-safe">
      <div className="max-w-md mx-auto">
        {/* User Profile Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-4 mb-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
                <span className="text-2xl">👧</span>
              </div>
              <div>
                <p className="font-black text-lg">👋 Hi, {username}!</p>
                <p className="text-sm opacity-90 font-semibold">Ready to be #1 today?</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute top-4 right-4 text-yellow-400"
          >
            <Star className="w-8 h-8" fill="currentColor" />
          </motion.div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            Quiz Master! 🏆
          </h1>
          <p className="text-gray-700 font-bold">
            Aim for the top spot on the leaderboard! 🚀
          </p>
        </motion.div>

        {/* Progress Section */}
        {userScores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Your Recent Scores
              </h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {userScores.slice(0, 5).map((score, index) => (
                <motion.div
                  key={score.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[150px] snap-start bg-white p-4 rounded-3xl shadow-lg border-2 border-purple-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">
                      GRADE {score.grade}
                    </span>
                  </div>
                  <h4 className="font-black text-gray-800 text-xs mb-1 truncate">{score.subject}</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-purple-600">{score.score}</span>
                    <span className="text-[10px] font-bold text-gray-400">/ {score.total}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Leaderboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-5 mb-6 shadow-xl border-2 border-yellow-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-black text-gray-800">Leaderboards</h3>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-2xl mb-4">
            <button
              onClick={() => setLeaderboardTab('subjects')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                leaderboardTab === 'subjects' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Subject Stars
            </button>
            <button
              onClick={() => setLeaderboardTab('overall')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                leaderboardTab === 'overall' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {selectedGrade || selectedSubject ? 'Filtered Rankings' : 'Top 10 Overall'}
            </button>
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-hide">
            {/* Active Filters Info */}
            {(selectedGrade || selectedSubject) && leaderboardTab === 'overall' && (
              <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-[10px] font-black text-purple-600 uppercase">Showing:</span>
                <span className="text-[10px] font-bold text-gray-600">
                  {selectedGrade ? `Grade ${selectedGrade}` : 'All Grades'} 
                  {selectedSubject ? ` • ${selectedSubject}` : ''}
                </span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {leaderboardTab === 'subjects' ? (
                <motion.div
                  key="subjects"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-3"
                >
                  {subjectBest.map((item) => (
                    <motion.div
                      key={item.subject}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-yellow-50 transition-colors border border-transparent hover:border-yellow-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.avatar}</span>
                        <div>
                          <p className="text-[10px] font-black text-purple-600 uppercase tracking-wider">{item.subject}</p>
                          <p className="text-sm font-bold text-gray-800">{item.user}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-pink-600">{item.score}</p>
                        <div className="flex items-center gap-0.5 justify-end">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="overall"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-2"
                >
                  {top10.map((item) => (
                    <div
                      key={item.rank}
                      className={`flex items-center justify-between p-2 rounded-xl ${
                        item.name === username ? 'bg-purple-50 border border-purple-200' : 'bg-white border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black ${
                          item.rank === 1 ? 'bg-yellow-400 text-white' :
                          item.rank === 2 ? 'bg-gray-300 text-white' :
                          item.rank === 3 ? 'bg-orange-400 text-white' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {item.rank}
                        </span>
                        <span className="text-xl">{item.avatar}</span>
                        <span className={`text-sm font-bold ${item.name === username ? 'text-purple-700' : 'text-gray-700'}`}>
                          {item.name}
                          {item.name === username && " (You)"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-purple-600">{Math.floor(item.points).toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">pts</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-black text-gray-800 mb-3 px-1">📖 Start a New Quiz</h3>
          <div className="grid grid-cols-3 gap-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <motion.button
                  key={subject.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSubject(subject.name)}
                  className={`p-4 rounded-3xl transition-all shadow-lg ${
                    selectedSubject === subject.name
                      ? `${subject.bgColor} ring-4 ring-offset-2 ring-purple-400 shadow-xl`
                      : 'bg-white hover:shadow-xl'
                  }`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${subject.gradient} rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {/* <p className="text-2xl mb-1">{subject.emoji}</p> */}
                  <p className="text-xs font-bold text-gray-700">{subject.name}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Grade Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <h2 className="text-lg font-black text-gray-800 mb-4">🎯 Select Grade</h2>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <motion.button
                key={grade}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGrade(grade)}
                className={`py-5 px-4 rounded-2xl font-black text-xl transition-all shadow-lg ${
                  selectedGrade === grade
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white ring-4 ring-yellow-300 shadow-xl'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:shadow-xl'
                }`}
              >
                {grade}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: selectedGrade && selectedSubject ? 1.02 : 1 }}
            whileTap={{ scale: selectedGrade && selectedSubject ? 0.98 : 1 }}
            onClick={handleStart}
            disabled={!selectedGrade || !selectedSubject}
            className={`w-full py-5 rounded-3xl font-black text-xl transition-all shadow-xl ${
              selectedGrade && selectedSubject
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:shadow-2xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedGrade && selectedSubject ? '🚀 Let\'s Go!' : '👆 Pick Grade & Subject'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
