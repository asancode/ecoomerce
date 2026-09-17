// import React, { useContext, useState } from "react";
// import TextField from "@mui/material/TextField";
// import { Button, CircularProgress } from "@mui/material";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { MyContext } from "../App";
// import axios from "axios";
// // import { set } from "mongoose";

// const ForgotPassword = () => {
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [isShowPassword2, setIsShowPassword2] = useState(false);
//   const [isLoading, setIsLoding] = useState(false);
//   const context = useContext(MyContext);
//   const histoty = useNavigate();
//   const [formFields, setFormsFields] = useState({
//     email: localStorage.getItem("userEmail") || "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormsFields(() => {
//       return {
//         ...formFields,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoding(true);
//     if (formFields.newPassword === "") {
//       context.openAlertBox("error", "Please add New Password");
//       setIsLoding(false);
//       return false;
//     }
//     if (formFields.confirmPassword === "") {
//       context.openAlertBox("error", "Please add Confirm Password");
//       setIsLoding(false);
//       return false;
//     }
//     if (formFields.confirmPassword !== formFields.newPassword) {
//       context.openAlertBox("error", "Password and Confirm Password not match");
//       setIsLoding(false);
//       return false;
//     }
//     await axios
//       .post(`http://localhost:5000/api/user/reset-password`, formFields)
//       .then((res) => {
//         // console.log(res)
//         if (res?.error !== true) {
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("actionType");
//           context.openAlertBox("success", res.data.message);
//           setIsLoding(false);
//           histoty("/login");
//         }else{
//           context.openAlertBox("error", res.data.message);
//           setIsLoding(false);
//         }
//         // if (res?.error !== true) {
//         //   setIsLoding(false);
//         //   // toast.success(res?.data?.message)
//         //   context.openAlertBox("success", res.data.message);
//         //   setFormsFields({
//         //     email: "",
//         //     password: "",
//         //   });
//         //   localStorage.setItem("accessToken", res?.data?.accessToken);
//         //   localStorage.setItem("refreshToken", res?.data?.refreshToken);
//         //   context.setIsLogin(true);
//         //   history("/login");
//         // } else {
//         //   // toast.error(res?.data?.message)
//         //   context.openAlertBox("error", res.data.message);
//         //   setIsLoding(false);
//         // }
//       });
//     // postData('api/user/register', fromFields).then((res) => {
//     //   console.log(res);
//     // });
//   };

//   return (
//     <section className="section py-10 bg-gray-100">
//       <div className="container">
//         <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
//           <h3 className="text-center text-[18px] text-gray-500 font-semibold">
//             Forgot Password
//           </h3>
//           <form className="w-full mt-7" onSubmit={handleSubmit}>
//             {/* <div className='form-group w-full mb-6'>
//                         <TextField type='email' id="email" label="Email Id *" variant="outlined" className='w-full' name='name'/>

//                     </div> */}
//             <div className="form-group w-full mb-5 relative">
//               <TextField
//                 type={isShowPassword === false ? "password" : "text"}
//                 id="new_password"
//                 label="New Password *"
//                 variant="outlined"
//                 className="w-full"
//                 name="newPassword"
//                 value={formFields.newPassword}
//                 disabled={isLoading === true ? true : false}
//                 onChange={onChangeInput}
//               />
//               <Button
//                 className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-gray-500"
//                 onClick={() => {
//                   setIsShowPassword(!isShowPassword);
//                 }}
//               >
//                 {isShowPassword === true ? (
//                   <IoMdEye className="text-[18px] opacity-75" />
//                 ) : (
//                   <IoMdEyeOff className="text-[18px] opacity-75" />
//                 )}
//               </Button>
//             </div>
//             <div className="form-group w-full mb-5 relative">
//               <TextField
//                 type={isShowPassword2 === false ? "password" : "text"}
//                 id="confirm_password"
//                 label="Confirm Password *"
//                 variant="outlined"
//                 className="w-full"
//                 name="confirmPassword"
//                 value={formFields.confirmPassword}
//                 disabled={isLoading === true ? true : false}
//                 onChange={onChangeInput}
//               />
//               <Button
//                 className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-gray-500"
//                 onClick={() => {
//                   setIsShowPassword2(!isShowPassword2);
//                 }}
//               >
//                 {isShowPassword2 === true ? (
//                   <IoMdEye className="text-[18px] opacity-75" />
//                 ) : (
//                   <IoMdEyeOff className="text-[18px] opacity-75" />
//                 )}
//               </Button>
//             </div>
//             {/* <a className='text-gray-600 cursor-pointer hover:text-gray-400 font-semibold' onClick={forgotPassword} >Forgot Password?</a> */}

//             <div className="flex items-center w-full">
//               <Button
//                 type="submit" disabled={isLoading === true ? true : false}
//                 className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none !font-semibold"
//               >
//                 {isLoading === true ? (
//                   <CircularProgress color="inherit" />
//                 ) : (
//                   "Change Password"
//                 )}
//               </Button>
//             </div>

//             {/* <p className=''>Not Registered?<Link className='text-gray-700 hover:text-gray-400 font-semibold text-[15px] pl-3 hover:underline' to={"/register"}>Sign Up</Link></p> */}

