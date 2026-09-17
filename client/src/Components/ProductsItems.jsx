// // import React, { useContext, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Button } from "antd";
// // import { IoCloseSharp, IoGitCompareOutline } from "react-icons/io5";
// // import { FaRegHeart } from "react-icons/fa";
// // import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
// // import { MyContext } from "../App";
// // import Dialog from "@mui/material/Dialog";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogContentText from "@mui/material/DialogContentText";
// // import { motion } from "framer-motion";
// // import { useState } from "react";
// // import OtyBox from "./OtyBox";
// // import { CircularProgress } from "@mui/material";
// // import axios from "axios";
// // import { IoMdHeart } from "react-icons/io";

// // const ProductsItems = (props) => {
// //   const [open, setOpen] = useState(false);
// //   const [selectedOptions, setSelectedOptions] = useState({});
// //   const [quantity, setQuantity] = useState(1);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
// //   const history = useNavigate();

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };
// //   const handleSelect = (title, option, multi) => {
// //     setSelectedOptions((prev) => {
// //       const current = prev[title] || [];

// //       const alreadySelected = current.find((i) => i.name === option.name);

// //       if (alreadySelected) {
// //         return {
// //           ...prev,
// //           [title]: current.filter((i) => i.name !== option.name),
// //         };
// //       } else {
// //         return {
// //           ...prev,
// //           [title]: multi ? [...current, option] : [option],
// //         };
// //       }
// //     });
// //   };
// //   const isSelected = (title, name) => {
// //     const selected = selectedOptions[title] || [];
// //     return selected.some((item) => item.name === name);
// //   };
// //   useEffect(() => {
// //     if (props?.item?.variation?.length > 0) {
// //       const defaultSelections = {};

// //       props.item.variation.forEach((variation) => {
// //         if (variation?.required && variation?.options?.length > 0) {
// //           // ✅ Har variation ka pehla option select karo
// //           defaultSelections[variation.title] = [variation.options[0]];
// //         }
// //       });

// //       setSelectedOptions(defaultSelections);
// //     }
// //   }, [props?.item]);
// //   const extraCost = Object.values(selectedOptions).reduce((t, s) => {
// //     if (Array.isArray(s)) return t + s.reduce((a, o) => a + o.price, 0);
// //     return t + (s?.price || 0);
// //   }, 0);
// //   const handleClose = () => {
// //     setOpen(false);
// //   };
// //   const totalPrice = (props?.item?.price + extraCost) * quantity;
// //   const context = useContext(MyContext);
// //   const addToCart = (product, userId, quantity, selectedOptions) => {
// //     setIsLoading(true);
// //     context?.addToCart(product, userId, quantity, selectedOptions);
// //     setTimeout(() => {
// //       setIsLoading(false);
// //     }, 1000);
// //     history("/cart");
// //   };
// //   const handleAddToMyList = (item) => {
// //     if (context.userDetails === null) {
// //       context.openAlertBox("error", "You are not Login please login first");
// //       return false;
// //     } else {
// //       const obj = {
// //         productId: item?._id,
// //         userId: context?.userDetails?.data?._id,
// //         productTitle: item?.name,
// //         image: item?.images[0],
// //         rating: item?.rating,
// //         price: item?.price,
// //         catName: item?.catName,
// //         slug: item?.slug,
// //         variation:item?.variation,
// //       };
// //       const token = localStorage.getItem("accessToken");
// //       axios
// //         .post(`http://localhost:5000/api/my-list/add`, obj, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         })
// //         .then((res) => {
// //           if (res?.data?.error !== true) {
// //             context.openAlertBox("success", res?.data?.message);
// //             setIsAddedInMyList(true);
// //             context.getMyListData();
// //           } else {
// //             context.openAlertBox("error", res?.data?.message);
// //           }
// //         })
// //         .catch((err) => {
// //           context.openAlertBox(
// //             "error",
// //             err?.response?.data?.message || "Something went wrong!",
// //           ); // ✅ catch add kiya
// //         });
// //     }
// //   };
// //   useEffect(() => {
// //     //   const myListItem = context?.myListData?.filter((item)=>
// //     //   item.productId.includes(props?.item?._id)
// //     //   )
// //     //   if (myListItem?.length!==0) {
// //     //     setIsAddedInMyList(true)
// //     //   }else{
// //     //     setIsAddedInMyList(false)
// //     //   }
// //     // },[context?.cartData])
// //     if (!Array.isArray(context?.myListData)) return;

// //     const myListItem = context?.myListData?.filter(
// //       (item) => item?.productId === props?.item?._id, // ✅ includes() → === use karo
// //     );
// //     if (myListItem?.length !== 0) {
// //       setIsAddedInMyList(true);
// //     } else {
// //       setIsAddedInMyList(false);
// //     }
// //   }, [context?.myListData]);

