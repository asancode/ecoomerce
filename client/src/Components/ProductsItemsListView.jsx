import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "antd";
import { IoCloseCircle, IoCloseSharp, IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../App";
import { motion } from "framer-motion";
import OtyBox from "./OtyBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const ProductsItemsListView = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
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
          [title]: multi
            ? [...current, option]
            : [option], 
        };
      }
    });
  };
    const isSelected = (title, name) => {
      const selected = selectedOptions[title] || [];
      return selected.some((item) => item.name === name);
    };
   
  
    const extraCost = Object.values(selectedOptions).reduce((t, s) => {
      if (Array.isArray(s)) return t + s.reduce((a, o) => a + o.price, 0);
      return t + (s?.price || 0);
    }, 0);
     const handleClose = () => {
      setOpen(false);
    };
  
    const totalPrice = (props?.item?.price + extraCost) * quantity;
  const context = useContext(MyContext);
  return (
    <div className="productItem border border-gray-200 rounded-md overflow-hidden px-2 flex items-center">
      <div className="imgWrapper w-[20%] overflow-hidden relative group">
        <Link to={`/products/${props.item.slug}`}>
          <div className="img rounded-md h-[220px] overflow-hidden">
            <img src={props?.item?.images?.[0]} className="w-full" />
            <img
              src={props?.item?.images?.[1]}
              className="w-full absolute top-0 left-0 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute to-[200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] group-hover:opacity-100">
          <Button className="!w-[48px] !h-[48px] min-w-[48px] !rounded-full !bg-white text-black  !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none">
            <FaRegHeart className="!text-[28px] !text-black group-hover:text-hover  " />
          </Button>
          <Button className="!w-[48px] !h-[48px] min-w-[48px] !rounded-full !bg-white text-black  !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none">
            <IoGitCompareOutline className="!text-[28px] !text-black group-hover:text-hover  " />
          </Button>
          <Button
            className="!w-[48px] !h-[48px] min-w-[48px] !rounded-full !bg-white text-black  !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none"
            onClick={() =>
              context.handleClickOpenProductDetailsModal(true, props?.item)
            }
          >
            <MdZoomOutMap className="!text-[28px] !text-black group-hover:text-hover  " />
          </Button>
        </div>
      </div>
      <div className="info p-3 py-5 px-8 w-[80%]">
        <h6 className="text-[15px]">
          {" "}
          <p className="hover:text-gray-400 transition-all">
            {props?.item?.catName}
          </p>
        </h6>
        <h3 className="text-[19px] mt-2 font-[500] mb-2 text-[rgba(0,0,0,.9)]">
          <Link to={`/products/${props.item.slug}`} className="hover:text-gray-400 transition-all">
            {props?.item?.name}
          </Link>
        </h3>

        <p className="text-[14px] mb-3">
         {props?.item?.description}
        </p>
        <div className="flex items-center gap-4">
          {/* <span className="oldPrice line-through cursor-pointer font-[500]">
            AED 50.00
          </span> */}
          <span className="oldPrice cursor-pointer text-black font-semibold">
            {" "}
            AED {props?.item?.price}
          </span>
        </div>
       <div className="flex items-center">
          <div>

          <Button
            variant="contained"
            className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none !capitalize "
            onClick={handleClickOpen}
          >
            <MdOutlineShoppingCart className="text-[19px]  " /> Add to Cart{" "}
          </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
          >
            <DialogContent>
              <Button className=" !rounded-full !text-gray-600 !border !border-none !absolute top-[15px] right-[20px] !bg-white" onClick={handleClose}>
                <IoCloseSharp className="!text-[30px]" />
              </Button>
              <DialogContentText id="alert-dialog-description">
                <div className="space-y-5 py-3">
                  {props?.item?.variation?.map((variation, vIdx) => (
                    <div key={vIdx}>
                      {/* GROUP HEADER */}
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="font-semibold w-15 flex items-center gap-2 text-[16px] text-gray-800">
                          {" "}
                          {variation.title}
                        </h3>

                        {variation?.required && (
                          <span className="text-[10px] bg-red-100 text-red-500 font-semibold px-2 py-0.5 rounded-full border border-red-200">
                            Required
                          </span>
                        )}

                        {variation?.multi_select && (
                          <span className="text-[10px] bg-blue-100 text-blue-500 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                            Multi-select
                          </span>
                        )}
                      </div>

                      {/* OPTIONS */}
                      <div className="flex items-center gap-3 flex-wrap">
                        {variation?.options?.map((opt, oIdx) => {
                          const selected = isSelected(
                            variation.title,
                            opt.name,
                          );

                          return (
                            <motion.button
                              key={oIdx}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleSelect(
                                  variation.title,
                                  opt,
                                  variation.multi_select,
                                )
                              }
                              className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                selected
                                  ? "bg-black border-black text-white shadow-md"
                                  : "bg-white border-gray-200 text-gray-600 hover:border-black hover:bg-gray-100"
                              }`}
                            >
                              {/* CHECK ICON */}
                              {selected && <span className="text-xs">✔</span>}

                              {/* NAME */}
                              <span>{opt.name}</span>

                              {/* PRICE */}
                              {Number(opt.price) > 0 && (
                                <span
                                  className={`text-[11px] ml-1 ${
                                    selected
                                      ? "text-gray-200"
                                      : "text-yellow-600"
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
                  <div className="border-t border-border pt-6">
                    {/* Quantity + Total */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="qtyBoxWrapper w-[80px]">
                        <OtyBox />
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          Total
                        </span>
                        <p className="text-2xl font-bold text-foreground mt-0.5">
                          AED {totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200"
                    >
                      {" "}
                      <MdOutlineShoppingCart className="text-[19px] " />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductsItemsListView;
