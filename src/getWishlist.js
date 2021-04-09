// returns the games appid in the user's wishlist as an array

const axios = require('axios').default;

const getWishlist = async (username) => {
  try {
    // fetch the user's wishlist page
    const res = await axios
      .get(`https://store.steampowered.com/wishlist/id/${username}`)
      .catch(() => {});

    if (!res?.data) throw "\nCan't access the wishlist page";

    console.log(`\n${username}'s wishlist page fetched`);

    // we have the page content as string in res.data
    // we will use eval() in order to get the wishlist array called 'g_rgWishlistData'

    // the definition of an array has the following structure
    // var/const/let name_of_the_array = [...]
    // then we need to eval the '[...]' part

    // looking for the variable definition, in order to shorter the range of search
    const indexStart = res.data.indexOf('g_rgWishlistData');
    if (indexStart == -1) throw 'g_rgWishlistData not found';
    let wishlistRaw = res.data.slice(indexStart);

    // we add 1 to the upper limit in order to include the ']' character
    wishlistRaw = wishlistRaw.slice(
      wishlistRaw.indexOf('['),
      wishlistRaw.indexOf(']') + 1
    );

    // check the result with a regular expression
    const regex = /[[]({"appid":[0-9]+,"priority":[0-9]+,"added":[0-9]+},?)+]/;
    if (!regex.test(wishlistRaw)) throw 'Invalid wishlist format';

    const wishlist = eval(wishlistRaw);

    // the reduced version is the array of appid without priority and added properties
    const wishlistReduced = wishlist.map((x) => x.appid);

    console.log(`Wishlist data found. ${wishlistReduced.length} games`);

    return wishlistReduced;
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};

module.exports = getWishlist;
