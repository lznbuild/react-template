import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Menu, Icon } from 'antd';
import './index.less';
import cx from 'classnames';

const { SubMenu } = Menu;
let currOpenKeys = [];

@inject('Breadcrumb', 'UI')
@observer
class LeftMenu extends React.Component {
  constructor(props) {
    super(props)
    this.menuData = this.props.data;
    this.crumbValues = [];
  }

  componentDidMount() {
    this.props.Breadcrumb.setValue(1, this.crumbValues);
  }

  toggleCollapsed = () => {
    this.props.UI.toggleCollapsed();
  }

  handleClick = (menuItem) => {
    let { keyPath } = menuItem;
    this.props.history.push(keyPath[0]);
  }

  setOpenKeys = (keys) => {
    currOpenKeys = keys;
  }

  getActiveMenu = (menuData) => {
    let menuProps = { openMenuArr: [], selectMenuArr: [] };
    let currentPath = window.location.pathname;
    let menuDataItem = menuData.find(item => currentPath.indexOf(item.path) != -1);
    if (!menuDataItem) {
      menuDataItem = menuData[0];
    }
    let path = menuDataItem.path;
    let title = menuDataItem.title;
    if (menuDataItem.children) {
      menuProps.openMenuArr.push({ path, title });
      let subMenuProps = this.getActiveMenu(menuDataItem.children);
      menuProps.openMenuArr = menuProps.openMenuArr.concat(subMenuProps.openMenuArr);
      if (subMenuProps.selectMenuArr.length > 0) {
        menuProps.selectMenuArr = menuProps.selectMenuArr.concat(subMenuProps.selectMenuArr);
      } else {
        menuProps.selectMenuArr.push({ path, title });
      }
    } else {
      menuProps.selectMenuArr.push({ path: path, title });
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
    const { collapsed } = this.props.UI;
    const { openMenuArr, selectMenuArr } = this.getActiveMenu(this.menuData);
    this.crumbValues = openMenuArr.concat(selectMenuArr);
    const openKeyArr = openMenuArr.map(function (v) { return v.path });
    const selectKeyArr = selectMenuArr.map(function (v) { return v.path });

    if (currOpenKeys.length === 0 && openKeyArr.length > 0) {
      this.setOpenKeys(openKeyArr);
    }

    return (
      <div className={cx({ "left-menu": true, "left-menu-collapsed": collapsed === true })}>
        <div className="open-menu" onClick={this.toggleCollapsed}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </div>
        <Menu
          defaultSelectedKeys={selectKeyArr}
          defaultOpenKeys={currOpenKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          inlineIndent={15}
          onOpenChange={this.setOpenKeys}
          onClick={this.handleClick}
        >
          {this.menuData && this.menuData.map(this.renderMenu)}
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftMenu);
