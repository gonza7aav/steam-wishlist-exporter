const askQuestion = require("./askQuestion");

const showWarning = async () => {
  // warn about the bans
  console.log("Before continuing, you should read the");
  console.log("Steam Web API Terms of Use and check");
  console.log("the values from the config.json file");
  console.log("I am not responsible for bans by Steam\n");

  // ask via console if the user want to continue
  let answer = await askQuestion("Do you want to continue? (y/n) ");
  if (!["y", "yes"].includes(answer.toLowerCase().trim())) process.exit(0);
};

module.exports = showWarning;
