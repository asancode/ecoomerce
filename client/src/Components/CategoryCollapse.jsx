// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import { FaRegSquarePlus, FaSquareMinus } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// const CategoryCollapse = (props) => {
// const [submenuIndex, setSubmenuIndex] = useState(null);
//   const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
//       const openSubmenu = (index) => {
//     if (submenuIndex === index) {
//       setSubmenuIndex(null);
//     } else {
//       setSubmenuIndex(index);
//     }
//   };
//   const openInnerSubmenu = (index) => {
//     if (innerSubmenuIndex === index) {
//       setInnerSubmenuIndex(null);
//     } else {
//       setInnerSubmenuIndex(index);
//     }
//   };
//   return (
//    <div className="scroll">
//         <ul className=" w-full">
//           {
//                     props?.data?.length !== 0 && props?.data?.map((item, index) => {
//                       return (
//           <li className="list-none flex items-center relative flex-col">
//             <Link to={`/category/${item?.slug}`} className="w-full">
//               <Button className="w-full !text-left !justify-start !text-[rgba(0,0,0.8)]">
//                 {item?.name}
//               </Button>
//             </Link>
//             {submenuIndex === index ? (
//               <FaSquareMinus
//                 className=" absolute top-[10px] right-[15px] cursor-pointer"
//                 onClick={() => openSubmenu(index)}
//               />
//             ) : (
//               <FaRegSquarePlus
//                 className=" absolute top-[10px] right-[15px] cursor-pointer"
//                 onClick={() => openSubmenu(index)}
//               />
//             )}
//             {submenuIndex === index && (
//                     <ul className="inner_submenu  w-full pl-4 ">
//                       {item?.products?.length !== 0 && item?.products?.map((product, index) => {
//                         return( <li className="list-none relative mb-1">
//                         <Link
//                           to={`/product/${product?.slug}`}
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           {product?.name}
//                         </Link>
//                       </li>)
                     
//                       })}
//                       {/* <li className="list-none relative mb-1">
//                         <Link
//                           to="/crepe-t-shirt"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Crepe T-Shirt
//                         </Link>
                        
//                       </li>
//                       <li className="list-none relative mb-1">
//                         <Link
//                           to="/leather-watch"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Leather Watch
//                         </Link>
                        
//                       </li>
//                       <li className="list-none relative mb-1">
//                         <Link
//                           to="/rolling-diamond"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Rolling Diamond
//                         </Link>
                        
//                       </li> */}
//                     </ul>
//                   )}
//             {/* {submenuIndex === index && (
//               <ul className="submenu  w-full pl-3 ">
//                 {item?.products?.length !== 0 && item?.products?.map((product, index) => {
//                   return(
//                 <li className="list-none relative">
//                   <Link to="/">
//                     <Button className="w-full !text-left !justify-start !text-[rgba(0,0,0.8)]">
//                       {product?.name}
//                     </Button>
//                   </Link>
//                   {innerSubmenuIndex === index ? (
//                     <FaSquareMinus
//                       className=" absolute top-[10px] right-[15px] cursor-pointer"
//                       onClick={() => openInnerSubmenu(index)}
//                     />
//                   ) : (
//                     <FaRegSquarePlus
//                       className=" absolute top-[10px] right-[15px] cursor-pointer"
//                       onClick={() => openInnerSubmenu(index)}
//                     />
//                   )}

                  
//                 </li>
//                   )
//                 })}
//               </ul>
//             )} */}
//           </li>
//                       )})}
//           {/* <li className="list-none flex items-center relative flex-col">
//             <Link to="/" className="w-full">
//               <Button className="w-full !text-left !justify-start !text-[rgba(0,0,0.8)]">
//                 OuterWear
//               </Button>
//             </Link>
//             {submenuIndex === 1 ? (
//               <FaSquareMinus
//                 className=" absolute top-[10px] right-[15px] cursor-pointer"
//                 onClick={() => openSubmenu(1)}
//               />
//             ) : (
//               <FaRegSquarePlus
//                 className=" absolute top-[10px] right-[15px] cursor-pointer"
//                 onClick={() => openSubmenu(1)}
//               />
//             )}

