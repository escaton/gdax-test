// @flow
import Gdax from 'gdax';

let singleton;

export default class GdaxService {
  client: *;
  constructor() {
    this.client = new Gdax.PublicClient();
  }
  getProducts() {
    return this.client.getProducts();
  }
  static get() {
    if (!singleton) {
      singleton = new GdaxService();
    }
    return singleton;
  }
}
