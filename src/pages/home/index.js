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
  console.log(citys, citysLoading);

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
        {citys && <Search citys={citys} citysLoading={citysLoading} />}
        {/* 热门民宿 */}
        {house && <Hot house={house} />}
      </div>
    </ErrorBoundary>
  );
}
