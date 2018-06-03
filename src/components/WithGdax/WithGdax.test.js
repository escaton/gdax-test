import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WithGdax from './';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

it('provides props', () => {
  const Component = class extends React.Component {};
  const Wrapped = WithGdax(Component);
  const result = shallow(<Wrapped />);
  const props = result.props();
  expect(props.data).toEqual(null);
  expect(props.error).toEqual(null);
  expect(props.loading).toEqual(false);
  expect(typeof props.load).toBe('function');
});
