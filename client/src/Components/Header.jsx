// import React, { useContext, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Search from "./Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import {
//   IoIosArrowDown,
//   IoIosGitCompare,
//   IoIosLogOut,
//   IoMdCart,
//   IoMdHeart,
// } from "react-icons/io";
// import Tooltip from "@mui/material/Tooltip";
// import { Avatar, Button } from "@mui/material";
// import { RiMenu2Fill } from "react-icons/ri";
// import { IoArrowDown } from "react-icons/io5";
// import CategoryPanel from "./CategoryPanel";
// import { MyContext } from "../App";
// import { FaHeart, FaRegHeart, FaRegUser } from "react-icons/fa6";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
// import { BsBagCheck, BsBagCheckFill } from "react-icons/bs";
// import { FiLogOut } from "react-icons/fi";
// import { fetchDataFromApi } from "../utlis/api";
// import axios from "axios";
// import { useEffect } from "react";
// import { Link as RouterLink,} from "react-router-dom";
// // import '../index.css'

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
//     border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
//     padding: "0 4px",
//   },
// }));

// const Header = () => {
//   const { slug } = useParams();
//   const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
//   const openCategoryPanel = () => {
//     setIsOpenCatPanel(true);
//   };
//   const [catData, setCatData] = useState([]);
//   const context = useContext(MyContext);
//   const [productsData, setProductsData] = useState([]);
//   const history = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   //  useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     setIsLoading(true);
//   //     try {
//   //       // ✅ selectedCatId context se milega (Link ke onClick se set hua tha)
//   //       const catId = context?.selectedCatId;
//   //       const res = await axios.get(
//   //         `http://localhost:5000/api/product/getproductbycat/${catId}`
//   //       );
//   //       setProducts(res?.data?.product || res?.data?.data || []);
//   //     } catch (err) {
//   //       context.openAlertBox("error", "Products load nahi ho paaye");
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, [slug]); // ✅
//  useEffect(() => {
//   const fetchCategoriesWithProducts = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/category"
//       );

//       const categories = Array.isArray(res.data?.data)
//         ? res.data.data
//         : [];

//       const categoriesWithProducts = await Promise.all(
//         categories.map(async (cat) => {
//           try {
//             const prodRes = await axios.get(
//               `http://localhost:5000/api/product/getproductbycat/${cat._id}`
//             );

//             const products = Array.isArray(
//               prodRes.data?.product
//             )
//               ? prodRes.data.product
//               : Array.isArray(prodRes.data)
//               ? prodRes.data
//               : [];

//             return {
//               ...cat,
//               products,
//             };
//           } catch (err) {
//             console.error(
//               `Error fetching products for category ${cat._id}:`,
//               err
//             );

//             return {
//               ...cat,
//               products: [],
//             };
//           }
//         })
//       );

//       context.setCatData(categoriesWithProducts);
//     } catch (err) {
//       console.error(
//         "Error fetching categories:",
//         err
//       );

//       context.setCatData([]);
//     }
//   };

//   fetchCategoriesWithProducts();
// }, [slug]);

// // const filterByCatId = (id) => {
// //   context.setSelectedCatId(id);
// // };
//   // useEffect(() => {
//   //   axios.get("http://localhost:5000/api/category").then(async (res) => {
//   //     const categories = res.data.data;

//   //     // Har category ke liye products fetch karo
//   //     const categoriesWithProducts = await Promise.all(
//   //       categories.map(async (cat) => {
//   //         try {
//   //           const prodRes = await axios.get(
//   //             `http://localhost:5000/api/product/getproductbycat/${cat._id}`,
//   //           );
//   //           return {
//   //             ...cat,
//   //             products: prodRes.data.product || prodRes.data || [],
//   //           };
//   //         } catch (err) {
//   //           return { ...cat, products: [] };
//   //         }
//   //       }),
//   //     );

//   //     context.setCatData(categoriesWithProducts);
//   //   });
//   // }, [slug]);
//  const filterByCatId = (category) => {
//   context.setSelectedCatId(category._id);

//   navigate(`/category/${category.slug}`);
// };
//   // const filterByCatId = (id) => {
//   //   context.setSelectedCatId(id); // optional
//   // };
//   const logout = async () => {
//     try {
//       setAnchorEl(null);

//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         context.setIsLogin(false);
//         return;
//       }

//       const res = await axios.get("http://localhost:5000/api/user/logout", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // ✅ ALWAYS REMOVE TOKENS (important)
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       context.setUserDetails(null); // ✅ Clear user details on logout
//       context.setIsLogin(false);
//       context.setCartData([]);
//       context.setMyListData([])
//       context.openAlertBox("success", res?.data?.message);
//       history("/");
//     } catch (error) {
//       // console.error("Logout error:", error);
//       context.openAlertBox("error", res?.data?.message);

//       // 🔥 Even if API fails, force logout
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       context.setIsLogin(false);
//     }
//   };

