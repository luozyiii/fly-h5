import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from '@/components';
import Header from './components/header';
import Search from './components/search';
import Hot from './components/hot';
import { useHttpHook } from '@/hooks';

import './index.less';

export default function (props) {
  const [state, setState] = useState();

  const [citys, citysLoading] = useHttpHook({
    url: '/commons/citys',
  });

  const [house] = useHttpHook({
    url: '/house/hot',
  });

  useEffect(() => {}, []);

  return (
    <ErrorBoundary>
      <div className="home">
        {/* header 登录 */}
        <Header />
        {/* 搜索 */}
        <Search citys={citys} citysLoading={citysLoading} />
        {/* 热门民宿 */}
        <Hot house={house} />
      </div>
    </ErrorBoundary>
  );
}
