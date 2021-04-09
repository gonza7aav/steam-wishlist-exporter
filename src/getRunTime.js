const { WAITING_TIME } = require('../config.json');

const getRunTime = (n) => {
  let total = n * WAITING_TIME;
  let rest;

  if (total < 1000) return `${total}ms`;

  rest = total % 1000;
  total = Math.floor(total / 1000);
  if (total < 60) return `${total}s${rest >= 1 ? ` ${rest}ms` : ''}`;

  rest = total % 60;
  total = Math.floor(total / 60);
  if (total < 60) return `${total}m${rest >= 1 ? ` ${rest}s` : ''}`;

  rest = total % 60;
  total = Math.floor(total / 60);
  return `${total}h${rest >= 1 ? ` ${rest}m` : ''}`;
};

module.exports = getRunTime;
