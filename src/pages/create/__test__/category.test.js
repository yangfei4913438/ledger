import React from 'react';
import { Category } from '../component/category';
import { Col, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import db from '../../../../db.json';

// 字体库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

const props = {
    income_cid: 1,
    expense_cid: 1,
    activeKey: 'income',
    isEdit: false,
    current_edit: null,
    categories: db.categories,
    onSelectTab: sinon.spy(),
    onSelectCategory: sinon.spy()
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
        const TabPane = Tabs.TabPane;
        // 定位到第一个标签页，也就是收入页
        const tab = wrapper.find(TabPane).first();
        // 测试图标类型的数量
        expect(tab.find(Col).length).toEqual(props.categories.length);
        // 默认情况下，高亮的图标是没有的
        expect(tab.find('.App-font-icon .active').length).toEqual(0);
        // 图标值匹配
        expect(tab.find(FontAwesomeIcon).first().props().icon).toEqual(props.categories[0].icon)
    });

    it('测试图标点击', () => {
        const TabPane = Tabs.TabPane;
        // 定位到第一个标签页，也就是收入页
        const tab = wrapper.find(TabPane).first();
        // 点击指定的图标
        tab.find(Col).at(1).simulate('click');
        // 被调用次数验证
        expect(props.onSelectCategory.callCount).toEqual(1);
        // 调用传参验证
        expect(props.onSelectCategory.calledWith('income', props.categories[1].id)).toBe(true);
    });
});
