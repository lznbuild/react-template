import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import './detail.less';
import testApi from 'api/test';
const Detail = (props) => {

  const [formData, setFormData] = useState({});

  const { id } = props;

  useEffect(()=>{
    let params = { id: id };
    testApi.detail(params).then(res => {
      let data = res.data.data;
      setFormData(data);
    })
  },[id]);

  return (
    <Descriptions title="" column={{ xs: 1, sm: 1, md: 2 }}>
      <Descriptions.Item label="姓名">{formData.name || ''}</Descriptions.Item>
      <Descriptions.Item label="描述">{formData.desc || ''}</Descriptions.Item>
    </Descriptions>
  )
}
export default Detail;
