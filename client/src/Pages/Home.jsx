// // import React from "react";
// // import HomeSlider from "../Components/HomeSlider";
// // import HomeCatSlider from "../Components/HomeCatSlider";
// // import { FaShippingFast } from "react-icons/fa";
// // import AdsBannerSlider from "../Components/AdsBannerSlider";
// // import Tabs from "@mui/material/Tabs";
// // import Tab from "@mui/material/Tab";
// // import Box from "@mui/material/Box";
// // import ProductsSlider from "../Components/ProductsSlider";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import { Navigation } from "swiper/modules";
// // import BlogItems from "../Components/BlogItems";
// // import BannerBox2 from "../Components/BannerBox2";
// // import { useState } from "react";
// // import { useEffect } from "react";
// // import axios from "axios";
// // import { useContext } from "react";
// // import { MyContext } from "../App";
// // import AdsBannerSlide2 from "../Components/AdsBannerSlider2";
// // import ProductsLoading from "../Components/ProductsLoading";

// // const Home = () => {
// //   const [value, setValue] = useState(0);
// //   const [productsData, setProductsData] = useState([]);
// //   const [homeBanners, setHomeBanners] = useState([]);
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const [adsBanners, setAdsBanners] = useState([]);
// //   const [latestProducts, setLatestProducts] = useState([]);
// //   const [adBanners, setAdBanners] = useState([]);
// //   const [blogData, setBlogData] = useState([]);
// //   const [featuredProducts, setFeaturedProducts] = useState([]);
// //   const context = useContext(MyContext);
// //   const handleChange = (event, newValue) => {
// //     setValue(newValue);
// //   };
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //     axios
// //       .get("http://localhost:5000/api/homeBanner/getallhomebanners")
// //       .then((res) => {
// //         setHomeBanners(res.data.homeBanner);
// //       });
// //   }, []);
// //   useEffect(() => {
// //     axios.get(`http://localhost:5000/api/product/getallproduct`).then((res) => {
// //       setLatestProducts(res.data.product);
// //     });
// //   }, [context?.catData]);
// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:5000/api/product/getFeatureProducts`)
// //       .then((res) => {
// //         setFeaturedProducts(res.data.products);
// //       });
// //   }, [context?.catData]);
// //   useEffect(() => {
// //     if (!context?.catData || context.catData.length === 0) return;

// //     const catId = context.catData[0]?._id;

// //     if (!catId) return;

// //     axios
// //       .get(`http://localhost:5000/api/product/getproductbycat/${catId}`)
// //       .then((res) => {
// //         setProductsData(res.data.product);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [context?.catData]);
// //   // useEffect(() => {
// //   //   axios
// //   //     .get(
// //   //       `http://localhost:5000/api/product/getproductbycat/${context?.catData[0]?._id}`,
// //   //     )
// //   //     .then((res) => {
// //   //       setProductsData(res.data.product);
// //   //     });
// //   // }, [context?.catData]);
// //   const filterByCatId = (id) => {
// //     axios
// //       .get(`http://localhost:5000/api/product/getproductbycat/${id}`)
// //       .then((res) => {
// //         setProductsData(res.data.product);
// //       });
// //   };
// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/adHomeBanner/getalladbanners")
// //       .then((res) => {
// //         setAdsBanners(res.data.adBanner);
// //       });
// //   }, []);
// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/adHomeBanner/getalladbanners")
// //       .then((res) => {
// //         setAdBanners(res.data.adBanner);
// //       });
// //   }, []);
// //   useEffect(() => {
// //     axios.get("http://localhost:5000/api/blog/get").then((res) => {
// //       setBlogData(res?.data?.data);
// //     });
// //   }, []);

