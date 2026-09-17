// import React, { createContext, useEffect, useState } from "react";
// import Header from "./Components/Header";
// import { Link, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
// import ProductList from "./Pages/ProductList";
// import Footer from "./Components/Footer";
// import ProductsDetails from "./Pages/ProductsDetails";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import ProductsZoom from "./Components/productsZoom";
// import { IoCloseSharp } from "react-icons/io5";
// import ProductsDetailsComponents from "./Components/ProductsDetailsComponents";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Drawer from "@mui/material/Drawer";
// import CartPanel from "./Components/CartPanel";
// import CartPages from "./Components/CartPages";
// import Verify from "./Pages/Verify";
// import toast, { Toaster } from "react-hot-toast";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Checkout from "./Pages/Checkout";
// import MyAccount from "./Pages/MyAccount";
// import MyList from "./Pages/MyList";
// import Orders from "./Pages/Orders"
// // import Orders from "./Pages/Orders";
// import axios from "axios";
// // import Address from "./Pages/Address";
// import Address from "./Pages/Address/Address";
// import CategoryPage from "./Pages/CategoryPage";
// import HelpCenter from "./Pages/HelpCenter";

// const MyContext = createContext();
// function App() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [openAddAddress, setOpenAddAddress] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [fullWidth, setFullWidth] = useState(true);
//   const [maxWidth, setMaxWidth] = useState("lg");
//   const [catData, setCatData] = useState([]);
//   const [cartData, setCartData] = useState([]);
//   const [myListData, setMyListData] = useState([]);
//   const [addressMode, setAddressMode] = useState("add");
//   const [addressId, setAddressId] = useState("");
//   const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
//     open: false,
//     data: {},
//   });

//   const toggleCartPanel = (newOpen) => () => {
//     setOpenCartPanel(newOpen);
//   };
//   const toggleAddAddress = (newOpen) => () => {
//     if(newOpen === false){
//       setAddressMode("add")
//     }
//     setOpenAddAddress(newOpen);
//   };

