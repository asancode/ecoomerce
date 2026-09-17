// import { Button } from "@mui/material";
// import axios from "axios";
// import React, { useState, useRef } from "react";

// const OtpInput = () => {
//   const [otp, setOtp] = useState(new Array(6).fill("")); // Store 6 digits
//   const inputRefs = useRef([]);

//   // Handle input change
//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return; // Only numbers allowed

//     let newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Move focus to next box automatically
//     if (element.value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   // Handle backspace key
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   // Handle paste
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
//     let newOtp = [...otp];
//     pastedData.forEach((char, i) => {
//       if (!isNaN(char)) newOtp[i] = char;
//     });
//     setOtp(newOtp);
//   };

//   // Submit OTP
//   const handleSubmit = (e) => {
//     //  e.preventDefaoult()
//     const res = axios.post(`http://localhost:5000/api/user/verify-email`,{
//       email:localStorage.getItem("userEmail"),
//       otp:otp
//     }).then((res)=>{
//       console.log(res)
//     })
//     // alert("Entered OTP is: " + otp.join(""));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center mt-3">
//       {/* <h2 className="text-2xl font-bold mb-4">Enter OTP</h2> */}
//       <div className="flex space-x-2">
//         {otp.map((data, index) => (
//           <input
//             key={index}
//             type="text"
//             className="w-12 h-12 text-center border-2 rounded-md text-lg focus:outline-none focus:border-blue-500"
//             value={data}
//             maxLength="1"
//             onChange={(e) => handleChange(e.target, index)}
//             onKeyDown={(e) => handleKeyDown(e, index)}
//             onPaste={handlePaste}
//             ref={(el) => (inputRefs.current[index] = el)}
//           />
//         ))}
//       </div>
//         <div className='flex items-center w-full'>
//                         <Button  onClick={handleSubmit} className='!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none !font-semibold'>Submit OTP</Button>
//                     </div>
//       {/* <button
//         onClick={handleSubmit}
//         className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
//       >
//         Submit OTP
//       </button> */}
//     </div>
//   );
// };

// export default OtpInput;

