import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { Avatar, Dropdown, Icon, Menu } from 'antd';
import cx from 'classnames';
import routerPath from '../../router/routerPath';
import './index.less';
import logo from '../../public/imgs/logo.png';
const { modules, app } = routerPath;

@inject('Breadcrumb', 'UI')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.currentModuleTitle = '';
    this.state = {
      current: this.props.location.pathname,
    }
  }

  handleLogout = (e) => {
    if (e.key == 'signout') {
      window.sessionStorage.removeItem('tokenId');
      window.location.href = app.login;
    }
  };

  handlePage = (e) => {
    this.props.UI.reset();
    this.props.Breadcrumb.setValue(0, e.currentTarget.getAttribute('name'));
    this.props.history.push(e.currentTarget.id);
    this.setState({ current: e.currentTarget.id });
  };

  handleIndex = (e) => {
    let currentRoute = this.props.location.pathname;
    if (currentRoute !== e.target.id) {
      this.props.history.push(e.target.id);
    }
  }

  componentDidMount() {
    this.props.Breadcrumb.setValue(0, this.currentModuleTitle);
  }

  render() {

    const { current } = this.state;
    const userName = window.sessionStorage.getItem('userName');
    const loginMenu = (
      <Menu onClick={this.handleLogout} >
        <Menu.Item key="signout"><FormattedMessage id={userName == null ? 'login.button' : 'head.logout'} /></Menu.Item>
      </Menu>
    );

    const isActive = (obj, index) => {
      let active = current.indexOf(obj.path) != -1;
      if (!active && index === 0 && app.root == current) {
        active = true;
      }
      if (active) {
        this.currentModuleTitle = obj.title;
      }
      return active;
    }

    const loopNavMap = data => data.map((item, index) => {
      return (
        <li
          key={item.path}
          id={item.path}
          name={item.title}
          className={cx({ 'active': isActive(item, index) })}
          onClick={this.handlePage}
        >
          {item.title}
        </li>
      );
    });
    return (
      <div className="header-component">
        <div className="header-left">
          <img src={logo} alt="" width="30px" height="32px" />
          <span id={app.root} onClick={this.handleIndex}>xxxx项目/平台</span>
          <ul>
            {modules && modules.length > 1 && loopNavMap(modules)}
          </ul>
        </div>
        <div className="header-right">
          <Dropdown overlay={loginMenu} trigger={['click']}>
            <span>
              <Avatar size="small" style={{ color: '#fff', backgroundColor: '#1C1D22' }} icon="user"></Avatar>
              <span style={{ color: '#fff', fontSize: '14px', margin: '0 3px' }}>{userName || <FormattedMessage id="head.nologin" />}</span>
              <Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </div>
    )
  }
}
export default injectIntl(withRouter(Header));
