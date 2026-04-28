import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { GraduationCap, Star, Heart, Sparkles } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('Glaiza Felices');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Floating Decorations */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 left-10 text-yellow-400"
      >
        <Star className="w-8 h-8" fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute top-20 right-10 text-pink-400"
      >
        <Heart className="w-10 h-10" fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 left-10 text-purple-400"
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          className="text-center mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600">
            Quiz Fun! 🎉
          </h1>
          <p className="text-gray-600 font-bold mt-2">Let's learn together!</p>
        </motion.div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              👤 Your Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-4 rounded-2xl border-4 border-purple-200 focus:border-purple-400 focus:outline-none transition-all text-lg font-medium"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-4 rounded-2xl border-4 border-pink-200 focus:border-pink-400 focus:outline-none transition-all text-lg font-medium"
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: username && password ? 1.02 : 1 }}
            whileTap={{ scale: username && password ? 0.98 : 1 }}
            type="submit"
            disabled={!username || !password}
            className={`w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all ${
              username && password
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {username && password ? '🚀 Let\'s Go!' : '✋ Fill the form first!'}
          </motion.button>
        </form>

        {/* Helper Text */}
        <p className="text-sm text-gray-500 text-center mt-4">
          🌟 New here? Just type any name and password!
        </p>
      </motion.div>
    </div>
  );
}
