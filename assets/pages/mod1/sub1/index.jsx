import React from 'react';
import { Button, Input, Table, Divider,Drawer, Popconfirm, Icon, message } from 'antd';
import EditDrawer from './drawer';
import AddModal from './modal';
import Detail from './detail';
import './index.less';
import testApi from 'api/test';

class Sub1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1,
      page: 1,
      rows: 2,
      id: '',
      total: 0,
      searchValue: '',
      dataSource: [],
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

  getList = (page = 1, rows = 2, searchValue) => {
    let params = { page, rows, name: searchValue };
    testApi.list(params).then(res => {
      let data = res.data.data;
      if (data) {
        const { total, rows } = data;
        this.setState({ total, dataSource: rows });
      }
    })
  }

  componentDidMount() {
    this.getList();
    this.initScrollY();
  }

  // 切换页码/切换每页展示条数
  pageRowsChange = (page, rows) => {
    const { searchValue } = this.state;
    this.setState({ page, rows });
    this.getList(page, rows, searchValue);
  }

  componentWillUnmount() {
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    this.setState = (state, callback) => {
      return;
    };
  }

  // 详情接口
  handleDetail = (record) => {
    this.setState({ detailVisible: true, id: record.id });
  }

  // 增加接口
  addSubmit = (values) => {
    testApi.add(values).then(res => {
      if (res.data.data !== 0) {
        message.success('添加成功');
        this.setState({ addVisible: false });
        const { rows } = this.state;
        this.getList(1, rows, '');
      } else {
        message.error('添加失败');
      }
    })
  }
  // 编辑接口
  editSubmit = (values) => {
    testApi.update(values).then(res => {
      if (res.data.data !== 0) {
        message.success('编辑成功');
        this.setState({ editVisible: false });
        const { page, rows, searchValue } = this.state;
        this.getList(page, rows, searchValue);
      } else {
        message.error('编辑失败');
      }
    })
  }
  // 删除接口
  confirmDelete = (record) => {
    let params = { id: record.id };
    testApi.delete(params).then(res => {
      if (res.data.data !== 0) {
        message.success('删除成功');
        const { rows } = this.state;
        this.getList(1, rows, '');
      } else {
        message.error('删除失败');
      }
    })
  }
  // 选中行
  setRowClassName = (record) => {
    const { rowSelectedId } = this.state;
    return record.id === rowSelectedId ? "row-selected" : "";
  }

  render() {
    const scrollY = window.innerHeight - 280;
    const { page, rows, total, dataSource, addVisible, editVisible, detailVisible, detail, searchValue } = this.state;
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
            <a href="javascript:;" onClick={() => this.setState({ editVisible: true, detail: record })}>编辑</a>
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
                <Input
                  value={searchValue}
                  placeholder="关键字查询"
                  style={{ width: '200px', marginRight: '10px' }}
                  onChange={e => this.setState({ searchValue: e.target.value })}
                />
                <Button type="primary" ghost onClick={() => this.getList(1, rows, searchValue)}>查询</Button>
              </span>
              <span>
                <Button type="primary" onClick={() => this.setState({ addVisible: true, detail: {} })}>添加</Button>
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
                  pageSize: rows,
                  total: total,
                  pageSizeOptions: ['2', '10', '30', '50'],
                  showSizeChanger: true,
                  onShowSizeChange: this.pageRowsChange,
                  showTotal: total => `共${total}条`,
                  showQuickJumper: true,
                  onChange: this.pageRowsChange,
                }}
                onRow={(record) => {//表格行点击事件
                  return {
                    onClick: () => this.setState({ rowSelectedId: record.id })
                  };
                }}
                rowClassName={this.setRowClassName}
              />
            </div>
          </div>
        </div>
        <Drawer
          title="详情"
          onClose={() => { this.setState({ detailVisible: false }) }}
          visible={this.state.detailVisible}
          width={"60%"}
        >
          <Detail id={this.state.id} />
        </Drawer>
      </div>
    )
  }
}
export default Sub1;
