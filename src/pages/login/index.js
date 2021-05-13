import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less';

function Login(props) {
  const { getFieldProps, validateFields } = props.form;
  const {
    user: { loginAsync },
  } = useStoreHook();

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息填写完整！');
        return;
      }
      loginAsync(value);
    });
  };

  const handleClick = () => {
    history.push({
      pathname: '/register',
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="login-page">
      <List renderHeader={() => '用户登录'}>
        <InputItem
          placeholder="用户名"
          {...getFieldProps('username', {
            rules: [{ required: true }],
          })}
        >
          用户名
        </InputItem>
        <InputItem
          {...getFieldProps('password', {
            rules: [{ required: true }],
          })}
          placeholder="密码"
        >
          密码
        </InputItem>
      </List>
      <Button type="warning" onClick={handleSubmit}>
        登录
      </Button>
      <div className="register" onClick={handleClick}>
        没有账户，去注册
      </div>
    </div>
  );
}

export default createForm()(Login);
