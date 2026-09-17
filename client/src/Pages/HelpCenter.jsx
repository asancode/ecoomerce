// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   FiArrowLeft,
//   FiCheckCircle,
//   FiChevronRight,
//   FiClock,
//   FiHelpCircle,
//   FiMessageCircle,
//   FiPackage,
//   FiRefreshCcw,
//   FiSend,
//   FiShoppingBag,
//   FiTruck,
//   FiUser,
//   FiX,
// } from "react-icons/fi";

// const HelpCenter = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: "bot",
//       text: "Hi! 👋 Welcome to our Help Center. How can I help you today?",
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, isTyping]);

//   /* =========================================
//      COMMON HELP TOPICS
//   ========================================= */

//   const helpTopics = [
//     {
//       id: "order",
//       title: "Order Issues",
//       description: "Track, cancel or manage your order",
//       icon: <FiPackage />,
//     },
//     {
//       id: "delivery",
//       title: "Delivery",
//       description: "Questions about delivery",
//       icon: <FiTruck />,
//     },
//     {
//       id: "payment",
//       title: "Payment",
//       description: "Payment or transaction problems",
//       icon: <FiShoppingBag />,
//     },
//     {
//       id: "refund",
//       title: "Refund & Return",
//       description: "Return an item or request a refund",
//       icon: <FiRefreshCcw />,
//     },
//   ];

//   /* =========================================
//      SOLUTIONS
//   ========================================= */

//   const getSolution = (question) => {
//     const text = question.toLowerCase();

//     if (
//       text.includes("track") ||
//       text.includes("where") ||
//       text.includes("delivery") ||
//       text.includes("order")
//     ) {
//       return {
//         title: "Track Your Order",
//         answer:
//           "You can track your order from your Orders section. Open your account, go to My Orders, select the order and check the current delivery status.",
//         steps: [
//           "Open your account",
//           "Go to My Orders",
//           "Select your order",
//           "Check the delivery status",
//         ],
//       };
//     }

//     if (
//       text.includes("cancel") ||
//       text.includes("cancellation")
//     ) {
//       return {
//         title: "Cancel Your Order",
//         answer:
//           "If your order has not been dispatched yet, you may be able to cancel it from your Orders section. If the cancellation option is unavailable, please contact customer support.",
//         steps: [
//           "Open My Orders",
//           "Select the order",
//           "Choose Cancel Order",
//           "Confirm the cancellation",
//         ],
//       };
//     }

//     if (
//       text.includes("refund") ||
//       text.includes("money back")
//     ) {
//       return {
//         title: "Refund Information",
//         answer:
//           "For a refund, first submit a return or refund request from your order details. Once approved, the refund will be processed according to the payment method used.",
//         steps: [
//           "Open My Orders",
//           "Select the relevant order",
//           "Choose Return / Refund",
//           "Submit your request",
//         ],
//       };
//     }

//     if (
//       text.includes("return") ||
//       text.includes("exchange")
//     ) {
//       return {
//         title: "Return & Exchange",
//         answer:
//           "You can request a return or exchange from your order details if the item is eligible. Please make sure the product meets the return conditions.",
//         steps: [
//           "Open My Orders",
//           "Select your product",
//           "Choose Return / Exchange",
//           "Submit the request",
//         ],
//       };
//     }

//     if (
//       text.includes("payment") ||
//       text.includes("pay") ||
//       text.includes("card") ||
//       text.includes("transaction")
//     ) {
//       return {
//         title: "Payment Problem",
//         answer:
//           "If your payment failed, please check your card details, available balance and internet connection. You can also try the payment again using another supported payment method.",
//         steps: [
//           "Check your card details",
//           "Check your available balance",
//           "Try the payment again",
//           "Contact your bank if the issue continues",
//         ],
//       };
//     }

//     if (
//       text.includes("password") ||
//       text.includes("login") ||
//       text.includes("account")
//     ) {
//       return {
//         title: "Account & Login",
//         answer:
//           "If you cannot access your account, use the Forgot Password option on the Login page to receive an OTP and reset your password.",
//         steps: [
//           "Open the Login page",
//           "Click Forgot Password",
//           "Enter your email",
//           "Verify the OTP",
//           "Create a new password",
//         ],
//       };
//     }