import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL
const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const context = useContext(MyContext);
  const history = useNavigate();

  // Handle input change
  const handleChange = (element, index) => {
    const value = element.value;

    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  // Submit OTP
  // const handleSubmit = async () => {
  //   const actionType = localStorage.getItem("actionType");
  //   const otpValue = otp.join("");

  //   if (otpValue.length !== 6) {
  //     context.openAlertBox("error", "Please enter a valid 6-digit OTP");
  //     return;
  //   }
  //         await axios
  //       .post(`http://localhost:5000/api/user/verify-email`, {
  //         email: localStorage.getItem("userEmail"),
  //         otp: otpValue,
  //       })
  //       .then((res) => {
  //         // console.log(res)
  //         if (res?.error !== true) {
  //           setIsLoding(false);
  //           // toast.success(res?.data?.message)
  //           context.openAlertBox("success", res.data.message);
  //           setFormsFields({
  //             email: "",
  //             password: "",
  //           });
  //           context.openAlertBox("success", res.data.message);
  //           history("/login");
  //           localStorage.removeItem("userEmail");
  //         } else {
  //           // toast.error(res?.data?.message)
  //           context.openAlertBox("error", res.data.message);
  //           // setIsLoding(false);
  //         }
  //       });
  //   if (actionType !== "forgot-password") {
  //     await axios
  //       .post(`http://localhost:5000/api/user/verify-email`, {
  //         email: localStorage.getItem("userEmail"),
  //         otp: otpValue,
  //       })
  //       .then((res) => {
  //         // console.log(res)
  //         if (res?.error !== true) {
  //           setIsLoding(false);
  //           // toast.success(res?.data?.message)
  //           context.openAlertBox("success", res.data.message);
  //           setFormsFields({
  //             email: "",
  //             password: "",
  //           });
  //           context.openAlertBox("success", res.data.message);
  //           history("/login");
  //           localStorage.removeItem("userEmail");
  //         } else {
  //           // toast.error(res?.data?.message)
  //           context.openAlertBox("error", res.data.message);
  //           // setIsLoding(false);
  //         }
  //       });
  //   }else{
  //       await axios
  //       .post(`http://localhost:5000/api/user/verify-forgot-password-otp`, {
  //         email: localStorage.getItem("userEmail"),
  //         otp: otpValue,
  //       })
  //       .then((res) => {
  //         // console.log(res)
  //         if (res?.error !== false) {
  //           // setIsLoding(false);
  //           // toast.success(res?.data?.message)
  //           // context.openAlertBox("success", res.data.message);
  //           context.openAlertBox("success", res.data.message);
  //           history("/forgot-password");
  //           // localStorage.removeItem("userEmail");
  //         } else {
  //           // toast.error(res?.data?.message)
  //           context.openAlertBox("error", res.data.message);
  //           // setIsLoding(false);
  //         }
  //       });
  //   }

  //   // if (actionType !== "forgot-password") {
  //   //   // try {
  //   //   //   const res = await axios.post(
  //   //   //     "http://localhost:5000/api/user/verify-email",
  //   //   //     {
  //   //   //       email: localStorage.getItem("userEmail"),
  //   //   //       otp: otpValue,
  //   //   //     }
  //   //   //   );

  //   //   //   // console.log(res.data);
  //   //   //   context.openAlertBox("success",res.data.message);
  //   //   //    history("/login");
  //   //   //    localStorage.removeItem("userEmail")
  //   //   // } catch (error) {
  //   //   //   console.error(error);
  //   //   //   context.openAlertBox("error",res.data.message);
  //   //   // }

  //   // }else{
  //   //   //     try {
  //   //   //   const res = await axios.post(
  //   //   //     "http://localhost:5000/api/user/verify-forgot-password-otp",
  //   //   //     {
  //   //   //       email: localStorage.getItem("userEmail"),
  //   //   //       otp: otpValue,
  //   //   //     }
  //   //   //   );

  //   //   //   // console.log(res.data);
  //   //   //   context.openAlertBox("success",res.data.message);
  //   //   //    history("/forget-password");
  //   //   //    localStorage.removeItem("userEmail")
  //   //   // } catch (error) {
  //   //   //   console.error(error);
  //   //   //   context.openAlertBox("error",res.data.message);
  //   //   // }
  //   // }
  // };
  // Submit OTP
const handleSubmit = async () => {
  const actionType = localStorage.getItem("actionType");
  const otpValue = otp.join("");

  if (otpValue.length !== 6) {
    context.openAlertBox("error", "Please enter a valid 6-digit OTP");
    return;
  }

  if (actionType !== "forgot-password") {
    // Normal email verification -> login page
    await axios
      .post(`${API_URL}/api/user/verify-email`, {
        email: localStorage.getItem("userEmail"),
        otp: otpValue,
      })
      .then((res) => {
        if (res?.data?.error !== true) {
          context.openAlertBox("success", res.data.message);
          localStorage.removeItem("userEmail");
          history("/login");
        } else {
          context.openAlertBox("error", res.data.message);
        }
      })
      .catch((err) => {
        context.openAlertBox(
          "error",
          err?.response?.data?.message || "Something went wrong"
        );
      });
  } else {
    // Forgot password flow -> forgot-password page (to set new password)
    await axios
      .post(`${API_URL}/api/user/verify-forgot-password-otp`, {
        email: localStorage.getItem("userEmail"),
        otp: otpValue,
      })
      .then((res) => {
        if (res?.data?.error !== true) {
          context.openAlertBox("success", res.data.message);
          history("/forgot-password");
        } else {
          context.openAlertBox("error", res.data.message);
        }
      })
      .catch((err) => {
        context.openAlertBox(
          "error",
          err?.response?.data?.message || "Something went wrong"
        );
      });
  }
};

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <div className="flex space-x-2">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            className="w-12 h-12 text-center border-2 rounded-md text-lg focus:outline-none focus:border-blue-500"
            value={data}
            maxLength="1"
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>

      <div className="flex items-center w-full">
        <Button
          onClick={handleSubmit}
          className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 !font-semibold"
        >
          Submit OTP
        </Button>
      </div>
    </div>
  );
};

export default OtpInput;
