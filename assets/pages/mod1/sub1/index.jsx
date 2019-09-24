import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Divider, Drawer, Popconfirm, Icon } from 'antd';
import TableHoc from 'components/Hoc/tableHoc';
import ComplexQuery from 'components/ComplexQuery';
import Edit from './edit';
import Detail from './detail';
import '../../../public/css/defaultTable.less';
import testApi from 'api/test';

var single = 'single';
var unescaped = 'a string containing "double" quotes';
var backtick = `back${single}tick`;
const searchFields = [
  { name: 'name', title: '用户名', showType: 'input' },
  { name: 'type', title: '类型', showType: 'select', data: [{ value: 'zh', text: '小张' }, { value: 'zh2', text: '小张2' }] },
  { name: 'multi', title: '多选', showType: 'multiSelect', dataType: 'api', callback: testApi.getTypes }
];

const searchFields2 = [
  { name: 'name2', title: '用户名2', showType: 'input' },
  { name: 'type2', title: '类型2', showType: 'select', data: [{ value: 'zh', text: '小张' }, { value: 'zh2', text: '小张2' }] },
  { name: 'multi2', title: '多选2', showType: 'multiSelect', dataType: 'api', callback: testApi.getTypes }
];

const Sub1 = (props) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [pkInfo, setPkInfo] = useState({});
  props.init(testApi);

  const closeAddPage = (isReloadTable) => {
    setAddVisible(false);
    if (isReloadTable) {
      this.props.handleSearch('add');
    }
  };

  const closeEditPage = (isReloadTable) => {
    setEditVisible(false);
    if (isReloadTable) {
      this.props.handleSearch('update');
    }
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => { setEditVisible(true); setPkInfo(record); }}>编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => { setDetailVisible(true); setPkInfo(record); }}>详情</a>
          <Divider type="vertical" />
          <Popconfirm
            placement="left"
            icon={<Icon type="question-circle" theme="filled" style={{ color: '#F63A43' }} />}
            title={'确定要删除吗?'}
            onConfirm={() => props.handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  const { page, pageSize, pageSizeOptions, total, dataSource } = props.tableInfo;

  const scrollY = window.innerHeight - 280;

  console.info('渲染==============');

  return (
    <div className="default-table-page">
      <div className="content">
        <div className="table-container">
          <div className="query-panel">
            <Form className="query-panel-form" layout="inline">
              {props.getFields(searchFields)}
              <Form.Item>
                <Button type="primary" ghost onClick={() => props.handleSearch('search')}>查询</Button>
              </Form.Item>
            </Form>
            <ComplexQuery searchFields={searchFields2} />
            <span>
              <Button type="primary" onClick={() => { setEditVisible(true); setPkInfo({}); }}>添加</Button>
            </span>
          </div>
          <div className="table-pagination">
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="id"
              scroll={{ y: scrollY }}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: total,
                pageSizeOptions: pageSizeOptions,
                showSizeChanger: true,
                onShowSizeChange: props.pageRowsChange,
                showTotal: total => `共${total}条`,
                showQuickJumper: true,
                onChange: props.pageRowsChange
              }}
              onRow={(record) => {//表格行点击事件
                return {
                  onClick: () => props.setRowSelectedId(record.id)
                };
              }}
              rowClassName={(record) => props.getRowClassName(record.id)}
            />
          </div>
        </div>
      </div>
      {addVisible ?
        <Drawer
          title="添加"
          onClose={() => closeAddPage(false)}
          visible={addVisible}
          width={'60%'}
        >
          <Edit handleClose={closeAddPage} />
        </Drawer>
        : null}
      {editVisible ?
        <Drawer
          title="修改"
          onClose={() => closeEditPage(false)}
          visible={editVisible}
          width={'60%'}
        >
          <Edit pkInfo={pkInfo} handleClose={closeEditPage} />
        </Drawer>
        : null}
      {detailVisible ?
        <Drawer
          title="详情"
          onClose={() => { setDetailVisible(false); }}
          visible={detailVisible}
          width={'60%'}
        >
          <Detail pkInfo={pkInfo} />
        </Drawer>
        : null}
    </div>
  );
};
export default Form.create()(TableHoc(Sub1));
