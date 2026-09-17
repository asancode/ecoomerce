// import { Button, CircularProgress, TextField } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AccountSidebar from "../Components/AccountSidebar";
// import { MyContext } from "../App";
// import axios from "axios";
// import { Collapse } from "react-collapse";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

// const MyAccount = () => {
//   const [isLoading, setIsLoding] = useState(false);
//   const [phone, setPhone] = useState("");
//   const [isLoading2, setIsLoding2] = useState(false);
//   const [isChangePassword, setIsChangePassword] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [chnagePassword, setChangePassword] = useState({
//     // email: localStorage.getItem("userEmail") || "",
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [formFields, setFormsFields] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//   });
//   const context = useContext(MyContext);
//   const history = useNavigate();

//   useEffect(() => {
//     if (
//       context?.userDetails?.data?._id !== "" &&
//       context?.userDetails?.data?._id !== undefined
//     ) {
//       setUserId(context?.userDetails?.data?._id);
//       setFormsFields({
//         name: context?.userDetails?.data?.name,
//         email: context?.userDetails?.data?.email,
//         mobile: context?.userDetails?.data?.mobile,
//       });
//       const ph = context?.userDetails?.data?.mobile?.toString();
//       setPhone(ph);
//     }
//   }, [context?.userDetails]);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       history("/");
//     }
//   }, [context?.isLogin]);
//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormsFields(() => {
//       return {
//         ...formFields,
//         [name]: value,
//       };
//     });
//     setChangePassword(() => {
//       return {
//         ...formFields,
//         [name]: value,
//       };
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoding(true);

//     // 🔹 Validation
//     if (!formFields.name) {
//       context.openAlertBox("error", "Please add Name");
//       setIsLoding(false);
//       return;
//     }
//     if (!formFields.email) {
//       context.openAlertBox("error", "Please add Email");
//       setIsLoding(false);
//       return;
//     }

//     if (!formFields.mobile) {
//       context.openAlertBox("error", "Please add Mobile Number");
//       setIsLoding(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         context.openAlertBox("error", "User not authenticated");
//         setIsLoding(false);
//         return;
//       }
//       const res = await axios.put(
//         `http://localhost:5000/api/user/${userId}`,
//         formFields,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       // ✅ Correct success check
//       if (res?.data?.success) {
//         context.openAlertBox("success", res.data.message);
//         setFormsFields({
//           name: "",
//           email: "",
//           mobile: "",
//         });

//         // Only update tokens if backend sends new ones
//         // if (res?.data?.accessToken) {
//         //   localStorage.setItem("accessToken", res.data.accessToken);
//         //   localStorage.setItem("refreshToken", res.data.refreshToken);
//         // }
//         context.setIsLogin(true);
//       }
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.message || "Unauthorized or update failed";

//       context.openAlertBox("error", errorMessage);
//     } finally {
//       setIsLoding(false);
//     }
//   };
//   const handleSubmitChangePassword = async (e) => {
//     e.preventDefault();
//     setIsLoding2(true);

