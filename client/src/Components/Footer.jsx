// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Button, Checkbox, Drawer, FormControlLabel } from "@mui/material";
// import { LiaShippingFastSolid } from "react-icons/lia";
// import { TbTruckReturn } from "react-icons/tb";
// import { IoCloseSharp, IoWalletOutline } from "react-icons/io5";
// import { BsGift } from "react-icons/bs";
// import { BiSupport } from "react-icons/bi";
// import { HiOutlineChatAlt } from "react-icons/hi";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import { FiYoutube } from "react-icons/fi";
// import { PiTiktokLogo } from "react-icons/pi";
// import { MyContext } from "../App";
// import CartPanel from "./CartPanel";

// // ✅ "Sticky footer" (page-bottom pe chipka rahe, chahe content kam ho):
// // Yeh sirf footer se nahi hota — page ke root wrapper me yeh chahiye:
// //
// //   <div className="min-h-screen flex flex-col">
// //     <Header />
// //     <main className="flex-1">...page content...</main>
// //     <Footer />   {/* isi file ka <footer> */}
// //   </div>
// //
// // `min-h-screen flex flex-col` + `main` par `flex-1` — isse footer
// // short pages par bottom se chipka rahega, aur lambi pages par apni
// // jagah normal flow me rahega (position:fixed jaisa overlap nahi karega).

// const perks = [
//   {
//     icon: LiaShippingFastSolid,
//     title: "Free Shipping",
//     desc: "On all orders over AED 100",
//   },
//   {
//     icon: TbTruckReturn,
//     title: "30-Day Returns",
//     desc: "Easy exchange on any product",
//   },
//   {
//     icon: IoWalletOutline,
//     title: "Secure Payment",
//     desc: "All major cards accepted",
//   },
//   {
//     icon: BsGift,
//     title: "Special Gifts",
//     desc: "On your very first order",
//   },
//   {
//     icon: BiSupport,
//     title: "24/7 Support",
//     desc: "Reach us anytime, any day",
//   },
// ];

// const productLinks = [
//   "Price Drops",
//   "New Products",
//   "Best Sellers",
//   "Contact Us",
//   "Sitemap",
//   "Our Stores",
// ];

// const companyLinks = [
//   "Delivery",
//   "Legal Notice",
//   "Terms & Conditions",
//   "About Us",
//   "Secure Payment",
//   "Login",
// ];

// const socials = [
//   { icon: FaFacebookF, label: "Facebook" },
//   { icon: FaInstagram, label: "Instagram" },
//   { icon: FiYoutube, label: "YouTube" },
//   { icon: PiTiktokLogo, label: "TikTok" },
// ];

// const Footer = () => {
//   const year = new Date().getFullYear();

