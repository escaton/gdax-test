// @flow
export const sumCalculation = (orders: *, amount: *): number => {
  let acc = 0;
  let i = 0;
  while (i < orders.length) {
    const order = orders[i];
    const price = parseFloat(order[0]);
    const size = parseFloat(order[1]);
    if (size >= amount) {
      acc += amount * price;
      return acc;
    } else {
      acc += size * price;
      amount -= size;
      i++;
    }
  }
  return -1;
};

export const formatSum = (_minimalAmount: *, sum: *): string => {
  let i = 0;
  let minimalAmount = parseFloat(_minimalAmount);
  while (minimalAmount % 1 !== 0) {
    minimalAmount *= 10;
    i++;
  }
  return sum.toFixed(i);
};
