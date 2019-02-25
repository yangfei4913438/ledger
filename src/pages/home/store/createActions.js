import * as types from './actionTypes'
// import axios from 'axios'

// 创建新列，模拟操作
export const createNewRecord = (list) => {
  return {
    type: types.createNewRecord,
    list,
    ...totalData(list)
  }
};

// 删除记录
export const delRecord = (arr, id) => {
  const list = arr.filter(item => item.id !== id);
  return {
    type: types.delRecord,
    list,
    ...totalData(list)
  }
};

// 修改记录
export const modifyRecord = (arr, id) => {
  let list = arr.map(row => {
    if (row.id === id) {
      row.event = '更新后的标题';
    }
    return row
  });
  return {
    type: types.modifyRecord,
    list
  }
};

// 修改汇总记录的函数
const totalData = (arr) => {
  let expense = 0;
  let income = 0;
  arr.forEach(item => {
    if (item.type === 'expense') {
      expense += item.price
    } else {
      income += item.price
    }
  });
  return {
    expense,
    income
  }
};

// 修改汇总记录
export const modifyTotalData = (arr) => {
  return {
    type: types.modifyTotalData,
    ...totalData(arr)
  }
};

// 选择日期
export const chooseDate = (arr, val) => {
  // 有值的时候，过滤，没有值的时候，用全部
  let list = val ? arr.filter(item => {
    // 从下标0开始，截取7位字符
    return item.date.substr(0, 7) === val
  }) : arr;

  return {
    type: types.chooseDate,
    choose_date: val,
    ...totalData(list)
  }
};
