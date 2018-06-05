// @flow
import * as React from 'react';
import WithGdax from '../../hoc/WithGdax';
import Loading from '../Loading';

import { sumCalculation, formatSum } from './utils';
import type { ProductInfo } from '../../services/gdax';

import { block } from 'nano-bem';
import './Preview.css';

const b = block('Preview');

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
    const [orders, currency, minimalAmount] =
      mode === 'buy'
        ? [data.asks, product.base_currency, product.base_min_size]
        : [data.bids, product.quote_currency, product.quote_increment];
    const sum = sumCalculation(orders, amount);
    if (sum >= 0) {
      const displaySum = formatSum(minimalAmount, sum);
      return (
        <React.Fragment>
          <span className={b('currency')}>{`${currency} ≈`}</span>
          <span className={b('space')} />
          <span className={b('sum')}>{displaySum}</span>
        </React.Fragment>
      );
    } else {
      return `not enough data`;
    }
  }
  render() {
    const { state, props } = this;
    return (
      <div className={b()}>
        <ProductsBookProvider productId={props.product.id} time={state.time}>
          {(loading, data, error) => {
            if (data) {
              return this.renderPreview(data);
            } else if (error) {
              return <span>An error occurred</span>;
            } else {
              return <Loading />;
            }
          }}
        </ProductsBookProvider>
      </div>
    );
  }
}
