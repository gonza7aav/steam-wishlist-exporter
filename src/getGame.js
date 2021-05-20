const axios = require('axios').default;
const Game = require('./Game');

const getGame = async (appid) => {
  global.APICalls++;

  try {
    // make a call to the API
    // more info: https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI#appdetails
    const res = await axios
      .get(`https://store.steampowered.com/api/appdetails/?appids=${appid}`)
      .catch(() => {});

    if (!res?.data) throw new Error(`API fetch failed appid:${appid}`);
    if (!res.data[appid].success)
      throw new Error(`API call failed appid:${appid}`);

    // extract the game details
    const appDetails = res.data[appid].data;

    console.log(`${appid} : ${appDetails.name}`);

    return new Game(
      appid,
      appDetails.name,
      appDetails.developers,
      appDetails.publishers,
      appDetails.is_free,
      appDetails.price_overview,
      appDetails.release_date
    );
  } catch (err) {
    global.errors.push(appid);
    console.error(err);
  }
};

module.exports = getGame;
