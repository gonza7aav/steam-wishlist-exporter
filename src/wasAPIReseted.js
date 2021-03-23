// check if the system limit has been reset
const wasAPIReseted = (d) => {
  let today = new Date();
  return today.getTime() > d.getTime();
};

module.exports = wasAPIReseted;
