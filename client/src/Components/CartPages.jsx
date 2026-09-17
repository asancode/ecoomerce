// import { Button, Rating } from "@mui/material";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import CartItems from "./CartItems";
// import React, { useContext, useState } from "react";
// import { MyContext } from "../App";
// import Checkout from "../Pages/Checkout";
// import Payment from "../Pages/Payment";
// const steps = ["Cart", "Address", "Checkout"];
// import { Elements,useElements,useStripe } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const cardElementOptions = {
//   style: {
//     base: {
//       fontSize: "14px",
//       color: "#0f172a",
//       fontFamily: "ui-sans-serif, system-ui, sans-serif",
//       "::placeholder": { color: "#94a3b8" },
//     },
//     invalid: { color: "#ef4444" },
//   },
// };

// const API_BASE = "http://localhost:5000/api";
// const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);
// const CartPages = (props) => {
  
//     const token = localStorage.getItem("accessToken");
//   const authHeader = { headers: { Authorization: `Bearer ${token}` } };
//   const [step, setStep] = useState(0);
//    const [errorMsg, setErrorMsg] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [card, setCard] = useState({
//     number: "",
//     expiry: "",
//     cvc: "",
//     name: "",
//   });
//   const [placing, setPlacing] = useState(false);
//   const [address, setAddress] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const context = useContext(MyContext);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   //   const subTotal =
//   //     context?.cartData?.data?.length !== 0
//   //       ? context?.cartData?.data
//   //           ?.map((item) => {
//   //             const variationPrice = Object.values(item?.variation || {})
//   //               .flat()
//   //               .reduce((acc, opt) => acc + (opt?.price || 0), 0);
//   //             return (item.price + variationPrice) * item.quantity;
//   //           })
//   //           .reduce((total, value) => total + value, 0)
//   //       : 0;
//   // const shipping = paymentMethod === "cod" ? 49 : 0;
//   //   const tax = parseFloat((subTotal+shipping) * 0.05).toFixed(3); // ✅ 5% VAT
//   //   const total = subTotal + tax + shipping;
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

//   // ✅ Shipping charge: Dubai me free, baaki Emirates/states me fixed charge
//   const DUBAI_ALIASES = ["dubai"]; // agar API me alag spelling/case aata hai to yahan add karo
//   const SHIPPING_CHARGE = 25; // AED - apni actual rate daal dena
//   const COD_CHARGE = 49; // AED - COD select karne par extra

//   const customerState = (selectedAddress?.state || selectedAddress?.city || "")
//     .toString()
//     .trim()
//     .toLowerCase();

//   const isDubai = DUBAI_ALIASES.includes(customerState);

//   const shipping = isDubai ? 0 : SHIPPING_CHARGE;
//   const codCharge = paymentMethod === "cod" ? COD_CHARGE : 0;

//   // ✅ VAT hamesha number ke roop me rakho, string mat banao
//   const tax = parseFloat(((subTotal + shipping + codCharge) * 0.05).toFixed(2));

//   const total = subTotal + shipping + codCharge + tax;
//   const [formFields, setFormFields] = useState({
//     // ✅ Fix 3: setFormsFields → setFormFields
//     address_line1: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     mobile: "",
//     userId: "",
//     landmark: "",
//     addressType: "",
//   });
//   const validateAddress = () => {
//     if (!selectedAddress
//       // !selectedAddress?.address_line1?.trim() ||
//       // !selectedAddress?.city?.trim() ||
//       // !selectedAddress?.state?.trim() ||
//       // !selectedAddress?.pincode?.trim() ||
//       // !selectedAddress?.country?.trim() ||
//       // !selectedAddress?.mobile?.trim() ||
//       // !selectedAddress?.landmark?.trim() ||
//       // !selectedAddress?.addressType?.trim()
//     ) {
//       context.openAlertBox("Please fill all address fields before continuing.");
//       return false;
//     }
//     return true;
//   };
//   const goNext = () => {
//     if (step === 1 && !validateAddress()) return;
//     setStep((s) => Math.min(s + 1, 2));
//   }; // ✅ Tax included total
//   const placeOrder = () => {
//     setPlacing(true);
//     // Yahan real app me Stripe PaymentIntent confirm hoga (card) ya
//     // seedha order create hoga (COD). Neeche diye backend code me
//     // actual API call ka tareeka hai.
//     setTimeout(() => {
//       setPlacing(false);
//       setOrderPlaced(true);
//     }, 1400);
//   };
//   if (orderPlaced) {
//     return (
//       <div className="min-h-[500px] flex items-center justify-center bg-slate-50 p-6">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
//           <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
//             ✓
//           </div>
//           <h2 className="text-xl font-semibold text-slate-900">Order confirm ho gaya</h2>
//           <p className="text-slate-500 mt-2 text-sm">
//             {paymentMethod === "cod"
//               ? "Aapka order Cash on Delivery ke saath place ho gaya hai."
//               : "Aapka payment successful raha aur order place ho gaya hai."}
//           </p>
//           <div className="mt-6 bg-slate-50 rounded-xl p-4 text-left text-sm space-y-1">
//             <p className="text-slate-500">Total paid</p>
//             <p className="text-lg font-semibold text-slate-900">₹{total.toLocaleString("en-IN")}</p>
//           </div>
          

