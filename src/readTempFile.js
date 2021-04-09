// this module will read the temp file created by the last run.
// the file has the following attributes :
//   APICalls : total calls made to check if the run will exceed the limit.
//   reset : the date when apiCallsMade should be reset to 0.
//     Will be in ISO format (ISO 8601).
//   username : the owner of the last wishlist exported.
//     This will be used to append the result to the file already created.
//   wishlist : the list of appid which haven't been exported.
//     In case that there is no pending games, it must be the empty array [].

const fs = require('fs/promises');

const readTempFile = async () => {
  try {
    // copy the temp file to global variables
    let { APICalls, reset, username, wishlist } = require("../temp.json");

    // check if has pending games to export
    if (wishlist.length > 0) {
      console.log(
        `\nYou still have ${wishlist.length} ${username}'s games to be exported`
      );
      let answer = await askQuestion(
        "Do you want to continue this export? (y/n) "
      );

      // if the user don't want to continue, set the empty values
      if (!["y", "yes"].includes(answer.toLowerCase().trim())) {
        username = "";
        wishlist = [];
      }
    }

    return {
      APICalls: APICalls,
      reset: new Date(reset),
      username: username,
      wishlist: wishlist,
    };
  } catch (error) {
    // if the file didn't exist, instantiate with default values
    if (error.code == "MODULE_NOT_FOUND") {
      return {
        APICalls: 0,
        reset: new Date(2000, 0, 1),
        username: "",
        wishlist: [],
      };
    } else {
      console.error(error);
      process.exit(0);
    }
  }
};

module.exports = readTempFile;