// //   const text = `We are the leading florist in Dubai, UAE, offering a wide range
// //                 of fresh flowers and cakes for delivery. Our expert florists
// //                 create stunning arrangements for all occasions, ensuring timely
// //                 delivery across the city. Whether it's a birthday, anniversary,
// //                 or any special event, we provide exquisite floral designs and
// //                 delicious cakes to make your moments memorable. Experience the
// //                 best in flower and cake delivery with us in Dubai.`;
// //   return (
// //     <div>
// //       {/* <HomeSlider /> */}
// //       <section className="py-6">
// //         <div className="container w-full !-mb-[65px] h-auto flex gap-4">
// //           <div className="part1 w-[65%] h-[492px] rounded-xl overflow-hidden">
// //             {homeBanners.length > 0 && <HomeSlider homeBanners={homeBanners} />}
// //           </div>
// //           <div className="w-[35%] flex flex-col gap-4">
// //             <BannerBox2 info="left" image={homeBanners[0]?.images} />
// //             <BannerBox2 info="right" image={homeBanners[1]?.images} />
// //           </div>
// //         </div>
// //       </section>
// //       {context?.catData?.length > 0 && (
// //         <HomeCatSlider catData={context.catData} />
// //       )}
// //       {/* <HomeCatSlider /> */}
// //       <section className="bg-white py-8">
// //         <div className="container">
// //           <div className="flex items-center justify-between">
// //             <div className="leftSec">
// //               <h2 className="text-[24px] font-semibold">Popular Products</h2>
// //               {/* <p>Do not miss the current offers until the end of March</p> */}
// //             </div>
// //             <div className="rightSec w-[50%]">
// //               {/* <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}> */}

// //               <Tabs
// //                 value={value}
// //                 onChange={handleChange}
// //                 variant="scrollable"
// //                 scrollButtons="auto"
// //                 aria-label="scrollable auto tabs example"
// //               >
// //                 {context?.catData?.length > 0 &&
// //                   context?.catData?.map((cat) => (
// //                     <Tab
// //                       label={cat.name}
// //                       onClick={() => filterByCatId(cat?._id)}
// //                     />
// //                   ))}
// //               </Tabs>
// //               {/* </Box> */}
// //             </div>
// //           </div>
// //           {productsData?.length === 0 && <ProductsLoading />}

// //           {productsData?.length > 0 && (
// //             <ProductsSlider items={6} data={productsData} />
// //           )}
// //         </div>
// //       </section>

// //       <section className="py-16 pb-3 pt-2 bg-white">
// //         <div className="container">
// //           <div className="freeShipping py-2 rounded-md w-full p-5 border-2 border-gray-400 flex items-center justify-center mb-5">
// //             {/* <div className="col1 flex items-center gap-4">
// //               <FaShippingFast className="text-[50px]" />
// //               <span className="text-[30px] font-semibold uppercase">
// //                 Free Shipping
// //               </span>
// //             </div> */}

// //             <div className="col2 flex flex-col items-center justify-center gap-2">
// //               <h1 className="mb-0 text-[25px] font-[500]">
// //                 Leading Florist for Cake and Flower Delivery in Dubai, UAE
// //               </h1>
// //               <p className="text-[15px] mb-0 mt-1">
// //                 {isExpanded ? text : text.substring(0, 200) + "..."}
// //                 <span
// //                   onClick={() => setIsExpanded(!isExpanded)}
// //                   className="text-blue-500 cursor-pointer"
// //                 >
// //                   {isExpanded ? " Show Less" : " Read More"}
// //                 </span>
// //               </p>
// //             </div>
// //           </div>
// //           {adsBanners?.length > 0 && (
// //             <AdsBannerSlider items={4} data={adsBanners} />
// //           )}
// //         </div>
// //       </section>