// //   return (
// //     <div className="productItem border border-gray-200 rounded-md overflow-hidden">
// //       <div className="imgWrapper w-[100%] overflow-hidden relative group">
// //         <Link to={`products/${props.item?.slug}`}>
// //           <div className="img h-[220px] overflow-hidden ">
// //             <img src={props?.item?.images?.[0]} className="w-full" />
// //             <img
// //               src={props?.item?.images?.[1]}
// //               className="w-full absolute top-0 left-0 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
// //             />
// //           </div>
// //         </Link>
// //         <div className="absolute to-[200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] group-hover:opacity-100">
// //           <Button
// //             onClick={() => handleAddToMyList(props?.item)}
// //             className="!w-[48px] !h-[48px] min-w-[48px] !rounded-full !bg-white text-black  !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none"
// //           >
// //             {isAddedInMyList ? (
// //               <IoMdHeart className="!text-[28px] text-blue-400 group-hover:text-black hover:text-black" />
// //             ) : (
// //               <FaRegHeart className="!text-[28px] !text-black group-hover:text-gray-500 hover:text-gray-400" />
// //             )}
// //           </Button>
// //           <Button className="!w-[48px] !h-[48px] min-w-[48px] !rounded-full !bg-white text-black  !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none">
// //             <IoGitCompareOutline className="!text-[28px] !text-black group-hover:text-hover  " />
// //           </Button>
// //           <Button
// //             className="!w-[48px] !h-[48px] min-w-[48px] !rounded-full !bg-white text-black  !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none"
// //             onClick={() =>
// //               context.handleClickOpenProductDetailsModal(true, props?.item)
// //             }
// //           >
// //             <MdZoomOutMap className="!text-[28px] !text-black group-hover:text-hover  " />
// //           </Button>
// //         </div>
// //       </div>
// //       <div className="info p-3 ">
// //         <h3 className="px-2 text-[16px] font-[500] mb-2 text-[rgba(0,0,0,.9)]">
// //           <Link
// //             to={`products/${props.item?.slug}`}
// //             className="hover:text-gray-400 transition-all"
// //           >
// //             {props.item?.name}
// //           </Link>
// //         </h3>
// //         <div className="flex px-2 items-center gap-4">
// //           <span className="oldPrice text-black">AED {props.item?.price}</span>
// //         </div>
// //         <div className="flex items-center">
// //           <div>
// //             <Button
// //               variant="contained"
// //               className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none !capitalize "
// //               onClick={handleClickOpen}
// //             >
// //               <MdOutlineShoppingCart className="text-[19px]  " /> Add to
// //               Cart{" "}
// //             </Button>
// //           </div>
// //           <Dialog
// //             open={open}
// //             onClose={handleClose}
// //             aria-labelledby="alert-dialog-title"
// //             aria-describedby="alert-dialog-description"
// //             role="alertdialog"
// //           >
// //             <DialogContent>
// //               <Button
// //                 className=" !rounded-full !text-gray-600 !border !border-none !absolute top-[15px] right-[20px] !bg-white"
// //                 onClick={handleClose}
// //               >
// //                 <IoCloseSharp className="!text-[30px]" />
// //               </Button>
// //               <DialogContentText id="alert-dialog-description">
// //                 <div className="space-y-5 py-3">
// //                   {props?.item?.variation?.map((variation, vIdx) => (
// //                     <div key={vIdx}>
// //                       {/* GROUP HEADER */}
// //                       <div className="flex items-center gap-2 mb-3">
// //                         <h3 className="font-semibold w-15 flex items-center gap-2 text-[16px] text-gray-800">
// //                           {" "}
// //                           {variation.title}
// //                         </h3>

// //                         {variation?.required && (
// //                           <span className="text-[10px] bg-red-100 text-red-500 font-semibold px-2 py-0.5 rounded-full border border-red-200">
// //                             Required
// //                           </span>
// //                         )}

// //                         {variation?.multi_select && (
// //                           <span className="text-[10px] bg-blue-100 text-blue-500 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
// //                             Multi-select
// //                           </span>
// //                         )}
// //                       </div>

// //                       {/* OPTIONS */}
// //                       <div className="flex items-center gap-3 flex-wrap">
// //                         {variation?.options?.map((opt, oIdx) => {
// //                           const selected = isSelected(
// //                             variation.title,
// //                             opt.name,
// //                           );

// //                           return (
// //                             <motion.button
// //                               key={oIdx}
// //                               whileTap={{ scale: 0.95 }}
// //                               onClick={() =>
// //                                 handleSelect(
// //                                   variation.title,
// //                                   opt,
// //                                   variation.multi_select,
// //                                 )
// //                               }
// //                               className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
// //                                 selected
// //                                   ? "bg-black border-black text-white shadow-md"
// //                                   : "bg-white border-gray-200 text-gray-600 hover:border-black hover:bg-gray-100"
// //                               }`}
// //                             >
// //                               {/* CHECK ICON */}
// //                               {selected && <span className="text-xs">✔</span>}

