# steam-wishlist-exporter

<!-- https://shields.io -->

![GitHub repository size](https://img.shields.io/github/repo-size/gonza7aav/steam-wishlist-exporter?label=size&color=informational)
![Repository license](https://img.shields.io/github/license/gonza7aav/steam-wishlist-exporter?color=informational)

<!-- summary -->

A tool to export the wishlist of a _Steam_ account

## 🚧 Prerequisites

- _[Node.js](https://nodejs.org/)_
- (optional) _[Git](https://git-scm.com/)_

## 🛠️ Install

1. Download this repository

   If you have _Git_, you can clone it with:

   ```
   git clone https://github.com/gonza7aav/steam-wishlist-exporter.git
   ```

2. Install the dependencies with:

   ```
   npm intall
   ```

## 🚀 Usage

Before exporting, you should read the **[_Steam_ Web API Terms of Use](https://steamcommunity.com/dev/apiterms)** and check the values from the `config.json` file.

I am not responsible for any bans by _Steam_.

To start the program, run:

```
npm start
```

Then, follow the instruction on the console.

## 📂 Results

After execution, you will find two additions: a folder and a file.

In the `results` folder, you will find all the wishlists exported. You should be able to locate the desired one by the username in the filename.

These files has the following structure

```json
{
  "username": "username",
  "dateExported": "2000-01-01T00:00:00.000Z",
  "games": [
    {
      "appid": 10,
      "title": "Counter-Strike",
      "developers": ["Valve"],
      "publishers": ["Valve"],
      "releaseDate": "2000-11-01",
      "price": 129.99,
      "url": "https://store.steampowered.com/app/10"
    },
    ...
  ]
}
```

On the other hand, `temp.json` contains the API calls made, the time they will restart, and the games that failed. With this we can check that the limit established by **[_Steam_ Web API Terms of Use](https://steamcommunity.com/dev/apiterms)** is not exceeded. As well as being able to resume the execution on another day once the limit has been reached.

## 📝 License

<!-- https://choosealicense.com/ -->

Copyright © 2021 _Aguirre Gonzalo Adolfo_.
This project is _[MIT](LICEnSE)_ licensed.
