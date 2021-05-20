// FIX : research about the server API timezone

const wasBefore = (d) => {
  const today = new Date();
  return today.getTime() > d.getTime();
};

module.exports = wasBefore;
