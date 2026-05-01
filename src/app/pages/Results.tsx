import { useSearchParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { RotateCcw, Home, Trophy, Star, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const score = Number(searchParams.get('score')) || 0;
  const total = Number(searchParams.get('total')) || 0;
  const grade = searchParams.get('grade') || '';
  const subject = searchParams.get('subject') || '';
  const username = localStorage.getItem('username') || 'Student';

  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const getMessage = () => {
    if (percentage >= 90) return { text: '🌟 Amazing! You\'re a superstar!', color: 'from-yellow-400 to-orange-400', emoji: '🏆' };
    if (percentage >= 75) return { text: '🎉 Awesome job! Keep it up!', color: 'from-green-400 to-emerald-500', emoji: '🎊' };
    if (percentage >= 60) return { text: '👍 Great effort! You\'re learning!', color: 'from-blue-400 to-cyan-500', emoji: '💪' };
    if (percentage >= 40) return { text: '💪 Good try! Practice makes perfect!', color: 'from-purple-400 to-pink-400', emoji: '⭐' };
    return { text: '🌈 Keep practicing! You can do it!', color: 'from-pink-400 to-rose-400', emoji: '🌟' };
  };

  const message = getMessage();

  const handlePlayAgain = () => {
    navigate(`/quiz?grade=${grade}&subject=${subject}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4 pb-safe flex items-center justify-center relative overflow-hidden">
      {/* Floating Confetti */}
      {showConfetti && (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
              className="absolute text-3xl"
            >
              {['⭐', '🎉', '🎈', '✨', '🌟'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative z-10"
      >
        {/* Trophy Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="mb-6"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`inline-block p-6 rounded-full bg-gradient-to-br ${message.color} shadow-2xl`}
          >
            <Trophy className="w-16 h-16 text-white" />
          </motion.div>
        </motion.div>

        {/* Circular Score */}
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${message.color} flex items-center justify-center shadow-2xl ring-8 ring-white`}
          >
            <div className="text-center">
              <div className="text-white text-sm font-black mb-1">Your Score</div>
              <div className="text-white text-4xl font-black">
                {score}/{total}
              </div>
              <div className="text-white text-xl font-black mt-1">{percentage}%</div>
            </div>
          </motion.div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.5 + (i * 0.1),
                type: "spring"
              }}
            >
              <Star
                className={`w-8 h-8 ${
                  i < Math.round(percentage / 20)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Congratulation Message */}
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
          Congratulations! 🎉
        </h1>
        <p className="text-gray-700 font-bold text-lg mb-6">
          {message.text}
        </p>

        {/* Subject & Grade Info */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="px-4 py-2 bg-purple-100 rounded-full border-2 border-purple-300">
            <span className="font-black text-purple-700">Grade {grade}</span>
          </div>
          <div className="px-4 py-2 bg-pink-100 rounded-full border-2 border-pink-300">
            <span className="font-black text-pink-700">{subject}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlayAgain}
            className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
             Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleHome}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
             Back to Home
          </motion.button>
        </div>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-full border-2 border-yellow-300">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <p className="font-black text-gray-700 text-sm">
              {percentage >= 75
                ? "You're doing amazing! Keep learning!"
                : "Practice makes perfect! Try again!"}
            </p>
            <Sparkles className="w-4 h-4 text-pink-600" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