//             {submenuIndex === 1 && (
//               <ul className="submenu  w-full pl-3 ">
//                 <li className="list-none relative">
//                   <Link to="/">
//                     <Button className="w-full !text-left !justify-start !text-[rgba(0,0,0.8)]">
//                       Apparel
//                     </Button>
//                   </Link>
//                   {innerSubmenuIndex === 1 ? (
//                     <FaSquareMinus
//                       className=" absolute top-[10px] right-[15px] cursor-pointer"
//                       onClick={() => openInnerSubmenu(1)}
//                     />
//                   ) : (
//                     <FaRegSquarePlus
//                       className=" absolute top-[10px] right-[15px] cursor-pointer"
//                       onClick={() => openInnerSubmenu(1)}
//                     />
//                   )}

//                   {innerSubmenuIndex === 1 && (
//                     <ul className="inner_submenu  w-full pl-4 ">
//                       <li className="list-none relative mb-1">
//                         <Link
//                           to="/smart-tablet"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Smart Tablet
//                         </Link>
//                       </li>
//                       <li className="list-none relative mb-1">
//                         <Link
//                           to="/crepe-t-shirt"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Crepe T-Shirt
//                         </Link>
//                       </li>
//                       <li className="list-none relative mb-1">
//                         <Link
//                           to="/leather-watch"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Leather Watch
//                         </Link>
                      
//                       </li>
//                       <li className="list-none relative mb-1">
//                         <Link
//                           to="/rolling-diamond"
//                           className="w-full !text-left !justify-start !text-[#292929] hover:!text-gray-500 transition text-[15px]"
//                         >
//                           Rolling Diamond
//                         </Link>
                       
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             )}
//           </li> */}
//         </ul>
//       </div>
//   )
// }

// export default CategoryCollapse
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaChevronDown } from "react-icons/fa6";

// const CategoryCollapse = ({ data = [] }) => {
//   const [submenuIndex, setSubmenuIndex] = useState(null);
//   const location = useLocation();

//   const openSubmenu = (index) => {
//     setSubmenuIndex((prev) => (prev === index ? null : index));
//   };

//   if (!Array.isArray(data) || data.length === 0) {
//     return (
//       <div className="px-4 py-10 text-center">
//         <p className="text-sm text-slate-400">
//           No categories available.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-3 sm:px-4 pb-4">
//       <ul className="w-full space-y-1.5">
//         {data.map((item, index) => {
//           const isOpen = submenuIndex === index;

//           const products = Array.isArray(item?.products)
//             ? item.products
//             : [];

//           const categoryPath = `/category/${item?.slug}`;

//           const isActiveCategory =
//             location.pathname === categoryPath ||
//             location.pathname.startsWith(`${categoryPath}/`);

//           return (
//             <li key={item?._id || item?.slug || index} className="w-full">
//               {/* ================= CATEGORY ================= */}
//               <div
//                 className={`
//                   group relative flex items-center w-full
//                   rounded-xl transition-all duration-200
//                   ${
//                     isActiveCategory || isOpen
//                       ? "bg-slate-100"
//                       : "bg-transparent hover:bg-slate-50"
//                   }
//                 `}
//               >
//                 {/* Category Link */}
//                 <Link
//                   to={categoryPath}
//                   className="flex items-center flex-1 min-w-0 px-3.5 sm:px-4 py-3"
//                 >
//                   {/* Category Indicator */}
//                   <span
//                     className={`
//                       w-1.5 h-1.5 rounded-full mr-3 shrink-0
//                       transition-all duration-200
//                       ${
//                         isActiveCategory || isOpen
//                           ? "bg-indigo-600 scale-125"
//                           : "bg-slate-300 group-hover:bg-indigo-400"
//                       }
//                     `}
//                   />

//                   {/* Category Name */}
//                   <span
//                     className={`
//                       text-sm sm:text-[15px] font-medium truncate
//                       transition-colors duration-200
//                       ${
//                         isActiveCategory || isOpen
//                           ? "text-slate-900"
//                           : "text-slate-700 group-hover:text-slate-900"
//                       }
//                     `}
//                   >
//                     {item?.name || "Unnamed Category"}
//                   </span>
//                 </Link>

