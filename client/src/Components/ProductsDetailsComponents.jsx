// import { Button, CircularProgress, Rating } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { FaRegHeart } from "react-icons/fa6";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import OtyBox from "./OtyBox";
// import { motion } from "framer-motion";
// import { useContext } from "react";
// import { MyContext } from "../App";
// import { useNavigate } from "react-router-dom";

// const ProductsDetailsComponents = (props) => {
//   const [productActionIndex, setProductActionIndex] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [quantity, setQuantity] = useState(1);
//   const context = useContext(MyContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const history = useNavigate();

//   const handleSelect = (title, option, multi) => {
//     setSelectedOptions((prev) => {
//       const current = prev[title] || [];

//       const alreadySelected = current.find((i) => i.name === option.name);

//       if (alreadySelected) {
//         return {
//           ...prev,
//           [title]: current.filter((i) => i.name !== option.name),
//         };
//       } else {
//         return {
//           ...prev,
//           [title]: multi ? [...current, option] : [option],
//         };
//       }
//     });
//   };
//   // const handleSelect = (title, option, multi) => {
//   //   setSelectedOptions((prev) => {
//   //     const existing = prev[title] || [];

//   //     if (multi) {
//   //       const alreadySelected = existing.find(
//   //         (item) => item.name === option.name,
//   //       );

//   //       return {
//   //         ...prev,
//   //         [title]: alreadySelected
//   //           ? existing.filter((item) => item.name !== option.name)
//   //           : [...existing, option],
//   //       };
//   //     } else {
//   //       return {
//   //         ...prev,
//   //         [title]: [option],
//   //       };
//   //     }
//   //   });
//   // };
//   const isSelected = (title, name) => {
//     const selected = selectedOptions[title] || [];
//     return selected.some((item) => item.name === name);
//   };

// // ✅ Yeh add karo - props.data change hone par chalega
// useEffect(() => {
//   if (props?.data?.variation?.length > 0) {
//     const defaultSelections = {};

//     props.data.variation.forEach((variation) => {
//       if (variation?.required && variation?.options?.length > 0) {
//         // ✅ Har variation ka pehla option select karo
//         defaultSelections[variation.title] = [variation.options[0]];
//       }
//     });

//     setSelectedOptions(defaultSelections);
//   }
// }, [props?.data]); // ✅ jab bhi product change ho, reset ho

//   const extraCost = Object.values(selectedOptions).reduce((t, s) => {
//     if (Array.isArray(s)) return t + s.reduce((a, o) => a + o.price, 0);
//     return t + (s?.price || 0);
//   }, 0);
//   const totalPrice = (props?.data?.price + extraCost) * quantity;
//   const addToCart = (product, userId, quantity, selectedOptions) => {
//     setIsLoading(true);
//     context?.addToCart(product, userId, quantity, selectedOptions);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//     history("/cart");
//   };
//   return (
//     <div className="">
//       <h1 className="text-[22px] font-semibold text-gray-700">
//         {props?.data?.name}
//       </h1>
//       <div className="flex items-center gap-4 mt-2">
//         <p className="mt-1 text-md">{props?.data?.catName}</p>
//         <Rating name="size-small" size="small" defaultValue={4} readOnly />
//         <samp
//           className="text-[15px] cursor-pointer"
//           onClick={props.gotoReviews}
//         >
//           Review({props?.reviewsCount})
//         </samp>
//       </div>
//       <p className="text-md mt-2 leading-relaxed text-gray-600">
//         {props?.data?.description}
//       </p>
//       <div className="space-y-5 py-3">
//         {props?.data?.variation?.map((variation, vIdx) => (
//           <div key={vIdx}>
//             {/* GROUP HEADER */}
//             <div className="flex items-center gap-2 mb-3">
//               <h3 className="font-semibold w-15 flex items-center gap-2 text-[16px] text-gray-800">
//                 {" "}
//                 {variation.title}
//               </h3>

//               {variation?.required && (
//                 <span className="text-[10px] bg-red-100 text-red-500 font-semibold px-2 py-0.5 rounded-full border border-red-200">
//                   Required
//                 </span>
//               )}

//               {variation?.multi_select && (
//                 <span className="text-[10px] bg-blue-100 text-blue-500 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
//                   Multi-select
//                 </span>
//               )}
//             </div>

