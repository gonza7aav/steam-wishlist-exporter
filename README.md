# steam-wishlist-exporter

<div align="center">

![NPM Version](https://img.shields.io/npm/v/steam-wishlist-exporter)
![NPM Downloads](https://img.shields.io/npm/dt/steam-wishlist-exporter)
![NPM License](https://img.shields.io/npm/l/steam-wishlist-exporter)

[![Léeme en Español](https://img.shields.io/badge/Léeme%20en-Español-brightgreen)](README.es.md)

</div>

<!-- summary -->

A tool to export the wishlist of a _Steam_ account

## 🚧 Prerequisites

- _[Node.js](https://nodejs.org/)_

## 🚀 Usage

Before exporting, you should read the **[_Steam_ Web API Terms of Use](https://steamcommunity.com/dev/apiterms)**.

**I am not responsible for any ban by _Steam_** caused by not following the Terms of Use.

---

To start the program, run:

```console
npx steam-wishlist-exporter --username <steamID> [ --retry | --append | --delay <milliseconds> ]
```

For more information about the different options, run:

```console
npx steam-wishlist-exporter --help
```

## 📂 Results

After execution, you will find a file called `username_wishlist.json` with the same structure as the following example

```js
{
  "username": "wishlist_owner",

  // an array of games id (aka appids) that have presented errors
  "appidThatFailed": [207210],

  "games": [
    {
      "appid": 10,
      "storeURL": "https://store.steampowered.com/app/10",
      "title": "Counter-Strike",
      "publishers": ["Valve"],

      // some games may not have developers
      "developers": ["Valve"],

      // coming soon games may not have a price or currency yet
      // free games don't have price or currency
      "price": 129.99,
      "currency": "ARS",

      // coming soon games may not have a release date yet
      "releaseDate": "1 Nov, 2000"
    },
    ...
  ]
}
```

## 📝 License

Copyright © 2021 _Aguirre Gonzalo Adolfo_.
This project is _[MIT](LICENSE)_ licensed.
