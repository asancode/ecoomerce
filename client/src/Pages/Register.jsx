// import React, { useContext, useState } from "react";
// import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { MyContext } from "../App";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useNavigate } from "react-router-dom";
// import { firebaseApp } from "../firebase";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useEffect } from "react";

// const Register = () => {
//   const [isLoading, setIsLoding] = useState(false);
//   const [isShowPassword, setIsShowPassword] = useState(false);
//   const [formFields, setFormFields] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const auth = getAuth(firebaseApp);
//   const googleProvider = new GoogleAuthProvider();
//   const history = useNavigate();
//   const context = useContext(MyContext);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   },[])
//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormFields(() => {
//       return {
//         ...formFields,
//         [name]: value,
//       };
//     });
//   };
//   const valideValue = Object.values(formFields).every((el) => el);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoding(true);
//     if (formFields.name === "") {
//       context.openAlertBox("error", "Please add Full Name");
//       return false;
//     }
//     if (formFields.email === "") {
//       context.openAlertBox("error", "Please add Email");
//       return false;
//     }
//     if (formFields.password === "") {
//       context.openAlertBox("error", "Please add Password");
//       return false;
//     }
//     await axios
//       .post(`http://localhost:5000/api/user/register`, formFields)
//       .then((res) => {
//         if (res?.error !== true) {
//           setIsLoding(false);
//           // toast.success(res?.data?.message)
//           context.openAlertBox(
//             "success",
//             res.data.message ||
//               "User Registered Successfully! Please verify your email.",
//           );
//           localStorage.setItem("userEmail", formFields.email);
//           setFormFields({
//             name: "",
//             email: "",
//             password: "",
//           });
//           history("/verify");
//         } else {
//           // toast.error(res?.data?.message)
//           context.openAlertBox(
//             "error",
//             res.data.message || "Already Register email",
//           );
//           setIsLoding(false);
//         }
//       });
//     // postData('api/user/register', fromFields).then((res) => {
//     //   console.log(res);
//     // });
//   };
//   const authWithGoogle = () => {
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
//             Register with a new account
//           </h3>
//           <form className="w-full mt-7" onSubmit={handleSubmit}>
//             <div className="form-group w-full mb-6">
//               <TextField
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={formFields.name}
//                 disabled={isLoading === true ? true : false}
//                 label="FullName *"
//                 variant="outlined"
//                 onChange={onChangeInput}
//                 className="w-full"
//               />
//             </div>
//             <div className="form-group w-full mb-6">
//               <TextField
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={formFields.email}
//                 disabled={isLoading === true ? true : false}
//                 label="Email Id *"
//                 variant="outlined"
//                 onChange={onChangeInput}
//                 className="w-full"
//               />
//             </div>
//             <div className="form-group w-full mb-5 relative">
//               <TextField
//                 type={isShowPassword === false ? "password" : "text"}
//                 id="password"
//                 name="password"
//                 value={formFields.password}
//                 disabled={isLoading === true ? true : false}
//                 label="Password *"
//                 variant="outlined"
//                 onChange={onChangeInput}
//                 className="w-full"
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
//             <Link className="text-gray-600 hover:text-gray-400 font-semibold">
//               Forgot Password?
//             </Link>

//             <div className="flex items-center w-full">
//               <Button
//                 type="submit"
//                 disabled={isLoading === true ? true : false}
//                 // disabled={!valideValue}
//                 className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none !font-semibold gap-3"
//               >
//                 {isLoading === true ? (
//                   <CircularProgress color="inherit" />
//                 ) : (
//                   "Sign Up"
//                 )}
//               </Button>
//             </div>

//             <p className="">
//               Already have an account?
//               <Link
//                 className="text-gray-700 hover:text-gray-400 font-semibold text-[15px] pl-3 hover:underline"
//                 to={"/login"}
//               >
//                 Login
//               </Link>
//             </p>

