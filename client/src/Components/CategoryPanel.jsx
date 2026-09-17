// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import { IoCloseSharp } from "react-icons/io5";
// import { FaRegSquarePlus, FaSquareMinus } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import CategoryCollapse from "./CategoryCollapse";

// const CategoryPanel = (props) => {
//   const [submenuIndex, setSubmenuIndex] = useState(null);
//   const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
//   const toggleDrawer = (newOpen) => () => {
//     props.setIsOpenCatPanel(newOpen);
//   };
//   const openSubmenu = (index) => {
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

//   const DrawerList = (
//     <Box sx={{ width: 280 }} role="presentation">
//       <h3 className="p-3 text-[16px] font-medium flex items-center justify-between">
//         Shop By Category{" "}
//         <IoCloseSharp
//           onClick={toggleDrawer(false)}
//           className=" cursor-pointer text-[20px]"
//         />
//       </h3>
//       {/* <div className="scroll">
//         <ul className="w-full">
//           <li className="list-none flex items-center relative">
//             <Link to="/" className="w-full">
//               <Button className="w-full !text-left !justify-start !px-3 !text-gray-800">
//                 Fashion
//               </Button>
//             </Link>
//             <FaRegSquarePlus
//               onClick={() => openSubmenu(0)}
//               className=" absolute right-[16px]"
//             />
//             {submenuIndex === 0 && (
//               <>
//                 <ul className="submenu absolute top-[100%] left-[0%] w-full pl-3">
//                   <li className="list-none relative mb-1">
//                     <Link to="/" className="w-full">
//                       <Button className="w-full !text-left !justify-start !px-3 !text-gray-800">
//                         Apparle
//                       </Button>
//                     </Link>
//                     <FaRegSquarePlus className=" absolute top-[10px] right-[16px]" />
//                   </li>
//                 </ul>
//                 <ul className="submenu absolute top-[100%] left-[0%] w-full pl-5">
//                   <li className="list-none relative top-6">
//                     <Link
//                       to="/"
//                       className="hover:text-primary w-full !text-left !justify-start !px-3 transition text-[14px]"
//                     >
//                       Smart Tablet
//                     </Link>
//                   </li>
//                   <li className="list-none relative top-6">
//                     <Link
//                       to="/"
//                       className="hover:text-primary w-full !text-left !justify-start !px-3 transition text-[14px]"
//                     >
//                       Crepe T-Shirt
//                     </Link>
//                   </li>
//                   <li className="list-none relative top-6">
//                     <Link
//                       to="/"
//                       className="hover:text-primary w-full !text-left !justify-start !px-3 transition text-[14px]"
//                     >
//                       Leather Watch
//                     </Link>
//                   </li>
//                   <li className="list-none relative top-6">
//                     <Link
//                       to="/"
//                       className="hover:text-primary w-full !text-left !justify-start !px-3 transition text-[14px]"
//                     >
//                       Rolling Diamond
//                     </Link>
//                   </li>
//                 </ul>
//               </>
//             )}
//           </li>
//         </ul>
//       </div> */}
//       {
//         props?.data?.length !== 0 && <CategoryCollapse data={props?.data} />
        
//       }
      
//     </Box>
//   );
//   return (
//     <div>
//       <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// };

// export default CategoryPanel;
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { IoCloseSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import CategoryCollapse from "./CategoryCollapse";
const API_URL = import.meta.env.VITE_API_URL
const CategoryPanel = (props) => {
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const categories = Array.isArray(props?.data) ? props.data : [];

  const DrawerList = (
    <Box
      role="presentation"
      sx={{
        width: {
          xs: "86vw",
          sm: 360,
          md: 400,
        },
        maxWidth: "420px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="bg-white"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-slate-100 bg-white shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
            <MdCategory className="text-white text-xl sm:text-2xl" />
          </div>

          {/* Heading */}
          <div className="min-w-0">
            <h2 className="text-[16px] sm:text-[17px] font-bold text-slate-900 leading-tight">
              Shop By Category
            </h2>
          </div>
        </div>

        {/* Close */}
        <IconButton
          onClick={toggleDrawer(false)}
          aria-label="Close categories"
          className="!w-9 !h-9 !bg-slate-50 hover:!bg-slate-100 !text-slate-600 transition-all duration-200"
        >
          <IoCloseSharp className="text-[21px]" />
        </IconButton>
      </div>

      {/* =====================================================
          CATEGORY CONTENT
      ====================================================== */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 py-4 custom-category-scroll">
        {categories.length > 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/50 overflow-hidden">
            <CategoryCollapse data={categories} />
          </div>
        ) : (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center px-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <MdCategory className="text-3xl text-slate-300" />
            </div>

            <h3 className="text-[16px] font-semibold text-slate-700">
              No Categories Found
            </h3>

            <p className="text-[13px] text-slate-400 mt-2 max-w-[260px] leading-5">
              Categories are currently unavailable. Please check again later.
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-white shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[12px] sm:text-[13px] text-slate-400">
            Browse products by category
          </span>
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={Boolean(props.isOpenCatPanel)}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          borderRadius: {
            xs: "0 18px 18px 0",
            sm: "0 20px 20px 0",
          },
          overflow: "hidden",
          boxShadow: "8px 0 40px rgba(15, 23, 42, 0.12)",
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;