// //                               {/* NAME */}
// //                               <span>{opt.name}</span>

// //                               {/* PRICE */}
// //                               {Number(opt.price) > 0 && (
// //                                 <span
// //                                   className={`text-[11px] ml-1 ${
// //                                     selected
// //                                       ? "text-gray-200"
// //                                       : "text-yellow-600"
// //                                   }`}
// //                                 >
// //                                   +AED {opt.price}
// //                                 </span>
// //                               )}
// //                             </motion.button>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   ))}
// //                   <div className="border-t border-border pt-6">
// //                     {/* Quantity + Total */}
// //                     <div className="flex items-center justify-between mb-5">
// //                       <div className="qtyBoxWrapper w-[80px]">
// //                         <OtyBox quantity={quantity} setQuantity={setQuantity} />
// //                       </div>
// //                       <div className="text-right">
// //                         <span className="text-sm text-muted-foreground">
// //                           Total
// //                         </span>
// //                         <p className="text-2xl font-bold text-foreground mt-0.5">
// //                           AED {totalPrice.toFixed(2)}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     {/* <Link to={"/cart"}> */}
// //                     <Button
// //                       variant="contained"
// //                       className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200"
// //                       onClick={() =>
// //                         addToCart(
// //                           props?.item,
// //                           context?.userDetails?.data?._id,
// //                           quantity,
// //                           selectedOptions,
// //                         )
// //                       }
// //                     >
// //                       {" "}
// //                       {isLoading === true ? (
// //                         <CircularProgress color="inherit" />
// //                       ) : (
// //                         <>
// //                           <MdOutlineShoppingCart className="text-[19px] icon " />
// //                           Add to Cart
// //                         </>
// //                       )}
// //                     </Button>
// //                     {/* </Link> */}
// //                   </div>
// //                 </div>
// //               </DialogContentText>
// //             </DialogContent>
// //           </Dialog>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductsItems;
// import React, { useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "antd";
// import { IoCloseSharp, IoGitCompareOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa";
// import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
// import { MyContext } from "../App";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import OtyBox from "./OtyBox";
// import { CircularProgress } from "@mui/material";
// import axios from "axios";
// import { IoMdHeart } from "react-icons/io";

// const ProductsItems = (props) => {
//   const [open, setOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAddedInMyList, setIsAddedInMyList] = useState(false);
//   const history = useNavigate();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
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
//   const isSelected = (title, name) => {
//     const selected = selectedOptions[title] || [];
//     return selected.some((item) => item.name === name);
//   };

//   useEffect(() => {
//     if (props?.item?.variation?.length > 0) {
//       const defaultSelections = {};
//       props.item.variation.forEach((variation) => {
//         if (variation?.required && variation?.options?.length > 0) {
//           defaultSelections[variation.title] = [variation.options[0]];
//         }
//       });
//       setSelectedOptions(defaultSelections);
//     }
//   }, [props?.item]);

//   const extraCost = Object.values(selectedOptions).reduce((t, s) => {
//     if (Array.isArray(s)) return t + s.reduce((a, o) => a + o.price, 0);
//     return t + (s?.price || 0);
//   }, 0);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const totalPrice = (props?.item?.price + extraCost) * quantity;
//   const context = useContext(MyContext);

//   const addToCart = (product, userId, qty, options) => {
//     setIsLoading(true);
//     context?.addToCart(product, userId, qty, options);
//     setTimeout(() => {
//       setIsLoading(false);
//       history("/cart");
//     }, 1000);
//   };

//   const handleAddToMyList = (item) => {
//     if (context.userDetails === null) {
//       context.openAlertBox("error", "You are not Login please login first");
//       return false;
//     } else {
//       const obj = {
//         productId: item?._id,
//         userId: context?.userDetails?.data?._id,
//         productTitle: item?.name,
//         // ✅ FIX: "item?.images[0]" — the "?." only guarded `item`, not
//         // `images`. If a product had no images array, this threw
//         // "Cannot read properties of undefined (reading '0')" and broke
//         // the whole "add to my list" click.
//         image: item?.images?.[0] || "",
//         rating: item?.rating,
//         price: item?.price,
//         catName: item?.catName,
//         slug: item?.slug,
//         variation: item?.variation,
//       };
//       const token = localStorage.getItem("accessToken");
//       axios
//         .post(`http://localhost:5000/api/my-list/add`, obj, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           if (res?.data?.error !== true) {
//             context.openAlertBox("success", res?.data?.message);
//             setIsAddedInMyList(true);
//             context.getMyListData();
//           } else {
//             context.openAlertBox("error", res?.data?.message);
//           }
//         })
//         .catch((err) => {
//           context.openAlertBox(
//             "error",
//             err?.response?.data?.message || "Something went wrong!",
//           );
//         });
//     }
//   };

