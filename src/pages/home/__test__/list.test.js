import React from 'react';
import { shallow } from 'enzyme';
import List from '../components/list'

const list = [
  {
    id: 1,
    event: '去云南旅游',
    price: 200,
    date: '2019-01-01',
    type: 'expense',
    icon: ['fas','plane']
  },
  {
    id: 2,
    event: '奖金收入',
    price: 80000,
    date: '2019-02-06',
    type: 'income',
    icon: ['fas','hand-holding-usd']
  }
];

const props = {
  list,
  modifyItem: jest.fn(), // 给模拟点击事件响应
  deleteItem: jest.fn()
};

let wrapper;
describe('测试价格列表组件', () => {
  // 每次测试前都会执行
  beforeEach(() => {
    wrapper = shallow(<List {...props}/>);
  });
  it('匹配组件快照', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('渲染出的列表行，数量是否正确', () => {
    expect(wrapper.find('.App-layout-row').length).toEqual(list.length);
  });
  it('渲染出的列表行，图标是否正确', () => {
    const iconList = wrapper.find('.App-rotate-icon');
    // 测试图标数量
    expect(iconList.length).toEqual(2);
    // 测试图标是否正确，测试一个就行了。下同
    expect(iconList.first().props().icon).toEqual(list[0].icon)
  });
  it('渲染出的列表行，标题是否正确', () => {
    // 拿到所有的行
    const lineList = wrapper.find('.App-layout-row');
    // 取第一行的所有列
    const firstLineCols = lineList.first().find('.App-layout-col');
    // 测试第一行的标题(因为antd组件的原因，所以这里需要通过props().children的方式来获取text内容)
    expect(firstLineCols.at(1).props().children).toEqual('去云南旅游');
  });
  it('渲染出的列表行，金额是否正确', () => {
    // 拿到所有的行
    const lineList = wrapper.find('.App-layout-row');
    // 取第一行的所有列
    const firstLineCols = lineList.first().find('.App-layout-col');
    // 测试第一行的标题(因为antd组件的原因，所以这里需要通过props().children的方式来获取text内容)
    expect(firstLineCols.at(2).props().children).toEqual('-200');
  });
  it('模拟鼠标点击事件', () => {
    // 拿到所有的行
    const lineList = wrapper.find('.App-layout-row');
    // 取第一行的所有列
    const firstLineCols = lineList.first().find('.App-layout-col');
    // 获取到按钮DOM, 模拟点击第一个按钮
    firstLineCols.find('Button').first().simulate('click');
    // 模拟DOM点击事件, 并且传参值为list[0]
    // 没有参数的方法为 toHaveBeenCalled()
    // 注意：这里函数的值必须为 jest.fn()，否则无法获得响应
    expect(props.modifyItem).toHaveBeenCalledWith(list[0]);
    // 模拟点击第二个按钮
    firstLineCols.find('Button').at(1).simulate('click');
    expect(props.deleteItem).toHaveBeenCalledWith(list[0].id);
  })
});