//   return (
//     <>
//       <header className="bg-white sticky top-[0px] z-[100]">
//         <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px]">
//           <div className="container">
//             <div className="flex item-center justify-between">
//               <div className="col1 w-[50%]">
//                 <p className="text-[12px] font-medium">
//                   Get up to 50% off new season style Limited time only
//                 </p>
//               </div>
//               <div className="col12 flex items-center justify-end">
//                 <ul className="flex items-center gap-3">
//                   <li className="list-none">
//                     <Link
//                       className="hover:text-primary text-[13px] font-medium transition"
//                       to="/help-center"
//                     >
//                       Help Center
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       className="hover:text-primary text-[13px] font-medium transition"
//                       to="/order-tracking"
//                     >
//                       Order Tracking
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="header py-2 border-t-[1px] border-gray-300 border-b-[1px]">
//           <div className="container flex items-center justify-between">
//             <div className="col1 w-[25]">
//               <Link to={"/"}>
//                 <img className="h-20" src="/logo1.png" />
//               </Link>
//             </div>
//             <div className="col2 w-[45%]">
//               <Search />
//             </div>
//             <div className="col3 w-[30] flex items-center">
//               <ul className="flex items-center gap-3">
//                 {context.isLogin === false ? (
//                   <li className="list-none">
//                     <Link
//                       className="hover:text-primary text-[16px] font-medium"
//                       to="/login"
//                     >
//                       Login
//                     </Link>{" "}
//                     /{" "}
//                     <Link
//                       className="hover:text-primary text-[16px] font-medium"
//                       to="/register"
//                     >
//                       Register
//                     </Link>
//                   </li>
//                 ) : (
//                   <>
//                     <div
//                       className="myAccountWrap flex items-center gap-3"
//                       onClick={handleClick}
//                     >
//                       <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-gray-200">
//                         {" "}
//                         <FaRegUser className="text-[19px] text-gray-600" />{" "}
//                       </Button>
//                       <Button>
//                         <div className="info flex flex-col">
//                           <h4 className="text-[14px] text-gray-600 font-semibold mb-0 capitalize text-left justify-start">
//                             {/* Navi Ansari */}
//                             {/* {context.user?.name} */}
//                             {context?.userDetails?.data?.name}
//                           </h4>
//                           <span className="text-[13px] text-gray-400 font-[400] lowercase text-left justify-start">
//                             {/* {console.log(context?.userDetails)} */}
//                             {/* {context.userDetails.email} */}
//                             {context?.userDetails?.data?.email}
//                           </span>
//                         </div>
//                       </Button>
//                     </div>
//                     <Menu
//                       anchorEl={anchorEl}
//                       id="account-menu"
//                       open={open}
//                       onClose={handleClose}
//                       onClick={handleClose}
//                       slotProps={{
//                         paper: {
//                           elevation: 0,
//                           sx: {
//                             overflow: "visible",
//                             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                             mt: 1.5,
//                             "& .MuiAvatar-root": {
//                               width: 32,
//                               height: 32,
//                               ml: -0.5,
//                               mr: 1,
//                             },
//                             "&::before": {
//                               content: '""',
//                               display: "block",
//                               position: "absolute",
//                               top: 0,
//                               right: 14,
//                               width: 10,
//                               height: 10,
//                               bgcolor: "background.paper",
//                               transform: "translateY(-50%) rotate(45deg)",
//                               zIndex: 0,
//                             },
//                           },
//                         },
//                       }}
//                       transformOrigin={{ horizontal: "right", vertical: "top" }}
//                       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                     >
//                       <Link to={"/my-account"} className="w-full block">
//                         <MenuItem
//                           onClick={handleClose}
//                           className="flex gap-4 !py-3"
//                         >
//                           <FaRegUser className="text-[18px]" />{" "}
//                           <span className="text-[14px]">My Account</span>
//                         </MenuItem>
//                       </Link>
//                       <Link to={"/my-orders"} className="w-full block">
//                         <MenuItem
//                           onClick={handleClose}
//                           className="flex gap-4 !py-2"
//                         >
//                           <BsBagCheck className="text-[18px]" />{" "}
//                           <span className="text-[14px]">Orders</span>
//                         </MenuItem>
//                       </Link>
//                       <Link to={"/my-list"} className="w-full block">
//                         <MenuItem
//                           onClick={handleClose}
//                           className="flex gap-4 !py-2"
//                         >
//                           <FaRegHeart className="text-[18px]" />
//                           <span className="text-[14px]">My List</span>
//                         </MenuItem>
//                       </Link>
//                       <MenuItem onClick={logout} className="flex gap-4 !py-2">
//                         <FiLogOut className="text-[18px]" />{" "}
//                         <span className="text-[14px]"> Logout</span>
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}

