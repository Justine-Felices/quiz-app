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
  const [selectedReasoning, setSelectedReasoning] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadedQuestions = getQuestionsByGradeAndSubject(grade, subject);
    if (loadedQuestions.length === 0) {
      navigate('/');
    } else {
      setQuestions(loadedQuestions);
    }
  }, [grade, subject, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleReasoningClick = (index: number) => {
    if (isSubmitted) return;
    setSelectedReasoning(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || selectedReasoning === null || isSubmitted) return;

    setIsSubmitted(true);
    const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const isReasoningCorrect = selectedReasoning === currentQuestion.correctReasoning;

    if (isAnswerCorrect && isReasoningCorrect) {
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
    setSelectedReasoning(null);
    setIsSubmitted(false);

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

  const progress = (answeredQuestions / questions.length) * 100;

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
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = isSubmitted;

                let buttonClass = 'bg-white text-gray-800 border-2 border-gray-100 hover:border-purple-200';

                if (isSelected) {
                  buttonClass = 'bg-purple-50 text-purple-700 border-2 border-purple-500 shadow-md ring-2 ring-purple-100';
                }

                if (showResult) {
                  if (isCorrect) {
                    buttonClass = 'bg-green-50 text-green-700 border-2 border-green-500';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-50 text-red-700 border-2 border-red-500';
                  } else {
                    buttonClass = 'bg-gray-50 text-gray-400 border-2 border-gray-100 opacity-60';
                  }
                }

                return (
                  <motion.button
                    key={`ans-${index}`}
                    whileHover={{ scale: !isSubmitted ? 1.01 : 1 }}
                    whileTap={{ scale: !isSubmitted ? 0.99 : 1 }}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-2xl font-bold text-left transition-all flex items-center gap-3 ${buttonClass}`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Reasoning Section */}
            <div className="mb-8">
              <div className="flex flex-col mb-4">
                <h3 className="text-emerald-600 font-black text-lg">Reasoning</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Why did you choose your answer?</p>
              </div>
              <div className="space-y-3">
                {currentQuestion.reasoningOptions.map((option, index) => {
                  const isSelected = selectedReasoning === index;
                  const isCorrect = index === currentQuestion.correctReasoning;
                  const showResult = isSubmitted;

                  let buttonClass = 'bg-white text-gray-700 border-2 border-gray-100 hover:border-emerald-200';

                  if (isSelected) {
                    buttonClass = 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-100';
                  }

                  if (showResult) {
                    if (isCorrect) {
                      buttonClass = 'bg-green-50 text-green-700 border-2 border-green-500';
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'bg-red-50 text-red-700 border-2 border-red-500';
                    } else {
                      buttonClass = 'bg-gray-50 text-gray-400 border-2 border-gray-100 opacity-60';
                    }
                  }

                  return (
                    <motion.button
                      key={`reason-${index}`}
                      whileHover={{ scale: !isSubmitted ? 1.01 : 1 }}
                      whileTap={{ scale: !isSubmitted ? 0.99 : 1 }}
                      onClick={() => handleReasoningClick(index)}
                      disabled={isSubmitted}
                      className={`w-full p-3 rounded-xl font-medium text-sm text-left transition-all ${buttonClass}`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            {!isSubmitted && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={selectedAnswer === null || selectedReasoning === null}
                className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all ${
                  selectedAnswer !== null && selectedReasoning !== null
                    ? 'bg-emerald-600 text-white shadow-emerald-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback Modal */}
      {showFeedback && selectedAnswer !== null && selectedReasoning !== null && (
        <FeedbackModal
          isCorrect={selectedAnswer === currentQuestion.correctAnswer && selectedReasoning === currentQuestion.correctReasoning}
          isAnswerCorrect={selectedAnswer === currentQuestion.correctAnswer}
          isReasoningCorrect={selectedReasoning === currentQuestion.correctReasoning}
          correctAnswer={currentQuestion.options[currentQuestion.correctAnswer]}
          correctReasoning={currentQuestion.reasoningOptions[currentQuestion.correctReasoning]}
          explanation={currentQuestion.explanation}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
