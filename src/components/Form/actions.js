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
