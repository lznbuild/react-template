import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from 'components/Header';
import Bundle from 'router/bundle';
import NotFound from 'components/NotFound';
import NoAccess from 'components/NoAccess';
import Mod1 from 'bundle-loader?lazy&name=mod1!pages/mod1';
import Mod2 from 'bundle-loader?lazy&name=mod1!pages/mod2';
import Mod3 from 'bundle-loader?lazy&name=mod1!pages/mod3';
import Mod4 from 'bundle-loader?lazy&name=mod1!pages/mod4';
// import loginApi from 'api/login';
import authUtils from 'utils/authUtils';
import './index.less';

//按路由访问顺序
const pageComponents = [Mod1, Mod2, Mod3, Mod4];

const Layout = () => {
  const [renderKey, setRenderKey] = useState(0);
  const { newModules, oldIndexs } = authUtils.getModuleRoles();
  const homePath = authUtils.getHomePath();
  const rootRedirectPath = authUtils.getRootRedirectPath(newModules);

  //TODO 测试使用
  authUtils.testSetModuleRoles();

  useEffect(() => {
    //正式上线启用
    /* loginApi.getModuleRoles({ 'modtypes': authUtils.getModTypes() }).then(res => {
      if (res && res.data.data) {
        authUtils.setModuleRoles(res.data.data);
        setRenderKey(renderKey + 1);
      }
    }) */
  }, []);

  return (
    <div className="container">
      <Header key={renderKey} modules={newModules} />
      {newModules.length > 0 ? (
        <Switch>
          {homePath === rootRedirectPath ? null : (
            <Route
              exact
              path={homePath}
              render={() => <Redirect to={rootRedirectPath}></Redirect>}
            />
          )}
          {newModules.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              component={Bundle(pageComponents[oldIndexs[index]])}
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};
export default Layout;
