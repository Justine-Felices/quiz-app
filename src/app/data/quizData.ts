export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  reasoningOptions: string[];
  correctReasoning: number;
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
    imageEmoji: '🍎',
    reasoningOptions: [
      'Because the word "Apple" begins with the letter \'A\' phonetically',
      'Because \'B\' is the first letter of the whole alphabet',
      'Because apples are red and the letter \'A\' is also red',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g1-eng-2',
    question: 'Which word rhymes with "cat"?',
    options: ['dog', 'hat', 'cow', 'pig'],
    correctAnswer: 1,
    explanation: 'Hat rhymes with cat! They both end in "at"! 🎩',
    grade: 1,
    subject: 'English',
    imageEmoji: '🐱',
    reasoningOptions: [
      'Because "hat" and "cat" both share the "-at" sound at the end',
      'Because cats like to wear hats when they go outside',
      'Because both words have three letters in them',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g1-eng-3',
    question: 'How many letters are in the word "dog"?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'Dog has 3 letters: d-o-g! 🐕',
    grade: 1,
    subject: 'English',
    imageEmoji: '🐕',
    reasoningOptions: [
      'Because if you spell it out (D-O-G), there are exactly three individual letters',
      'Because a dog has four legs, so it must have four letters',
      'Because "dog" is a very short word and all short words have 3 letters',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '✋',
    reasoningOptions: [
      'Because when you add 2 items and 3 items together, you get a total of 5 items',
      'Because 2 and 3 are the same as 4 and 6',
      'Because the number 5 is bigger than both 2 and 3',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g1-math-2',
    question: 'If you have 4 apples and eat 1, how many are left?',
    options: ['3', '4', '5', '2'],
    correctAnswer: 0,
    explanation: '4 - 1 = 3 apples left! Yummy! 🍎',
    grade: 1,
    subject: 'Math',
    imageEmoji: '🍎',
    reasoningOptions: [
      'Because taking away one from four leaves three remaining',
      'Because 4 and 1 are the first two numbers in the alphabet',
      'Because eating apples always makes you have more apples later',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g1-math-3',
    question: 'Which number comes after 5?',
    options: ['4', '6', '7', '3'],
    correctAnswer: 1,
    explanation: '6 comes after 5! Keep counting! 🔢',
    grade: 1,
    subject: 'Math',
    imageEmoji: '🔢',
    reasoningOptions: [
      'Because in the standard counting sequence (1, 2, 3, 4, 5, 6), 6 follows 5',
      'Because 4 comes after 5 when you count backwards from ten',
      'Because 6 is a lucky number and luck always comes after 5',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '🌱',
    reasoningOptions: [
      'Because plants need water to stay hydrated and carry out vital growth processes',
      'Because plants use toys to play and grow taller during the night',
      'Because shoes help the plant\'s roots walk deeper into the soil',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g1-sci-2',
    question: 'What animal says "meow"?',
    options: ['dog', 'cat', 'cow', 'duck'],
    correctAnswer: 1,
    explanation: 'Cats say meow! 🐱',
    grade: 1,
    subject: 'Science',
    imageEmoji: '🐱',
    reasoningOptions: [
      'Because "meow" is the specific vocalization made by feline animals like cats',
      'Because dogs say "meow" when they want to be friends with cats',
      'Because cows say "meow" to let us know they want to produce milk',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g1-sci-3',
    question: 'What color is the sun?',
    options: ['blue', 'green', 'yellow', 'purple'],
    correctAnswer: 2,
    explanation: 'The sun is bright yellow! ☀️',
    grade: 1,
    subject: 'Science',
    imageEmoji: '☀️',
    reasoningOptions: [
      'Because the sun emits light that appears bright yellow to our eyes on Earth',
      'Because the sun is actually made of cold blue ice that burns',
      'Because the sun changes color based on what clothes you are wearing',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '📚',
    reasoningOptions: [
      'Because a noun is used to identify a person, place, or thing in a sentence',
      'Because nouns always describe how fast something is moving',
      'Because every word that starts with a capital letter is a noun',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g3-eng-2',
    question: 'Which word is a verb?',
    options: ['happy', 'jump', 'blue', 'cat'],
    correctAnswer: 1,
    explanation: 'Jump is a verb because it shows an action! 🏃',
    grade: 3,
    subject: 'English',
    imageEmoji: '🏃',
    reasoningOptions: [
      'Because "jump" represents a physical movement or action',
      'Because "jump" is a color that describes how someone feels',
      'Because all short words are considered verbs',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g3-eng-3',
    question: 'What is the plural of "child"?',
    options: ['childs', 'children', 'childes', 'child'],
    correctAnswer: 1,
    explanation: 'The plural of child is "children"! 👶👶',
    grade: 3,
    subject: 'English',
    imageEmoji: '👶',
    reasoningOptions: [
      'Because "children" is the irregular plural form of "child"',
      'Because you just add "-s" to every word to make it plural',
      'Because "children" is actually the singular form',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '✨',
    reasoningOptions: [
      'Because 7 multiplied by 8 equals 56 according to multiplication tables',
      'Because 7 + 8 is 15, and 15 times 4 is 56',
      'Because adding 7 and 8 gives you the digits 5 and 6',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g3-math-2',
    question: 'What is 1/2 + 1/2?',
    options: ['1/4', '2/4', '1', '2'],
    correctAnswer: 2,
    explanation: '1/2 + 1/2 = 1 whole! Two halves make one! 🍕',
    grade: 3,
    subject: 'Math',
    imageEmoji: '🍕',
    reasoningOptions: [
      'Because adding two halves of a whole results in one complete whole',
      'Because when adding fractions, you always add both the tops and the bottoms',
      'Because 1/2 + 1/2 is the same as 1 divided by 4',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g3-math-3',
    question: 'If a rectangle has a length of 5 and width of 3, what is its area?',
    options: ['8', '15', '10', '12'],
    correctAnswer: 1,
    explanation: 'Area = length × width, so 5 × 3 = 15! 📐',
    grade: 3,
    subject: 'Math',
    imageEmoji: '📐',
    reasoningOptions: [
      'Because the area of a rectangle is found by multiplying the length (5) by the width (3)',
      'Because you add all four sides together to find the area',
      'Because the area is always just the longest side plus the shortest side',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '🧊',
    reasoningOptions: [
      'Because solid, liquid, and gas are the three primary forms that matter can take',
      'Because matter can only be hot, warm, or cold depending on the sun',
      'Because "big" and "small" are the ways we measure matter\'s weight',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g3-sci-2',
    question: 'What does a thermometer measure?',
    options: ['weight', 'temperature', 'time', 'distance'],
    correctAnswer: 1,
    explanation: 'A thermometer measures temperature! 🌡️',
    grade: 3,
    subject: 'Science',
    imageEmoji: '🌡️',
    reasoningOptions: [
      'Because thermometers are instruments designed to measure thermal energy or temperature',
      'Because you use a thermometer to see how much an object weighs',
      'Because a thermometer tracks how far you have walked in a day',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g3-sci-3',
    question: 'What do bees make?',
    options: ['milk', 'honey', 'eggs', 'bread'],
    correctAnswer: 1,
    explanation: 'Bees make delicious honey! 🐝🍯',
    grade: 3,
    subject: 'Science',
    imageEmoji: '🐝',
    reasoningOptions: [
      'Because honeybees collect nectar from flowers and turn it into honey',
      'Because bees are small cows that produce milk for the hive',
      'Because bees use flour and water to bake bread inside their nests',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '😊',
    reasoningOptions: [
      'Because "joyful" and "happy" express the same feeling of pleasure or contentment',
      'Because "joyful" sounds like "yellow" and yellow is a happy color',
      'Because all words that end in "-ful" mean the same thing as "happy"',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '❓',
    reasoningOptions: [
      'Questions must start with a capital letter and end with a question mark',
      'Sentences always end with a period regardless of the type',
      'Capitalization is optional in informal questions',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '📖',
    reasoningOptions: [
      'Because the main idea captures the central message or lesson the author wants to convey',
      'Because the title always tells you exactly what the whole story is about',
      'Because the first sentence of a book always summarizes everything that follows',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '💯',
    reasoningOptions: [
      'Because 15% of 200 is calculated as 0.15 × 200, which equals 30',
      'Because 15% of 200 is simply 200 divided by 15',
      'Because you just take the number 15 and add it to 200',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g5-math-2',
    question: 'If a train travels 60 miles in 2 hours, what is its average speed?',
    options: ['20 mph', '25 mph', '30 mph', '35 mph'],
    correctAnswer: 2,
    explanation: 'Speed = distance ÷ time, so 60 ÷ 2 = 30 mph! 🚂',
    grade: 5,
    subject: 'Math',
    imageEmoji: '🚂',
    reasoningOptions: [
      'Because average speed is calculated as total distance (60 miles) divided by total time (2 hours)',
      'Because you multiply the distance by the time to get the speed per hour',
      'Because speed is always the same as the total distance traveled regardless of time',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g5-math-3',
    question: 'What is the value of 2³ (2 cubed)?',
    options: ['6', '8', '9', '4'],
    correctAnswer: 1,
    explanation: '2³ = 2 × 2 × 2 = 8! Excellent! 🎲',
    grade: 5,
    subject: 'Math',
    imageEmoji: '🎲',
    reasoningOptions: [
      'Because 2 cubed means multiplying 2 by itself three times: 2 × 2 × 2 = 8',
      'Because you just multiply the base number (2) by the exponent (3) to get 6',
      'Because cubing a number means adding it to itself three times: 2 + 2 + 2 = 6',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
    imageEmoji: '🌿',
    reasoningOptions: [
      'Because plants use sunlight, water, and carbon dioxide to produce food',
      'Because plants release oxygen during breathing',
      'Because plants absorb nutrients from the soil',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g5-sci-2',
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Jupiter is the largest planet! It\'s a gas giant! 🪐',
    grade: 5,
    subject: 'Science',
    imageEmoji: '🪐',
    reasoningOptions: [
      'Because Jupiter is a gas giant and has the greatest mass and diameter among all planets',
      'Because Saturn has the biggest rings, which makes it the largest overall planet',
      'Because Earth is where all living things are, making it the most significant and largest',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
  },
  {
    id: 'g5-sci-3',
    question: 'What are the building blocks of all living things?',
    options: ['atoms', 'cells', 'molecules', 'organs'],
    correctAnswer: 1,
    explanation: 'Cells are the building blocks of all living things! 🔬',
    grade: 5,
    subject: 'Science',
    imageEmoji: '🔬',
    reasoningOptions: [
      'Because cells are the smallest units of life that can perform all life processes',
      'Because atoms are only found in non-living things like rocks and water',
      'Because organs are the smallest parts of a body and aren\'t made of anything else',
      'I am not sure, i just guessed'
    ],
    correctReasoning: 0
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
