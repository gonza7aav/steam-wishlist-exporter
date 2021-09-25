#!/usr/bin/env node

/* eslint-disable global-require */

import { Command, InvalidArgumentError } from 'commander';
import { SingleBar, Presets } from 'cli-progress';
import main from '../index';

const program: Command = new Command();

// cli options
program
  .requiredOption('-u, --username <steamID>', 'wishlist owner')
  .option('-r, --retry', 'fetch again those games that failed', false)
  .option('-a, --append', 'fetch new games added in the wishlist', false)
  .option(
    '-d, --delay <milliseconds>',
    'delay between requests',
    (value: string): number => {
      const parsed: number = Number.parseInt(value, 10);
      if (Number.isNaN(parsed)) throw new InvalidArgumentError('Not a number.');
      return parsed;
    },
    333
  )
  .parse(process.argv);

export interface IOptions {
  readonly username: string;
  readonly retry: boolean;
  readonly append: boolean;
  readonly delay: number;
}

const options: IOptions = program.opts();

// create a new progress bar instance
const progressBar: SingleBar = new SingleBar(
  {
    format: '{bar} {percentage}% | {value}/{total}',
    stopOnComplete: true,
    barsize: 30,
    hideCursor: true,
    emptyOnZero: true,
  },
  Presets.shades_classic
);

(async () => {
  await main(options, progressBar);
})();
