import React from 'react';
import { TotalPrice } from '../components/totalPrice'

const props = {
  total_expense: 666,
  total_income: 999
};

let wrapper;
describe('测试价格汇总组件', () => {
    // 每次测试前都会执行
    beforeEach(() => {
        wrapper = shallow(<TotalPrice {...props}/>);
    });
    it('匹配组件快照', () => {
        expect(wrapper).toMatchSnapshot()
    });
    it('检查收入金额', ()=>{
        expect(wrapper.find('#income').text() * 1).toEqual(props.total_income);
    });
    it('检查支出金额', ()=>{
        expect(wrapper.find('#expense').text() * 1).toEqual(props.total_expense);
    })
});
