import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../components/totalPrice'

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
    // 保证组件DOM和上次一致，如果要更新可以使用 -u 参数更新组件
    expect(wrapper).toMatchSnapshot()
  });
  it('测试收入金额和支出金额', () => {
    expect(wrapper.find('#income').text() * 1).toEqual(1000);
    expect(wrapper.find('#expense').text() * 1).toEqual(800);
  })
});
