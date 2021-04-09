// is there already a file with that name? `${username}_wishlist`
// yes: read, append, write
// no: create, write

const readWishlistFile = require('./readWishlistFile');
const fs = require('fs/promises');

const writeWishlistFile = async (username, games) => {
  let today = new Date();

  let aux = readWishlistFile(username);
  aux.dateExported = today.toISOString();
  aux.games = [...aux.games, ...games];

  console.log('\nWriting wishlist file...');

  // catch the exception when the folder was already created
  await fs.mkdir('results').catch(() => {});

  await fsp.writeFile(
    `results/${username}_wishlist.json`,
    JSON.stringify(aux, null, 2)
  );

  console.log('Writing wishlist file finished');
};

module.exports = writeWishlistFile;