//           <button
//             onClick={() => {
//               setOrderPlaced(false);
//               setStep(0);
//             }}
//             className="mt-6 w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 transition"
//           >
//             Naya order shuru karein
//           </button>
//         </div>
//       </div>
//     );
//   }
//    const clearCartLocally = () => {
//       if (context?.setCartData) {
//         context.setCartData((prev) => ({ ...prev, data: [] }));
//       }
//       if (context?.getCartData) {
//         context.getCartData(); // agar context me cart re-fetch function hai
//       }
//     };
  
//     const buildOrderProducts = () =>
//       props.products.map((item) => ({
//         productId: item.productId || item._id,
//         productTitle: item.productTitle || item.name,
//         quantity: item.quantity,
//         price: item.price,
//         image: item.image,
//         subTotal: item.subTotal,
//         slug: item.slug,
//         catName: item.catName,
//         variation: item.variation,
//       }));
  
//     const handleCardPay = async (e) => {
//       e.preventDefault();
//       if (!stripe || !elements) return;
  
//       if (!selectedAddress) {
//         context.openAlertBox("error", "Pehle delivery address select karein");
//         return;
//       }
  
//       setPlacing(true);
//       setErrorMsg("");
  
//       try {
//         // 1) Backend se PaymentIntent banwao
//         const { data: intentRes } = await axios.post(
//           `${API_BASE}/payment/create-payment-intent`,
//           { totalAmt: props.totalAmt, products: buildOrderProducts() },
//           authHeader
//         );
  
//         if (!intentRes.success) {
//           throw new Error(intentRes.message);
//         }
  
//         // 2) Stripe.js se card confirm karo
//         const cardElement = elements.getElement(CardElement);
//         const result = await stripe.confirmCardPayment(intentRes.clientSecret, {
//           payment_method: { card: cardElement },
//         });
  
//         if (result.error) {
//           setErrorMsg(result.error.message);
//           setPlacing(false);
//           return;
//         }
  
//         if (result.paymentIntent.status === "succeeded") {
//           // 3) Payment verified hone ke baad backend par order create karo
//           const { data: orderRes } = await axios.post(
//             `${API_BASE}/order/create`,
//             {
//               products: buildOrderProducts(),
//               delivery_address: selectedAddress,
//               totalAmt: props.totalAmt,
//               paymentMethod: "card",
//               paymentIntentId: result.paymentIntent.id,
//             },
//             authHeader
//           );
  
//           if (!orderRes.success) throw new Error(orderRes.message);
  
//           context.openAlertBox("success", "Payment successful, order placed!");
//           clearCartLocally();
//           props.onOrderPlaced?.(orderRes.data);
//         }
//       } catch (err) {
//         setErrorMsg(err.response?.data?.message || err.message || "Payment fail ho gaya");
//       } finally {
//         setPlacing(false);
//       }
//     };
  
//     const handleCod = async () => {
//       if (!selectedAddress) {
//         context.openAlertBox("error", "Pehle delivery address select karein");
//         return;
//       }
  
//       setPlacing(true);
//       setErrorMsg("");
//       try {
//         const { data: orderRes } = await axios.post(
//           `${API_BASE}/order/create`,
//           {
//             products: buildOrderProducts(),
//             delivery_address: selectedAddress,
//             totalAmt: props.totalAmt,
//             paymentMethod: "cod",
//           },
//           authHeader
//         );
  
//         if (!orderRes.success) throw new Error(orderRes.message);
  
//         context.openAlertBox("success", "Order placed with Cash on Delivery!");
//         clearCartLocally();
//         props.onOrderPlaced?.(orderRes.data);
//       } catch (err) {
//         setErrorMsg(err.response?.data?.message || err.message || "Order place nahi ho paaya");
//       } finally {
//         setPlacing(false);
//       }
//     };
//   return (
//     <section className="min-h-[600px] bg-slate-50 p-4 sm:p-8 ">
//       {/* <div className="leftPart w-[70%]  ">
          