// //       <section className="py-5 pt-0 bg-white">
// //         <div className="container">
// //           <h2 className="text-[20px] font-[600]"> Latest Products</h2>
// //           {latestProducts?.length === 0 && <ProductsLoading />}
// //           {latestProducts?.length > 0 && (
// //             <ProductsSlider items={6} data={latestProducts} />
// //           )}
// //         </div>
// //       </section>
// //       <section className="py-5 pt-0 bg-white">
// //         <div className="container">
// //           <h2 className="text-[20px] mb-1 font-[600]"> Featured Products</h2>
// //           {featuredProducts?.length === 0 && <ProductsLoading />}
// //           {featuredProducts?.length > 0 && (
// //             <ProductsSlider items={6} data={featuredProducts} />
// //           )}
// //           <AdsBannerSlider items={3} />
// //         </div>
// //       </section>

// //       <section className="py-5 pt-0 bg-white blogSection">
// //         <div className="container">
// //           <h2 className="text-[20px] mb-4 font-[600]"> From Blog</h2>
// //           <Swiper
// //             slidesPerView={4}
// //             spaceBetween={30}
// //             navigation={true}
// //             modules={[Navigation]}
// //             //   autoplay={{delay:2000,disableOnInteraction:false}}
// //             className="blogSlider"
// //           >
// //             {blogData?.map((blog) => (
// //               <SwiperSlide key={blog._id}>
// //                 <BlogItems items={blog} />
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useContext, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// import axios from "axios";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// import HomeSlider from "../Components/HomeSlider";
// import HomeCatSlider from "../Components/HomeCatSlider";
// import AdsBannerSlider from "../Components/AdsBannerSlider";
// import ProductsSlider from "../Components/ProductsSlider";
// import BlogItems from "../Components/BlogItems";
// import BannerBox2 from "../Components/BannerBox2";
// import ProductsLoading from "../Components/ProductsLoading";

// import { MyContext } from "../App";

// const Home = () => {
//   const [value, setValue] = useState(0);

//   const [productsData, setProductsData] = useState([]);
//   const [homeBanners, setHomeBanners] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [adsBanners, setAdsBanners] = useState([]);
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [blogData, setBlogData] = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);

//   const context = useContext(MyContext);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   // Home Banners
//   useEffect(() => {
//     window.scrollTo(0, 0);

//     axios
//       .get("http://localhost:5000/api/homeBanner/getallhomebanners")
//       .then((res) => {
//         setHomeBanners(res?.data?.homeBanner || []);
//       })
//       .catch((err) => {
//         console.log("Home banner error:", err);
//       });
//   }, []);

//   // Latest Products
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/product/getallproduct")
//       .then((res) => {
//         setLatestProducts(res?.data?.product || []);
//       })
//       .catch((err) => {
//         console.log("Latest products error:", err);
//       });
//   }, [context?.catData]);

//   // Featured Products
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/product/getFeatureProducts")
//       .then((res) => {
//         setFeaturedProducts(res?.data?.products || []);
//       })
//       .catch((err) => {
//         console.log("Featured products error:", err);
//       });
//   }, [context?.catData]);

//   // Default category products
//   useEffect(() => {
//     if (!context?.catData || context.catData.length === 0) {
//       return;
//     }

//     const catId = context.catData[0]?._id;

//     if (!catId) return;

//     axios
//       .get(`http://localhost:5000/api/product/getproductbycat/${catId}`)
//       .then((res) => {
//         setProductsData(res?.data?.product || []);
//       })
//       .catch((err) => {
//         console.log("Category products error:", err);
//       });
//   }, [context?.catData]);

//   // Filter products by category
//   const filterByCatId = (id) => {
//     if (!id) return;

//     axios
//       .get(`http://localhost:5000/api/product/getproductbycat/${id}`)
//       .then((res) => {
//         setProductsData(res?.data?.product || []);
//       })
//       .catch((err) => {
//         console.log("Filter category error:", err);
//       });
//   };

//   // Advertisement Banners
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/adHomeBanner/getalladbanners")
//       .then((res) => {
//         setAdsBanners(res?.data?.adBanner || []);
//       })
//       .catch((err) => {
//         console.log("Ad banner error:", err);
//       });
//   }, []);

//   // Blog
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/blog/get")
//       .then((res) => {
//         setBlogData(res?.data?.data || []);
//       })
//       .catch((err) => {
//         console.log("Blog error:", err);
//       });
//   }, []);

