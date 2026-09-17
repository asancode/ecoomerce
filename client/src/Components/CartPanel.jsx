// import { Button } from "@mui/material";
// import axios from "axios";
// import React from "react";
// import { useContext } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { MyContext } from "../App";

// const CartPanel = (props) => {
//   const context = useContext(MyContext);
//   const removeItem = (id) => {
//     const token = localStorage.getItem("accessToken");
//     axios
//       .delete(`http://localhost:5000/api/cart/delete-cart-item/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         context.openAlertBox("success", res.data.message);
//         context.getCartItems();
//       });
//   };
//   const extraCost = Object.values(props?.data?.variation || {})
//     .flat()
//     .reduce((acc, opt) => acc + (Number(opt?.price) || 0), 0);
//   // ✅ Yeh upar banao JSX se pehle
//   const subTotal =
//     context?.cartData?.data?.length !== 0
//       ? context?.cartData?.data
//           ?.map((item) => {
//             const variationPrice = Object.values(item?.variation || {})
//               .flat()
//               .reduce((acc, opt) => acc + (opt?.price || 0), 0);
//             return (item.price + variationPrice) * item.quantity;
//           })
//           .reduce((total, value) => total + value, 0)
//       : 0;

//   const tax = parseFloat((subTotal * 0.05).toFixed(2)); // ✅ 5% VAT
//   const total = subTotal + tax; // ✅ Tax included total
//   return (
//     <div>
//       <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden px-3 py-4">
//         {props?.data?.map((item, index) => {
//           return (
//             <div className="cartItem w-full flex items-center gap-3 border-b mb-3 border-gray-300 pb-4">
//               <div className="img w-[25%] overflow-hidden h-[80px] rounded-md group">
//                 <img
//                   src={item?.image}
//                   className="w-full group-hover:scale-105"
//                 />
//               </div>
//               <div className="info w-[75%] pr-5 relative pt-3">
//                 <h4 className="text-[14px] font-[500]">
//                   <Link
//                     to={`/products/${item.slug}`}
//                     className="text-gray-600 hover:text-gray-400"
//                   >
//                     {item?.productTitle.substr(0, 40) + "..."}
//                   </Link>
//                 </h4>
//                 <p className="flex items-center gap-5 mt-2 mb-2">
//                   <span className="text-gray-800 cursor-pointer">
//                     Qty : <span>{item?.quantity}</span>
//                   </span>
//                   <span className="text-gray-800 font-[500] cursor-pointer">
//                     Price : AED {item?.price}
//                   </span>
//                 </p>
//                 <RiDeleteBin6Line
//                   className=" absolute right-[10px] top-[10px] text-[20px] text-gray-600 hover:text-gray-400 cursor-pointer transition-all"
//                   onClick={() => removeItem(item?._id)}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <br />

//       <div className="bottomSec pr-5 absolute bottom-[10px] left-[10px] w-full">
//         <div className="bottomInfo py-3 px-4 w-full border-t border-gray-300 flex items-center justify-between flex-col">
//           <div className="flex mb-3 items-center justify-between w-full">
//             <span className="text-[14px] font-semibold">
//               {context?.cartData?.data?.length} Items
//             </span>
//             {(subTotal || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//             {/* {
//               (context?.cartData?.data?.length !== 0 ? context?.cartData?.data?.map(item =>parseInt(item.price+item.variationPrice)* item.quantity).reduce((total,value)=>total + value,0):0)?.toLocaleString('en-US',{style:"currency",currency:"AED"})
//             } */}
//             {/* {
//   (
//     context?.cartData?.data?.length !== 0
//       ? context?.cartData?.data
//           ?.map((item) => {
//             // ✅ variation object se price nikalo
//             const variationPrice = Object.values(item?.variation || {})
//               .flat()
//               .reduce((acc, opt) => acc + (opt?.price || 0), 0);

