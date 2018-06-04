// @flow
import * as React from 'react';
import ProductsSelect from '../ProductsSelect';
import Input from '../Input';
import Preview from '../Preview';

import * as actions from './actions';
import dispatch from './dispatcher';

import type { State } from './reducer';
import type { ProductInfo } from 'gdax';

export default class Form extends React.PureComponent<
  {
    products: ProductInfo[]
  },
  State
> {
  state = dispatch(actions.init())();
  dispatch(action) {
    this.setState(dispatch(action));
  }
  onChangeProduct = (selectedProductId: *) => {
    this.dispatch(
      actions.changeProduct(this.props.products, selectedProductId)
    );
  };
  onChangeMode = (mode: string) => {
    this.dispatch(actions.changeMode(mode));
  };
  onChangeValue = (value: *) => {
    this.dispatch(actions.changeValue(this.props.products, value));
  };
  onInputBlur = () => {
    this.dispatch(actions.inputBlur());
  };
  render() {
    const { state, props } = this;
    const selectedProduct = props.products[state.selectedProductIndex];
    return (
      <form>
        <ProductsSelect
          products={props.products}
          selectedId={selectedProduct.id}
          onChange={this.onChangeProduct}
        />
        <input
          type="radio"
          checked={state.mode === 'buy'}
          name="mode"
          value="buy"
          onChange={e => this.onChangeMode(e.target.value)}
        />Buy
        <input
          type="radio"
          checked={state.mode === 'sell'}
          name="mode"
          value="sell"
          onChange={e => this.onChangeMode(e.target.value)}
        />Sell
        <Input
          type="text"
          onEdit={this.onChangeValue}
          value={state.displayValue}
          error={state.showError ? state.valueError : null}
          onBlur={this.onInputBlur}
        />
        <Preview
          product={selectedProduct}
          mode={state.mode}
          amount={state.value}
          key={selectedProduct.id /* refresh on product change */}
        />
      </form>
    );
  }
}
