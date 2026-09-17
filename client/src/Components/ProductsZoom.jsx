// import React, { useRef, useState } from "react";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/styles.min.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import Item from "antd/es/list/Item";

// const ProductsZoom = (props) => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const zoomSliderBig = useRef();
//   const zoomSliderSml = useRef();

//   const goto = (index) => {
//     setSlideIndex(index);
//     zoomSliderSml.current.swiper.slideTo(index);
//     zoomSliderBig.current.swiper.slideTo(index);
//   };
//   return (
//     <>
//       <div className="flex gap-3">
//       <div className="slider w-[15%]">
//                   <Swiper
//                     ref={zoomSliderSml}
//                     direction={"vertical"}
//                     slidesPerView={4}
//                     spaceBetween={0}
//                     navigation={true}
//                     modules={[Navigation]}
//                     className={`zoomProductSliderThumbs h-[75vh] overflow-hidden ${props?.images?.length < 5 && "space"}`}
//                   >
//                     {props?.images?.map((img, index) => {
//                       return (
//                         <SwiperSlide key={index}>
//                           <div
//                             className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === index ? "opacity-1" : "opacity-30"}`}
//                             onClick={() => goto(index)}
//                           >
//                             <img
//                               src={img}
//                               className="w-full transition-all group-hover:scale-105"
//                             />
//                           </div>
//                         </SwiperSlide>
//                       );
//                     })}
//                   </Swiper>
//                 </div>
//                 <div className="w-[85%] overflow-hidden">
//                   <Swiper
//                     ref={zoomSliderBig}
//                     slidesPerView={1}
//                     spaceBetween={10}
//                     navigation={false}
//                   >
//                     {props?.images?.map((img, index) => {
//                       return (
//                         <SwiperSlide key={index}>
//                           <InnerImageZoom
//                             zoomType="hover"
//                             zoomScale={1}
//                             src={img}
//                             className="rounded-md"
//                           />
//                         </SwiperSlide>
//                       );
//                     })}
//                   </Swiper>
//                 </div>
//       </div>
//     </>
//   );
// };

// export default ProductsZoom;
import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// ✅ FIX: "import Item from 'antd/es/list/Item'" was imported but never
// used anywhere in this file — dead import, removed.

const ProductsZoom = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  // ✅ RESPONSIVE: on mobile, a vertical 15%-wide thumbnail strip next to
  // a 75vh-tall main image is cramped and awkward to tap. Track viewport
  // width so the thumbnail strip can switch to a horizontal row below the
  // main image on small screens, and stay as a vertical side strip on
  // desktop, matching this file's original intent.
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current?.swiper?.slideTo(index);
    zoomSliderBig.current?.swiper?.slideTo(index);
  };

  return (
    <>
      {/* Locally scoped nav-arrow color override — Swiper's default
          arrows are a generic dark/black; retinted to the brand's rose
          accent to match the rest of the redesigned pages. */}
      <style>{`
        .zoomProductSliderThumbs .swiper-button-next,
        .zoomProductSliderThumbs .swiper-button-prev {
          color: #B23A5C;
          transform: scale(0.6);
        }
      `}</style>

      <div className="flex flex-col md:flex-row gap-3">
        {/* THUMBNAILS */}
        <div className="slider order-2 md:order-1 w-full md:w-[18%] lg:w-[15%]">
          <Swiper
            ref={zoomSliderSml}
            direction={isDesktop ? "vertical" : "horizontal"}
            slidesPerView={4}
            spaceBetween={8}
            navigation={isDesktop}
            modules={[Navigation]}
            // ✅ FIX: "${props?.images?.length < 5 && 'space'}" rendered
            // the literal string "false" into the class list whenever
            // there were 5+ images (since `false && "space"` is `false`,
            // and `${false}` stringifies to "false"). Using a proper
            // ternary avoids that.
            className={`zoomProductSliderThumbs h-16 sm:h-20 md:h-[75vh] overflow-hidden ${
              props?.images?.length < 5 ? "space" : ""
            }`}
          >
            {props?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                {/* ✅ DESIGN: active thumbnail now gets a rose ring
                    instead of a flat opacity toggle — clearer at a
                    glance, and consistent with the brand accent used
                    elsewhere. Inactive thumbs are gently dimmed rather
                    than near-invisible at 30% opacity. */}
                <div
                  className={`item rounded-lg overflow-hidden cursor-pointer group border-2 transition-all ${
                    slideIndex === index
                      ? "border-[#B23A5C] opacity-100"
                      : "border-transparent opacity-70 hover:opacity-100 hover:border-[#C79A4B]"
                  }`}
                  onClick={() => goto(index)}
                >
                  <img
                    src={img}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-16 sm:h-20 md:h-auto object-cover transition-all group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* MAIN IMAGE */}
        <div className="order-1 md:order-2 w-full md:w-[82%] lg:w-[85%] overflow-hidden">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={10}
            navigation={false}
            onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
            className="h-[280px] sm:h-[420px] md:h-[75vh]"
          >
            {props?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                {/* ✅ FIX: zoomScale={1} meant "zoom in to 1x", i.e. no
                    actual magnification at all — the hover-zoom feature
                    was silently doing nothing. Bumped to a real zoom
                    level. */}
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={1.6}
                  src={img}
                  className="rounded-md h-full w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductsZoom;