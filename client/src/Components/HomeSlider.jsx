// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { EffectFade, Navigation, Pagination,Autoplay } from "swiper/modules";
// import { Button } from "antd";
// const HomeSlider = (props) => {
//   return (
//     <>
//       <Swiper
//       loop={true}
//         spaceBetween={30}
//         effect={"fade"}
//         // navigation={true}
//         // pagination={{
//         //   clickable: true,
//         // }}
//         autoplay={{delay:5000, disableOnInteraction:false,}}
//         modules={[EffectFade, Navigation, Autoplay, Pagination,]}
//         className="sliderHome"
//       >
//         {props.homeBanners
//   ?.filter((banner) => banner.status === "active")
//   ?.map((banner, index) => (
    
//         <SwiperSlide>
//           <div className="item w-full rounded-md overflow-hidden relative">
//             <img src={banner.images} alt="Home Banner"  className="h-full w-full"/>
//             {/* <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center gap-6 transition-all duration-700">
//               <h4 className="text-[20px] relative -right-[100%] opacity-0 font-[500] w-full">
//                 Big Saving Days Sale
//               </h4>
//               <h2 className="text-[35px] relative -right-[100%] opacity-0 font-[800] w-full">
//                 Women Solid Round Green T-Shirt
//               </h2>
//               <h3 className=" flex items-center gap-3 text-[20px] font-[500] w-full relative -right-[100%] opacity-0 ">Starting At Only <span className=" font-[800] text-[30px]">AED 350</span></h3>
//               <div className="w-full btn_ relative -right-[100%] opacity-0">
//               <Button className="!bg-black !text-white uppercase !font-[500] !text-[16px] !p-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none  ">Shop Now</Button>
//               </div>
//             </div> */}
//           </div>
//         </SwiperSlide>
//   ))}
//         {/* <SwiperSlide>
//           <div className="item w-full rounded-md overflow-hidden relative">
//             <img src={props.homeBanners[1]?.images} alt="Home Banner" />
//             <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center gap-6 transition-all duration-700">
//               <h4 className="text-[20px] relative -right-[100%] opacity-0 font-[500] w-full">
//                 Big Saving Days Sale
//               </h4>
//               <h2 className="text-[35px] relative -right-[100%] opacity-0 font-[800] w-full">
//                 Women Solid Round Green T-Shirt
//               </h2>
//               <h3 className=" flex items-center gap-3 text-[20px] font-[500] w-full relative -right-[100%] opacity-0 ">Starting At Only <span className=" font-[800] text-[30px]">AED 350</span></h3>
//               <div className="w-full btn_ relative -right-[100%] opacity-0">
//               <Button className="!bg-black !text-white uppercase !font-[500] !text-[16px] !p-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none  ">Shop Now</Button>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide> */}
//       </Swiper>
//     </>
//   );
// };

// export default HomeSlider;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

const HomeSlider = (props) => {
  const activeBanners =
    props.homeBanners?.filter(
      (banner) => banner.status === "active"
    ) || [];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
         loop={true}
        spaceBetween={30}
        effect={"fade"}
        // navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{delay:5000, disableOnInteraction:false,}}
        modules={[EffectFade, Navigation, Autoplay, Pagination,]}
        className="sliderHome"
      >
        {activeBanners.map((banner, index) => (
          <SwiperSlide key={banner._id || banner.id || index}>
            <div
              className="
                item w-full rounded-md overflow-hidden relative
                xs:h-[200px]
                sm:h-[280px]
                md:h-[380px]
                lg:h-[480px]
              "
            >
              <img
                src={banner.images}
                alt={`Home Banner ${index + 1}`}
                className="
                  block
                  w-full
                  h-full
                  object-cover
                  object-center
                "
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;