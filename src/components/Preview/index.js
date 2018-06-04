// @flow
import * as React from 'react';
import WithGdax from '../../hoc/WithGdax';

const ProductsBookProvider = WithGdax((service, props) =>
  service.getProductOrderBook(props.productId, { level: 2 })
);

export default class Preview extends React.PureComponent<*, *> {
  tick: IntervalID;
  state = {
    time: Date.now()
  };
  componentDidMount() {
    this.tick = setInterval(this.nextTick, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.tick);
  }
  nextTick = () => {
    this.setState({ time: Date.now() });
  };
  render() {
    const { state, props } = this;
    return (
      <ProductsBookProvider productId={props.productId} time={state.time}>
        {(loading, data, error) => {
          if (data) {
            return <span>{data.asks[0][1]}</span>;
          } else {
            return null;
          }
        }}
      </ProductsBookProvider>
    );
  }
}
