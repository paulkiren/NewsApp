/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
import BakeSale from '../BakeSale';
import {configure, shallow} from 'enzyme';
describe('Bake Sales  Screen', () => {
 it('renders correctly', () => {
   renderer.create(<BakeSale  />);

 });
 it('renders as expected', () => {
  //when
  const wrapper = shallow(
      <BakeSale />
  );
  //expect
  expect(wrapper).toMatchSnapshot();
});
});
 