//     if (
//       text.includes("hello") ||
//       text.includes("hi") ||
//       text.includes("hey")
//     ) {
//       return {
//         title: "How Can I Help?",
//         answer:
//           "I can help you with orders, delivery, payments, refunds, returns, account issues and other common problems.",
//         steps: [],
//       };
//     }

//     return {
//       title: "Let's Find a Solution",
//       answer:
//         "I couldn't find an exact solution for your question. Please try asking about your order, delivery, payment, refund, return, account or password.",
//       steps: [],
//     };
//   };

//   /* =========================================
//      SEND MESSAGE
//   ========================================= */

//   // const sendMessage = async (customMessage = null) => {
//   //   const message = customMessage || input.trim();

//   //   if (!message || isTyping) return;

//   //   setMessages((prev) => [
//   //     ...prev,
//   //     {
//   //       id: Date.now(),
//   //       type: "user",
//   //       text: message,
//   //     },
//   //   ]);

//   //   setInput("");
//   //   setSelectedTopic(null);
//   //   setIsTyping(true);

//   //   // Simulate support response
//   //   setTimeout(() => {
//   //     const solution = getSolution(message);

//   //     setMessages((prev) => [
//   //       ...prev,
//   //       {
//   //         id: Date.now() + 1,
//   //         type: "bot",
//   //         solution,
//   //       },
//   //     ]);

//   //     setIsTyping(false);
//   //   }, 900);
//   // };
// const sendMessage = async (text = input) => {
//   const message = text.trim();

//   if (!message || isTyping) return;

//   const userMessage = {
//     id: Date.now(),
//     type: "user",
//     text: message,
//   };

//   setMessages((prev) => [
//     ...prev,
//     userMessage,
//   ]);

//   setInput("");
//   setIsTyping(true);

//   try {
//     const previousConversation = messages
//       .filter(
//         (item) =>
//           item.type === "user" ||
//           item.type === "bot"
//       )
//       .slice(-10)
//       .map((item) => ({
//         role:
//           item.type === "user"
//             ? "user"
//             : "assistant",

//         content:
//           item.type === "user"
//             ? item.text
//             : item.solution?.summary ||
//               item.text ||
//               "",
//       }));


//     const response = await axios.post(
//       "http://localhost:5000/api/ai/chat",
//       {
//         message,
//         conversation:
//           previousConversation,
//       },
//       {
//         withCredentials: true,
//       }
//     );


//     if (!response?.data?.success) {
//       throw new Error(
//         response?.data?.message ||
//           "AI response failed"
//       );
//     }


//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now() + 1,
//         type: "bot",
//         text: response.data.reply,
//       },
//     ]);

//   } catch (error) {
//     console.error(
//       "AI chat error:",
//       error
//     );

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now() + 1,
//         type: "bot",
//         text:
//           error?.response?.data?.message ||
//           "Sorry, AI support is temporarily unavailable. Please try again.",
//       },
//     ]);

//   } finally {
//     setIsTyping(false);
//   }
// };
//   /* =========================================
//      TOPIC CLICK
//   ========================================= */

//   const handleTopicClick = (topic) => {
//     setSelectedTopic(topic.id);

//     sendMessage(topic.title);
//   };

//   /* =========================================
//      ENTER KEY
//   ========================================= */

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <section className="min-h-screen bg-slate-50">

//       {/* =========================================
//           HEADER
//       ========================================= */}

//       <div className="border-b border-gray-200 bg-white">

//         <div className="container mx-auto px-4 py-4 sm:px-6">

//           <div className="flex items-center justify-between">

//             <div className="flex items-center gap-3">

//               <div
//                 className="
//                   flex
//                   h-11
//                   w-11
//                   items-center
//                   justify-center
//                   rounded-xl
//                   bg-gradient-to-br
//                   from-blue-600
//                   to-indigo-600
//                   text-white
//                   shadow-lg
//                   shadow-blue-500/20
//                 "
//               >
//                 <FiHelpCircle className="text-xl" />
//               </div>

//               <div>
//                 <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
//                   Help Center
//                 </h1>

//                 <div className="mt-0.5 flex items-center gap-1.5">
//                   <span className="h-2 w-2 rounded-full bg-emerald-500" />

//                   <span className="text-xs text-gray-500">
//                     Support is available
//                   </span>
//                 </div>
//               </div>

