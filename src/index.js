const config = require('../config.json');

const showWarning = require('./showWarning');
const readTempFile = require('./readTempFile');
const wasBefore = require('./wasBefore');
const askQuestion = require('./askQuestion');
const getWishlist = require('./getWishlist');
const getRunTime = require('./getRunTime');
const getGame = require('./getGame');
const sleep = require('./sleep');
const writeTempFile = require('./writeTempFile');
const writeWishlistFile = require('./writeWishlistFile');

const main = async () => {
  await showWarning();

  let { APICalls, reset, username, wishlist } = await readTempFile();

  // APICalls will be used in lot of file, then will be global
  global.APICalls = APICalls;

  // has the restart date been reached?
  if (wasBefore(reset)) global.APICalls = 0;

  // if the time limit has passed, reset the counter
  if (wasAPIReseted(reset)) global.APICalls = 0;

  // check the api limit and do not exceed it
  if (global.APICalls + wishlist.length > config.MAX_API_CALLS_PER_DAY) {
    // get the ones that won't be processed to save them for later
    let exceed = wishlist.slice(config.MAX_API_CALLS_PER_DAY - global.APICalls);
    exceed.map((appid) => global.pendingGames.push(appid));
    console.log(
      `\n${exceed.length} games will be saved for later in order to not exceed the API limit`
    );

    // get the ones that will be processed right now
    wishlist = wishlist.slice(
      0,
      config.MAX_API_CALLS_PER_DAY - global.APICalls
    );
  }

  try {
    // if this is not the continuation of the previous run, ask for username
    if (wishlist.length == 0) {
      let answer = await askQuestion("\nEnter the SteamID: ");
      username = answer;

      // get all the appids of the wishlisted games
      wishlist = await getWishlist(username);
    }

    // show finish time
    console.log(`\nThis will run for ${getRunTime(wishlist.length)}`);
    await askQuestion('Press Enter to continue');

    console.log('\nStart getting games info');
    let games = [];
    for await (let appid of wishlist) {
      let game = await getGame(appid);
      if (game != null) games.push(game);
      await sleep(config.WAITING_TIME);
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
