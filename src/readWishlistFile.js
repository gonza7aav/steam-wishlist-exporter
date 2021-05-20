const fs = require('fs/promises');

const readWishlistFile = async (_username) => {
  try {
    const { username, dateExported, errors, games } = JSON.parse(
      await fs.readFile(`./results/${_username}_wishlist.json`)
    );

    return { username, dateExported, errors, games };
  } catch (err) {
    // if the file didn't exist, instantiate with default values
    if (err.code === 'ENOENT') {
      return {
        username: _username,
        dateExported: '',
        errors: [],
        games: [],
      };
    }

    console.error(`\n${err}`);
    process.exit(0);
  }
};

module.exports = readWishlistFile;
