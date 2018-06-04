// @flow
import * as React from 'react';
import { block } from 'nano-bem';
import './Loading.css';

const b = block('Loading');

const Loading = () => (
  <div className={b()}>
    <i className={b('dot', { pos: '1' })} />
    <i className={b('dot', { pos: '2' })} />
    <i className={b('dot', { pos: '3' })} />
  </div>
);

export default Loading;
