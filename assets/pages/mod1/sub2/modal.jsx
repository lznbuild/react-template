import React from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const { visible, detail } = this.props;
    const { name, desc } = detail;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <Modal
        title="添加"
        onCancel={() => this.props.close()}
        onOk={this.handleSubmit}
        visible={visible}
        width={500}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名字">
            {getFieldDecorator('name', {
              initialValue: name || '',
              rules: [{ required: true, message: '名字不能为空!' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="描述">
            {getFieldDecorator('desc', {
              initialValue: desc || '',
              rules: [{ required: true, message: '描述不能为空!' }]
            })(<TextArea rows={4} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddModal);
