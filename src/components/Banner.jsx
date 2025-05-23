import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import slide1 from '../assets/banner slides/slide1.jpg';
import slide2 from '../assets/banner slides/slide2.jpg';

const Banner = () => {
  return (
    <div className="mt-14 h-[50vh]">
      <div className="container mx-auto">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          <SwiperSlide className="swiper-fixed-height-full">
            <div>
              <img src={slide1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-fixed-height-full">
            <div>
              <img src={slide2} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
