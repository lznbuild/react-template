import React from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { routeList } from '../../common/config';

const BreadCrumb = (props) => {
  const current = routeList.find((routes) =>
    pathToRegexp(routes.path).test(props.location.pathname)
  );

  const bread = (current || {}).levelPath || [];

  return (
    <Breadcrumb className="custom-breadCrumb">
      {bread.map((item, idx) => (
        <Breadcrumb.Item key={idx}>
          {item.path && idx !== bread.length - 1 ? (
            // <Link to={item.path}>{item.name}</Link>
            <a href="#">{item.name}</a>
          ) : (
            item.name
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default withRouter(BreadCrumb);