//   useEffect(() => {
//     if (!Array.isArray(context?.myListData)) return;

//     const myListItem = context?.myListData?.filter(
//       (item) => item?.productId === props?.item?._id,
//     );
//     if (myListItem?.length !== 0) {
//       setIsAddedInMyList(true);
//     } else {
//       setIsAddedInMyList(false);
//     }
//   }, [context?.myListData]);

//   return (
//     <div className="productItem border border-gray-200 rounded-md overflow-hidden">
//       <div className="imgWrapper w-[100%] overflow-hidden relative group">
//         <Link to={`products/${props.item?.slug}`}>
//           <div className="img h-[180px] sm:h-[220px] overflow-hidden">
//             <img
//               src={props?.item?.images?.[0]}
//               alt={props?.item?.name || "Product"}
//               className="w-full h-full object-cover"
//             />
//             <img
//               src={props?.item?.images?.[1]}
//               alt=""
//               className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
//             />
//           </div>
//         </Link>

//         {/* ✅ FIX: "to-[200px]" was a typo for "top-[200px]" — "to-" isn't
//             a valid Tailwind position utility (it's used for gradient
//             stops), so this class was silently dropped and the icon
//             column rendered at its default (unpositioned) spot instead of
//             being tucked off-screen above the card, ready to slide down
//             on hover.
//             ✅ RESPONSIVE FIX: group-hover never fires on touch devices,
//             so on mobile these icons were effectively unreachable. Now
//             visible by default below the sm breakpoint, hover-reveal only
//             from sm up. */}
//         <div className="absolute opacity-100 top-[15px] sm:opacity-0 sm:top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[42px] sm:w-[50px] transition-all duration-300 sm:group-hover:top-[15px] sm:group-hover:opacity-100">
//           <Button
//             onClick={() => handleAddToMyList(props?.item)}
//             className="!w-[40px] !h-[40px] sm:!w-[48px] sm:!h-[48px] min-w-[40px] !rounded-full !bg-white text-black !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none"
//           >
//             {isAddedInMyList ? (
//               <IoMdHeart className="!text-[22px] sm:!text-[28px] text-blue-400 group-hover:text-black hover:text-black" />
//             ) : (
//               <FaRegHeart className="!text-[22px] sm:!text-[28px] !text-black group-hover:text-gray-500 hover:text-gray-400" />
//             )}
//           </Button>
//           <Button className="!w-[40px] !h-[40px] sm:!w-[48px] sm:!h-[48px] min-w-[40px] !rounded-full !bg-white text-black !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none">
//             <IoGitCompareOutline className="!text-[22px] sm:!text-[28px] !text-black group-hover:text-hover" />
//           </Button>
//           <Button
//             className="!w-[40px] !h-[40px] sm:!w-[48px] sm:!h-[48px] min-w-[40px] !rounded-full !bg-white text-black !hover:text-black hover:!bg-gray-300 group !border-none hover:!border-none"
//             onClick={() =>
//               context.handleClickOpenProductDetailsModal(true, props?.item)
//             }
//           >
//             <MdZoomOutMap className="!text-[22px] sm:!text-[28px] !text-black group-hover:text-hover" />
//           </Button>
//         </div>
//       </div>
//       <div className="info p-3">
//         <h3 className="px-2 text-[15px] sm:text-[16px] font-[500] mb-2 text-[rgba(0,0,0,.9)] line-clamp-2">
//           <Link
//             to={`products/${props.item?.slug}`}
//             className="hover:text-gray-400 transition-all"
//           >
//             {props.item?.name}
//           </Link>
//         </h3>
//         <div className="flex px-2 items-center gap-4">
//           <span className="oldPrice text-black">AED {props.item?.price}</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-full">
//             <Button
//               variant="contained"
//               className="!mt-3 !w-full sm:!w-auto !bg-gray-700 !text-white !font-[500] !text-[15px] sm:!text-[16px] !p-4 sm:!p-5 hover:!bg-gray-800 border-none !h-auto sm:!h-[25px] hover:!border-none !capitalize"
//               onClick={handleClickOpen}
//             >
//               <MdOutlineShoppingCart className="text-[19px]" /> Add to Cart
//             </Button>
//           </div>
//           <Dialog
//             open={open}
//             onClose={handleClose}
//             fullWidth
//             maxWidth="xs"
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//             role="alertdialog"
//           >
//             <DialogContent>
//               <Button
//                 className="!rounded-full !text-gray-600 !border !border-none !absolute top-[15px] right-[20px] !bg-white"
//                 onClick={handleClose}
//               >
//                 <IoCloseSharp className="!text-[30px]" />
//               </Button>
//               <DialogContentText id="alert-dialog-description">
//                 <div className="space-y-5 py-3">
//                   {props?.item?.variation?.map((variation, vIdx) => (
//                     <div key={vIdx}>
//                       <div className="flex items-center gap-2 mb-3 flex-wrap">
//                         <h3 className="font-semibold flex items-center gap-2 text-[16px] text-gray-800">
//                           {variation.title}
//                         </h3>