//   const text = `We are the leading florist in Dubai, UAE, offering a wide range 
//   of fresh flowers and cakes for delivery. Our expert florists 
//   create stunning arrangements for all occasions, ensuring timely 
//   delivery across the city. Whether it's a birthday, anniversary, 
//   or any special event, we provide exquisite floral designs and 
//   delicious cakes to make your moments memorable. Experience the 
//   best in flower and cake delivery with us in Dubai.`;

//   return (
//     <div className="w-full overflow-hidden">

//       {/* ================= HERO SECTION ================= */}
//       <section className="py-3 sm:py-5 md:py-6">
//         <div
//           className="
//             container
//             w-full
//             flex
//             flex-col
//             lg:flex-row
//             gap-3
//             sm:gap-4
//             h-auto
//           "
//         >

//           {/* Main Slider */}
//           <div
//             className="
//               part1
//               w-full
//               lg:w-[65%]
//               rounded-xl
//               overflow-hidden
//             "
//           >
//             {homeBanners?.length > 0 && (
//               <HomeSlider homeBanners={homeBanners} />
//             )}
//           </div>

//           {/* Side Banners */}
//           <div
//             className="
//               w-full
//               lg:w-[35%]
//               flex
//               flex-row
//               lg:flex-col
//               gap-3
//               sm:gap-4
//             "
//           >
//             <div className="w-1/2 lg:w-full">
//               <BannerBox2
//                 info="left"
//                 image={homeBanners[0]?.images}
//               />
//             </div>

//             <div className="w-1/2 lg:w-full">
//               <BannerBox2
//                 info="right"
//                 image={homeBanners[1]?.images}
//               />
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ================= CATEGORY SLIDER ================= */}
//       {context?.catData?.length > 0 && (
//         <section className="w-full overflow-hidden">
//           <HomeCatSlider catData={context.catData} />
//         </section>
//       )}

//       {/* ================= POPULAR PRODUCTS ================= */}
//       <section className="bg-white py-5 sm:py-7 md:py-8">
//         <div className="container">

//           <div
//             className="
//               flex
//               flex-col
//               lg:flex-row
//               lg:items-center
//               lg:justify-between
//               gap-3
//               mb-4
//             "
//           >

//             {/* Heading */}
//             <div className="leftSec w-full lg:w-auto">
//               <h2
//                 className="
//                   text-[20px]
//                   sm:text-[22px]
//                   md:text-[24px]
//                   font-semibold
//                 "
//               >
//                 Popular Products
//               </h2>
//             </div>

//             {/* Categories */}
//             <div className="rightSec w-full lg:w-[60%] xl:w-[50%]">
//               <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 aria-label="product categories"
//                 sx={{
//                   width: "100%",
//                   minHeight: "42px",
//                 }}
//               >
//                 {context?.catData?.length > 0 &&
//                   context.catData.map((cat) => (
//                     <Tab
//                       key={cat?._id}
//                       label={cat?.name}
//                       onClick={() => filterByCatId(cat?._id)}
//                       sx={{
//                         minWidth: "auto",
//                         padding: {
//                           xs: "8px 10px",
//                           sm: "8px 14px",
//                         },
//                         fontSize: {
//                           xs: "13px",
//                           sm: "14px",
//                         },
//                       }}
//                     />
//                   ))}
//               </Tabs>
//             </div>
//           </div>

//           {/* Products */}
//           {productsData?.length === 0 && <ProductsLoading />}

//           {productsData?.length > 0 && (
//             <ProductsSlider
//               items={6}
//               data={productsData}
//             />
//           )}

//         </div>
//       </section>

//       {/* ================= SEO CONTENT + ADS ================= */}
//       <section
//         className="
//           py-6
//           sm:py-10
//           md:py-12
//           bg-white
//         "
//       >
//         <div className="container">

