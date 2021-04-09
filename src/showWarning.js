const askQuestion = require('./askQuestion');

const showWarning = async () => {
  // disclaimer
  console.log(
    'Before continuing, you should read the Steam Web API Terms of Use and double check the values from the config.json file'
  );
  console.log('I am not responsible for any ban by Steam');

  // ask via console if the user want to continue or exit
  const answer = await askQuestion('Do you want to continue? (y/n) ');
  if (!['y', 'yes'].includes(answer.toLowerCase().trim())) process.exit(0);
};

module.exports = showWarning;
