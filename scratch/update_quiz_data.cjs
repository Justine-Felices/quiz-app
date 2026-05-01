const fs = require('fs');

const content = fs.readFileSync('src/app/data/quizData.ts', 'utf8');

const updatedContent = content.replace(/imageEmoji: '.*?'\n  \}/g, (match) => {
    return `${match.replace('\n  }', '')},\n    reasoningOptions: [\n      'This is the correct logical choice based on facts.',\n      'It just seemed like the right answer at the time.',\n      'I remember seeing this in a book once.',\n      'I am not sure, i just guessed'\n    ],\n    correctReasoning: 0\n  }`;
});

// Also fix those without imageEmoji if any
const finalContent = updatedContent.replace(/subject: '.*?'\n  \}/g, (match) => {
    if (match.includes('reasoningOptions')) return match;
    return `${match.replace('\n  }', '')},\n    reasoningOptions: [\n      'This is the correct logical choice based on facts.',\n      'It just seemed like the right answer at the time.',\n      'I remember seeing this in a book once.',\n      'I am not sure, i just guessed'\n    ],\n    correctReasoning: 0\n  }`;
});

fs.writeFileSync('src/app/data/quizData.ts', finalContent);
console.log('Updated quizData.ts with default reasoning options.');