//                         {variation?.required && (
//                           <span className="text-[10px] bg-red-100 text-red-500 font-semibold px-2 py-0.5 rounded-full border border-red-200">
//                             Required
//                           </span>
//                         )}

//                         {variation?.multi_select && (
//                           <span className="text-[10px] bg-blue-100 text-blue-500 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
//                             Multi-select
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex items-center gap-3 flex-wrap">
//                         {variation?.options?.map((opt, oIdx) => {
//                           const selected = isSelected(
//                             variation.title,
//                             opt.name,
//                           );

//                           return (
//                             <motion.button
//                               key={oIdx}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() =>
//                                 handleSelect(
//                                   variation.title,
//                                   opt,
//                                   variation.multi_select,
//                                 )
//                               }
//                               className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
//                                 selected
//                                   ? "bg-black border-black text-white shadow-md"
//                                   : "bg-white border-gray-200 text-gray-600 hover:border-black hover:bg-gray-100"
//                               }`}
//                             >
//                               {selected && <span className="text-xs">✔</span>}
//                               <span>{opt.name}</span>
//                               {Number(opt.price) > 0 && (
//                                 <span
//                                   className={`text-[11px] ml-1 ${
//                                     selected
//                                       ? "text-gray-200"
//                                       : "text-yellow-600"
//                                   }`}
//                                 >
//                                   +AED {opt.price}
//                                 </span>
//                               )}
//                             </motion.button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   ))}
//                   <div className="border-t border-border pt-6">
//                     <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
//                       <div className="qtyBoxWrapper w-[80px]">
//                         <OtyBox quantity={quantity} setQuantity={setQuantity} />
//                       </div>
//                       <div className="text-right">
//                         <span className="text-sm text-muted-foreground">
//                           Total
//                         </span>
//                         <p className="text-2xl font-bold text-foreground mt-0.5">
//                           AED {totalPrice.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                     <Button
//                       variant="contained"
//                       className="!mt-3 !w-full !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800 border-none !h-[25px] hover:!border-none !capitalize !transition-colors !duration-200"
//                       disabled={isLoading}
//                       onClick={() =>
//                         addToCart(
//                           props?.item,
//                           context?.userDetails?.data?._id,
//                           quantity,
//                           selectedOptions,
//                         )
//                       }
//                     >
//                       {isLoading === true ? (
//                         <CircularProgress color="inherit" size={20} />
//                       ) : (
//                         <>
//                           <MdOutlineShoppingCart className="text-[19px] icon" />
//                           Add to Cart
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </DialogContentText>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsItems;
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

import {
  IoCloseSharp,
  IoGitCompareOutline,
} from "react-icons/io5";

import { FaRegHeart } from "react-icons/fa";

import {
  MdOutlineShoppingCart,
  MdZoomOutMap,
} from "react-icons/md";

import { IoMdHeart } from "react-icons/io";

import { MyContext } from "../App";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { motion } from "framer-motion";

import OtyBox from "./OtyBox";