//             </div>

//             <div
//               className="
//                 hidden
//                 items-center
//                 gap-2
//                 rounded-full
//                 bg-emerald-50
//                 px-3
//                 py-2
//                 text-xs
//                 font-medium
//                 text-emerald-600
//                 sm:flex
//               "
//             >
//               <FiClock />
//               Quick Support
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* =========================================
//           MAIN
//       ========================================= */}

//       <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8">

//         <div className="mx-auto max-w-6xl">

//           <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

//             {/* =====================================
//                 LEFT SIDEBAR
//             ===================================== */}

//             <aside className="hidden lg:block">

//               <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

//                 <h2 className="mb-1 text-base font-bold text-gray-900">
//                   How can we help?
//                 </h2>

//                 <p className="mb-5 text-xs leading-5 text-gray-500">
//                   Select a topic or describe your problem in the chat.
//                 </p>

//                 <div className="space-y-2">

//                   {helpTopics.map((topic) => (
//                     <button
//                       key={topic.id}
//                       type="button"
//                       onClick={() =>
//                         handleTopicClick(topic)
//                       }
//                       className="
//                         group
//                         flex
//                         w-full
//                         items-center
//                         gap-3
//                         rounded-xl
//                         border
//                         border-transparent
//                         p-3
//                         text-left
//                         transition-all
//                         hover:border-blue-100
//                         hover:bg-blue-50
//                       "
//                     >

//                       <div
//                         className="
//                           flex
//                           h-10
//                           w-10
//                           shrink-0
//                           items-center
//                           justify-center
//                           rounded-xl
//                           bg-blue-50
//                           text-blue-600
//                           transition
//                           group-hover:bg-blue-600
//                           group-hover:text-white
//                         "
//                       >
//                         {topic.icon}
//                       </div>

//                       <div className="min-w-0 flex-1">

//                         <p className="text-sm font-semibold text-gray-800">
//                           {topic.title}
//                         </p>

//                         <p className="mt-0.5 truncate text-[11px] text-gray-500">
//                           {topic.description}
//                         </p>

//                       </div>

//                       <FiChevronRight className="text-gray-400" />

//                     </button>
//                   ))}

//                 </div>

//                 {/* Contact support */}

//                 <div className="mt-5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">

//                   <FiMessageCircle className="mb-3 text-xl" />

//                   <h3 className="text-sm font-bold">
//                     Need more help?
//                   </h3>

//                   <p className="mt-1 text-xs leading-5 text-blue-100">
//                     Our support team can help you with your issue.
//                   </p>

//                   <button
//                     type="button"
//                     className="
//                       mt-3
//                       w-full
//                       rounded-lg
//                       bg-white
//                       px-3
//                       py-2
//                       text-xs
//                       font-bold
//                       text-blue-600
//                       transition
//                       hover:bg-blue-50
//                     "
//                   >
//                     Contact Support
//                   </button>

//                 </div>

//               </div>

//             </aside>

//             {/* =====================================
//                 CHAT AREA
//             ===================================== */}

//             <div
//               className="
//                 flex
//                 min-h-[650px]
//                 flex-col
//                 overflow-hidden
//                 rounded-2xl
//                 border
//                 border-gray-200
//                 bg-white
//                 shadow-sm
//               "
//             >

//               {/* Chat Header */}

//               <div className="border-b border-gray-100 bg-white px-4 py-4 sm:px-6">

//                 <div className="flex items-center gap-3">

//                   <div
//                     className="
//                       flex
//                       h-10
//                       w-10
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-gradient-to-br
//                       from-blue-500
//                       to-indigo-600
//                       text-white
//                     "
//                   >
//                     <FiMessageCircle />
//                   </div>

//                   <div className="flex-1">

//                     <h2 className="text-sm font-bold text-gray-900 sm:text-base">
//                       Support Assistant
//                     </h2>

//                     <div className="flex items-center gap-1.5">

//                       <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

//                       <span className="text-[11px] text-gray-500">
//                         Online · Usually replies instantly
//                       </span>

//                     </div>

//                   </div>

//                   <div className="rounded-full bg-gray-50 px-3 py-1.5 text-[10px] font-medium text-gray-500">
//                     Secure Chat
//                   </div>

