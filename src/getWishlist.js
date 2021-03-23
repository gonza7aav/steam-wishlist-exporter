// returns the games appid in the user's wishlist as an array

const axios = require("axios").default;

const getWishlist = async (username) => {
  global.APICalls++;

  try {
    // fetch the user's wishlist page
    const res = await axios
      .get(`https://store.steampowered.com/wishlist/id/${username}`)
      .catch(() => {});

    if (typeof res == undefined || res == null)
      throw "\nCan't access the wishlist page";
    if (typeof res.data == undefined || res.data == null)
      throw "\nCan't access the wishlist page";

    console.log(`\n${username}'s wishlist page fetched`);

    // we have the string 'page' with the page content
    // we will use eval() in order to get the wishlist array called 'g_rgWishlistData'

    // the definition of an array has the following structure
    // var/const/let name_of_the_array = [...]
    // then we need to eval the '[...]' part

    // looking for the variable definition, in order to shorter the range of search
    let indexStart = res.data.indexOf("g_rgWishlistData");
    if (indexStart == -1) throw "g_rgWishlistData not found";
    let wishlistRaw = res.data.slice(indexStart);

    // we add 1 to the upper limit in order to include the ']' character
    wishlistRaw = wishlistRaw.slice(
      wishlistRaw.indexOf("["),
      wishlistRaw.indexOf("]") + 1
    );

    // check the result with a regular expression
    // too much (\s)* in order to accept the ones with a lot of spaces between
    let regex = /[[](\s)*({(\s)*"appid"(\s)*:(\s)*[0-9]+(\s)*,(\s)*"priority"(\s)*:(\s)*[0-9]+(\s)*,(\s)*"added"(\s)*:(\s)*[0-9]+(\s)*}(\s)*,?(\s)*)+(\s)*]/;
    if (!regex.test(wishlistRaw)) throw "Invalid wishlist format";

    console.log(`Wishlist data found`);

    let wishlist = eval(wishlistRaw);

    // the reduced version is the array of appid without priority and added properties
    let wishlistReduced = wishlist.map((x) => x.appid);

    return wishlistReduced;
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

module.exports = getWishlist;
