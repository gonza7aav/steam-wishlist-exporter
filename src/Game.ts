/* eslint-disable camelcase */

interface IPrice_overview {
  readonly currency: string;
  readonly initial: number;
}

interface IRelease_date {
  readonly coming_soon: boolean;
  readonly date: string;
}

export default class Game {
  appid: number;
  storeURL: string;
  title: string;
  developers?: Array<string>;
  publishers: Array<string>;
  price?: number;
  currency?: string;
  releaseDate?: string;

  constructor(
    _appid: number,
    _title: string,
    _developers: Array<string> | undefined,
    _publishers: Array<string>,
    _priceOverview: IPrice_overview | undefined,
    _releaseDate: IRelease_date
  ) {
    this.appid = _appid;
    this.storeURL = `https://store.steampowered.com/app/${_appid}`;
    this.title = _title;
    this.publishers = _publishers;

    if (typeof _developers !== 'undefined') {
      this.developers = _developers;
    }

    if (typeof _priceOverview !== 'undefined') {
      this.price = _priceOverview.initial / 100;
      this.currency = _priceOverview.currency;
    }

    if (!_releaseDate.coming_soon) {
      this.releaseDate = _releaseDate.date;
    }
  }
}
