// import React, { useContext, useState } from 'react'
// import { MyContext } from '../App';

// const Payment = (props) => {
//      const [paymentMethod, setPaymentMethod] = useState("card");
//   const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
//   const [placing, setPlacing] = useState(false);
//     const context = useContext(MyContext)
//      const extraCost = Object.values(props?.data?.variation || {})
//     .flat()
//     .reduce((acc, opt) => acc + (Number(opt?.price) || 0), 0);
//   // ✅ Yeh upar banao JSX se pehle
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

//   const tax = parseFloat((subTotal * 0.05).toFixed(2)); // ✅ 5% VAT
//   const total = subTotal + tax; 
//   return (
//     <>
//           <div className="w-full mx-auto bg-white p-6 shadow-md">
//               <h2 className="text-lg font-semibold text-slate-900 mb-4">Checkout</h2>
 
//               {/* order summary */}
//               {/* <div className="bg-slate-50 rounded-xl p-4 mb-5 text-sm space-y-1.5"> */}
//                 {/* {context?.cartData?.data.map((i) => (
//                   <div key={i.id} className="flex justify-between text-slate-600">
//                     <span>{i.name} × {i.qty}</span>
//                     <span>₹{(i.price * i.qty).toLocaleString("en-IN")}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between text-slate-600">
//                   <span>Shipping</span>
//                   <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-slate-900 pt-2 border-t border-slate-200 mt-2">
//                   <span>Total</span>
//                   <span>₹{total.toLocaleString("en-IN")}</span>
//                 </div>
//               </div> */}
 
//               {/* <div className="bg-slate-50 rounded-xl p-3 mb-5 text-xs text-slate-500">
//                 Deliver to: <span className="text-slate-700 font-medium">{address.name}, {address.line1}, {address.city}, {address.state} - {address.pincode}</span>
//               </div> */}
 
//               {/* payment method selector */}
//               <p className="text-sm font-medium text-slate-900 mb-2">Payment method</p>
//               <div className="grid grid-cols-2 gap-3 mb-5">
//                 <button
//                   onClick={() => setPaymentMethod("card")}
//                   className={`rounded-xl border p-3 text-left transition ${
//                     paymentMethod === "card"
//                       ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50"
//                       : "border-slate-200 hover:border-slate-300"
//                   }`}
//                 >
//                   <p className="text-sm font-medium text-slate-900">💳 Card</p>
//                   <p className="text-xs text-slate-500 mt-0.5">Credit / Debit via Stripe</p>
//                 </button>
//                 <button
//                   onClick={() => setPaymentMethod("cod")}
//                   className={`rounded-xl border p-3 text-left transition ${
//                     paymentMethod === "cod"
//                       ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50"
//                       : "border-slate-200 hover:border-slate-300"
//                   }`}
//                 >
//                   <p className="text-sm font-medium text-slate-900">💵 Cash on delivery</p>
//                   <p className="text-xs text-slate-500 mt-0.5">Pay when order arrives</p>
//                 </button>
//               </div>
 
//               {/* card fields - shown when Card selected (Stripe Elements style) */}
//               {paymentMethod === "card" && (
//                 // <div className="space-y-3 mb-5 border border-slate-200 rounded-xl p-4">
//                 //   <Field
//                 //     label="Name on card"
//                 //     value={card.name}
//                 //     onChange={(v) => setCard({ ...card, name: v })}
//                 //     placeholder="Rahul Sharma"
//                 //   />
//                 //   <Field
//                 //     label="Card number"
//                 //     value={card.number}
//                 //     onChange={(v) => setCard({ ...card, number: formatCardNumber(v) })}
//                 //     placeholder="4242 4242 4242 4242"
//                 //   />
//                 //   <div className="grid grid-cols-2 gap-3">
//                 //     <Field
//                 //       label="Expiry"
//                 //       value={card.expiry}
//                 //       onChange={(v) => setCard({ ...card, expiry: formatExpiry(v) })}
//                 //       placeholder="MM / YY"
//                 //     />
//                 //     <Field
//                 //       label="CVC"
//                 //       value={card.cvc}
//                 //       onChange={(v) => setCard({ ...card, cvc: v.replace(/\D/g, "").slice(0, 3) })}
//                 //       placeholder="123"
//                 //     />
//                 //   </div>
//                 //   <p className="text-xs text-slate-400 flex items-center gap-1">
//                 //     🔒 Secured by Stripe — card details preview ke liye hain, production me Stripe Elements/CardElement use hota hai
//                 //   </p>
//                 // </div>
//                 <div className="space-y-3 mb-5 border border-slate-200 rounded-xl p-4">
//   <div>
//     <label className="block text-xs font-medium text-slate-600 mb-1">
//       Name on card
//     </label>
//     <input
//       type="text"
//       value={card.name}
//       onChange={(e) => setCard({ ...card, name: e.target.value })}
//       placeholder="Rahul Sharma"
//       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//     />
//   </div>