// // const Footer = () => {
//   const context = useContext(MyContext);
//   return (
//     <>
//       {/* <footer className="py-6 bg-white border-b-2">
//         <div className="container">
//           <div className="flex items-center justify-center gap-2 py-8 pb-8 cursor-pointer">
//             <div className="col flex items-center justify-center flex-col group w-[20%]">
//               <LiaShippingFastSolid className="text-[60px] transition-all duration-300 group-hover:text-gray-400 group-hover:-translate-y-3" />
//               <h3 className="text-[18px] font-[600] mt-3">Free Shipping</h3>
//               <p className="text-[13px] font-[500]">
//                 For all Orders Over AED 100
//               </p>
//             </div>
//             <div className="col flex items-center justify-center flex-col group w-[20%]">
//               <TbTruckReturn className="text-[60px] transition-all duration-300 group-hover:text-gray-400 group-hover:-translate-y-3" />
//               <h3 className="text-[18px] font-[600] mt-3">30 Days Returns</h3>
//               <p className="text-[13px] font-[500]">For an Exchange Product</p>
//             </div>
//             <div className="col flex items-center justify-center flex-col group w-[20%]">
//               <IoWalletOutline className="text-[60px] transition-all duration-300 group-hover:text-gray-400 group-hover:-translate-y-3" />
//               <h3 className="text-[18px] font-[600] mt-3">Secured Payment</h3>
//               <p className="text-[13px] font-[500]">Payment Cards Accepted</p>
//             </div>
//             <div className="col flex items-center justify-center flex-col group w-[20%]">
//               <BsGift className="text-[60px] transition-all duration-300 group-hover:text-gray-400 group-hover:-translate-y-3" />
//               <h3 className="text-[18px] font-[600] mt-3">Special Gifts</h3>
//               <p className="text-[13px] font-[500]">Our First Product Order</p>
//             </div>
//             <div className="col flex items-center justify-center flex-col group w-[20%]">
//               <BiSupport className="text-[60px] transition-all duration-300 group-hover:text-gray-400 group-hover:-translate-y-3" />
//               <h3 className="text-[18px] font-[600] mt-3">Support 24/7</h3>
//               <p className="text-[13px] font-[500]">Contact us Anytime</p>
//             </div>
//           </div>
//           <hr />
//           <div className="footer flex py-8">
//             <div className="part1 w-[25%] border-r-2">
//               <h2 className="text-[20px] font-semibold mb-4">Contact Us</h2>
//               <p className="text-[13px] font-[400] pb-4">Dubai In UAE</p>
//               <Link
//                 to="mailto:orders@te.com"
//                 className="hover:text-gray-400 text-black text-[14px]"
//               >
//                 orders@te.com
//               </Link>

//               <span className="text-[20px] font-semibold block w-full mt-3 mb-3 text-black">
//                 (+971) 432-567-82
//               </span>

//               <div className="flex items-center gap-2">
//                 <HiOutlineChatAlt className="text-[40px] text-black" />
//                 <span className="text-[16px] font-[600]">
//                   Online Chat <br />
//                   Get Expert Help
//                 </span>
//               </div>
//             </div>
//             <div className="part2  w-[40%] flex pl-5">
//               <div className="part2_col1 w-[50%]">
//                 <h2 className="text-[18px] font-[600] mb-4">Product</h2>
//                 <ul className="list">
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Prices Drop
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       New Products
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Best Sales
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Contact us
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Sitemap
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Stores
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="part2_col2 w-[50%]">
//                 <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
//                 <ul className="list">
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Delivery
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Legal Notice
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Terms and Conditions Of Use
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       About Us
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Secure Payment
//                     </Link>
//                   </li>
//                   <li className="list-none text-[14px] w-full mb-2">
//                     <Link to="/" className="hover:text-gray-400">
//                       Login
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className='"part3 w-[35%] flex pl-8 flex-col'>
//               <h2 className="text-[18px] font-[600] mb-4">
//                 Subscribe to newsletter
//               </h2>
//               <p className="text-[13px]">
//                 Subscribe to our latest newsletter to get news about special
//                 discounts.
//               </p>
//               <form className="mt-5">
//                 <input
//                   type="text"
//                   className="w-full h-[45px] border outline-none pl-4 rounded-sm pr-4 mb-3 focus:border-gray-400"
//                   placeholder="Your Email Address"
//                 />

//                 <Button className="!bg-black !text-white uppercase !font-[500] !text-[16px] !p-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none">
//                   Subscribe
//                 </Button>

//                 <FormControlLabel
//                   control={<Checkbox className="!text-gray-400" />}
//                   label="I agree to the terms and condistion and the privacy policy"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </footer>

