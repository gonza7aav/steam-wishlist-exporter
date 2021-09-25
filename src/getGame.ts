import Game from './Game';

const axios = require('axios').default;

export default async (appid: number): Promise<Game | null> => {
  try {
    // make a call to the API
    // more info: https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI#appdetails
    const res = await axios
      .get('https://store.steampowered.com/api/appdetails/', {
        params: { appids: appid },
      })
      .catch(() => {});

    if (!res?.data || !res.data[appid].success) {
      throw new Error(`API call failed { appid:${appid} }`);
    }

    // extract the game details
    const appDetails = res.data[appid].data;

    return new Game(
      appid,
      appDetails.name,
      appDetails.developers,
      appDetails.publishers,
      appDetails.price_overview,
      appDetails.release_date
    );
  } catch (err) {
    // console.error(`\nerr`);
    return null;
  }
};
