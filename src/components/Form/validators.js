// @flow
import type { ProductInfo } from '../../services/gdax';

const checkFractionality = (a, b) => {
  // this is because of javascript numbers nature
  // 12.2/0.001 = 12199.999999999998
  while (b % 1 !== 0) {
    b *= 10;
    a *= 10;
  }
  return (a / b) % 1 !== 0;
};

export const base = (value: number, product: ProductInfo) => {
  const minSize = parseFloat(product.base_min_size);
  const maxSize = parseFloat(product.base_max_size);
  if (value < minSize) {
    return { valid: false, reason: `value should be >= ${minSize}` };
  } else if (value > maxSize) {
    return { valid: false, reason: `value should be <= ${maxSize}` };
  } else if (checkFractionality(value, minSize)) {
    return { valid: false, reason: 'value is too fractional' };
  } else {
    return { valid: true, reason: null };
  }
};

export const quote = (value: number, product: ProductInfo) => {
  const minSize = parseFloat(product.quote_increment);
  if (value < minSize) {
    return { valid: false, reason: `value should be >= ${minSize}` };
  } else if (checkFractionality(value, minSize)) {
    return { valid: false, reason: 'value is too fractional' };
  } else {
    return { valid: true, reason: null };
  }
};
