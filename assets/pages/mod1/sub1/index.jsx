import React from 'react';
import { Form, Button, Table, Divider, Drawer, Popconfirm, Icon } from 'antd';
import TableHoc from 'components/Hoc/tableHoc';
import Edit from './edit';
import Detail from './detail';
import '../../../public/css/defaultTable.less';
import testApi from 'api/test';

const searchFields = [{ name: 'name', title: '用户名', showType: 'input' }];

@TableHoc
class Sub1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      editVisible: false,
      addVisible: false,
      pkInfo: {}
    }
  }

  componentWillMount() {
    this.props.init(testApi);
  }

  closeAddPage = (isReloadTable) => {
    this.setState({ addVisible: false });
    if (isReloadTable) {
      this.props.handleSearch('add');
    }
  }

  closeEditPage = (isReloadTable) => {
    this.setState({ editVisible: false });
    if (isReloadTable) {
      this.props.handleSearch('update');
    }
  }

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.setState({ editVisible: true, pkInfo: record })}>编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.setState({ detailVisible: true, pkInfo: record })}>详情</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="left"
              icon={<Icon type="question-circle" theme="filled" style={{ color: '#F63A43' }} />}
              title={`确定要删除吗?`}
              onConfirm={() => this.props.handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      },
    ];

    const { page, pageSize, pageSizeOptions, total, dataSource } = this.props.tableInfo;

    const { addVisible, editVisible, detailVisible, pkInfo } = this.state;

    const scrollY = window.innerHeight - 280;

    return (
      <div className="default-table-page">
        <div className="content">
          <div className="table-container">
            <div className="query-panel">
              <Form className="query-panel-form" layout="inline">
                {this.props.getFields(searchFields)}
                <Form.Item>
                  <Button type="primary" ghost onClick={() => this.props.handleSearch('search')}>查询</Button>
                </Form.Item>
              </Form>
              <span>
                <Button type="primary" onClick={() => this.setState({ addVisible: true, pkInfo: {} })}>添加</Button>
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
                  onShowSizeChange: this.props.pageRowsChange,
                  showTotal: total => `共${total}条`,
                  showQuickJumper: true,
                  onChange: this.props.pageRowsChange,
                }}
                onRow={(record) => {//表格行点击事件
                  return {
                    onClick: () => this.props.setRowSelectedId(record.id)
                  };
                }}
                rowClassName={(record) => this.props.getRowClassName(record.id)}
              />
            </div>
          </div>
        </div>
        {addVisible ?
          <Drawer
            title="添加"
            onClose={() => this.closeAddPage(false)}
            visible={addVisible}
            width={"60%"}
          >
            <Edit handleClose={this.closeAddPage} />
          </Drawer>
          : null}
        {editVisible ?
          <Drawer
            title="修改"
            onClose={() => this.closeEditPage(false)}
            visible={editVisible}
            width={"60%"}
          >
            <Edit pkInfo={pkInfo} handleClose={this.closeEditPage} />
          </Drawer>
          : null}
        {detailVisible ?
          <Drawer
            title="详情"
            onClose={() => { this.setState({ detailVisible: false }) }}
            visible={detailVisible}
            width={"60%"}
          >
            <Detail pkInfo={pkInfo} />
          </Drawer>
          : null}
      </div>
    )
  }
}
export default Form.create()(Sub1);
