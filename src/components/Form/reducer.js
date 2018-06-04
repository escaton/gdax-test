// @flow
import { base as validateBase, quote as validateQuote } from './validators';
const defaultState = {
  selectedProductIndex: 0,
  mode: 'buy',
  value: 0,
  displayValue: '0',
  valueError: null,
  showError: false
};

export type State = {
  ...typeof defaultState,
  valueError: ?string
};

const formatValue = str => str.replace(/[^0-9.]/g, '');

export default (state: State = defaultState, action: any): State => {
  switch (action.type) {
    case 'CHANGE_PRODUCT': {
      const { products, selectedProductId } = action;
      const newIndex = products.findIndex(x => x.id === selectedProductId);
      return {
        ...defaultState,
        mode: state.mode,
        selectedProductIndex: newIndex
      };
    }
    case 'CHANGE_MODE': {
      return {
        ...defaultState,
        mode: action.mode,
        selectedProductIndex: state.selectedProductIndex
      };
    }
    case 'CHANGE_VALUE': {
      const { products, value } = action;
      const { selectedProductIndex, mode } = state;
      const currentProduct = products[selectedProductIndex];
      const newDisplayValue = formatValue(value);
      const newValue = parseFloat(newDisplayValue || '0'); // cast to number for validation
      const { valid, reason } =
        mode === 'buy'
          ? validateBase(newValue, currentProduct)
          : validateQuote(newValue, currentProduct);
      return {
        ...state,
        value: valid ? newValue : state.value,
        displayValue: newDisplayValue,
        valueError: valid ? null : reason,
        showError: false
      };
    }
    case 'INPUT_BLUR': {
      return {
        ...state,
        showError: true
      };
    }
    default: {
      return state;
    }
  }
};
