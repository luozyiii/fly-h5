import React, { useState, useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';

export default function (props) {
  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 1500,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  useEffect(() => {}, []);

  return (
    <AwesomeSwiper className="banner" config={config}>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img
            alt="banner"
            src={
              'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg'
            }
          />
        </div>
        <div className="swiper-slide">
          <img
            alt="banner"
            src={
              'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png'
            }
          />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </AwesomeSwiper>
  );
}