//             return (item.price + variationPrice) * item.quantity;
//           })
//           .reduce((total, value) => total + value, 0)
//       : 0
//   )?.toLocaleString("en-US", { style: "currency", currency: "AED" })
// } */}
//           </div>
//           <div className="flex mb-3 items-center justify-between w-full">
//             <span className="text-[14px] font-semibold">Tax 5%</span>
//             {tax.toLocaleString("en-US", {
//               style: "currency",
//               currency: "AED",
//             })}
//           </div>
//           <div className="flex items-center justify-between w-full">
//             <span className="text-[14px] font-semibold">Total(tax excl.)</span>
//             {total.toLocaleString("en-US", {
//               style: "currency",
//               currency: "AED",
//             })}
//             {/* {
//   (
//     context?.cartData?.data?.length !== 0
//       ? context?.cartData?.data
//           ?.map((item) => {
//             // ✅ variation object se price nikalo
//             const variationPrice = Object.values(item?.variation || {})
//               .flat()
//               .reduce((acc, opt) => acc + (opt?.price || 0), 0);

//             return (item.price + variationPrice) * item.quantity;
//           })
//           .reduce((total, value) => total + value, 0)
//       : 0
//   )?.toLocaleString("en-US", { style: "currency", currency: "AED" })
// } */}
//           </div>
//         </div>
//         {/* <div className="bottomInfo py-3 px-4 w-full border-t border-gray-300 flex items-center justify-between flex-col">
//           <div className="flex mb-3 items-center justify-between w-full">
//             <span className="text-[14px] font-semibold">Total (tax excl.)</span>
//             <span className="text-gray-600 font-semibold">AED 30.00</span>
//           </div>
//         </div> */}
//         <br />
//         <div className="flex flex-row pl-12 items-center justify-between w-full gap-5">
//           <Link to={"/cart"} className="w-[50%]" onClick={context.toggleCartPanel(false)}>
//             <Button className="!bg-gray-600 !text-white uppercase !text-[14px] !px-6 !py-2 hover:!bg-gray-400  border-none hover:!border-none !font-semibold">
//               View Cart
//             </Button>
//           </Link>
//           <Link to={"/checkout"} className="w-[50%]" onClick={context.toggleCartPanel(false)}>
//             <Button className=" !text-black !border !border-dashed !border-gray-700 !text-[14px] !px-6 !py-2 hover:!bg-gray-600 hover:!text-white hover:!border-none !font-semibold">
//               Checkout
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPanel;
import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MyContext } from "../App";

const API_URL = import.meta.env.VITE_API_URL

