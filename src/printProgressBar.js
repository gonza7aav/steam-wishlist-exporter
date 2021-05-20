const printProgressBar = (progress, total) => {
  const BAR_LENGTH = 20;
  const PROGRESS_SYMBOL = '█';

  const percentage = progress / total;
  const finished = PROGRESS_SYMBOL.repeat(Math.floor(percentage * BAR_LENGTH));
  const empty = ' '.repeat(BAR_LENGTH - finished.length);

  // use process.stdout.write becuase console.log print a newline character
  // \r clear the current line and reprint
  process.stdout.write(
    `\r[${finished}${empty}] ${Math.floor(percentage * 100)}%`
  );
};

module.exports = printProgressBar;