//   <div>
//     <label className="block text-xs font-medium text-slate-600 mb-1">
//       Card number
//     </label>
//     <input
//       type="text"
//       value={card.number}
//       onChange={(e) =>
//         setCard({ ...card, number: formatCardNumber(e.target.value) })
//       }
//       placeholder="4242 4242 4242 4242"
//       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//     />
//   </div>

//   <div className="grid grid-cols-2 gap-3">
//     <div>
//       <label className="block text-xs font-medium text-slate-600 mb-1">
//         Expiry
//       </label>
//       <input
//         type="text"
//         value={card.expiry}
//         onChange={(e) =>
//           setCard({ ...card, expiry: formatExpiry(e.target.value) })
//         }
//         placeholder="MM / YY"
//         className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//       />
//     </div>
//     <div>
//       <label className="block text-xs font-medium text-slate-600 mb-1">
//         CVC
//       </label>
//       <input
//         type="text"
//         value={card.cvc}
//         onChange={(e) =>
//           setCard({
//             ...card,
//             cvc: e.target.value.replace(/\D/g, "").slice(0, 3),
//           })
//         }
//         placeholder="123"
//         className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//       />
//     </div>
//   </div>

//   <p className="text-xs text-slate-400 flex items-center gap-1">
//     🔒 Secured by Stripe — card details preview ke liye hain, production me Stripe Elements/CardElement use hota hai
//   </p>
// </div>
//               )}
//             </div>
//     </>
//   )
// }

// export default Payment
// import React, { useContext, useState } from 'react'
// import { MyContext } from '../App';

// // helper functions jo pehle missing the
// const formatCardNumber = (value) =>
//   value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

// const formatExpiry = (value) => {
//   const digits = value.replace(/\D/g, "").slice(0, 4);
//   if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
//   return digits;
// };

// const Payment = ({ paymentMethod, setPaymentMethod, data }) => {
//   // ❌ yeh hata do: const [paymentMethod, setPaymentMethod] = useState("card");
//   const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
//   const context = useContext(MyContext);

//   const extraCost = Object.values(data?.variation || {})
//     .flat()
//     .reduce((acc, opt) => acc + (Number(opt?.price) || 0), 0);

//   return (
//     <div className="w-full mx-auto bg-white p-6 shadow-md">
//       <h2 className="text-lg font-semibold text-slate-900 mb-4">Checkout</h2>

//       <p className="text-sm font-medium text-slate-900 mb-2">Payment method</p>
//       <div className="grid grid-cols-2 gap-3 mb-5">
//         <button
//           type="button"
//           onClick={() => setPaymentMethod("card")}
//           className={`rounded-xl border p-3 text-left transition ${
//             paymentMethod === "card"
//               ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50"
//               : "border-slate-200 hover:border-slate-300"
//           }`}
//         >
//           <p className="text-sm font-medium text-slate-900">💳 Card</p>
//           <p className="text-xs text-slate-500 mt-0.5">Credit / Debit via Stripe</p>
//         </button>
//         <button
//           type="button"
//           onClick={() => setPaymentMethod("cod")}
//           className={`rounded-xl border p-3 text-left transition ${
//             paymentMethod === "cod"
//               ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50"
//               : "border-slate-200 hover:border-slate-300"
//           }`}
//         >
//           <p className="text-sm font-medium text-slate-900">💵 Cash on delivery</p>
//           <p className="text-xs text-slate-500 mt-0.5">Pay when order arrives</p>
//         </button>
//       </div>