//                 {/* Expand Button */}
//                 {products.length > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => openSubmenu(index)}
//                     aria-label={
//                       isOpen
//                         ? `Collapse ${item?.name}`
//                         : `Expand ${item?.name}`
//                     }
//                     aria-expanded={isOpen}
//                     className="
//                       w-10 h-10 mr-1.5
//                       rounded-lg
//                       flex items-center justify-center
//                       text-slate-400
//                       hover:text-indigo-600
//                       hover:bg-white
//                       transition-all duration-200
//                       shrink-0
//                     "
//                   >
//                     <FaChevronDown
//                       className={`
//                         text-[11px]
//                         transition-transform duration-300
//                         ${isOpen ? "rotate-180 text-indigo-600" : ""}
//                       `}
//                     />
//                   </button>
//                 )}
//               </div>

//               {/* ================= PRODUCTS ================= */}
//               <div
//                 className={`
//                   grid transition-all duration-300 ease-in-out
//                   ${
//                     isOpen
//                       ? "grid-rows-[1fr] opacity-100"
//                       : "grid-rows-[0fr] opacity-0"
//                   }
//                 `}
//               >
//                 <div className="overflow-hidden">
//                   <ul
//                     className="
//                       ml-4 sm:ml-5
//                       pl-4
//                       mt-1.5
//                       mb-2
//                       border-l-2 border-slate-100
//                       space-y-0.5
//                     "
//                   >
//                     {products.map((product, productIndex) => {
//                       const productPath = `/product/${product?.slug}`;

//                       const isActiveProduct =
//                         location.pathname === productPath;

//                       return (
//                         <li
//                           key={
//                             product?._id ||
//                             product?.slug ||
//                             productIndex
//                           }
//                         >
//                           <Link
//                             to={productPath}
//                             className={`
//                               group/product
//                               flex items-center
//                               w-full
//                               px-3
//                               py-2.5
//                               rounded-lg
//                               text-[13px] sm:text-[14px]
//                               transition-all duration-200
//                               ${
//                                 isActiveProduct
//                                   ? "bg-indigo-50 text-indigo-600 font-semibold"
//                                   : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
//                               }
//                             `}
//                           >
//                             {/* Product Dot */}
//                             <span
//                               className={`
//                                 w-1.5 h-1.5
//                                 rounded-full
//                                 mr-2.5
//                                 shrink-0
//                                 transition
//                                 ${
//                                   isActiveProduct
//                                     ? "bg-indigo-600"
//                                     : "bg-slate-300 group-hover/product:bg-indigo-400"
//                                 }
//                               `}
//                             />

//                             {/* Product Name */}
//                             <span className="truncate">
//                               {product?.name || "Unnamed Product"}
//                             </span>

