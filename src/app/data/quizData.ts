export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  grade: number;
  subject: 'English' | 'Math' | 'Science';
  imageEmoji?: string;
}

export const quizQuestions: Question[] = [
  // Grade 1 - English
  {
    id: 'g1-eng-1',
    question: 'What letter does "Apple" start with?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 1,
    explanation: 'Apple starts with the letter A! 🍎',
    grade: 1,
    subject: 'English',
    imageEmoji: '🍎'
  },
  {
    id: 'g1-eng-2',
    question: 'Which word rhymes with "cat"?',
    options: ['dog', 'hat', 'cow', 'pig'],
    correctAnswer: 1,
    explanation: 'Hat rhymes with cat! They both end in "at"! 🎩',
    grade: 1,
    subject: 'English',
    imageEmoji: '🐱'
  },
  {
    id: 'g1-eng-3',
    question: 'How many letters are in the word "dog"?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'Dog has 3 letters: d-o-g! 🐕',
    grade: 1,
    subject: 'English',
    imageEmoji: '🐕'
  },

  // Grade 1 - Math
  {
    id: 'g1-math-1',
    question: 'What is 2 + 3?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: 'Great! 2 + 3 = 5. Count on your fingers! ✋',
    grade: 1,
    subject: 'Math',
    imageEmoji: '✋'
  },
  {
    id: 'g1-math-2',
    question: 'If you have 4 apples and eat 1, how many are left?',
    options: ['3', '4', '5', '2'],
    correctAnswer: 0,
    explanation: '4 - 1 = 3 apples left! Yummy! 🍎',
    grade: 1,
    subject: 'Math',
    imageEmoji: '🍎'
  },
  {
    id: 'g1-math-3',
    question: 'Which number comes after 5?',
    options: ['4', '6', '7', '3'],
    correctAnswer: 1,
    explanation: '6 comes after 5! Keep counting! 🔢',
    grade: 1,
    subject: 'Math',
    imageEmoji: '🔢'
  },

  // Grade 1 - Science
  {
    id: 'g1-sci-1',
    question: 'What does a plant need to grow?',
    options: ['toys', 'water', 'shoes', 'cars'],
    correctAnswer: 1,
    explanation: 'Plants need water to grow big and strong! 💧🌱',
    grade: 1,
    subject: 'Science',
    imageEmoji: '🌱'
  },
  {
    id: 'g1-sci-2',
    question: 'What animal says "meow"?',
    options: ['dog', 'cat', 'cow', 'duck'],
    correctAnswer: 1,
    explanation: 'Cats say meow! 🐱',
    grade: 1,
    subject: 'Science',
    imageEmoji: '🐱'
  },
  {
    id: 'g1-sci-3',
    question: 'What color is the sun?',
    options: ['blue', 'green', 'yellow', 'purple'],
    correctAnswer: 2,
    explanation: 'The sun is bright yellow! ☀️',
    grade: 1,
    subject: 'Science',
    imageEmoji: '☀️'
  },

  // Grade 3 - English
  {
    id: 'g3-eng-1',
    question: 'What is a noun?',
    options: ['An action word', 'A person, place, or thing', 'A describing word', 'A number'],
    correctAnswer: 1,
    explanation: 'A noun is a person, place, or thing! Like "teacher", "school", or "book"! 📚',
    grade: 3,
    subject: 'English',
    imageEmoji: '📚'
  },
  {
    id: 'g3-eng-2',
    question: 'Which word is a verb?',
    options: ['happy', 'jump', 'blue', 'cat'],
    correctAnswer: 1,
    explanation: 'Jump is a verb because it shows an action! 🏃',
    grade: 3,
    subject: 'English',
    imageEmoji: '🏃'
  },
  {
    id: 'g3-eng-3',
    question: 'What is the plural of "child"?',
    options: ['childs', 'children', 'childes', 'child'],
    correctAnswer: 1,
    explanation: 'The plural of child is "children"! 👶👶',
    grade: 3,
    subject: 'English',
    imageEmoji: '👶'
  },

  // Grade 3 - Math
  {
    id: 'g3-math-1',
    question: 'What is 7 × 8?',
    options: ['54', '56', '58', '60'],
    correctAnswer: 1,
    explanation: '7 × 8 = 56! Great multiplication! ✨',
    grade: 3,
    subject: 'Math',
    imageEmoji: '✨'
  },
  {
    id: 'g3-math-2',
    question: 'What is 1/2 + 1/2?',
    options: ['1/4', '2/4', '1', '2'],
    correctAnswer: 2,
    explanation: '1/2 + 1/2 = 1 whole! Two halves make one! 🍕',
    grade: 3,
    subject: 'Math',
    imageEmoji: '🍕'
  },
  {
    id: 'g3-math-3',
    question: 'If a rectangle has a length of 5 and width of 3, what is its area?',
    options: ['8', '15', '10', '12'],
    correctAnswer: 1,
    explanation: 'Area = length × width, so 5 × 3 = 15! 📐',
    grade: 3,
    subject: 'Math',
    imageEmoji: '📐'
  },

  // Grade 3 - Science
  {
    id: 'g3-sci-1',
    question: 'What are the three states of matter?',
    options: ['Hot, warm, cold', 'Solid, liquid, gas', 'Big, medium, small', 'Fast, slow, stop'],
    correctAnswer: 1,
    explanation: 'The three states of matter are solid, liquid, and gas! 🧊💧☁️',
    grade: 3,
    subject: 'Science',
    imageEmoji: '🧊'
  },
  {
    id: 'g3-sci-2',
    question: 'What does a thermometer measure?',
    options: ['weight', 'temperature', 'time', 'distance'],
    correctAnswer: 1,
    explanation: 'A thermometer measures temperature! 🌡️',
    grade: 3,
    subject: 'Science',
    imageEmoji: '🌡️'
  },
  {
    id: 'g3-sci-3',
    question: 'What do bees make?',
    options: ['milk', 'honey', 'eggs', 'bread'],
    correctAnswer: 1,
    explanation: 'Bees make delicious honey! 🐝🍯',
    grade: 3,
    subject: 'Science',
    imageEmoji: '🐝'
  },

  // Grade 5 - English
  {
    id: 'g5-eng-1',
    question: 'What is a synonym for "happy"?',
    options: ['sad', 'joyful', 'angry', 'tired'],
    correctAnswer: 1,
    explanation: 'Joyful means the same as happy! They are synonyms! 😊',
    grade: 5,
    subject: 'English',
    imageEmoji: '😊'
  },
  {
    id: 'g5-eng-2',
    question: 'Which sentence uses correct punctuation?',
    options: [
      'where are you going',
      'Where are you going?',
      'where are you going.',
      'Where are you going'
    ],
    correctAnswer: 1,
    explanation: 'Questions need to start with a capital letter and end with a question mark! ❓',
    grade: 5,
    subject: 'English',
    imageEmoji: '❓'
  },
  {
    id: 'g5-eng-3',
    question: 'What is the main idea of a story?',
    options: [
      'The title',
      'The most important point or message',
      'The first sentence',
      'The author\'s name'
    ],
    correctAnswer: 1,
    explanation: 'The main idea is the most important point the author wants to share! 📖',
    grade: 5,
    subject: 'English',
    imageEmoji: '📖'
  },

  // Grade 5 - Math
  {
    id: 'g5-math-1',
    question: 'What is 15% of 200?',
    options: ['20', '25', '30', '35'],
    correctAnswer: 2,
    explanation: '15% of 200 = 0.15 × 200 = 30! Great job! 💯',
    grade: 5,
    subject: 'Math',
    imageEmoji: '💯'
  },
  {
    id: 'g5-math-2',
    question: 'If a train travels 60 miles in 2 hours, what is its average speed?',
    options: ['20 mph', '25 mph', '30 mph', '35 mph'],
    correctAnswer: 2,
    explanation: 'Speed = distance ÷ time, so 60 ÷ 2 = 30 mph! 🚂',
    grade: 5,
    subject: 'Math',
    imageEmoji: '🚂'
  },
  {
    id: 'g5-math-3',
    question: 'What is the value of 2³ (2 cubed)?',
    options: ['6', '8', '9', '4'],
    correctAnswer: 1,
    explanation: '2³ = 2 × 2 × 2 = 8! Excellent! 🎲',
    grade: 5,
    subject: 'Math',
    imageEmoji: '🎲'
  },

  // Grade 5 - Science
  {
    id: 'g5-sci-1',
    question: 'What is photosynthesis?',
    options: [
      'How animals eat',
      'How plants make food using sunlight',
      'How water evaporates',
      'How rocks form'
    ],
    correctAnswer: 1,
    explanation: 'Photosynthesis is how plants use sunlight to make their own food! 🌿☀️',
    grade: 5,
    subject: 'Science',
    imageEmoji: '🌿'
  },
  {
    id: 'g5-sci-2',
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Jupiter is the largest planet! It\'s a gas giant! 🪐',
    grade: 5,
    subject: 'Science',
    imageEmoji: '🪐'
  },
  {
    id: 'g5-sci-3',
    question: 'What are the building blocks of all living things?',
    options: ['atoms', 'cells', 'molecules', 'organs'],
    correctAnswer: 1,
    explanation: 'Cells are the building blocks of all living things! 🔬',
    grade: 5,
    subject: 'Science',
    imageEmoji: '🔬'
  },
];

export function getQuestionsByGradeAndSubject(grade: number, subject: string): Question[] {
  // For grades 1-2, use grade 1 questions
  // For grades 3-4, use grade 3 questions
  // For grades 5-6, use grade 5 questions
  let targetGrade = grade;
  if (grade <= 2) targetGrade = 1;
  else if (grade <= 4) targetGrade = 3;
  else targetGrade = 5;

  const filtered = quizQuestions.filter(
    q => q.grade === targetGrade && q.subject === subject
  );
  
  // Return up to 10 questions, shuffled
  return filtered.sort(() => Math.random() - 0.5).slice(0, 10);
}
