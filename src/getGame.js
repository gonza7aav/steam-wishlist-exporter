const axios = require("axios").default;
const Game = require("./Game");

const getGame = async (appid) => {
  global.APICalls++;

  try {
    // make a call to the API
    // more info: https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI#appdetails
    const res = await axios
      .get(`https://store.steampowered.com/api/appdetails/?appids=${appid}`)
      .catch(() => {});

    if (typeof res == undefined || res == null)
      throw `API fetch failed appid:${appid}`;
    if (typeof res.data == undefined || res.data == null)
      throw `API fetch failed appid:${appid}`;

    if (!res.data[appid].success) throw `API call failed appid:${appid}`;

    // parse it and save the details
    const appDetails = res.data[appid].data;

    console.log(`${appid} : ${appDetails.name}`);

    return new Game(
      appid,
      appDetails.name,
      appDetails.developers,
      appDetails.publishers,
      appDetails.release_date.date || null,
      getPrice(appDetails.is_free, appDetails.price_overview)
    );
  } catch (error) {
    global.pendingGames.push(appid);
    console.error(error);
  }
};

const getPrice = (isFree, priceOverview) => {
  if (isFree) return 0;

  // this is for game that aren't for selling
  if (typeof priceOverview == undefined) return -1;

  return priceOverview.initial / 100;
};

module.exports = getGame;
