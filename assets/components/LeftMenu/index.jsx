import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Tooltip, Icon } from 'antd';
import './index.less';
import cx from 'classnames';

@inject('Breadcrumb', 'UI')
@observer
class LeftMenu extends React.Component {
  constructor(props) {
    super(props)
    this.currentModuleTitle = '';
  }
  toggleCollapsed = () => {
    this.props.UI.toggleCollapsed();
  }

  handleClick = (e) => {
    this.props.Breadcrumb.setValue(1, e.currentTarget.getAttribute('name'));
    this.props.history.push(e.currentTarget.id);
  }

  isActive = (value, index) => {
    let currentPath = window.location.pathname;
    let isContained = value.path.indexOf(currentPath) != -1;
    if (currentPath.length !== value.path.length) {
      isContained = isContained && index === 0;
    }
    if(isContained){
      this.currentModuleTitle = value.title;
    }
    return isContained;
  }

  componentDidMount(){
    this.props.Breadcrumb.setValue(1, this.currentModuleTitle);
  }

  renderMenu = (value, index) => {
    let { collapsed } = this.props.UI;
    let path = value.path;
    let title = value.title;

    return collapsed ?
      <Tooltip key={path} placement="right" title={title}>
        <li
          id={path}
          name={title}
          onClick={this.handleClick}
          className={cx({ "bw-menu-item": true, "bw-menu-item-active": this.isActive(value, index) })}>
          <Icon type="home" style={{ marginRight: "5px" }} />
        </li>
      </Tooltip>
      : <li
        key={path}
        id={path}
        name={title}
        onClick={this.handleClick}
        className={cx({ "bw-menu-item": true, "bw-menu-item-active": this.isActive(value, index) })}>
        <Icon type="home" style={{ marginRight: "5px" }} />
        {title}
      </li >
  }

  render() {
    let { collapsed } = this.props.UI;
    return (
      <div className={cx({ "left-menu": true, "left-menu-collapsed": collapsed === true })}>
        <div className="open-menu" onClick={this.toggleCollapsed}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </div>
        <ul className="bw-menu">
          {this.props.data && this.props.data.map(this.renderMenu)}
        </ul>
      </div>
    )
  }
}
export default withRouter(LeftMenu);
