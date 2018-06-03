// @flow
import Gdax from 'gdax';

let singleton;

export default {
  get: () => {
    if (!singleton) {
      singleton = new Gdax.PublicClient();
    }
    return singleton;
  }
};
