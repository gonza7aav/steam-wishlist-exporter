import fs from 'fs/promises';
import Game from './Game';

export interface IWishlistFile {
  username: string;
  appidThatFailed: Array<number>;
  games: Array<Game>;
}

export const readWishlistFile = async (
  username: string
): Promise<IWishlistFile> => {
  try {
    return JSON.parse(
      await fs.readFile(`${process.cwd()}/${username}_wishlist.json`, {
        encoding: 'utf-8',
      })
    );
  } catch (err: any) {
    // the file exists but another error happened
    if (err.code !== 'ENOENT') {
      console.error(`\n${err}`);
      process.exit(0);
    }

    // the file doesn't exist, then return the default values
    return {
      username,
      appidThatFailed: [],
      games: [],
    };
  }
};

export const writeWishlistFile = async (
  username: string,
  appidThatFailed: Array<number>,
  games: Array<Game>
) => {
  const file: IWishlistFile = {
    username,
    appidThatFailed,
    games,
  };

  await fs.writeFile(
    `${process.cwd()}/${username}_wishlist.json`,
    JSON.stringify(file)
  );
};