//                 <li>
//                   <Tooltip title="Compare">
//                     <IconButton aria-label="compare">
//                       <StyledBadge badgeContent={4} color="primary">
//                         <IoIosGitCompare />
//                       </StyledBadge>
//                     </IconButton>
//                   </Tooltip>
//                 </li>
//                 <li>
//                   <Tooltip title="Wishlist">
//                     <Link to={'/my-list'}>
//                     <IconButton aria-label="heart">
//                       <StyledBadge badgeContent={context?.myListData?.data?.length} color="primary">
//                         <IoMdHeart />
//                       </StyledBadge>
//                     </IconButton>
//                     </Link>
//                   </Tooltip>
//                 </li>
//                 <li>
//                   <Tooltip title="Cart">
//                     <IconButton
//                       aria-label="cart"
//                       onClick={() => {
//                         context.setOpenCartPanel(true);
//                       }}
//                     >
//                       <StyledBadge
//                         badgeContent={context?.cartData?.data?.length}
//                         color="primary"
//                       >
//                         <IoMdCart />
//                       </StyledBadge>
//                     </IconButton>
//                   </Tooltip>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div>
//           <nav>
//             <div className="container flex items-center justify-start gap-8 !py-2">
//               <div className="col_1 w-[20%]">
//                 <Button
//                   className="!text-black gap-2 w-full"
//                   onClick={openCategoryPanel}
//                 >
//                   <RiMenu2Fill className="gap-4 text-[18px]" />
//                   Shop By Category{" "}
//                   <IoIosArrowDown className="text-[14px] ml-auto font-bold" />
//                 </Button>
//               </div>
//               <div className="col_2 z-50 w-[80%]">
//                 <ul className="flex item-center gap-6 nav">
//                   <li className="list-none">
//                     <Button className=" !py-4 !text-[16px] !capitalize !font-medium !text-gray-700 !transition hover:!text-gray-800 hover:!bg-white">
//                       <Link to={"/"}>Home</Link>
//                     </Button>
//                   </li>
//                   {context?.catData?.length !== 0 &&
//                     context?.catData?.map((item, index) => {
//                       return (
//                         <li className="list-none relative" key={index}>
//                           <Link
//                             component={RouterLink}
//                             to={`/category/${item.slug}`}
//                             // onClick={() => filterByCatId(item._id)}
//                           >
//                             <Button className=" !py-4 !text-[16px] !text-gray-700 !capitalize !font-medium !transition hover:!text-gray-800 hover:!bg-white">
//                               {item.name}
//                             </Button>
//                           </Link>
//                           <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white rounded-md shadow-md opacity-0 px-3 py-2">
//                             <ul>
//                               {item?.products?.length !== 0 &&
//                                 item?.products?.map((prod) => (
//                                   <li
//                                     className="list-none w-full mb-1"
//                                     key={prod._id}
//                                   >
//                                     <Link
//                                       to={`/products/${prod.slug}`}
//                                       className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                     >
//                                       {prod.name}
//                                     </Link>
//                                   </li>
//                                 ))}
//                               {/* <li className="list-none w-full mb-1">
//                           <Link
//                             to={`/products/${item.slug}`}
//                             className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                           >
//                             Men
//                             <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white rounded-md shadow-md opacity-0 px-3 py-2">
//                               <ul>
//                                 <li className="list-none w-full mb-1">
//                                   <Link
//                                     to="/"
//                                     className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                   >
//                                     T -Shirt
//                                   </Link>
//                                 </li>
//                                 <li className="list-none w-full mb-1">
//                                   <Link
//                                     to="/"
//                                     className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                   >
//                                     Jeans
//                                   </Link>
//                                 </li>
//                                 <li className="list-none w-full mb-1">
//                                   <Link
//                                     to="/"
//                                     className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                   >
//                                     FootWears
//                                   </Link>
//                                 </li>
//                                 <li className="list-none w-full mb-1">
//                                   <Link
//                                     to="/"
//                                     className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                   >
//                                     Watch
//                                   </Link>
//                                 </li>
//                                 <li className="list-none w-full mb-1">
//                                   <Link
//                                     to="/"
//                                     className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                   >
//                                     Peants
//                                   </Link>
//                                 </li>
//                               </ul>
//                             </div>
//                           </Link>
//                         </li>
//                         <li className="list-none w-full mb-1">
//                           <Link
//                             to="/"
//                             className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                           >
//                             Women
//                           </Link>
//                         </li>
//                         <li className="list-none w-full mb-1">
//                           <Link
//                             to="/"
//                             className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                           >
//                             Kids
//                           </Link>
//                         </li>
//                         <li className="list-none w-full mb-1">
//                           <Link
//                             to="/"
//                             className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                           >
//                             Girl
//                           </Link>
//                         </li>
//                         <li className="list-none w-full mb-1">
//                           <Link
//                             to="/"
//                             className=" hover:!text-gray-400 !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                           >
//                             Boy
//                           </Link>
//                         </li> */}
//                             </ul>
//                           </div>
//                         </li>
//                       );
//                     })}
//                   {/* <li className="list-none">
//                     <Link
//                       to="/"
//                       className=" !py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Electronics{" "}
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       to="/"
//                       className=" !py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Bags
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       to="/"
//                       className="!py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Footwear
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       to="/"
//                       className="!py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Groceries
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       to="/"
//                       className="!py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Beauty
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       to="/"
//                       className="!py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Wellness
//                     </Link>
//                   </li>
//                   <li className="list-none">
//                     <Link
//                       to="/"
//                       className="!py-4 text-[14px] font-medium transition hover:text-primary"
//                     >
//                       Jewellery
//                     </Link>
//                   </li> */}
//                 </ul>
//               </div>
//               {/* <div className="col_3 w-[20]">
//                     <p className="text-[14px]">Free Internation Delivery</p>
//                 </div> */}
//             </div>
//           </nav>
//         </div>
//         {context?.catData?.length !== 0 && (
//           <CategoryPanel
//             openCategoryPanel={openCategoryPanel}
//             isOpenCatPanel={isOpenCatPanel}
//             setIsOpenCatPanel={setIsOpenCatPanel}
//             data={context?.catData}
//           />
//         )}
//       </header>
//     </>
//   );
// };

