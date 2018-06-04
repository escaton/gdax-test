// @flow
import * as React from 'react';
import WithGdax from '../../hoc/WithGdax';
import Loading from '../Loading';

import { sumCalculation } from './utils';
import type { ProductInfo } from 'gdax';

const ProductsBookProvider = WithGdax((service, props) =>
  service.getProductOrderBook(props.productId, { level: 2 })
);

export default class Preview<
  Props: {
    autorefresh?: boolean,
    product: ProductInfo,
    mode: 'buy' | 'sell',
    amount: number
  }
> extends React.PureComponent<Props, *> {
  tick: IntervalID;
  state = {
    time: Date.now()
  };
  startRefresh() {
    this.tick = setInterval(this.nextTick, 2000);
  }
  stopRefresh() {
    clearInterval(this.tick);
  }
  componentDidMount() {
    if (this.props.autorefresh) {
      this.startRefresh();
    }
  }
  componentWillUnmount() {
    if (this.props.autorefresh) {
      this.stopRefresh();
    }
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.autorefresh !== this.props.autorefresh) {
      if (this.props.autorefresh) {
        this.startRefresh();
      } else {
        this.stopRefresh();
      }
    }
  }
  nextTick = () => {
    this.setState({ time: Date.now() });
  };
  renderPreview(data: *) {
    const { mode, amount, product } = this.props;
    const orders = mode === 'buy' ? data.asks : data.bids;
    const currency = product.quote_currency;
    const sum = sumCalculation(orders, amount);
    if (sum >= 0) {
      return `${currency} ${sum}`;
    } else {
      return `not enough data`;
    }
  }
  render() {
    const { state, props } = this;
    return (
      <ProductsBookProvider productId={props.product.id} time={state.time}>
        {(loading, data, error) => {
          if (data) {
            return <span>{this.renderPreview(data)}</span>;
          } else if (error) {
            return <span>An error accured</span>;
          } else {
            return <Loading />;
          }
        }}
      </ProductsBookProvider>
    );
  }
}
