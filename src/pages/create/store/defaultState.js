import { fromJS } from 'immutable'

// 初始化对象，设置为不可变的immutable对象
export const defaultState = fromJS({
  income: {
    id: -1
  },
  expense: {
    id: -1
  },
  activeKey: 'income',
  categorys: [
    {
      id: 1,
      name: '工资',
      icon: ['fas', 'hand-holding-usd']
    },
    {
      id: 2,
      name: '旅行',
      icon: ['fas', 'plane']
    },
    {
      id: 3,
      name: '健身',
      icon: ['fas', 'swimmer']
    },
    {
      id: 4,
      name: '购物',
      icon: ['fas', 'shopping-cart']
    },
    {
      id: 5,
      name: '餐饮',
      icon: ['fas','utensils']
    },
    {
      id: 6,
      name: '数码',
      icon: ['fas', 'mobile-alt']
    },
    {
      id: 7,
      name: '支付宝',
      icon: ['fab', 'alipay']
    },
    {
      id: 8,
      name: '交通',
      icon: ['fas', 'taxi']
    }
  ]
});
