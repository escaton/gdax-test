// @flow
import * as React from 'react';
import { block } from 'nano-bem';
import './ProductSelect.css';
import type { ProductInfo } from '../../services/gdax';

const b = block('ProductSelect');

export default class ProductSelect<T: ProductInfo> extends React.PureComponent<{
  products: T[],
  selectedId: string,
  onChange: string => void
}> {
  onChange = ({ target: { value } }: *) => {
    this.props.onChange(value);
  };
  render() {
    const { products, selectedId } = this.props;
    return (
      <select className={b()} value={selectedId} onChange={this.onChange}>
        {products.map(value => (
          <option key={value.id} value={value.id} className={b('option')}>
            {value.display_name}
          </option>
        ))}
      </select>
    );
  }
}
