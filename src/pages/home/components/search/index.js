import React, { useState, useEffect, memo } from 'react';
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { history } from 'umi';

function Search(props) {
  console.log('search render'); // 加载的时候search 执行了多次;优化后也执行了多次，这是因为props值变化导致； 这个时候需要传入第二参数控制areEqual
  // const [citys, setCitys] = useState([]);
  const [selectedCity, setSelectedCity] = useState(['10001']);
  const [times, setTimes] = useState('可选时间');
  const [dateShow, setDateShow] = useState(false);

  const handleCityChange = (value) => {
    // console.log(value);
    setSelectedCity(value);
  };

  const handleDate = () => {
    setDateShow(!dateShow);
  };

  const handleDateConfirm = (startTime, endTime) => {
    // console.log(startTime, endTime);
    let _times =
      dayjs(startTime).format('YYYY-MM-DD') +
      '~' +
      dayjs(endTime).format('YYYY-MM-DD');
    setTimes(_times);
    setDateShow(!dateShow);
  };

  const handleClick = () => {
    if (times.includes('~')) {
      let _times = times.split('~');
      history.push({
        pathname: '/search',
        query: {
          code: selectedCity,
          startTime: _times[0],
          endTime: _times[1],
        },
      });
    } else {
      Toast.fail('请选择时间');
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="search">
      {/* 可选城市 */}
      <div className="search-addr">
        {!props.citysLoading && (
          <Picker
            title="城市"
            data={props.citys}
            value={selectedCity}
            cascade={false}
            cols={1}
            onChange={handleCityChange}
          >
            <List.Item>可选城市</List.Item>
          </Picker>
        )}
      </div>
      {/* 可选时间 */}
      <div className="search-time" onClick={handleDate}>
        <p className="search-time-left">出租时间</p>
        <p className="search-time-right">{times}</p>
      </div>
      {/* 点击按钮 */}
      <Button type="warning" size="large" onClick={handleClick}>
        搜索民宿
      </Button>

      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  );
}

// memo 第二个参数
function areEqual(prevProps, nextProps) {
  console.log(prevProps, nextProps);
  // true 可以渲染; 优化后剩下3次
  if (
    prevProps.citys === nextProps.citys &&
    prevProps.citysLoading === nextProps.citysLoading
  ) {
    return true;
  } else {
    return false;
  }
}

export default memo(Search, areEqual);
