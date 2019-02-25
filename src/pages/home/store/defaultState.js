import { fromJS } from 'immutable'
import { LocalStorage } from 'yf-jstools'

// 初始化对象，设置为不可变的immutable对象
export const defaultState = fromJS({
  defaultLang: LocalStorage.getValue('lang'),
  list: [
    {
      id: 1,
      event: '游泳卡',
      price: 5000,
      date: '2019-01-10',
      type: 'expense',
      icon: ['fas','swimmer']
    }
  ],
  total_expense: 0,
  total_income: 0,
  choose_date: null
});
