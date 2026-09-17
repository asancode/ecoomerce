// import React, { useContext, useState } from "react";
// import TextField from "@mui/material/TextField";
// import { Button, CircularProgress } from "@mui/material";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { MyContext } from "../App";
// import axios from "axios";
// import { firebaseApp } from "../firebase";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useEffect } from "react";

// const Login = () => {
//   const [isLoading, setIsLoding] = useState(false);
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [formFields, setFormsFields] = useState({
//     email: "",
//     password: "",
//   });
//    const auth = getAuth(firebaseApp);
//     const googleProvider = new GoogleAuthProvider();
//   const context = useContext(MyContext);
//   const history = useNavigate();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   },[])
//   const forgotPassword = async () => {
//     if (formFields.email === "") {
//       context.openAlertBox("error", "Please Enter Email Id");
//       return false;
//     } else {
//       context.openAlertBox("success", `Otp Send to ${formFields.email}`);
//       localStorage.setItem("userEmail", formFields.email);
//       localStorage.setItem("actionType", "forgot-password");
//       await axios
//         .post(`http://localhost:5000/api/user/forgot-password`, {
//           email: formFields.email,
//           // otp: otpValue,
//         })
//         .then((res) => {
//           // console.log(res)
//           if (res?.error !== false) {
//             // setIsLoding(false);
//             // toast.success(res?.data?.message)
//             context.openAlertBox("success", res.data.message);
//             history("/verify");
//           } else {
//             // toast.error(res?.data?.message)
//             context.openAlertBox("error", res.data.message);
//             // setIsLoding(false);
//           }});
//       // try {
//       //   const res = await axios.post(
//       //     "http://localhost:5000/api/user/forgot-password",
//       //     {
//       //       email: formFields.email,
//       //     },
//       //   );

//       //   // console.log(res.data);
//       //   context.openAlertBox("success", res.data.message);
//       //   localStorage.removeItem("userEmail");
//       //   history("/verify");
//       // } catch (error) {
//       //   console.error(error);
//       //   context.openAlertBox("error", res.data.message);
//       // }
//       // history("/verify");
//     }
//   };
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
//     if (formFields.email === "") {
//       context.openAlertBox("error", "Please add Email");
//       return false;
//     }
//     if (formFields.password === "") {
//       context.openAlertBox("error", "Please add Password");
//       return false;
//     }
//     await axios
//       .post(`http://localhost:5000/api/user/login`, formFields)
//       .then((res) => {
//         if (res?.error !== true) {
//           setIsLoding(false);
//           context.openAlertBox("success", res.data.message);
//           setFormsFields({
//             email: "",
//             password: "",
//           });
//           localStorage.setItem("accessToken", res?.data?.accessToken);
//           localStorage.setItem("refreshToken", res?.data?.refreshToken);
//           context.setIsLogin(true);
//           history("/");
//         } else {
//           // toast.error(res?.data?.message)
//           context.openAlertBox("error", res.data.message);
//           setIsLoding(false);
//         }
//       });
//   };
// const authWithGoogle = () => {
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         const fields = {
//           name: user.providerData[0].displayName,
//           email: user.providerData[0].email,
//           password: null,
//           avatar: user.providerData[0].photoURL,
//           mobile: user.providerData[0].phoneNumber,
//         };
//         axios
//           .post(`http://localhost:5000/api/user/authWithGoogle`, fields)
//           .then((res) => {
//             if (res?.error !== true) {
//               setIsLoding(false);
//               // toast.success(res?.data?.message)
//               context.openAlertBox(
//                 "success",
//                 res?.data?.message
//               );
//               localStorage.setItem("userEmail", fields.email);
//               localStorage.setItem("accessToken", res?.data?.accessToken);
//               localStorage.setItem("refreshToken", res?.data?.refreshToken);
//               context.setIsLogin(true);
//               history("/");
//             } else {
//               // toast.error(res?.data?.message)
//               context.openAlertBox(
//                 "error",
//                 res?.data?.message,
//               );
//               setIsLoding(false);
//             }
//           });
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };
//   return (
//     <section className="section py-10 bg-gray-100">
//       <div className="container">
//         <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
//           <h3 className="text-center text-[18px] text-gray-500 font-semibold">
//             Login to your Account
//           </h3>
//           <form className="w-full mt-7" onSubmit={handleSubmit}>
//             <div className="form-group w-full mb-6">
//               <TextField
//                 type="email"
//                 id="email"
//                 label="Email Id *"
//                 variant="outlined"
//                 className="w-full"
//                 name="email"
//                 value={formFields.email}
//                 disabled={isLoading === true ? true : false}
//                 onChange={onChangeInput}
//               />
//             </div>
//             <div className="form-group w-full mb-5 relative">
//               <TextField
//                 type={isShowPassword === false ? "password" : "text"}
//                 id="password"
//                 value={formFields.password}
//                 disabled={isLoading === true ? true : false}
//                 label="Password *"
//                 variant="outlined"
//                 className="w-full"
//                 name="password"
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
//             <a
//               className="text-gray-600 cursor-pointer hover:text-gray-400 font-semibold"
//               onClick={forgotPassword}
//             >
//               Forgot Password?
//             </a>

//             <div className="flex items-center w-full">
//               <Button
//                 type="submit"
//                 disabled={isLoading === true ? true : false}
//                 className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none !font-semibold"
//               >
//                 {isLoading === true ? (
//                   <CircularProgress color="inherit" />
//                 ) : (
//                   "Login"
//                 )}
//               </Button>
//             </div>

//             <p className="">
//               Not Registered?
//               <Link
//                 className="text-gray-700 hover:text-gray-400 font-semibold text-[15px] pl-3 hover:underline"
//                 to={"/register"}
//               >
//                 Sign Up
//               </Link>
//             </p>

//             <p className="mt-4 text-center font-semibold mb-3">
//               Or continue with social account
//             </p>
//             <Button className="flex gap-3 w-full !bg-gray-200 !text-gray-900 !font-[600] !capitalize !text-[16px] " onClick={authWithGoogle}>
//               <FcGoogle className="text-[20px]"  />
//               Sign in with google
//             </Button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdEmail } from "react-icons/md";
import { FiArrowRight, FiShield } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MyContext } from "../App";
import axios from "axios";
import { firebaseApp } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ----------------------------------------
  // INPUT CHANGE
  // ----------------------------------------
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------------------
  // FORGOT PASSWORD
  // ----------------------------------------
  const forgotPassword = async () => {
    const email = formFields.email.trim();

    if (!email) {
      context.openAlertBox("error", "Please enter your email address.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/api/user/forgot-password`,
        {
          email,
        }
      );

      context.openAlertBox(
        "success",
        res?.data?.message || `OTP sent to ${email}`
      );

      localStorage.setItem("userEmail", email);
      localStorage.setItem("actionType", "forgot-password");

      navigate("/verify");
    } catch (error) {
      console.error("Forgot password error:", error);

      context.openAlertBox(
        "error",
        error?.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------
  // NORMAL LOGIN
  // ----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formFields.email.trim();
    const password = formFields.password;

    if (!email) {
      context.openAlertBox("error", "Please enter your email address.");
      return;
    }

    if (!password) {
      context.openAlertBox("error", "Please enter your password.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      if (res?.data?.error === true) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Login failed."
        );
        return;
      }

      context.openAlertBox(
        "success",
        res?.data?.message || "Login successful."
      );

      localStorage.setItem(
        "accessToken",
        res?.data?.accessToken || ""
      );

      localStorage.setItem(
        "refreshToken",
        res?.data?.refreshToken || ""
      );

      localStorage.setItem("userEmail", email);

      setFormFields({
        email: "",
        password: "",
      });

      context.setIsLogin(true);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      context.openAlertBox(
        "error",
        error?.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------
  // GOOGLE LOGIN
  // ----------------------------------------
  const authWithGoogle = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const fields = {
        name: user?.displayName || "",
        email: user?.email || "",
        password: null,
        avatar: user?.photoURL || "",
        mobile: user?.phoneNumber || "",
      };

      const res = await axios.post(
        `${API_URL}/api/user/authWithGoogle`,
        fields
      );

      if (res?.data?.error === true) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Google login failed."
        );
        return;
      }

      context.openAlertBox(
        "success",
        res?.data?.message || "Google login successful."
      );

      localStorage.setItem("userEmail", fields.email);

      localStorage.setItem(
        "accessToken",
        res?.data?.accessToken || ""
      );

      localStorage.setItem(
        "refreshToken",
        res?.data?.refreshToken || ""
      );

      context.setIsLogin(true);

      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);

      if (error?.code === "auth/popup-closed-by-user") {
        context.openAlertBox(
          "error",
          "Google login popup was closed."
        );
      } else {
        context.openAlertBox(
          "error",
          error?.response?.data?.message ||
            "Google login failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <PageTitle  title="Login"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
    <section className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-4 py-8 sm:py-12">

      <div className="w-full max-w-6xl">

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(43,27,20,0.15)] border border-[#E8DED4]">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =====================================
                LEFT BRAND SECTION
            ====================================== */}
            <div className="relative hidden lg:flex min-h-[650px] bg-[#2B1B14] overflow-hidden">

              {/* Decorative circles */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#E3B23C]/10" />

              <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#E3B23C]/10" />

              <div className="absolute top-20 right-16 w-20 h-20 rounded-full border border-[#E3B23C]/20" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">

                <div>

                  <div className="flex items-center gap-3 mb-10">

                    <div className="w-11 h-11 rounded-full bg-[#E3B23C] flex items-center justify-center">
                      <span className="text-[#2B1B14] font-serif text-xl font-bold">
                        T
                      </span>
                    </div>

                    <div>
                      <h2 className="text-white text-xl font-serif font-bold">
                        Teyyar Cake
                      </h2>

                      <p className="text-[#F3EDE4]/50 text-[10px] uppercase tracking-[3px]">
                        Premium Cakes
                      </p>
                    </div>

                  </div>

                  <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#E3B23C]/30 bg-[#E3B23C]/10 text-[#E3B23C] text-xs font-medium">
                    Welcome Back
                  </span>

                  <h1 className="mt-6 text-4xl xl:text-5xl font-serif font-bold leading-tight text-white">
                    Sweet moments
                    <br />
                    <span className="text-[#E3B23C]">
                      start here.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-md text-[#F3EDE4]/65 text-sm xl:text-base leading-7">
                    Sign in to your Teyyar Cake account and continue
                    creating beautiful moments with our delicious
                    handcrafted cakes.
                  </p>

                </div>

                {/* Bottom features */}
                <div>

                  <div className="grid grid-cols-2 gap-4 mb-8">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <FiShield className="text-[#E3B23C] text-xl mb-3" />

                      <h4 className="text-white text-sm font-semibold">
                        Secure Account
                      </h4>

                      <p className="text-[#F3EDE4]/50 text-xs mt-1">
                        Your information is protected
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <FaRegHeart className="text-[#E3B23C] text-xl mb-3" />

                      <h4 className="text-white text-sm font-semibold">
                        Made With Love
                      </h4>

                      <p className="text-[#F3EDE4]/50 text-xs mt-1">
                        Fresh cakes for every occasion
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#E3B23C] border-2 border-[#2B1B14]" />
                      <div className="w-8 h-8 rounded-full bg-[#D99A73] border-2 border-[#2B1B14]" />
                      <div className="w-8 h-8 rounded-full bg-[#B87C5B] border-2 border-[#2B1B14]" />
                    </div>

                    <p className="text-[#F3EDE4]/60 text-xs">
                      Loved by cake lovers in UAE
                    </p>

                  </div>

                </div>

              </div>
            </div>

            {/* =====================================
                RIGHT LOGIN FORM
            ====================================== */}
            <div className="flex items-center justify-center p-5 sm:p-8 md:p-12 lg:p-14 xl:p-16">

              <div className="w-full max-w-md">

                {/* Mobile Logo */}
                <div className="flex lg:hidden items-center justify-center gap-3 mb-8">

                  <div className="w-11 h-11 rounded-full bg-[#2B1B14] flex items-center justify-center">
                    <span className="text-[#E3B23C] font-serif text-xl font-bold">
                      T
                    </span>
                  </div>

                  <div>
                    <h2 className="text-[#2B1B14] text-xl font-serif font-bold">
                      Teyyar Cake
                    </h2>

                    <p className="text-gray-400 text-[9px] uppercase tracking-[3px]">
                      Premium Cakes
                    </p>
                  </div>

                </div>

                {/* Heading */}
                <div className="text-center lg:text-left">

                  <p className="text-[#E3B23C] text-xs font-bold uppercase tracking-[2px] mb-2">
                    Welcome Back
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1B14]">
                    Login to your account
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Enter your details to continue shopping.
                  </p>

                </div>

                {/* Form */}
                <form
                  className="w-full mt-8"
                  onSubmit={handleSubmit}
                >

                  {/* Email */}
                  <div className="relative mb-5">

                    <TextField
                      type="email"
                      id="email"
                      label="Email Address"
                      variant="outlined"
                      className="w-full"
                      name="email"
                      value={formFields.email}
                      disabled={isLoading}
                      onChange={onChangeInput}
                      autoComplete="email"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <MdEmail className="text-gray-400 mr-2 text-xl" />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#FAF8F5",
                        },
                        "& .MuiOutlinedInput-root:hover fieldset": {
                          borderColor: "#E3B23C",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                          borderColor: "#E3B23C",
                          borderWidth: "1.5px",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#2B1B14",
                        },
                      }}
                    />

                  </div>

                  {/* Password */}
                  <div className="relative mb-4">

                    <TextField
                      type={isShowPassword ? "text" : "password"}
                      id="password"
                      value={formFields.password}
                      disabled={isLoading}
                      label="Password"
                      variant="outlined"
                      className="w-full"
                      name="password"
                      onChange={onChangeInput}
                      autoComplete="current-password"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <MdLockOutline className="text-gray-400 mr-2 text-xl" />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#FAF8F5",
                          paddingRight: "50px",
                        },
                        "& .MuiOutlinedInput-root:hover fieldset": {
                          borderColor: "#E3B23C",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                          borderColor: "#E3B23C",
                          borderWidth: "1.5px",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#2B1B14",
                        },
                      }}
                    />

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() =>
                        setIsShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#E3B23C]/10 hover:text-[#2B1B14] transition-colors"
                      aria-label={
                        isShowPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {isShowPassword ? (
                        <IoMdEye className="text-xl" />
                      ) : (
                        <IoMdEyeOff className="text-xl" />
                      )}
                    </button>

                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end mb-5">

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={forgotPassword}
                      className="text-sm font-semibold text-[#6F5144] hover:text-[#E3B23C] transition-colors disabled:opacity-50"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    fullWidth
                    className="!h-[52px] !rounded-xl !bg-[#2B1B14] !text-white !normal-case !text-[15px] !font-semibold hover:!bg-[#3D271E] !shadow-[0_8px_20px_rgba(43,27,20,0.18)] transition-all"
                  >
                    {isLoading ? (
                      <CircularProgress
                        size={23}
                        sx={{ color: "#E3B23C" }}
                      />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Login to Account
                        <FiArrowRight className="text-lg" />
                      </span>
                    )}
                  </Button>

                  {/* Register */}
                  <div className="flex items-center justify-center gap-1.5 mt-6 text-sm">

                    <span className="text-gray-500">
                      Don't have an account?
                    </span>

                    <Link
                      to="/register"
                      className="font-bold text-[#2B1B14] hover:text-[#E3B23C] transition-colors"
                    >
                      Sign Up
                    </Link>

                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4 my-7">

                    <div className="h-px bg-gray-200 flex-1" />

                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">
                      Or continue with
                    </span>

                    <div className="h-px bg-gray-200 flex-1" />

                  </div>

                  {/* Google */}
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={authWithGoogle}
                    fullWidth
                    className="!h-[52px] !rounded-xl !bg-white !text-[#2B1B14] !normal-case !text-[14px] !font-semibold !border !border-gray-200 hover:!bg-[#FAF8F5] hover:!border-[#E3B23C] !shadow-none transition-all"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <FcGoogle className="text-[22px]" />
                      Continue with Google
                    </span>
                  </Button>

                  {/* Security note */}
                  <div className="flex items-center justify-center gap-2 mt-7">

                    <FiShield className="text-[#E3B23C] text-sm" />

                    <p className="text-[11px] text-gray-400 text-center">
                      Secure & encrypted login
                    </p>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-400 mt-5">
          © {new Date().getFullYear()} Teyyar Cake. All rights reserved.
        </p>

      </div>

    </section>
    </>
  );
};

export default Login;