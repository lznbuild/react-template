import React from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb, Icon } from 'antd';
import authUtils from 'utils/authUtils';
import './index.less';

@inject('Breadcrumb')
@observer
class CustomBreadcrumb extends React.Component {
  render() {
    const breadcrumbValues = this.props.Breadcrumb.getValues;

    return (
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href={authUtils.getHomePath()}>
          <Icon type="home" />
        </Breadcrumb.Item>
        {breadcrumbValues.map((item, index) => {
          let cn = 'breadcrumb-item';
          if (breadcrumbValues.length - 1 === index) {
            cn = 'breadcrumb-item-last';
          }
          if (item) {
            return (
              <Breadcrumb.Item className={cn} key={index}>
                {item.title}
              </Breadcrumb.Item>
            );
          }
          return null;
        })}
      </Breadcrumb>
    );
  }
}
export default CustomBreadcrumb;