//           <div className="shadow-md rounded-md bg-gray-50">
//             <div className="py-2 px-3 border-b border-gray-300">
//               <h2 className="text-[18px] font-semibold">Your Cart</h2>
//           <p className="mt-0 mb-3">
//             There are <span className="font-bold text-gray-800">{context?.cartData?.data?.length }</span>{" "}
//             products in your cart
//           </p>
//             </div>
//             {
//               context?.cartData?.data?.length !== 0 ? context?.cartData?.data?.map((item,index)=>{
//                 return(

//                   <Checkout variation={item?.selectedOptions} qty={item?.quantity} data={item} key={index}/>
//                 )
//               })
//               :
              
//             <>
//              <div className="flex items-center pb-8 justify-center flex-col gap-2">
//             <img src="/cart.png" className="w-[150px]"/>
//             <h4>Your Cart is Currently Empty</h4>
//             <Link to={"/"}>
//             <Button variant="contained" className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200" onClick={context.toggleCartPanel(false)}>Continue Shopping</Button>
//             </Link>
//           </div>
//             </>
//             }
//           </div>
//           </div> */}
//       <div className="max-w-2xl mx-auto">
//         <div className="flex items-center justify-center mb-8">
//           {steps.map((label, i) => (
//             <React.Fragment key={label}>
//               <div className="flex flex-col items-center gap-1.5">
//                 <div
//                   className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition
//                     ${
//                       i < step
//                         ? "bg-emerald-500 text-white"
//                         : i === step
//                           ? "bg-slate-900 text-white ring-4 ring-slate-200"
//                           : "bg-white text-slate-400 border border-slate-300"
//                     }`}
//                 >
//                   {i < step ? "✓" : i + 1}
//                 </div>
//                 <span
//                   className={`text-xs font-medium ${
//                     i <= step ? "text-slate-900" : "text-slate-400"
//                   }`}
//                 >
//                   {label}
//                 </span>
//               </div>
//               {i < steps.length - 1 && (
//                 <div
//                   className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition ${
//                     i < step ? "bg-emerald-500" : "bg-slate-200"
//                   }`}
//                 />
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//         {step === 0 && (
//           <div className="shadow-md rounded-md bg-gray-50">
//             <div className="py-2 px-3 border-b border-gray-300">
//               <h2 className="text-[18px] font-semibold">Your Cart</h2>
//               <p className="mt-0 mb-3">
//                 There are{" "}
//                 <span className="font-bold text-gray-800">
//                   {context?.cartData?.data?.length}
//                 </span>{" "}
//                 products in your cart
//               </p>
//             </div>
//             {context?.cartData?.data?.length !== 0 ? (
//               context?.cartData?.data?.map((item, index) => {
//                 return (
//                   <CartItems
//                     variation={item?.selectedOptions}
//                     qty={item?.quantity}
//                     data={item}
//                     key={index}
//                   />
//                 );
//               })
//             ) : (
//               <>
//                 <div className="flex items-center pb-8 justify-center flex-col gap-2">
//                   <img src="/cart.png" className="w-[150px]" />
//                   <h4>Your Cart is Currently Empty</h4>
//                   <Link to={"/"}>
//                     <Button
//                       variant="contained"
//                       className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200"
//                       onClick={context.toggleCartPanel(false)}
//                     >
//                       Continue Shopping
//                     </Button>
//                   </Link>
//                 </div>
//               </>
//             )}