//             {/* <p className='mt-4 text-center font-semibold mb-3'>Or continue with social account</p>
//                     <Button className='flex gap-3 w-full !bg-gray-200 !text-gray-900 !font-[600] !capitalize !text-[16px] '><FcGoogle className='text-[20px]'/>login with google</Button> */}
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ForgotPassword;
import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import axios from "axios";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const ForgotPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail") || "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, newPassword, confirmPassword } = formFields;

    if (!newPassword.trim()) {
      context.openAlertBox("error", "Please enter your new password.");
      return;
    }

    if (newPassword.length < 6) {
      context.openAlertBox(
        "error",
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (!confirmPassword.trim()) {
      context.openAlertBox(
        "error",
        "Please enter your confirm password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      context.openAlertBox(
        "error",
        "Password and confirm password do not match."
      );
      return;
    }

    if (!email) {
      context.openAlertBox(
        "error",
        "Email address not found. Please restart the forgot password process."
      );
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/api/user/reset-password`,
        formFields
      );

      if (res?.data?.error === true) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Unable to reset password."
        );
        return;
      }

      localStorage.removeItem("userEmail");
      localStorage.removeItem("actionType");

      context.openAlertBox(
        "success",
        res?.data?.message || "Password changed successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (error) {
      console.error("Reset password error:", error);

      context.openAlertBox(
        "error",
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength =
    formFields.newPassword.length === 0
      ? ""
      : formFields.newPassword.length < 6
      ? "Weak"
      : formFields.newPassword.length < 10
      ? "Medium"
      : "Strong";

  return (
    <>
      <PageTitle  title="Forgot Password"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-4 py-10 sm:px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      {/* Main Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-5 sm:p-8 md:p-9">

          {/* Icon */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-9V7a4 4 0 00-8 0v3h8z"
                />
              </svg>

            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Reset Password
            </h1>

            <p className="text-sm sm:text-[15px] text-slate-500 mt-2 leading-6">
              Create a new password to secure your account.
            </p>

          </div>

          {/* Email */}
          {formFields.email && (
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Account Email
              </label>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm text-slate-600 truncate">
                  {formFields.email}
                </span>

              </div>

            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* New Password */}
            <div className="relative">

              <TextField
                fullWidth
                type={isShowPassword ? "text" : "password"}
                id="new_password"
                label="New Password"
                variant="outlined"
                name="newPassword"
                value={formFields.newPassword}
                disabled={isLoading}
                onChange={onChangeInput}
                autoComplete="new-password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    paddingRight: "48px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                }}
              />

              <button
                type="button"
                aria-label={
                  isShowPassword
                    ? "Hide password"
                    : "Show password"
                }
                onClick={() =>
                  setIsShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {isShowPassword ? (
                  <IoMdEye className="text-xl" />
                ) : (
                  <IoMdEyeOff className="text-xl" />
                )}
              </button>

            </div>

            {/* Password Strength */}
            {formFields.newPassword && (
              <div className="-mt-3">

                <div className="flex items-center justify-between mb-1.5">

                  <span className="text-xs text-slate-500">
                    Password strength
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      passwordStrength === "Weak"
                        ? "text-red-500"
                        : passwordStrength === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordStrength}
                  </span>

                </div>

                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordStrength === "Weak"
                        ? "w-1/3 bg-red-500"
                        : passwordStrength === "Medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                    }`}
                  />

                </div>

              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">

              <TextField
                fullWidth
                type={isShowPassword2 ? "text" : "password"}
                id="confirm_password"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                value={formFields.confirmPassword}
                disabled={isLoading}
                onChange={onChangeInput}
                autoComplete="new-password"
                error={
                  formFields.confirmPassword.length > 0 &&
                  formFields.newPassword !==
                    formFields.confirmPassword
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    paddingRight: "48px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                }}
              />

              <button
                type="button"
                aria-label={
                  isShowPassword2
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onClick={() =>
                  setIsShowPassword2((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {isShowPassword2 ? (
                  <IoMdEye className="text-xl" />
                ) : (
                  <IoMdEyeOff className="text-xl" />
                )}
              </button>

            </div>

            {/* Password Requirements */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">

              <p className="text-xs font-semibold text-blue-900 mb-2">
                Password requirements
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">

                <p className="text-xs text-blue-700">
                  ✓ At least 6 characters
                </p>

                <p className="text-xs text-blue-700">
                  ✓ Avoid common passwords
                </p>

              </div>

            </div>

            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{
                height: "52px",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #2563eb, #4f46e5)",
                boxShadow:
                  "0 10px 25px rgba(37, 99, 235, 0.25)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1d4ed8, #4338ca)",
                  boxShadow:
                    "0 12px 30px rgba(37, 99, 235, 0.35)",
                },
                "&:disabled": {
                  background: "#94a3b8",
                  color: "#fff",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={25}
                  color="inherit"
                />
              ) : (
                "Change Password"
              )}
            </Button>

            {/* Back Login */}
            <div className="text-center pt-1">

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                <span>←</span>
                Back to Login
              </Link>

            </div>

          </form>

        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-white/60 mt-5 px-4">
          Your password is securely protected.
        </p>

      </div>

    </section>
    </>
  );
};

export default ForgotPassword;