//           <div
//             className="
//               freeShipping
//               w-full
//               p-4
//               sm:p-5
//               md:p-6
//               rounded-md
//               border-2
//               border-gray-300
//               flex
//               items-center
//               justify-center
//               mb-5
//             "
//           >
//             <div
//               className="
//                 col2
//                 w-full
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 gap-2
//                 text-center
//               "
//             >

//               <h1
//                 className="
//                   mb-0
//                   text-[18px]
//                   sm:text-[21px]
//                   md:text-[25px]
//                   font-[500]
//                   leading-tight
//                 "
//               >
//                 Leading Florist for Cake and Flower Delivery in Dubai, UAE
//               </h1>

//               <p
//                 className="
//                   text-[13px]
//                   sm:text-[14px]
//                   md:text-[15px]
//                   mb-0
//                   mt-1
//                   leading-6
//                 "
//               >
//                 {isExpanded
//                   ? text
//                   : text.substring(0, 200) + " "}

//                 <span
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="
//                     text-blue-500
//                     cursor-pointer
//                     whitespace-nowrap
//                     ml-1
//                   "
//                 >
//                   {isExpanded ? "Show Less" : "Read More"}
//                 </span>
//               </p>

//             </div>
//           </div>

//           {/* Ads */}
//           {adsBanners?.length > 0 && (
//             <AdsBannerSlider
//               items={4}
//               data={adsBanners}
//             />
//           )}

//         </div>
//       </section>

//       {/* ================= LATEST PRODUCTS ================= */}
//       <section className="py-5 pt-0 bg-white">
//         <div className="container">

//           <h2
//             className="
//               text-[18px]
//               sm:text-[20px]
//               font-[600]
//               mb-3
//             "
//           >
//             Latest Products
//           </h2>

//           {latestProducts?.length === 0 && (
//             <ProductsLoading />
//           )}

//           {latestProducts?.length > 0 && (
//             <ProductsSlider
//               items={6}
//               data={latestProducts}
//             />
//           )}

//         </div>
//       </section>

//       {/* ================= FEATURED PRODUCTS ================= */}
//       <section className="py-5 pt-0 bg-white">
//         <div className="container">

//           <h2
//             className="
//               text-[18px]
//               sm:text-[20px]
//               mb-3
//               font-[600]
//             "
//           >
//             Featured Products
//           </h2>

//           {featuredProducts?.length === 0 && (
//             <ProductsLoading />
//           )}

//           {featuredProducts?.length > 0 && (
//             <ProductsSlider
//               items={6}
//               data={featuredProducts}
//             />
//           )}

//           <div className="mt-5">
//             <AdsBannerSlider items={3} />
//           </div>

//         </div>
//       </section>

//       {/* ================= BLOG ================= */}
//       <section
//         className="
//           py-5
//           pt-0
//           bg-white
//           blogSection
//           overflow-hidden
//         "
//       >
//         <div className="container">

//           <h2
//             className="
//               text-[18px]
//               sm:text-[20px]
//               mb-4
//               font-[600]
//             "
//           >
//             From Blog
//           </h2>

//           <Swiper
//             slidesPerView={1}
//             spaceBetween={12}
//             navigation={true}
//             modules={[Navigation]}
//             breakpoints={{
//               480: {
//                 slidesPerView: 1.5,
//                 spaceBetween: 15,
//               },

//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 18,
//               },

//               768: {
//                 slidesPerView: 2.5,
//                 spaceBetween: 20,
//               },

//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 25,
//               },

//               1280: {
//                 slidesPerView: 4,
//                 spaceBetween: 30,
//               },
//             }}
//             className="blogSlider"
//           >
//             {blogData?.map((blog) => (
//               <SwiperSlide key={blog?._id}>
//                 <BlogItems items={blog} />
//               </SwiperSlide>
//             ))}
//           </Swiper>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;

