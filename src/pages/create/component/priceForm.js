import React, { PureComponent ,Fragment } from 'react';
import { Form, Input, Button, InputNumber, DatePicker, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createActions } from '../../home/store/index';
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

export class PriceForm extends PureComponent {
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
      let cid = -1;
      if (this.props.activeKey === 'income') {
        if (this.props.income_cid === -1) {
          this.setState({
            alertErrMessage: '请选择一个收入类型!'
          });
          return;
        } else {
          icon = this.props.categories.filter(o => o.id === this.props.income_cid)[0].icon;
          cid = this.props.income_cid;
        }
      } else {
        if (this.props.expense_cid === -1) {
          this.setState({
            alertErrMessage: '请选择一个支出类型!'
          });
          return;
        } else {
          icon = this.props.categories.filter(o => o.id === this.props.expense_cid)[0].icon;
          cid = this.props.expense_cid;
        }
      }

      let item = {
        event: values.title,
        price: values.price,
        type: this.props.activeKey,
        cid,
        icon,
        date: values.date.format('YYYY-MM-DD') // 时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。
      };

      if (this.props.isEdit) {
        item['id'] = this.props.current_edit.id;
        this.props.modifyRecord(item)
      } else {
        console.log('Received values of form: ', item);
        this.props.addItem(item);
      }

      // 不管是编辑还是新增，执行完成都要返回列表界面。
      this.props.modifyShowCreate(false);
    });
  };

  // 重置表单方法
  handleReset = () => {
    this.props.form.resetFields();
  };

  // 返回首页
  handleCancel = () => {
    this.props.modifyShowCreate(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEdit, current_edit } = this.props;
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
              initialValue: isEdit && current_edit ? current_edit.event : null,
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
              initialValue: isEdit && current_edit ? current_edit.price : null,
              rules: [
                { required: true, message: 'Please input your Money!' }
              ],
            })(
              <InputNumber style={{ width: '100%' }} min={0} max={100000000} placeholder="请输入金额" id="price"/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="日期"
            key={'date'}
          >
            {getFieldDecorator('date', {
              initialValue: isEdit && current_edit ? moment(current_edit.date, "YYYY-MM-DD")  : null,
              rules: [{ required: true, message: 'Please select date!' }],
            })(
              <DatePicker style={{ width: '100%' }} placeholder="请选择日期"/>
            )}
          </Form.Item>
          <Form.Item  {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Commit
            </Button>
            <Button type="primary" style={{ marginLeft: '50px' }} onClick={this.handleReset}>
              Reset
            </Button>
            <Button type="primary" style={{ marginLeft: '50px' }} onClick={this.handleCancel}>
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
    income_cid: state.getIn(['home', 'income_cid']),
    expense_cid: state.getIn(['home', 'expense_cid']),
    activeKey: state.getIn(['home', 'activeKey']),
    isEdit: state.getIn(['home', 'isEdit']),
    list: state.getIn(['home', 'list']) ? state.getIn(['home', 'list']).toJS() : null,
    categories: state.getIn(['home', 'categories']) ? state.getIn(['home', 'categories']).toJS() : null,
    current_edit: state.getIn(['home', 'current_edit']) ? state.getIn(['home', 'current_edit']).toJS() : null
  }
};

// 映射dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    addItem(item) {
      dispatch(createActions.createNewRecord(item));
    },
    // 修改是否显示创建组件
    modifyShowCreate (res) {
      dispatch(createActions.modifyShowCreate(res));
    },
    // 提交修改记录
    modifyRecord (item) {
      dispatch(createActions.modifyRecord(item));
    }
  }
};

// 使用 Form.create 处理后的表单具有自动收集数据并校验的功能;
// 经过 Form.create 包装的组件, 将会自带 this.props.form 属性;
export default connect(mapStatesToProps, mapDispatchToProps)(Form.create({ name: 'price_form' })(withRouter(PriceForm)));
