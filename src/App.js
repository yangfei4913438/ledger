import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Button, Tabs, DatePicker, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jsonLang } from './lang'
import ExportJsonExcel from 'js-export-excel';
import { LocalStorage } from 'yf-jstools'
import List from './components/list'
import TotalPrice from './components/TotalPrice'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLang: 'zh-cn',
      list: [],
      total_expense: 0,
      total_income: 0,
      choose_date: ''
    };
    // 这里要进行绑定，否则函数无法获取到组件的this对象
    this.changeLang = this.changeLang.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  componentWillMount () {
    const list = [
      {
        id: 1,
        event: '去云南旅游',
        price: 200,
        date: '2019-01-01',
        type: 'expense',
        icon: ['fas','plane']
      },
      {
        id: 2,
        event: '奖金收入',
        price: 80000,
        date: '2019-02-06',
        type: 'income',
        icon: ['fas','hand-holding-usd']
      },
      {
        id: 3,
        event: '游泳卡',
        price: 5000,
        date: '2019-03-10',
        type: 'expense',
        icon: ['fas','swimmer']
      }
    ];
    this.setState({
      defaultLang: LocalStorage.getValue('lang'),
      list: list
    });
    this.getTotal(list);
  }
  render() {
    const TabPane = Tabs.TabPane;
    const { MonthPicker } = DatePicker;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to React</p>
        </header>
        <div className="App-ledger">
          <Row style={{height: '60px', borderBottom: '1px solid #ccc', marginBottom: '15px'}}
               type="flex" justify="space-between" align="middle">
            <Col span={4}>
              <MonthPicker onChange={this.selectDate}/>
            </Col>
            <Col span={9} pull={2} className={'App-title-font'}>
              <TotalPrice total_income={this.state.total_income} total_expense={this.state.total_expense} />
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <Radio.Group defaultValue={this.state.defaultLang} buttonStyle="solid" size={"default"} onChange={this.changeLang}>
                <Radio.Button value="zh-cn">简体中文</Radio.Button>
                <Radio.Button value="zh-tw">繁體中文</Radio.Button>
                <Radio.Button value="en">English</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Tabs type="card">
            <TabPane tab={<span><FontAwesomeIcon icon={['fas','book']}/> {jsonLang.btn.listMode}</span>} key="1">
              <Row type="flex" justify="space-between" align="middle">
                <Col span={4}/>
                <Col span={3} style={{textAlign: 'right'}}>
                  <Button type="primary" size={"small"} onClick={this.downloadExcel}>{jsonLang.btn.tableDownload}</Button>
                </Col>
              </Row>
              <Button type="primary" className={'App-add-record'} onClick={this.createItem}>
                <FontAwesomeIcon icon={['fas','plus-circle']} style={{marginRight: '8px'}} transform="shrink--8"/>
                {jsonLang.btn.add_record}
              </Button>
              <List
                list={this.state.choose_date ? this.state.list.filter(o => o.date.includes(this.state.choose_date)) : this.state.list}
                modifyItem={this.modifyItem}
                deleteItem={this.deleteItem}
              />
            </TabPane>
            <TabPane tab={<span><FontAwesomeIcon icon={['fas','chart-pie']}/> {jsonLang.btn.chartMode}</span>} key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }

  getTotal (list) {
    let expense = 0;
    let income = 0;
    list.forEach(item => {
      if (item.type === 'expense') {
        expense += item.price
      } else {
        income += item.price
      }
    });
    this.setState({
      total_expense: expense,
      total_income: income
    });
  }

  changeLang (e) {
    // 这里不需要直接更新state，最后也没重载的时候，componentWillMount 方法会自动将设置好的值，赋值到state中。
    switch (e.target.value) {
      case 'zh-cn':
        LocalStorage.setValue('lang', 'zh-cn');
        break;
      case 'zh-tw':
        LocalStorage.setValue('lang', 'zh-tw');
        break;
      default:
        LocalStorage.setValue('lang', 'en');
    }
    // 更新语言后，需要手动刷新一次页面。
    window.location.reload();
  }

  modifyItem (item) {
    let list = this.state.list.map(row => {
      if (row.id === item.id) {
        row.event = '更新后的标题';
      }
      return row
    });
    this.setState({
      list
    });
    this.getTotal(list);
  }
  createItem () {
    let max = 0;
    this.state.list.forEach(row => {
      if (row.id > max) {
        max = row.id
      }
    });
    max += 1;
    const item = {
      id: max,
      event: '游泳卡',
      price: 5000,
      date: '2019-01-10',
      type: 'expense',
      icon: ['fas','swimmer']
    };
    const list = [item, ...this.state.list];
    this.setState({
      list
    });
    this.getTotal(list);
  }
  deleteItem (id) {
    const list = this.state.list.filter(item => item.id !== id);
    this.setState({
      list
    });
    this.getTotal(list);
  }

  selectDate (e, v) {
    this.setState({
      choose_date: v
    });
    let list = this.state.list;
    if (v) {
      list = this.state.list.filter(item => {
        // 从下标0开始，截取7位字符
        return item.date.substr(0, 7) === v
      });
    }
    this.getTotal(list);
  }

  downloadExcel () {
    const list = this.state.list ? this.state.list : null;//表格数据
    if (list && typeof list === typeof [1, 2]) {
      // 支出项过滤
      const expenseList = list.filter(item => {
        return item.type === 'expense'
      });
      // 收入项过滤
      const incomeList = list.filter(item => {
        return item.type === 'income'
      });
      // 配置项
      let option = {
        // 文件名
        fileName: '收支明细'
      };
      // sheet页配置
      option.datas = [
        {
          sheetData: expenseList,
          sheetName: '支出',
          sheetFilter:['event','price','date'],
          sheetHeader:['事项','金额','日期'],
        },
        {
          sheetData: incomeList,
          sheetName: '收入',
          sheetFilter:['event','price','date'],
          sheetHeader:['事项','金额','日期'],
        }
      ];
      let toExcel = new ExportJsonExcel(option);
      toExcel.saveExcel()
    } else {
      console.log('指定下载的数据不存在!')
    }
  }
}

export default App;
