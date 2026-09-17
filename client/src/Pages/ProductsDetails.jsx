// import { Breadcrumbs, Button } from "@mui/material";
// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import ProductsZoom from "../Components/productsZoom";
// import Rating from "@mui/material/Rating";
// import QtyBox from "../Components/OtyBox";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa";
// import { IoGitCompareOutline } from "react-icons/io5";
// import TextField from "@mui/material/TextField";
// import ProductsSlider from "../Components/ProductsSlider";
// import ProductsDetailsComponents from "../Components/ProductsDetailsComponents";
// import { useEffect } from "react";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import Review from "./Review";
// import { useRef } from "react";

// const ProductsDetails = () => {
//   const [productData, setProductData] = useState({});
//   const [activeTab, setActiveTab] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [reviewsCount, setReviewsCount] = useState(0);
//   const [relatedProductsData, setRelatedProductsData] = useState([]);
//   const { id } = useParams();
//   const reviewSec = useRef();
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/user/get-reviews/${id}`)
//       .then((res) => {
//         if (res?.error !== false) {
//           setReviewsCount(res?.data?.reviews?.length);
//         }
//       });
//   }, [reviewsCount]);
//   useEffect(() => {
//     setIsLoading(true);
//   }, []);
//   // useEffect(() => {
//   //   setIsLoading(true);
//   //   axios.get(`http://localhost:5000/api/product/${id}`).then((res) => {
//   //     setProductData(res.data.product);
//   //     setTimeout(() => {
//   //       setIsLoading(false);
//   //     }, 1000);
//   //   });
//   //   window.scrollTo(0, 0);
//   // }, [id]);
//   useEffect(() => {
//     if (!id) return; // ✅ id check karo

//     setIsLoading(true);

//     axios
//       .get(`http://localhost:5000/api/product/${id}`)
//       .then((res) => {
//         if (res?.error !== false) {
//           // ✅ Sahi condition
//           setProductData(res.data.product);
//           // ✅ category._id use karo, category nahi
//           const categoryId =
//             res?.data?.product?.category?._id || res?.data?.product?.category; // ✅ Dono case handle karo

//           // ✅ Related products fetch karo
//           axios
//             .get(
//               `http://localhost:5000/api/product/getproductbycat/${categoryId}`,
//             )
//             .then((res) => {
//               if (res?.error !== false) {
//                 // ✅ Sahi condition
//                 const filteredData = res.data.product.filter(
//                   (item) => item.slug !== id,
//                 ); // ✅ Current product exclude karo
//                 setRelatedProductsData(filteredData);
//               }
//             });
//         }

//         setTimeout(() => setIsLoading(false), 1000); // ✅ Andar rakha
//       })
//       .catch((err) => {
//         console.error("Product fetch error:", err); // ✅ Error handle
//         setIsLoading(false); // ✅ Error pe bhi loading band karo
//       });

