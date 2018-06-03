// @flow
import * as React from 'react';
import GdaxService from '../../services/gdax';
import Bluebird from 'bluebird';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default function WithGdax<Props: {}, Data>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<
  $Diff<
    Props,
    {
      loading: boolean | void,
      error: any,
      data: ?Data,
      load: WithGdaxLoader
    }
  >
> {
  return class extends React.PureComponent<
    *,
    {
      loading: boolean,
      error: any,
      data: ?Data
    }
  > {
    static displayName = `WithGdax(${getDisplayName(WrappedComponent)})`;
    promise: ?Bluebird$Promise<Data>;
    service: *;
    state = {
      loading: false,
      error: null,
      data: null
    };
    service = GdaxService.get();
    load: WithGdaxLoader = callback => {
      this.cancelPromise();
      this.setState({
        loading: true
      });
      this.promise = Bluebird.resolve(callback(this.service));
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
    };
    cancelPromise() {
      this.setState({
        loading: false
      });
      if (this.promise) {
        this.promise.cancel();
      }
    }
    componentWillUnmount() {
      this.cancelPromise();
    }
    render() {
      const { state, props } = this;
      return (
        <WrappedComponent
          {...props}
          loading={state.loading}
          error={state.error}
          data={state.data}
          load={this.load}
        />
      );
    }
  };
}

export type WithGdaxLoader = ((GdaxService) => Promise<*>) => void;
