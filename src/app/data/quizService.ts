export interface QuizScore {
  id: string;
  username: string;
  grade: number;
  subject: string;
  score: number;
  total: number;
  date: string;
}

const STORAGE_KEY = 'quiz_scores';

export const quizService = {
  saveScore: (scoreData: Omit<QuizScore, 'id' | 'date'>): QuizScore => {
    const scores = quizService.getScores();
    const newScore: QuizScore = {
      ...scoreData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    
    scores.push(newScore);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return newScore;
  },

  getScores: (): QuizScore[] => {
    const scoresJson = localStorage.getItem(STORAGE_KEY);
    return scoresJson ? JSON.parse(scoresJson) : [];
  },

  getUserScores: (username: string): QuizScore[] => {
    return quizService.getScores().filter(s => s.username === username);
  },

  getLatestScore: (username: string): QuizScore | null => {
    const userScores = quizService.getUserScores(username);
    if (userScores.length === 0) return null;
    return userScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }
};