// export default Header;
// import React, { useContext, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Search from "./Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import {
//   IoIosArrowDown,
//   IoIosGitCompare,
//   IoIosLogOut,
//   IoMdCart,
//   IoMdHeart,
// } from "react-icons/io";
// import Tooltip from "@mui/material/Tooltip";
// import { Avatar, Button } from "@mui/material";
// import { RiMenu2Fill } from "react-icons/ri";
// import { IoArrowDown } from "react-icons/io5";
// import CategoryPanel from "./CategoryPanel";
// import { MyContext } from "../App";
// import { FaHeart, FaRegHeart, FaRegUser } from "react-icons/fa6";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
// import { BsBagCheck, BsBagCheckFill } from "react-icons/bs";
// import { FiLogOut } from "react-icons/fi";
// import { fetchDataFromApi } from "../utlis/api";
// import axios from "axios";
// import { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
// // import '../index.css'

// /**
//  * ---- Brand palette (unique to this project) ----
//  * plum      #241C29  -> near-black plum, primary text / dark surfaces
//  * deepPlum  #3D2350  -> secondary dark surface, nav hovers
//  * mutedPlum #7A4988  -> links / hover accents
//  * marigold  #E3A11F  -> primary CTA / badges / active states
//  * mist      #F8F5FB  -> soft lavender-white background tint
//  * Avoids the generic cream+terracotta / black+neon combos.
//  */

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
//     border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
//     padding: "0 4px",
//     backgroundColor: "#E3A11F",
//     color: "#241C29",
//     fontWeight: 700,
//   },
// }));

// const Header = () => {
//   const { slug } = useParams();
//   const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
//   const openCategoryPanel = () => {
//     setIsOpenCatPanel(true);
//   };
//   const [catData, setCatData] = useState([]);
//   const context = useContext(MyContext);
//   const [productsData, setProductsData] = useState([]);
//   const history = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [isSearchOpen, setIsSearchOpen] = useState(false); // mobile search toggle
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     const fetchCategoriesWithProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/category");

//         const categories = Array.isArray(res.data?.data) ? res.data.data : [];

//         const categoriesWithProducts = await Promise.all(
//           categories.map(async (cat) => {
//             try {
//               const prodRes = await axios.get(
//                 `http://localhost:5000/api/product/getproductbycat/${cat._id}`
//               );

//               const products = Array.isArray(prodRes.data?.product)
//                 ? prodRes.data.product
//                 : Array.isArray(prodRes.data)
//                 ? prodRes.data
//                 : [];

//               return {
//                 ...cat,
//                 products,
//               };
//             } catch (err) {
//               console.error(
//                 `Error fetching products for category ${cat._id}:`,
//                 err
//               );

//               return {
//                 ...cat,
//                 products: [],
//               };
//             }
//           })
//         );

//         context.setCatData(categoriesWithProducts);
//       } catch (err) {
//         console.error("Error fetching categories:", err);

//         context.setCatData([]);
//       }
//     };

//     fetchCategoriesWithProducts();
//   }, [slug]);

//   const filterByCatId = (category) => {
//     context.setSelectedCatId(category._id);

//     history(`/category/${category.slug}`);
//   };

//   const logout = async () => {
//     try {
//       setAnchorEl(null);

//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         context.setIsLogin(false);
//         return;
//       }

//       const res = await axios.get("http://localhost:5000/api/user/logout", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // ✅ ALWAYS REMOVE TOKENS (important)
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       context.setUserDetails(null); // ✅ Clear user details on logout
//       context.setIsLogin(false);
//       context.setCartData([]);
//       context.setMyListData([]);
//       context.openAlertBox("success", res?.data?.message);
//       history("/");
//     } catch (error) {
//       context.openAlertBox("error", error?.response?.data?.message || "Logout failed");

//       // 🔥 Even if API fails, force logout
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       context.setIsLogin(false);
//     }
//   };

//   return (
//     <>
//       <header className="bg-white sticky top-[0px] z-[100]">
//         {/* ---------------- Top strip ---------------- */}
//         <div className="top-strip py-2 bg-[#241C29]">
//           <div className="container">
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
//               <p className="text-[11px] sm:text-[12px] font-medium text-[#F8F5FB] text-center sm:text-left">
//                 Get up to 50% off new season style · Limited time only
//               </p>
//               <ul className="hidden sm:flex items-center gap-3">
//                 <li className="list-none">
//                   <Link
//                     className="text-[#F8F5FB] hover:text-[#E3A11F] text-[13px] font-medium transition"
//                     to="/help-center"
//                   >
//                     Help Center
//                   </Link>
//                 </li>
//                 <li className="list-none border-l border-[#7A4988] pl-3">
//                   <Link
//                     className="text-[#F8F5FB] hover:text-[#E3A11F] text-[13px] font-medium transition"
//                     to="/my-orders"
//                   >
//                     Order Tracking
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* ---------------- Main header row ---------------- */}
//         <div className="header py-3 border-t-[1px] border-gray-200 border-b-[1px] bg-white">
//           <div className="container flex flex-wrap items-center justify-between gap-y-2 md:flex-nowrap">
//             {/* Logo */}
//             <div className="col1 order-1 shrink-0">
//               <Link to={"/"}>
//                 <img className="h-10 sm:h-14 md:h-20" src="/logo1.png" alt="logo" />
//               </Link>
//             </div>

