import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation } from 'umi';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';

import './index.less';

export default function (props) {
  const { query } = useLocation();
  // console.log('query:', query);
  const [houseName, setHouseName] = useState();
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [houseLists, setHouseLists] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSubmitName, setHouseSubmitName] = useState('');

  const handleChange = (value) => {
    // console.log(value);
    setHouseName(value);
  };

  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseSubmitName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    watch: [page.pageNum, houseSubmitName],
  });

  /**
   * 技术要点：借助一个元素的是否在可视区域，从而实现列表的滚动加载；核心API IntersectionObserver
   * 1、监听loading是否展示出来
   * 2、修改分页数据
   * 3、监听分页数据的修改，发送接口，请求下一页的数据
   * 4、监听loading的变化，拼装数据
   */
  useObserverHook(
    '#' + CommonEnum.LOADING_ID,
    (entries) => {
      if (!loading && entries[0].isIntersecting) {
        console.log('11111111111111');
        setPage({
          ...page,
          pageNum: page.pageNum + 1,
        });
      }
    },
    null,
  );

  useImgHook('.item-img', (entries) => {}, null);

  const handleSubmit = (value) => {
    _handleSubmit(value);
  };

  const handelCancel = () => {
    // console.log('取消');
    _handleSubmit('');
  };

  const _handleSubmit = (value) => {
    // console.log(value);
    setHouseName(value);
    setHouseSubmitName(value);
    setPage(CommonEnum.PAGE);
    setHouseLists([]);
  };

  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        setHouseLists([...houseLists, ...houses]);
        if (houses.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [loading]);

  return (
    <div className="search-page">
      {/* 顶部搜索栏 */}
      <SearchBar
        placeholder="搜索名宿"
        value={houseName}
        onChange={handleChange}
        onCancel={handelCancel}
        onSubmit={handleSubmit}
      />
      {/* 搜索结果 */}
      {!houseLists.length ? (
        <ActivityIndicator toast />
      ) : (
        <div className="result">
          {houseLists.map((item) => (
            <div className="item" key={item.id}>
              <img
                className="item-img"
                data-src={item.img}
                alt="img"
                src={require('../../assets/blank.png')}
              />
              <div className="item-right">
                <div className="title">{item.title}</div>
                <div className="price">{item.price}</div>
              </div>
            </div>
          ))}
          <ShowLoading showLoading={showLoading} />
          {/* {showLoading ? (
            <div id="loading">loading</div>
          ) : (
            <div>没有数据了</div>
          )} */}
        </div>
      )}
    </div>
  );
}
