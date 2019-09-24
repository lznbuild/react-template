import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Icon, Input } from 'antd';
import LangDropdown from 'components/LangDropdown';
import loginApi from '../../api/login';
import authUtils from '../../utils/authUtils';
import logo from '../../public/imgs/logo.png';
import './index.less';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = () => {
    let params = { username, pwd };

    //测试使用
    authUtils.testLogin(params);

    /* loginApi.login(params).then(res => {
      if (res && res.data.data) {
        authUtils.login(res.data.data);
      }
    }) */

  };

  return (
    <div className="login-component">
      <div className="logoName">
        <img width="50" src={logo} alt="" />
        <span>xxxx系统</span>
      </div>
      <div className="login">
        <span className="loginTitle">欢迎登录</span>
        <Input.Group>
          <Input
            size="large"
            prefix={
              <Icon
                type="user"
                style={{ fontSize: '20px', color: '#9F9F9F' }}
              />
            }
            type="text"
            onChange={(e) => { setUsername(e.target.value); }}
            placeholder="请输入用户名"
            value={username}
          />
          <Input.Password
            size="large"
            prefix={
              <Icon
                type="lock"
                style={{ fontSize: '20px', color: '#9F9F9F' }}
              />
            }
            type="password"
            onChange={(e) => { setPwd(e.target.value); }}
            placeholder="请输入密码"
            value={pwd}
          />
        </Input.Group>
        <Button type="primary" className="submit" onClick={handleSubmit}>
          登录
          </Button>
      </div>
      <div className="lang">
        <LangDropdown />
      </div>
    </div>
  );
};
export default injectIntl(Login);
