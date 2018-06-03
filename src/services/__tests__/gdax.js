import GdaxService from '../gdax';

it('return GdaxService instance', () => {
  const instance = GdaxService.get();
  expect(instance.constructor).toBe(GdaxService);
});

it('creates one singleton', () => {
  const first = GdaxService.get();
  const second = GdaxService.get();
  expect(first).toBe(second);
});
