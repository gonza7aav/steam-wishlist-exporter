// this will make the run sleep fox n milliseconds

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

module.exports = sleep;
