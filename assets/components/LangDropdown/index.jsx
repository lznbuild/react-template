import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import langUtils from 'utils/langUtils';

const LangMenu = () => (
  <Menu onClick={e => langUtils.changeCurrentLang(e.key)}>
    {langUtils.getLangArray().map(({ lang, title }) => (
      <Menu.Item key={lang}>{title}</Menu.Item>
    ))}
  </Menu>
);

const LangDropdown = () => (
  <Dropdown overlay={LangMenu} trigger={['click']}>
    <span>
      {langUtils.getLangTitle()}
      <Icon type="down" />
    </span>
  </Dropdown>
);

export default LangDropdown;
