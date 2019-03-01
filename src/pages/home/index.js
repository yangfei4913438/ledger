import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button, Tabs, DatePicker, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jsonLang } from '../../lang'
import ExportJsonExcel from 'js-export-excel';
import { LocalStorage } from 'yf-jstools'
import List from './components/list'
import TotalPrice from './components/totalPrice'
import { connect } from 'react-redux'
import { createActions } from './store'
import withWrapper from '../withWrapper'
import { withRouter } from 'react-router-dom'
import Create from '../create'
import './home.styl'
import Loader from 'react-loaders'
import './react-loader.scss'

class Home extends PureComponent {
  componentDidMount () {
    // 初始化数据
    this.props.initData();
  }

  // 创建对象
  createItem = () => {
    this.props.modifyShowCreate(true);
    this.props.modifyIsEdit(false);
    this.props.currentEditClear();
  };

  render() {
    // 数据映射
    const { defaultLang, list, showCreate, listLoader } = this.props;
    // 方法映射
    const { changeLang, downloadExcel, selectDate } = this.props;
    // antd 标签页组件
    const TabPane = Tabs.TabPane;
    // antd 月份选择组件
    const { MonthPicker } = DatePicker;
    return (
      <Fragment>
        {
          showCreate ? <Create /> :
            <Fragment>
              <Row style={{height: '60px', borderBottom: '1px solid #ccc', marginBottom: '15px'}}
                   type="flex" justify="space-between" align="middle">
                <Col span={4}>
                  <MonthPicker onChange={selectDate}/>
                </Col>
                <Col span={9} pull={2} className={'App-title-font'}>
                  <TotalPrice />
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                  <Radio.Group defaultValue={defaultLang} buttonStyle="solid" size={"default"} onChange={changeLang}>
                    <Radio.Button value="zh-cn">简体中文</Radio.Button>
                    <Radio.Button value="zh-tw">繁體中文</Radio.Button>
                    <Radio.Button value="en">English</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
              { listLoader && <Loader active={true} type='ball-spin-fade-loader' innerClassName='loader-layer' /> }
              <Tabs type="card">
                <TabPane tab={<span><FontAwesomeIcon icon={['fas','book']}/> {jsonLang.btn.listMode}</span>} key="1">
                  <Row type="flex" justify="space-between" align="middle">
                    <Col span={4}/>
                    <Col span={3} style={{textAlign: 'right'}}>
                      <Button type="primary" size={"small"} onClick={() => downloadExcel(list)}>{jsonLang.btn.tableDownload}</Button>
                    </Col>
                  </Row>
                  <Button type="primary" className={'App-add-record'} onClick={this.createItem}>
                    <FontAwesomeIcon icon={['fas','plus-circle']} style={{marginRight: '8px'}} transform="shrink--8"/>
                    {jsonLang.btn.add_record}
                  </Button>
                  <Row className="App-layout-row">
                    <Col span={2} className="App-layout-col App-table-th">{jsonLang.label.type}</Col>
                    <Col span={10} className="App-layout-col App-table-th">{jsonLang.label.title}</Col>
                    <Col span={4} className="App-layout-col App-table-th">{jsonLang.label.price}({jsonLang.label.yuan})</Col>
                    <Col span={4} className="App-layout-col App-table-th">{jsonLang.label.date}</Col>
                    <Col span={4} className="App-layout-col App-table-th">{jsonLang.label.operation}</Col>
                  </Row>
                  <List />
                </TabPane>
                <TabPane tab={<span><FontAwesomeIcon icon={['fas','chart-pie']}/> {jsonLang.btn.chartMode}</span>} key="2">
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </Fragment>
        }
      </Fragment>
    );
  }
}

// 映射数据
const mapStatesToProps = (state) => {
  return {
    defaultLang: state.getIn(['home', 'defaultLang']),
    showCreate: state.getIn(['home', 'showCreate']),
    listLoader: state.getIn(['home', 'listLoader']),
    list: state.getIn(['home', 'list']) ? state.getIn(['home', 'list']).toJS() : null
  }
};

// 映射dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    initData () {
      dispatch(createActions.initData());
    },
    // 修改是否为编辑状态
    modifyIsEdit (res) {
      dispatch(createActions.modifyIsEdit(res));
    },
    // 修改是否显示创建组件
    modifyShowCreate (res) {
      dispatch(createActions.modifyShowCreate(res));
    },
    // 当前编辑对象清空
    currentEditClear () {
      dispatch(createActions.modifyIncomeIconID(-1));
      dispatch(createActions.modifyExpenseIconID(-1));
      dispatch(createActions.currentEdit(null));
    },
    // 选中日期
    selectDate (e, v) {
      console.log(e, v);
      dispatch(createActions.chooseDate(v));
    },
    // 修改语言
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
    },
    // 下载 Excel 表格
    downloadExcel (list) {
      if (list && typeof list === typeof [1, 2] && list.length > 0) {
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
};

export default connect(mapStatesToProps,mapDispatchToProps)(withRouter(withWrapper(Home)));