//     // 🔹 Validation
//     if (!chnagePassword.oldPassword) {
//       context.openAlertBox("error", "Please add Old Password");
//       setIsLoding2(false);
//     }
//     if (!chnagePassword.newPassword) {
//       context.openAlertBox("error", "Please add New Password");
//       setIsLoding2(false);
//       return;
//     }
//     if (!chnagePassword.confirmPassword) {
//       context.openAlertBox("error", "Please add Confirm Password");
//       setIsLoding2(false);
//       return;
//     }
//     if (chnagePassword.confirmPassword !== chnagePassword.newPassword) {
//       context.openAlertBox(
//         "error",
//         "New Password and Confirm Password do not match",
//       );
//       setIsLoding2(false);
//       return;
//     }
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/user/reset-password`,
//         chnagePassword,
//       );

//       // ✅ Correct success check
//       if (res?.data?.success) {
//         context.openAlertBox("success", res.data.message);
//         setIsLoding2(false);
//       }
//     } catch (error) {
//       context.openAlertBox("error", res?.data?.message);
//     } finally {
//       setIsLoding2(false);
//     }
//   };
//   return (
//     <section className="py-10 bg-gray-100 w-full">
//       <div className="container flex gap-5">
//         <div className="col1 w-[20%]">
//           <AccountSidebar />
//         </div>

//         <div className="col2 w-[50%]">
//           <div className="card bg-white p-5 shadow-md rounded-md ">
//             <div className="flex items-center pb-3">
//               <h2 className="pb-3">My Profile</h2>
//               <Button
//                 className="!ml-auto"
//                 onClick={() => setIsChangePassword(!isChangePassword)}
//               >
//                 Change Password
//               </Button>
//             </div>
//             <hr />
//             <form className="mt-5" onSubmit={handleSubmit}>
//               <div className="flex items-center gap-5">
//                 <div className="w-[50%]">
//                   <TextField
//                     size="small"
//                     type="text"
//                     label="Full Name"
//                     variant="outlined"
//                     className="w-full"
//                     name="name"
//                     value={formFields.name}
//                     disabled={isLoading === true ? true : false}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//                 <div className="w-[50%]">
//                   <TextField
//                     size="small"
//                     type="email"
//                     label="Email"
//                     variant="outlined"
//                     className="w-full"
//                     name="email"
//                     value={formFields.email}
//                     disabled={true}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center mt-4 gap-5">
//                 <div className="w-[50%]">
//                   <PhoneInput
//                     defaultCountry="ae"
//                     value={phone}
//                     onChange={(phone) => {
//                       setPhone(phone);
//                       setFormsFields({ mobile: phone });
//                     }}
//                     disabled={isLoading === true ? true : false}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 w-full">
//                 <Button
//                   type="submit"
//                   disabled={isLoading === true ? true : false}
//                   className="!bg-gray-600 !text-white uppercase !mt-5 !mb-3 hover:!bg-gray-400 gap-3 !font-[500]"
//                 >
//                   {isLoading === true ? (
//                     <CircularProgress color="inherit" />
//                   ) : (
//                     "Update Profile"
//                   )}
//                 </Button>
//                 {/* <Button className="btn !text-gray-600 uppercase !mt-5 !mb-3 gap-3 hover:!text-white hover:!bg-gray-600 !font-[500]">
//                   Cencle
//                 </Button> */}
//               </div>
//             </form>
//           </div>
//           <Collapse isOpened={isChangePassword}>
//             <div className="card bg-white p-5 py-5 mt-3 shadow-md rounded-md ">
//               <div className="flex items-center pb-3">
//                 <h2 className="pb-3">Change Password</h2>
//               </div>
//               <hr />
//               <form className="mt-5" onSubmit={handleSubmitChangePassword}>
//                 <div className="grid grid-cols-2 gap-5">
//                   {context?.userDetails?.data?.googleSignup === false && (
//                     <div className="col">
//                       <TextField
//                         size="small"
//                         type="text"
//                         label="Old Password"
//                         variant="outlined"
//                         className="w-full"
//                         name="oldPassword"
//                         value={chnagePassword.oldPassword}
//                         disabled={isLoading2 === true ? true : false}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   )}
//                   <div className="col">
//                     <TextField
//                       size="small"
//                       type="text"
//                       label="New Password"
//                       variant="outlined"
//                       className="w-full"
//                       name="newPassword"
//                       value={chnagePassword.newPassword}
//                       disabled={isLoading2 === true ? true : false}
//                       onChange={onChangeInput}
//                     />
//                   </div>
//                   <div className="col">
//                     <TextField
//                       size="small"
//                       type="text"
//                       label="Confirm New Password"
//                       variant="outlined"
//                       className="w-full"
//                       name="confirmPassword"
//                       value={chnagePassword.confirmPassword}
//                       disabled={isLoading2 === true ? true : false}
//                       onChange={onChangeInput}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 w-full">
//                   <Button
//                     type="submit"
//                     className="!bg-gray-600 !text-white uppercase !mt-5 !mb-3 hover:!bg-gray-400 gap-3 !font-[500]"
//                   >
//                     {isLoading2 === true ? (
//                       <CircularProgress color="inherit" />
//                     ) : (
//                       "Change Password"
//                     )}
//                   </Button>
//                   {/* <Button className="btn !text-gray-600 uppercase !mt-5 !mb-3 gap-3 hover:!text-white hover:!bg-gray-600 !font-[500]">
//                   Cencle
//                 </Button> */}
//                 </div>
//               </form>
//             </div>
//           </Collapse>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default MyAccount;
import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountSidebar from "../Components/AccountSidebar";
import { MyContext } from "../App";
import axios from "axios";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL;
const MyAccount = () => {
  const [isLoading, setIsLoding] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoading2, setIsLoding2] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [chnagePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formFields, setFormsFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    if (
      context?.userDetails?.data?._id !== "" &&
      context?.userDetails?.data?._id !== undefined
    ) {
      setUserId(context?.userDetails?.data?._id);
      setFormsFields({
        name: context?.userDetails?.data?.name,
        email: context?.userDetails?.data?.email,
        mobile: context?.userDetails?.data?.mobile,
      });
      const ph = context?.userDetails?.data?.mobile?.toString();
      setPhone(ph);
    }
  }, [context?.userDetails]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history("/");
    }
  }, [context?.isLogin]);

  // ✅ FIX: this single handler was wired to BOTH the profile form and the
  // change-password form, and both branches spread "...formFields" —
  // meaning every keystroke in the password fields overwrote
  // chnagePassword with a copy of the *profile* fields (name/email/mobile),
  // silently corrupting the password state. Split into two handlers, each
  // spreading its own previous state.
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields((prev) => ({ ...prev, [name]: value }));
  };

  const onChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoding(true);

    if (!formFields.name) {
      context.openAlertBox("error", "Please add Name");
      setIsLoding(false);
      return;
    }
    if (!formFields.email) {
      context.openAlertBox("error", "Please add Email");
      setIsLoding(false);
      return;
    }
    if (!formFields.mobile) {
      context.openAlertBox("error", "Please add Mobile Number");
      setIsLoding(false);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        context.openAlertBox("error", "User not authenticated");
        setIsLoding(false);
        return;
      }
      const res = await axios.put(
        `${API_URL}/api/user/${userId}`,
        formFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res?.data?.success) {
        context.openAlertBox("success", res.data.message);
        // ✅ FIX: resetting to blank strings here immediately wiped the
        // form the user just filled in, right after a successful save —
        // re-populate with what was actually saved instead.
        setFormsFields({
          name: formFields.name,
          email: formFields.email,
          mobile: formFields.mobile,
        });
        context.setIsLogin(true);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Unauthorized or update failed";
      context.openAlertBox("error", errorMessage);
    } finally {
      setIsLoding(false);
    }
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    setIsLoding2(true);

    // ✅ FIX: missing "return" after the first validation meant execution
    // fell through to the next checks even after already flagging an
    // error — could show a misleading second alert or submit half-valid
    // data.
    if (!chnagePassword.oldPassword) {
      context.openAlertBox("error", "Please add Old Password");
      setIsLoding2(false);
      return;
    }
    if (!chnagePassword.newPassword) {
      context.openAlertBox("error", "Please add New Password");
      setIsLoding2(false);
      return;
    }
    if (!chnagePassword.confirmPassword) {
      context.openAlertBox("error", "Please add Confirm Password");
      setIsLoding2(false);
      return;
    }
    if (chnagePassword.confirmPassword !== chnagePassword.newPassword) {
      context.openAlertBox(
        "error",
        "New Password and Confirm Password do not match",
      );
      setIsLoding2(false);
      return;
    }
    try {
      const res = await axios.post(
        `${API_URL}/api/user/reset-password`,
        chnagePassword,
      );

      if (res?.data?.success) {
        context.openAlertBox("success", res.data.message);
        setChangePassword({
          email: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      // ✅ FIX: this referenced "res?.data?.message" — "res" doesn't exist
      // in this catch block (it's the try's success variable, out of
      // scope on failure) -> ReferenceError, so a failed password change
      // crashed instead of showing an error message.
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Password change failed",
      );
    } finally {
      setIsLoding2(false);
    }
  };

  return (
    <><PageTitle  title="My Account"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
    <section className="py-6 sm:py-10 bg-gray-100 w-full">
      <div className="container flex flex-col lg:flex-row gap-5 px-3 sm:px-4 lg:px-0">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="w-full lg:w-[50%]">
          <div className="card bg-white p-4 sm:p-5 shadow-md rounded-md">
            <div className="flex items-center pb-3 flex-wrap gap-2">
              <h2 className="pb-3">My Profile</h2>
              <Button
                className="!ml-auto"
                onClick={() => setIsChangePassword(!isChangePassword)}
              >
                Change Password
              </Button>
            </div>
            <hr />
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-full sm:w-[50%]">
                  <TextField
                    size="small"
                    type="text"
                    label="Full Name"
                    variant="outlined"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading === true}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="w-full sm:w-[50%]">
                  <TextField
                    size="small"
                    type="email"
                    label="Email"
                    variant="outlined"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={true}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <div className="w-full sm:w-[50%]">
                  <PhoneInput
                    defaultCountry="ae"
                    value={phone}
                    onChange={(phoneValue) => {
                      setPhone(phoneValue);
                      // ✅ FIX: this used to be
                      // setFormsFields({ mobile: phone }) — replacing the
                      // ENTIRE object, wiping out name and email as soon
                      // as the phone number was touched.
                      setFormsFields((prev) => ({
                        ...prev,
                        mobile: phoneValue,
                      }));
                    }}
                    disabled={isLoading === true}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <Button
                  type="submit"
                  disabled={isLoading === true}
                  className="!bg-gray-600 !text-white uppercase !mt-5 !mb-3 hover:!bg-gray-400 gap-3 !font-[500]"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>
          <Collapse isOpened={isChangePassword}>
            <div className="card bg-white p-4 sm:p-5 py-5 mt-3 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-3">Change Password</h2>
              </div>
              <hr />
              <form className="mt-5" onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {context?.userDetails?.data?.googleSignup === false && (
                    <div className="col">
                      <TextField
                        size="small"
                        type="password"
                        label="Old Password"
                        variant="outlined"
                        className="w-full"
                        name="oldPassword"
                        value={chnagePassword.oldPassword}
                        disabled={isLoading2 === true}
                        onChange={onChangePasswordInput}
                      />
                    </div>
                  )}
                  <div className="col">
                    <TextField
                      size="small"
                      type="password"
                      label="New Password"
                      variant="outlined"
                      className="w-full"
                      name="newPassword"
                      value={chnagePassword.newPassword}
                      disabled={isLoading2 === true}
                      onChange={onChangePasswordInput}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      size="small"
                      type="password"
                      label="Confirm New Password"
                      variant="outlined"
                      className="w-full"
                      name="confirmPassword"
                      value={chnagePassword.confirmPassword}
                      disabled={isLoading2 === true}
                      onChange={onChangePasswordInput}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full">
                  <Button
                    type="submit"
                    className="!bg-gray-600 !text-white uppercase !mt-5 !mb-3 hover:!bg-gray-400 gap-3 !font-[500]"
                  >
                    {isLoading2 === true ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
    </>
  );
};
export default MyAccount;