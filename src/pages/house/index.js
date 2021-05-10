import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';

import './index.less';

export default function (props) {
  const { query } = useLocation();
  const {
    house: { detail, getDetailAsync, comments, getCommentsAsync, showLoading },
  } = useStoreHook();

  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {});

  useEffect(() => {
    getDetailAsync({ id: query?.id });
  }, []);

  useEffect(() => {
    getCommentsAsync({ id: query?.id });
  }, []);

  return (
    <div className="house-page">
      {/* banner */}
      <Banner banner={detail?.banner} />
      {/* 房屋信息 */}
      <Info detail={detail?.info} />
      {/* 评论列表 */}
      <Lists lists={comments} showLoading={showLoading} />
      {/* footer */}
      <Footer />
    </div>
  );
}
