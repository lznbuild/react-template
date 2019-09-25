import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { Avatar, Dropdown, Icon, Menu } from 'antd';
import cx from 'classnames';
import authUtils from 'utils/authUtils';
import './index.less';
import logo from 'public/imgs/logo.png';

@inject('Breadcrumb', 'UI')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.currentModuleTitle = {};
    this.state = {
      current: this.props.location.pathname
    };
  }

  handleLogout = e => {
    if (e.key === 'signout') {
      authUtils.logout();
    }
  };

  handlePage = e => {
    const path = e.currentTarget.id;
    const title = e.currentTarget.getAttribute('name');
    this.props.UI.reset();
    this.props.Breadcrumb.setValue(0, { path, title });
    this.props.history.push(path);
    this.setState({ current: path });
  };

  handleIndex = e => {
    const currentRoute = this.props.location.pathname;
    if (currentRoute !== e.target.id) {
      window.location.href = e.target.id;
    }
  };

  componentDidMount() {
    this.props.Breadcrumb.setValue(0, this.currentModuleTitle);
  }

  render() {
    const { current } = this.state;
    const { modules } = this.props;

    const userName = authUtils.getUserName();
    const homePath = authUtils.getHomePath();

    const loginMenu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="signout">
          <FormattedMessage id={userName == null ? 'login.button' : 'head.logout'} />
        </Menu.Item>
      </Menu>
    );

    const isActive = (obj, index) => {
      let active = current.indexOf(obj.path) !== -1;
      if (!active && index === 0 && homePath === current) {
        active = true;
      }
      if (active) {
        this.currentModuleTitle = { path: obj.path, title: obj.title };
      }
      return active;
    };

    const loopNavMap = data =>
      data.map((item, index) => (
        <li
          key={item.path}
          id={item.path}
          name={item.title}
          className={cx({ active: isActive(item, index) })}
          onClick={this.handlePage}
        >
          {item.title}
        </li>
      ));

    return (
      <div className="header-component">
        <div className="header-left">
          <img src={logo} alt="" width="30px" height="32px" />
          <span id={homePath} onClick={this.handleIndex}>
            xxxx项目/平台
          </span>
          <ul>{modules && modules.length > 1 && loopNavMap(modules)}</ul>
        </div>
        <div className="header-right">
          <Dropdown overlay={loginMenu} trigger={['click']}>
            <span>
              <Avatar
                size="small"
                style={{ color: '#fff', backgroundColor: '#1C1D22' }}
                icon="user"
              />
              <span style={{ color: '#fff', fontSize: '14px', margin: '0 3px' }}>
                {userName || <FormattedMessage id="head.nologin" />}
              </span>
              <Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}
export default injectIntl(withRouter(Header));
