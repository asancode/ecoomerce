// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { Link } from "react-router-dom";
// import BannerBox from "./BannerBox";

// const AdsBannerSlider = (props) => {
//   return (
//     <div className="py-5 w-full">
//       <div className="">
//         <Swiper
//           slidesPerView={props.items}
//           spaceBetween={10}
//           navigation={true}
//           modules={[Navigation]}
//           //   autoplay={{delay:2000,disableOnInteraction:false}}
//           className="smallBtn"
//         >
//           {props.data
//             ?.filter((banner) => banner.status === "active")
//             ?.map((banner, index) => (
//               <SwiperSlide key={index}>
//                 <BannerBox info={banner?.textAlignment} item={banner} img={banner.images} Link={"/"} />
//               </SwiperSlide>
//             ))}
//           {/* <SwiperSlide>
//                <BannerBox img={} Link={'/'}/>
//                </SwiperSlide>       */}
//           {/* <SwiperSlide>
//                <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
//                </SwiperSlide>      
//                <SwiperSlide>
//                <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
//                </SwiperSlide>      
//                <SwiperSlide>
//                <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
//                </SwiperSlide>      
//                <SwiperSlide>
//                <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
//                </SwiperSlide>      
//                <SwiperSlide>
//                <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
//                </SwiperSlide>      
//                <SwiperSlide>
//                <BannerBox img={"https://thumbs.dreamstime.com/z/cosmetics-skin-car…und-glittering-light-effect-225009983.jpg?ct=jpeg"} Link={'/'}/>
//                </SwiperSlide>       */}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default AdsBannerSlider;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBox from "./BannerBox";
const API_URL = import.meta.env.VITE_API_URL
const AdsBannerSlider = (props) => {
  const activeBanners =
    props.data?.filter((banner) => banner.status === "active") || [];

  return (
    <div className="py-5 w-full">
      <Swiper
        // ✅ RESPONSIVE FIX: same issue as ProductsSlider — a single fixed
        // slidesPerView doesn't reflow on mobile. Breakpoints added so
        // banners scale down on small screens instead of overflowing.
        slidesPerView={1}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: props.items || 3, spaceBetween: 10 },
        }}
        navigation={true}
        modules={[Navigation]}
        className="smallBtn"
      >
        {activeBanners.map((banner, index) => (
          <SwiperSlide key={banner._id || index}>
            <BannerBox
              info={banner?.textAlignment}
              item={banner}
              img={banner.images}
              Link={"/"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;