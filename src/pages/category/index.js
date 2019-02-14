import React, { Component, Fragment } from 'react';
import {Row, Col, Tabs} from 'antd';
import { Array } from 'yf-jstools'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {jsonLang} from '../../lang';

class Category extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (type, id) {
    const { onSelectCategory } = this.props;
    onSelectCategory(type, id)
  }
  render () {
    const TabPane = Tabs.TabPane;
    const { status } = this.props;
    const list = Array.split_array(status.categorys, 4);
    return (
      <Fragment>
        <Tabs type="card" className={'App-tabs'}>
          <TabPane tab={<span><FontAwesomeIcon icon={['far','calendar-plus']}/> {jsonLang.label.income}</span>} key="1">
            {
              list.map((item, idx) => {
                return (
                  <Row className={'icon-row'} type="flex" justify="space-around" align="middle" key={idx}>
                    {
                      item.map((row, idx2) =>{
                        const iconClass = row.id === status.income.id ? 'category-icon active' : 'category-icon';
                        return (
                          <Col span={3} className={iconClass} key={idx2} onClick={() => this.handleClick('income', row.id)}>
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
          <TabPane tab={<span><FontAwesomeIcon icon={['far','calendar-minus']}/> {jsonLang.label.expense} </span>} key="2">
            {
              list.map((item, idx) => {
                return (
                  <Row className={'icon-row'} type="flex" justify="space-around" align="middle" key={idx}>
                    {
                      item.map((row, idx2) =>{
                        const iconClass = row.id === status.expense.id ? 'category-icon active' : 'category-icon';
                        return (
                          <Col span={3} className={iconClass} key={idx2} onClick={() => this.handleClick('expense', row.id)}>
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

export default Category;