import { CircularProgress } from "@mui/material";

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL
const ProductsItems = (props) => {

  const [open, setOpen] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [quantity, setQuantity] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [isAddedInMyList, setIsAddedInMyList] = useState(false);

  const history = useNavigate();

  const context = useContext(MyContext);


  /* =========================================================
     OPEN / CLOSE MODAL
  ========================================================= */

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  /* =========================================================
     SELECT PRODUCT VARIATION
  ========================================================= */

  const handleSelect = (title, option, multi) => {

    setSelectedOptions((prev) => {

      const current = prev[title] || [];

      const alreadySelected = current.find(
        (item) => item.name === option.name
      );

      if (alreadySelected) {

        return {
          ...prev,
          [title]: current.filter(
            (item) => item.name !== option.name
          ),
        };

      }

      return {
        ...prev,
        [title]: multi
          ? [...current, option]
          : [option],
      };

    });

  };


  /* =========================================================
     CHECK SELECTED OPTION
  ========================================================= */

  const isSelected = (title, name) => {

    const selected = selectedOptions[title] || [];

    return selected.some(
      (item) => item.name === name
    );

  };


  /* =========================================================
     DEFAULT REQUIRED OPTIONS
  ========================================================= */

  useEffect(() => {

    if (props?.item?.variation?.length > 0) {

      const defaultSelections = {};

      props.item.variation.forEach((variation) => {

        if (
          variation?.required &&
          variation?.options?.length > 0
        ) {

          defaultSelections[variation.title] = [
            variation.options[0],
          ];

        }

      });

      setSelectedOptions(defaultSelections);

    }

  }, [props?.item]);


  /* =========================================================
     EXTRA VARIATION COST
  ========================================================= */

  const extraCost = Object.values(
    selectedOptions
  ).reduce((total, selected) => {

    if (Array.isArray(selected)) {

      return (
        total +
        selected.reduce(
          (sum, option) =>
            sum + Number(option?.price || 0),
          0
        )
      );

    }

    return total + Number(selected?.price || 0);

  }, 0);


  /* =========================================================
     TOTAL PRICE
  ========================================================= */

  const basePrice = Number(
    props?.item?.price || 0
  );

  const totalPrice =
    (basePrice + extraCost) * quantity;


  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (
    product,
    userId,
    qty,
    options
  ) => {

    setIsLoading(true);

    context?.addToCart(
      product,
      userId,
      qty,
      options
    );

    setTimeout(() => {

      setIsLoading(false);

      history("/checkout");

    }, 1000);

  };


  /* =========================================================
     ADD TO MY LIST
  ========================================================= */

  const handleAddToMyList = (item) => {

    if (!context?.userDetails) {

      context?.openAlertBox(
        "error",
        "Please login first to add products to your wishlist."
      );

      return;

    }


    const obj = {

      productId: item?._id,

      userId:
        context?.userDetails?.data?._id,

      productTitle: item?.name,

      image:
        item?.images?.[0] || "",

      rating: item?.rating,

      price: item?.price,

      catName: item?.catName,

      slug: item?.slug,

      variation: item?.variation,

    };


    const token =
      localStorage.getItem("accessToken");


    axios
      .post(
        `${API_URL}/api/my-list/add`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then((res) => {

        if (res?.data?.error !== true) {

          context?.openAlertBox(
            "success",
            res?.data?.message
          );

          setIsAddedInMyList(true);

          context?.getMyListData();

        } else {

          context?.openAlertBox(
            "error",
            res?.data?.message
          );

        }

      })

      .catch((err) => {

        context?.openAlertBox(
          "error",
          err?.response?.data?.message ||
            "Something went wrong!"
        );

      });

  };


  /* =========================================================
     CHECK WISHLIST STATUS
  ========================================================= */

  useEffect(() => {

    if (!Array.isArray(context?.myListData)) {
      return;
    }

    const myListItem =
      context.myListData.filter(
        (item) =>
          item?.productId ===
          props?.item?._id
      );


    setIsAddedInMyList(
      myListItem.length > 0
    );

  }, [
    context?.myListData,
    props?.item?._id,
  ]);


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  const primaryImage =
    props?.item?.images?.[0];

  const secondaryImage =
    props?.item?.images?.[1] ||
    primaryImage;


  return (

    <article
      className="
        group
        w-full
        bg-white
        rounded-2xl
        overflow-hidden
        border
        border-[#f1e4e6]
        shadow-[0_4px_20px_rgba(30,20,25,0.06)]
        hover:shadow-[0_10px_35px_rgba(30,20,25,0.12)]
        transition-all
        duration-300
        h-full
      "
    >


      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}

      <div
        className="
          relative
          w-full
          overflow-hidden
          bg-[#fff7f8]
        "
      >

        <Link
          to={`/products/${props.item.slug}`}
          className="block"
        >

          <div
            className="
              relative
              w-full
              aspect-square
              sm:aspect-[4/4.2]
              md:aspect-[4/4.3]
              overflow-hidden
            "
          >

            {/* PRIMARY IMAGE */}

            <img
              src={primaryImage}
              alt={
                props?.item?.name ||
                "Product"
              }
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-all
                duration-700
                group-hover:scale-[1.04]
              "
            />


            {/* SECOND IMAGE */}

            {secondaryImage && (
              <img
                src={secondaryImage}
                alt=""
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  opacity-0
                  group-hover:opacity-100
                  group-hover:scale-[1.04]
                  transition-all
                  duration-700
                "
              />
            )}

          </div>

        </Link>


        {/* ===================================================
            TOP LABEL
        =================================================== */}

        {/* <div
          className="
            absolute
            top-3
            left-3
            z-20
          "
        >

          <span
            className="
              inline-flex
              items-center
              px-2.5
              py-1
              rounded-full
              bg-white/95
              backdrop-blur-sm
              text-[#c93658]
              text-[10px]
              sm:text-[11px]
              font-semibold
              shadow-sm
            "
          >
            Fresh Pick
          </span>

        </div> */}


        {/* ===================================================
            ACTION BUTTONS
        =================================================== */}

        <div
          className="
            absolute
            top-3
            right-3
            z-30
            flex
            flex-col
            gap-2

            opacity-100

            sm:opacity-0
            sm:-translate-y-3

            sm:group-hover:opacity-100
            sm:group-hover:translate-y-0

            transition-all
            duration-300
          "
        >

          {/* WISHLIST */}

          <button
            type="button"
            onClick={() =>
              handleAddToMyList(
                props?.item
              )
            }
            aria-label="Add to wishlist"
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              bg-white/95
              backdrop-blur-sm
              flex
              items-center
              justify-center
              text-[#242124]
              shadow-md
              hover:bg-[#d94667]
              hover:text-white
              transition-all
              duration-200
            "
          >

            {isAddedInMyList ? (

              <IoMdHeart
                className="
                  text-[20px]
                  text-[#d94667]
                "
              />

            ) : (

              <FaRegHeart
                className="
                  text-[18px]
                "
              />

            )}

          </button>


          {/* COMPARE */}

          <button
            type="button"
            aria-label="Compare product"
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              bg-white/95
              backdrop-blur-sm
              flex
              items-center
              justify-center
              text-[#242124]
              shadow-md
              hover:bg-[#d94667]
              hover:text-white
              transition-all
              duration-200
            "
          >

            <IoGitCompareOutline
              className="text-[19px]"
            />

          </button>


          {/* QUICK VIEW */}

          <button
            type="button"
            aria-label="Quick view"
            onClick={() =>
              context?.handleClickOpenProductDetailsModal(
                true,
                props?.item
              )
            }
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-full
              bg-white/95
              backdrop-blur-sm
              flex
              items-center
              justify-center
              text-[#242124]
              shadow-md
              hover:bg-[#d94667]
              hover:text-white
              transition-all
              duration-200
            "
          >

            <MdZoomOutMap
              className="text-[19px]"
            />

          </button>

        </div>

      </div>


      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div
        className="
          p-3
          sm:p-4
          flex
          flex-col
          h-[155px]
          sm:h-[165px]
        "
      >


        {/* CATEGORY */}

        {props?.item?.catName && (

          <p
            className="
              text-[#d94667]
              text-[10px]
              sm:text-[11px]
              uppercase
              tracking-[1.2px]
              font-semibold
              mb-1
              truncate
            "
          >
            {props.item.catName}
          </p>

        )}


        {/* PRODUCT NAME */}

        <h3
          className="
            text-[14px]
            sm:text-[15px]
            md:text-[16px]
            font-semibold
            leading-5
            text-[#242124]
            line-clamp-2
            min-h-[40px]
            mb-2
          "
        >

          <Link
            to={`/products/${props.item.slug}`}
            className="
              hover:text-[#d94667]
              transition-colors
              duration-200
            "
          >
            {props?.item?.name}
          </Link>

        </h3>


        {/* PRICE */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            mb-2
          "
        >

          <div className="flex items-center gap-1">

            <span
              className="
                text-[16px]
                sm:text-[18px]
                font-bold
                text-[#242124]
              "
            >
              AED {basePrice.toFixed(2)}
            </span>

          </div>

        </div>


        {/* ADD TO CART */}

        <Button
          type="button"
          onClick={handleClickOpen}
          className="
            !w-full
            !h-[40px]
            sm:!h-[42px]
            !rounded-lg
            !border-none

            !bg-[#242124]
            !text-white

            hover:!bg-[#d94667]

            !font-semibold
            !text-[13px]
            sm:!text-[14px]

            !flex
            !items-center
            !justify-center
            !gap-2

            !transition-all
            !duration-300

            !mt-auto
          "
        >

          <MdOutlineShoppingCart
            className="text-[18px]"
          />

          Add to Cart

        </Button>


        {/* ===================================================
            PRODUCT OPTIONS DIALOG
        =================================================== */}

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="product-options-title"
          aria-describedby="product-options-description"
        >

          <DialogContent
            sx={{
              padding: {
                xs: "20px 16px",
                sm: "28px",
              },
            }}
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="
                absolute
                top-3
                right-3
                z-20
                w-9
                h-9
                rounded-full
                bg-[#fff5f6]
                flex
                items-center
                justify-center
                text-[#242124]
                hover:bg-[#d94667]
                hover:text-white
                transition-all
              "
            >

              <IoCloseSharp
                className="text-[22px]"
              />

            </button>


            <DialogContentText
              id="product-options-description"
              component="div"
            >

              {/* MODAL HEADER */}

              <div className="mb-6 pr-8">

                <p
                  className="
                    text-[#d94667]
                    text-[10px]
                    uppercase
                    tracking-[2px]
                    font-semibold
                  "
                >
                  Customize your order
                </p>

                <h2
                  id="product-options-title"
                  className="
                    text-[#242124]
                    text-[20px]
                    sm:text-[24px]
                    font-bold
                    mt-1
                  "
                >
                  {props?.item?.name}
                </h2>

                <p
                  className="
                    text-[#777]
                    text-[13px]
                    mt-1
                  "
                >
                  Select your preferred options
                  before adding the product to
                  your cart.
                </p>

              </div>


              {/* =================================================
                  VARIATIONS
              ================================================= */}

              <div className="space-y-6">

                {props?.item?.variation?.map(
                  (variation, vIdx) => (

                    <div
                      key={
                        variation?._id ||
                        vIdx
                      }
                      className="
                        rounded-xl
                        bg-[#fffafa]
                        border
                        border-[#f1e4e6]
                        p-4
                      "
                    >

                      {/* HEADER */}

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          flex-wrap
                          mb-3
                        "
                      >

                        <h3
                          className="
                            text-[15px]
                            font-bold
                            text-[#242124]
                          "
                        >
                          {variation.title}
                        </h3>


                        {variation?.required && (

                          <span
                            className="
                              text-[9px]
                              bg-[#fde7eb]
                              text-[#c93658]
                              font-bold
                              px-2
                              py-1
                              rounded-full
                            "
                          >
                            REQUIRED
                          </span>

                        )}


                        {variation?.multi_select && (

                          <span
                            className="
                              text-[9px]
                              bg-[#eeeaff]
                              text-[#6b4fd3]
                              font-bold
                              px-2
                              py-1
                              rounded-full
                            "
                          >
                            MULTI-SELECT
                          </span>

                        )}

                      </div>


                      {/* OPTIONS */}

                      <div
                        className="
                          grid
                          grid-cols-1
                          sm:grid-cols-2
                          gap-2
                        "
                      >

                        {variation?.options?.map(
                          (opt, oIdx) => {

                            const selected =
                              isSelected(
                                variation.title,
                                opt.name
                              );

                            return (

                              <motion.button
                                key={
                                  opt?._id ||
                                  oIdx
                                }
                                type="button"
                                whileTap={{
                                  scale: 0.97,
                                }}
                                onClick={() =>
                                  handleSelect(
                                    variation.title,
                                    opt,
                                    variation.multi_select
                                  )
                                }
                                className={`
                                  w-full
                                  min-h-[48px]
                                  flex
                                  items-center
                                  justify-between
                                  gap-2
                                  px-3
                                  py-2.5
                                  rounded-lg
                                  border
                                  text-left
                                  transition-all
                                  duration-200

                                  ${
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
                                  }
                                `}
                              >

                                <span className="
                                  flex
                                  items-center
                                  gap-2
                                  min-w-0
                                ">

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
                                      ✓
                                    </span>

                                  )}

                                  <span className="
                                    text-[13px]
                                    font-medium
                                    truncate
                                  ">
                                    {opt.name}
                                  </span>

                                </span>


                                {Number(
                                  opt?.price || 0
                                ) > 0 && (

                                  <span
                                    className={`
                                      text-[11px]
                                      font-semibold
                                      shrink-0
                                      ${
                                        selected
                                          ? "text-white"
                                          : "text-[#d94667]"
                                      }
                                    `}
                                  >
                                    + AED{" "}
                                    {Number(
                                      opt.price
                                    ).toFixed(2)}
                                  </span>

                                )}

                              </motion.button>

                            );

                          }
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>


              {/* =================================================
                  CART SUMMARY
              ================================================= */}

              <div
                className="
                  mt-6
                  pt-5
                  border-t
                  border-[#eee3e5]
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                  "
                >

                  {/* QUANTITY */}

                  <div>

                    <p
                      className="
                        text-[12px]
                        font-semibold
                        text-[#777]
                        mb-2
                      "
                    >
                      Quantity
                    </p>

                    <div className="w-[95px]">
                      <OtyBox
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>

                  </div>


                  {/* TOTAL */}

                  <div
                    className="
                      sm:text-right
                    "
                  >

                    <p
                      className="
                        text-[12px]
                        text-[#888]
                      "
                    >
                      Total Amount
                    </p>

                    <p
                      className="
                        text-[24px]
                        sm:text-[28px]
                        font-bold
                        text-[#d94667]
                      "
                    >
                      AED{" "}
                      {totalPrice.toFixed(2)}
                    </p>

                  </div>

                </div>


                {/* ADD TO CART */}

                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    addToCart(
                      props?.item,
                      context
                        ?.userDetails
                        ?.data?._id,
                      quantity,
                      selectedOptions
                    )
                  }
                  className="
                    !mt-5
                    !w-full
                    !h-[48px]
                    !rounded-xl
                    !border-none
                    !bg-[#242124]
                    !text-white
                    hover:!bg-[#d94667]
                    !font-semibold
                    !text-[15px]
                    !flex
                    !items-center
                    !justify-center
                    !gap-2
                    !transition-all
                    !duration-300
                  "
                >

                  {isLoading ? (

                    <CircularProgress
                      color="inherit"
                      size={21}
                    />

                  ) : (

                    <>
                      <MdOutlineShoppingCart
                        className="text-[20px]"
                      />

                      Add to Cart
                    </>

                  )}

                </Button>

              </div>

            </DialogContentText>

          </DialogContent>

        </Dialog>

      </div>

    </article>

  );

};

export default ProductsItems;