import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

const { TextArea } = Input;

class EditDrawer extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { id } = this.props.detail;
        this.props.handleSubmit({ ...values, id });
      }
    });
  };

  render() {
    const { visible, detail, form } = this.props;
    const { name, desc } = detail;
    const { getFieldDecorator } = form;
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
      <Drawer title="编辑" onClose={() => this.props.close()} visible={visible} width={500}>
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
              rules: [
                {
                  required: true,
                  message: '描述不能为空!'
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #D9D9D9',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px'
          }}
        >
          <Button style={{ marginRight: '10px' }} onClick={() => this.props.close()}>
            取消
          </Button>
          <Button onClick={this.handleSubmit} type="primary">
            提交
          </Button>
        </div>
      </Drawer>
    );
  }
}
export default Form.create()(EditDrawer);
