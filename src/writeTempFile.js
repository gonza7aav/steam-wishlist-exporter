const fs = require('fs/promises');

const writeTempFile = async () => {
  // tomorrow = today in ms + 1 day in ms
  const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);

  let aux = {
    APICalls: global.APICalls,
    reset: tomorrow,
  };

  console.log('\nWriting temp file...');

  await fs.writeFile('temp.json', JSON.stringify(aux, null, 2));

  console.log('Writing temp file finished');
};

module.exports = writeTempFile;
