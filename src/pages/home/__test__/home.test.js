import React from 'react';
import { Home } from '../index';
import db from '../../../../db.json';

// 字体库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

const props = {
    list: db.list,
    showCreate: false,
    listLoader: false,
    initData: sinon.spy(),
    modifyShowCreate: sinon.spy(),
    modifyIsEdit: sinon.spy(),
    currentEditClear: sinon.spy(),
    downloadExcel: sinon.spy(),
    selectDate: sinon.spy()
};

let wrapper;
describe('测试列表模式容器组件', () => {
    // 每次测试前都会执行
    beforeEach(() => {
        wrapper = shallow(<Home {...props}/>);
    });
    it('匹配组件快照', () => {
        expect(wrapper).toMatchSnapshot()
    });
    it('初始化函数测试', ()=>{
        // 组件加载时，默认执行了初始化函数。每次测试又会调用一次加载，所以是2.
        expect(props.initData.callCount).toEqual(2);
    });
    it('表格下载按钮测试', () => {
        // 点击
        wrapper.find('#downloadExcel').simulate('click');
        // 点击次数测试
        expect(props.downloadExcel.callCount).toEqual(1);
        // 验证函数调用的传参, 没参数就啥都别写。
        expect(props.downloadExcel.calledWith()).toBe(true);
    });
    it('新增记录按钮测试', () => {
        // 点击
        wrapper.find('.App-add-record').simulate('click');
        // 点击次数测试
        expect(props.modifyShowCreate.callCount).toEqual(1);
        expect(props.modifyIsEdit.callCount).toEqual(1);
        expect(props.currentEditClear.callCount).toEqual(1);
        // 验证函数调用的传参, 没参数就啥都别写。
        expect(props.modifyShowCreate.calledWith(true)).toBe(true);
        expect(props.modifyIsEdit.calledWith(false)).toBe(true);
        expect(props.currentEditClear.calledWith()).toBe(true);
    });
});