//       <div className="bottomStrip border-t border-gray-400 py-3 bg-white">
//         <div className=" container flex items-center justify-between">
//           <ul className="flex items-center gap-2">
//             <li className="list-none">
//               <Link
//                 to="/"
//                 target="_blank"
//                 className="w-[35px] h-[35px] rounded-full border border-gray-400 flex items-center justify-center group hover:bg-gray-400"
//               >
//                 <FaFacebookF className="text-[15px] group-hover:text-white" />
//               </Link>
//             </li>
//             <li className="list-none">
//               <Link
//                 to="/"
//                 target="_blank"
//                 className="w-[35px] h-[35px] rounded-full border border-gray-400 flex items-center justify-center group hover:bg-gray-400"
//               >
//                 <FaInstagram className="text-[15px] group-hover:text-white" />
//               </Link>
//             </li>
//             <li className="list-none">
//               <Link
//                 to="/"
//                 target="_blank"
//                 className="w-[35px] h-[35px] rounded-full border border-gray-400 flex items-center justify-center group hover:bg-gray-400"
//               >
//                 <FiYoutube className="text-[15px] group-hover:text-white" />
//               </Link>
//             </li>
//             <li className="list-none">
//               <Link
//                 to="/"
//                 target="_blank"
//                 className="w-[35px] h-[35px] rounded-full border border-gray-400 flex items-center justify-center group hover:bg-gray-400"
//               >
//                 <PiTiktokLogo className="text-[15px] group-hover:text-white" />
//               </Link>
//             </li>
//           </ul>

//           <p className="text-[13px] text-center mb-0"> 2025-Teyyar Cake</p>

//           <div className="flex items-center">
//             <img
//               className="h-12 cursor-pointer"
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44wVg7NO_zP2VNplMZqtVOoIGk_RD2y8GnP_lIy5ZeskqH3LOYeech1tSVfzIWlotJQ&usqp=CAU"
//             />
//           </div>
//         </div>
//       </div> */}
//       <footer className="mt-auto bg-[#2B1B14] text-[#F3EDE4]">
//       {/* Perks strip */}
//       <div className="border-b border-white/10">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-8 py-8 sm:py-10">
//             {perks.map(({ icon: Icon, title, desc }) => (
//               <div
//                 key={title}
//                 className="group flex flex-col items-center text-center gap-2 px-1"
//               >
//                 <Icon className="text-3xl sm:text-4xl text-[#E3B23C] transition-transform duration-300 group-hover:-translate-y-1" />
//                 <h3 className="text-[13px] sm:text-[15px] font-semibold tracking-wide">
//                   {title}
//                 </h3>
//                 <p className="text-[11.5px] sm:text-[12.5px] text-[#F3EDE4]/60 leading-snug">
//                   {desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main footer content */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8 md:gap-10">
//           {/* Contact */}
//           <div className="sm:pr-8 sm:border-r sm:border-white/10">
//             <h2 className="font-serif text-[20px] sm:text-[22px] mb-4 text-white">
//               Teyyar Cake
//             </h2>
//             <p className="text-[13px] text-[#F3EDE4]/70 mb-4">Dubai, UAE</p>
//             <Link
//               to="mailto:orders@te.com"
//               className="text-[14px] text-[#F3EDE4]/80 hover:text-[#E3B23C] transition-colors break-all"
//             >
//               orders@te.com
//             </Link>
//             <p className="text-[17px] sm:text-[19px] font-semibold text-white mt-3 mb-4">
//               (+971) 432-567-82
//             </p>
//             <div className="flex items-center gap-3">
//               <HiOutlineChatAlt className="text-3xl text-[#E3B23C] shrink-0" />
//               <span className="text-[13.5px] leading-snug text-[#F3EDE4]/80">
//                 Online Chat
//                 <br />
//                 Get expert help
//               </span>
//             </div>
//           </div>

