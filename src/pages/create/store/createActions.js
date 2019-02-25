import * as types from './actionTypes'
// import axios from 'axios'


// 修改收入图标ID
export const modifyIncomeIconID = (id) => {
  return {
    type: types.modifyIncomeIconID,
    income: { id }
  }
};

// 修改支出图标ID
export const modifyExpenseIconID = (id) => {
  return {
    type: types.modifyExpenseIconID,
    expense: { id }
  }
};

// 修改选中的标签页
export const modifyChooseTab = (key) => {
  return {
    type: types.modifyChooseTab,
    activeKey: key
  }
};
