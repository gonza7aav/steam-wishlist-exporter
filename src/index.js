const config = require('../config.json');

const showWarning = require('./showWarning');
const readTempFile = require('./readTempFile');
const wasBefore = require('./wasBefore');
const askQuestion = require('./askQuestion');
const readWishlistFile = require('./readWishlistFile');
const getWishlist = require('./getWishlist');
const getRunTime = require('./getRunTime');
const getGame = require('./getGame');
const sleep = require('./sleep');
const writeTempFile = require('./writeTempFile');
const writeWishlistFile = require('./writeWishlistFile');
const printProgressBar = require('./printProgressBar');

const main = async () => {
  await showWarning();

  const { APICalls, reset } = await readTempFile();

  // this value will be used in several files, so we make it global
  global.APICalls = APICalls;

  // has the restart date been reached?
  if (wasBefore(reset)) global.APICalls = 0;

  // check if I have already reached the call limit
  if (global.APICalls >= config.MAX_API_CALLS_PER_DAY) {
    console.log(
      '\nYou already reached the limit for today. Try again tomorrow'
    );
    process.exit(0);
  }

  // init the global variable which contains the appid that failed
  global.errors = [];

  try {
    const username = await askQuestion('\nEnter the SteamID: ');

    // read the wishlist file of that username
    // if it doesn't exist, errors & games will be empty arrays
    const { errors: errorsSaved, games: gamesSaved } = await readWishlistFile(
      username
    );
    const wishlistSaved = gamesSaved.map((x) => x.appid);

    // get all the appids of the wishlisted games
    let wishlist = await getWishlist(username);

    // filter the complete wishlist of already saved data
    wishlist = wishlist.filter(
      (x) => !wishlistSaved.includes(x) && !errorsSaved.includes(x)
    );

    console.log(`Already saved: ${wishlistSaved.length}`);
    console.log(`Previous errors: ${errorsSaved.length}`);
    console.log(`New ones: ${wishlist.length}`);

    // add the errors to the wishlist in order to try again
    wishlist = [...wishlist, ...errorsSaved];

    // this will be true if the following conditions are met
    // - the last export had no errors
    // - the user didn't add new games to his/her wishlist
    if (wishlist.length === 0) {
      console.log(
        `\nYou have already exported ${username}'s wishlist, and there is nothing new`
      );
      process.exit(0);
    }

    // check if this run will exceed the api limit
    if (global.APICalls + wishlist.length > config.MAX_API_CALLS_PER_DAY) {
      // those over the limit will be treated as errors
      const exceed = wishlist.slice(
        config.MAX_API_CALLS_PER_DAY - global.APICalls
      );
      exceed.map((appid) => global.errors.push(appid));
      console.log(
        `\n${exceed.length} games will be saved for later in order not to exceed the API limit`
      );

      // select those which can be processed
      wishlist = wishlist.slice(
        0,
        config.MAX_API_CALLS_PER_DAY - global.APICalls
      );
    }

    // show finish time
    console.log(`\nThis will run for ${getRunTime(wishlist.length)}`);
    await askQuestion('Press Enter to continue');

    // once the wishlist array is ready, fetch them all
    console.log('\nStart getting games info');
    const games = [];
    let progress = 0;
    for await (const appid of wishlist) {
      const game = await getGame(appid);
      if (game != null) games.push(game);

      printProgressBar(++progress, wishlist.length);
      await sleep(config.WAITING_TIME);
    }

    // create/update the temp file
    await writeTempFile();

    // once you have the game details, we will write a file
    await writeWishlistFile(username, games);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};

main();