//             <p className="mt-4 text-center font-medium mb-3">
//               Or continue with social account
//             </p>
//             <Button
//               className="flex gap-3 w-full !bg-gray-200 !text-gray-900 !font-[600] !capitalize !text-[16px] "
//               onClick={authWithGoogle}
//             >
//               <FcGoogle className="text-[20px]" />
//               Sign Up with Google
//             </Button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdLockOutline, MdEmail, MdPersonOutline } from "react-icons/md";
import { FiArrowRight, FiShield, FiGift } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MyContext } from "../App";
import axios from "axios";
import { firebaseApp } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
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

  const valideValue = Object.values(formFields).every((el) => el);

  // ----------------------------------------
  // REGISTER
  // ----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formFields.name.trim();
    const email = formFields.email.trim();
    const password = formFields.password;

    // ✅ FIX (matches Login.jsx pattern): validate BEFORE flipping
    // isLoading on, so a failed check never leaves the button stuck in a
    // permanent loading state.
    if (!name) {
      context.openAlertBox("error", "Please add your full name.");
      return;
    }
    if (!email) {
      context.openAlertBox("error", "Please add your email address.");
      return;
    }
    if (!password) {
      context.openAlertBox("error", "Please add a password.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/api/user/register`,
        { name, email, password },
      );

      // ✅ FIX: was "res?.error !== true" — checks the axios response
      // object itself, which has no top-level "error" field (that lives
      // in res.data.error). This always evaluated to true, so
      // registration always reported "success" even for things like
      // "email already registered".
      if (res?.data?.error === true) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Already registered with this email.",
        );
        return;
      }

      context.openAlertBox(
        "success",
        res?.data?.message ||
          "Account created! Please verify your email.",
      );

      localStorage.setItem("userEmail", email);
      setFormFields({ name: "", email: "", password: "" });
      navigate("/verify");
    } catch (error) {
      // ✅ FIX: no .catch() before — a network/server error left the
      // button stuck spinning forever with no feedback.
      console.error("Register error:", error);
      context.openAlertBox(
        "error",
        error?.response?.data?.message ||
          "Could not create your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------
  // GOOGLE SIGN UP
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
        fields,
      );

      // ✅ Same always-true bug fixed here too.
      if (res?.data?.error === true) {
        context.openAlertBox(
          "error",
          res?.data?.message || "Google sign-up failed.",
        );
        return;
      }

      context.openAlertBox(
        "success",
        res?.data?.message || "Account created with Google.",
      );

      localStorage.setItem("userEmail", fields.email);
      localStorage.setItem("accessToken", res?.data?.accessToken || "");
      localStorage.setItem("refreshToken", res?.data?.refreshToken || "");
      context.setIsLogin(true);
      navigate("/");
    } catch (error) {
      // ✅ FIX: no .catch() before — a failed Google popup or backend
      // call left the user stuck with no explanation at all.
      console.error("Google sign-up error:", error);

      if (error?.code === "auth/popup-closed-by-user") {
        context.openAlertBox("error", "Google sign-up popup was closed.");
      } else {
        context.openAlertBox(
          "error",
          error?.response?.data?.message ||
            "Google sign-up failed. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <PageTitle  title="Register"
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
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#E3B23C]/10" />
              <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#E3B23C]/10" />
              <div className="absolute top-20 right-16 w-20 h-20 rounded-full border border-[#E3B23C]/20" />

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
                    New Here?
                  </span>

                  <h1 className="mt-6 text-4xl xl:text-5xl font-serif font-bold leading-tight text-white">
                    Join the table,
                    <br />
                    <span className="text-[#E3B23C]">taste the joy.</span>
                  </h1>

                  <p className="mt-6 max-w-md text-[#F3EDE4]/65 text-sm xl:text-base leading-7">
                    Create your Teyyar Cake account to order handcrafted
                    cakes and flowers, track deliveries, and save your
                    favourite gifts for next time.
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <FiGift className="text-[#E3B23C] text-xl mb-3" />
                      <h4 className="text-white text-sm font-semibold">
                        Exclusive Offers
                      </h4>
                      <p className="text-[#F3EDE4]/50 text-xs mt-1">
                        Member-only deals and rewards
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
                      Join cake lovers across UAE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================
                RIGHT REGISTER FORM
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
                    New Here?
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B1B14]">
                    Create your account
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Sign up to start ordering in just a minute.
                  </p>
                </div>

                {/* Form */}
                <form className="w-full mt-8" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="relative mb-5">
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      label="Full Name"
                      variant="outlined"
                      className="w-full"
                      value={formFields.name}
                      disabled={isLoading}
                      onChange={onChangeInput}
                      autoComplete="name"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <MdPersonOutline className="text-gray-400 mr-2 text-xl" />
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

                  {/* Email */}
                  <div className="relative mb-5">
                    <TextField
                      type="email"
                      id="email"
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      className="w-full"
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
                      name="password"
                      value={formFields.password}
                      disabled={isLoading}
                      label="Password"
                      variant="outlined"
                      className="w-full"
                      onChange={onChangeInput}
                      autoComplete="new-password"
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

                    {/* ✅ FIX (matches Login.jsx): explicit type="button" —
                        without it, a <button> inside a <form> defaults to
                        type="submit", so clicking the show/hide-password
                        icon used to submit an incomplete registration
                        form. */}
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setIsShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#E3B23C]/10 hover:text-[#2B1B14] transition-colors"
                      aria-label={
                        isShowPassword ? "Hide password" : "Show password"
                      }
                    >
                      {isShowPassword ? (
                        <IoMdEye className="text-xl" />
                      ) : (
                        <IoMdEyeOff className="text-xl" />
                      )}
                    </button>
                  </div>

                  {/* ✅ FIX: the old register form had a stray "Forgot
                      Password?" <Link> here with NO "to" prop at all
                      (crash-prone) — and it never made sense on a sign-up
                      form to begin with (copy-paste leftover from Login).
                      Removed. */}

                  {/* Sign Up Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || !valideValue}
                    fullWidth
                    className="!h-[52px] !rounded-xl !bg-[#2B1B14] !text-white !normal-case !text-[15px] !font-semibold hover:!bg-[#3D271E] disabled:!bg-[#8A7A70] !shadow-[0_8px_20px_rgba(43,27,20,0.18)] transition-all !mt-2"
                  >
                    {isLoading ? (
                      <CircularProgress size={23} sx={{ color: "#E3B23C" }} />
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Create Account
                        <FiArrowRight className="text-lg" />
                      </span>
                    )}
                  </Button>

                  {/* Login */}
                  <div className="flex items-center justify-center gap-1.5 mt-6 text-sm">
                    <span className="text-gray-500">
                      Already have an account?
                    </span>
                    <Link
                      to="/login"
                      className="font-bold text-[#2B1B14] hover:text-[#E3B23C] transition-colors"
                    >
                      Login
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
                      Sign Up with Google
                    </span>
                  </Button>

                  {/* Security note */}
                  <div className="flex items-center justify-center gap-2 mt-7">
                    <FiShield className="text-[#E3B23C] text-sm" />
                    <p className="text-[11px] text-gray-400 text-center">
                      Secure & encrypted sign-up
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

export default Register;