//           {/* Product links */}
//           <div>
//             <h2 className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-wide mb-4 text-white">
//               Product
//             </h2>
//             <ul className="space-y-2.5">
//               {productLinks.map((label) => (
//                 <li key={label}>
//                   <Link
//                     to="/"
//                     className="text-[13.5px] text-[#F3EDE4]/70 hover:text-[#E3B23C] transition-colors"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company links */}
//           <div>
//             <h2 className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-wide mb-4 text-white">
//               Our Company
//             </h2>
//             <ul className="space-y-2.5">
//               {companyLinks.map((label) => (
//                 <li key={label}>
//                   <Link
//                     to="/"
//                     className="text-[13.5px] text-[#F3EDE4]/70 hover:text-[#E3B23C] transition-colors"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="sm:col-span-2 md:col-span-1">
//             <h2 className="text-[14px] sm:text-[15px] font-semibold uppercase tracking-wide mb-4 text-white">
//               Subscribe to our newsletter
//             </h2>
//             <p className="text-[13px] text-[#F3EDE4]/70 mb-4 leading-relaxed">
//               Get news on special discounts, fresh drops, and seasonal treats.
//             </p>
//             <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
//               <input
//                 type="email"
//                 required
//                 className="w-full h-[44px] rounded-md bg-white/5 border border-white/15 px-4 text-[13.5px] text-white placeholder:text-[#F3EDE4]/40 outline-none focus:border-[#E3B23C] transition-colors"
//                 placeholder="Your email address"
//               />
//               <Button
//                 type="submit"
//                 className="!bg-[#E3B23C] !text-[#2B1B14] !w-full !normal-case !font-semibold !text-[14px] !py-2.5 hover:!bg-[#f0c463] !rounded-md !shadow-none"
//               >
//                 Subscribe
//               </Button>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     size="small"
//                     sx={{
//                       color: "rgba(243,237,228,0.4)",
//                       "&.Mui-checked": { color: "#E3B23C" },
//                     }}
//                   />
//                 }
//                 label={
//                   <span className="text-[11.5px] text-[#F3EDE4]/60">
//                     I agree to the Terms & Conditions and Privacy Policy
//                   </span>
//                 }
//               />
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Bottom strip */}
//       <div className="border-t border-white/10">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 text-center sm:text-left">
//           <ul className="flex items-center gap-2.5 order-2 sm:order-1">
//             {socials.map(({ icon: Icon, label }) => (
//               <li key={label} className="list-none">
//                 <Link
//                   to="/"
//                   target="_blank"
//                   aria-label={label}
//                   className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-colors hover:bg-[#E3B23C] hover:border-[#E3B23C] group"
//                 >
//                   <Icon className="text-[14px] text-[#F3EDE4]/80 group-hover:text-[#2B1B14] transition-colors" />
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <p className="text-[12.5px] text-[#F3EDE4]/60 order-1 sm:order-2">
//             © {year} Teyyar Cake. All rights reserved.
//           </p>

//           <div className="flex items-center gap-2 order-3">
//             <span className="text-[11px] tracking-wide text-[#F3EDE4]/40 uppercase">
//               Secure checkout
//             </span>
//           </div>
//         </div>
//       </div>
//     </footer>
//       <Drawer
//         open={context.openCartPanel}
//         onClose={context.toggleCartPanel(false)}
//         anchor="right"
//         className="!w-[450px] cartPanel"
//       >
//         <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-gray-300">
//           <h4 className="font-semibold">
//             Shopping Cart ({context?.cartData?.data?.length})
//           </h4>
//           <IoCloseSharp
//             className="text-[20px] cursor-pointer"
//             onClick={context.toggleCartPanel(false)}
//           />
//         </div>
//         {context?.cartData?.data?.length !== 0 ? (
//           <CartPanel data={context?.cartData?.data} />
//         ) : (
//           <div className="flex items-center justify-center flex-col gap-3">
//             <img src="/cart.png" className="w-[150px]"/>
//             <h4>Your Cart is Currently Empty</h4>
//             <Button variant="contained" className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200" onClick={context.toggleCartPanel(false)}>Continue Shopping</Button>
//           </div>
//         )}
//       </Drawer>
//     </>
//   );
// };

