import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from 'components/Header';
import Loading from 'components/Loading';
import routerPath from '../../router/routerPath';
import Bundle from 'router/bundle';
import NotFound from 'components/NotFound';
import NoAccess from 'components/NoAccess';
import Mod1 from 'bundle-loader?lazy&name=mod1!pages/mod1';
import Mod2 from 'bundle-loader?lazy&name=mod1!pages/mod2';
import Mod3 from 'bundle-loader?lazy&name=mod1!pages/mod3';
import Mod4 from 'bundle-loader?lazy&name=mod1!pages/mod4';
import './index.less';

const pageComponents = [Mod1, Mod2, Mod3, Mod4];
const { app, modules } = routerPath;
const getRootRedirect = () => {
  if (modules[0].path === window.location.pathname) {
    return modules[0].children[0].path;
  }
  return modules[0].path;
}

const Layout = () => {
  return (
    <div className="container">
      <Loading />
      <Header />
      <Switch>
        <Route exact path={app.root}
          render={() => <Redirect to={getRootRedirect()}></Redirect>}
        />
        {modules.map((item, index) => {
          return <Route key={index} path={item.path} component={Bundle(pageComponents[index])} />
        })}
        <Route exact path={routerPath.app.noAccess} component={NoAccess} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}
export default Layout;
