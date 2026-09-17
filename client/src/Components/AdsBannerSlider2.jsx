import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BannerBox from "./BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <div className="">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          //   autoplay={{delay:2000,disableOnInteraction:false}}
          className="smallBtn"
        >
          {props.data
            ?.filter((banner) => banner.status === "active")
            ?.map((banner, index) => (
              <SwiperSlide key={index}>
                <BannerBox img={banner.images} Link={"/"} />
              </SwiperSlide>
            ))}
          {/* <SwiperSlide>
               <BannerBox img={} Link={'/'}/>
               </SwiperSlide>       */}
          {/* <SwiperSlide>
               <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
               </SwiperSlide>      
               <SwiperSlide>
               <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
               </SwiperSlide>      
               <SwiperSlide>
               <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
               </SwiperSlide>      
               <SwiperSlide>
               <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
               </SwiperSlide>      
               <SwiperSlide>
               <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
               </SwiperSlide>      
               <SwiperSlide>
               <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
               </SwiperSlide>       */}
        </Swiper>
      </div>
    </div>
  );
};

export default AdsBannerSlider;
