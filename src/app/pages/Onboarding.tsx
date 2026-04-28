import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, GraduationCap, Star, Rocket, Target } from 'lucide-react';

const steps = [
  {
    id: 'name',
    title: "What's your name, hero?",
    subtitle: "Every great journey starts with a name!",
    icon: Star,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50'
  },
  {
    id: 'grade',
    title: "Choose your level!",
    subtitle: "Select your grade to unlock your learning world.",
    icon: GraduationCap,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  {
    id: 'goal',
    title: "What's your goal today?",
    subtitle: "We'll help you reach your stars!",
    icon: Target,
    color: 'text-pink-500',
    bg: 'bg-pink-50'
  }
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(localStorage.getItem('username') || '');
  const [grade, setGrade] = useState<number | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('username', name);
      localStorage.setItem('userGrade', grade?.toString() || '4');
      localStorage.setItem('onboardingComplete', 'true');
      navigate('/');
    }
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-[#F8F6FF] flex flex-col p-6">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-12 overflow-hidden flex">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 h-full transition-all duration-500 ${
              i <= step ? 'bg-indigo-600' : 'bg-transparent'
            }`} 
          />
        ))}
      </div>

      <div className="flex-1 max-w-md mx-auto w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className={`w-20 h-20 ${currentStep.bg} rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-white/50`}>
              <currentStep.icon className={`w-10 h-10 ${currentStep.color}`} />
            </div>
            
            <h1 className="text-3xl font-black text-gray-800 mb-2">{currentStep.title}</h1>
            <p className="text-gray-500 font-bold mb-10">{currentStep.subtitle}</p>

            {/* Step Content */}
            <div className="min-h-[250px]">
              {step === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your hero name..."
                    className="w-full px-6 py-5 rounded-3xl border-4 border-indigo-100 focus:border-indigo-400 focus:outline-none transition-all text-xl font-black text-center"
                    autoFocus
                  />
                  <p className="mt-4 text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    You can use a nickname!
                  </p>
                </motion.div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <motion.button
                      key={g}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGrade(g)}
                      className={`h-24 rounded-3xl font-black text-2xl transition-all shadow-lg ${
                        grade === g
                          ? 'bg-indigo-600 text-white shadow-indigo-200 ring-4 ring-offset-2 ring-indigo-400'
                          : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <span className="block text-[10px] uppercase opacity-50 mb-1">Grade</span>
                      {g}
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {[
                    { id: 'smart', label: 'Get Smarter!', icon: '🧠' },
                    { id: 'stars', label: 'Earn 1000 Stars', icon: '⭐' },
                    { id: 'top', label: 'Be #1 in my class', icon: '🏆' },
                  ].map((g) => (
                    <motion.button
                      key={g.id}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setGoal(g.id)}
                      className={`w-full p-5 rounded-3xl flex items-center justify-between transition-all border-2 ${
                        goal === g.id
                          ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                          : 'bg-white border-gray-100 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{g.icon}</span>
                        <span className="font-black text-gray-700">{g.label}</span>
                      </div>
                      {goal === g.id && <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-md mx-auto w-full pt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={
            (step === 0 && !name.trim()) ||
            (step === 1 && grade === null) ||
            (step === 2 && goal === null)
          }
          className={`w-full py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-xl ${
            ((step === 0 && name.trim()) || (step === 1 && grade !== null) || (step === 2 && goal !== null))
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-100'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === steps.length - 1 ? "Let's Blast Off!" : "Next Step"}
          {step === steps.length - 1 ? <Rocket className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </motion.button>
      </div>
    </div>
  );
}