//             {/* Icons row (moves up next to logo on mobile) */}
//             <div className="col3 order-2 md:order-3 flex items-center ml-auto md:ml-0">
//               <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">
//                 {context.isLogin === false ? (
//                   <li className="list-none">
//                     <Link
//                       className="hover:text-[#7A4988] text-[13px] sm:text-[16px] font-medium text-[#241C29]"
//                       to="/login"
//                     >
//                       Login
//                     </Link>{" "}
//                     /{" "}
//                     <Link
//                       className="hover:text-[#7A4988] text-[13px] sm:text-[16px] font-medium text-[#241C29]"
//                       to="/register"
//                     >
//                       Register
//                     </Link>
//                   </li>
//                 ) : (
//                   <>
//                     <div
//                       className="myAccountWrap flex items-center gap-1 sm:gap-3 cursor-pointer"
//                       onClick={handleClick}
//                     >
//                       <Button className="!w-[36px] !h-[36px] sm:!w-[40px] sm:!h-[40px] !min-w-[36px] sm:!min-w-[40px] !rounded-full !bg-[#F8F5FB]">
//                         <FaRegUser className="text-[16px] sm:text-[19px] text-[#3D2350]" />
//                       </Button>
//                       <Button className="!hidden lg:!inline-flex">
//                         <div className="info flex flex-col">
//                           <h4 className="text-[14px] text-[#241C29] font-semibold mb-0 capitalize text-left justify-start">
//                             {context?.userDetails?.data?.name}
//                           </h4>
//                           <span className="text-[13px] text-[#7A4988] font-[400] lowercase text-left justify-start">
//                             {context?.userDetails?.data?.email}
//                           </span>
//                         </div>
//                       </Button>
//                     </div>
//                     <Menu
//                       anchorEl={anchorEl}
//                       id="account-menu"
//                       open={open}
//                       onClose={handleClose}
//                       onClick={handleClose}
//                       slotProps={{
//                         paper: {
//                           elevation: 0,
//                           sx: {
//                             overflow: "visible",
//                             filter: "drop-shadow(0px 2px 8px rgba(36,28,41,0.28))",
//                             mt: 1.5,
//                             "& .MuiAvatar-root": {
//                               width: 32,
//                               height: 32,
//                               ml: -0.5,
//                               mr: 1,
//                             },
//                             "&::before": {
//                               content: '""',
//                               display: "block",
//                               position: "absolute",
//                               top: 0,
//                               right: 14,
//                               width: 10,
//                               height: 10,
//                               bgcolor: "background.paper",
//                               transform: "translateY(-50%) rotate(45deg)",
//                               zIndex: 0,
//                             },
//                           },
//                         },
//                       }}
//                       transformOrigin={{ horizontal: "right", vertical: "top" }}
//                       anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                     >
//                       <Link to={"/my-account"} className="w-full block">
//                         <MenuItem
//                           onClick={handleClose}
//                           className="flex gap-4 !py-3 hover:!bg-[#F8F5FB]"
//                         >
//                           <FaRegUser className="text-[18px] text-[#3D2350]" />{" "}
//                           <span className="text-[14px]">My Account</span>
//                         </MenuItem>
//                       </Link>
//                       <Link to={"/my-orders"} className="w-full block">
//                         <MenuItem
//                           onClick={handleClose}
//                           className="flex gap-4 !py-2 hover:!bg-[#F8F5FB]"
//                         >
//                           <BsBagCheck className="text-[18px] text-[#3D2350]" />{" "}
//                           <span className="text-[14px]">Orders</span>
//                         </MenuItem>
//                       </Link>
//                       <Link to={"/my-list"} className="w-full block">
//                         <MenuItem
//                           onClick={handleClose}
//                           className="flex gap-4 !py-2 hover:!bg-[#F8F5FB]"
//                         >
//                           <FaRegHeart className="text-[18px] text-[#3D2350]" />
//                           <span className="text-[14px]">My List</span>
//                         </MenuItem>
//                       </Link>
//                       <MenuItem
//                         onClick={logout}
//                         className="flex gap-4 !py-2 hover:!bg-[#F8F5FB]"
//                       >
//                         <FiLogOut className="text-[18px] text-[#3D2350]" />{" "}
//                         <span className="text-[14px]"> Logout</span>
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 )}