//                 </div>

//               </div>

//               {/* =================================
//                   MOBILE TOPICS
//               ================================= */}

//               <div className="border-b border-gray-100 bg-gray-50 p-3 lg:hidden">

//                 <p className="mb-2 text-xs font-semibold text-gray-600">
//                   Popular topics
//                 </p>

//                 <div className="flex gap-2 overflow-x-auto pb-1">

//                   {helpTopics.map((topic) => (
//                     <button
//                       key={topic.id}
//                       type="button"
//                       onClick={() =>
//                         handleTopicClick(topic)
//                       }
//                       className="
//                         flex
//                         shrink-0
//                         items-center
//                         gap-2
//                         rounded-full
//                         border
//                         border-gray-200
//                         bg-white
//                         px-3
//                         py-2
//                         text-xs
//                         font-medium
//                         text-gray-700
//                         shadow-sm
//                         transition
//                         hover:border-blue-300
//                         hover:text-blue-600
//                       "
//                     >
//                       {topic.icon}
//                       {topic.title}
//                     </button>
//                   ))}

//                 </div>

//               </div>

//               {/* =================================
//                   MESSAGES
//               ================================= */}

//               <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">

//                 <div className="mx-auto max-w-3xl space-y-5">

//                   {messages.map((message) => (

//                     <div
//                       key={message.id}
//                       className={`flex ${
//                         message.type === "user"
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >

//                       <div
//                         className={`flex max-w-[90%] gap-2 sm:max-w-[75%] ${
//                           message.type === "user"
//                             ? "flex-row-reverse"
//                             : ""
//                         }`}
//                       >

//                         {/* Avatar */}

//                         <div
//                           className={`
//                             flex
//                             h-8
//                             w-8
//                             shrink-0
//                             items-center
//                             justify-center
//                             rounded-full
//                             ${
//                               message.type === "user"
//                                 ? "bg-gray-800 text-white"
//                                 : "bg-blue-600 text-white"
//                             }
//                           `}
//                         >
//                           {message.type === "user" ? (
//                             <FiUser className="text-sm" />
//                           ) : (
//                             <FiMessageCircle className="text-sm" />
//                           )}
//                         </div>

//                         {/* Message */}

//                         <div>

//                           <div
//                             className={`
//                               rounded-2xl
//                               px-4
//                               py-3
//                               text-sm
//                               leading-6
//                               ${
//                                 message.type === "user"
//                                   ? "rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
//                                   : "rounded-tl-sm border border-gray-200 bg-white text-gray-700 shadow-sm"
//                               }
//                             `}
//                           >
//                             {message.text}
//                           </div>

//                           {/* Solution Card */}

//                           {message.solution && (
//                             <div className="mt-3 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">

//                               <div className="border-b border-blue-50 bg-blue-50/60 px-4 py-3">

//                                 <div className="flex items-center gap-2">

//                                   <FiCheckCircle className="text-blue-600" />

//                                   <h3 className="text-sm font-bold text-gray-900">
//                                     {message.solution.title}
//                                   </h3>

//                                 </div>

//                               </div>

//                               <div className="p-4">

//                                 <p className="text-sm leading-6 text-gray-600">
//                                   {message.solution.answer}
//                                 </p>

//                                 {message.solution.steps.length > 0 && (
//                                   <div className="mt-4">

//                                     <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
//                                       Recommended steps
//                                     </p>

//                                     <div className="space-y-2">

//                                       {message.solution.steps.map(
//                                         (step, index) => (
//                                           <div
//                                             key={index}
//                                             className="flex items-start gap-2"
//                                           >

//                                             <span
//                                               className="
//                                                 flex
//                                                 h-5
//                                                 w-5
//                                                 shrink-0
//                                                 items-center
//                                                 justify-center
//                                                 rounded-full
//                                                 bg-blue-50
//                                                 text-[10px]
//                                                 font-bold
//                                                 text-blue-600
//                                               "
//                                             >
//                                               {index + 1}
//                                             </span>

//                                             <span className="text-xs leading-5 text-gray-600">
//                                               {step}
//                                             </span>

//                                           </div>
//                                         )
//                                       )}

//                                     </div>

//                                   </div>
//                                 )}

//                               </div>

//                             </div>
//                           )}

//                         </div>

