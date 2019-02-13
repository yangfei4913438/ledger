import React, { Fragment } from 'react';
import {
  Form, Input, Button, InputNumber, DatePicker, message,
} from 'antd';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 5,
    },
    sm: {
      span: 24,
      offset: 5,
    },
  },
};

class PriceForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      alertMessage: null
    }
  }

  // 提交表单方法
  handleSubmit = (e) => {
    e.preventDefault();
    // const self = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        this.setState({
          alertMessage: '请先处理表单内部的错误项，然后再提交表单!'
        });
        return;
      }

      let form = {
        title: values.title,
        price: values.price,
        date: values.date.format('YYYY-MM-DD') // 时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。
      };

      console.log('Received values of form: ', {...form});
    });
  };

  // 重置表单方法
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        {
          // 全局信息提示框, 3秒后关闭，并重置全局警告信息。
          this.state.alertMessage ? message.warning(this.state.alertMessage, 3, this.setState({alertMessage: null})) : null
        }

        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="标题"
          >
            {/* 第一个参数是捕获的字段名称 */}
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: 'Please input your title!' },
                { min: 2, message: '标题的最小长度为2个字符!' }
              ],
            })(
              <Input placeholder="请输入标题" maxLength={8} id="title" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="金额"
          >
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Please input your Money!' }],
            })(
              <InputNumber style={{ width: '100%' }} min={0} max={999999} placeholder="请输入金额" id="price" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="日期"
          >
            {getFieldDecorator('date', {
              rules: [{ required: true, message: 'Please select date!' }],
            })(
              <DatePicker style={{ width: '100%' }} placeholder="请选择日期"/>
            )}
          </Form.Item>
          <Form.Item  {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Commit
            </Button>
            <Button type="primary" htmlType="reset" className="login-form-button" style={{ marginLeft: '20px' }} onClick={this.handleReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

// 使用 Form.create 处理后的表单具有自动收集数据并校验的功能;
// 经过 Form.create 包装的组件, 将会自带 this.props.form 属性;
export default Form.create({ name: 'price_form' })(PriceForm);
