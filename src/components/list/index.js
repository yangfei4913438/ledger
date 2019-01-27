import React, { Fragment } from 'react'
import { Button, Col, Row } from 'antd';
import { jsonLang } from '../../lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = (props) => {
  const { list, deleteItem, modifyItem } = props;
  return (
    <Fragment>
      <Row className="App-layout-row">
        <Col span={2} className="App-layout-col App-table-th">{jsonLang.label.type}</Col>
        <Col span={10} className="App-layout-col App-table-th">{jsonLang.label.title}</Col>
        <Col span={4} className="App-layout-col App-table-th">{jsonLang.label.price}({jsonLang.label.yuan})</Col>
        <Col span={4} className="App-layout-col App-table-th">{jsonLang.label.date}</Col>
        <Col span={4} className="App-layout-col App-table-th">{jsonLang.label.operation}</Col>
      </Row>
      {
        list.map(item => {
          return (
            <Row className="App-layout-row" key={item.id}>
              <Col span={2} className="App-layout-col"><FontAwesomeIcon className="App-rotate-icon" icon={ item.icon } transform="shrink--8"/></Col>
              <Col span={10} className="App-layout-col">{ item.event }</Col>
              <Col span={4} className="App-layout-col">{ item.type === 'income' ? `+${item.price}` : `-${item.price}` }</Col>
              <Col span={4} className="App-layout-col">{ item.date }</Col>
              <Col span={2} className="App-layout-col">
                <Button type="primary" onClick={() => modifyItem(item)}>{jsonLang.btn.edit}</Button>
              </Col>
              <Col span={2} className="App-layout-col">
                <Button type="danger" onClick={() => deleteItem(item.id)}>{jsonLang.btn.del}</Button>
              </Col>
            </Row>
          )
        })
      }
    </Fragment>
  )
};

export default List;
