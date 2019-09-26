import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Menu, /*Tooltip,*/ Icon } from 'antd';
import './index.less';
import cx from 'classnames';

const { SubMenu } = Menu;

let openKeys = [];

@inject('Breadcrumb', 'UI')
@observer
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.currentModuleTitle = '';
    this.menuData = this.props.data;
  }

  componentDidMount() {
    this.props.Breadcrumb.setValue(1, this.currentModuleTitle);
  }

  toggleCollapsed = () => {
    this.props.UI.toggleCollapsed();
  };

  handleClick = (e) => {
    this.props.Breadcrumb.setValue(1, e.currentTarget.getAttribute('name'));
    this.props.history.push(e.currentTarget.id);
  };

  handleClick2 = (menuItem) => {
    const { keyPath } = menuItem;
    const len = keyPath.length - 1;
    const crumbValues = this.getCrumbValues(this.menuData, keyPath, len);
    this.props.Breadcrumb.setValue(1, crumbValues);
    this.props.history.push(keyPath[0]);
  };

  getCrumbValues = (menuData, paths, len) => {
    let crumbArray = [];
    for (let k = len; k >= 0; k -= 1) {
      const menuDataItem = menuData.find((item) => item.path === paths[k]);
      if (menuDataItem) {
        crumbArray.push({ path: paths[k], title: menuDataItem.title });
        if (menuDataItem.children) {
          k -= 1;
          const subArray = this.getCrumbValues(menuDataItem.children, paths, k);
          crumbArray = crumbArray.concat(subArray);
        }
        break;
      }
    }
    return crumbArray;
  };

  openKeysHandle = (keys) => {
    openKeys = keys;
  };

  getActiveMenu2 = (menuData) => {
    const menuProps = { openMenuArr: [], selectMenuArr: [] };
    const currentPath = window.location.pathname;
    const { children, path, title } =
      menuData.find((item) => currentPath.indexOf(item.path) !== -1) || {};
    if (children) {
      menuProps.openMenuArr.push({ path, title });
      const subMenuProps = this.getActiveMenu2(children);
      menuProps.openMenuArr = menuProps.openMenuArr.concat(subMenuProps.openMenuArr);
      if (subMenuProps.selectMenuArr.length > 0) {
        menuProps.selectMenuArr = menuProps.selectMenuArr.concat(subMenuProps.selectMenuArr);
      } else {
        menuProps.selectMenuArr.push({ path, title });
      }
    } else {
      menuProps.selectMenuArr.push({ path, title });
    }
    return menuProps;
  };

  getActiveMenu = (menuData) => {
    const menuProps = { openKeyArr: [], selectKeyArr: [] };
    const currentPath = window.location.pathname;
    const { children, path } = menuData.find((item) => currentPath.indexOf(item.path) !== -1) || {};
    if (children) {
      menuProps.openKeyArr.push(path);
      const subMenuProps = this.getActiveMenu(children);
      menuProps.openKeyArr = menuProps.openKeyArr.concat(subMenuProps.openKeyArr);
      if (subMenuProps.selectKeyArr.length > 0) {
        menuProps.selectKeyArr = menuProps.selectKeyArr.concat(subMenuProps.selectKeyArr);
      } else {
        menuProps.selectKeyArr.push(path);
      }
    } else {
      menuProps.selectKeyArr.push(path);
    }
    return menuProps;
  };

  renderMenu = (value) => {
    const menuArray = [];
    const { path, title, children, icon = 'home' } = value;
    const titleHtml = (
      <React.Fragment>
        <Icon type={icon} />
        <span>{title}</span>
      </React.Fragment>
    );
    if (children && children.length > 0) {
      menuArray.push(
        <SubMenu key={path} title={titleHtml}>
          {children.map(this.renderMenu)}
        </SubMenu>
      );
    } else {
      menuArray.push(<Menu.Item key={path}>{titleHtml}</Menu.Item>);
    }
    return menuArray;
  };

  render() {
    const { collapsed } = this.props.UI;
    const { openMenuArr, selectMenuArr } = this.getActiveMenu2(this.menuData);
    const openKeyArr = openMenuArr.map((v) => v.path);
    const selectKeyArr = selectMenuArr.map((v) => v.path);
    //const { openKeyArr, selectKeyArr } = this.getActiveMenu(this.menuData);
    //const openKeyArr = this.openKeys;
    console.info(openKeys);
    return (
      <div
        className={cx({
          'left-menu': true,
          'left-menu-collapsed': collapsed === true
        })}
      >
        <div className="open-menu" onClick={this.toggleCollapsed}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <Menu
          defaultSelectedKeys={selectKeyArr}
          defaultOpenKeys={openKeyArr}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          inlineIndent={15}
          onOpenChange={this.openKeysHandle}
          onClick={this.handleClick2}
        >
          {this.menuData && this.menuData.map(this.renderMenu)}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftMenu);
