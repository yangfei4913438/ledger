import { fromJS } from 'immutable'
import * as types from './actionTypes'
import { defaultState } from './defaultState'


export default (state=defaultState, action) => {
  switch (action.type) {
    case types.modifyIncomeIconID:
      return state.merge({
        income: fromJS(action.income)
      });

    case types.modifyExpenseIconID:
      return state.merge({
        expense: fromJS(action.expense)
      });

    case types.modifyChooseTab:
      return state.set('activeKey', action.activeKey);

    default:
      return state
  }
}
