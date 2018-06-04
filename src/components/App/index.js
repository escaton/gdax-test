// @flow
import * as React from 'react';
import Loading from '../Loading';
import Form from '../Form';
import WithGdax from '../../hoc/WithGdax';

import './App.css';

const ProductsProvider = WithGdax(service => service.getProducts());

export default class App extends React.PureComponent<{}> {
  render() {
    return (
      <div className="App">
        <ProductsProvider>
          {(loading, products, error) => {
            if (loading) {
              return <Loading />;
            } else if (error) {
              return <div>An error occured</div>;
            } else if (products) {
              return <Form products={products} />;
            } else {
              return null;
            }
          }}
        </ProductsProvider>
      </div>
    );
  }
}