//             {/* OPTIONS */}
//             <div className="flex items-center gap-3 flex-wrap">
//               {variation?.options?.map((opt, oIdx) => {
//                 const selected = isSelected(variation.title, opt.name);

//                 return (
//                   <motion.button
//                     key={oIdx}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() =>
//                       handleSelect(variation.title, opt, variation.multi_select)
//                     }
//                     className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
//                       selected
//                         ? "bg-black border-black text-white shadow-md"
//                         : "bg-white border-gray-200 text-gray-600 hover:border-black hover:bg-gray-100"
//                     }`}
//                   >
//                     {/* CHECK ICON */}
//                     {selected && <span className="text-xs">✔</span>}

//                     {/* NAME */}
//                     <span>{opt.name}</span>

//                     {/* PRICE */}
//                     {Number(opt.price) > 0 && (
//                       <span
//                         className={`text-[11px] ml-1 ${
//                           selected ? "text-gray-200" : "text-yellow-600"
//                         }`}
//                       >
//                         +AED {opt.price}
//                       </span>
//                     )}
//                   </motion.button>
//                 );
//               })}
//             </div>
//           </div>
//         ))}

//         <div className="border-t border-border pt-6">
//           {/* Quantity + Total */}
//           <div className="flex items-center justify-between mb-5">
//             <div className="qtyBoxWrapper w-[80px]">
//               <OtyBox quantity={quantity} setQuantity={setQuantity} />
//             </div>
//             <div className="text-right">
//               <span className="text-sm text-muted-foreground">Total</span>
//               <p className="text-2xl font-bold text-foreground mt-0.5">
//                 AED {totalPrice.toFixed(2)}
//               </p>
//             </div>
//           </div>
//           <Button
//             variant="contained"
//             onClick={() =>
//               addToCart(
//                 props?.data,
//                 context?.userDetails?.data?._id,
//                 quantity,
//                 selectedOptions,
//               )
//             }
//             className="!bg-black w-full !text-white !hover:bg-gray-800 !text-sm !font-medium !py-2.5 !px-4 rounded-lg !transition-colors !duration-200"
//           >
//             {isLoading === true ? (
//               <CircularProgress color="inherit" />
//             ) : (
//               <>
//                 <MdOutlineShoppingCart className="text-[19px] " />
//                 Add to Cart
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsDetailsComponents;
import { Button, CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import OtyBox from "./OtyBox";
import { motion } from "framer-motion";
import { useContext } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const ProductsDetailsComponents = (props) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const handleSelect = (title, option, multi) => {
    setSelectedOptions((prev) => {
      const current = prev[title] || [];
      const alreadySelected = current.find((i) => i.name === option.name);

      if (alreadySelected) {
        return {
          ...prev,
          [title]: current.filter((i) => i.name !== option.name),
        };
      } else {
        return {
          ...prev,
          [title]: multi ? [...current, option] : [option],
        };
      }
    });
  };

  const isSelected = (title, name) => {
    const selected = selectedOptions[title] || [];
    return selected.some((item) => item.name === name);
  };

  useEffect(() => {
    if (props?.data?.variation?.length > 0) {
      const defaultSelections = {};

      props.data.variation.forEach((variation) => {
        if (variation?.required && variation?.options?.length > 0) {
          defaultSelections[variation.title] = [variation.options[0]];
        }
      });

      setSelectedOptions(defaultSelections);
    }
  }, [props?.data]);

  const extraCost = Object.values(selectedOptions).reduce((t, s) => {
    if (Array.isArray(s)) return t + s.reduce((a, o) => a + o.price, 0);
    return t + (s?.price || 0);
  }, 0);
  const totalPrice = (props?.data?.price + extraCost) * quantity;

  // ✅ FIX: "history('/cart')" used to fire immediately, before the
  // setTimeout that turns isLoading off ever ran — so the page navigated
  // away instantly and the loading spinner never had a chance to be seen.
  // Now the navigation happens after the (brief) loading state resolves.
  const addToCart = (product, userId, qty, options) => {
    setIsLoading(true);
    context?.addToCart(product, userId, qty, options);
    setTimeout(() => {
      setIsLoading(false);
      history("/cart");
    }, 500);
  };

  return (
    <div>
      {/* ✅ DESIGN: serif display face for the product name (matches the
          bakery/floral brand identity used across category/sidebar),
          deep espresso ink instead of plain gray. */}
      <h1 className="text-[22px] sm:text-[26px] font-serif font-semibold text-[#2D1B12] leading-snug">
        {props?.data?.name}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
        <p className="text-[14px] text-[#8A7B6E]">{props?.data?.catName}</p>
        <Rating
          name="size-small"
          size="small"
          defaultValue={4}
          readOnly
          sx={{ color: "#C79A4B" }}
        />
        {/* ✅ FIX: this was a <samp> element — meant for sample computer
            output, not an interactive link. Swapped for a real <button>
            so it's keyboard-focusable and reads correctly to screen
            readers, styled in the brand's rose accent. */}
        <button
          type="button"
          onClick={props.gotoReviews}
          className="text-[13px] text-[#B23A5C] font-medium hover:underline"
        >
          Reviews ({props?.reviewsCount || 0})
        </button>
      </div>
      <p className="text-[14px] sm:text-[15px] mt-3 leading-relaxed text-[#5C4B3E]">
        {props?.data?.description}
      </p>
      <div className="space-y-5 py-3">
        {props?.data?.variation?.map((variation, vIdx) => (
          <div
            key={vIdx}
            className="rounded-xl
                        bg-[#fffafa]
                        border
                        border-[#f1e4e6]
                        p-4
                      "
          >
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <h3 className="font-semibold flex items-center gap-2 text-[15px] sm:text-[16px] text-[#2D1B12]">
                {variation.title}
              </h3>

              {variation?.required && (
                <span className="text-[10px] bg-[#B23A5C]/10 text-[#B23A5C] font-semibold px-2 py-0.5 rounded-full border border-[#B23A5C]/20">
                  Required
                </span>
              )}

              {variation?.multi_select && (
                <span className="text-[10px] bg-[#C79A4B]/10 text-[#8A6A2C] font-semibold px-2 py-0.5 rounded-full border border-[#C79A4B]/30">
                  Multi-select
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {variation?.options?.map((opt, oIdx) => {
                const selected = isSelected(variation.title, opt.name);

                return (
                  <motion.button
                    key={oIdx}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleSelect(variation.title, opt, variation.multi_select)
                    }
                    className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-[13px] sm:text-sm font-medium transition-all duration-200 ${
                      selected
                                      ? `
                                        bg-[#d94667]
                                        border-[#d94667]
                                        text-white
                                        shadow-sm
                                      `
                                      : `
                                        bg-white
                                        border-[#eadde0]
                                        text-[#4b4648]
                                        hover:border-[#d94667]
                                        hover:bg-[#fff5f6]
                                      `
                    }`}
                  >
                    {selected && (
                      <span
                        className="
                                        w-5
                                        h-5
                                        rounded-full
                                        bg-white
                                        text-[#d94667]
                                        flex
                                        items-center
                                        justify-center
                                        text-[10px]
                                        font-bold
                                        shrink-0
                                      "
                      >
                        ✔
                      </span>
                    )}
                    <span>{opt.name}</span>
                    {Number(opt.price) > 0 && (
                      <span
                        className={`text-[11px] ml-1 ${
                           selected
                                          ? "text-white"
                                          : "text-[#d94667]"
                        }`}
                      >
                        +AED {opt.price}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="border-t border-[#E9DED2] pt-6">
          <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div className="qtyBoxWrapper w-[90px]">
              <OtyBox quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[13px] text-[#8A7B6E]">Total</span>
              {/* ✅ DESIGN: total price called out in the gold accent —
                  the one clearly "money" moment on the page, distinct
                  from the ink/rose used everywhere else. */}
              <p className="text-2xl   text-[24px]
                        sm:text-[28px]
                        font-bold
                        text-[#d94667] sm:text-3xl mt-0.5">
                AED {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={() =>
              addToCart(
                props?.data,
                context?.userDetails?.data?._id,
                quantity,
                selectedOptions,
              )
            }
            className="!bg-[#B23A5C] hover:!bg-[#93304C] w-full !text-white !text-[14px] sm:!text-sm !font-semibold !py-3 !px-4 !rounded-xl !transition-colors !duration-200 !flex !items-center !justify-center !gap-2"
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" size={22} />
            ) : (
              <>
                <MdOutlineShoppingCart className="text-[19px]" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsComponents;
