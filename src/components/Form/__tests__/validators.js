import { base, quote } from '../validators';

const product = {
  id: 'BTC-USD',
  base_currency: 'BTC',
  quote_currency: 'USD',
  base_min_size: '0.001',
  base_max_size: '10000.00',
  quote_increment: '0.01'
};

describe('base validation', () => {
  it('fails if value < product base_min_size', () => {
    expect(base(0.0005, product).valid).toBe(false);
  });
  it('fails if value > product base_max_size', () => {
    expect(base(11000.0, product).valid).toBe(false);
  });
  it('fails if value more fractional then base_min_size', () => {
    expect(base(1.0005, product).valid).toBe(false);
  });
  it('not fails if value satisfied boundaries', () => {
    expect(base(12.2, product).valid).toBe(true);
  });
  it('provides reason if fails', () => {
    expect(typeof base(1.0005, product).reason).toBe('string');
  });
});

describe('quote validation', () => {
  it('fails if value < product quote_increment', () => {
    expect(quote(0.001, product).valid).toBe(false);
  });
  it('fails if value more fractional then quote_increment', () => {
    expect(quote(1.001, product).valid).toBe(false);
  });
  it('not fails if value satisfied boundaries', () => {
    expect(quote(1.02, product).valid).toBe(true);
  });
  it('provides reason if fails', () => {
    expect(typeof quote(1.0005, product).reason).toBe('string');
  });
});
