import { SingleBar } from 'cli-progress';
import wait from 'wait';
import { IOptions } from './bin/steam-wishlist-exporter';
import Game from './Game';
import getWishlist from './getWishlist';
import { readWishlistFile, writeWishlistFile } from './fs';
import getGame from './getGame';

export default async (options: IOptions, progressBar: SingleBar) => {
  // an array with the appids of the games inside the wishlist
  const appidsToSearch: Array<number> = [];

  // an array with the game information
  const games: Array<Game> = [];

  // an array with the appids that failed while fetching info
  const appidThatFailed: Array<number> = [];

  // both false is the normal run (look for every game in wishlist)
  if (!options.retry && !options.append) {
    const appidsInWishlist: Array<number> = await getWishlist(options.username);
    appidsInWishlist.forEach((x: number): void => {
      appidsToSearch.push(x);
    });
  } else {
    const wishlistFile = await readWishlistFile(options.username);

    if (options.retry) {
      // when retrying we will search for those appids that failed
      wishlistFile.appidThatFailed.forEach((x: number): void => {
        appidsToSearch.push(x);
      });

      // games remain the same
      wishlistFile.games.forEach((g) => {
        games.push(g);
      });
    }

    if (options.append) {
      // when appending we will search for new games in the wishlist
      const appidsInWishlist: Array<number> = await getWishlist(
        options.username
      );
      appidsInWishlist.forEach((x: number): void => {
        // if the appid in wishlist isn't already in the file, then add it to the search
        if (wishlistFile.games.findIndex((g) => g.appid === x) === -1) {
          appidsToSearch.push(x);
        }
      });

      // errors and games remain the same
      wishlistFile.appidThatFailed.forEach((x) => {
        appidThatFailed.push(x);
      });

      wishlistFile.games.forEach((g) => {
        games.push(g);
      });
    }
  }

  // this will be true if the following conditions are met
  // - normal run but no games in wishlist
  // - retrying but no previous errors
  // - appending but no new games in wishlist
  if (appidsToSearch.length === 0) {
    let message: string;
    if (!options.retry && !options.append) {
      message = `There's no game in the ${options.username}'s wishlist`;
    } else if (options.retry && !options.append) {
      message = "There's no previous errors retry";
    } else if (!options.retry && options.append) {
      message = `There's no new game in the ${options.username}'s wishlist`;
    } else {
      message = `There's no new game in the ${options.username}'s wishlist and no previous errors to retry`;
    }
    console.log(message);
    process.exit(0);
  }

  console.log('Start getting games info');

  // start the progress bar
  progressBar.start(appidsToSearch.length, 0);

  for await (const appid of appidsToSearch) {
    const game: Game | null = await getGame(appid);

    // if no error added to games array, otherwise add the appid to errors
    if (game != null) {
      games.push(game);
    } else {
      appidThatFailed.push(appid);
    }

    progressBar.increment();
    await wait(options.delay);
  }

  await writeWishlistFile(options.username, appidThatFailed, games);

  process.exit(0);
};
