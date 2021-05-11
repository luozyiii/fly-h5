import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';

import './index.less';

function Login(props) {
  const { getFieldProps, validateFields } = props.form;
  const {
    user: { registerAsync },
  } = useStoreHook();

  const handleSubmit = () => {
    validateFields((error, value) => {
      if (error) {
        Toast.fail('请将信息填写完整！');
        return;
      }
      if (value.password !== value.password2) {
        Toast.fail('密码和确认密码必须一致');
        return;
      }
      registerAsync(value);
    });
  };

  const handleClick = () => {
    history.push({
      pathname: '/login',
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="register-page">
      <List renderHeader={() => '用户注册'}>
        <List.Item>
          <InputItem
            placeholder="用户名"
            {...getFieldProps('username', {
              rules: [{ required: true }],
            })}
          >
            用户名
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('password', {
              rules: [{ required: true }],
            })}
            placeholder="密码"
          >
            密码
          </InputItem>
        </List.Item>
        <List.Item>
          <InputItem
            {...getFieldProps('password2', {
              rules: [{ required: true }],
            })}
            placeholder="确认密码"
          >
            确认密码
          </InputItem>
        </List.Item>
      </List>
      <Button type="warning" onClick={handleSubmit}>
        注册
      </Button>
      <div className="login" onClick={handleClick}>
        已有账户，去登录
      </div>
    </div>
  );
}

export default createForm()(Login);
