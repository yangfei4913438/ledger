import { fromJS } from 'immutable'
import { LocalStorage } from 'yf-jstools'

// 初始化对象，设置为不可变的immutable对象
export const defaultState = fromJS({
  defaultLang: LocalStorage.getValue('lang'),
  list: [],
  total_expense: 0,
  total_income: 0,
  choose_date: null
});
