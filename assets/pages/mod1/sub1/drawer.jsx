import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

class EditDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.handleSubmit(values);
            }
        });
    };

    render() {
        const { visible, detail } = this.props;
        const { name, age, address } = detail;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <Drawer
                title='编辑'
                onClose={() => this.props.close()}
                visible={visible}
                width={500}
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="名字">
                        {getFieldDecorator('name', {
                            initialValue: name || '',
                            rules: [
                                { required: true, message: '名字不能为空!', },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="年龄">
                        {getFieldDecorator('age', {
                            initialValue: age || '',
                            rules: [
                                { required: true, message: '年龄不能为空!', },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="地址">
                        {getFieldDecorator('address', {
                            initialValue: address || '',
                            rules: [
                                {
                                    required: true, message: '地址不能为空!',
                                },
                            ],
                        })(<Input />)}
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
                    <Button style={{ marginRight: '10px' }} onClick={() => this.props.close()}>取消</Button>
                    <Button onClick={this.handleSubmit} type="primary">提交</Button>
                </div>
            </Drawer>
        )
    }
}
export default Form.create()(EditDrawer);