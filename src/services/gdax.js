// @flow
import Gdax from 'gdax';

let singleton;

type GdaxPublicClient = Gdax.PublicClient;

export default class GdaxService {
  client: *;
  constructor() {
    this.client = new Gdax.PublicClient();
  }
  getProducts: $PropertyType<GdaxPublicClient, 'getProducts'> = () => {
    return this.client.getProducts();
  };
  getProductOrderBook: $PropertyType<
    GdaxPublicClient,
    'getProductOrderBook'
  > = (...args) => {
    return this.client.getProductOrderBook(...args);
  };
  static get() {
    if (!singleton) {
      singleton = new GdaxService();
    }
    return singleton;
  }
}
