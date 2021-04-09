// this module will be used to ask questions in console

const readline = require('readline');

// init the console interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (questionText) => {
  // with this promise the run will pause until the answer
  return new Promise((resolve) => {
    rl.question(questionText, (answer) => {
      resolve(answer);
      rl.pause();
    });
  });
};

module.exports = askQuestion;
