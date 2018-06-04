import { sumCalculation, formatSum } from '../utils';

const orders = [
  ['7492.8', '1.03296721', 4],
  ['7494.56', '0.001', 1],
  ['7494.99', '0.18700266', 1]
];

describe('preview utils', () => {
  it('sumCalculation calculates sum (:', () => {
    const sum = sumCalculation(orders, 1);
    expect(sum).toBe(7492.8);
  });
  it('sumCalculation fails if amount > orders size', () => {
    const sum = sumCalculation(orders, 2);
    expect(sum).toBe(-1);
  });

  it('formatSum works correctly', () => {
    expect(formatSum('0.01', 12.123)).toBe((12.123).toFixed(2));
    expect(formatSum('0.01', 12)).toBe((12).toFixed(2));
  });
});
