// @flow
import * as React from 'react';
import GdaxService from '../../services/gdax';
import Bluebird from 'bluebird';

Bluebird.config({
  cancellation: true
});

export default function WithGdax<Props, Data: *>(
  callback: (GdaxService, Props) => Promise<Data>
) {
  type State = {
    loading: boolean,
    data: ?Data,
    error: any
  };
  return class GdaxProvider extends React.PureComponent<
    {
      ...Props,
      children: (boolean, ?Data, any) => any
    },
    State
  > {
    promise: *;
    service: *;
    service = GdaxService.get();
    state = {
      loading: false,
      data: null,
      error: null
    };
    load() {
      this.cancelPromise();
      this.setState({
        loading: true
      });
      this.promise = Bluebird.resolve(callback(this.service, this.props));
      this.promise.then(
        data => {
          this.setState({
            loading: false,
            error: null,
            data
          });
        },
        error => {
          this.setState({
            data: null,
            loading: false,
            error
          });
        }
      );
    }
    componentDidMount() {
      this.load();
    }
    componentDidUpdate(prevProps: Props) {
      if (prevProps !== this.props) {
        // props updated
        this.load();
      }
    }
    componentWillUnmount() {
      this.cancelPromise();
    }
    cancelPromise() {
      if (this.promise) {
        this.promise.cancel();
      }
    }
    render() {
      const { loading, data, error } = this.state;
      return this.props.children(loading, data, error);
    }
  };
}
