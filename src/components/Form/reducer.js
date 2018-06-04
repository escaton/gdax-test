// @flow
const defaultState = {
  selectedProductIndex: 0,
  mode: 'buy',
  base: 0,
  quote: 0
};

export type State = typeof defaultState;

export default (state: State = defaultState, action: any): State => {
  switch (action.type) {
    case 'CHANGE_PRODUCT': {
      const { products, selectedProductId } = action;
      const newIndex = products.findIndex(x => x.id === selectedProductId);
      return {
        ...state,
        selectedProductIndex: newIndex
      };
    }
    case 'CHANGE_MODE': {
      return {
        ...state,
        mode: action.mode
      };
    }
    default: {
      return state;
    }
  }
};
