import React from 'react';
import { Button, Input, Table, Divider, Popconfirm, Icon } from 'antd';
import EditDrawer from './drawer';
import AddModal from './modal';
import DetailDrawer from './detail';
import './index.less';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class Sub1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1,
      page: 1,
      rows: 10,
      total: 0,
      searchValue: '',
      detail: {},
      detailVisible: false,
      addVisible: false,
      editVisible: false,
      rowSelectedId: ''
    }
  }

  initScrollY() {
    window.addEventListener('resize', () => {
      this.setState({
        key: Math.random()
      });
    }, false)
  }

  componentDidMount() {
    this.initScrollY();
  }

  componentWillUnmount() {
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this.setState = (state, callback) => {
      return;
    };
  }

  handleAdd = () => {
    this.setState({ addVisible: true, detail: {} });
  }

  handleEdit = (record) => {
    this.setState({ editVisible: true, detail: record });
  }

  handleDetail = (record) => {
    this.setState({ detailVisible: true, detail: record });
  }

  addSubmit = (values) => {

  }

  editSubmit = (values) => {

  }

  setRowClassName = (record) => {
    const { rowSelectedId } = this.state;
    return record.key === rowSelectedId ? "row-selected" : "";
  }

  render() {
    const scrollY = window.innerHeight - 300;
    const { page, rows, total, addVisible, editVisible, detailVisible, detail } = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 200,
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        width: 200,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.handleDetail(record)}>详情</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="left"
              icon={<Icon type="question-circle" theme="filled" style={{ color: '#F63A43' }} />}
              title={`确定要删除吗?`}
              onConfirm={() => this.confirmDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      },
    ];
    return (
      <div className="sub1">
        <div className="content">
          <div className="table-container">
            <div className="query-panel">
              <span>
                <Input placeholder="关键字查询" style={{ width: '200px', marginRight: '10px' }} onChange={e => this.setState({ searchValue: e.target.value })} />
                <Button type="primary" ghost onClick={this.handleSearch}>查询</Button>
              </span>
              <span>
                <Button type="primary" onClick={this.handleAdd}>添加</Button>
              </span>
            </div>
            <div className="table-pagination">
              <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: scrollY }}
                pagination={{
                  current: page,
                  pageSize: rows,
                  total: total,
                  pageSizeOptions: ['10', '30', '50'],
                  showSizeChanger: true,
                  onShowSizeChange: (page, rows) => this.setState({ page, rows }),
                  showTotal: total => `共${total}条`,
                  showQuickJumper: true,
                  onChange: (page, rows) => this.setState({ page, rows }),
                }}
                onRow={(record) => {//表格行点击事件
                  return {
                    onClick: () => this.setState({ rowSelectedId: record.key })
                  };
                }}
                rowClassName={this.setRowClassName}
              />
            </div>
          </div>
        </div>
        {
          addVisible ?
            <AddModal
              visible={addVisible}
              close={() => { this.setState({ addVisible: false }) }}
              detail={detail}
              handleSubmit={this.addSubmit}
            />
            : null
        }
        {
          editVisible ?
            <EditDrawer
              visible={editVisible}
              close={() => { this.setState({ editVisible: false }) }}
              detail={detail}
              handleSubmit={this.editSubmit}
            />
            : null
        }
        {
          detailVisible ?
            <DetailDrawer
              visible={detailVisible}
              close={() => { this.setState({ detailVisible: false }) }}
              detail={detail}
            />
            : null
        }
      </div>
    )
  }
}
export default Sub1;