//       {paymentMethod === "card" && (
//         <div className="space-y-3 mb-5 border border-slate-200 rounded-xl p-4">
//           <div>
//             <label className="block text-xs font-medium text-slate-600 mb-1">Name on card</label>
//             <input
//               type="text"
//               value={card.name}
//               onChange={(e) => setCard({ ...card, name: e.target.value })}
//               placeholder="Rahul Sharma"
//               className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-slate-600 mb-1">Card number</label>
//             <input
//               type="text"
//               value={card.number}
//               onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
//               placeholder="4242 4242 4242 4242"
//               className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-medium text-slate-600 mb-1">Expiry</label>
//               <input
//                 type="text"
//                 value={card.expiry}
//                 onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
//                 placeholder="MM / YY"
//                 className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-medium text-slate-600 mb-1">CVC</label>
//               <input
//                 type="text"
//                 value={card.cvc}
//                 onChange={(e) =>
//                   setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 3) })
//                 }
//                 placeholder="123"
//                 className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
//               />
//             </div>
//           </div>

//           <p className="text-xs text-slate-400 flex items-center gap-1">
//             🔒 Secured by Stripe — card details preview ke liye hain, production me Stripe Elements/CardElement use hota hai
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;

import React, { useContext, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { MyContext } from "../App";

const elementStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "#0f172a",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#ef4444" },
  },
};

const API_URL = import.meta.env.VITE_API_URL

