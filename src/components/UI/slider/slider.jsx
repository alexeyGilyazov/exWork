import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './style.css'
import SLIDER1 from '../../../assets/slider1.webp'
import SLIDER2 from '../../../assets/slider2.webp'
import SLIDER3 from '../../../assets/slider3.webp'
import { Autoplay } from 'swiper/modules';

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        // autoplay={{
        //   delay: 1500,
        //   disableOnInteraction: true,
        // }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src={SLIDER1} alt="img" /></SwiperSlide>
        <SwiperSlide><img src={SLIDER2} alt="img" /></SwiperSlide>
        <SwiperSlide><img src={SLIDER3} alt="img" /></SwiperSlide>

      </Swiper>
    </>
  )
}

export default Slider