// @flow
import * as React from 'react';
import type { ProductInfo } from 'gdax';

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
      <select value={selectedId} onChange={this.onChange}>
        {products.map(value => (
          <option key={value.id} value={value.id}>
            {value.display_name}
          </option>
        ))}
      </select>
    );
  }
}
