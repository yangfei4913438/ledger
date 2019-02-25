import React, { PureComponent ,Fragment } from 'react';
import { Form, Input, Button, InputNumber, DatePicker, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createActions } from '../../../home/store';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    sm: { span: 2 },
  },
  wrapperCol: {
    sm: { span: 21 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    sm: { span: 20, offset: 2 },
  },
};

class PriceForm extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      alertMessage: null,
      alertErrMessage: null
    }
  }

  // 提交表单方法
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        this.setState({
          alertMessage: '请先处理表单内部的错误项，然后再提交表单!'
        });
        return;
      }

      // 判断是否选中了图标
      let icon = null;
      if (this.props.activeKey === 'income') {
        if (this.props.income.id === -1) {
          this.setState({
            alertErrMessage: '请选择一个收入类型!'
          });
          return;
        } else {
          icon = this.props.categorys.filter(o => o.id === this.props.income.id)[0].icon
        }
      } else {
        if (this.props.expense.id === -1) {
          this.setState({
            alertErrMessage: '请选择一个支出类型!'
          });
          return;
        } else {
          icon = this.props.categorys.filter(o => o.id === this.props.expense.id)[0].icon
        }
      }

      // 计算最大的ID，因为有删减什么的，所以长度不能用于计算下一条记录的ID
      let list = this.props.list;
      let max = 0;
      list.forEach(row => {
        if (row.id > max) {
          max = row.id
        }
      });
      max += 1;

      let form = {
        id: max,
        event: values.title,
        price: values.price,
        type: this.props.activeKey,
        icon,
        date: values.date.format('YYYY-MM-DD') // 时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。
      };

      list.push(form);

      console.log('Received values of form: ', {list});

      this.props.addItem(list);

      this.props.history.push('/');
    });
  };

  // 重置表单方法
  handleReset = () => {
    this.props.form.resetFields();
  };

  // 返回首页
  handleCancel = () => {
    this.props.history.push('/');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tid, list } = this.props;
    const tab = list.filter(o => o.id === parseInt(tid))[0];
    return (
      <Fragment>
        {
          // 全局信息提示框, 3秒后关闭，并重置全局警告信息。
          this.state.alertMessage ? message.warning(this.state.alertMessage, 3, this.setState({alertMessage: null})) : null
        }
        {
          // 错误提示
          this.state.alertErrMessage ? message.error(this.state.alertErrMessage, 3, this.setState({alertErrMessage: null})) : null
        }
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="标题"
            key={'title'}
          >
            {/* 第一个参数是捕获的字段名称 */}
            {getFieldDecorator('title', {
              initialValue: tid ? tab.event : null,
              rules: [
                { required: true, message: 'Please input your title!' },
                { min: 2, message: '标题的最小长度为2个字符!' }
              ],
            })(
              <Input placeholder="请输入标题" maxLength={8} id="title"/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="金额"
            key={'price'}
          >
            {getFieldDecorator('price', {
              initialValue: tid ? tab.price : null,
              rules: [{ required: true, message: 'Please input your Money!' }],
            })(
              <InputNumber style={{ width: '100%' }} min={0} max={999999} placeholder="请输入金额" id="price"/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="日期"
            key={'date'}
          >
            {getFieldDecorator('date', {
              initialValue: tid ? moment(tab.date, "YYYY-MM-DD")  : null,
              rules: [{ required: true, message: 'Please select date!' }],
            })(
              <DatePicker style={{ width: '100%' }} placeholder="请选择日期"/>
            )}
          </Form.Item>
          <Form.Item  {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Commit
            </Button>
            <Button type="primary" className="login-form-button" style={{ marginLeft: '50px' }} onClick={this.handleReset}>
              Reset
            </Button>
            <Button type="primary" className="login-form-button" style={{ marginLeft: '50px' }} onClick={this.handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

// 映射数据
const mapStatesToProps = (state) => {
  return {
    income: state.getIn(['create', 'income']).toJS(),
    expense: state.getIn(['create', 'expense']).toJS(),
    activeKey: state.getIn(['create', 'activeKey']),
    categorys: state.getIn(['create', 'categorys']).toJS(),
    list: state.getIn(['home', 'list']).toJS()
  }
};

// 映射dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    addItem(list) {
      dispatch(createActions.createNewRecord(list))
    }
  }
};

// 使用 Form.create 处理后的表单具有自动收集数据并校验的功能;
// 经过 Form.create 包装的组件, 将会自带 this.props.form 属性;
export default connect(mapStatesToProps, mapDispatchToProps)(Form.create({ name: 'price_form' })(withRouter(PriceForm)));
