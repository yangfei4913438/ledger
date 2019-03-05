import React from 'react';
import { Button } from 'antd';
import { List } from '../components/list'
import db from '../../../../db.json'

// 字体库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

const props = {
  list: db.list,
  choose_date: null,
  modifyIsEdit: sinon.spy(), // mock一个函数，然后，属性就可以接收到各种操作信息。
  modifyShowCreate: sinon.spy(),
  currentEdit: sinon.spy(),
  deleteItem: sinon.spy()
};

let wrapper;
describe('测试记账列表组件', () => {
  // 每次测试前都会执行
  beforeEach(() => {
    wrapper = shallow(<List {...props}/>);
  });
  it('匹配组件快照', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('检查列表中的button数量', () => {
    // console.log(JSON.stringify(wrapper.props().list), db.list.length);
    expect(wrapper.find(Button).length).toEqual(db.list.length * 2);
  });
  it('检查修改操作', ()=>{
    // 调用函数
    wrapper.find('.TestBtnUpdate').first().simulate('click');
    // 验证函数调用次数是否为1【注意：这里是累计值】
    expect(props.currentEdit.callCount).toEqual(1);
    expect(props.modifyIsEdit.callCount).toEqual(1);
    expect(props.modifyShowCreate.callCount).toEqual(1);
    // 传参检查
    expect(props.currentEdit.calledWith(db.list[0])).toBe(true);
    expect(props.modifyIsEdit.calledWith(true)).toBe(true);
    expect(props.modifyShowCreate.calledWith(true)).toBe(true);
  });
  it('检查删除操作', ()=>{
    // 调用函数
    wrapper.find('.TestBtnDel').first().simulate('click');
    // 验证函数调用次数是否为1【注意：这里是累计值】
    expect(props.deleteItem.callCount).toEqual(1);
    // 验证函数调用的传参
    expect(props.deleteItem.calledWith(db.list[0].id)).toBe(true);
  });
});