//                 {/* <li className="hidden sm:list-item">
//                   <Tooltip title="Compare">
//                     <IconButton aria-label="compare">
//                       <StyledBadge badgeContent={4}>
//                         <IoIosGitCompare className="text-[#241C29]" />
//                       </StyledBadge>
//                     </IconButton>
//                   </Tooltip>
//                 </li> */}
//                 <li>
//                   <Tooltip title="Wishlist">
//                     <Link to={"/my-list"}>
//                       <IconButton aria-label="heart">
//                         <StyledBadge
//                           badgeContent={context?.myListData?.data?.length}
//                         >
//                           <IoMdHeart className="text-[#241C29]" />
//                         </StyledBadge>
//                       </IconButton>
//                     </Link>
//                   </Tooltip>
//                 </li>
//                 <li>
//                   <Tooltip title="Cart">
//                     <IconButton
//                       aria-label="cart"
//                       onClick={() => {
//                         context.setOpenCartPanel(true);
//                       }}
//                     >
//                       <StyledBadge badgeContent={context?.cartData?.data?.length}>
//                         <IoMdCart className="text-[#241C29]" />
//                       </StyledBadge>
//                     </IconButton>
//                   </Tooltip>
//                 </li>
//               </ul>
//             </div>

//             {/* Search bar — wraps to its own full-width row on mobile */}
//             <div className="col2 order-3 md:order-2 w-full md:w-[45%] mt-1 md:mt-0">
//               <Search />
//             </div>
//           </div>
//         </div>

//         {/* ---------------- Category nav ---------------- */}
//         <div>
//           <nav>
//             <div className="container flex flex-col md:flex-row items-stretch md:items-center justify-start gap-2 md:gap-8 !py-2">
//               <div className="col_1 w-full md:w-[20%]">
//                 <Button
//                   className="!text-white !bg-[#3D2350] hover:!bg-[#241C29] gap-2 w-full !rounded-full !py-2 !normal-case"
//                   onClick={openCategoryPanel}
//                 >
//                   <RiMenu2Fill className="gap-4 text-[18px]" />
//                   Shop By Category{" "}
//                   <IoIosArrowDown className="text-[14px] ml-auto font-bold" />
//                 </Button>
//               </div>
//               <div className="col_2 z-50 w-full md:w-[80%]">
//                 {/* Full category links only shown from md breakpoint up;
//                     on mobile "Shop By Category" above opens the CategoryPanel instead */}
//                 <ul className="hidden md:flex item-center gap-6 nav">
//                   <li className="list-none">
//                     <Button className=" !py-4 !text-[16px] !capitalize !font-medium !text-[#241C29] !transition hover:!text-[#7A4988] hover:!bg-white">
//                       <Link to={"/"}>Home</Link>
//                     </Button>
//                   </li>
//                   {context?.catData?.length !== 0 &&
//                     context?.catData?.map((item, index) => {
//                       return (
//                         <li className="list-none relative group" key={index}>
//                           <Link component={RouterLink} to={`/category/${item.slug}`}>
//                             <Button className=" !py-4 !text-[16px] !text-[#241C29] !capitalize !font-medium !transition hover:!text-[#7A4988] hover:!bg-white">
//                               {item.name}
//                             </Button>
//                           </Link>
//                           <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 border-t-2 border-[#E3A11F] px-3 py-2 transition-opacity">
//                             <ul>
//                               {item?.products?.length !== 0 &&
//                                 item?.products?.map((prod) => (
//                                   <li className="list-none w-full mb-1" key={prod._id}>
//                                     <Link
//                                       to={`/products/${prod.slug}`}
//                                       className=" hover:!text-[#E3A11F] !text-left !justify-start w-full !rounded-none !text-[#484848]"
//                                     >
//                                       {prod.name}
//                                     </Link>
//                                   </li>
//                                 ))}
//                             </ul>
//                           </div>
//                         </li>
//                       );
//                     })}
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         </div>

//         {context?.catData?.length !== 0 && (
//           <CategoryPanel
//             openCategoryPanel={openCategoryPanel}
//             isOpenCatPanel={isOpenCatPanel}
//             setIsOpenCatPanel={setIsOpenCatPanel}
//             data={context?.catData}
//           />
//         )}
//       </header>
//     </>
//   );
// };

// export default Header;

import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "./Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {
  IoIosArrowDown,
  IoIosGitCompare,
  IoIosLogOut,
  IoMdCart,
  IoMdHeart,
} from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Button } from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import { IoArrowDown } from "react-icons/io5";
import CategoryPanel from "./CategoryPanel";
import { MyContext } from "../App";
import { FaHeart, FaRegHeart, FaRegUser } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { BsBagCheck, BsBagCheckFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { fetchDataFromApi } from "../utlis/api";
import axios from "axios";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// import '../index.css'
const API_URL = import.meta.env.VITE_API_URL
/**
 * ---- Brand palette ----
 *
 * darkBrown  #2B1B14  -> primary text / dark surfaces
 * gold       #D9A441  -> CTA / badges / active states / accents
 * cream      #F7F0E7  -> soft background / hover surfaces
 *
 * Clean, premium brown + gold + cream color combination.
 */

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#D9A441",
    color: "#2B1B14",
    fontWeight: 700,
  },
}));

