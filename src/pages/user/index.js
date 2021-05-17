import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const {
    user: { avatar, phone, sign, getUserAsync, logoutAsync, editUserAsync },
  } = useStoreHook();

  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
    });
  };

  const handleLogout = () => {
    logoutAsync();
  };

  useEffect(() => {
    getUserAsync({});
  }, []);

  return (
    <ErrorBoundary>
      <div className="user-page">
        {/* 用户信息 */}
        <div className="info">
          <div className="set" onClick={handleClick}>
            设置
          </div>
          <div className="user">
            <img alt="user" src={avatar || require('../../assets/yay.jpg')} />
            <div className="tel">{phone}</div>
            <div className="sign">{sign}</div>
          </div>
        </div>
        {/* 列表 */}
        <div className="lists">
          <List>
            <List.Item arrow="horizontal">用户协议</List.Item>
            <List.Item arrow="horizontal">常见问题</List.Item>
            <List.Item arrow="horizontal">联系客服</List.Item>
          </List>
        </div>
        <Button style={{ marginTop: '100px' }} onClick={handleLogout}>
          退出登录
        </Button>
      </div>
    </ErrorBoundary>
  );
}
