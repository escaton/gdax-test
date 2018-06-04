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
    // return this.client.getProducts();
    return Promise.resolve([
      {
        id: 'BTC-USD',
        display_name: 'BTC-USD',
        base_currency: 'BTC',
        quote_currency: 'USD',
        base_min_size: '0.001',
        base_max_size: '10000.00',
        quote_increment: '0.01',
        margin_enabled: false
      }
    ]);
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
