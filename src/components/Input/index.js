// @flow
import * as React from 'react';

export default class Input extends React.PureComponent<{
  onEdit: string => any,
  error: ?string
}> {
  onChange = (e: *) => {
    this.props.onEdit(e.target.value);
  };
  onFocus = (e: *) => {
    e.target.select();
  };
  render() {
    const { props } = this;
    const { onEdit, error, ...restProps } = props;
    return (
      <React.Fragment>
        <input onChange={this.onChange} onFocus={this.onFocus} {...restProps} />
        {error ? <span>{error}</span> : null}
      </React.Fragment>
    );
  }
}
