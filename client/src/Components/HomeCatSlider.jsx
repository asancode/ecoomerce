// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import 'swiper/css/navigation'
// import { Navigation } from "swiper/modules";
// import { Link } from "react-router-dom";

// const HomeCatSlider = (props) => {
//   return (
//     <div className="HomeCatSlider pb-3">
//       <div className="container">
//         <Swiper
//           slidesPerView={6}
//           spaceBetween={10}
//           navigation={true}
//           modules={[Navigation]}
//         //   autoplay={{delay:2000,disableOnInteraction:false}}
//           className="mySwiper"
//         >{props.catData?.length > 0 && props.catData?.map((cat) => (
//           <SwiperSlide>
//             <Link to={`/category/${cat.slug}`}>
//             <div className="item py-3 group text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src={cat.images} className="rounded-md group-hover:scale-105 transition-all duration-700 w-[200px] h-[200px]"/> <h2 className="text-[15px] font-[500] mt-3">{cat.name}</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//           {/* <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide>
//           <SwiperSlide>
//             <Link to='/'>
//             <div className="item py-3 text-center flex items-center justify-center flex-col bg-white rounded-md">
//                 <img src="https://m.media-amazon.com/images/I/61MXM+f+iDL._AC_UL480_FMwebp_QL65_.jpg" className="rounded-md h-[100px]"/> <h2 className="text-[14px] font-[500] mt-3">Watch</h2>
//             </div>
//             </Link>
//           </SwiperSlide> */}
         
          
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default HomeCatSlider;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = (props) => {
  return (
    <div className="HomeCatSlider pb-3">
      <div className="container">
        <Swiper
          // ✅ RESPONSIVE FIX: fixed slidesPerView={6} squeezed 6 category
          // icons into a phone-width screen (icons became tiny slivers,
          // often clipped since the images were also a fixed 200x200px).
          // Breakpoints now scale the count down on small screens.
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 3, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 6, spaceBetween: 10 },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {props.catData?.length > 0 &&
            props.catData?.map((cat) => (
              // ✅ FIX: missing "key" prop on the mapped SwiperSlide —
              // React needs a stable key here to track slides correctly
              // when catData changes.
              <SwiperSlide key={cat._id || cat.slug}>
                <Link to={`/category/${cat.slug}`}>
                  <div className="item py-3 group text-center flex items-center justify-center flex-col bg-white rounded-md">
                    {/* ✅ RESPONSIVE FIX: fixed w-[200px] h-[200px] forced
                        every category image to 200px regardless of how
                        much space the slide actually had — on mobile
                        (2-3 slides visible) this overflowed the slide and
                        got clipped/cut off. Now scales with the slide's
                        own width, capped so it doesn't grow huge on
                        desktop. */}
                    <img
                      src={cat.images}
                      alt={cat.name}
                      className="rounded-md group-hover:scale-105 transition-all duration-700 w-full max-w-[200px] aspect-square object-cover"
                    />
                    <h2 className="text-[13px] sm:text-[15px] font-[500] mt-3 px-1 line-clamp-1">
                      {cat.name}
                    </h2>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;