import { Rating } from "@mui/material";
import React, { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Item from "antd/es/list/Item";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../App";
const API_URL = import.meta.env.VITE_API_URL
const CartItems = (props) => {
  const [step, setStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [qtyanchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.qty);
  const openQty = Boolean(qtyanchorEl);
  const context = useContext(MyContext);
  const variationEntries = Object.entries(props?.data?.variation || {});

  //   // ✅ CartItems component ke andar, return se pehle add karo
  // const extraCost = Object.values(props?.data?.variation || {})
  //   .flat()
  //   .reduce((acc, opt) => acc + (Number(opt?.price) || 0), 0);
  const handleClickSize = (event, groupIndex) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuIndex(groupIndex);
  };
  const handleCloseSize = (title, item) => {
    if (title && item) {
      setSelectedSize((prev) => ({
        ...prev,
        [title]: item,
      }));
    }
    setAnchorEl(null);
    setOpenMenuIndex(null);
  };
  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget); // ✅ event.currentTarget
  };

  const handleCloseQty = (num) => {
    if (num !== null) {
      setSelectedQty(num); // ✅ Selected qty store karo
    }
    setQtyAnchorEl(null); // ✅ Menu band karo
  };
  const removeItem = (id) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`${API_URL}/api/cart/delete-cart-item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        context.openAlertBox("success", "Product Removed From Cart");
        context.getCartItems();
      });
  };
  // console.log(props?.data)
  const goNext = () => {
    if (step === 1 && !validateAddress()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const subTotal =
    context?.cartData?.data?.length !== 0
      ? context?.cartData?.data
          ?.map((item) => {
            const variationPrice = Object.values(item?.variation || {})
              .flat()
              .reduce((acc, opt) => acc + (opt?.price || 0), 0);
            return (item.price + variationPrice) * item.quantity;
          })
          .reduce((total, value) => total + value, 0)
      : 0;

  const tax = parseFloat((subTotal * 0.05).toFixed(2)); // ✅ 5% VAT
  const total = subTotal + tax;

  return (
    <div>
      <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-gray-300">
        <div className="img w-[15%] rounded-md overflow-hidden">
          <Link
            to={`/products/${props?.data?.slug || props?.data?._id}`}
            className="group"
          >
            <img
              src={props?.data?.image}
              className="w-full group-hover:scale-105 transition-all"
            />
          </Link>
        </div>
        <div className="info w-[85%] relative">
          <IoCloseSharp
            className="cursor-pointer absolute top-[3px] right-[15px] text-[22px] hover:text-gray-400"
            onClick={() => removeItem(props?.data?._id)}
          />
          <span className="text-[13px] text-gray-600 hover:text-gray-400 cursor-pointer">
            {props?.data?.catName}
          </span>
          <h3 className="text-[15px] text-gray-600 font-semibold hover:text-gray-500">
            <Link to={`/products/${props?.data?.slug || props?.data?._id}`}>
              {props?.data?.productTitle}{" "}
            </Link>
          </h3>
          <Rating
            name="size-small"
            defaultValue={props?.data?.rating}
            size="small"
            readOnly
          />
          {variationEntries.length > 0 && (
            <div
              className={`flex mt-2 gap-2 flex-wrap ${
                variationEntries.length > 4
                  ? "flex-col"
                  : "flex-row items-center"
              }`}
            >
              {variationEntries.map(([title, options], groupIndex) => (
                <div key={groupIndex} className="relative">
                  <span className="flex items-center bg-gray-200 text-[11px] sm:text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer gap-1">
                    <span className="text-gray-500">{title}:</span>
                    <span>
                      {selectedSize?.[title]?.name ||
                        options?.[0]?.name ||
                        "Select"}
                    </span>
                    <span className="text-yellow-600">
                      {selectedSize?.[title]
                        ? selectedSize[title].price > 0
                          ? `+AED ${selectedSize[title].price}`
                          : ""
                        : options?.[0]?.price > 0
                          ? `+AED ${options[0].price}`
                          : ""}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 mt-2">
            <div className="relative">
              <span className="flex items-center bg-gray-200 text-[11px] sm:text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer gap-1">
                {" "}
                Qty: <span>{props?.data?.quantity}</span>
              </span>
            </div>
            <span className="oldPrice text-[13px] text-gray-800 font-semibold">
              AED {props?.data?.price}
              {/* AED {(props?.data?.price + extraCost).toFixed(2)} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
