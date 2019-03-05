import React from 'react';
import { shallow } from 'enzyme';
import Category from '../component/category'

const categorys = [
  {
    id: 1,
    name: '金钱',
    icon: ['fas', 'hand-holding-usd']
  },
  {
    id: 2,
    name: '飞机',
    icon: ['fas', 'plane']
  },
  {
    id: 3,
    name: '游泳',
    icon: ['fas', 'swimmer']
  }
];

const props = {
  categorys
};

let wrapper;

describe('测试分类图标组件', () => {
  // 每次测试前都会执行
  beforeEach(() => {
    wrapper = shallow(<Category {...props}/>);
  });

  it('匹配组件快照', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('测试图标渲染', () => {
    // expect(wrapper.find('.category-icon').length).toEqual(categorys.length);
    // expect(wrapper.find('.category-icon .active').length).toEqual(0);
    // const firstIcon = wrapper.find('.category-icon').first();
    // expect(firstIcon.props().children[0]).toEqual(categorys[0].name);
  });

  it('测试图标点击', () => {
    // wrapper.find('.category-icon').first().simulate('click');
    // expect(wrapper.find('.category-icon').first().hasClass('active')).toEqual(true);
    // wrapper.find('.category-icon').at(1).simulate('click');
    // expect(wrapper.find('.category-icon').at(1).hasClass('active')).toEqual(true);
    // expect(wrapper.find('.category-icon').first().hasClass('active')).toEqual(false);
  });
});
