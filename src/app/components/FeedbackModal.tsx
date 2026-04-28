import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface FeedbackModalProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  onNext: () => void;
}

export function FeedbackModal({ isCorrect, correctAnswer, explanation, onNext }: FeedbackModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onNext}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={`max-w-md w-full rounded-3xl p-8 text-center shadow-2xl ${
          isCorrect
            ? 'bg-gradient-to-br from-green-100 to-emerald-100'
            : 'bg-gradient-to-br from-orange-100 to-amber-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-4 flex justify-center"
        >
          {isCorrect ? (
            <div className="relative">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 0.5,
                  repeat: 2,
                  delay: 0.3
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </div>
          ) : (
            <XCircle className="w-24 h-24 text-orange-500" />
          )}
        </motion.div>

        <h2 className="text-4xl font-black mb-4">
          {isCorrect ? '🎉 Great Job!' : '💪 Nice Try!'}
        </h2>

        {!isCorrect && (
          <div className="mb-4 p-4 bg-white/70 rounded-2xl border-4 border-white">
            <p className="text-sm font-bold text-gray-600 mb-1">The correct answer is:</p>
            <p className="font-black text-lg text-gray-800">{correctAnswer}</p>
          </div>
        )}

        <div className="mb-6 p-4 bg-white/70 rounded-2xl border-4 border-white">
          <p className="font-bold text-gray-700">{explanation}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className={`px-8 py-4 rounded-2xl font-black text-white text-lg shadow-lg ${
            isCorrect
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
          }`}
        >
          Next Question →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
