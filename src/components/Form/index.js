// @flow
import * as React from 'react';
import ProductsSelect from '../ProductsSelect';
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
  onChangeBase = (base: string) => {
    this.setState({
      base: +base
    });
  };
  onChangeQuote = (quote: *) => {
    this.setState({
      quote: +quote
    });
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
        {this.state.mode === 'buy' ? (
          <input
            type="text"
            onChange={e => this.onChangeBase(e.target.value)}
            value={state.base}
            // step={selectedProduct.base_min_size}
            // min={selectedProduct.base_min_size}
            // max={selectedProduct.base_max_size}
          />
        ) : (
          <input
            type="text"
            onChange={e => this.onChangeQuote(e.target.value)}
            value={state.quote}
            // step={selectedProduct.quote_increment}
            // min={selectedProduct.quote_increment}
          />
        )}
        <Preview productId={selectedProduct.id} key={selectedProduct.id} />
      </form>
    );
  }
}