//             <div className="px-4 border-t border-slate-200 pt-4 flex items-center flex-row justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 Subtotal
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(subTotal || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>
//             <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 5% VAT
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(tax || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>
//             <div className="border-t px-4 pt-4 -mb-5 border-slate-200 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 Total
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(total || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>
//             <div className="flex gap-3 py-3 px-3">
//               <button
//                 disabled={context?.cartData?.data?.length === 0}
//                 onClick={goNext}
//                 className="mt-5 w-full bg-slate-900 disabled:bg-slate-300 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition"
//               >
//                 Proceed to address
//               </button>
//             </div>
//           </div>
//         )}
//         {step === 1 && (
//           <div className="shadow-md rounded-md bg-gray-50">
//             <Checkout
//               formFields={formFields}
//               setFormFields={setFormFields}
//               selectedAddress={selectedAddress}
//               setSelectedAddress={setSelectedAddress}
//             />

//             <div className="mt-6 flex gap-3 py-4 px-3">
//               <button
//                 onClick={() => setStep(0)}
//                 className="flex-1 border border-slate-300 text-slate-700 rounded-lg py-3 text-sm font-medium hover:bg-slate-50 transition"
//               >
//                 Back to cart
//               </button>
//               <button
//                 onClick={goNext}
//                 className="flex-1 bg-slate-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition"
//               >
//                 Continue to checkout
//               </button>
//             </div>
//           </div>
//         )}
//         {step === 2 &&(
          
//           <div className="shadow-md bg-white">
//             {/* <Payment
//               paymentMethod={paymentMethod}
//               setPaymentMethod={setPaymentMethod}
//               address={selectedAddress}
//             /> */}
//              <Elements stripe={stripePromise}>
//                 <Payment
//                   paymentMethod={paymentMethod}
//                   setPaymentMethod={setPaymentMethod}
//                   cardElementOptions={cardElementOptions}
//                   address={selectedAddress?._id} // ✅ delivery_address ObjectId chahiye, poora object nahi
//                   products={context?.cartData?.data || []}
//                   totalAmt={total} // pehle se calculate kiya hua total
//                   onOrderPlaced={(order) => setPlacedOrder(order)}
//                 />
//               </Elements>
//             <div className="bg-white border-t border-slate-200 p-3 mb-5 text-xs text-slate-500">
//               Deliver to:{" "}
//               {selectedAddress ? (
//                 <span className="text-slate-700 font-medium">
//                   {[
//                     selectedAddress?.address_line1,
//                     selectedAddress?.city,
//                     selectedAddress?.state,
//                     selectedAddress?.pincode,
//                     selectedAddress?.country,
//                     selectedAddress?.landmark,
//                   ]
//                     .filter(Boolean)
//                     .join(", ")}
//                 </span>
//               ) : (
//                 <span className="text-red-500">Address Not selected</span>
//               )}
//             </div>
//             <div className="mt-6 flex gap-3 py-4 px-3">
//               {paymentMethod === "cod" && (
//                 <div className="mb-5 border border-amber-200 bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
//                   {codCharge.toLocaleString("en-US", {
//                     style: "currency",
//                     currency: "AED",
//                   })}{" "}
//                   will be added as COD charge to your order.
//                 </div>
//               )}
//             </div>
//             <div className="px-4 border-t border-slate-200 pt-4 flex items-center flex-row justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 Subtotal
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(subTotal || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>

//             <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 Shipping
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(shipping || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>
//             <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 5% VAT
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(tax || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>
//             <div className="border-t px-4 pt-4 -mb-5 border-slate-200 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">
//                 Total
//               </span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(total || 0).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "AED",
//                 })}
//               </span>
//             </div>
//             <div className="mt-6 flex gap-3 py-4 px-3">
//               <button
//                 onClick={() => setStep(1)}
//                 className="flex-1 border border-slate-300 text-slate-700 rounded-lg py-3 text-sm font-medium hover:bg-slate-50 transition"
//               >
//                 Back
//               </button>
              
//           <button
//             type="submit"
//             disabled={!stripe || placing}
//             className="w-full bg-slate-900 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2"
//           >
//             {placing ? (
//               <>
//                 <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               "Pay now"
//             )}
//           </button>
//               {/* <button
//                 onClick={placeOrder}
//                 disabled={placing}
//                 className="flex-1 bg-slate-900 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2"
//               >
//                 {placing ? (
//                   <>
//                     <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                     Processing...
//                   </>
//                 ) : paymentMethod === "cod" ? (
//                   "Place order (COD)"
//                 ) : (
//                   `Pay ${total.toLocaleString("en-US", {
//                     style: "currency",
//                     currency: "AED",
//                   })}`
//                 )}
//               </button> */}
//             </div>
//           </div>
          
//         )}
//       </div>
//       {/* <div className="min-h-[600px] bg-slate-50 p-4 sm:p-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Stepper */}

//       {/* </div>
//         </div> */}

//       {/* <div className="rightPart w-[30%]">
//           <div className="shadow-md rounded-md bg-gray-50 p-5 sticky top-[250px] z-[90]">
//             <h3 className="pb-4 font-semibold text-[18px]">Cart Total</h3>
//             <hr/>
//             <p className="flex items-center justify-between pb-1 mt-2">
//               <span className="text-[14px] text-gray-700 font-semibold">Subtotal</span>
//               <span className="text-gray-700 font-semibold">{(subTotal || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}</span>
//             </p>
//             <p className="flex items-center justify-between pb-1">
//               <span className="text-[14px] text-gray-700 font-semibold">Shipping</span>
//               <span className="text-gray-900 font-semibold">Free</span>
//             </p>
//             <p className="flex items-center justify-between pb-1">
//               <span className="text-[14px] text-gray-700 font-semibold">Estimate for</span>
//               <span className="text-gray-900 font-semibold">UAE</span>
//             </p>
//             <p className="flex items-center justify-between pb-1">
//               <span className="text-[14px] text-gray-700 font-semibold">5% VAT</span>
//               <span className="text-gray-700 font-semibold">{tax.toLocaleString("en-US", { style: "currency", currency: "AED" })}</span>
//             </p>
//             <p className="flex items-center justify-between pb-1">
//               <span className="text-[14px] text-gray-700 font-semibold">Total</span>
//               <span className="text-gray-700 font-semibold">{total.toLocaleString("en-US", { style: "currency", currency: "AED" })}</span>
//             </p>
//             <div className="mt-5">
//              <Link to={'/checkout'} className=''><Button className='!bg-gray-600 w-full !text-white !text-[14px] !px-6 !py-2 hover:!bg-gray-400  border-none hover:!border-none !font-semibold !flex !text-center gap-2'> <BsFillBagCheckFill className="text-[17px]"/> Checkout</Button></Link>
//             </div>
//           </div>
//         </div> */}
//     </section>
//   );
// };

// export default CartPages;


// import { Button, Rating } from "@mui/material";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import CartItems from "./CartItems";
// import React, { useContext, useState } from "react";
// import { MyContext } from "../App";
// import Checkout from "../Pages/Checkout";
// import Payment from "../Pages/Payment";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const steps = ["Cart", "Address", "Checkout"];

// const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

// const CartPages = (props) => {
//   const [step, setStep] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   // ✅ Order object yahan store hota hai jab Payment.jsx real order place kar deta hai
//   const [placedOrder, setPlacedOrder] = useState(null);

//   const context = useContext(MyContext);

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

//   const DUBAI_ALIASES = ["dubai"];
//   const SHIPPING_CHARGE = 25;
//   const COD_CHARGE = 49;

//   const customerState = (selectedAddress?.state || selectedAddress?.city || "")
//     .toString()
//     .trim()
//     .toLowerCase();

//   const isDubai = DUBAI_ALIASES.includes(customerState);
//   const shipping = isDubai ? 0 : SHIPPING_CHARGE;
//   const codCharge = paymentMethod === "cod" ? COD_CHARGE : 0;
//   const tax = parseFloat(((subTotal + shipping + codCharge) * 0.05).toFixed(2));
//   const total = subTotal + shipping + codCharge + tax;

//   const [formFields, setFormFields] = useState({
//     address_line1: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     mobile: "",
//     userId: "",
//     landmark: "",
//     addressType: "",
//   });

//   const validateAddress = () => {
//     if (!selectedAddress) {
//       context.openAlertBox("error", "Please select a delivery address before continuing.");
//       return false;
//     }
//     return true;
//   };

//   const goNext = () => {
//     if (step === 1 && !validateAddress()) return;
//     setStep((s) => Math.min(s + 1, 2));
//   };

//   // ✅ Order success screen
//   if (placedOrder) {
//     return (
//       <div className="min-h-[500px] flex items-center justify-center bg-slate-50 p-6">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
//           <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
//             ✓
//           </div>
//           <h2 className="text-xl font-semibold text-slate-900">Order confirm ho gaya</h2>
//           <p className="text-slate-500 mt-2 text-sm">Order ID: {placedOrder.orderId}</p>
//           <p className="text-slate-500 text-sm">
//             {placedOrder.payment_status === "CASH ON DELIVERY"
//               ? "Aapka order Cash on Delivery ke saath place ho gaya hai."
//               : "Aapka payment successful raha aur order place ho gaya hai."}
//           </p>
//           <div className="mt-6 bg-slate-50 rounded-xl p-4 text-left text-sm space-y-1">
//             <p className="text-slate-500">Total paid</p>
//             <p className="text-lg font-semibold text-slate-900">
//               {(placedOrder.totalAmt || 0).toLocaleString("en-US", {
//                 style: "currency",
//                 currency: "AED",
//               })}
//             </p>
//           </div>
//           <Link to="/my-orders">
//           <button
//             onClick={() => {
//               setPlacedOrder(null);
//               setStep(0);
//               setSelectedAddress(null);
//             }}
//             className="mt-6 w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 transition"
//           >
//             Order Details
//           </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-[600px] bg-slate-50 p-4 sm:p-8 ">
//       <div className="max-w-2xl mx-auto">
//         {/* Stepper */}
//         <div className="flex items-center justify-center mb-8">
//           {steps.map((label, i) => (
//             <React.Fragment key={label}>
//               <div className="flex flex-col items-center gap-1.5">
//                 <div
//                   className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition
//                     ${
//                       i < step
//                         ? "bg-emerald-500 text-white"
//                         : i === step
//                           ? "bg-slate-900 text-white ring-4 ring-slate-200"
//                           : "bg-white text-slate-400 border border-slate-300"
//                     }`}
//                 >
//                   {i < step ? "✓" : i + 1}
//                 </div>
//                 <span
//                   className={`text-xs font-medium ${
//                     i <= step ? "text-slate-900" : "text-slate-400"
//                   }`}
//                 >
//                   {label}
//                 </span>
//               </div>
//               {i < steps.length - 1 && (
//                 <div
//                   className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition ${
//                     i < step ? "bg-emerald-500" : "bg-slate-200"
//                   }`}
//                 />
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* STEP 0: CART */}
//         {step === 0 && (
//           <div className="shadow-md rounded-md bg-gray-50">
//             <div className="py-2 px-3 border-b border-gray-300">
//               <h2 className="text-[18px] font-semibold">Your Cart</h2>
//               <p className="mt-0 mb-3">
//                 There are{" "}
//                 <span className="font-bold text-gray-800">
//                   {context?.cartData?.data?.length}
//                 </span>{" "}
//                 products in your cart
//               </p>
//             </div>
//             {context?.cartData?.data?.length !== 0 ? (
//               context?.cartData?.data?.map((item, index) => (
//                 <CartItems
//                   variation={item?.selectedOptions}
//                   qty={item?.quantity}
//                   data={item}
//                   key={index}
//                 />
//               ))
//             ) : (
//               <div className="flex items-center pb-8 justify-center flex-col gap-2">
//                 <img src="/cart.png" className="w-[150px]" />
//                 <h4>Your Cart is Currently Empty</h4>
//                 <Link to={"/"}>
//                   <Button
//                     variant="contained"
//                     className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200"
//                     onClick={context.toggleCartPanel(false)}
//                   >
//                     Continue Shopping
//                   </Button>
//                 </Link>
//               </div>
//             )}

//             <div className="px-4 border-t border-slate-200 pt-4 flex items-center flex-row justify-between">
//               <span className="text-base text-slate-600 font-semibold">Subtotal</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(subTotal || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div>
//             <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">5% VAT</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(tax || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div>
//             <div className="border-t px-4 pt-4 -mb-5 border-slate-200 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">Total</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(total || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div>
//             <div className="flex gap-3 py-3 px-3">
//               <button
//                 disabled={context?.cartData?.data?.length === 0}
//                 onClick={goNext}
//                 className="mt-5 w-full bg-slate-900 disabled:bg-slate-300 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition"
//               >
//                 Proceed to address
//               </button>
//             </div>
//           </div>
//         )}

//         {/* STEP 1: ADDRESS */}
//         {step === 1 && (
//           <div className="shadow-md rounded-md bg-gray-50">
//             <Checkout
//               formFields={formFields}
//               setFormFields={setFormFields}
//               selectedAddress={selectedAddress}
//               setSelectedAddress={setSelectedAddress}
//             />

//             <div className="mt-6 flex gap-3 py-4 px-3">
//               <button
//                 onClick={() => setStep(0)}
//                 className="flex-1 border border-slate-300 text-slate-700 rounded-lg py-3 text-sm font-medium hover:bg-slate-50 transition"
//               >
//                 Back to cart
//               </button>
//               <button
//                 onClick={goNext}
//                 className="flex-1 bg-slate-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition"
//               >
//                 Continue to checkout
//               </button>
//             </div>
//           </div>
//         )}

//         {/* STEP 2: CHECKOUT — asli Stripe card + asli COD, dono Payment.jsx ke andar hain */}
//         {step === 2 && (
//           <div className="shadow-md bg-white">
//             <Elements stripe={stripePromise}>
//               <Payment
//                 paymentMethod={paymentMethod}
//                 setPaymentMethod={setPaymentMethod}
//                 address={selectedAddress?._id}
//                 products={context?.cartData?.data || []}
//                 totalAmt={total}
//                 selectedAddress={selectedAddress}
//                 onOrderPlaced={(order) => setPlacedOrder(order)}
//               />
//             </Elements>
// {/* 
//             <div className="bg-white border-t border-slate-200 p-3 mb-5 text-xs text-slate-500">
//               Deliver to:{" "}
//               {selectedAddress ? (
//                 <span className="text-slate-700 font-medium">
//                   {[
//                     selectedAddress?.address_line1,
//                     selectedAddress?.city,
//                     selectedAddress?.state,
//                     selectedAddress?.pincode,
//                     selectedAddress?.country,
//                     selectedAddress?.landmark,
//                   ]
//                     .filter(Boolean)
//                     .join(", ")}
//                 </span>
//               ) : (
//                 <span className="text-red-500">Address Not selected</span>
//               )}
//             </div>
//             <div className="px-4 border-t border-slate-200 pt-4 flex items-center flex-row justify-between">
//               <span className="text-base text-slate-600 font-semibold">Subtotal</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(subTotal || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div>

//             <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">Shipping</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(shipping || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div>

//             <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">5% VAT</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(tax || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div>

//             <div className="border-t px-4 pt-4 -mb-5 border-slate-200 flex items-center justify-between">
//               <span className="text-base text-slate-600 font-semibold">Total</span>
//               <span className="text-base font-semibold text-slate-900">
//                 {(total || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
//               </span>
//             </div> */}

//             <div className="flex gap-3 py-3 px-5">
//               <button
//                 onClick={() => setStep(1)}
//                 className="flex-1 w-[50%] border border-slate-300 text-slate-700 rounded-lg py-3 text-sm font-medium hover:bg-slate-50 transition"
//               >
//                 Back
//               </button>
//               {/* ✅ "Pay now" / "Place order (COD)" button yahan nahi hai —
//                  woh Payment.jsx ke andar hi hai, asli Stripe + backend se juda hua */}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CartPages;
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import React, { useContext, useState } from "react";
import { MyContext } from "../App";
import Checkout from "../Pages/Checkout";
import Payment from "../Pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const API_URL = import.meta.env.VITE_API_URL
const steps = ["Cart", "Address", "Checkout"];

const stripePromise = loadStripe(
  import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY,
);

// small helper so every price on this page formats identically
const formatAED = (value) =>
  (value || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "AED",
  });

const CartPages = (props) => {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Order object yahan store hota hai jab Payment.jsx real order place kar deta hai
  const [placedOrder, setPlacedOrder] = useState(null);

  const context = useContext(MyContext);

  const cartItems = context?.cartData?.data || [];
  const isCartEmpty = cartItems.length === 0;

  const subTotal = !isCartEmpty
    ? cartItems
        .map((item) => {
          const variationPrice = Object.values(item?.variation || {})
            .flat()
            .reduce((acc, opt) => acc + (opt?.price || 0), 0);
          return (item.price + variationPrice) * item.quantity;
        })
        .reduce((total, value) => total + value, 0)
    : 0;

  const DUBAI_ALIASES = ["dubai"];
  const SHIPPING_CHARGE = 25;
  const COD_CHARGE = 49;

  const customerState = (selectedAddress?.state || selectedAddress?.city || "")
    .toString()
    .trim()
    .toLowerCase();

  const isDubai = DUBAI_ALIASES.includes(customerState);
  const shipping = isDubai ? 0 : SHIPPING_CHARGE;
  const codCharge = paymentMethod === "cod" ? COD_CHARGE : 0;
  const tax = parseFloat(((subTotal + shipping + codCharge) * 0.05).toFixed(2));
  const total = subTotal + shipping + codCharge + tax;

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    landmark: "",
    addressType: "",
  });

  const validateAddress = () => {
    if (!selectedAddress) {
      context.openAlertBox(
        "error",
        "Please select a delivery address before continuing.",
      );
      return false;
    }
    return true;
  };

  const goNext = () => {
    // ✅ FIX: defensive guard — previously only step 1 (address) was
    // validated before moving on; nothing stopped step 0 -> 1 if the cart
    // was somehow empty (e.g. items removed in another tab).
    if (step === 0 && isCartEmpty) return;
    if (step === 1 && !validateAddress()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  // ============================================================
  // ORDER SUCCESS SCREEN
  // ============================================================
  if (placedOrder) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            Order confirm ho gaya
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Order ID: <span className="text-indigo-600 font-medium">{placedOrder.orderId}</span>
          </p>
          <p className="text-slate-500 text-sm mt-1">
            {placedOrder.payment_status === "CASH ON DELIVERY"
              ? "Aapka order Cash on Delivery ke saath place ho gaya hai."
              : "Aapka payment successful raha aur order place ho gaya hai."}
          </p>

          <div className="mt-6 bg-slate-50 rounded-xl p-4 text-left text-sm space-y-1">
            <p className="text-slate-500">Total paid</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatAED(placedOrder.totalAmt)}
            </p>
          </div>

          <Link to="/my-orders" className="block mt-6">
            <button
              onClick={() => {
                setPlacedOrder(null);
                setStep(0);
                setSelectedAddress(null);
              }}
              className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 transition"
            >
              Order Details
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN
  // ============================================================
  return (
    <section className="min-h-[600px] bg-slate-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* STEPPER */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition
                    ${
                      i < step
                        ? "bg-emerald-500 text-white"
                        : i === step
                          ? "bg-slate-900 text-white ring-4 ring-slate-200"
                          : "bg-white text-slate-400 border border-slate-300"
                    }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i <= step ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 transition ${
                    i < step ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 0: CART */}
        {step === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="py-4 px-4 sm:px-5 border-b border-slate-100">
              <h2 className="text-[18px] font-semibold text-slate-900">
                Your Cart
              </h2>
              <p className="mt-1 mb-0 text-sm text-slate-500">
                There are{" "}
                <span className="font-semibold text-slate-800">
                  {cartItems.length}
                </span>{" "}
                product{cartItems.length === 1 ? "" : "s"} in your cart
              </p>
            </div>

            {!isCartEmpty ? (
              <div className="px-2 sm:px-4">
                {cartItems.map((item, index) => (
                  <CartItems
                    variation={item?.selectedOptions}
                    qty={item?.quantity}
                    data={item}
                    key={item?._id || item?.id || index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center py-10 px-4 justify-center flex-col gap-2 text-center">
                <img src="/cart.png" className="w-[130px] sm:w-[150px]" alt="Empty cart" />
                <h4 className="font-semibold text-slate-800">
                  Your Cart is Currently Empty
                </h4>
                <Link to="/">
                  <Button
                    variant="contained"
                    // ✅ FIX: was `onClick={context.toggleCartPanel(false)}` —
                    // called the function immediately on every render instead
                    // of passing a handler, which could close the cart panel
                    // unexpectedly (or throw if the function wasn't ready yet).
                    onClick={() => context.toggleCartPanel(false)}
                    className="!mt-3 !bg-slate-900 !text-white !font-medium !text-[14px] !py-2.5 !px-5 hover:!bg-slate-800 !normal-case !rounded-lg !shadow-none"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}

            {!isCartEmpty && (
              <>
                <div className="mx-4 sm:mx-5 mt-2 mb-4 bg-slate-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Subtotal</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatAED(subTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">5% VAT</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatAED(tax)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-[15px] font-semibold text-slate-900">
                      Total
                    </span>
                    <span className="text-[15px] font-bold text-indigo-600">
                      {formatAED(total)}
                    </span>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-5">
                  <button
                    onClick={goNext}
                    className="w-full bg-slate-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition"
                  >
                    Proceed to address
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 1: ADDRESS */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-5">
            <Checkout
              formFields={formFields}
              setFormFields={setFormFields}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 border border-slate-300 text-slate-700 rounded-lg py-3 text-sm font-medium hover:bg-slate-50 transition"
              >
                Back to cart
              </button>
              <button
                onClick={goNext}
                className="flex-1 bg-slate-900 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition"
              >
                Continue to checkout
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHECKOUT — asli Stripe card + asli COD, dono Payment.jsx ke andar hain */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5">
              <Elements stripe={stripePromise}>
                <Payment
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  address={selectedAddress?._id}
                  products={cartItems}
                  totalAmt={total}
                  selectedAddress={selectedAddress}
                  onOrderPlaced={(order) => setPlacedOrder(order)}
                />
              </Elements>
            </div>

            {/* ✅ FIX: this order summary was commented out entirely, so at
                the final checkout step the customer couldn't see their
                delivery address or a price breakdown before paying.
                Restored it (with cleaner styling, consistent with the cart
                step above) so people know exactly what they're paying for. */}
            <div className="border-t border-slate-100 p-4 sm:p-5">
              <p className="text-sm text-slate-500 mb-1.5">Deliver to</p>
              {selectedAddress ? (
                <p className="text-[13.5px] text-slate-700 font-medium leading-relaxed">
                  {[
                    selectedAddress?.address_line1,
                    selectedAddress?.city,
                    selectedAddress?.state,
                    selectedAddress?.pincode,
                    selectedAddress?.country,
                    selectedAddress?.landmark,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              ) : (
                <p className="text-[13.5px] text-red-500 font-medium">
                  Address not selected
                </p>
              )}

              <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatAED(subTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Shipping</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {shipping === 0 ? "Free" : formatAED(shipping)}
                  </span>
                </div>
                {codCharge > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">COD Charge</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {formatAED(codCharge)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">5% VAT</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {formatAED(tax)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-[15px] font-semibold text-slate-900">
                    Total
                  </span>
                  <span className="text-[15px] font-bold text-indigo-600">
                    {formatAED(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-5 pb-5">
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto border border-slate-300 text-slate-700 rounded-lg py-2.5 px-6 text-sm font-medium hover:bg-slate-50 transition"
              >
                Back
              </button>
              {/* "Pay now" / "Place order (COD)" button yahan nahi hai —
                 woh Payment.jsx ke andar hi hai, asli Stripe + backend se juda hua */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPages;