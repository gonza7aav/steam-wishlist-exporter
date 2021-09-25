# steam-wishlist-exporter

<div align="center">

![Release en GitHub](https://img.shields.io/github/v/release/gonza7aav/steam-wishlist-exporter?label=release&color=informational)
![Tamaño del repositorio de GitHub](https://img.shields.io/github/repo-size/gonza7aav/steam-wishlist-exporter?label=tamaño&color=informational)
![Licencia del repositorio](https://img.shields.io/github/license/gonza7aav/steam-wishlist-exporter?label=licencia&color=informational)

[![Read me in English](https://img.shields.io/badge/Read%20me%20in-English-brightgreen)](README.en.md)

</div>

<!-- summary -->

Una herramienta para exportar la lista de deseados de una cuenta de _Steam_

## 🚧 Requisitos

- _[Node.js](https://nodejs.org/)_

## 🚀 Ejecución

Antes de exportar, deberías leer los **[Términos de Uso de _Steam_ Web API](https://steamcommunity.com/dev/apiterms)**

**No soy responsable de ningún baneo de _Steam_** causado por no seguir los Términos de Uso.

---

Para empezar el programa, ejecuta:

```console
npx steam-wishlist-exporter --username <steamID> [ --retry | --append | --delay <milliseconds> ]
```

Para más información sobre las diferentes opciones, ejecuta:

```console
npx steam-wishlist-exporter --help
```

## 📂 Resultados

Luego de la ejecución, encontrarás un archivo llamado `usuario_wishlist.json` con la misma estructura que el ejemplo siguiente

```js
{
  "username": "wishlist_owner",

  // un vector de los id de los juegos (también conocidos como appids) que han presentado errores
  "appidThatFailed": [207210],

  "games": [
    {
      "appid": 10,
      "storeURL": "https://store.steampowered.com/app/10",
      "title": "Counter-Strike",
      "publishers": ["Valve"],

      // algunos juegos pueden no presentar desarrolladores
      "developers": ["Valve"],

      // los juegos por ser lanzados pueden no contar con un precio ni divisa aún
      // los juegos gratis no poseen precio ni divisa
      "price": 129.99,
      "currency": "ARS",

      // los juegos por ser lanzados pueden no contar con una fecha de lanzamiento aún
      "releaseDate": "1 Nov, 2000"
    },
    ...
  ]
}
```

## 📝 Licencia

Copyright © 2021 _Aguirre Gonzalo Adolfo_.
Este proyecto se encuentra bajo la licencia _[MIT](LICENSE)_.
