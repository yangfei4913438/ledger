import { fromJS } from 'immutable'

// 初始化对象，设置为不可变的immutable对象
export const defaultState = fromJS({
  list: null,
  categories: null,
  current_edit: null,
  total_expense: 0,
  total_income: 0,
  choose_date: null,
  income_cid: -1,
  expense_cid: -1,
  activeKey: 'income',
	homeActiveKey: 'chart',
  isEdit: false,
  showCreate: false,
  listLoader: false
});
