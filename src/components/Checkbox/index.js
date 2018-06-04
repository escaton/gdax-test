// @flow
import * as React from 'react';
import './Checkbox.css';
import { block } from 'nano-bem';

const b = block('Checkbox');

export default class Checkbox extends React.PureComponent<{
  onEdit: string => any,
  label: string,
  name: string,
  value: string,
  checked: boolean
}> {
  static idCounter = 0;
  static getId = () => {
    Checkbox.idCounter++;
    return `Checkbox-${Checkbox.idCounter}`;
  };
  onChange = (e: *) => {
    this.props.onEdit(e.target.value);
  };
  render() {
    const { onEdit, label, ...rest } = this.props;
    const id = this.constructor.getId();
    return (
      <div className={b()}>
        <input
          id={id}
          className={b('control')}
          type="radio"
          onChange={this.onChange}
          {...rest}
        />
        <label htmlFor={id} className={b('label')}>
          {label}
        </label>
      </div>
    );
  }
}
