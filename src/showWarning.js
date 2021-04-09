const askQuestion = require('./askQuestion');

const showWarning = async () => {
  // warn about the bans
  console.log(
    'Before continuing, you should read the Steam Web API Terms of Use and double check the values from the config.json file'
  );
  console.log('I am not responsible for any ban by Steam');

  const answer = await askQuestion('Do you want to continue? (y/n) ');
  if (!['y', 'yes'].includes(answer.toLowerCase().trim())) process.exit(0);
};

module.exports = showWarning;
