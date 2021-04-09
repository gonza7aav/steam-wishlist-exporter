# steam-wishlist-exporter

<!-- https://shields.io -->

<div align="center">

![GitHub repository size](https://img.shields.io/github/repo-size/gonza7aav/steam-wishlist-exporter?label=size&color=informational)
![Repository license](https://img.shields.io/github/license/gonza7aav/steam-wishlist-exporter?color=informational)

</div>

<!-- summary -->

A tool to export the wishlist of a _Steam_ account

## 🚧 Prerequisites

- _[Node.js](https://nodejs.org/)_
- _[Git](https://git-scm.com/)_ (optional)

## 🛠️ Install

1. Download this repository

   If you have _Git_, you can clone it with:

   ```console
   git clone https://github.com/gonza7aav/steam-wishlist-exporter.git
   ```

2. Install the dependencies with:

   ```console
   npm intall
   ```

## 🚀 Usage

Before exporting, you should read the **[_Steam_ Web API Terms of Use](https://steamcommunity.com/dev/apiterms)** and double check the values from the `config.json` file.

**I am not responsible for any ban by _Steam_**

To start the program, run:

```console
npm start
```

Then, follow the instruction on the console.

The first time you export a user's wishlist, a new file will be created. Thereafter it will update the file with the new games wishlisted and the games that could not be saved before.

## 📂 Results

After execution, you will find two additions: a folder and a file.

In the `results` folder, you will find all the wishlists exported. You should be able to locate the desired one by the username in the filename.

These files has the following structure

```json
{
  "username": "username",
  "dateExported": "2000-01-01T00:00:00.000Z",

  // an array of appid that failed
  "errors": [207210,...],

  // an array of game objects
  "games": [
    {
      "appid": 10,
      "storeURL": "https://store.steampowered.com/app/10",
      "title": "Counter-Strike",
      "developers": ["Valve"],
      "publishers": ["Valve"],

      // coming soon games may not have one
      // if it's a free game, price will be 0
      "price": 129.99,

      // coming soon games may not have one
      "currency": "ARS",

      // coming soon games may not have one
      "releaseDate": "2000-11-01"
    },
    ...
  ]
}
```

On the other hand, `temp.json` contains the API calls made and when they will restart. With this we can check that the limit established by **[_Steam_ Web API Terms of Use](https://steamcommunity.com/dev/apiterms)** is not exceeded.

## 📝 License

<!-- https://choosealicense.com/ -->

Copyright © 2021 _Aguirre Gonzalo Adolfo_.
This project is _[MIT](LICENSE)_ licensed.