import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import HomeSlider from "../Components/HomeSlider";
import HomeCatSlider from "../Components/HomeCatSlider";
import AdsBannerSlider from "../Components/AdsBannerSlider";
import ProductsSlider from "../Components/ProductsSlider";
import BlogItems from "../Components/BlogItems";
import BannerBox2 from "../Components/BannerBox2";
import ProductsLoading from "../Components/ProductsLoading";

import { MyContext } from "../App";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const Home = () => {
  const [value, setValue] = useState(0);

  const [productsData, setProductsData] = useState([]);
  const [homeBanners, setHomeBanners] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [adsBanners, setAdsBanners] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const context = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ================= HOME BANNERS =================
  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`${API_URL}/api/homeBanner/getallhomebanners`)
      .then((res) => {
        setHomeBanners(res?.data?.homeBanner || []);
      })
      .catch((err) => {
        console.log("Home Banner Error:", err);
      });
  }, []);

  // ================= LATEST PRODUCTS =================
  useEffect(() => {
    axios
      .get(`${API_URL}/api/product/getallproduct`)
      .then((res) => {
        setLatestProducts(res?.data?.product || []);
      })
      .catch((err) => {
        console.log("Latest Product Error:", err);
      });
  }, []);

  // ================= FEATURED PRODUCTS =================
  useEffect(() => {
    axios
      .get(`${API_URL}/api/product/getFeatureProducts`)
      .then((res) => {
        setFeaturedProducts(res?.data?.products || []);
      })
      .catch((err) => {
        console.log("Featured Product Error:", err);
      });
  }, []);

  // ================= DEFAULT CATEGORY PRODUCTS =================
  useEffect(() => {
    if (!context?.catData?.length) return;

    const catId = context.catData[0]?._id;

    if (!catId) return;

    axios
      .get(`${API_URL}/api/product/getproductbycat/${catId}`)
      .then((res) => {
        setProductsData(res?.data?.product || []);
      })
      .catch((err) => {
        console.log("Category Product Error:", err);
      });
  }, [context?.catData]);

  // ================= FILTER CATEGORY =================
  const filterByCatId = (id) => {
    if (!id) return;

    axios
      .get(`${API_URL}/api/product/getproductbycat/${id}`)
      .then((res) => {
        setProductsData(res?.data?.product || []);
      })
      .catch((err) => {
        console.log("Filter Error:", err);
      });
  };

  // ================= AD BANNERS =================
  useEffect(() => {
    axios
      .get(`${API_URL}/api/adHomeBanner/getalladbanners`)
      .then((res) => {
        setAdsBanners(res?.data?.adBanner || []);
      })
      .catch((err) => {
        console.log("Ad Banner Error:", err);
      });
  }, []);

  // ================= BLOG =================
  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog/get`)
      .then((res) => {
        setBlogData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log("Blog Error:", err);
      });
  }, []);

  const text = `
    We are the leading florist in Dubai, UAE, offering a wide range of
    fresh flowers and cakes for delivery. Our expert florists create
    stunning arrangements for all occasions, ensuring timely delivery
    across the city. Whether it's a birthday, anniversary, or any
    special event, we provide exquisite floral designs and delicious
    cakes to make your moments memorable.
  `;

  return (
    <>
    <PageTitle  title="Teyyar Cake in Dubai"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
   
    <main className="w-full bg-[#fffafa] overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="w-full pt-3 sm:pt-5 lg:pt-7">
        <div className="container">

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-[2fr_1fr]
            gap-3
            sm:gap-4
          ">

            {/* MAIN HERO */}
            <div className="
              w-full
              overflow-hidden
              rounded-xl
              sm:rounded-2xl
              shadow-sm
            ">
              {homeBanners?.length > 0 && (
                <HomeSlider homeBanners={homeBanners} />
              )}
            </div>

            {/* SIDE BANNERS */}
            <div className="
              grid
              grid-cols-2
              lg:grid-cols-1
              gap-3
              sm:gap-4
            ">

              <BannerBox2
                info="left"
                image={homeBanners[0]?.images}
              />

              <BannerBox2
                info="right"
                image={homeBanners[1]?.images}
              />

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}
      {context?.catData?.length > 0 && (
        <section className="
          bg-white
          mt-4
          sm:mt-6
          lg:mt-8
          py-4
          sm:py-6
          border-y
          border-[#f3e5e7]
        ">
          <div className="container">

            <div className="text-center mb-3 sm:mb-5">
              <p className="
                text-[#d94667]
                uppercase
                tracking-[2px]
                text-[10px]
                sm:text-xs
                font-semibold
              ">
                Shop by category
              </p>

              <h2 className="
                text-[#242124]
                text-[20px]
                sm:text-[24px]
                lg:text-[28px]
                font-bold
                mt-1
              ">
                Find Something Special
              </h2>
            </div>

            <HomeCatSlider catData={context.catData} />

          </div>
        </section>
      )}


      {/* =====================================================
          POPULAR PRODUCTS
      ===================================================== */}
      <section className="
        bg-white
        py-7
        sm:py-10
        lg:py-12
      ">
        <div className="container">

          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-4
            mb-5
          ">

            {/* TITLE */}
            <div>
              <p className="
                text-[#d94667]
                text-[11px]
                sm:text-xs
                uppercase
                tracking-[2px]
                font-semibold
              ">
                Our collection
              </p>

              <h2 className="
                text-[#242124]
                text-[22px]
                sm:text-[26px]
                lg:text-[30px]
                font-bold
                mt-1
              ">
                Popular Products
              </h2>

              <div className="
                w-12
                h-[3px]
                bg-[#d94667]
                rounded-full
                mt-2
              " />
            </div>

            {/* CATEGORY TABS */}
            <div className="
              w-full
              lg:w-auto
              max-w-full
              overflow-hidden
              bg-[#fff7f8]
              rounded-xl
              px-1
            ">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="product categories"
                sx={{
                  minHeight: "42px",

                  "& .MuiTabs-indicator": {
                    backgroundColor: "#d94667",
                    height: "3px",
                    borderRadius: "10px",
                  },

                  "& .MuiTab-root": {
                    color: "#777",
                    minWidth: "auto",
                    padding: "8px 12px",
                    fontSize: "13px",
                    textTransform: "none",
                    fontWeight: 500,
                  },

                  "& .Mui-selected": {
                    color: "#d94667 !important",
                    fontWeight: 600,
                  },
                }}
              >
                {context?.catData?.map((cat) => (
                  <Tab
                    key={cat?._id}
                    label={cat?.name}
                    onClick={() => filterByCatId(cat?._id)}
                  />
                ))}
              </Tabs>
            </div>

          </div>

          {/* PRODUCTS */}
          {productsData?.length === 0 && (
            <ProductsLoading />
          )}

          {productsData?.length > 0 && (
            <ProductsSlider
              items={6}
              data={productsData}
            />
          )}

        </div>
      </section>


      {/* =====================================================
          SEO CONTENT
      ===================================================== */}
      <section className="
        bg-[#fff5f6]
        py-7
        sm:py-10
      ">
        <div className="container">

          <div className="
            relative
            overflow-hidden
            rounded-2xl
            bg-white
            border
            border-[#f2dfe2]
            shadow-sm
            px-4
            py-6
            sm:px-7
            sm:py-8
            lg:px-10
          ">

            {/* Decorative Circle */}
            <div className="
              absolute
              -top-14
              -right-14
              w-32
              h-32
              rounded-full
              bg-[#fde3e8]
              opacity-70
            " />

            <div className="relative text-center max-w-4xl mx-auto">

              <p className="
                text-[#d94667]
                uppercase
                tracking-[2px]
                text-[10px]
                sm:text-xs
                font-semibold
                mb-2
              ">
                Dubai's trusted florist
              </p>

              <h1 className="
                text-[#242124]
                text-[19px]
                sm:text-[24px]
                lg:text-[28px]
                font-bold
                leading-tight
              ">
                Leading Florist for Cake and Flower
                Delivery in Dubai, UAE
              </h1>

              <p className="
                text-[#6b6467]
                text-[13px]
                sm:text-[14px]
                lg:text-[15px]
                leading-6
                mt-3
              ">
                {isExpanded
                  ? text
                  : text.substring(0, 220) + "..."}
              </p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="
                  mt-3
                  text-[#d94667]
                  font-semibold
                  text-[13px]
                  hover:text-[#b92f50]
                  transition
                "
              >
                {isExpanded ? "Show Less ↑" : "Read More →"}
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          AD BANNERS
      ===================================================== */}
      {adsBanners?.length > 0 && (
        <section className="bg-white py-6 sm:py-8">
          <div className="container">
            <AdsBannerSlider
              items={4}
              data={adsBanners}
            />
          </div>
        </section>
      )}


      {/* =====================================================
          LATEST PRODUCTS
      ===================================================== */}
      <section className="bg-white py-6 sm:py-9">
        <div className="container">

          <div className="flex items-end justify-between mb-5">

            <div>
              <p className="
                text-[#d94667]
                uppercase
                tracking-[2px]
                text-[10px]
                sm:text-xs
                font-semibold
              ">
                Just arrived
              </p>

              <h2 className="
                text-[#242124]
                text-[21px]
                sm:text-[25px]
                lg:text-[28px]
                font-bold
                mt-1
              ">
                Latest Products
              </h2>
            </div>

          </div>

          {latestProducts?.length === 0 && (
            <ProductsLoading />
          )}

          {latestProducts?.length > 0 && (
            <ProductsSlider
              items={6}
              data={latestProducts}
            />
          )}

        </div>
      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}
      <section className="
        bg-[#fffafa]
        py-6
        sm:py-9
      ">
        <div className="container">

          <div className="mb-5">
            <p className="
              text-[#d94667]
              uppercase
              tracking-[2px]
              text-[10px]
              sm:text-xs
              font-semibold
            ">
              Handpicked for you
            </p>

            <h2 className="
              text-[#242124]
              text-[21px]
              sm:text-[25px]
              lg:text-[28px]
              font-bold
              mt-1
            ">
              Featured Products
            </h2>

            <div className="
              w-12
              h-[3px]
              bg-[#d94667]
              rounded-full
              mt-2
            " />
          </div>

          {featuredProducts?.length === 0 && (
            <ProductsLoading />
          )}

          {featuredProducts?.length > 0 && (
            <ProductsSlider
              items={6}
              data={featuredProducts}
            />
          )}

        </div>
      </section>


      {/* =====================================================
          FEATURED AD
      ===================================================== */}
      <section className="bg-white py-5 sm:py-7">
        <div className="container">
          <AdsBannerSlider items={3} />
        </div>
      </section>


      {/* =====================================================
          BLOG
      ===================================================== */}
      {/* <section className="
        bg-white
        py-7
        sm:py-10
        blogSection
      ">
        <div className="container">

          <div className="
            flex
            items-end
            justify-between
            mb-5
          ">

            <div>
              <p className="
                text-[#d94667]
                uppercase
                tracking-[2px]
                text-[10px]
                sm:text-xs
                font-semibold
              ">
                Inspiration & ideas
              </p>

              <h2 className="
                text-[#242124]
                text-[21px]
                sm:text-[25px]
                lg:text-[28px]
                font-bold
                mt-1
              ">
                From Our Blog
              </h2>

              <div className="
                w-12
                h-[3px]
                bg-[#d94667]
                rounded-full
                mt-2
              " />
            </div>

          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              480: {
                slidesPerView: 1.3,
                spaceBetween: 15,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },

              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className="blogSlider"
          >
            {blogData?.map((blog) => (
              <SwiperSlide key={blog?._id}>
                <BlogItems items={blog} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section> */}

    </main>
     </>
  );
};

export default Home;