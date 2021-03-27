const config = require("../config.json");

const showWarning = require("./showWarning");
const readTempFile = require("./readTempFile");
const wasAPIReseted = require("./wasAPIReseted");
const askQuestion = require("./askQuestion");
const writeWishlistFile = require("./writeWishlistFile");
const writeTempFile = require("./writeTempFile");

const getWishlist = require("./getWishlist");
const getGame = require("./getGame");

const main = async () => {
  if (config.SHOW_WARNINGS) await showWarning();

  let { APICalls, reset, username, wishlist } = await readTempFile();

  // APICalls will be used in lot of file, then will be global
  global.APICalls = APICalls;

  if (!wasAPIReseted(reset)) {
    // check and warn about exceeded the api call limit
    if (
      config.SHOW_WARNINGS &&
      global.APICalls + wishlist.length >= config.MAX_API_CALLS_PER_DAY
    ) {
      console.log("\nYou will exceed the daily limit of API calls");
      console.log("Any request made over the limit could return wrong data");
      let answer = await askQuestion("Do you want to continue? (y/n) ");
      if (!["y", "yes"].includes(answer.toLowerCase().trim())) process.exit(0);
    }
  }

  try {
    // if this is not the continuation of the previous run, ask for username
    if (wishlist.length == 0) {
      let answer = await askQuestion("Enter the SteamID: ");
      username = answer;

      // get all the appids of the wishlisted games
      wishlist = await getWishlist(username);
    }

    // init the global variable which contains the appid that get errors
    global.pendingGames = [];

    // having the wishlist array ready, fetch them
    console.log("\nStart getting games info");
    let games = [];
    for await (let appid of wishlist) {
      let game = await getGame(appid);
      games.push(game);
    }

    // once you have the game details, we will write a file
    await writeWishlistFile(username, games);

    // create/update the temp file
    await writeTempFile(username);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

main();
