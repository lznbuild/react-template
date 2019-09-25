import React from 'react';
import { Drawer, Descriptions } from 'antd';

class DetailDrawer extends React.Component {
  render() {
    const { visible, detail } = this.props;
    const { name, desc } = detail;

    return (
      <Drawer title="详情" onClose={() => this.props.close()} visible={visible} width={500}>
        <Descriptions title="" column={{ xs: 1, sm: 1, md: 2 }}>
          <Descriptions.Item label="姓名">{name || ''}</Descriptions.Item>
          <Descriptions.Item label="描述">{desc || ''}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    );
  }
}
export default DetailDrawer;
