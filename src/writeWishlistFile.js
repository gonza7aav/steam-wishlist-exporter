// is there already a file with that name? `${username}_wishlist`
// yes: read, append, write
// no: create, write

const readWishlistFile = require('./readWishlistFile');
const fs = require('fs/promises');

const writeWishlistFile = async (username, games) => {
  const today = new Date();

  let fileSaved = await readWishlistFile(username);
  fileSaved.dateExported = today.toISOString();
  fileSaved.errors = global.errors;
  fileSaved.games = [...fileSaved.games, ...games];

  console.log('\nWriting wishlist file...');

  // catch the exception when the folder was already created
  await fs.mkdir('results').catch(() => {});

  await fs.writeFile(
    `results/${username}_wishlist.json`,
    JSON.stringify(fileSaved, null, 2)
  );

  console.log('Writing wishlist file finished');
};

module.exports = writeWishlistFile;
