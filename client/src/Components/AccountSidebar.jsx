// import { Button, CircularProgress } from "@mui/material";
// import React, { useContext, useEffect, useState } from "react";
// import { BsBagCheck } from "react-icons/bs";
// import { FaCloudUploadAlt, FaRegHeart, FaRegUser } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { NavLink } from "react-router-dom";
// import { MyContext } from "../App";
// import axios from "axios";
// import { LuMapPinCheck } from "react-icons/lu";

// const AccountSidebar = () => {
//   const [previews, setPreviews] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const context = useContext(MyContext);

//   let img_arr = [];
//   let uniqueArray = [];
//   let selectedImages = [];

//   useEffect(()=>{
//     const userAvatar = []
//     if (context?.userDetails?.data?.avatar!=="" && context?.userDetails?.data?.avatar!==undefined) {
//       userAvatar.push(context?.userDetails?.data?.avatar)
//       setPreviews(userAvatar)
//     }
//   },[context?.userDetails])

//   const formdata = new FormData();

//   const onChangeFile = (e, uploadUrl) => {
//     try {
//       setPreviews([]);
//       const files = e.target.files;
//       setUploading(true);
//       // console.log(files);
//       for (var i = 0; i < files.length; i++) {
//         if (
//           files[i] &&
//           (files[i].type === "image/jpeg" ||
//             files[i].type === "image/png" ||
//             files[i].type === "image/jpg" ||
//             files[i].type === "image/webp")
//         ) {
//           const file = files[i];
//           selectedImages.push(file);
//           formdata.append("avatar", file);
//           // const res = axios.put(`http://localhost:5000/api/user/user-avatar`,formdata).then((res)=>{
//           //   console.log(res)
//           // })
//           try {
//             const token = localStorage.getItem("accessToken");

//             const res = axios
//               .put(`http://localhost:5000/api/user/user-avatar`, formdata, {
//                 headers: {
//                   'Authorization': `Bearer ${token}`,
//                   "Content-Type": "multipart/form-data",
//                 },
//               })
//               .then((res) => {
//                 setUploading(false);
//                 let avatar = [];
//                 avatar.push(res.data.avatar);
//                 setPreviews(avatar);
//                 // console.log(res);
//               });
//           } catch (error) {
//             context.error(
//               error?.response?.data?.message || "Unauthorized or Server Error",
//             );
//           }
//         } else {
//           context.openAlertBox(
//             "error",
//             "Please select a valid image file (jpg, jpeg, png, webp).",
//           );
//           setUploading(false);
//           return false;
//         }
//       }
//     } catch (error) {
//       context.error(error);
//     }
//   };
//     const handleLogout = async () => {
//     try {
//       setAnchorEl(null);

//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         context.setIsLogin(false);
//         return;
//       }

//       const res = await axios.get("http://localhost:5000/api/user/logout", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // ✅ ALWAYS REMOVE TOKENS (important)
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       context.setUserDetails(null); // ✅ Clear user details on logout
//       context.setIsLogin(false);
//       context.setCartData([]);
//       context.setMyListData([]);
//       context.openAlertBox("success", res?.data?.message);
//       history("/");
//     } catch (error) {
//       context.openAlertBox("error", error?.response?.data?.message || "Logout failed");

//       // 🔥 Even if API fails, force logout
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       context.setIsLogin(false);
//     }
//   };
//   return (
//     <section className=" sticky top-5">
//       <div className="card bg-white shadow-md rounded-md">
//         <div className="w-full p-5 flex items-center justify-center flex-col group">
//           <div className="w-[110px] h-[110px] rounded-full overflow-hidden relative flex items-center justify-center bg-gray-200">
//             {uploading === true ? 
//               <CircularProgress color="inherit" />
//             : <>
//              {previews.length !== 0 ? previews?.map((img,index)=>{
//               return(
//                 <img src={img} className="w-full object-cover h-full" key={index}/>
//               )
//              }):
//               <img src={"/user.png"} className="w-full object-cover h-full"/>           
//              }
//               </>
//             }
          

