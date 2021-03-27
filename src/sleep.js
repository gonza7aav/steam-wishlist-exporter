// this will make the run sleep fox n milliseconds

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = sleep;
