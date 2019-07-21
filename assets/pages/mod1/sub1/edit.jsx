import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import utils from '../../../utils';
import testApi from 'api/test';
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
const Edit = (props) => {

  const [formData, setFormData] = useState({});

  const { pkInfo, handleClose } = props;

  const { getFieldDecorator } = props.form;

  const isAddHandle = utils.isNullOrEmpty(pkInfo);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        addOrUpdate(values);
      }
    });
  }

  const addOrUpdate = (values) => {
    let handleTitle = isAddHandle ? '添加' : '编辑';
    let status = isAddHandle ? 'add' : 'update';
    testApi.addOrUpdate(isAddHandle, values).then(res => {
      if (res.data.data !== 0) {
        message.success(`${handleTitle}成功`);
        handleClose(status);
      } else {
        message.error(`${handleTitle}失败`);
      }
    })
  }

  useEffect(() => {
    if (!isAddHandle) {
      testApi.detail(pkInfo).then(res => {
        let data = res.data.data;
        if (data) {
          setFormData(data);
        }
      });
    } else {
      setFormData({});
    }
  }, []);

  return (
    <div>
      <Form {...formItemLayout}>
        <Form.Item>
          {getFieldDecorator('id', { initialValue: formData.id || '' })(<Input type="hidden" />)}
        </Form.Item>
        <Form.Item label="名字">
          {getFieldDecorator('name', {
            initialValue: formData.name || '',
            rules: [
              { required: true, message: '名字不能为空!', },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('desc', {
            initialValue: formData.desc || '',
            rules: [
              {
                required: true, message: '描述不能为空!',
              },
            ],
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
          borderRadius: '0 0 4px 4px',
        }}
      >
        <Button style={{ marginRight: '10px' }} onClick={() => handleClose(false)}>取消</Button>
        <Button onClick={handleSubmit} type="primary">提交</Button>
      </div>
    </div>
  )
}
export default Form.create()(Edit);