//                       </div>

//                     </div>

//                   ))}

//                   {/* Typing */}

//                   {isTyping && (
//                     <div className="flex items-center gap-2">

//                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
//                         <FiMessageCircle className="text-sm" />
//                       </div>

//                       <div className="rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">

//                         <div className="flex gap-1">

//                           <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

//                           <span
//                             className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
//                             style={{ animationDelay: "0.15s" }}
//                           />

//                           <span
//                             className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
//                             style={{ animationDelay: "0.3s" }}
//                           />

//                         </div>

//                       </div>

//                     </div>
//                   )}

//                   <div ref={messagesEndRef} />

//                 </div>

//               </div>

//               {/* =================================
//                   INPUT
//               ================================= */}

//               <div className="border-t border-gray-100 bg-white p-3 sm:p-4">

//                 <div className="mx-auto max-w-3xl">

//                   <div
//                     className="
//                       flex
//                       items-end
//                       gap-2
//                       rounded-2xl
//                       border
//                       border-gray-200
//                       bg-gray-50
//                       p-2
//                       transition
//                       focus-within:border-blue-400
//                       focus-within:bg-white
//                       focus-within:shadow-sm
//                     "
//                   >

//                     <textarea
//                       rows={1}
//                       value={input}
//                       disabled={isTyping}
//                       onChange={(e) =>
//                         setInput(e.target.value)
//                       }
//                       onKeyDown={handleKeyDown}
//                       placeholder="Type your question..."
//                       className="
//                         max-h-28
//                         min-h-[42px]
//                         flex-1
//                         resize-none
//                         border-none
//                         bg-transparent
//                         px-3
//                         py-2.5
//                         text-sm
//                         text-gray-800
//                         outline-none
//                         placeholder:text-gray-400
//                       "
//                     />

//                     <button
//                       type="button"
//                       disabled={
//                         !input.trim() || isTyping
//                       }
//                       onClick={() => sendMessage()}
//                       className="
//                         flex
//                         h-10
//                         w-10
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-xl
//                         bg-gradient-to-r
//                         from-blue-600
//                         to-indigo-600
//                         text-white
//                         shadow-md
//                         transition-all
//                         hover:from-blue-500
//                         hover:to-indigo-500
//                         disabled:cursor-not-allowed
//                         disabled:opacity-40
//                       "
//                     >
//                       <FiSend />
//                     </button>

//                   </div>

//                   <p className="mt-2 text-center text-[10px] text-gray-400">
//                     Press Enter to send · We are here to help
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default HelpCenter;

import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  FiArrowLeft,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiHelpCircle,
  FiMessageCircle,
  FiPackage,
  FiRefreshCcw,
  FiSend,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";
import PageTitle from "../Components/PageTitle";

const API_URL =
  import.meta.env.VITE_API_URL

