import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Question, getQuestionsByGradeAndSubject } from '../data/quizData';
import { FeedbackModal } from '../components/FeedbackModal';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { quizService } from '../data/quizService';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const grade = Number(searchParams.get('grade'));
  const subject = searchParams.get('subject') || '';
  const username = localStorage.getItem('username') || 'Student';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  useEffect(() => {
    const loadedQuestions = getQuestionsByGradeAndSubject(grade, subject);
    if (loadedQuestions.length === 0) {
      navigate('/');
    } else {
      setQuestions(loadedQuestions);
    }
  }, [grade, subject, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions(answeredQuestions + 1);

    setTimeout(() => {
      setShowFeedback(true);
    }, 500);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Save score to "backend"
      quizService.saveScore({
        username,
        grade,
        subject,
        score,
        total: questions.length
      });
      
      navigate(`/results?score=${score}&total=${questions.length}&grade=${grade}&subject=${subject}`);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 pb-safe">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/')}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </motion.button>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="font-black text-purple-600">Grade {grade}</span>
            <span className="text-gray-400">•</span>
            <span className="font-black text-pink-600">{subject}</span>
          </div>

          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-3xl p-4 shadow-xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-black text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-black text-purple-600">
              ⭐ Score: {score}/{answeredQuestions}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-6 mb-4"
          >
            {/* Question */}
            <div className="mb-6 text-center">
              {currentQuestion.imageEmoji && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {currentQuestion.imageEmoji}
                </motion.div>
              )}
              <h2 className="text-xl font-black text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = selectedAnswer !== null;

                let buttonClass = 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-100 hover:to-pink-100 text-gray-800 border-4 border-gray-300';

                if (showResult) {
                  if (isCorrect) {
                    buttonClass = 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-4 border-green-500 ring-4 ring-green-200';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-gradient-to-br from-red-400 to-orange-400 text-white border-4 border-red-500 ring-4 ring-red-200';
                  } else {
                    buttonClass = 'bg-gray-200 text-gray-500 border-4 border-gray-300';
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: selectedAnswer === null ? 1.02 : 1, y: selectedAnswer === null ? -3 : 0 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-2xl font-bold text-left transition-all shadow-lg ${buttonClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center font-black text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback Modal */}
      {showFeedback && selectedAnswer !== null && (
        <FeedbackModal
          isCorrect={selectedAnswer === currentQuestion.correctAnswer}
          correctAnswer={currentQuestion.options[currentQuestion.correctAnswer]}
          explanation={currentQuestion.explanation}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