//                             {/* Arrow */}
//                             <span
//                               className="
//                                 ml-auto
//                                 opacity-0
//                                 -translate-x-1
//                                 group-hover/product:opacity-100
//                                 group-hover/product:translate-x-0
//                                 transition-all duration-200
//                                 text-indigo-500
//                               "
//                             >
//                               →
//                             </span>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default CategoryCollapse;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaArrowRight } from "react-icons/fa6";
const API_URL = import.meta.env.VITE_API_URL
const CategoryCollapse = ({ data = [] }) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const location = useLocation();

  const openSubmenu = (index) => {
    setSubmenuIndex((prev) => (prev === index ? null : index));
  };

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full px-4 py-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <span className="text-xl text-slate-400">📦</span>
        </div>

        <p className="text-sm font-medium text-slate-500">
          No categories available
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-2.5 sm:px-3 md:px-4 pb-5">
      <ul className="w-full space-y-1.5">
        {data.map((item, index) => {
          const products = Array.isArray(item?.products)
            ? item.products
            : [];

          const isOpen = submenuIndex === index;

          const categorySlug = item?.slug || "";

          const categoryPath = `/category/${categorySlug}`;

          const isActiveCategory =
            location.pathname === categoryPath ||
            location.pathname.startsWith(`${categoryPath}/`);

          return (
            <li
              key={item?._id || item?.slug || index}
              className="w-full"
            >
              {/* =====================================================
                  CATEGORY ROW
              ====================================================== */}
              <div
                className={`
                  group relative
                  flex w-full items-center
                  overflow-hidden
                  rounded-xl
                  border
                  transition-all duration-200
                  ${
                    isActiveCategory || isOpen
                      ? "border-indigo-100 bg-indigo-50/70 shadow-sm"
                      : "border-transparent bg-transparent hover:border-slate-100 hover:bg-slate-50"
                  }
                `}
              >
                {/* Active left indicator */}
                <span
                  className={`
                    absolute left-0 top-1/2
                    -translate-y-1/2
                    w-[3px]
                    rounded-r-full
                    transition-all duration-200
                    ${
                      isActiveCategory || isOpen
                        ? "h-7 bg-indigo-600"
                        : "h-0 bg-transparent"
                    }
                  `}
                />

                {/* =================================================
                    CATEGORY LINK
                ================================================== */}
                <Link
                  to={categoryPath}
                  className="
                    flex min-w-0 flex-1
                    items-center
                    px-3
                    py-3
                    sm:px-3.5
                    sm:py-3.5
                    md:px-4
                  "
                >
                  {/* Category dot */}
                  <span
                    className={`
                      mr-3
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      transition-all duration-200
                      ${
                        isActiveCategory || isOpen
                          ? "scale-110 bg-indigo-600"
                          : "bg-slate-300 group-hover:bg-indigo-400"
                      }
                    `}
                  />

                  {/* Category name */}
                  <span
                    className={`
                      min-w-0
                      truncate
                      text-[13px]
                      sm:text-[14px]
                      md:text-[15px]
                      transition-colors duration-200
                      ${
                        isActiveCategory || isOpen
                          ? "font-semibold text-slate-900"
                          : "font-medium text-slate-700 group-hover:text-slate-900"
                      }
                    `}
                  >
                    {item?.name || "Unnamed Category"}
                  </span>

               
                </Link>

                {/* =================================================
                    EXPAND BUTTON
                ================================================== */}
                {products.length > 0 && (
                  <button
                    type="button"
                    onClick={() => openSubmenu(index)}
                    aria-label={
                      isOpen
                        ? `Collapse ${item?.name || "category"}`
                        : `Expand ${item?.name || "category"}`
                    }
                    aria-expanded={isOpen}
                    className="
                      mr-1.5
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-400
                      transition-all duration-200
                      hover:bg-white
                      hover:text-indigo-600
                      active:scale-95
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FaChevronDown
                      className={`
                        text-[10px]
                        sm:text-[11px]
                        transition-transform duration-300
                        ${
                          isOpen
                            ? "rotate-180 text-indigo-600"
                            : "rotate-0"
                        }
                      `}
                    />
                  </button>
                )}
              </div>

              {/* =====================================================
                  PRODUCT SUBMENU
              ====================================================== */}
              <div
                className={`
                  grid
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="overflow-hidden">
                  <ul
                    className="
                      relative
                      ml-4
                      mt-1
                      space-y-1
                      border-l
                      border-slate-200
                      pl-3
                      sm:ml-5
                      sm:pl-4
                    "
                  >
                    {products.length > 0 ? (
                      products.map((product, productIndex) => {
                        const productSlug = product?.slug || "";

                        const productPath = `/product/${productSlug}`;

                        const isActiveProduct =
                          location.pathname === productPath;

                        return (
                          <li
                            key={
                              product?._id ||
                              product?.slug ||
                              productIndex
                            }
                          >
                            <Link
                              to={productPath}
                              className={`
                                group/product
                                flex
                                min-h-[42px]
                                w-full
                                items-center
                                rounded-lg
                                px-2.5
                                py-2
                                text-[12.5px]
                                sm:min-h-[44px]
                                sm:px-3
                                sm:text-[13.5px]
                                md:text-[14px]
                                transition-all duration-200
                                ${
                                  isActiveProduct
                                    ? "bg-indigo-50 font-semibold text-indigo-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                                }
                              `}
                            >
                              {/* Product dot */}
                              <span
                                className={`
                                  mr-2.5
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  transition-all duration-200
                                  ${
                                    isActiveProduct
                                      ? "scale-125 bg-indigo-600"
                                      : "bg-slate-300 group-hover/product:bg-indigo-400"
                                  }
                                `}
                              />

                              {/* Product name */}
                              <span className="min-w-0 flex-1 truncate">
                                {product?.name || "Unnamed Product"}
                              </span>

                              {/* Arrow */}
                              <FaArrowRight
                                className={`
                                  ml-2
                                  shrink-0
                                  text-[9px]
                                  transition-all duration-200
                                  ${
                                    isActiveProduct
                                      ? "translate-x-0 text-indigo-600 opacity-100"
                                      : "translate-x-[-4px] text-indigo-500 opacity-0 group-hover/product:translate-x-0 group-hover/product:opacity-100"
                                  }
                                `}
                              />
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-3 py-3 text-xs text-slate-400">
                        No products available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryCollapse;