class Game {
  constructor(appid, title, developers, publishers, releaseDate, price) {
    this.appid = appid;
    this.title = title;
    this.developers = developers;
    this.publishers = publishers;
    this.releaseDate = this.#formatDate(releaseDate);
    this.price = price;
    this.url = `https://store.steampowered.com/app/${appid}`;
  }

  // this will format the given value that could be string, date or null
  #formatDate(value) {
    if (value == null) return "";

    let aux = new Date(value);
    return `${aux.getUTCFullYear()}-${this.#formatTwoNumber(
      aux.getUTCMonth() + 1
    )}-${this.#formatTwoNumber(aux.getUTCDate())}`;
  }

  #formatTwoNumber(n) {
    if (n < 10) {
      return `0${n}`;
    }
    return `${n}`;
  }
}

module.exports = Game;
