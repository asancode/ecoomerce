// // import React, { useEffect, useState } from 'react'
// // import OtpInput from '../Components/OtpInput'
// // import axios from 'axios'
// // // import {security} from '../assets/security.png'

// // const Verify = () => {
// //   // const [otp,setOtp]=useState("")
// //   // const verifyOTP = (e)=>{
// //   // e.preventDefaoult()
// //   //   const res = axios.post(`http://localhost:5000/api/user/register`,{
// //   //     email:localStorage.getItem("userEmail"),
// //   //     otp:otp
// //   //   }).then((res)=>{
// //   //     console.log(res)
// //   //   })
// //   // }
// //   return (
// //     <div>
// //       <section className='section py-10 bg-gray-100'>
// //              <div className='container'>
// //                  <div className='card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10'>
// //                     <div className='text-center flex items-center justify-center'>
// //                         <img src='https://cdn-icons-png.flaticon.com/128/12944/12944620.png' width={80}/>
// //                     </div>
// //                      <h3 className='text-center text-[18px] text-gray-500 font-semibold mt-4 mb-1'>Verify OTP</h3>
// //                      <p className='text-center mt-0 mb-4'>OTP send to <span className='text-gray-600 font-bold'>{localStorage.getItem("userEmail")}</span></p>
// //                      <OtpInput/>
// //                  </div>
// //              </div>
// //          </section>
// //     </div>
// //   )
// // }

// // export default Verify
// import React from "react";
// import OtpInput from "../Components/OtpInput";

// const Verify = () => {
//   const email = localStorage.getItem("userEmail");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          
//           {/* Top Gradient */}
//           <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

//           <div className="px-5 py-8 sm:px-8 sm:py-10">
            
//             {/* Security Icon */}
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-8 h-8 sm:w-10 sm:h-10 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Heading */}
//             <div className="text-center">
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
//                 Verify Your OTP
//               </h1>

//               <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
//                 Enter the 6-digit verification code sent to
//               </p>

//               {/* Email */}
//               <p className="mt-2 px-3 break-all text-sm sm:text-base font-semibold text-blue-600">
//                 {email || "your email address"}
//               </p>
//             </div>

//             {/* OTP Component */}
//             <div className="mt-8">
//               <OtpInput />
//             </div>

//             {/* Security Message */}
//             <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4">
//               <div className="flex-shrink-0 mt-0.5">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-blue-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v1m-4 0h4m-2 5h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>

//               <p className="text-xs sm:text-sm text-slate-500 leading-5">
//                 Never share your OTP with anyone. Our support team will never
//                 ask you for your verification code.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs sm:text-sm text-slate-500 mt-5">
//           Secure verification • Your information is protected
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Verify;
import React, { useEffect, useState } from "react";
import OtpInput from "../Components/OtpInput";
const API_URL = import.meta.env.VITE_API_URL
const Verify = () => {
  const email = localStorage.getItem("userEmail");

  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setExpired(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">

          {/* Top Gradient */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="px-5 py-8 sm:px-8 sm:py-10">

            {/* Security Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"
                    />
                  </svg>

                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Verify Your OTP
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed">
                Enter the 6-digit verification code sent to
              </p>

              {/* Email */}
              <p className="mt-2 px-3 break-all text-sm sm:text-base font-semibold text-blue-600">
                {email || "your email address"}
              </p>

            </div>

            {/* TIMER */}
            <div className="flex justify-center mt-6">

              {!expired ? (
                <div className="flex flex-col items-center">

                  <div className="text-sm text-slate-500 mb-1">
                    OTP expires in
                  </div>

                  <div
                    className={`text-2xl font-bold ${
                      timeLeft <= 10
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </div>

                </div>
              ) : (
                <div className="text-center">

                  <div className="text-red-600 font-bold text-lg">
                    OTP Expired
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Please request a new OTP.
                  </p>

                </div>
              )}

            </div>

            {/* OTP Component */}
            <div className="mt-8">
              <OtpInput disabled={expired} />
            </div>

            {/* Security Message */}
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4">

              <div className="flex-shrink-0 mt-0.5">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.105.895-2 2-2s2 .895 2 2v1m-4 0h4m-2 5h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

              </div>

              <p className="text-xs sm:text-sm text-slate-500 leading-5">
                Never share your OTP with anyone. Our support team will
                never ask you for your verification code.
              </p>

            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-5">
          Secure verification • Your information is protected
        </p>

      </div>
    </div>
  );
};

export default Verify;