const CartPanel = (props) => {
  const context = useContext(MyContext);

  const cartItems = context?.cartData?.data || [];

  // ----------------------------------------
  // Remove item
  // ----------------------------------------
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.delete(
        `${API_URL}/api/cart/delete-cart-item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      context.openAlertBox("success", res.data.message);
      context.getCartItems();
    } catch (error) {
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Unable to remove item."
      );
    }
  };

  // ----------------------------------------
  // Currency formatter
  // ----------------------------------------
  const formatAED = (amount) => {
    return Number(amount || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 2,
    });
  };

  // ----------------------------------------
  // Calculate subtotal
  // ----------------------------------------
  const subTotal =
    cartItems.length > 0
      ? cartItems.reduce((total, item) => {
          const variationPrice = Object.values(item?.variation || {})
            .flat()
            .reduce(
              (acc, option) => acc + (Number(option?.price) || 0),
              0
            );

          const itemPrice =
            (Number(item?.price) || 0) + variationPrice;

          return total + itemPrice * (Number(item?.quantity) || 0);
        }, 0)
      : 0;

  // ----------------------------------------
  // VAT
  // ----------------------------------------
  const tax = Number((subTotal * 0.05).toFixed(2));

  // ----------------------------------------
  // Final total
  // ----------------------------------------
  const total = subTotal + tax;

  return (
    <div className="relative flex h-full w-full flex-col bg-white text-slate-900">

      {/* =====================================
          CART ITEMS
      ====================================== */}
      <div className="reviewScroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-4">

        {cartItems.length > 0 ? (
          <div className="space-y-3">

            {cartItems.map((item, index) => {

              const variationPrice = Object.values(
                item?.variation || {}
              )
                .flat()
                .reduce(
                  (acc, option) =>
                    acc + (Number(option?.price) || 0),
                  0
                );

              const itemPrice =
                (Number(item?.price) || 0) + variationPrice;

              const itemTotal =
                itemPrice * (Number(item?.quantity) || 0);

              return (
                <div
                  key={item?._id || item?.productId || index}
                  className="group relative flex gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:border-slate-300 hover:shadow-sm sm:p-3.5"
                >

                  {/* Product Image */}
                  <Link
                    to={`/products/${item?.slug}`}
                    onClick={() => context.toggleCartPanel(false)}
                    className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-[88px] sm:w-[88px]"
                  >
                    <img
                      src={item?.image || "/placeholder.png"}
                      alt={item?.productTitle || "Product"}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1 pr-7">

                    <Link
                      to={`/products/${item?.slug}`}
                      onClick={() => context.toggleCartPanel(false)}
                      className="block"
                    >
                      <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800 transition-colors hover:text-emerald-600">
                        {item?.productTitle || "Product"}
                      </h3>
                    </Link>

                    {/* Quantity + Price */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">

                      <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">
                        Qty: {item?.quantity || 0}
                      </span>

                      <span>
                        {formatAED(itemPrice)} each
                      </span>

                    </div>

                    {/* Item total */}
                    <p className="mt-2 text-sm font-bold text-slate-900">
                      {formatAED(itemTotal)}
                    </p>

                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    aria-label="Remove product"
                    onClick={() => removeItem(item?._id)}
                    className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
                  >
                    <RiDeleteBin6Line className="text-[18px]" />
                  </button>

                </div>
              );
            })}

          </div>
        ) : (

          /* =====================================
             EMPTY CART
          ====================================== */
          <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <img
                src="/cart.png"
                alt="Empty cart"
                className="h-12 w-12 object-contain opacity-70"
              />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Your Cart is Empty
            </h3>

            <p className="mt-2 max-w-[280px] text-sm leading-5 text-slate-500">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/"
              onClick={() => context.toggleCartPanel(false)}
              className="mt-5"
            >
              <Button
                variant="contained"
                className="!rounded-lg !bg-slate-900 !px-6 !py-2.5 !text-sm !font-semibold !capitalize !text-white !shadow-none hover:!bg-emerald-600"
              >
                Continue Shopping
              </Button>
            </Link>

          </div>
        )}
      </div>

      {/* =====================================
          BOTTOM SUMMARY
      ====================================== */}
      {cartItems.length > 0 && (
        <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white p-4 shadow-[0_-8px_25px_rgba(15,23,42,0.06)] sm:p-5">

          {/* Summary */}
          <div className="space-y-2.5">

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Subtotal
              </span>

              <span className="font-semibold text-slate-800">
                {formatAED(subTotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">
                VAT (5%)
              </span>

              <span className="font-semibold text-slate-800">
                {formatAED(tax)}
              </span>
            </div>

            <div className="my-2 border-t border-dashed border-slate-200" />

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Total
                </p>

                <p className="text-[11px] text-slate-400">
                  Including 5% VAT
                </p>
              </div>

              <span className="text-lg font-bold text-slate-900 sm:text-xl">
                {formatAED(total)}
              </span>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-1">

            {/* <Link
              to="/cart"
              onClick={() => context.toggleCartPanel(false)}
              className="w-full"
            >
              <Button
                fullWidth
                variant="outlined"
                className="!h-11 !rounded-lg !border-slate-300 !text-sm !font-semibold !normal-case !text-slate-700 hover:!border-slate-900 hover:!bg-slate-50"
              >
                View Cart
              </Button>
            </Link> */}

            <Link
              to="/checkout"
              onClick={() => context.toggleCartPanel(false)}
              className="w-full "
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<BsFillBagCheckFill />}
                className="!h-11 !rounded-lg !bg-slate-900 !text-sm !font-semibold !normal-case !text-white !shadow-none hover:!bg-[#93304C]"
              >
                Checkout
              </Button>
            </Link>

          </div>

          {/* Secure Checkout */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <span className="text-emerald-500">●</span>
            Secure & encrypted checkout
          </div>

        </div>
      )}

    </div>
  );
};

export default CartPanel;