import Gdax from 'gdax';
import GdaxService from '../gdax';

it('creates Gdax#PublicClient instance', () => {
  const instance = GdaxService.get();
  expect(instance.constructor).toBe(Gdax.PublicClient);
});

it('creates one singleton', () => {
  const first = GdaxService.get();
  const second = GdaxService.get();
  expect(first).toBe(second);
});
