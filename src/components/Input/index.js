// @flow
import * as React from 'react';
import './Input.css';
import { block } from 'nano-bem';

const b = block('Input');

export default class Input extends React.PureComponent<{
  onEdit: string => any,
  label: string,
  error: ?string
}> {
  static idCounter = 0;
  static getId = () => {
    Input.idCounter++;
    return `Input-${Input.idCounter}`;
  };
  onChange = (e: *) => {
    this.props.onEdit(e.target.value);
  };
  onFocus = (e: *) => {
    e.target.select();
  };
  render() {
    const { props } = this;
    const { onEdit, error, label, ...restProps } = props;
    const id = this.constructor.getId();
    return (
      <div className={b()}>
        <input
          id={id}
          onChange={this.onChange}
          onFocus={this.onFocus}
          className={b('control')}
          {...restProps}
        />
        <label htmlFor={id} className={b('label')}>
          {label}
        </label>
        {error ? <span className={b('error')}>{error}</span> : null}
      </div>
    );
  }
}
