import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../index'

const props = {
  total_income: 1000,
  total_expense: 800
};

describe('test TotalPrice component', () => {
  it('test total_income && total_expense', () => {
    const wrapper = shallow(<TotalPrice {...props} />);
    expect(wrapper.find('#income').text() * 1).toEqual(1000);
    expect(wrapper.find('#expense').text() * 1).toEqual(800);
  })
});
