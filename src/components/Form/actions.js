export const init = () => ({
  type: 'INIT'
});

export const changeProduct = (products, selectedProductId) => ({
  type: 'CHANGE_PRODUCT',
  products,
  selectedProductId
});

export const changeMode = mode => ({
  type: 'CHANGE_MODE',
  mode
});

export const changeValue = (products, value) => ({
  type: 'CHANGE_VALUE',
  products,
  value
});

export const inputBlur = (products, value) => ({
  type: 'INPUT_BLUR'
});