// export default Footer;
import React, { useContext } from "react";
import { Button, Checkbox, Drawer, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";

import { LiaShippingFastSolid } from "react-icons/lia";
import { TbTruckReturn } from "react-icons/tb";
import { IoCloseSharp, IoWalletOutline } from "react-icons/io5";
import { BsGift } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { HiOutlineChatAlt } from "react-icons/hi";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { FiYoutube } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";

import { MyContext } from "../App";
import CartPanel from "./CartPanel";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL
// -----------------------------------------------------
// FOOTER PERKS
// -----------------------------------------------------

const perks = [
  {
    icon: LiaShippingFastSolid,
    title: "Free Shipping",
    desc: "On orders over AED 100",
  },
  {
    icon: TbTruckReturn,
    title: "30-Day Returns",
    desc: "Easy product exchange",
  },
  {
    icon: IoWalletOutline,
    title: "Secure Payment",
    desc: "100% secure checkout",
  },
  {
    icon: BsGift,
    title: "Special Gifts",
    desc: "Exclusive first-order gifts",
  },
  {
    icon: BiSupport,
    title: "24/7 Support",
    desc: "We're always here to help",
  },
];

// -----------------------------------------------------
// FOOTER LINKS
// -----------------------------------------------------

// const productLinks = [
//   {
//     label: "Price Drops",
//     path: "/products",
//   },
//   {
//     label: "New Products",
//     path: "/products",
//   },
//   {
//     label: "Best Sellers",
//     path: "/products",
//   },
//   {
//     label: "Contact Us",
//     path: "/contact",
//   },
//   {
//     label: "Sitemap",
//     path: "/sitemap",
//   },
//   {
//     label: "Our Stores",
//     path: "/stores",
//   },
// ];


const companyLinks = [
  { label: "Delivery", path: "/my-orders" },
  { label: "About Us", path: "/about" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "Contact Us", path: "/contact" },
  { label: "Login", path: "/login" },
];

// -----------------------------------------------------
// SOCIAL LINKS
// -----------------------------------------------------

const socials = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    url: "#",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    url: "#",
  },
  {
    icon: FiYoutube,
    label: "YouTube",
    url: "#",
  },
  {
    icon: PiTiktokLogo,
    label: "TikTok",
    url: "#",
  },
];

// -----------------------------------------------------
// FOOTER
// -----------------------------------------------------

