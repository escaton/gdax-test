// @flow
import * as React from 'react';
import ProductsSelect from '../ProductsSelect';
import Checkbox from '../Checkbox';
import Input from '../Input';
import Preview from '../Preview';

import * as actions from './actions';
import dispatch from './dispatcher';

import type { State } from './reducer';
import type { ProductInfo } from '../../services/gdax';

import { block } from 'nano-bem';
import './Form.css';

const b = block('Form');

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
      <div>
        <form className={b()}>
          <ProductsSelect
            products={props.products}
            selectedId={selectedProduct.id}
            onChange={this.onChangeProduct}
          />
          <Checkbox
            checked={state.mode === 'buy'}
            name="mode"
            value="buy"
            onEdit={this.onChangeMode}
            label="Buy"
          />
          <Checkbox
            checked={state.mode === 'sell'}
            name="mode"
            value="sell"
            onEdit={this.onChangeMode}
            label="Sell"
          />
          <Input
            type="text"
            placeholder="0.00"
            label={
              state.mode === 'buy'
                ? selectedProduct.quote_currency
                : selectedProduct.base_currency
            }
            onEdit={this.onChangeValue}
            value={state.displayValue}
            error={state.showError ? state.valueError : null}
            onBlur={this.onInputBlur}
          />
        </form>
        <Preview
          product={selectedProduct}
          mode={state.mode}
          amount={state.value}
          key={selectedProduct.id /* refresh on product change */}
        />
      </div>
    );
  }
}