// props: paymentMethod, setPaymentMethod, address (delivery_address _id),
//        products (cart items array), totalAmt, onOrderPlaced
const Payment = (props) => {
 const stripe = useStripe();
  const elements = useElements();
  const context = useContext(MyContext);
 
  const [cardName, setCardName] = useState(""); // ✅ Naam Stripe element nahi hota, normal input hai
  const [placing, setPlacing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 
  const token = localStorage.getItem("accessToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };
 
  const clearCartLocally = () => {
    if (context?.setCartData) context.setCartData((prev) => ({ ...prev, data: [] }));
    if (context?.getCartData) context.getCartData();
  };
 
  const buildOrderProducts = () =>
    props.products.map((item) => ({
      productId: item.productId || item._id,
      productTitle: item.productTitle || item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      subTotal: item.subTotal,
      slug: item.slug,
      catName: item.catName,
      variation: item.variation,
    }));
 
  const handleCardPay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
 
    if (!props.address) {
context.openAlertBox("error", "Please select a delivery address first");
      return;
    }
    if (!cardName.trim()) {
      setErrorMsg("Please enter the name on the card holder");
      return;
    }
 
    setPlacing(true);
    setErrorMsg("");
 
    try {
      // 1) Backend se PaymentIntent banwao
      const { data: intentRes } = await axios.post(
        `${API_URL}/payment/create-payment-intent`,
        { totalAmt: props.totalAmt, products: buildOrderProducts() },
        authHeader
      );
      if (!intentRes.success) throw new Error(intentRes.message);
 
      // 2) Split elements me sirf CardNumberElement pass karte hain —
      //    Stripe khud saath wale Expiry/CVC element ko internally jod leta hai
      const cardNumberElement = elements.getElement(CardNumberElement);
 
      const result = await stripe.confirmCardPayment(intentRes.clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: { name: cardName },
        },
      });
 
      if (result.error) {
        setErrorMsg(result.error.message);
        setPlacing(false);
        return;
      }
 
      if (result.paymentIntent.status === "succeeded") {
        // 3) Order create karo backend par
        const { data: orderRes } = await axios.post(
          `${API_URL}/order/create`,
          {
            products: buildOrderProducts(),
            delivery_address: props.address,
            totalAmt: props.totalAmt,
            paymentMethod: "card",
            paymentIntentId: result.paymentIntent.id,
          },
          authHeader
        );
        if (!orderRes.success) throw new Error(orderRes.message);
 
        context.openAlertBox("success", "Payment successful, order placed!");
        clearCartLocally();
        props.onOrderPlaced?.(orderRes.data);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || "Payment failed, order Not placed");
    } finally {
      setPlacing(false);
    }
  };
 
  const handleCod = async () => {
    if (!props.address) {
      context.openAlertBox("error", "Please select a delivery address first");
      return;
    }
    setPlacing(true);
    setErrorMsg("");
    try {
      const { data: orderRes } = await axios.post(
        `${API_URL}/order/create`,
        {
          products: buildOrderProducts(),
          delivery_address: props.address,
          totalAmt: props.totalAmt,
          paymentMethod: "cod",
        },
        authHeader
      );
      if (!orderRes.success) throw new Error(orderRes.message);
 
      context.openAlertBox("success", "Order placed with Cash on Delivery!");
      clearCartLocally();
      props.onOrderPlaced?.(orderRes.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || "Order place not successful");
    } finally {
      setPlacing(false);
    }
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

  const DUBAI_ALIASES = ["dubai"];
  const SHIPPING_CHARGE = 25;
  const COD_CHARGE = 49;

  const customerState = (props.selectedAddress?.state || props.selectedAddress?.city || "")
    .toString()
    .trim()
    .toLowerCase();

  const isDubai = DUBAI_ALIASES.includes(customerState);
  const shipping = isDubai ? 0 : SHIPPING_CHARGE;
  const codCharge = props.paymentMethod === "cod" ? COD_CHARGE : 0;
  const tax = parseFloat(((subTotal + shipping + codCharge) * 0.05).toFixed(2));
  const total = subTotal + shipping + codCharge + tax;

  return (
    <div className="w-full mx-auto bg-white p-6 ">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Checkout</h2>

      <p className="text-sm font-medium text-slate-900 mb-2">Payment method</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={() => props.setPaymentMethod("card")}
          className={`rounded-xl border p-3 text-left transition ${
            props.paymentMethod === "card"
              ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <p className="text-sm font-medium text-slate-900">💳 Card</p>
          <p className="text-xs text-slate-500 mt-0.5">Credit / Debit via Stripe</p>
        </button>
        <button
          type="button"
          onClick={() => props.setPaymentMethod("cod")}
          className={`rounded-xl border p-3 text-left transition ${
            props.paymentMethod === "cod"
              ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <p className="text-sm font-medium text-slate-900">💵 Cash on delivery</p>
          <p className="text-xs text-slate-500 mt-0.5">Pay when order arrives</p>
        </button>
      </div>

      {props.paymentMethod === "card" && (
        <form onSubmit={handleCardPay} className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4">
            <label className="block text-md font-medium text-slate-600 mb-2">Card details</label>
            <div className="border border-slate-300 rounded-lg px-3 py-2.5">
              {/* <CardElement options={props.cardElementOptions} /> */}
                <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Card holder name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Rahul Sharma"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
 
          {/* Card number - Stripe secure element */}
          <div className="space-y-3 mt-3">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Card Number
            </label>
            <div className="w-full border border-slate-300 rounded-lg px-3 py-2.5">
              <CardNumberElement options={elementStyle} />
            </div>
          </div>
 
          {/* Expiry + CVC - do alag Stripe secure elements */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3 mt-3">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Expiry
              </label>
              <div className="w-full border border-slate-300 rounded-lg px-3 py-2.5">
                <CardExpiryElement options={elementStyle} />
              </div>
            </div>
             <div className="space-y-3 mt-3 mb-3">
              <label className="block text-xs font-medium text-slate-600 mb-1">CVC</label>
              <div className="w-full border border-slate-300 rounded-lg px-3 py-2.5">
                <CardCvcElement options={elementStyle} />
              </div>
            </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              🔒 Secured by Stripe.
            </p>
          </div>
          </div>

          {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
    <div className="bg-white border-t border-slate-200 p-3 mb-5 text-[14px] text-slate-500">
              Deliver to:{" "}
              {props.selectedAddress ? (
                <span className="text-slate-700 text-[14px] font-medium">
                  {[
                    props.selectedAddress?.address_line1,
                    props.selectedAddress?.city,
                    props.selectedAddress?.state,
                    props.selectedAddress?.pincode,
                    props.selectedAddress?.country,
                    props.selectedAddress?.landmark,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                 <p className="text-[14px] text-slate-700 m-0">
                        +{props.selectedAddress?.mobile} 
                      </p>
                </span>
              ) : (
                <span className="text-red-500">Address Not selected</span>
              )}
            </div>
            <div className="px-4 border-t border-slate-200 pt-4 flex items-center flex-row justify-between">
              <span className="text-base text-slate-600 font-semibold">Subtotal</span>
              <span className="text-base font-semibold text-slate-900">
                {(subTotal || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>

            <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
              <span className="text-base text-slate-600 font-semibold">Shipping</span>
              <span className="text-base font-semibold text-slate-900">
                {(shipping || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>

            <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
              <span className="text-base text-slate-600 font-semibold">5% VAT</span>
              <span className="text-base font-semibold text-slate-900">
                {(tax || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>

            <div className="border-t px-4 pt-4 -mb-5 border-slate-200 flex items-center justify-between">
              <span className="text-base text-slate-600 font-semibold">Total</span>
              <span className="text-base font-semibold text-slate-900">
                {(total || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>
          <button
            type="submit"
            disabled={!stripe || placing}
            className="w-full bg-slate-900 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            {placing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Pay now"
            )}
          </button>
        </form>
      )}

      {props.paymentMethod === "cod" && (
        <div className="space-y-4">
              <div className="bg-white border-t border-slate-200 p-3 mb-5 text-xs text-slate-500">
              Deliver to:{" "}
              {props.selectedAddress ? (
                  <span className="text-slate-700 text-md font-medium">
                  {[
                      props.selectedAddress?.address_line1,
                      props.selectedAddress?.city,
                      props.selectedAddress?.state,
                      props.selectedAddress?.pincode,
                      props.selectedAddress?.country,
                      props.selectedAddress?.landmark,
                    ]
                    .filter(Boolean)
                    .join(", ")}
                    <p className="text-[14px] text-slate-700 m-0">
                        +{props.selectedAddress?.mobile} 
                      </p>
                </span>
              ) : (
                  <span className="text-red-500">Address Not selected</span>
                )}
            </div>
                  <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
                   Payment will be made in cash at the time of delivery.
                  </div>
                  {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                      <div className="px-4 border-t border-slate-200 pt-4 flex items-center flex-row justify-between">
              <span className="text-base text-slate-600 font-semibold">Subtotal</span>
              <span className="text-base font-semibold text-slate-900">
                {(subTotal || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>

            <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
              <span className="text-base text-slate-600 font-semibold">Shipping</span>
              <span className="text-base font-semibold text-slate-900">
                {(shipping || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>

            <div className="px-4 border-slate-200 mb-3 flex items-center justify-between">
              <span className="text-base text-slate-600 font-semibold">5% VAT</span>
              <span className="text-base font-semibold text-slate-900">
                {(tax || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>

            <div className="border-t px-4 pt-4 -mb-5 border-slate-200 flex items-center justify-between">
              <span className="text-base text-slate-600 font-semibold">Total</span>
              <span className="text-base font-semibold text-slate-900">
                {(total || 0).toLocaleString("en-US", { style: "currency", currency: "AED" })}
              </span>
            </div>
          <button
            type="button"
            onClick={handleCod}
            disabled={placing}
            className="w-full bg-slate-900 disabled:opacity-60 text-white rounded-lg py-3 text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            {placing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Placing order...
              </>
            ) : (
              "Place order (COD)"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
