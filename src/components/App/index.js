// @flow
import * as React from 'react';
import Loading from '../Loading';
import WithGdax from '../WithGdax';
import './App.css';

import type { ProductInfo } from 'gdax';
import type { WithGdaxLoader } from '../WithGdax';

class App extends React.PureComponent<{
  loading: boolean,
  error: any,
  data: ?(ProductInfo[]),
  load: WithGdaxLoader
}> {
  componentDidMount() {
    this.props.load(service => service.getProducts());
  }
  render() {
    const { loading, error, data } = this.props;
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <div>An error occurred</div>;
    } else {
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
  }
}

export default WithGdax(App);