//             <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 opacity-0  bg-[rgba(0,0,0.7)] flex items-center justify-center cursor-pointer transition-all group-hover:opacity-80">
//               <FaCloudUploadAlt className="text-white text-[25px]" />
//               <input
//                 type="file"
//                 className=" absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                 accept="image/*"
//                 onChange={(e) =>
//                   onChangeFile(e, `http://localhost:5000/api/user/user-avatar`)
//                 }
//                 name="avatar"
//               />
//             </div>
//           </div>
//           <h3 className="mt-3 text-[17px] font-semibold">{context?.userDetails?.data?.name}</h3>
//           <h6 className="text-[14px]">{context?.userDetails?.data?.email}</h6>
//         </div>
//         <ul className="list-none bg-gray-100 pb-5 myAccountTabs">
//           <li className="w-full ">
//             <NavLink to={"/my-account"} exact={true} activeClassName="isActive">
//               <Button className="w-full !border-none !py-2 !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex font-semibold items-cente gap-2">
//                 <FaRegUser className="text-[15px]" />
//                 My Profile
//               </Button>
//             </NavLink>
//           </li>
//           <li className="w-full ">
//             <NavLink to={"/address"} exact={true} activeClassName="isActive">
//               <Button className="w-full !border-none !py-2 !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex font-semibold items-cente gap-2">
//                 <LuMapPinCheck className="text-[15px]" />
//                 Address
//               </Button>
//             </NavLink>
//           </li>
//           <li className="w-full">
//             <NavLink to={"/my-list"} exact={true} activeClassName="isActive">
//               <Button className="w-full !py-2 !border-none !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex items-cente gap-2">
//                 <FaRegHeart className="text-[15px]" />
//                 My List
//               </Button>
//             </NavLink>
//           </li>
//           <li className="w-full">
//             <NavLink to={"/my-orders"} exact={true} activeClassName="isActive">
//               <Button className="w-full !py-2 !border-none !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex items-cente gap-2">
//                 <BsBagCheck className="text-[15px]" />
//                 My Orders
//               </Button>
//             </NavLink>
//           </li>
//           <li className="w-full">
//             <Button onClick={handleLogout} className="w-full !py-2 !border-none !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex items-cente gap-2">
//               <FiLogOut className="text-[17px]" />
//               Logout
//             </Button>
//           </li>
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default AccountSidebar;
import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { FaCloudUploadAlt, FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ FIX: useNavigate was never imported
import { MyContext } from "../App";
import axios from "axios";
import { LuMapPinCheck } from "react-icons/lu";
const API_URL = import.meta.env.VITE_API_URL
const AccountSidebar = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  // ✅ FIX: handleLogout called setAnchorEl(null) but this state was never
  // declared anywhere in the component -> ReferenceError crash on every
  // logout attempt.
  const [anchorEl, setAnchorEl] = useState(null);
  const context = useContext(MyContext);

  // ✅ FIX: handleLogout called history("/") but "history" (useNavigate())
  // was never declared -> ReferenceError crash after logout.
  const history = useNavigate();

  let selectedImages = [];

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userDetails?.data?.avatar !== "" &&
      context?.userDetails?.data?.avatar !== undefined
    ) {
      userAvatar.push(context?.userDetails?.data?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userDetails]);

  const onChangeFile = (e) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);

          // ✅ FIX: formdata was declared once outside this function at
          // module/render scope and re-used across calls, silently
          // accumulating old files. Now created fresh per upload.
          const formdata = new FormData();
          formdata.append("avatar", file);

          const token = localStorage.getItem("accessToken");

          axios
            .put(`${API_URL}/api/user/user-avatar`, formdata, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              setUploading(false);
              const avatar = [];
              avatar.push(res.data.avatar);
              setPreviews(avatar);
            })
            .catch((error) => {
              setUploading(false);
              // ✅ FIX: context.error(...) doesn't exist on context — the
              // rest of the app uses context.openAlertBox("error", msg).
              // Calling context.error would throw "context.error is not a
              // function" and crash the upload flow.
              context.openAlertBox(
                "error",
                error?.response?.data?.message ||
                  "Unauthorized or Server Error",
              );
            });
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid image file (jpg, jpeg, png, webp).",
          );
          setUploading(false);
          return;
        }
      }
    } catch (error) {
      // ✅ FIX: same context.error(...) bug
      context.openAlertBox("error", error?.message || "Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      setAnchorEl(null);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        context.setIsLogin(false);
        return;
      }

      const res = await axios.get(`${API_URL}/api/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      context.setUserDetails(null);
      context.setIsLogin(false);
      context.setCartData([]);
      context.setMyListData([]);
      context.openAlertBox("success", res?.data?.message);
      history("/");
    } catch (error) {
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Logout failed",
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      context.setIsLogin(false);
    }
  };

  return (
    // ✅ RESPONSIVE FIX: "sticky top-5" pins the sidebar on desktop, which
    // is fine there, but on mobile (stacked layout) a sticky sidebar sits
    // awkwardly above the content. Only stick from md breakpoint up.
    <section className="md:sticky md:top-5">
      <div className="card bg-white shadow-md rounded-md">
        <div className="w-full p-4 sm:p-5 flex items-center justify-center flex-col group">
          <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden relative flex items-center justify-center bg-gray-200">
            {uploading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                {previews.length !== 0 ? (
                  previews?.map((img, index) => (
                    <img
                      src={img}
                      className="w-full object-cover h-full"
                      key={index}
                    />
                  ))
                ) : (
                  <img
                    src={"/user.png"}
                    className="w-full object-cover h-full"
                  />
                )}
              </>
            )}

            <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 opacity-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer transition-all group-hover:opacity-80">
              <FaCloudUploadAlt className="text-white text-[25px]" />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={onChangeFile}
                name="avatar"
              />
            </div>
          </div>
          <h3 className="mt-3 text-[16px] sm:text-[17px] font-semibold text-center break-words">
            {context?.userDetails?.data?.name}
          </h3>
          <h6 className="text-[13px] sm:text-[14px] text-center break-all">
            {context?.userDetails?.data?.email}
          </h6>
        </div>
        <ul className="list-none bg-gray-100 pb-5 myAccountTabs">
          <li className="w-full">
            <NavLink to={"/my-account"} exact={true} activeClassName="isActive">
              <Button className="w-full !border-none !py-2 !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex font-semibold items-center gap-2">
                <FaRegUser className="text-[15px]" />
                My Profile
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to={"/address"} exact={true} activeClassName="isActive">
              <Button className="w-full !border-none !py-2 !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex font-semibold items-center gap-2">
                <LuMapPinCheck className="text-[15px]" />
                Address
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to={"/my-list"} exact={true} activeClassName="isActive">
              <Button className="w-full !py-2 !border-none !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex items-center gap-2">
                <FaRegHeart className="text-[15px]" />
                My List
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to={"/my-orders"} exact={true} activeClassName="isActive">
              <Button className="w-full !py-2 !border-none !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex items-center gap-2">
                <BsBagCheck className="text-[15px]" />
                My Orders
              </Button>
            </NavLink>
          </li>
          <li className="w-full">
            <Button
              onClick={handleLogout}
              className="w-full !py-2 !border-none !text-left !px-5 !justify-start !capitalize !text-gray-600 !rounded-none flex items-center gap-2"
            >
              <FiLogOut className="text-[17px]" />
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AccountSidebar;