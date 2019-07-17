import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import routerPath from '../../router/routerPath';
import Bundle from 'router/bundle';
import LeftMenu from 'components/LeftMenu';
import NoAccess from 'components/NoAccess';
import NotFound from 'components/NotFound';

import './index.less';
import cx from 'classnames';

@inject('Breadcrumb', 'UI')
@observer
class Content extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { collapsed } = this.props.UI;
    const { app, modules } = routerPath;
    const { name, pageComponents } = this.props;
    const currentModule = modules.find(v => (v.name === name));
    const menuList = currentModule && currentModule.children;

    const getPageComponent = (index) => {
      if (pageComponents && pageComponents[index]) {
        return Bundle(pageComponents[index]);
      }
      if(!menuList){
        return (NoAccess);
      }
      return (NotFound);
    }

    const breadcrumbValues = this.props.Breadcrumb.getValues;

    return (
      <div className="bw-content">
        {
          menuList && menuList.length > 0 ? <LeftMenu data={menuList} /> : null
        }
        <div className={cx({ "right-content": true, 'right-content-collapsed': collapsed === true })}>

          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item href={app.root}>
              <Icon type="home" />
            </Breadcrumb.Item>
            {
              breadcrumbValues.map((item, index) => {
                let cn = 'breadcrumb-item';
                if (breadcrumbValues.length - 1 === index) {
                  cn = 'breadcrumb-item-last';
                }
                if (item) {
                  return <Breadcrumb.Item className={cn} key={index}>{item}</Breadcrumb.Item>
                }
              })
            }
          </Breadcrumb>

          <Switch>
            <Route exact path={currentModule.path} component={getPageComponent(0)} />
            {menuList && menuList.map((item, index) => {
              return <Route key={index} path={item.path} component={getPageComponent(index)} />
            })}
          </Switch>
        </div>
      </div>
    )
  }
}
export default Content;