//     window.scrollTo(0, 0);
//   }, [id]);
//   const gotoReviews = () => {
//     window.scrollTo({
//       top: reviewSec.current.offsetTop - 170,
//       behavior: "smooth",
//     });
//     setActiveTab(1);
//   };
//   return (
//     <>
//       <div className="py-5 bg-white">
//         <div className="container">
//           <div className="bg-gray-200 rounded-md py-1 px-1 w-[100%] text-gray-400">
//             <Breadcrumbs aria-label="breadcrumb">
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 href="/"
//                 className="hover:!text-black transition"
//               >
//                 Home
//               </Link>
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 href={`/product-list/${productData?.catId?._id}`}
//                 className="hover:!text-black transition"
//               >
//                 {productData?.catName}
//               </Link>
//               <div
//                 color="inherit"
//                 className="hover:!text-black transition cursor-pointer"
//               >
//                 {productData?.name}
//               </div>
//               {/* <Typography sx={{ color: 'text.primary' }}>Fashion</Typography> */}
//             </Breadcrumbs>
//           </div>
//         </div>
//       </div>
//       <section className="bg-white py-4">
//         {isLoading === true ? (
//           <div className="flex items-center justify-center">
//             <CircularProgress />
//           </div>
//         ) : (
//           <>
//             <div className="container flex gap-8">
//               <div className="productZoomContainer w-[35%]">
//                 <ProductsZoom images={productData?.images} />
//               </div>
//               <div className="productContent w-[65%] pr-10">
//                 <ProductsDetailsComponents
//                   data={productData}
//                   reviewsCount={reviewsCount}
//                   gotoReviews={gotoReviews}
//                 />
//               </div>
//             </div>
//             <div className="container pt-10">
//               <div className="flex items-center gap-8 mb-5">
//                 <span
//                   className={`text-gray-600 hover:text-gray-400 text-[17px] cursor-pointer font-semibold ${activeTab === 0 && "text-gray-300"}`}
//                   onClick={() => setActiveTab(0)}
//                 >
//                   Description
//                 </span>
//                 <span
//                   className={`text-gray-600 hover:text-gray-400 text-[17px] cursor-pointer font-semibold ${activeTab === 1 && "text-gray-300"}`}
//                   onClick={() => setActiveTab(1)}
//                   ref={reviewSec}
//                 >
//                   Review ({reviewsCount})
//                 </span>
//               </div>
//               {activeTab === 0 && (
//                 <div className=" shadow-md w-full py-5 px-8 rounded-md">
//                   {productData?.description}
//                 </div>
//               )}
//               {activeTab === 1 && (
//                 <div className=" shadow-md w-[80%] py-5 px-8 rounded-md">
//                   {productData?.length !== 0 && (
//                     <Review
//                       productId={productData._id}
//                       setReviewsCount={setReviewsCount}
//                     />
//                   )}
//                 </div>
//               )}
//             </div>
//             {relatedProductsData?.length !== 0 && (
//               <div className="container pt-8">
//                 <h2 className="text-[20px] font-[600] pb-0">
//                   Related Products
//                 </h2>
//                 <ProductsSlider items={6} data={relatedProductsData} />
//               </div>
//             )}
//           </>
//         )}
//       </section>
//     </>
//   );
// };

// export default ProductsDetails;
import React, { useEffect, useRef, useState } from "react";
import { Breadcrumbs } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import ProductsZoom from "../Components/productsZoom";
import ProductsSlider from "../Components/ProductsSlider";
import ProductsDetailsComponents from "../Components/ProductsDetailsComponents";
import Review from "./Review";

import { FiHome, FiChevronRight } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import PageTitle from "../Components/PageTitle";

const API_URL = import.meta.env.VITE_API_URL;

