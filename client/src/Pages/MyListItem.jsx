// import {
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   Rating,
// } from "@mui/material";
// import React, { useState } from "react";
// import { GoTriangleDown } from "react-icons/go";
// import { IoCloseSharp } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import axios from "axios";
// import { useContext } from "react";
// import { MyContext } from "../App";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import OtyBox from "../Components/OtyBox";
// import { useEffect } from "react";
// import { motion } from "framer-motion";

// const MyListItem = (props) => {
//   const context = useContext(MyContext);
//   const removeItem = (id) => {
//     const token = localStorage.getItem("accessToken");
//     axios
//       .delete(`http://localhost:5000/api/my-list/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         context.openAlertBox("success", "Product Removed From Cart");
//         context.getMyListData();
//       });
//   };
//   return (
//     <div>
//       <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-gray-300">
//         <div className="img w-[15%] rounded-md overflow-hidden">
//           <Link to={"/product/7845"} className="group">
//             <img
//               src={props?.data?.image}
//               className="w-full group-hover:scale-105 transition-all"
//             />
//           </Link>
//         </div>
//         <div className="info w-[85%] relative">
//           <IoCloseSharp
//             className="cursor-pointer absolute top-[3px] right-[15px] text-[22px] hover:text-gray-400"
//             onClick={() => removeItem(props?.data?._id)}
//           />
//           <span className="text-[13px] text-gray-600 hover:text-gray-400 cursor-pointer">
//             {props?.data?.catName}
//           </span>
//           <h3 className="text-[15px] text-gray-600 font-semibold hover:text-gray-500">
//             <Link>{props?.data?.productTitle}</Link>
//           </h3>
//           <Rating
//             name="size-small"
//             defaultValue={props?.data?.rating}
//             size="small"
//             readOnly
//           />
//           <div className="flex items-center gap-4 mt-2">
//             <span className="oldPrice text-[13px] text-gray-800 font-semibold">
//               AED : {props?.data?.price}
//             </span>
//             {/* <span className="oldPrice text-[13px] text-gray-500 font-semibold line-through">
//               AED 50.00
//             </span>
//             <span className="oldPrice text-[13px] text-gray-500 font-semibold">
//               {" "}
//               10 % OFF */}
//             {/* </span> */}
//           </div>
//           <br />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyListItem;
import { Rating } from "@mui/material";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../App";
const API_URL = import.meta.env.VITE_API_URL
const MyListItem = (props) => {
  const context = useContext(MyContext);
  const removeItem = (id) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`${API_URL}/api/my-list/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        context.openAlertBox("success", "Product Removed From Cart");
        context.getMyListData();
      })
      .catch((error) => {
        context.openAlertBox(
          "error",
          error?.response?.data?.message || "Could not remove item",
        );
      });
  };

  // ✅ FIX: the image link and the title link both pointed to a hardcoded
  // "/product/7845" (or nowhere at all for the title), so every item in
  // the list opened the same one product regardless of which item was
  // clicked. Now uses this item's own product id.
  const productLink = `/product/${
    props?.data?.productId || props?.data?._id
  }`;

  return (
    <div>
      {/* ✅ RESPONSIVE FIX: fixed w-[15%]/w-[85%] split badly on narrow
          screens (image squeezed to almost nothing). Stacks on mobile. */}
      <div className="cartItem w-full p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-gray-300">
        <div className="img w-full sm:w-[15%] max-w-[140px] rounded-md overflow-hidden">
          <Link to={productLink} className="group block">
            <img
              src={props?.data?.image}
              alt={props?.data?.productTitle || "Product"}
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>
        <div className="info w-full sm:w-[85%] relative">
          <IoCloseSharp
            className="cursor-pointer absolute top-[3px] right-0 sm:right-[15px] text-[22px] hover:text-gray-400"
            onClick={() => removeItem(props?.data?._id)}
          />
          <span className="text-[13px] text-gray-600 hover:text-gray-400 cursor-pointer">
            {props?.data?.catName}
          </span>
          <h3 className="text-[15px] text-gray-600 font-semibold hover:text-gray-500 pr-6">
            <Link to={productLink}>{props?.data?.productTitle}</Link>
          </h3>
          <Rating
            name="size-small"
            defaultValue={props?.data?.rating}
            size="small"
            readOnly
          />
          <div className="flex items-center gap-4 mt-2">
            <span className="oldPrice text-[13px] text-gray-800 font-semibold">
              AED : {props?.data?.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyListItem;