// import {
//   Button,
//   CircularProgress,
//   Drawer,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   TextField,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
// import { IoCloseSharp } from "react-icons/io5";
// import { useContext } from "react";
// import { IoBagAddSharp, IoBagCheck, IoBagCheckOutline } from "react-icons/io5";
// import { MyContext } from "../App";
// import { FaPlus } from "react-icons/fa";
// import { FaPen } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { RiDeleteBin6Line } from "react-icons/ri";
// const Checkout = (props) => {
//   const [phone, setPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [address, setAddress] = useState([]);
//   const [isOpneModel, setIsOpenModel] = useState(false);
//   const [addressType, setAddressType] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");
//   const [addressId, setAddressId] = useState([]);
//   const context = useContext(MyContext);
//   const [isChecked, setIsChecked] = useState(0);
//   const [totalAmt, setTotalAmt] = useState();

//   const history = useNavigate();
//   // const [formFields, setFormFields] = useState({
//   //   // ✅ Fix 3: setFormsFields → setFormFields
//   //   address_line1: "",
//   //   city: "",
//   //   state: "",
//   //   pincode: "",
//   //   country: "",
//   //   mobile: "",
//   //   userId: "",
//   //   landmark: "",
//   //   addressType: "",
//   // });

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   useEffect(() => {
//     if (
//       context?.userDetails?.data?._id !== "" &&
//       context?.userDetails?.data?._id !== undefined
//     ) {
//       const token = localStorage.getItem("accessToken");
//       axios
//         .get(
//           `http://localhost:5000/api/address/get?userId=${context?.userDetails?.data?._id}`,
//           { headers: { Authorization: `Bearer ${token}` } },
//         )
//         .then((res) => {
//           setAddress(res.data.address);
//         })
//         .catch((err) => {
//           console.error(err); // ✅ Fix 4: Empty catch fix
//         });

//       props.setFormFields((prev) => ({
//         // ✅ Fix 5: Spread prev
//         ...prev,
//         userId: context?.userDetails?.data?._id,
//         mobile: context?.userDetails?.data?.mobile || "",
//       }));

//       const ph = context?.userDetails?.data?.mobile?.toString();
//       setPhone(ph || "");
//     }
//   }, [context?.userDetails]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (props.formFields.address_line1 === "") {
//       context.openAlertBox("error", "Please add Address Line 1");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.city === "") {
//       context.openAlertBox("error", "Please add City");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.state === "") {
//       context.openAlertBox("error", "Please add State");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.pincode === "") {
//       context.openAlertBox("error", "Please add Pincode");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.country === "") {
//       context.openAlertBox("error", "Please add Country");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.mobile === "") {
//       context.openAlertBox("error", "Please add Mobile Number");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.landmark === "") {
//       context.openAlertBox("error", "Please add Landmark");
//       setIsLoading(false);
//       return;
//     }
//     if (props.formFields.addressType === "") {
//       context.openAlertBox("error", "Please select Address Type");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         context.openAlertBox("error", "User not authenticated");
//         setIsLoading(false);
//         return;
//       }

//       if (context?.addressMode === "edit") {
//         const res = await axios.put(
//           `http://localhost:5000/api/address/${addressId}`, // ✅ Fix 2: context?.addressId → addressId
//           { ...props.formFields, userId: context?.userDetails?.data?._id },
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         if (res?.data?.success) {
//           context.openAlertBox("success", res.data.message);
//           const refresh = await axios.get(
//             `http://localhost:5000/api/address/get?userId=${context?.userDetails?.data?._id}`,
//             { headers: { Authorization: `Bearer ${token}` } },
//           );
//           setAddress(refresh.data.address);
//           context.setOpenAddAddress(false);
//         }
//       } else {
//         const res = await axios.post(
//           `http://localhost:5000/api/address/add`,
//           { ...props.formFields, userId: context?.userDetails?.data?._id },
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         if (res?.data?.success) {
//           context.openAlertBox("success", res.data.message);
//           setAddress((prev) => {
//             const updated = [...prev, res.data.address];
//             if (prev.length === 0) props.setSelectedAddress(res.data.address);
//             return updated;
//           });
//           // setAddress((prev) => [...prev, res.data.address]); // ✅ Fix 3: List update karo
//           context.setOpenAddAddress(false);
//         }
//       }
//     } catch (error) {
//       context.openAlertBox(
//         "error",
//         error?.response?.data?.message || "Something went wrong!",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const editAddress = async (id) => {
//     if (!id) return; // ✅ Fix 4: id check karo

//     setAddressId(id); // ✅ Fix 5: local state mein save karo
//     const token = localStorage.getItem("accessToken");

//     axios
//       .get(`http://localhost:5000/api/address/${id}`, {
//         // ✅ Fix 6: context?.addressId → id
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res?.data?.success) {
//           const data = res?.data?.address;
//           const type = data?.addressType || "";
//           setAddressType(type);
//           props.setFormFields({
//             address_line1: data?.address_line1 || "",
//             city: data?.city || "",
//             state: data?.state || "",
//             pincode: data?.pincode || "",
//             country: data?.country || "",
//             mobile: data?.mobile || "",
//             landmark: data?.landmark || "",
//             addressType: type,
//             userId: data?.userId || "",
//           });
//           setPhone(data?.mobile?.toString() || "");
//         }
//       })
//       .catch((err) => {
//         context.openAlertBox(
//           // ✅ Fix 7: res → err
//           "error",
//           err?.response?.data?.message || "Something went wrong!",
//         );
//       });
//   };

// const removeAddress = async (id) => {
//   if (!id) {
//     context.openAlertBox("error", "Invalid address id");
//     return;
//   }
//   try {
//     setIsLoading(true);
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       context.openAlertBox("error", "User not authenticated");
//       return;
//     }
//     const res = await axios.delete(
//       `http://localhost:5000/api/address/${id}`,
//       { headers: { Authorization: `Bearer ${token}` } },
//     );

//     // ✅ seedha yahan handle karo, nested function nahi
//     if (res?.data?.success) {
//       context.openAlertBox("success", res.data.message);
//       setAddress((prev) => prev.filter((item) => item._id !== id));
//       if (props.selectedAddress?._id === id) {
//         props.setSelectedAddress(null);
//       }
//     }
//   } catch (error) {
//     context.openAlertBox(
//       "error",
//       error?.response?.data?.message || "Something went wrong!",
//     );
//   } finally {
//     setIsLoading(false);
//   }
// };
//   // const removeAddress = async (id) => {
//   //   if (!id) {
//   //     context.openAlertBox("error", "Invalid address id");
//   //     return;
//   //   }
//   //   try {
//   //     setIsLoading(true);
//   //     const token = localStorage.getItem("accessToken");
//   //     if (!token) {
//   //       context.openAlertBox("error", "User not authenticated");
//   //       return;
//   //     }
//   //     const res = await axios.delete(
//   //       `http://localhost:5000/api/address/${id}`,
//   //       { headers: { Authorization: `Bearer ${token}` } },
//   //     );
//   //     if (res?.data?.success) {
//   //       context.openAlertBox("success", res.data.message);
//   //       setAddress((prev) => prev.filter((item) => item._id !== id));
//   //     }
//   //   } catch (error) {
//   //     context.openAlertBox(
//   //       "error",
//   //       error?.response?.data?.message || "Something went wrong!",
//   //     );
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // const handleAddressType = (event) => {
//   //   setAddressType(event.target.value);
//   //   props.setFormFields((prev) => ({ ...prev, addressType: event.target.value }));
//   // };
//   const handleAddressType = (event) => {
//     setAddressType(event.target.value);
//     props.setFormFields((prev) => ({
//       ...prev,
//       addressType: event.target.value,
//     }));
//   };

//   // ✅ Fix 8: Add mode mein form reset karo
//   const handleOpenAddModal = () => {
//     context.setAddressMode("add");
//     setAddressId("");
//     setAddressType("");
//     setPhone("");
//     props.setFormFields({
//       address_line1: "",
//       city: "",
//       state: "",
//       pincode: "",
//       country: "",
//       mobile: "",
//       userId: "",
//       landmark: "",
//       addressType: "",
//     });
//     context.setOpenAddAddress(true);
//   };

//   // ✅ Fix 9: useEffect dependency fix - addressMode change par editAddress call
//   useEffect(() => {
//     if (context?.addressMode === "edit" && context?.addressId) {
//       editAddress(context?.addressId);
//     }
//   }, [context?.addressMode, context?.addressId]);

//   useEffect(() => {
//     if (address?.length > 0 && !props.selectedAddress) {
//       props.setSelectedAddress(address[0]);
//       setIsChecked(0);
//     }
//   }, [address]);

//   const handleChangeInput = (e, index, item) => {
//     if (e.target.checked) {
//       setIsChecked(index);
//       props.setSelectedAddress(item); // ✅ yeh line missing thi — parent ko batao
//     }
//   };

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     props.setFormFields((prev) => ({ ...prev, [name]: value })); // ✅ Fix 6: prev use karo
//   };
//   return (
//     <section className="">
//       <div className="rounded-md bg-gray-50">
//         <div
//           className="py-2 px-3 border-b border-gray-300 flex items-center justify-between"
//           onClick={handleOpenAddModal}
//         >
//           <h1 className="text-[17px] font-semibold">Select Delivery Address</h1>
//           <Button
//             variant="contained"
//             className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200 gap-3"
//             onClick={() => {
//               context?.setOpenAddAddress(true);
//               context?.setAddressMode("add");
//             }}
//           >
//             <FaPlus /> Add New Address
//           </Button>
//         </div>
//       </div>
//       <div className="flex container gap-5 ">
//         <div className="leftCol">
//           <div className="card bg-white p-5 rounded-md">
//             <br />
//             <div className="flex flex-col gap-4">
//               {address?.length > 0 ? (
//                 address?.map((item, index) => (
//                   // ✅ Fix 1: label ke andar map nahi, har item ka alag label
//                   <label
//                     key={item?._id} // ✅ Fix 2: key add karo
//                     className={`flex items-start gap-3 p-4 border border-gray-300 rounded-md relative cursor-pointer ${
//                       isChecked === index ? "bg-blue-100" : ""
//                     }`}
//                   >
//                     <div>
//                       <Radio
//                         size="small"
//                         onChange={(e) => handleChangeInput(e, index, item)}
//                         checked={isChecked === index}
//                         // value={item?._id}
//                         // checked={selectedValue === item?._id} // ✅ Fix 3: selected state
//                         // onChange={() => setSelectedValue(item?._id)}
//                       />
//                     </div>

//                     <div className="info flex flex-col gap-1">
//                       {" "}
//                       {/* ✅ Fix 4: clssName → className, flex-col add */}
//                       <span className="text-[13px] bg-gray-200 px-2 py-0.5 rounded-md w-fit">
//                         {item?.addressType}{" "}
//                         {/* ✅ Fix 7: Address type show karo */}
//                       </span>
//                       <h3 className="font-semibold text-[14px]">
//                         {context?.userDetails?.data?.name}
//                       </h3>
//                       <p className="text-[14px] text-gray-600 m-0">
//                         {/* ✅ Fix 5: Array join karo */}
//                         {[
//                           item?.address_line1,
//                           item?.city,
//                           item?.state,
//                           item?.pincode,
//                           item?.country,
//                           item?.landmark,
//                         ]
//                           .filter(Boolean)
//                           .join(", ")}
//                       </p>
//                       <p className="text-[14px] text-gray-600 m-0">
//                         +{item?.mobile} {/* ✅ Fix 6: Dynamic mobile */}
//                       </p>
//                     </div>
//                     {/* ✅ Fix 8: Edit button */}
//                     <Button
//                       variant="contained"
//                       className="!bg-gray-700 !text-white !top-[15px] !right-[100px] !font-[500] !absolute !text-[14px] !px-3 !py-1 hover:!bg-gray-800 border-none !h-[30px] hover:!border-none !capitalize !transition-colors !duration-200 gap-2"
//                       onClick={() => {
//                         context?.setOpenAddAddress(true);
//                         context?.setAddressMode("edit");
//                         context?.setAddressId(item?._id); // ✅ Fix 9: addressId set karo
//                       }}
//                     >
//                       <FaPen className="text-[11px]" />
//                       Edit
//                     </Button>
//                     <Button
//                       variant="contained"
//                       className="!bg-gray-700 !text-white !top-[15px] !right-[15px] !font-[500] !absolute !text-[14px] !px-3 !py-1 hover:!bg-gray-800 border-none !h-[30px] hover:!border-none !capitalize !transition-colors !duration-200 gap-2"
//                       onClick={() => removeAddress(item?._id)}
//                     >
//                       <RiDeleteBin6Line className="text-[20px]" />
//                     </Button>
//                   </label>
//                 ))
//               ) : (
//                 <>
//                   <div className="flex items-center px-[148px] pb-8 justify-center flex-col gap-2">
//                     <img src="/address.png" className="w-[150px]" />
//                     <h4>No Addresses Found in Your Account</h4>
//                     <p>Add a delivery address </p>
//                     {/* <Button
//                       variant="contained"
//                       className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200"
//                       onClick={context.toggleCartPanel(false)}
//                     >
//                       Add Address
//                     </Button> */}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//           <Drawer
//             open={context.openAddAddress}
//             onClose={context.toggleAddAddress(false)} // ⚠️ toggleAddAddress function check karo
//             anchor="right"
//             className="!w-[450px] addressPanel"
//           >
//             <div className="flex items-center justify-between relative left-2 border-b border-gray-300">
//               <DialogTitle>
//                 {/* ✅ Fix 12: "Eidt" → "Edit" */}
//                 {context.addressMode === "edit" ? "Edit" : "Add"} Delivery
//                 Address
//               </DialogTitle>
//               <IoCloseSharp
//                 className="text-[20px] cursor-pointer"
//                 onClick={() => context.setOpenAddAddress(false)} // ✅ Fix 13: toggleAddAddress(false) → proper function
//               />
//             </div>
//             <div className="flex items-center py-2 px-4">
//               <div className="leftCol w-[100%]">
//                 <form className="w-full mt-5 pb-8" onSubmit={handleSubmit}>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <TextField
//                         className="w-full"
//                         label="Address Line 1"
//                         variant="outlined"
//                         size="small"
//                         name="address_line1"
//                         value={props.formFields.address_line1}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <TextField
//                         className="w-full"
//                         label="City"
//                         variant="outlined"
//                         size="small"
//                         name="city"
//                         value={props.formFields.city}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <TextField
//                         className="w-full"
//                         label="State"
//                         variant="outlined"
//                         size="small"
//                         name="state"
//                         value={props.formFields.state}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <TextField
//                         className="w-full"
//                         label="Country"
//                         variant="outlined"
//                         size="small"
//                         name="country"
//                         value={props.formFields.country}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <TextField
//                         className="w-full"
//                         label="Pincode"
//                         variant="outlined"
//                         size="small"
//                         name="pincode"
//                         value={props.formFields.pincode}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <PhoneInput
//                         defaultCountry="ae"
//                         value={phone}
//                         onChange={(phone) => {
//                           setPhone(phone);
//                           props.setFormFields((prev) => ({
//                             ...prev,
//                             mobile: phone,
//                           }));
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-5 pb-5">
//                     <div className="col w-[100%]">
//                       <TextField
//                         className="w-full"
//                         label="Landmark"
//                         variant="outlined"
//                         size="small"
//                         name="landmark"
//                         value={props.formFields.landmark}
//                         onChange={onChangeInput}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-5">
//                     <FormControl>
//                       <FormLabel>Address Type</FormLabel>
//                       <RadioGroup
//                         row
//                         value={addressType}
//                         onChange={handleAddressType}
//                       >
//                         <FormControlLabel
//                           value="Home"
//                           control={<Radio />}
//                           label="Home"
//                         />
//                         <FormControlLabel
//                           value="Office"
//                           control={<Radio />}
//                           label="Office"
//                         />{" "}
//                         {/* ✅ Fix 14: Office → Work */}
//                       </RadioGroup>
//                     </FormControl>
//                   </div>
//                   <div className="flex items-center gap-5">
//                     <Button
//                       type="submit"
//                       className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
//                     >
//                       {isLoading ? (
//                         <CircularProgress size={20} color="inherit" />
//                       ) : (
//                         "Save"
//                       )}
//                     </Button>
//                     <Button
//                       className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
//                       onClick={() => context.setOpenAddAddress(false)} // ✅ Fix 15: handleClose → proper close
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </Drawer>
//         </div>
//         {/* <div className="rightCol w-[30%]">
//             <div className="card shadow-md bg-white p-5 rounded-md ">
//               <h2 className="text-[17px] font-semibold mb-5">Your Order</h2>
//               <div className="flex items-center justify-between py-3 border-t border-b border-gray-300">
//                 <span className="text-[14px] font-semibold">Product</span>
//                 <span className="text-[14px] font-semibold">Subtotal</span>
//               </div>
//               {context?.cartData?.data?.length !== 0 &&
//                 context?.cartData?.data?.map((item, index) => {
//                   return (
//                     <div className="reviewScroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
//                       <div className="flex items-center justify-between py-2">
//                         <div className="part1 flex items-center gap-3">
//                           <div className="img w-[60px] h-[60px] object-cover overflow-hidden rounded-md group cursor-pointer">
//                             <img
//                               src={item?.image}
//                               className="w-full transition-all group-hover:scale-105"
//                             />
//                           </div>
//                           <div className="info">
//                             <h4 className="text-[14px] font-semibold">
//                               {item?.productTitle}
//                             </h4>
//                             <span className="text-[13px] font[500]">
//                               Qty : {item?.quantity}
//                             </span>
//                           </div>
//                         </div>
//                         <span className="text-[14px] font-[500]">
//                           AED : {item?.subTotal?.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               <div className="flex items-center w-full">
//                 <Button
//                   type="submit"
//                   className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400  border-none hover:!border-none gap-3 !font-semibold"
//                 >
//                   {" "}
//                   <IoBagCheck className="text-[20px]" /> Checkout
//                 </Button>
//               </div>
//             </div>
//           </div> */}
//       </div>
//     </section>
//   );
// };

// export default Checkout;
import {
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from "react";
import { IoBagAddSharp, IoBagCheck, IoBagCheckOutline } from "react-icons/io5";
import { BsGeoAltFill, BsCheckCircleFill } from "react-icons/bs"; // ✅ FIX: added for the "use my location" button
import { MyContext } from "../App";
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
const API_URL = import.meta.env.VITE_API_URL
const Checkout = (props) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [isOpneModel, setIsOpenModel] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [addressId, setAddressId] = useState([]);
  const context = useContext(MyContext);
  const [isChecked, setIsChecked] = useState(0);
  const [totalAmt, setTotalAmt] = useState();

  // ✅ FIX: tracks the "use my current location" button state so the user
  // gets feedback (detecting / captured / failed) instead of nothing
  // happening silently.
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | detecting | success | error

  const history = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (
      context?.userDetails?.data?._id !== "" &&
      context?.userDetails?.data?._id !== undefined
    ) {
      const token = localStorage.getItem("accessToken");
      axios
        .get(
          `${API_URL}/api/address/get?userId=${context?.userDetails?.data?._id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((res) => {
          setAddress(res.data.address);
        })
        .catch((err) => {
          console.error(err);
        });

      props.setFormFields((prev) => ({
        ...prev,
        userId: context?.userDetails?.data?._id,
        mobile: context?.userDetails?.data?.mobile || "",
      }));

      const ph = context?.userDetails?.data?.mobile?.toString();
      setPhone(ph || "");
    }
  }, [context?.userDetails]);

  // ============================================================
  // ✅ FIX: this was completely missing. Without it, latitude/longitude
  // never get onto props.formFields, so the address payload sent to the
  // backend never contains coordinates — no matter how the backend or
  // schema is fixed, the customer marker can never show up.
  // ============================================================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      context.openAlertBox(
        "error",
        "Location detection is not supported by your browser",
      );
      return;
    }

    setLocationStatus("detecting");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        props.setFormFields((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setLocationStatus("success");
        context.openAlertBox("success", "Location captured");
      },
      (err) => {
        console.error("Location detect failed:", err);
        setLocationStatus("error");
        context.openAlertBox(
          "error",
          "Could not detect location. Please allow location access and try again.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (props.formFields.address_line1 === "") {
      context.openAlertBox("error", "Please add Address Line 1");
      setIsLoading(false);
      return;
    }
    if (props.formFields.city === "") {
      context.openAlertBox("error", "Please add City");
      setIsLoading(false);
      return;
    }
    if (props.formFields.state === "") {
      context.openAlertBox("error", "Please add State");
      setIsLoading(false);
      return;
    }
    if (props.formFields.pincode === "") {
      context.openAlertBox("error", "Please add Pincode");
      setIsLoading(false);
      return;
    }
    if (props.formFields.country === "") {
      context.openAlertBox("error", "Please add Country");
      setIsLoading(false);
      return;
    }
    if (props.formFields.mobile === "") {
      context.openAlertBox("error", "Please add Mobile Number");
      setIsLoading(false);
      return;
    }
    if (props.formFields.landmark === "") {
      context.openAlertBox("error", "Please add Landmark");
      setIsLoading(false);
      return;
    }
    if (props.formFields.addressType === "") {
      context.openAlertBox("error", "Please select Address Type");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        context.openAlertBox("error", "User not authenticated");
        setIsLoading(false);
        return;
      }

      if (context?.addressMode === "edit") {
        const res = await axios.put(
          `${API_URL}/api/address/${addressId}`,
          { ...props.formFields, userId: context?.userDetails?.data?._id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res?.data?.success) {
          context.openAlertBox("success", res.data.message);
          const refresh = await axios.get(
            `${API_URL}/api/address/get?userId=${context?.userDetails?.data?._id}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setAddress(refresh.data.address);
          context.setOpenAddAddress(false);
        }
      } else {
        const res = await axios.post(
          `${API_URL}/api/address/add`,
          { ...props.formFields, userId: context?.userDetails?.data?._id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res?.data?.success) {
          context.openAlertBox("success", res.data.message);
          setAddress((prev) => {
            const updated = [...prev, res.data.address];
            if (prev.length === 0) props.setSelectedAddress(res.data.address);
            return updated;
          });
          context.setOpenAddAddress(false);
        }
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Something went wrong!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editAddress = async (id) => {
    if (!id) return;

    setAddressId(id);
    const token = localStorage.getItem("accessToken");

    axios
      .get(`${API_URL}/api/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res?.data?.success) {
          const data = res?.data?.address;
          const type = data?.addressType || "";
          setAddressType(type);
          props.setFormFields({
            address_line1: data?.address_line1 || "",
            city: data?.city || "",
            state: data?.state || "",
            pincode: data?.pincode || "",
            country: data?.country || "",
            mobile: data?.mobile || "",
            landmark: data?.landmark || "",
            addressType: type,
            userId: data?.userId || "",
            // ✅ FIX: carry over saved coordinates when editing an address,
            // otherwise editing would wipe out a previously captured location.
            latitude: data?.latitude ?? null,
            longitude: data?.longitude ?? null,
          });
          setPhone(data?.mobile?.toString() || "");
          setLocationStatus(
            data?.latitude != null && data?.longitude != null
              ? "success"
              : "idle",
          );
        }
      })
      .catch((err) => {
        context.openAlertBox(
          "error",
          err?.response?.data?.message || "Something went wrong!",
        );
      });
  };

  const removeAddress = async (id) => {
    if (!id) {
      context.openAlertBox("error", "Invalid address id");
      return;
    }
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        context.openAlertBox("error", "User not authenticated");
        return;
      }
      const res = await axios.delete(
        `${API_URL}/api/address/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res?.data?.success) {
        context.openAlertBox("success", res.data.message);
        setAddress((prev) => prev.filter((item) => item._id !== id));
        if (props.selectedAddress?._id === id) {
          props.setSelectedAddress(null);
        }
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Something went wrong!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressType = (event) => {
    setAddressType(event.target.value);
    props.setFormFields((prev) => ({
      ...prev,
      addressType: event.target.value,
    }));
  };

  const handleOpenAddModal = () => {
    context.setAddressMode("add");
    setAddressId("");
    setAddressType("");
    setPhone("");
    setLocationStatus("idle"); // ✅ FIX: reset location UI state for a fresh add
    props.setFormFields({
      address_line1: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      mobile: "",
      userId: "",
      landmark: "",
      addressType: "",
      latitude: null, // ✅ FIX: field now exists in the reset shape
      longitude: null, // ✅ FIX: field now exists in the reset shape
    });
    context.setOpenAddAddress(true);
  };

  useEffect(() => {
    if (context?.addressMode === "edit" && context?.addressId) {
      editAddress(context?.addressId);
    }
  }, [context?.addressMode, context?.addressId]);

  useEffect(() => {
    if (address?.length > 0 && !props.selectedAddress) {
      props.setSelectedAddress(address[0]);
      setIsChecked(0);
    }
  }, [address]);

  const handleChangeInput = (e, index, item) => {
    if (e.target.checked) {
      setIsChecked(index);
      props.setSelectedAddress(item);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    props.setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="">
      <div className="rounded-md bg-gray-50">
        <div
          className="py-2 px-3 border-b border-gray-300 flex items-center justify-between"
          onClick={handleOpenAddModal}
        >
          <h1 className="text-[17px] font-semibold">Select Delivery Address</h1>
          <Button
            variant="contained"
            className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200 gap-3"
            onClick={() => {
              context?.setOpenAddAddress(true);
              context?.setAddressMode("add");
            }}
          >
            <FaPlus /> Add New Address
          </Button>
        </div>
      </div>
      <div className="flex container gap-5 ">
        <div className="leftCol">
          <div className="card bg-white p-5 rounded-md">
            <br />
            <div className="flex flex-col gap-4">
              {address?.length > 0 ? (
                address?.map((item, index) => (
                  <label
                    key={item?._id}
                    className={`flex items-start gap-3 p-4 border border-gray-300 rounded-md relative cursor-pointer ${
                      isChecked === index ? "bg-blue-100" : ""
                    }`}
                  >
                    <div>
                      <Radio
                        size="small"
                        onChange={(e) => handleChangeInput(e, index, item)}
                        checked={isChecked === index}
                      />
                    </div>

                    <div className="info flex flex-col gap-1">
                      <span className="text-[13px] bg-gray-200 px-2 py-0.5 rounded-md w-fit">
                        {item?.addressType}
                      </span>
                      <h3 className="font-semibold text-[14px]">
                        {context?.userDetails?.data?.name}
                      </h3>
                      <p className="text-[14px] text-gray-600 m-0">
                        {[
                          item?.address_line1,
                          item?.city,
                          item?.state,
                          item?.pincode,
                          item?.country,
                          item?.landmark,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                      <p className="text-[14px] text-gray-600 m-0">
                        +{item?.mobile}
                      </p>
                      {/* ✅ small indicator so it's visible from the list
                          whether this saved address has a live-tracking
                          location on it or not */}
                      {item?.latitude != null && item?.longitude != null ? (
                        <span className="text-[12px] text-emerald-600 flex items-center gap-1">
                          <BsCheckCircleFill /> Location saved
                        </span>
                      ) : (
                        <span className="text-[12px] text-amber-600">
                          No location saved — edit to add one
                        </span>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      className="!bg-gray-700 !text-white !top-[15px] !right-[100px] !font-[500] !absolute !text-[14px] !px-3 !py-1 hover:!bg-gray-800 border-none !h-[30px] hover:!border-none !capitalize !transition-colors !duration-200 gap-2"
                      onClick={() => {
                        context?.setOpenAddAddress(true);
                        context?.setAddressMode("edit");
                        context?.setAddressId(item?._id);
                      }}
                    >
                      <FaPen className="text-[11px]" />
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      className="!bg-gray-700 !text-white !top-[15px] !right-[15px] !font-[500] !absolute !text-[14px] !px-3 !py-1 hover:!bg-gray-800 border-none !h-[30px] hover:!border-none !capitalize !transition-colors !duration-200 gap-2"
                      onClick={() => removeAddress(item?._id)}
                    >
                      <RiDeleteBin6Line className="text-[20px]" />
                    </Button>
                  </label>
                ))
              ) : (
                <>
                  <div className="flex items-center px-[148px] pb-8 justify-center flex-col gap-2">
                    <img src="/address.png" className="w-[150px]" />
                    <h4>No Addresses Found in Your Account</h4>
                    <p>Add a delivery address </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <Drawer
            open={context.openAddAddress}
            onClose={context.toggleAddAddress(false)}
            anchor="right"
            className="!w-[450px] addressPanel"
          >
            <div className="flex items-center justify-between relative left-2 border-b border-gray-300">
              <DialogTitle>
                {context.addressMode === "edit" ? "Edit" : "Add"} Delivery
                Address
              </DialogTitle>
              <IoCloseSharp
                className="text-[20px] cursor-pointer"
                onClick={() => context.setOpenAddAddress(false)}
              />
            </div>
            <div className="flex items-center py-2 px-4">
              <div className="leftCol w-[100%]">
                <form className="w-full mt-5 pb-8" onSubmit={handleSubmit}>
                  {/* ✅ FIX: "use my current location" — this is the piece
                      that actually gets latitude/longitude into the form.
                      Placed at the top so it's the first thing filled. */}
                  <div className="flex items-center gap-3 pb-5">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={detectLocation}
                      disabled={locationStatus === "detecting"}
                      className="!normal-case !w-full !flex !items-center !gap-2"
                    >
                      {locationStatus === "detecting" ? (
                        <CircularProgress size={16} />
                      ) : (
                        <BsGeoAltFill />
                      )}
                      {props.formFields?.latitude != null &&
                      props.formFields?.longitude != null
                        ? "Location Captured ✓ (tap to update)"
                        : "Use My Current Location"}
                    </Button>
                  </div>
                  {locationStatus === "error" && (
                    <p className="text-[12px] text-red-500 -mt-3 pb-4">
                      Location access denied or unavailable. Delivery
                      tracking on the map will not work for this address
                      without it.
                    </p>
                  )}

                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="Address Line 1"
                        variant="outlined"
                        size="small"
                        name="address_line1"
                        value={props.formFields.address_line1}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="City"
                        variant="outlined"
                        size="small"
                        name="city"
                        value={props.formFields.city}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="State"
                        variant="outlined"
                        size="small"
                        name="state"
                        value={props.formFields.state}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="Country"
                        variant="outlined"
                        size="small"
                        name="country"
                        value={props.formFields.country}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="Pincode"
                        variant="outlined"
                        size="small"
                        name="pincode"
                        value={props.formFields.pincode}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <PhoneInput
                        defaultCountry="ae"
                        value={phone}
                        onChange={(phone) => {
                          setPhone(phone);
                          props.setFormFields((prev) => ({
                            ...prev,
                            mobile: phone,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="Landmark"
                        variant="outlined"
                        size="small"
                        name="landmark"
                        value={props.formFields.landmark}
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <FormControl>
                      <FormLabel>Address Type</FormLabel>
                      <RadioGroup
                        row
                        value={addressType}
                        onChange={handleAddressType}
                      >
                        <FormControlLabel
                          value="Home"
                          control={<Radio />}
                          label="Home"
                        />
                        <FormControlLabel
                          value="Office"
                          control={<Radio />}
                          label="Office"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="flex items-center gap-5">
                    <Button
                      type="submit"
                      className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
                    >
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                    <Button
                      className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
                      onClick={() => context.setOpenAddAddress(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </section>
  );
};

export default Checkout;