const ProductsDetails = () => {
  const [productData, setProductData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProductsData, setRelatedProductsData] = useState([]);

  const { id } = useParams();
  // const { slug } = useParams();

  const reviewSec = useRef(null);

  // =====================================================
  // FETCH REVIEWS COUNT
  // =====================================================

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/get-reviews/${id}`);

        if (res?.data) {
          setReviewsCount(res?.data?.reviews?.length || 0);
        }
      } catch (error) {
        console.error("Reviews fetch error:", error);
        setReviewsCount(0);
      }
    };

    fetchReviews();
  }, [id]);

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/api/product/${id}`);

        const product = res?.data?.product;

        if (!product) {
          setProductData({});
          setRelatedProductsData([]);
          return;
        }

        setProductData(product);

        // -----------------------------------------------
        // CATEGORY ID
        // -----------------------------------------------

        const categoryId =
          product?.category?._id || product?.category || product?.catId?._id;

        // -----------------------------------------------
        // RELATED PRODUCTS
        // -----------------------------------------------

        if (categoryId) {
          try {
            const relatedRes = await axios.get(
              `${API_URL}/product/getproductbycat/${categoryId}`,
            );

            const relatedProducts = relatedRes?.data?.product || [];

            const filteredProducts = relatedProducts.filter(
              (item) =>
                item?._id !== product?._id && item?.slug !== product?.slug,
            );

            setRelatedProductsData(filteredProducts);
          } catch (error) {
            console.error("Related products error:", error);

            setRelatedProductsData([]);
          }
        } else {
          setRelatedProductsData([]);
        }
      } catch (error) {
        console.error("Product fetch error:", error);

        setProductData({});
        setRelatedProductsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // =====================================================
  // GO TO REVIEWS
  // =====================================================

  const gotoReviews = () => {
    setActiveTab(1);

    setTimeout(() => {
      if (reviewSec.current) {
        const top =
          reviewSec.current.getBoundingClientRect().top + window.scrollY - 130;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <section className="min-h-[70vh] bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CircularProgress
              size={32}
              thickness={4}
              sx={{
                color: "#16a34a",
              }}
            />
          </div>

          <p className="text-sm font-medium text-gray-500">
            Loading product...
          </p>
        </div>
      </section>
    );
  }

  // =====================================================
  // EMPTY PRODUCT
  // =====================================================

  if (!productData || Object.keys(productData).length === 0) {
    return (
      <section className="min-h-[60vh] bg-[#f8fafc] px-4 py-16">
        <div className="container mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              Product Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sorry, this product is currently unavailable.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageTitle
        title={productData.seo.metaTitle}
        description={productData.seo.metametaDescription?.slice(0, 155)}
        keywords={`${productData.seo.keywords}, buy ${productData.seo.keywords}`}
      />
      <section className="min-h-screen bg-[#f8fafc] overflow-x-hidden">
        {/* =================================================
          BREADCRUMB
      ================================================== */}

        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
            <div
              className="
              inline-flex
              max-w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              px-3
              py-2
            "
            >
              <Breadcrumbs
                separator={<FiChevronRight className="text-gray-400" />}
                aria-label="breadcrumb"
                className="!text-xs sm:!text-sm"
              >
                {/* HOME */}

                <Link
                  to="/"
                  className="
                  flex
                  items-center
                  gap-1.5
                  !text-gray-500
                  hover:!text-[#16a34a]
                  transition
                  font-medium
                  no-underline
                "
                >
                  <FiHome className="text-sm" />
                  Home
                </Link>

                {/* CATEGORY */}

                {/* <Link
                // to={`/category/${
                //   productData?.slug
                //   // productData?.catId?._id ||
                //   // productData?.category?._id ||
                //   // ""
                // }`}
                to={`/category/${productData.slug}`}
                className="
                  !text-gray-500
                  hover:!text-[#16a34a]
                  transition
                  capitalize
                  font-medium
                  no-underline
                  max-w-[120px]
                  sm:max-w-[200px]
                  truncate
                "
              >
                {productData?.catName ||
                  // productData?.category?.name ||
                  "Products"}
              </Link> */}
                <Link
                  to={`/category/${productData?.category?.slug || ""}`}
                  className="
    !text-gray-500
    hover:!text-[#16a34a]
    transition
    capitalize
    font-medium
    no-underline
    max-w-[120px]
    sm:max-w-[200px]
    truncate
  "
                >
                  {productData?.category?.name ||
                    productData?.catName ||
                    "Products"}
                </Link>
                {/* PRODUCT */}

                <span
                  className="
                  !text-gray-900
                  font-semibold
                  capitalize
                  max-w-[140px]
                  sm:max-w-[250px]
                  truncate
                "
                >
                  {productData?.name}
                </span>
              </Breadcrumbs>
            </div>
          </div>
        </div>

        {/* =================================================
          MAIN PRODUCT SECTION
      ================================================== */}

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-5 sm:py-7 lg:py-10">
          <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-[40%_60%]
            gap-6
            lg:gap-8
            xl:gap-10
          "
          >
            {/* =================================================
              PRODUCT IMAGE
          ================================================== */}

            <div className="min-w-0">
              <div
                className="
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-200
                bg-white
                p-3
                sm:p-5
                shadow-sm
                lg:sticky
                lg:top-[110px]
              "
              >
                <ProductsZoom images={productData?.images || []} />
              </div>
            </div>

            {/* =================================================
              PRODUCT DETAILS
          ================================================== */}

            <div className="min-w-0">
              <div
                className="
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-200
                bg-white
                p-4
                sm:p-6
                lg:p-7
                shadow-sm
              "
              >
                <ProductsDetailsComponents
                  data={productData}
                  reviewsCount={reviewsCount}
                  gotoReviews={gotoReviews}
                />
              </div>
            </div>
          </div>

          {/* =================================================
            DESCRIPTION / REVIEWS
        ================================================== */}

          <div
            className="
            mt-6
            sm:mt-8
            lg:mt-10
            rounded-2xl
            sm:rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
            overflow-hidden
          "
          >
            {/* TABS */}

            <div
              className="
              flex
              overflow-x-auto
              border-b
              border-gray-200
              scrollbar-none
            "
            >
              {/* DESCRIPTION TAB */}

              <button
                type="button"
                onClick={() => setActiveTab(0)}
                className={`
                relative
                flex
                min-w-fit
                items-center
                gap-2
                px-4
                sm:px-6
                py-4
                text-sm
                sm:text-base
                font-semibold
                transition
                ${
                  activeTab === 0
                    ? "text-[#d94667]"
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
              >
                <MdOutlineDescription className="text-lg" />
                Description
                {activeTab === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#d94667]" />
                )}
              </button>

              {/* REVIEW TAB */}

              <button
                type="button"
                ref={reviewSec}
                onClick={() => setActiveTab(1)}
                className={`
                relative
                flex
                min-w-fit
                items-center
                gap-2
                px-4
                sm:px-6
                py-4
                text-sm
                sm:text-base
                font-semibold
                transition
                ${
                  activeTab === 1
                    ? "text-[#d94667]"
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
              >
                <FaRegStar className="text-base" />
                Reviews
                <span
                  className="
                  rounded-full
                  bg-gray-100
                  px-2
                  py-0.5
                  text-xs
                  font-bold
                  text-gray-600
                "
                >
                  {reviewsCount}
                </span>
                {activeTab === 1 && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#d94667]" />
                )}
              </button>
            </div>

            {/* TAB CONTENT */}

            <div className="p-4 sm:p-6 lg:p-8">
              {/* DESCRIPTION */}

              {activeTab === 0 && (
                <div>
                  <h2 className="mb-4 text-lg sm:text-xl font-bold text-gray-900">
                    Product Description
                  </h2>

                  <div
                    className="
                    rounded-xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-4
                    sm:p-6
                    text-sm
                    sm:text-base
                    leading-7
                    text-gray-600
                    whitespace-pre-line
                  "
                  >
                    {productData?.description ||
                      "No description available for this product."}
                  </div>
                </div>
              )}

              {/* REVIEWS */}

              {activeTab === 1 && (
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Customer Reviews
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      See what our customers are saying about this product.
                    </p>
                  </div>

                  <div
                    className="
                    rounded-xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-4
                    sm:p-6
                  "
                  >
                    <Review
                      productId={productData?._id}
                      setReviewsCount={setReviewsCount}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
            RELATED PRODUCTS
        ================================================== */}

          {relatedProductsData?.length > 0 && (
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <div className="mb-4 sm:mb-6 flex items-end justify-between gap-3">
                <div>
                  <p className="mb-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#16a34a]">
                    You may also like
                  </p>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Related Products
                  </h2>
                </div>
              </div>

              <div
                className="
                rounded-2xl
                sm:rounded-3xl
                border
                border-gray-200
                bg-white
                p-3
                sm:p-5
                shadow-sm
              "
              >
                <ProductsSlider items={6} data={relatedProductsData} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductsDetails;
