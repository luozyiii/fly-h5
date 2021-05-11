import React, { useState, useEffect } from 'react';
import { Link } from 'umi';

export default function (props) {
  const [username, setUsername] = useState(localStorage.getItem('username'));

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
