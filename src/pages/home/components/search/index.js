import React, { useState, useEffect } from 'react';
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { history } from 'umi';

export default function (props) {
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
