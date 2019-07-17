import React from 'react';
import { Drawer, Descriptions } from 'antd';

class DetailDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { visible, detail } = this.props;
        const { name, age, address } = detail;

        return (
            <Drawer
                title="详情"
                onClose={() => this.props.close()}
                visible={visible}
                width={500}
            >
                <Descriptions title="" column={{ xs: 1, sm: 1, md: 2 }}>
                    <Descriptions.Item label="姓名">{name || ''}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{age || ''}</Descriptions.Item>
                    <Descriptions.Item label="地址">{address || ''}</Descriptions.Item>
                </Descriptions>
            </Drawer >
        )
    }
}
export default DetailDrawer;