const Header = () => {
  const { slug } = useParams();
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  const [catData, setCatData] = useState([]);
  const context = useContext(MyContext);
  const [productsData, setProductsData] = useState([]);
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/category`
        );

        const categories = Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        const categoriesWithProducts = await Promise.all(
          categories.map(async (cat) => {
            try {
              const prodRes = await axios.get(
                `${API_URL}/api/product/getproductbycat/${cat._id}`
              );

              const products = Array.isArray(prodRes.data?.product)
                ? prodRes.data.product
                : Array.isArray(prodRes.data)
                ? prodRes.data
                : [];

              return {
                ...cat,
                products,
              };
            } catch (err) {
              console.error(
                `Error fetching products for category ${cat._id}:`,
                err
              );

              return {
                ...cat,
                products: [],
              };
            }
          })
        );

        context.setCatData(categoriesWithProducts);
      } catch (err) {
        console.error("Error fetching categories:", err);

        context.setCatData([]);
      }
    };

    fetchCategoriesWithProducts();
  }, [slug]);

  const filterByCatId = (category) => {
    context.setSelectedCatId(category._id);

    history(`/category/${category.slug}`);
  };

  const logout = async () => {
    try {
      setAnchorEl(null);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        context.setIsLogin(false);
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ALWAYS REMOVE TOKENS
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      context.setUserDetails(null);
      context.setIsLogin(false);
      context.setCartData([]);
      context.setMyListData([]);

      context.openAlertBox(
        "success",
        res?.data?.message
      );

      history("/");
    } catch (error) {
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Logout failed"
      );

      // Even if API fails, force logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      context.setIsLogin(false);
    }
  };

  return (
    <>
      <header className="bg-white sticky top-[0px] z-[100]">

        {/* ---------------- Top strip ---------------- */}

        <div className="top-strip py-2 bg-[#2B1B14]">
          <div className="container">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-1">

              <p className="text-[11px] sm:text-[12px] font-medium text-[#F7F0E7] text-center sm:text-left">
                Get up to 50% off new season style · Limited time only
              </p>

              <ul className="hidden sm:flex items-center gap-3">

                <li className="list-none">
                  <Link
                    className="text-[#F7F0E7] hover:text-[#D9A441] text-[13px] font-medium transition"
                    to="/help-center"
                  >
                    Help Center
                  </Link>
                </li>

                <li className="list-none border-l border-[#D9A441] pl-3">
                  <Link
                    className="text-[#F7F0E7] hover:text-[#D9A441] text-[13px] font-medium transition"
                    to="/my-orders"
                  >
                    Order Tracking
                  </Link>
                </li>

              </ul>

            </div>

          </div>
        </div>

        {/* ---------------- Main header row ---------------- */}

        <div className="header py-3 border-t-[1px] border-gray-200 border-b-[1px] bg-white">

          <div className="container flex flex-wrap items-center justify-between gap-y-2 md:flex-nowrap">

            {/* Logo */}

            <div className="col1 order-1 shrink-0">
              <Link to={"/"}>
                <img
                  className="h-10 sm:h-14 md:h-20"
                  src="/logo1.png"
                  alt="logo"
                />
              </Link>
            </div>

            {/* Icons row */}

            <div className="col3 order-2 md:order-3 flex items-center ml-auto md:ml-0">

              <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">

                {context.isLogin === false ? (

                  <li className="list-none">

                    <Link
                      className="hover:text-[#D9A441] text-[13px] sm:text-[16px] font-medium text-[#2B1B14]"
                      to="/login"
                    >
                      Login
                    </Link>

                    {" / "}

                    <Link
                      className="hover:text-[#D9A441] text-[13px] sm:text-[16px] font-medium text-[#2B1B14]"
                      to="/register"
                    >
                      Register
                    </Link>

                  </li>

                ) : (

                  <>
                    <div
                      className="myAccountWrap flex items-center gap-1 sm:gap-3 cursor-pointer"
                      onClick={handleClick}
                    >

                      <Button className="!w-[36px] !h-[36px] sm:!w-[40px] sm:!h-[40px] !min-w-[36px] sm:!min-w-[40px] !rounded-full !bg-[#F7F0E7]">

                        <FaRegUser className="text-[16px] sm:text-[19px] text-[#2B1B14]" />

                      </Button>

                      <Button className="!hidden lg:!inline-flex">

                        <div className="info flex flex-col">

                          <h4 className="text-[14px] text-[#2B1B14] font-semibold mb-0 capitalize text-left justify-start">
                            {context?.userDetails?.data?.name}
                          </h4>

                          <span className="text-[13px] text-[#D9A441] font-[400] lowercase text-left justify-start">
                            {context?.userDetails?.data?.email}
                          </span>

                        </div>

                      </Button>

                    </div>

                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      slotProps={{
                        paper: {
                          elevation: 0,

                          sx: {
                            overflow: "visible",

                            filter:
                              "drop-shadow(0px 2px 8px rgba(43,27,20,0.28))",

                            mt: 1.5,

                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },

                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform:
                                "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                    >

                      <Link
                        to={"/my-account"}
                        className="w-full block"
                      >

                        <MenuItem
                          onClick={handleClose}
                          className="flex gap-4 !py-3 hover:!bg-[#F7F0E7]"
                        >

                          <FaRegUser className="text-[18px] text-[#2B1B14]" />

                          <span className="text-[14px]">
                            My Account
                          </span>

                        </MenuItem>

                      </Link>

                      <Link
                        to={"/my-orders"}
                        className="w-full block"
                      >

                        <MenuItem
                          onClick={handleClose}
                          className="flex gap-4 !py-2 hover:!bg-[#F7F0E7]"
                        >

                          <BsBagCheck className="text-[18px] text-[#2B1B14]" />

                          <span className="text-[14px]">
                            Orders
                          </span>

                        </MenuItem>

                      </Link>

                      <Link
                        to={"/my-list"}
                        className="w-full block"
                      >

                        <MenuItem
                          onClick={handleClose}
                          className="flex gap-4 !py-2 hover:!bg-[#F7F0E7]"
                        >

                          <FaRegHeart className="text-[18px] text-[#2B1B14]" />

                          <span className="text-[14px]">
                            My List
                          </span>

                        </MenuItem>

                      </Link>

                      <MenuItem
                        onClick={logout}
                        className="flex gap-4 !py-2 hover:!bg-[#F7F0E7]"
                      >

                        <FiLogOut className="text-[18px] text-[#2B1B14]" />

                        <span className="text-[14px]">
                          Logout
                        </span>

                      </MenuItem>

                    </Menu>
                  </>

                )}

                {/* Compare */}

                {/* <li className="hidden sm:list-item">
                  <Tooltip title="Compare">
                    <IconButton aria-label="compare">
                      <StyledBadge badgeContent={4}>
                        <IoIosGitCompare className="text-[#2B1B14]" />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li> */}

                {/* Wishlist */}

                <li>

                  <Tooltip title="Wishlist">

                    <Link to={"/my-list"}>

                      <IconButton aria-label="heart">

                        <StyledBadge
                          badgeContent={
                            context?.myListData?.data?.length
                          }
                        >

                          <IoMdHeart className="text-[#2B1B14]" />

                        </StyledBadge>

                      </IconButton>

                    </Link>

                  </Tooltip>

                </li>

                {/* Cart */}

                <li>

                  <Tooltip title="Cart">

                    <IconButton
                      aria-label="cart"
                      onClick={() => {
                        context.setOpenCartPanel(true);
                      }}
                    >

                      <StyledBadge
                        badgeContent={
                          context?.cartData?.data?.length
                        }
                      >

                        <IoMdCart className="text-[#2B1B14]" />

                      </StyledBadge>

                    </IconButton>

                  </Tooltip>

                </li>

              </ul>

            </div>

            {/* Search bar */}

            <div className="col2 order-3 md:order-2 w-full md:w-[45%] mt-1 md:mt-0">
              <Search />
            </div>

          </div>

        </div>

        {/* ---------------- Category nav ---------------- */}

        <div>

          <nav>

            <div className="container flex flex-col md:flex-row items-stretch md:items-center justify-start gap-2 md:gap-8 !py-2">

              <div className="col_1 w-full md:w-[20%]">

                <Button
                  className="!text-white !bg-[#2B1B14] hover:!bg-[#D9A441] gap-2 w-full !rounded-full !py-2 !normal-case"
                  onClick={openCategoryPanel}
                >

                  <RiMenu2Fill className="gap-4 text-[18px]" />

                  Shop By Category

                  <IoIosArrowDown className="text-[14px] ml-auto font-bold" />

                </Button>

              </div>

              <div className="col_2 z-50 w-full md:w-[80%]">

                {/* Full category links only shown from md breakpoint up */}

                <ul className="hidden md:flex item-center gap-6 nav">

                  {/* Home */}

                  <li className="list-none">

                    <Button className="!py-4 !text-[16px] !capitalize !font-medium !text-[#2B1B14] !transition hover:!text-[#D9A441] hover:!bg-white">

                      <Link to={"/"}>
                        Home
                      </Link>

                    </Button>

                  </li>

                  {/* Categories */}

                  {context?.catData?.length !== 0 &&
                    context?.catData?.map((item, index) => {

                      return (

                        <li
                          className="list-none relative group"
                          key={index}
                        >

                          <Link
                            component={RouterLink}
                            to={`/category/${item.slug}`}
                          >

                            <Button className="!py-4 !text-[16px] !text-[#2B1B14] !capitalize !font-medium !transition hover:!text-[#D9A441] hover:!bg-white">

                              {item.name}

                            </Button>

                          </Link>

                          {/* Submenu */}

                          <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 border-t-2 border-[#D9A441] px-3 py-2 transition-opacity">

                            <ul>

                              {item?.products?.length !== 0 &&
                                item?.products?.map((prod) => (

                                  <li
                                    className="list-none w-full mb-1"
                                    key={prod._id}
                                  >

                                    <Link
                                      to={`/products/${prod.slug}`}
                                      className="hover:!text-[#D9A441] !text-left !justify-start w-full !rounded-none !text-[#2B1B14]"
                                    >

                                      {prod.name}

                                    </Link>

                                  </li>

                                ))}

                            </ul>

                          </div>

                        </li>

                      );

                    })}

                </ul>

              </div>

            </div>

          </nav>

        </div>

        {/* Category Panel */}

        {context?.catData?.length !== 0 && (

          <CategoryPanel
            openCategoryPanel={openCategoryPanel}
            isOpenCatPanel={isOpenCatPanel}
            setIsOpenCatPanel={setIsOpenCatPanel}
            data={context?.catData}
          />

        )}

      </header>
    </>
  );
};

export default Header;