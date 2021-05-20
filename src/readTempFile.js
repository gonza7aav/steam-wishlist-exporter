// this module will read the temp file created by the last run.
// the file has the following attributes :
//   - APICalls : total calls made to check if the run will exceed the limit.
//   - reset : the date (ISO format) when apiCallsMade should be reset to 0.

const fs = require('fs/promises');

const readTempFile = async () => {
  try {
    const { APICalls, reset } = JSON.parse(await fs.readFile('./temp.json'));

    return {
      APICalls,
      reset: new Date(reset),
    };
  } catch (err) {
    // if the file doesn't exist, return the default values
    if (err.code === 'ENOENT') {
      return {
        APICalls: 0,
        reset: new Date(2000, 0, 1),
      };
    }

    console.error(`\n${err}`);
    process.exit(0);
  }
};

module.exports = readTempFile;
