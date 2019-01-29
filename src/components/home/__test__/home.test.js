import React from 'react'
import { shallow } from 'enzyme';
import Home from '../'

import List from '../../list'
import TotalPrice from '../../TotalPrice'

let wrapper;
describe('测试home组件', () => {
  // 每次测试前都会执行
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });
  it('匹配组件快照', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('子组件加载测试', () => {
    // 首页加载的时候，默认有三条记录
    expect(wrapper.find(List).props().list.length).toEqual(3);
    // 首页加载的默认收入(全部)
    expect(wrapper.find(TotalPrice).props().total_income).toEqual(80000);
  });
  it('测试新增记录', () => {
    // 点击事件
    wrapper.find('.App-add-record').simulate('click');
    // wrapper.state('list') 就是取组件内this.state中的list属性值
    expect(wrapper.state('list').length).toEqual(4);
    // 再次点击
    wrapper.find('.App-add-record').simulate('click');
    expect(wrapper.state('list').length).toEqual(5);
  })
});
