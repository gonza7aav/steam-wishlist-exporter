const readWishlistFile = (_username) => {
  try {
    let {
      username,
      dateExported,
      games,
    } = require(`../results/${_username}_wishlist.json`);

    return {
      username: _username,
      dateExported: dateExported,
      games: games,
    };
  } catch (error) {
    // if the file didn't exist, instantiate with default values
    if (error.code == "MODULE_NOT_FOUND") {
      return {
        username: _username,
        dateExported: "",
        games: [],
      };
    } else {
      console.error(error);
      process.exit(0);
    }
  }
};

module.exports = readWishlistFile;
