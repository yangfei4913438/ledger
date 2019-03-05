import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Button, Tabs, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jsonLang } from '../../lang'
import ExportJsonExcel from 'js-export-excel';
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

// export 是为了单元测试，剥离外层的高阶组件。
export class Home extends PureComponent {
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
    const { list, showCreate, listLoader } = this.props;
    // 方法映射
    const { downloadExcel, selectDate } = this.props;
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
                <Col span={8}>
                  <MonthPicker onChange={selectDate}/>
                </Col>
                <Col span={16} className={'App-title-font'}>
                  <TotalPrice />
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
      dispatch(createActions.chooseDate(v));
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