//   const openAlertBox = (status, msg) => {
//     if (status === "success") {
//       toast.success(msg);
//     }
//     if (status === "error") {
//       toast.error(msg);
//     }
//   };
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     if (token !== undefined && token !== null && token !== "") {
//       setIsLogin(true);
//       axios
//         .get(`http://localhost:5000/api/user/user-details`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           setUserDetails(res.data);
//         })
//         .catch((res) => {
//           if (res?.response?.data?.error === true) {
//             if (res?.response?.data?.message === "you have not loing") {
//               localStorage.removeItem("accessToken");
//               localStorage.removeItem("refreshToken");
//               openAlertBox("error", "Session expired. Please login again");
//               setIsLogin(false); // ✅ MUST BE FALSE
//             }
//           }
//         });
//       getCartItems();
//       getMyListData();
//     } else {
//       setIsLogin(false);
//     }
//   }, [isLogin]);

//   const handleClickOpenProductDetailsModal = (status, data) => {
//     setOpenProductDetailsModal({
//       open: status,
//       data: data,
//     });
//   };

//   const handleCloseProductDetailsModal = () => {
//     setOpenProductDetailsModal({
//       open: false,
//       data: {},
//     });
//   };
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/category").then((res) => {
//       setCatData(res.data.data);
//     });
//   }, []);
//   const addToCart = (product, userId, quantity, selectedOptions) => {
//     if (userId === undefined) {
//       openAlertBox("error", "You are not Login please login first");
//       return false;
//     }

//     // ✅ Variation ka extra price calculate karo
//     const variationPrice = Object.values(selectedOptions || {})
//       .flat()
//       .reduce((acc, opt) => acc + (opt?.price || 0), 0);

//     const data = {
//       productTitle: product?.name,
//       image: product?.images[0] || null,
//       rating: product?.rating,
//       price: product?.price,
//       quantity: quantity,
//       subTotal: (product?.price + variationPrice) * quantity, // ✅ Sahi
//       productId: product?._id,
//       userId: userId,
//       catName: product?.catName,
//       slug: product?.slug,
//       variation: selectedOptions || {}, // ✅ Object bhejo
//     };

//     const token = localStorage.getItem("accessToken");
//     axios
//       .post(`http://localhost:5000/api/cart/add`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res?.data?.error !== true) {
//           // ✅ res.data.error check karo
//           openAlertBox("success", res?.data?.message);
//           getCartItems();
//         } else {
//           openAlertBox("error", res?.data?.message);
//         }
//       })
//       .catch((err) => {
//         openAlertBox(
//           "error",
//           err?.response?.data?.message || "Something went wrong!",
//         ); // ✅ catch add kiya
//       });
//   };
//   const getCartItems = () => {
//     const token = localStorage.getItem("accessToken");
//     axios
//       .get(`http://localhost:5000/api/cart/get`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res?.error !== false) {
//           setCartData(res.data);
//         }
//       });
//   };

//   const getMyListData = () => {
//     const token = localStorage.getItem("accessToken");
//     axios
//       .get(`http://localhost:5000/api/my-list`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res?.error !== false) {
//           setMyListData(res.data);
//         }
//       });
//   };
//   const values = {
//     setOpenProductDetailsModal,
//     handleClickOpenProductDetailsModal,
//     setOpenCartPanel,
//     toggleCartPanel,
//     toggleAddAddress,
//     openCartPanel,
//     openAddAddress,
//     setOpenAddAddress,
//     openAlertBox,
//     isLogin,
//     setIsLogin,
//     setUserDetails,
//     userDetails,
//     setCatData,
//     catData,
//     addToCart,
//     cartData,
//     setCartData,
//     getCartItems,
//     myListData,
//     setMyListData,
//     getMyListData,
//     addressMode,
//     setAddressMode,
//     addressId,
//     setAddressId,
//   };
//   return (
//     <>
//       <MyContext.Provider value={values}>
//         <Header />
//         <Routes>
//           <Route path={"/"} exact={true} element={<Home />} />
//           <Route
//             path={"/category/:slug"}
//             exact={true}
//             element={<CategoryPage />} />
//           <Route
//             path={"/products/:id"}
//             exact={true}
//             element={<ProductsDetails />}
//           />
//           <Route path={"/login"} exact={true} element={<Login />} />
//           <Route path={"/register"} exact={true} element={<Register />} />
//           <Route path={"/help-center"} exact={true} element={<HelpCenter/>} />
//           <Route path={"/verify"} exact={true} element={<Verify />} />
//           <Route
//             path={"/forgot-password"}
//             exact={true}
//             element={<ForgotPassword />}
//           />
//           <Route path={"/checkout"} exact={true} element={<CartPages />} />
//           <Route path={"/my-account"} exact={true} element={<MyAccount />} />
//           <Route path={"/my-list"} exact={true} element={<MyList />} />
//           <Route path={"/my-orders"} exact={true} element={<Orders />} />
//           <Route path={"/address"} exact={true} element={<Address />} />
//         </Routes>
//         <Footer />
//       </MyContext.Provider>
//       <Toaster />
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={openProductDetailsModal.open}
//         onClose={handleCloseProductDetailsModal}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="productDetailsModal"
//       >
//         {/* <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle> */}
//         <DialogContent>
//           <div className="flex w-full productDetailsModalContainer relative">
//             <Button
//               className="!w-[40px] !h-[40px] !max-w-[40px] !rounded-full !text-gray-600 !absolute top-[15px] right-[15px] !bg-white"
//               onClick={handleCloseProductDetailsModal}
//             >
//               <IoCloseSharp className="text-2xl" />
//             </Button>
//             {openProductDetailsModal?.data?.length !== 0 && (
//               <>
//                 <div className="col1 w-[40%] px-3">
//                   <ProductsZoom
//                     images={openProductDetailsModal?.data?.images}
//                   />
//                 </div>
//                 <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
//                   <ProductsDetailsComponents
//                     data={openProductDetailsModal?.data}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {/* <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText> */}
//         </DialogContent>
//         {/* <DialogActions>
//           <Button onClick={handleCloseProductDetailsModal}>Disagree</Button>
//           <Button onClick={handleCloseProductDetailsModal} autoFocus>
//             Agree
//           </Button>
//         </DialogActions> */}
//       </Dialog>
//     </>
//   );
// }

// export default App;
// export { MyContext };
// import React, {
//   createContext,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// import Header from "./Components/Header";
// import Footer from "./Components/Footer";

// import { Route, Routes } from "react-router-dom";

// import Home from "./Pages/Home";
// import ProductList from "./Pages/ProductList";
// import ProductsDetails from "./Pages/ProductsDetails";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Verify from "./Pages/Verify";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Checkout from "./Pages/Checkout";
// import MyAccount from "./Pages/MyAccount";
// import MyList from "./Pages/MyList";
// import Orders from "./Pages/Orders";
// import Address from "./Pages/Address/Address";
// import CategoryPage from "./Pages/CategoryPage";
// import HelpCenter from "./Pages/HelpCenter";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";

// import ProductsZoom from "./Components/productsZoom";
// import ProductsDetailsComponents from "./Components/ProductsDetailsComponents";

// import { IoCloseSharp } from "react-icons/io5";

// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

// import Drawer from "@mui/material/Drawer";
// import CartPanel from "./Components/CartPanel";

// const MyContext = createContext();

// /* =========================================================
//    API URL
// ========================================================= */

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000";

// /* =========================================================
//    AXIOS INSTANCE
// ========================================================= */

// const api = axios.create({
//   baseURL: API_URL,
// });

// /* =========================================================
//    APP
// ========================================================= */

// function App() {
//   const [isLogin, setIsLogin] = useState(false);

//   const [openCartPanel, setOpenCartPanel] =
//     useState(false);

//   const [openAddAddress, setOpenAddAddress] =
//     useState(false);

//   const [userDetails, setUserDetails] =
//     useState(null);

//   const [catData, setCatData] = useState([]);

//   const [cartData, setCartData] = useState([]);

//   const [myListData, setMyListData] =
//     useState([]);

//   const [addressMode, setAddressMode] =
//     useState("add");

//   const [addressId, setAddressId] =
//     useState("");

//   const [
//     openProductDetailsModal,
//     setOpenProductDetailsModal,
//   ] = useState({
//     open: false,
//     data: {},
//   });

//   /* =========================================================
//      ALERT
//   ========================================================= */

//   const openAlertBox = useCallback(
//     (status, message) => {
//       if (!message) return;

//       if (status === "success") {
//         toast.success(message);
//       }

//       if (status === "error") {
//         toast.error(message);
//       }
//     },
//     []
//   );

//   /* =========================================================
//      CART DRAWER
//   ========================================================= */

//   const toggleCartPanel = (open) => {
//     setOpenCartPanel(open);
//   };

//   /* =========================================================
//      ADDRESS
//   ========================================================= */

//   const toggleAddAddress = (open) => {
//     if (!open) {
//       setAddressMode("add");
//       setAddressId("");
//     }

//     setOpenAddAddress(open);
//   };

//   /* =========================================================
//      GET USER DETAILS
//   ========================================================= */

//   const getUserDetails = useCallback(async () => {
//     const token =
//       localStorage.getItem("accessToken");

//     if (!token) {
//       setIsLogin(false);
//       setUserDetails(null);
//       return;
//     }

//     try {
//       const res = await api.get(
//         "/api/user/user-details",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res?.data) {
//         setUserDetails(res.data);
//         setIsLogin(true);
//       }
//     } catch (error) {
//       const message =
//         error?.response?.data?.message;

//       if (
//         message === "you have not loing" ||
//         error?.response?.status === 401
//       ) {
//         localStorage.removeItem(
//           "accessToken"
//         );

//         localStorage.removeItem(
//           "refreshToken"
//         );

//         setUserDetails(null);
//         setIsLogin(false);

//         openAlertBox(
//           "error",
//           "Session expired. Please login again."
//         );
//       }
//     }
//   }, [openAlertBox]);

//   /* =========================================================
//      GET CART
//   ========================================================= */

//   const getCartItems = useCallback(
//     async () => {
//       const token =
//         localStorage.getItem("accessToken");

//       if (!token) {
//         setCartData([]);
//         return;
//       }

//       try {
//         const res = await api.get(
//           "/api/cart/get",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (
//           res?.data?.error !== true
//         ) {
//           setCartData(
//             Array.isArray(res?.data)
//               ? res.data
//               : res?.data?.data || []
//           );
//         }
//       } catch (error) {
//         setCartData([]);
//       }
//     },
//     []
//   );

//   /* =========================================================
//      GET MY LIST
//   ========================================================= */

//   const getMyListData = useCallback(
//     async () => {
//       const token =
//         localStorage.getItem("accessToken");

//       if (!token) {
//         setMyListData([]);
//         return;
//       }

//       try {
//         const res = await api.get(
//           "/api/my-list",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (
//           res?.data?.error !== true
//         ) {
//           setMyListData(
//             Array.isArray(res?.data)
//               ? res.data
//               : res?.data?.data || []
//           );
//         }
//       } catch (error) {
//         setMyListData([]);
//       }
//     },
//     []
//   );

//   /* =========================================================
//      CHECK LOGIN
     
//      IMPORTANT:
//      Do NOT put [isLogin] here.
     
//      Otherwise changing isLogin can trigger
//      the whole request again.
//   ========================================================= */

//   useEffect(() => {
//     const initializeApp = async () => {
//       const token =
//         localStorage.getItem("accessToken");

//       if (!token) {
//         setIsLogin(false);
//         setUserDetails(null);
//         return;
//       }

//       await getUserDetails();
//       await getCartItems();
//       await getMyListData();
//     };

//     initializeApp();
//   }, [
//     getUserDetails,
//     getCartItems,
//     getMyListData,
//   ]);

//   /* =========================================================
//      GET CATEGORIES
//   ========================================================= */

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const res = await api.get(
//           "/api/category"
//         );

//         if (
//           res?.data?.data
//         ) {
//           setCatData(res.data.data);
//         }
//       } catch (error) {
//         openAlertBox(
//           "error",
//           "Unable to load categories."
//         );
//       }
//     };

//     getCategories();
//   }, [openAlertBox]);

//   /* =========================================================
//      ADD TO CART
//   ========================================================= */

//   const addToCart = async (
//     product,
//     userId,
//     quantity,
//     selectedOptions
//   ) => {
//     if (!userId) {
//       openAlertBox(
//         "error",
//         "Please login first."
//       );

//       return false;
//     }

//     try {
//       /* ======================================
//          VARIATION PRICE
//       ====================================== */

//       const variationPrice =
//         Object.values(
//           selectedOptions || {}
//         )
//           .flat()
//           .reduce(
//             (total, option) =>
//               total +
//               Number(option?.price || 0),
//             0
//           );

//       /* ======================================
//          PRODUCT PRICE
//       ====================================== */

//       const productPrice =
//         Number(product?.price || 0);

//       const productQuantity =
//         Number(quantity || 1);

//       const finalPrice =
//         productPrice +
//         variationPrice;

//       const data = {
//         productTitle:
//           product?.name || "",

//         image:
//           product?.images?.[0] || null,

//         rating:
//           product?.rating || 0,

//         price: productPrice,

//         quantity: productQuantity,

//         subTotal:
//           finalPrice * productQuantity,

//         productId:
//           product?._id,

//         userId,

//         catName:
//           product?.catName || "",

//         slug:
//           product?.slug || "",

//         variation:
//           selectedOptions || {},
//       };

//       const token =
//         localStorage.getItem(
//           "accessToken"
//         );

//       const res = await api.post(
//         "/api/cart/add",
//         data,
//         {
//           headers: {
//             Authorization:
//               `Bearer ${token}`,
//           },
//         }
//       );

//       if (
//         res?.data?.error !== true
//       ) {
//         openAlertBox(
//           "success",
//           res?.data?.message ||
//             "Product added to cart."
//         );

//         await getCartItems();

//         return true;
//       }

//       openAlertBox(
//         "error",
//         res?.data?.message ||
//           "Unable to add product."
//       );

//       return false;
//     } catch (error) {
//       openAlertBox(
//         "error",
//         error?.response?.data?.message ||
//           "Something went wrong!"
//       );

//       return false;
//     }
//   };

//   /* =========================================================
//      PRODUCT DETAILS MODAL
//   ========================================================= */

//   const handleClickOpenProductDetailsModal = (
//     status,
//     data
//   ) => {
//     setOpenProductDetailsModal({
//       open: status,
//       data: data || {},
//     });
//   };

//   const handleCloseProductDetailsModal = () => {
//     setOpenProductDetailsModal({
//       open: false,
//       data: {},
//     });
//   };

//   /* =========================================================
//      CONTEXT
//   ========================================================= */

//   const values = {
//     setOpenProductDetailsModal,

//     handleClickOpenProductDetailsModal,

//     setOpenCartPanel,

//     toggleCartPanel,

//     openCartPanel,

//     toggleAddAddress,

//     openAddAddress,

//     setOpenAddAddress,

//     openAlertBox,

//     isLogin,

//     setIsLogin,

//     userDetails,

//     setUserDetails,

//     catData,

//     setCatData,

//     addToCart,

//     cartData,

//     setCartData,

//     getCartItems,

//     myListData,

//     setMyListData,

//     getMyListData,

//     addressMode,

//     setAddressMode,

//     addressId,

//     setAddressId,
//   };

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <>
//       <MyContext.Provider value={values}>

//         {/* =====================================
//             HEADER
//         ===================================== */}

//         <Header />

//         {/* =====================================
//             MAIN CONTENT
//         ===================================== */}

//         <main className="min-h-screen bg-white">

//           <Routes>

//             <Route
//               path="/"
//               element={<Home />}
//             />

//             <Route
//               path="/category/:slug"
//               element={<CategoryPage />}
//             />

//             <Route
//               path="/products/:id"
//               element={<ProductsDetails />}
//             />

//             <Route
//               path="/login"
//               element={<Login />}
//             />

//             <Route
//               path="/register"
//               element={<Register />}
//             />

//             <Route
//               path="/verify"
//               element={<Verify />}
//             />

//             <Route
//               path="/forgot-password"
//               element={<ForgotPassword />}
//             />

//             <Route
//               path="/checkout"
//               element={<Checkout />}
//             />

//             <Route
//               path="/my-account"
//               element={<MyAccount />}
//             />

//             <Route
//               path="/my-list"
//               element={<MyList />}
//             />

//             <Route
//               path="/my-orders"
//               element={<Orders />}
//             />

//             <Route
//               path="/address"
//               element={<Address />}
//             />

//             <Route
//               path="/help-center"
//               element={<HelpCenter />}
//             />

//             <Route
//               path="/products"
//               element={<ProductList />}
//             />

//           </Routes>

//         </main>

//         {/* =====================================
//             FOOTER
//         ===================================== */}

//         <Footer />

//       </MyContext.Provider>

//       {/* =========================================
//           TOAST
//       ========================================= */}

//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             borderRadius: "12px",
//             fontSize: "14px",
//           },
//         }}
//       />

//       {/* =========================================
//           PRODUCT DETAILS MODAL
//       ========================================= */}

//       <Dialog
//         fullWidth
//         maxWidth="lg"
//         open={
//           openProductDetailsModal.open
//         }
//         onClose={
//           handleCloseProductDetailsModal
//         }

//         PaperProps={{
//           sx: {
//             width: "100%",
//             maxWidth: "1100px",
//             borderRadius: {
//               xs: "0px",
//               sm: "18px",
//             },
//             margin: {
//               xs: 0,
//               sm: "24px",
//             },
//             overflow: "hidden",
//             maxHeight: {
//               xs: "100vh",
//               sm: "90vh",
//             },
//           },
//         }}
//       >

//         <DialogContent
//           sx={{
//             padding: 0,
//           }}
//         >

//           {/* ===================================
//               MODAL CONTAINER
//           =================================== */}

//           <div
//             className="
//               relative
//               flex
//               w-full
//               flex-col
//               bg-white

//               lg:flex-row
//             "
//           >

//             {/* =================================
//                 CLOSE BUTTON
//             ================================= */}

//             <Button
//               onClick={
//                 handleCloseProductDetailsModal
//               }

//               className="
//                 !absolute
//                 !right-3
//                 !top-3
//                 sm:!right-4
//                 sm:!top-4

//                 !z-50
//                 !h-10
//                 !w-10
//                 !min-w-10

//                 !rounded-full
//                 !bg-white
//                 !text-gray-700

//                 hover:!bg-gray-100
//               "

//               sx={{
//                 boxShadow:
//                   "0 4px 15px rgba(0,0,0,.10)",
//               }}
//             >
//               <IoCloseSharp
//                 className="text-xl"
//               />
//             </Button>

//             {openProductDetailsModal
//               ?.data &&
//               Object.keys(
//                 openProductDetailsModal.data
//               ).length > 0 && (
//                 <>

//                   {/* =============================
//                       IMAGE
//                   ============================= */}

//                   <div
//                     className="
//                       w-full
//                       bg-gray-50
//                       px-3
//                       pt-12
//                       sm:px-6
//                       sm:pt-14

//                       lg:w-[48%]
//                       lg:px-6
//                       lg:py-8
//                     "
//                   >

//                     <div
//                       className="
//                         flex
//                         min-h-[300px]
//                         items-center
//                         justify-center

//                         sm:min-h-[400px]

//                         lg:min-h-[520px]
//                       "
//                     >

//                       <ProductsZoom
//                         images={
//                           openProductDetailsModal
//                             ?.data
//                             ?.images || []
//                         }
//                       />

//                     </div>

//                   </div>

//                   {/* =============================
//                       CONTENT
//                   ============================= */}

//                   <div
//                     className="
//                       w-full
//                       px-4
//                       pb-6
//                       pt-5

//                       sm:px-6
//                       sm:pb-8

//                       lg:w-[52%]
//                       lg:px-8
//                       lg:py-10
//                       lg:pr-12
//                     "
//                   >

//                     <ProductsDetailsComponents
//                       data={
//                         openProductDetailsModal.data
//                       }
//                     />

//                   </div>

//                 </>
//               )}

//           </div>

//         </DialogContent>

//       </Dialog>

//       {/* =========================================
//           CART DRAWER
//       ========================================= */}

//       <Drawer
//         anchor="right"
//         open={openCartPanel}
//         onClose={() =>
//           toggleCartPanel(false)
//         }

//         PaperProps={{
//           sx: {
//             width: {
//               xs: "100%",
//               sm: "420px",
//               md: "450px",
//             },
//             maxWidth: "100%",
//           },
//         }}
//       >

//         <CartPanel
//           onClose={() =>
//             toggleCartPanel(false)
//           }
//         />

//       </Drawer>

//     </>
//   );
// }

// export default App;

// export { MyContext };

// import React, { createContext, useEffect, useState } from "react";
// import Header from "./Components/Header";
// import { Link, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
// import ProductList from "./Pages/ProductList";
// import Footer from "./Components/Footer";
// import ProductsDetails from "./Pages/ProductsDetails";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import ProductsZoom from "./Components/productsZoom";
// import { IoCloseSharp } from "react-icons/io5";
// import ProductsDetailsComponents from "./Components/ProductsDetailsComponents";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Drawer from "@mui/material/Drawer";
// import CartPanel from "./Components/CartPanel";
// import CartPages from "./Components/CartPages";
// import Verify from "./Pages/Verify";
// import toast, { Toaster } from "react-hot-toast";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Checkout from "./Pages/Checkout";
// import MyAccount from "./Pages/MyAccount";
// import MyList from "./Pages/MyList";
// import Orders from "./Pages/Orders";
// import axios from "axios";
// import Address from "./Pages/Address/Address";
// import CategoryPage from "./Pages/CategoryPage";
// import HelpCenter from "./Pages/HelpCenter";
// // ✅ NEW: mobile-only bottom tab bar
// import MobileBottomNav from "./Components/MobileBottomNav";
// import About from "./Pages/About";
// import Terms from "./Pages/Terms";
// import Contact from "./Pages/Contacts";

// const MyContext = createContext();
// function App() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [openAddAddress, setOpenAddAddress] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [fullWidth, setFullWidth] = useState(true);
//   const [maxWidth, setMaxWidth] = useState("lg");
//   const [catData, setCatData] = useState([]);
//   const [cartData, setCartData] = useState([]);
//   const [myListData, setMyListData] = useState([]);
//   const [addressMode, setAddressMode] = useState("add");
//   const [addressId, setAddressId] = useState("");
//   const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
//     open: false,
//     data: {},
//   });

//   const toggleCartPanel = (newOpen) => () => {
//     setOpenCartPanel(newOpen);
//   };
//   const toggleAddAddress = (newOpen) => () => {
//     if (newOpen === false) {
//       setAddressMode("add");
//     }
//     setOpenAddAddress(newOpen);
//   };

//   const openAlertBox = (status, msg) => {
//     if (status === "success") {
//       toast.success(msg);
//     }
//     if (status === "error") {
//       toast.error(msg);
//     }
//   };
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     if (token !== undefined && token !== null && token !== "") {
//       setIsLogin(true);
//       axios
//         .get(`http://localhost:5000/api/user/user-details`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           setUserDetails(res.data);
//         })
//         .catch((res) => {
//           if (res?.response?.data?.error === true) {
//             if (res?.response?.data?.message === "you have not loing") {
//               localStorage.removeItem("accessToken");
//               localStorage.removeItem("refreshToken");
//               openAlertBox("error", "Session expired. Please login again");
//               setIsLogin(false);
//             }
//           }
//         });
//       getCartItems();
//       getMyListData();
//     } else {
//       setIsLogin(false);
//     }
//   }, [isLogin]);

//   const handleClickOpenProductDetailsModal = (status, data) => {
//     setOpenProductDetailsModal({
//       open: status,
//       data: data,
//     });
//   };

//   const handleCloseProductDetailsModal = () => {
//     setOpenProductDetailsModal({
//       open: false,
//       data: {},
//     });
//   };
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/category").then((res) => {
//       setCatData(res.data.data);
//     });
//   }, []);
//   const addToCart = (product, userId, quantity, selectedOptions) => {
//     if (userId === undefined) {
//       openAlertBox("error", "You are not Login please login first");
//       return false;
//     }

//     const variationPrice = Object.values(selectedOptions || {})
//       .flat()
//       .reduce((acc, opt) => acc + (opt?.price || 0), 0);

//     const data = {
//       productTitle: product?.name,
//       image: product?.images[0] || null,
//       rating: product?.rating,
//       price: product?.price,
//       quantity: quantity,
//       subTotal: (product?.price + variationPrice) * quantity,
//       productId: product?._id,
//       userId: userId,
//       catName: product?.catName,
//       slug: product?.slug,
//       variation: selectedOptions || {},
//     };

//     const token = localStorage.getItem("accessToken");
//     axios
//       .post(`http://localhost:5000/api/cart/add`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res?.data?.error !== true) {
//           openAlertBox("success", res?.data?.message);
//           getCartItems();
//         } else {
//           openAlertBox("error", res?.data?.message);
//         }
//       })
//       .catch((err) => {
//         openAlertBox(
//           "error",
//           err?.response?.data?.message || "Something went wrong!",
//         );
//       });
//   };

//   const getCartItems = () => {
//     const token = localStorage.getItem("accessToken");
//     axios
//       .get(`http://localhost:5000/api/cart/get`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         // ✅ FIX: was checking `res?.error` — axios never puts an `error`
//         // field on the top-level response object, only inside `res.data`.
//         // That made this condition always true regardless of what the API
//         // actually returned. Now matches the same check used in addToCart.
//         if (res?.data?.error !== true) {
//           setCartData(res.data);
//         }
//       })
//       .catch((err) => console.error("getCartItems Error:", err));
//   };

//   const getMyListData = () => {
//     const token = localStorage.getItem("accessToken");
//     axios
//       .get(`http://localhost:5000/api/my-list`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         // ✅ FIX: same `res?.error` -> `res?.data?.error` correction as above.
//         if (res?.data?.error !== true) {
//           setMyListData(res.data);
//         }
//       })
//       .catch((err) => console.error("getMyListData Error:", err));
//   };

//   const values = {
//     setOpenProductDetailsModal,
//     handleClickOpenProductDetailsModal,
//     setOpenCartPanel,
//     toggleCartPanel,
//     toggleAddAddress,
//     openCartPanel,
//     openAddAddress,
//     setOpenAddAddress,
//     openAlertBox,
//     isLogin,
//     setIsLogin,
//     setUserDetails,
//     userDetails,
//     setCatData,
//     catData,
//     addToCart,
//     cartData,
//     setCartData,
//     getCartItems,
//     myListData,
//     setMyListData,
//     getMyListData,
//     addressMode,
//     setAddressMode,
//     addressId,
//     setAddressId,
//   };
//   return (
//     <>
//       <MyContext.Provider value={values}>
//         <Header />

//         {/* ✅ FIX: bottom padding on mobile so the fixed bottom nav never
//             covers the last bit of page content (footer / buttons etc).
//             No effect on md+ screens where the bottom nav is hidden. */}
//         <main className="pb-16 md:pb-0">
//           <Routes>
//             <Route path={"/"} exact={true} element={<Home />} />
//             <Route
//               path={"/category/:slug"}
//               exact={true}
//               element={<CategoryPage />}
//             />
//             <Route
//               path={"/products/:id"}
//               exact={true}
//               element={<ProductsDetails />}
//             />
//             <Route path={"/login"} exact={true} element={<Login />} />
//             <Route path={"/register"} exact={true} element={<Register />} />
//             <Route
//               path={"/help-center"}
//               exact={true}
//               element={<HelpCenter />}
//             />
//             <Route path={"/verify"} exact={true} element={<Verify />} />
//             <Route path={"/about"} exact={true} element={<About />} />
//             <Route path={"/terms"} exact={true} element={<Terms />} />
//             <Route path={"/contact"} exact={true} element={<Contact />} />
//             <Route
//               path={"/forgot-password"}
//               exact={true}
//               element={<ForgotPassword />}
//             />
//             <Route path={"/checkout"} exact={true} element={<CartPages />} />
//             <Route
//               path={"/my-account"}
//               exact={true}
//               element={<MyAccount />}
//             />
//             <Route path={"/my-list"} exact={true} element={<MyList />} />
//             <Route path={"/my-orders"} exact={true} element={<Orders />} />
//             <Route path={"/address"} exact={true} element={<Address />} />
//           </Routes>
//           <Footer />
//         </main>

//         {/* ✅ NEW: mobile-only fixed bottom navigation */}
//         <MobileBottomNav />
//       </MyContext.Provider>

//       <Toaster />

//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={openProductDetailsModal.open}
//         onClose={handleCloseProductDetailsModal}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="productDetailsModal"
//         // ✅ FIX: default MUI dialog margins are too large on small screens
//         // and can push the dialog content off-screen / cause overflow.
//         sx={{
//           "& .MuiDialog-paper": {
//             margin: { xs: "10px", sm: "32px" },
//             width: { xs: "calc(100% - 20px)", sm: "auto" },
//           },
//         }}
//       >
//         <DialogContent>
//           {/* ✅ FIX: fixed w-[40%] / w-[60%] columns had no mobile fallback
//               — the image and content got squeezed side by side on small
//               screens. Now stacks vertically below `sm`, and sits side by
//               side from `sm` up like before. */}
//           <div className="flex flex-col sm:flex-row w-full productDetailsModalContainer relative">
//             <Button
//               className="!w-[36px] !h-[36px] !max-w-[36px] !rounded-full !text-gray-600 !absolute top-[10px] right-[10px] sm:top-[15px] sm:right-[15px] !bg-white !z-10"
//               onClick={handleCloseProductDetailsModal}
//             >
//               <IoCloseSharp className="text-2xl" />
//             </Button>
//             {openProductDetailsModal?.data?.length !== 0 && (
//               <>
//                 <div className="col1 w-full sm:w-[40%] px-3">
//                   <ProductsZoom
//                     images={openProductDetailsModal?.data?.images}
//                   />
//                 </div>
//                 <div className="col2 w-full sm:w-[60%] py-6 px-4 sm:py-8 sm:px-8 sm:pr-16 productContent">
//                   <ProductsDetailsComponents
//                     data={openProductDetailsModal?.data}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default App;
// export { MyContext };
import React, { createContext, useEffect, useState, useRef } from "react";
import Header from "./Components/Header";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Footer from "./Components/Footer";
import ProductsDetails from "./Pages/ProductsDetails";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductsZoom from "./Components/productsZoom";
import { IoCloseSharp } from "react-icons/io5";
import ProductsDetailsComponents from "./Components/ProductsDetailsComponents";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Drawer from "@mui/material/Drawer";
import CartPanel from "./Components/CartPanel";
import CartPages from "./Components/CartPages";
import Verify from "./Pages/Verify";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";
import axios from "axios";
import Address from "./Pages/Address/Address";
import CategoryPage from "./Pages/CategoryPage";
import HelpCenter from "./Pages/HelpCenter";
import MobileBottomNav from "./Components/MobileBottomNav";
import Products from "./Components/allProducts";
import About from "./Pages/About";
import Terms from "./Pages/Terms";
import Contact from "./Pages/Contacts";
const API_URL = import.meta.env.VITE_API_URL
const MyContext = createContext();

// ------------------------------------------------------------
// Small helper: decode a JWT payload WITHOUT any extra library.
// Returns null if the token is missing/malformed instead of throwing.
// ------------------------------------------------------------
const decodeJwt = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(
      base64Payload.replace(/-/g, "+").replace(/_/g, "/")
    );
    return JSON.parse(payload);
  } catch (err) {
    return null;
  }
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);
  const [addressMode, setAddressMode] = useState("add");
  const [addressId, setAddressId] = useState("");
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    data: {},
  });

  // Ref to hold the setTimeout id for the auto-logout timer,
  // so we can clear it on manual logout / re-login.
  const logoutTimerRef = useRef(null);

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };
  const toggleAddAddress = (newOpen) => () => {
    if (newOpen === false) {
      setAddressMode("add");
    }
    setOpenAddAddress(newOpen);
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  // ------------------------------------------------------------
  // ✅ CENTRAL LOGOUT — used by manual logout button, the axios
  // interceptor (401 errors), and the auto-expiry timer below.
  // Ensures every "session ended" path clears the same state.
  // ------------------------------------------------------------
  const forceLogout = (message) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }

    setIsLogin(false);
    setUserDetails(null);
    setCartData([]);
    setMyListData([]);

    if (message) {
      openAlertBox("error", message);
    }
  };

  // ------------------------------------------------------------
  // ✅ AXIOS INTERCEPTOR — catches ANY 401 response from ANY API
  // call in the app (not just user-details) and logs out cleanly.
  // Registered once on mount, removed on unmount.
  // ------------------------------------------------------------
  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          const token = localStorage.getItem("accessToken");
          // Only show the "session expired" message if the user
          // actually had a token (avoids firing on public/login pages).
          if (token) {
            forceLogout("Session expired. Please login again");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, []);

  // ------------------------------------------------------------
  // ✅ AUTO-EXPIRY TIMER — reads the token's own `exp` claim and
  // schedules an automatic logout for the exact moment it expires,
  // instead of waiting for the user to trigger another API call.
  // ------------------------------------------------------------
  const scheduleAutoLogout = (token) => {
    const decoded = decodeJwt(token);

    if (!decoded?.exp) {
      // No exp claim readable — nothing to schedule safely.
      return;
    }

    const expiryTimeMs = decoded.exp * 1000;
    const now = Date.now();
    const msUntilExpiry = expiryTimeMs - now;

    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    if (msUntilExpiry <= 0) {
      // Token already expired (e.g. tab was closed and reopened later)
      forceLogout("Your session has expired. Please login again");
      return;
    }

    logoutTimerRef.current = setTimeout(() => {
      forceLogout("Your session has expired. Please login again");
    }, msUntilExpiry);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      scheduleAutoLogout(token);

      axios
        .get(`${API_URL}/api/user/user-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((res) => {
          // 401s are now handled globally by the interceptor above.
          // This keeps the original specific-message check as a fallback
          // for any non-401 "not logged in" style responses.
          if (
            res?.response?.data?.error === true &&
            res?.response?.data?.message === "you have not loing"
          ) {
            forceLogout("Session expired. Please login again");
          }
        });
      getCartItems();
      getMyListData();
    } else {
      setIsLogin(false);
    }

    // Cleanup timer if component unmounts
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [isLogin]);

  const handleClickOpenProductDetailsModal = (status, data) => {
    setOpenProductDetailsModal({
      open: status,
      data: data,
    });
  };

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      data: {},
    });
  };

  useEffect(() => {
    axios.get(`${API_URL}/api/category`).then((res) => {
      setCatData(res.data.data);
    });
  }, []);

  const addToCart = (product, userId, quantity, selectedOptions) => {
    if (userId === undefined) {
      openAlertBox("error", "You are not Login please login first");
      return false;
    }

    const variationPrice = Object.values(selectedOptions || {})
      .flat()
      .reduce((acc, opt) => acc + (opt?.price || 0), 0);

    const data = {
      productTitle: product?.name,
      image: product?.images[0] || null,
      rating: product?.rating,
      price: product?.price,
      quantity: quantity,
      subTotal: (product?.price + variationPrice) * quantity,
      productId: product?._id,
      userId: userId,
      catName: product?.catName,
      slug: product?.slug,
      variation: selectedOptions || {},
    };

    const token = localStorage.getItem("accessToken");
    axios
      .post(`${API_URL}/api/cart/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.error !== true) {
          openAlertBox("success", res?.data?.message);
          getCartItems();
        } else {
          openAlertBox("error", res?.data?.message);
        }
      })
      .catch((err) => {
        openAlertBox(
          "error",
          err?.response?.data?.message || "Something went wrong!",
        );
      });
  };

  const getCartItems = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${API_URL}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.error !== true) {
          setCartData(res.data);
        }
      })
      .catch((err) => console.error("getCartItems Error:", err));
  };

  const getMyListData = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${API_URL}/api/my-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.error !== true) {
          setMyListData(res.data);
        }
      })
      .catch((err) => console.error("getMyListData Error:", err));
  };

  const values = {
    setOpenProductDetailsModal,
    handleClickOpenProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    toggleAddAddress,
    openCartPanel,
    openAddAddress,
    setOpenAddAddress,
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserDetails,
    userDetails,
    setCatData,
    catData,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
    myListData,
    setMyListData,
    getMyListData,
    addressMode,
    setAddressMode,
    addressId,
    setAddressId,
    forceLogout, // 👈 exposed so Header's logout button can also use it if needed
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <Header />

        <main className="pb-16 md:pb-0">
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route
              path={"/category/:slug"}
              exact={true}
              element={<CategoryPage />}
            />
            <Route
              path={"/products/:id"}
              exact={true}
              element={<ProductsDetails />}
            />
            <Route
              path={"/products"}
              exact={true}
              element={<Products />} />
            
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route
              path={"/help-center"}
              exact={true}
              element={<HelpCenter />}
            />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route path={"/about"} exact={true} element={<About />} />
            <Route path={"/terms"} exact={true} element={<Terms />} />
            <Route path={"/contact"} exact={true} element={<Contact />} />
            <Route
              path={"/forgot-password"}
              exact={true}
              element={<ForgotPassword />}
            />
            <Route path={"/checkout"} exact={true} element={<CartPages />} />
            <Route
              path={"/my-account"}
              exact={true}
              element={<MyAccount />}
            />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
            <Route path={"/address"} exact={true} element={<Address />} />
          </Routes>
          <Footer />
        </main>

        <MobileBottomNav />
      </MyContext.Provider>

      <Toaster />

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModal.open}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
        sx={{
          "& .MuiDialog-paper": {
            margin: { xs: "10px", sm: "32px" },
            width: { xs: "calc(100% - 20px)", sm: "auto" },
          },
        }}
      >
        <DialogContent>
          <div className="flex flex-col sm:flex-row w-full productDetailsModalContainer relative">
            <Button
              className="!w-[36px] !h-[36px] !max-w-[36px] !rounded-full !text-gray-600 !absolute top-[10px] right-[10px] sm:top-[15px] sm:right-[15px] !bg-white !z-10"
              onClick={handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-2xl" />
            </Button>
            {openProductDetailsModal?.data?.length !== 0 && (
              <>
                <div className="col1 w-full sm:w-[40%] px-3">
                  <ProductsZoom
                    images={openProductDetailsModal?.data?.images}
                  />
                </div>
                <div className="col2 w-full sm:w-[60%] py-6 px-4 sm:py-8 sm:px-8 sm:pr-16 productContent">
                  <ProductsDetailsComponents
                    data={openProductDetailsModal?.data}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
export { MyContext };