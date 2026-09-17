import { Button } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FaAngleDown, FaAngleUp, FaRegHeart } from "react-icons/fa";
import { MyContext } from "../App";

const OtyBox = (props) => {
  const plusQty = () => {
    props.setQuantity(props.quantity + 1);
  };
  const minusQty = () => {
    if (props.quantity === 1) {
      props.setQuantity(1);
    } else {
      props.setQuantity(props.quantity - 1);
    }
  };

  return (
    <div className="qtyBox flex items-center relative">
      <input
        type="number"
        className="w-full h-[40px] text-[17px] rounded-md p-2 pl-5 focus:outline-none border border-gray-400"
        value={props.quantity}
      />

      <div className="flex items-center flex-col absolute right-0 z-50">
        <Button
          className="!min-w-[25px]  !text-gray-500 w-[25px] h-[20px] !border"
          onClick={plusQty}
        >
          <FaAngleUp className="text-[14px] opacity-65" />
        </Button>
        <Button
          className="!min-w-[25px] !text-gray-500 w-[25px] h-[20px]"
          onClick={minusQty}
        >
          <FaAngleDown className="text-[14px] opacity-65" />
        </Button>
      </div>
    </div>
  );
};

export default OtyBox;
