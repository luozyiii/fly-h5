import React, { useState, useEffect, memo } from 'react';
import { Link } from 'umi';

function Header(props) {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  console.log('header render'); // 加载的时候header 执行了多次; 使用memo 仅执行一次
  useEffect(() => {}, []);

  return (
    <div className="header">
      <div className="header-title">民宿</div>
      <div className="header-login">
        {username ? (
          username
        ) : (
          <>
            <Link to="/login">登录</Link>|<Link to="/register">注册</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(Header);
