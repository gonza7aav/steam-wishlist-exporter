class Game {
  constructor(
    appid,
    title,
    developers,
    publishers,
    isFree,
    priceOverview,
    releaseDate
  ) {
    this.appid = appid;
    this.storeURL = `https://store.steampowered.com/app/${appid}`;
    this.title = title;
    this.developers = developers;
    this.publishers = publishers;

    // if this result -1 the object shouldn't have a price property
    const priceAux = this.getPrice(isFree, priceOverview);
    if (priceAux !== -1) {
      this.price = priceAux;
      this.currency = priceOverview.currency;
    }

    if (!releaseDate.coming_soon) {
      this.releaseDate = this.formatDate(releaseDate);
    }
  }

  getPrice(_isFree, _priceOverview) {
    if (_isFree) return 0;

    // this is for game that aren't for selling
    if (typeof _priceOverview === 'undefined' || _priceOverview === null)
      return -1;

    return _priceOverview.initial / 100;
  }

  // this will format the date value
  formatDate(value) {
    const aux = new Date(value);

    let str = aux.getUTCFullYear();
    str += `-${this.formatNumber(aux.getUTCMonth() + 1)}`;
    str += `-${this.formatNumber(aux.getUTCDate())}`;

    return str;
  }

  formatNumber(n) {
    if (n < 10) {
      return `0${n}`;
    }
    return `${n}`;
  }
}

module.exports = Game;