const Footer = () => {
  const context = useContext(MyContext);

  const year = new Date().getFullYear();

  const cartItems = context?.cartData?.data || [];

  const cartCount = cartItems.length;

  const closeCart = () => {
    context?.toggleCartPanel(false);
  };
const [footerProducts, setFooterProducts] = useState([]);

useEffect(() => {
  axios
    .get(`${API_URL}/api/product/getallproduct`)
    .then((res) => {
      setFooterProducts(res?.data?.product?.slice(0, 6) || []);
    })
    .catch((err) => {
      console.log("Footer products error:", err);
    });
}, []);
  return (
    <>
      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="mt-auto bg-[#24150F] text-[#F7F0E7]">
        {/* =====================================================
            PERKS
        ===================================================== */}

        <section className="border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                lg:grid-cols-5
                gap-6
                sm:gap-8
                lg:gap-4
                py-9
                sm:py-11
              "
            >
              {perks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="
                      group
                      flex
                      flex-col
                      items-center
                      text-center
                      px-2
                      transition-all
                      duration-300
                    "
                >
                  <div
                    className="
                        w-14
                        h-14
                        sm:w-16
                        sm:h-16
                        rounded-full
                        bg-[#D9A441]/10
                        border
                        border-[#D9A441]/20
                        flex
                        items-center
                        justify-center
                        mb-3
                        transition-all
                        duration-300
                        group-hover:bg-[#D9A441]
                        group-hover:border-[#D9A441]
                        group-hover:-translate-y-1
                      "
                  >
                    <Icon
                      className="
                          text-2xl
                          sm:text-3xl
                          text-[#D9A441]
                          transition-colors
                          duration-300
                          group-hover:text-[#24150F]
                        "
                    />
                  </div>

                  <h3
                    className="
                        text-[12px]
                        sm:text-[14px]
                        font-semibold
                        text-white
                        tracking-wide
                      "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                        mt-1
                        text-[10.5px]
                        sm:text-[12px]
                        text-[#F7F0E7]/55
                        leading-relaxed
                      "
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <section>
          <div
            className="
              container
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-10
              sm:py-14
              lg:py-16
            "
          >
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-10
                lg:gap-12
              "
            >
              {/* =================================================
                  BRAND / CONTACT
              ================================================= */}

              <div className="lg:border-r lg:border-white/10 lg:pr-10">
                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    font-serif
                    font-semibold
                    text-white
                    mb-4
                  "
                >
                  Teyyar Cake
                </h2>

                <p
                  className="
                    text-sm
                    text-[#F7F0E7]/60
                    leading-relaxed
                    mb-4
                  "
                >
                  Premium cakes, flowers and gifts delivered across Dubai and
                  UAE.
                </p>

                <div className="space-y-2">
                  <p className="text-sm text-[#F7F0E7]/70">📍 Dubai, UAE</p>

                  <a
                    href="mailto:orders@teyyarcake.com"
                    className="
                      block
                      text-sm
                      text-[#F7F0E7]/75
                      hover:text-[#D9A441]
                      transition-colors
                      break-all
                    "
                  >
                    orders@teyyarcake.com
                  </a>

                  <a
                    href="tel:+97143256782"
                    className="
                      block
                      text-lg
                      font-semibold
                      text-white
                      hover:text-[#D9A441]
                      transition-colors
                    "
                  >
                    +971 4 325 6782
                  </a>
                </div>

                {/* CHAT */}
<Link to={"/help-center"}>
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                  "
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-[#D9A441]/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <HiOutlineChatAlt
                      className="
                        text-xl
                        text-[#D9A441]
                      "
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Online Chat
                    </p>

                    <p
                      className="
                        text-xs
                        text-[#F7F0E7]/50
                      "
                    >
                      Get expert help
                    </p>
                  </div>
                </div>
</Link>
              </div>

              {/* =================================================
                  PRODUCT LINKS
              ================================================= */}
{/* 
              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                    mb-5
                  "
                >
                  Products
                </h3>

                <ul className="space-y-3">
                  {productLinks.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        to={path}
                        className="
                            inline-flex
                            text-sm
                            text-[#F7F0E7]/60
                            hover:text-[#D9A441]
                            hover:translate-x-1
                            transition-all
                            duration-200
                          "
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div>
  <h3
    className="
      text-sm
      font-semibold
      uppercase
      tracking-wider
      text-white
      mb-5
    "
  >
    Products
  </h3>

  <ul className="space-y-3">
    {footerProducts.length > 0 ? (
      footerProducts.map((product) => (
        <li key={product._id}>
          <Link
            to={`/product/${product.slug || product._id}`}
            className="
              inline-flex
              text-sm
              text-[#F7F0E7]/60
              hover:text-[#D9A441]
              hover:translate-x-1
              transition-all
              duration-200
            "
          >
            {product.name}
          </Link>
        </li>
      ))
    ) : (
      <li>
        <span className="text-sm text-[#F7F0E7]/40">
          Loading products...
        </span>
      </li>
    )}

    <li>
      <Link
        to="/products"
        className="
          inline-flex
          text-sm
          font-semibold
          text-[#D9A441]
          hover:text-white
          hover:translate-x-1
          transition-all
          duration-200
        "
      >
        View All Products →
      </Link>
    </li>
  </ul>
</div>

              {/* =================================================
                  COMPANY
              ================================================= */}

              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                    mb-5
                  "
                >
                  Our Company
                </h3>

                <ul className="space-y-3">
                  {companyLinks.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        to={path}
                        className="
                            inline-flex
                            text-sm
                            text-[#F7F0E7]/60
                            hover:text-[#D9A441]
                            hover:translate-x-1
                            transition-all
                            duration-200
                          "
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* =================================================
                  NEWSLETTER
              ================================================= */}

              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                    mb-4
                  "
                >
                  Newsletter
                </h3>

                <p
                  className="
                    text-sm
                    text-[#F7F0E7]/60
                    leading-relaxed
                    mb-5
                  "
                >
                  Subscribe to receive exclusive offers, new product updates and
                  seasonal discounts.
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="
                      w-full
                      h-12
                      rounded-lg
                      bg-white/5
                      border
                      border-white/10
                      px-4
                      text-sm
                      text-white
                      placeholder:text-white/30
                      outline-none
                      focus:border-[#D9A441]
                      focus:bg-white/[0.07]
                      transition-all
                    "
                  />

                  <button
                    type="submit"
                    className="
                      w-full
                      h-12
                      rounded-lg
                      bg-[#D9A441]
                      text-[#24150F]
                      text-sm
                      font-bold
                      hover:bg-[#E8B957]
                      active:scale-[0.98]
                      transition-all
                    "
                  >
                    Subscribe
                  </button>

                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        sx={{
                          color: "rgba(247,240,231,0.35)",
                          padding: "4px",
                          "&.Mui-checked": {
                            color: "#D9A441",
                          },
                        }}
                      />
                    }
                    label={
                      <span
                        className="
                          text-[11px]
                          leading-relaxed
                          text-[#F7F0E7]/50
                        "
                      >
                        I agree to the Terms & Conditions and Privacy Policy.
                      </span>
                    }
                  />
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <section className="border-t border-white/10">
          <div
            className="
              container
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-5
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
            "
          >
            {/* SOCIALS */}

            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="
                      w-9
                      h-9
                      rounded-full
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      bg-white/[0.02]
                      hover:bg-[#D9A441]
                      hover:border-[#D9A441]
                      transition-all
                      duration-200
                      group
                    "
                >
                  <Icon
                    className="
                        text-sm
                        text-white/60
                        group-hover:text-[#24150F]
                        transition-colors
                      "
                  />
                </a>
              ))}
            </div>

            {/* COPYRIGHT */}

            <p
              className="
                text-xs
                text-white/40
                text-center
                order-first
                md:order-none
              "
            >
              © {year} Teyyar Cake. All rights reserved.
            </p>

            {/* SECURE */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                uppercase
                tracking-wider
                text-white/40
              "
            >
              <span>🔒</span>

              <span>Secure Checkout</span>
            </div>
          </div>
        </section>
      </footer>

      {/* =========================================================
          RESPONSIVE CART DRAWER
      ========================================================= */}

      <Drawer
        anchor="right"
        // open={Boolean(context?.openCartPanel)}
        // onClose={closeCart}
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              sm: "420px",
              md: "460px",
            },
            maxWidth: "100%",
            backgroundColor: "#fff",
            overflow: "hidden",
          },
        }}
      >
        <div className="h-full flex flex-col bg-white">
          {/* =====================================================
              CART HEADER
          ===================================================== */}

          <div
            className="
              shrink-0
              h-[68px]
              flex
              items-center
              justify-between
              px-4
              sm:px-5
              border-b
              border-slate-200
              bg-white
            "
          >
            <div>
              <h3
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-slate-900
                "
              >
                Shopping Cart
              </h3>

              <p
                className="
                  text-[11px]
                  sm:text-xs
                  text-slate-400
                  mt-0.5
                "
              >
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close shopping cart"
              className="
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                text-slate-500
                hover:bg-slate-100
                hover:text-slate-900
                transition-all
              "
            >
              <IoCloseSharp
                onClick={context.toggleCartPanel(false)}
                className="text-xl"
              />
            </button>
          </div>

          {/* =====================================================
              CART BODY
          ===================================================== */}

          <div className="flex-1 min-h-0 overflow-hidden">
            {cartCount > 0 ? (
              <CartPanel data={cartItems} />
            ) : (
              <div
                className="
                  h-full
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-6
                  text-center
                "
              >
                <div
                  className="
                    w-28
                    h-28
                    rounded-full
                    bg-[#D9A441]/10
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                >
                  <img
                    src="/cart.png"
                    alt="Empty cart"
                    className="
                      w-20
                      h-20
                      object-contain
                    "
                  />
                </div>

                <h4
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  Your Cart is Empty
                </h4>

                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-2
                    max-w-[280px]
                  "
                >
                  Looks like you haven't added anything to your cart yet.
                </p>

                <button
                  type="button"
                  onClick={closeCart}
                  className="
                    mt-6
                    px-7
                    py-3
                    rounded-lg
                    bg-[#2B1B14]
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-[#3A241B]
                    active:scale-[0.98]
                    transition-all
                  "
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Footer;
