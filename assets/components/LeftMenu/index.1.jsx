import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Menu, Tooltip, Icon } from 'antd';
import './index.less';
import cx from 'classnames';

const { SubMenu } = Menu;

let openKeys = [];

@inject('Breadcrumb', 'UI')
@observer
class LeftMenu extends React.Component {
  constructor(props) {
    super(props)
    this.currentModuleTitle = '';
    this.menuData = this.props.data;
  }

  componentDidMount() {
    this.props.Breadcrumb.setValue(1, this.currentModuleTitle);
    console.info('componentDidMount====')
  }

  toggleCollapsed = () => {
    this.props.UI.toggleCollapsed();
  }

  handleClick = (e) => {
    this.props.Breadcrumb.setValue(1, e.currentTarget.getAttribute('name'));
    this.props.history.push(e.currentTarget.id);
  }

  handleClick2 = (menuItem) => {
    let { keyPath } = menuItem;
    let len = keyPath.length - 1;
    let crumbValues = this.getCrumbValues(this.menuData, keyPath, len);
    this.props.Breadcrumb.setValue(1, crumbValues);
    this.props.history.push(keyPath[0]);
  }

  getCrumbValues = (menuData, paths, len) => {
    let crumbArray = [];
    for (let k = len; k >= 0; k--) {
      console.info(k)
      let menuDataItem = menuData.find(item => item.path === paths[k]);
      if (menuDataItem) {
        crumbArray.push({ path: paths[k], title: menuDataItem.title });
        if (menuDataItem.children) {
          k = k - 1;
          let subArray = this.getCrumbValues(menuDataItem.children, paths, k);
          crumbArray = crumbArray.concat(subArray);
        }
        break;
      }
    }
    return crumbArray;
  }

  openKeysHandle = (keys) => {
    openKeys = keys;
  }

  getActiveMenu2 = (menuData) => {
    let menuProps = { openMenuArr: [], selectMenuArr: [] };
    let currentPath = window.location.pathname;
    let menuDataItem = menuData.find(item => currentPath.indexOf(item.path) != -1);
    if (menuDataItem) {
      if (menuDataItem.children) {
        menuProps.openMenuArr.push({ path: menuDataItem.path, title: menuDataItem.title });
        let subMenuProps = this.getActiveMenu2(menuDataItem.children);
        menuProps.openMenuArr = menuProps.openMenuArr.concat(subMenuProps.openMenuArr);
        if (subMenuProps.selectMenuArr.length > 0) {
          menuProps.selectMenuArr = menuProps.selectMenuArr.concat(subMenuProps.selectMenuArr);
        } else {
          menuProps.selectMenuArr.push({ path: menuDataItem.path, title: menuDataItem.title });
        }
      } else {
        menuProps.selectMenuArr.push({ path: menuDataItem.path, title: menuDataItem.title });
      }
    }
    return menuProps;
  }

  getActiveMenu = (menuData) => {
    let menuProps = { openKeyArr: [], selectKeyArr: [] };
    let currentPath = window.location.pathname;
    let menuDataItem = menuData.find(item => currentPath.indexOf(item.path) != -1);
    if (menuDataItem) {
      if (menuDataItem.children) {
        menuProps.openKeyArr.push(menuDataItem.path);
        let subMenuProps = this.getActiveMenu(menuDataItem.children);
        menuProps.openKeyArr = menuProps.openKeyArr.concat(subMenuProps.openKeyArr);
        if (subMenuProps.selectKeyArr.length > 0) {
          menuProps.selectKeyArr = menuProps.selectKeyArr.concat(subMenuProps.selectKeyArr);
        } else {
          menuProps.selectKeyArr.push(menuDataItem.path);
        }
      } else {
        menuProps.selectKeyArr.push(menuDataItem.path);
      }
    }
    return menuProps;
  }

  renderMenu = (value, index) => {
    let menuArray = [];
    let { path, title, children, icon = 'home' } = value;
    if (children && children.length > 0) {
      let subChildren = [];
      children.map((v, i) => {
        subChildren.push(this.renderMenu(v, i));
      });
      menuArray.push(
        <SubMenu
          key={path}
          title={
            <span>
              <Icon type={icon} />
              <span>{title}</span>
            </span>
          }
        >
          {subChildren}
        </SubMenu>
      );
    } else {
      menuArray.push(
        <Menu.Item key={path}>
          <Icon type={icon} />
          <span>{title}</span>
        </Menu.Item>
      );
    }
    return menuArray;
  }



  render() {
    console.info('=====selectKeyArr======')
    const { collapsed } = this.props.UI;
    const { openMenuArr, selectMenuArr } = this.getActiveMenu2(this.menuData);
    console.info(openMenuArr.map(function(v){return v.path}));
    const openKeyArr = openMenuArr.map(function(v){return v.path});
    const selectKeyArr = selectMenuArr.map(function(v){return v.path});
    //const { openKeyArr, selectKeyArr } = this.getActiveMenu(this.menuData);
    console.info(openKeyArr)
    console.info(selectKeyArr)
    //const openKeyArr = this.openKeys;
    console.info(openKeys)
    return (
      <div className={cx({ "left-menu": true, "left-menu-collapsed": collapsed === true })}>
        <div className="open-menu" onClick={this.toggleCollapsed}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
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
    )
  }
}
export default withRouter(LeftMenu);
