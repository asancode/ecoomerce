// import React from "react";
// import { useContext } from "react";
// import { MyContext } from "../../App";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { IconButton } from "@mui/material";

// const ITEM_HEIGHT = 48;

// const AddressBox = (props) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const context = useContext(MyContext);
//   const removeAddress = (id) => {
//     setAnchorEl(null);
//     props.removeAddress(id);
//   };
//   const editAddress = (id) => {
//     setAnchorEl(null);
//     context.setOpenAddAddress(true);
//     context.setAddressMode("edit")
//     context.setAddressId(id)
//     // props.editAddress(id);
//   };
//   return (
//     <div
//       key={props?.item._id} // ✅ Fix 11: key add kiya
//       className="addressBox group relative p-5 border border-dashed border-gray-500 w-full bg-[#f1f1f1] rounded-md cursor-pointer"
//     >
//       <span className="inline-block py-1 px-2 rounded-lg bg-gray-300">
//         {props?.item?.addressType}
//       </span>
//       <h4 className="pt-2 font-semibold flex items-center gap-3">
//         <span>{context?.userDetails?.data?.name}</span>
//         <span>+{props?.item?.mobile}</span>
//       </h4>
//       <span className="block w-100 pt-0">
//         {/* ✅ Fix 12: Comma separator add kiya */}
//         {[
//           props.item?.address_line1,
//           props.item?.city,
//           props.item?.state,
//           props.item?.pincode,
//           props.item?.country,
//         ]
//           .filter(Boolean)
//           .join(", ")}
//       </span>
//       <div className="absolute top-[20px] right-[20px]">
//         <IconButton
//           aria-label="more"
//           id="long-button"
//           aria-controls={open ? "long-menu" : undefined}
//           aria-expanded={open}
//           aria-haspopup="true"
//           onClick={handleClick}
//         >
//           <HiOutlineDotsVertical />
//         </IconButton>
//         <Menu
//           id="long-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           slotProps={{
//             paper: {
//               style: {
//                 maxHeight: ITEM_HEIGHT * 4.5,
//                 width: "20ch",
//               },
//             },
//             list: {
//               "aria-labelledby": "long-button",
//             },
//           }}
//         >
//           <MenuItem onClick={() => editAddress(props?.item?._id)}>
//             Edit
//           </MenuItem>
//           <MenuItem onClick={() => removeAddress(props?.item?._id)}>
//             Delete
//           </MenuItem>
//         </Menu>
//       </div>
//     </div>
//   );
// };

// export default AddressBox;
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IconButton } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
const API_URL = import.meta.env.VITE_API_URL;
const ITEM_HEIGHT = 48;

const AddressBox = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const context = useContext(MyContext);
  const removeAddress = (id) => {
    setAnchorEl(null);
    props.removeAddress(id);
  };
  const editAddress = (id) => {
    setAnchorEl(null);
    context.setOpenAddAddress(true);
    context.setAddressMode("edit");
    context.setAddressId(id);
  };

  const hasLocation =
    props?.item?.latitude != null && props?.item?.longitude != null;

  return (
    // ✅ RESPONSIVE FIX: menu button used to be absolutely positioned at a
    // fixed pixel offset that overlapped long addresses on narrow screens.
    // Switched to a flex row so it sits beside the content instead.
    <div className="addressBox group relative p-4 sm:p-5 border border-dashed border-gray-500 w-full bg-[#f1f1f1] rounded-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-block py-1 px-2 rounded-lg bg-gray-300 text-[13px]">
            {props?.item?.addressType}
          </span>
          <h4 className="pt-2 font-semibold flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{context?.userDetails?.data?.name}</span>
            <span>+{props?.item?.mobile}</span>
          </h4>
          <span className="block pt-0 text-[14px] text-gray-700 break-words">
            {[
              props.item?.address_line1,
              props.item?.city,
              props.item?.state,
              props.item?.pincode,
              props.item?.country,
            ]
              .filter(Boolean)
              .join(", ")}
          </span>

          {hasLocation ? (
            <span className="text-[12px] text-emerald-600 flex items-center gap-1 mt-1">
              <BsCheckCircleFill /> Location saved
            </span>
          ) : (
            <span className="text-[12px] text-amber-600 mt-1 block">
              No location saved — edit to add one
            </span>
          )}
        </div>

        <div className="shrink-0">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <HiOutlineDotsVertical />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              },
              list: {
                "aria-labelledby": "long-button",
              },
            }}
          >
            <MenuItem onClick={() => editAddress(props?.item?._id)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => removeAddress(props?.item?._id)}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default AddressBox;