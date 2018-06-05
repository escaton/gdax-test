// @flow
import Url from 'url';

let singleton;

export type ProductOrderBook = {
  asks: [string, string, number][],
  bids: [string, string, number][],
  sequence: number
};

export type ProductInfo = {
  id: string,
  base_currency: string,
  quote_currency: string,
  base_min_size: string,
  base_max_size: string,
  quote_increment: string,
  display_name: string,
  margin_enabled: boolean
};

export default class GdaxService {
  _apiEndpoint = 'https://api.gdax.com/';
  fetchApi(path: string) {
    return fetch(`${this._apiEndpoint}${path}`).then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    });
  }
  getProducts(): Promise<ProductInfo[]> {
    return this.fetchApi('/products');
  }
  getProductOrderBook(
    product: string,
    options?: { level: 1 | 2 | 3 }
  ): Promise<ProductOrderBook> {
    const path = Url.format({
      pathname: `/products/${product}/book`,
      query: options || {}
    });
    return this.fetchApi(path);
  }
  static get() {
    if (!singleton) {
      singleton = new GdaxService();
    }
    return singleton;
  }
}
