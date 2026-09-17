// import React from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import 'swiper/css/navigation'
// import { Navigation } from "swiper/modules";
// import { Link } from "react-router-dom";
// import ProductsItems from './ProductsItems';

// const ProductsSlider = (props) => {
//   return (
//     <div className='productsSlider py-5'>
//        <Swiper
//                 slidesPerView={props.items}
//                 spaceBetween={10}
//                 navigation={true}
//                 modules={[Navigation]}
//                 className="mySwiper"
//               >
//                 {props.data?.length > 0 && props.data?.map((prod,index) => (
//                 <SwiperSlide key={index}>
//                   {/* <Link to='/'> */}
//                  <ProductsItems item={prod}/>
//                   {/* </Link> */}
//                 </SwiperSlide>                
//                 ))}
                           
//               </Swiper>
//     </div>
//   )
// }

// export default ProductsSlider
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductsItems from "./ProductsItems";

const ProductsSlider = (props) => {
  return (
    <div className="productsSlider py-5">
      <Swiper
        // ✅ RESPONSIVE FIX: slidesPerView was a single fixed number
        // (props.items) with no breakpoints, so on mobile it showed the
        // same count as desktop — cards got squeezed/overflowed. These
        // breakpoints scale down automatically on small screens; the
        // largest one still respects whatever the parent passed in.
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: props.items || 5, spaceBetween: 10 },
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {props.data?.length > 0 &&
          props.data?.map((prod, index) => (
            <SwiperSlide key={prod?._id || index}>
              <ProductsItems item={prod} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;