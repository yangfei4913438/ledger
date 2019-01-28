import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../index'

const props = {
  total_income: 1000,
  total_expense: 800
};

let wrapper;
describe('测试价格汇总组件', () => {
  // 每次测试前都会执行
  beforeEach(() => {
    wrapper =  shallow(<TotalPrice {...props} />);
  });
  it('匹配组件快照', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('测试收入金额和支出金额', () => {
    expect(wrapper.find('#income').text() * 1).toEqual(1000);
    expect(wrapper.find('#expense').text() * 1).toEqual(800);
  })
});