const HelpCenter = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "bot",
      text: "Hi! 👋 Welcome to our Help Center. I'm your AI support assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  /*
   * =========================================
   * HELP TOPICS
   * =========================================
   */

  const helpTopics = useMemo(
    () => [
      {
        id: "order",
        title: "Order Issues",
        description: "Track, cancel or manage your order",
        icon: <FiPackage />,
        message: "I need help with my order.",
      },
      {
        id: "delivery",
        title: "Delivery",
        description: "Questions about delivery",
        icon: <FiTruck />,
        message: "I have a question about my delivery.",
      },
      {
        id: "payment",
        title: "Payment",
        description: "Payment or transaction problems",
        icon: <FiShoppingBag />,
        message: "I have a payment problem.",
      },
      {
        id: "refund",
        title: "Refund & Return",
        description: "Return an item or request a refund",
        icon: <FiRefreshCcw />,
        message: "I want to request a refund or return.",
      },
    ],
    []
  );

  /*
   * =========================================
   * AUTO SCROLL
   * =========================================
   */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  /*
   * =========================================
   * TEXTAREA AUTO HEIGHT
   * =========================================
   */

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";

    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      140
    )}px`;
  }, [input]);

  /*
   * =========================================
   * FORMAT TIME
   * =========================================
   */

  const formatTime = (date) => {
    if (!date) return "";

    try {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  /*
   * =========================================
   * SEND MESSAGE
   * =========================================
   */

  const sendMessage = async (customMessage = null) => {
    const message = String(customMessage ?? input).trim();

    if (!message || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: message,
      timestamp: new Date(),
    };

    /*
     * Build conversation BEFORE adding the new
     * message to state because React state updates
     * are asynchronous.
     */

    const previousConversation = messages
      .slice(-10)
      .map((item) => ({
        role: item.type === "user" ? "user" : "assistant",
        content:
          item.text ||
          item.solution?.answer ||
          item.solution?.summary ||
          "",
      }))
      .filter((item) => item.content);

    const conversation = [
      ...previousConversation,
      {
        role: "user",
        content: message,
      },
    ];

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setSelectedTopic(null);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_URL}/api/ai/chat`,
        {
          message,
          conversation,
        },
        {
           headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /*
       * Support different possible backend response formats.
       */

      const reply =
        response?.data?.reply ||
        response?.data?.message ||
        response?.data?.data?.reply ||
        response?.data?.data?.message;

      if (!reply) {
        throw new Error(
          response?.data?.message ||
            "The AI did not return a valid response."
        );
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      let errorMessage =
        "Sorry, I'm unable to connect to the AI support service right now. Please try again.";

      if (error?.code === "ECONNABORTED") {
        errorMessage =
          "The AI response took too long. Please try again.";
      } else if (error?.response?.status === 401) {
        errorMessage =
          "Your session has expired. Please login again and try again.";
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          type: "bot",
          text: errorMessage,
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  /*
   * =========================================
   * TOPIC CLICK
   * =========================================
   */

  const handleTopicClick = (topic) => {
    if (isTyping) return;

    setSelectedTopic(topic.id);
    sendMessage(topic.message);
  };

  /*
   * =========================================
   * ENTER KEY
   * =========================================
   */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /*
   * =========================================
   * CLEAR CHAT
   * =========================================
   */

  const clearChat = () => {
    if (isTyping) return;

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        type: "bot",
        text: "Chat cleared successfully. 👋 How can I help you?",
        timestamp: new Date(),
      },
    ]);

    setInput("");
    setSelectedTopic(null);
  };

  return (
      <><PageTitle  title="Help Center"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 text-slate-900">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo / Title */}

          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">
              <FiHelpCircle className="text-xl" />

              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Help Center
              </h1>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[11px] font-medium text-slate-500">
                  AI Support is online
                </span>
              </div>
            </div>
          </div>

          {/* Header Actions */}

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:flex">
              <FiClock className="text-sm" />
              Usually replies instantly
            </div>

            <button
              type="button"
              onClick={clearChat}
              disabled={isTyping}
              title="Clear chat"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiRefreshCcw className="text-sm" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Sidebar Header */}

              <div className="border-b border-slate-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <FiZap />
                </div>

                <h2 className="text-base font-bold">
                  How can we help?
                </h2>

                <p className="mt-1 text-xs leading-5 text-blue-100">
                  Select a topic and our AI assistant will help you find
                  the right solution.
                </p>
              </div>

              {/* Topics */}

              <div className="p-3">
                <div className="space-y-1.5">
                  {helpTopics.map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      disabled={isTyping}
                      onClick={() => handleTopicClick(topic)}
                      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${
                        selectedTopic === topic.id
                          ? "border-blue-200 bg-blue-50"
                          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                          selectedTopic === topic.id
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                        }`}
                      >
                        {topic.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800">
                          {topic.title}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] leading-4 text-slate-500">
                          {topic.description}
                        </p>
                      </div>

                      <FiChevronRight className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Card */}

              <div className="m-3 overflow-hidden rounded-2xl bg-slate-900 p-4 text-white">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <FiMessageCircle />
                </div>

                <h3 className="text-sm font-bold">
                  Need more help?
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Ask the AI anything about your orders, delivery,
                  payments or account.
                </p>

                <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  AI assistant available
                </div>
              </div>
            </div>
          </aside>

          {/* =================================================
              CHAT
          ================================================= */}

          <div className="flex min-h-[calc(100vh-125px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:min-h-[720px]">
            {/* Chat Header */}

            <div className="border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20">
                  <FiMessageCircle className="text-lg" />

                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                      AI Support Assistant
                    </h2>

                    <span className="hidden rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-600 sm:inline-block">
                      AI
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <span className="text-[10px] text-slate-500 sm:text-[11px]">
                      Online · Ready to help
                    </span>
                  </div>
                </div>

                <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-500 sm:block">
                  Secure Chat
                </div>
              </div>
            </div>

            {/* =================================================
                MOBILE TOPICS
            ================================================= */}

            <div className="border-b border-slate-100 bg-slate-50/80 p-3 lg:hidden">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Popular topics
                </p>

                <span className="text-[10px] text-slate-400">
                  Tap to ask
                </span>
              </div>

              <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
                {helpTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    disabled={isTyping}
                    onClick={() => handleTopicClick(topic)}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
                  >
                    <span className="text-blue-600">
                      {topic.icon}
                    </span>

                    {topic.title}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                MESSAGES
            ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">
              <div className="mx-auto max-w-3xl space-y-5">
                {messages.map((message) => {
                  const isUser = message.type === "user";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[94%] gap-2.5 sm:max-w-[82%] ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${
                            isUser
                              ? "bg-slate-800"
                              : "bg-gradient-to-br from-blue-600 to-indigo-600"
                          }`}
                        >
                          {isUser ? (
                            <FiUser className="text-sm" />
                          ) : (
                            <FiMessageCircle className="text-sm" />
                          )}
                        </div>

                        {/* Content */}

                        <div className="min-w-0">
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                              isUser
                                ? "rounded-tr-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                                : message.isError
                                ? "rounded-tl-md border border-red-100 bg-red-50 text-red-700"
                                : "rounded-tl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">
                              {message.text}
                            </p>
                          </div>

                          {/* Timestamp */}

                          {message.timestamp && (
                            <p
                              className={`mt-1 px-1 text-[9px] text-slate-400 ${
                                isUser ? "text-right" : "text-left"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </p>
                          )}

                          {/* Old solution support */}

                          {message.solution && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                              <div className="border-b border-blue-50 bg-blue-50/70 px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <FiCheckCircle className="text-blue-600" />

                                  <h3 className="text-sm font-bold text-slate-900">
                                    {message.solution.title}
                                  </h3>
                                </div>
                              </div>

                              <div className="p-4">
                                <p className="text-sm leading-6 text-slate-600">
                                  {message.solution.answer}
                                </p>

                                {message.solution.steps?.length >
                                  0 && (
                                  <div className="mt-4 space-y-2">
                                    {message.solution.steps.map(
                                      (step, index) => (
                                        <div
                                          key={index}
                                          className="flex items-start gap-2"
                                        >
                                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
                                            {index + 1}
                                          </span>

                                          <span className="text-xs leading-5 text-slate-600">
                                            {step}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* =================================================
                    TYPING INDICATOR
                ================================================= */}

                {isTyping && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
                      <FiMessageCircle className="text-sm" />
                    </div>

                    <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"
                          style={{
                            animationDelay: "0.15s",
                          }}
                        />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-violet-500"
                          style={{
                            animationDelay: "0.3s",
                          }}
                        />

                        <span className="ml-1 text-[10px] font-medium text-slate-400">
                          AI is thinking
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* =================================================
                INPUT AREA
            ================================================= */}

            <div className="border-t border-slate-100 bg-white p-3 sm:p-4">
              <div className="mx-auto max-w-3xl">
                <div
                  className={`flex items-end gap-2 rounded-2xl border bg-slate-50 p-2 transition-all ${
                    isTyping
                      ? "border-slate-200"
                      : "border-slate-200 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-blue-500/5"
                  }`}
                >
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    disabled={isTyping}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      isTyping
                        ? "AI is preparing a response..."
                        : "Ask me anything..."
                    }
                    aria-label="Ask the AI support assistant"
                    className="max-h-[140px] min-h-[42px] flex-1 resize-none overflow-y-auto border-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    disabled={!input.trim() || isTyping}
                    onClick={() => sendMessage()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <FiSend className="text-sm" />
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between px-1">
                  <p className="text-[9px] text-slate-400 sm:text-[10px]">
                    Enter to send · Shift + Enter for a new line
                  </p>

                  <div className="hidden items-center gap-1 text-[9px] text-slate-400 sm:flex">
                    <FiCheckCircle className="text-emerald-500" />
                    Secure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
    </>
  );
};

export default HelpCenter;