import React, { PureComponent, Fragment } from 'react';
import {Row, Col, Tabs} from 'antd';
import { Array } from 'yf-jstools'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {jsonLang} from '../../../../lang/index';
import { connect } from 'react-redux'
import { createActions } from '../../store'

class Category extends PureComponent {
  render () {
    const TabPane = Tabs.TabPane;
    const { income, expense, activeKey, categorys, onSelectCategory, onSelectTab, arr, tid } = this.props;
    const list = Array.split_array(categorys, 4);
    const tab = arr.filter(o => o.id === parseInt(tid))[0];
    return (
      <Fragment>
        <Tabs type="card" className={'App-tabs'}  defaultActiveKey={ tid ? tab.type : activeKey} onChange={onSelectTab}>
          <TabPane tab={<span><FontAwesomeIcon icon={['far','calendar-plus']}/> {jsonLang.label.income}</span>} key="income">
            {
              list.map((item, idx) => {
                return (
                  <Row className={'icon-row'} type="flex" justify="space-around" align="middle" key={idx}>
                    {
                      item.map((row, idx2) =>{
                        const iconClass = row.id === income.id ? 'category-icon active' : 'category-icon';
                        return (
                          <Col span={3} className={iconClass} key={idx2} onClick={() => onSelectCategory('income', row.id)}>
                            <FontAwesomeIcon icon={row.icon}/> {row.name}
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              })
            }
          </TabPane>
          <TabPane tab={<span><FontAwesomeIcon icon={['far','calendar-minus']}/> {jsonLang.label.expense} </span>} key="expense">
            {
              list.map((item, idx) => {
                return (
                  <Row className={'icon-row'} type="flex" justify="space-around" align="middle" key={idx}>
                    {
                      item.map((row, idx2) =>{
                        const iconClass = row.id === expense.id ? 'category-icon active' : 'category-icon';
                        return (
                          <Col span={3} className={iconClass} key={idx2} onClick={() => onSelectCategory('expense', row.id)}>
                            <FontAwesomeIcon icon={row.icon}/> {row.name}
                          </Col>
                        )
                      })
                    }
                  </Row>
                )
              })
            }
          </TabPane>
        </Tabs>
      </Fragment>
    )
  }
}


// 映射数据
const mapStatesToProps = (state) => {
  return {
    income: state.getIn(['create', 'income']).toJS(),
    expense: state.getIn(['create', 'expense']).toJS(),
    activeKey: state.getIn(['create', 'activeKey']),
    categorys: state.getIn(['create', 'categorys']).toJS(),
    arr: state.getIn(['home', 'list']).toJS()
  }
};

// 映射dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCategory(type, id) {
      switch (type) {
        case 'income':
          dispatch(createActions.modifyIncomeIconID(id));
          break;
        default:
          dispatch(createActions.modifyExpenseIconID(id));
          break;
      }
    },
    onSelectTab(key) {
      dispatch(createActions.modifyChooseTab(key));
    }
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(Category);
