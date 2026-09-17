// // import {
// //   Button,
// //   CircularProgress,
// //   Drawer,
// //   FormControl,
// //   FormControlLabel,
// //   FormLabel,
// //   MenuItem,
// //   Radio,
// //   RadioGroup,
// //   Select,
// //   TextField,
// // } from "@mui/material";
// // import AccountSidebar from "../../Components/AccountSidebar";
// // import { useEffect, useState } from "react";
// // import { MyContext } from "../../App";
// // import { useContext } from "react";
// // import Dialog from "@mui/material/Dialog";
// // import { PhoneInput } from "react-international-phone";
// // import "react-international-phone/style.css";
// // import DialogTitle from "@mui/material/DialogTitle";
// // import axios from "axios";
// // import { FaRegTrashAlt } from "react-icons/fa";
// // import AddressBox from "./AddressBox";
// // import { IoCloseSharp } from "react-icons/io5";

// // const label = { slotProps: { input: { "aria-label": "Radio" } } }; // ✅ Fix 1: "Redio" → "Radio"

// // const Address = () => {
// //   const [phone, setPhone] = useState("");
// //   const [isLoading, setIsLoading] = useState(false); // ✅ Fix 2: setIsLoding → setIsLoading, default false
// //   const [address, setAddress] = useState([]);
// //   const context = useContext(MyContext);
// //   const [isOpneModel, setIsOpenModel] = useState(false);
// //   const [addressType, setAddressType] = useState("");
// //   const [selectedValue, setSelectedValue] = useState("");
// //   const [addressId, setAddressId] = useState([]);

// //   const [formFields, setFormFields] = useState({
// //     // ✅ Fix 3: setFormsFields → setFormFields
// //     address_line1: "",
// //     city: "",
// //     state: "",
// //     pincode: "",
// //     country: "",
// //     mobile: "",
// //     userId: "",
// //     landmark: "",
// //     addressType: "",
// //   });

// //   const handleChange = (event) => {
// //     setSelectedValue(event.target.value);
// //   };

// //   useEffect(() => {
// //     if (
// //       context?.userDetails?.data?._id !== "" &&
// //       context?.userDetails?.data?._id !== undefined
// //     ) {
// //       const token = localStorage.getItem("accessToken");
// //       axios
// //         .get(
// //           `http://localhost:5000/api/address/get?userId=${context?.userDetails?.data?._id}`,
// //           { headers: { Authorization: `Bearer ${token}` } },
// //         )
// //         .then((res) => {
// //           setAddress(res.data.address);
// //         })
// //         .catch((err) => {
// //           console.error(err); // ✅ Fix 4: Empty catch fix
// //         });

// //       setFormFields((prev) => ({
// //         // ✅ Fix 5: Spread prev
// //         ...prev,
// //         userId: context?.userDetails?.data?._id,
// //         mobile: context?.userDetails?.data?.mobile || "",
// //       }));

// //       const ph = context?.userDetails?.data?.mobile?.toString();
// //       setPhone(ph || "");
// //     }
// //   }, [context?.userDetails]);

// //   const onChangeInput = (e) => {
// //     const { name, value } = e.target;
// //     setFormFields((prev) => ({ ...prev, [name]: value })); // ✅ Fix 6: prev use karo
// //   };

// //   const handleClose = () => {
// //     setIsOpenModel(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(false);

// //     // Validation
// //     if (formFields.address_line1 === "") {
// //       context.openAlertBox("error", "Please add Address Line 1");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.city === "") {
// //       context.openAlertBox("error", "Please add City");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.state === "") {
// //       context.openAlertBox("error", "Please add State");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.pincode === "") {
// //       context.openAlertBox("error", "Please add Pincode");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.country === "") {
// //       context.openAlertBox("error", "Please add Country");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.mobile === "") {
// //       context.openAlertBox("error", "Please add Mobile Number");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.landmark === "") {
// //       context.openAlertBox("error", "Please add Landmark");
// //       setIsLoading(false);
// //       return;
// //     }
// //     if (formFields.addressType === "") {
// //       context.openAlertBox("error", "Please select Address Type");
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       if (!token) {
// //         context.openAlertBox("error", "User not authenticated");
// //         setIsLoading(true);
// //         return;
// //       }
// //       if (context?.addressMode === "add") {
// //         // ✅ Add mode
// //         const res = await axios.post(
// //           `http://localhost:5000/api/address/add`,
// //           { ...formFields, userId: context?.userDetails?.data?._id },
// //           { headers: { Authorization: `Bearer ${token}` } },
// //         );

// //         if (res?.data?.success) {
// //           context.openAlertBox("success", res?.data?.message);
// //           context.setOpenAddAddress(false);
// //           // setAddress(res.data.address);
// //           setAddress((prev) => [...prev, res?.data?.address]);
// //         }
// //       }
// //       // ✅ Fix 1: mode check pehle karo
// //       if (context?.addressMode === "edit") {
// //         // ✅ Fix 2: PUT request mein data aur headers dono pass karo
// //         const res = await axios.put(
// //           `http://localhost:5000/api/address/${addressId}`,
// //           { ...formFields, userId: context?.userDetails?.data?._id }, // ✅ data pass karo
// //           { headers: { Authorization: `Bearer ${token}` } }, // ✅ headers alag parameter mein
// //         );

// //         if (res?.data?.success) {
// //           axios
// //             .get(
// //               `http://localhost:5000/api/address/get?userId=${context?.userDetails?.data?._id}`,
// //               { headers: { Authorization: `Bearer ${token}` } },
// //             )
// //             .then((res) => {
// //               setAddress(res.data.address);
// //               context.setOpenAddAddress(false);
// //             });
// //         }
// //       }
// //     } catch (error) {
// //       context.openAlertBox("error", res?.data?.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
// //   const editAddress = async (id) => {
// //     // ✅ Fix 1: id check karo pehle
// //     // setAddressId(id);

// //     const token = localStorage.getItem("accessToken");

// //     axios
// //       .get(`http://localhost:5000/api/address/${context?.addressId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         if (res?.data?.success) {
// //           // ✅ Fix 2: Data form mein set karo
// //           const data = res?.data?.address;
// //           setFormFields({
// //             address_line1: data?.address_line1 || "",
// //             city: data?.city || "",
// //             state: data?.state || "",
// //             pincode: data?.pincode || "",
// //             country: data?.country || "",
// //             mobile: data?.mobile || "",
// //             landmark: data?.landmark || "",
// //             addressType: data?.addressType || "",
// //             userId: data?.userId || "",
// //           });
// //           setAddressType(data?.addressType || "");
// //           setPhone(data?.mobile?.toString() || "");
// //         }
// //         // "Home" ya "Work" aana chahiye
// //       })
// //       .catch((err) => {
// //         context.openAlertBox("error", res?.data?.message);
// //       });
// //   };
// //   const removeAddress = async (id) => {
// //     if (!id) {
// //       context.openAlertBox("error", "Invalid address id");
// //       return;
// //     }
// //     try {
// //       setIsLoading(true);
// //       const token = localStorage.getItem("accessToken");
// //       if (!token) {
// //         context.openAlertBox("error", "User not authenticated");
// //         return;
// //       }
// //       const res = await axios.delete(
// //         `http://localhost:5000/api/address/${id}`,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );
// //       if (res?.data?.success) {
// //         context.openAlertBox("success", res.data.message);
// //         setAddress((prev) => prev.filter((item) => item._id !== id)); // ✅ Fix 9: UI se remove karo
// //       }
// //     } catch (error) {
// //       context.openAlertBox(
// //         "error",
// //         error?.response?.data?.message || "Something went wrong!",
// //       );
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleAddressType = (event) => {
// //     // ✅ Fix 10: hnadleAddressType → handleAddressType
// //     setAddressType(event.target.value);
// //     setFormFields((prev) => ({ ...prev, addressType: event.target.value }));
// //   };
// //   useEffect(() => {
// //     editAddress(context?.addressId);
// //   }, [context?.addressId]);

// //   return (
// //     <>
// //       <section className="py-10 bg-gray-100 w-full">
// //         <div className="container flex gap-5">
// //           <div className="col1 w-[20%]">
// //             <AccountSidebar />
// //           </div>
// //           <div className="col2 w-[50%]">
// //             <div className="card bg-white p-5 shadow-md rounded-md">
// //               <div className="flex items-center pb-3">
// //                 <h2 className="pb-3 font-semibold">Address</h2>
// //               </div>
// //               <hr />
// //               <div
// //                 className="flex items-center justify-center p-5 border border-dashed border-gray-500 cursor-pointer"
// //                 // onClick={() => setIsOpenModel(true)}
// //                 // onClick={() => setIsO(true)}
// //                 onClick={() => {
// //                   context.setOpenAddAddress(true);
// //                   context.setAddressMode("add");
// //                 }}
// //               >
// //                 <span className="text-[14px] font-semibold">Add Address</span>
// //               </div>
// //               <div className="flex gap-2 flex-col mt-4">
// //                 {address?.length > 0 &&
// //                   address?.map((item, index) => (
// //                     // <div
// //                     //   key={item._id} // ✅ Fix 11: key add kiya
// //                     //   className="addressBox group relative p-5 border border-dashed border-gray-500 w-full bg-[#f1f1f1] rounded-md cursor-pointer"
// //                     // >
// //                     //   <span className="inline-block p-1 rounded-lg bg-gray-300">{item?.addressType}</span>
// //                     //   <h4 className="pt-2 font-semibold flex items-center gap-3">
// //                     //     <span>{context?.userDetails?.data?.name}</span>
// //                     //     <span>+{item?.mobile}</span>
// //                     //   </h4>
// //                     //       <span className="block w-100 pt-0">
// //                     //       {/* ✅ Fix 12: Comma separator add kiya */}
// //                     //       {[
// //                     //         item?.address_line1,
// //                     //         item?.city,
// //                     //         item?.state,
// //                     //         item?.pincode,
// //                     //         item?.country,
// //                     //       ]
// //                     //         .filter(Boolean)
// //                     //         .join(", ")}
// //                     //     </span>
// //                     // </div>
// //                     <AddressBox
// //                       item={item}
// //                       removeAddress={removeAddress}
// //                       editAddress={editAddress}
// //                     />
// //                   ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <Drawer
// //         open={context.openAddAddress}
// //         onClose={context.toggleAddAddress(false)}
// //         anchor="right"
// //         className="!w-[450px] addressPanel"
// //       >
// //         <div className="flex items-center justify-between relative left-2 border-b border-gray-300">
// //           <DialogTitle>
// //             {context.addressMode === "add" ? "Add" : "Eidt"} Delivery Address
// //           </DialogTitle>
// //           <IoCloseSharp
// //             className="text-[20px] cursor-pointer"
// //             onClick={context.toggleAddAddress(false)}
// //           />
// //         </div>
// //         <div className="flex items-center py-2 px-4">
// //           <div className="leftCol w-[100%]">
// //             <form className="w-full mt-5 pb-8" onSubmit={handleSubmit}>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <TextField
// //                     className="w-full"
// //                     label="Address Line 1"
// //                     variant="outlined"
// //                     size="small"
// //                     name="address_line1"
// //                     value={formFields.address_line1}
// //                     onChange={onChangeInput}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <TextField
// //                     className="w-full"
// //                     label="City"
// //                     variant="outlined"
// //                     size="small"
// //                     name="city"
// //                     value={formFields.city}
// //                     onChange={onChangeInput}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <TextField
// //                     className="w-full"
// //                     label="State"
// //                     variant="outlined"
// //                     size="small"
// //                     name="state"
// //                     value={formFields.state}
// //                     onChange={onChangeInput}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <TextField
// //                     className="w-full"
// //                     label="Country"
// //                     variant="outlined"
// //                     size="small"
// //                     name="country" // ✅ Fix 13: "countery" → "country"
// //                     value={formFields.country}
// //                     onChange={onChangeInput}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <TextField
// //                     className="w-full"
// //                     label="Pincode"
// //                     variant="outlined"
// //                     size="small"
// //                     name="pincode"
// //                     value={formFields.pincode}
// //                     onChange={onChangeInput}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <PhoneInput
// //                     defaultCountry="ae"
// //                     value={phone}
// //                     onChange={(phone) => {
// //                       setPhone(phone);
// //                       setFormFields((prev) => ({ ...prev, mobile: phone })); // ✅ Fix 14: Spread prev
// //                     }}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-5 pb-5">
// //                 <div className="col w-[100%]">
// //                   <TextField
// //                     className="w-full"
// //                     label="Landmark"
// //                     variant="outlined"
// //                     size="small"
// //                     name="landmark" // ✅ Fix 15: " landmark" space remove
// //                     value={formFields.landmark}
// //                     onChange={onChangeInput}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex flex-col gap-5">
// //                 <FormControl>
// //                   <FormLabel>Address Type</FormLabel>
// //                   <RadioGroup
// //                     row
// //                     value={addressType}
// //                     onChange={handleAddressType}
// //                   >
// //                     <FormControlLabel
// //                       value="Home"
// //                       control={<Radio />}
// //                       label="Home"
// //                     />
// //                     <FormControlLabel
// //                       value="Office"
// //                       control={<Radio />}
// //                       label="Office"
// //                     />{" "}
// //                     {/* ✅ Fix 16: "Office" → "Work" */}
// //                   </RadioGroup>
// //                 </FormControl>
// //               </div>
// //               <div className="flex items-center gap-5">
// //                 <Button
// //                   type="submit"
// //                   className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
// //                 >
// //                   {isLoading ? (
// //                     <CircularProgress size={20} color="inherit" />
// //                   ) : (
// //                     "Save"
// //                   )}{" "}
// //                   {/* ✅ Fix 17: Loading state */}
// //                 </Button>
// //                 <Button
// //                   className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
// //                   onClick={handleClose}
// //                 >
// //                   Cancel {/* ✅ Fix 18: "Cencel" → "Cancel" */}
// //                 </Button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </Drawer>
// //     </>
// //   );
// // };

// // export default Address;

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
// import AccountSidebar from "../../Components/AccountSidebar";
// import { useEffect, useState } from "react";
// import { MyContext } from "../../App";
// import { useContext } from "react";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
// import AddressBox from "./AddressBox";
// import { IoCloseSharp } from "react-icons/io5";

// const Address = () => {
//   const [phone, setPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [address, setAddress] = useState([]);
//   const context = useContext(MyContext);
//   const [addressType, setAddressType] = useState("");
//   const [addressId, setAddressId] = useState(""); // ✅ Fix 1: {} → "" string hona chahiye

//   const [formFields, setFormFields] = useState({
//     address_line1: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     mobile: "",
//     userId: "",
//     landmark: "",
//     addressType: "",
//   });

//   useEffect(() => {
//     if (
//       context?.userDetails?.data?._id !== "" &&
//       context?.userDetails?.data?._id !== undefined
//     ) {
//       const token = localStorage.getItem("accessToken");
//       axios
//         .get(
//           `http://localhost:5000/api/address/get?userId=${context?.userDetails?.data?._id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         .then((res) => {
//           setAddress(res.data.address);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [context?.userDetails]);

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormFields((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (formFields.address_line1 === "") {
//       context.openAlertBox("error", "Please add Address Line 1");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.city === "") {
//       context.openAlertBox("error", "Please add City");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.state === "") {
//       context.openAlertBox("error", "Please add State");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.pincode === "") {
//       context.openAlertBox("error", "Please add Pincode");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.country === "") {
//       context.openAlertBox("error", "Please add Country");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.mobile === "") {
//       context.openAlertBox("error", "Please add Mobile Number");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.landmark === "") {
//       context.openAlertBox("error", "Please add Landmark");
//       setIsLoading(false);
//       return;
//     }
//     if (formFields.addressType === "") {
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
//           { ...formFields, userId: context?.userDetails?.data?._id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res?.data?.success) {
//           context.openAlertBox("success", res.data.message);
//           const refresh = await axios.get(
//             `http://localhost:5000/api/address/get?userId=${context?.userDetails?.data?._id}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           setAddress(refresh.data.address);
//           context.setOpenAddAddress(false);
//         }
//       } else {
//         const res = await axios.post(
//           `http://localhost:5000/api/address/add`,
//           { ...formFields, userId: context?.userDetails?.data?._id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res?.data?.success) {
//           context.openAlertBox("success", res.data.message);
//           setAddress((prev) => [...prev, res.data.address]); // ✅ Fix 3: List update karo
//           context.setOpenAddAddress(false);
//         }
//       }
//     } catch (error) {
//       context.openAlertBox(
//         "error",
//         error?.response?.data?.message || "Something went wrong!"
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
//       .get(`http://localhost:5000/api/address/${id}`, { // ✅ Fix 6: context?.addressId → id
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res?.data?.success) {
//           const data = res?.data?.address;
//           const type = data?.addressType || "";
//           setAddressType(type);
//           setFormFields({
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
//         context.openAlertBox( // ✅ Fix 7: res → err
//           "error",
//           err?.response?.data?.message || "Something went wrong!"
//         );
//       });
//   };

//   const removeAddress = async (id) => {
//     if (!id) {
//       context.openAlertBox("error", "Invalid address id");
//       return;
//     }
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         context.openAlertBox("error", "User not authenticated");
//         return;
//       }
//       const res = await axios.delete(
//         `http://localhost:5000/api/address/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res?.data?.success) {
//         context.openAlertBox("success", res.data.message);
//         setAddress((prev) => prev.filter((item) => item._id !== id));
//       }
//     } catch (error) {
//       context.openAlertBox(
//         "error",
//         error?.response?.data?.message || "Something went wrong!"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddressType = (event) => {
//     setAddressType(event.target.value);
//     setFormFields((prev) => ({ ...prev, addressType: event.target.value }));
//   };

//   // ✅ Fix 8: Add mode mein form reset karo
//   const handleOpenAddModal = () => {
//     context.setAddressMode("add");
//     setAddressId("");
//     setAddressType("");
//     setPhone("");
//     setFormFields({
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

//   return (
//     <>
//       <section className="py-10 bg-gray-100 w-full">
//         <div className="container flex gap-5">
//           <div className="col1 w-[20%]">
//             <AccountSidebar />
//           </div>
//           <div className="col2 w-[50%]">
//             <div className="card bg-white p-5 shadow-md rounded-md">
//               <div className="flex items-center pb-3">
//                 <h2 className="pb-3 font-semibold">Address</h2>
//               </div>
//               <hr />
//               {/* ✅ Fix 10: Duplicate onClick remove, handleOpenAddModal use karo */}
//               <div
//                 className="flex items-center justify-center p-5 border border-dashed border-gray-500 cursor-pointer"
//                 onClick={handleOpenAddModal}
//               >
//                 <span className="text-[14px] font-semibold">Add Address</span>
//               </div>
//               <div className="flex gap-2 flex-col mt-4">
//                 {address?.length > 0 &&
//                   address?.map((item) => (
//                     <AddressBox
//                       key={item._id} // ✅ Fix 11: key add karo
//                       item={item}
//                       removeAddress={removeAddress}
//                       editAddress={editAddress}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Drawer
//         open={context.openAddAddress}
//         onClose={context.toggleAddAddress(false)} // ⚠️ toggleAddAddress function check karo
//         anchor="right"
//         className="!w-[450px] addressPanel"
//       >
//         <div className="flex items-center justify-between relative left-2 border-b border-gray-300">
//           <DialogTitle>
//             {/* ✅ Fix 12: "Eidt" → "Edit" */}
//             {context.addressMode === "edit" ? "Edit" : "Add"} Delivery Address
//           </DialogTitle>
//           <IoCloseSharp
//             className="text-[20px] cursor-pointer"
//             onClick={() => context.setOpenAddAddress(false)} // ✅ Fix 13: toggleAddAddress(false) → proper function
//           />
//         </div>
//         <div className="flex items-center py-2 px-4">
//           <div className="leftCol w-[100%]">
//             <form className="w-full mt-5 pb-8" onSubmit={handleSubmit}>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="Address Line 1"
//                     variant="outlined"
//                     size="small"
//                     name="address_line1"
//                     value={formFields.address_line1}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="City"
//                     variant="outlined"
//                     size="small"
//                     name="city"
//                     value={formFields.city}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="State"
//                     variant="outlined"
//                     size="small"
//                     name="state"
//                     value={formFields.state}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="Country"
//                     variant="outlined"
//                     size="small"
//                     name="country"
//                     value={formFields.country}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="Pincode"
//                     variant="outlined"
//                     size="small"
//                     name="pincode"
//                     value={formFields.pincode}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <PhoneInput
//                     defaultCountry="ae"
//                     value={phone}
//                     onChange={(phone) => {
//                       setPhone(phone);
//                       setFormFields((prev) => ({ ...prev, mobile: phone }));
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center gap-5 pb-5">
//                 <div className="col w-[100%]">
//                   <TextField
//                     className="w-full"
//                     label="Landmark"
//                     variant="outlined"
//                     size="small"
//                     name="landmark"
//                     value={formFields.landmark}
//                     onChange={onChangeInput}
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-5">
//                 <FormControl>
//                   <FormLabel>Address Type</FormLabel>
//                   <RadioGroup
//                     row
//                     value={addressType}
//                     onChange={handleAddressType}
//                   >
//                     <FormControlLabel value="Home" control={<Radio />} label="Home" />
//                     <FormControlLabel value="Work" control={<Radio />} label="Work" /> {/* ✅ Fix 14: Office → Work */}
//                   </RadioGroup>
//                 </FormControl>
//               </div>
//               <div className="flex items-center gap-5">
//                 <Button
//                   type="submit"
//                   className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
//                 >
//                   {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save"}
//                 </Button>
//                 <Button
//                   className="!bg-gray-600 !w-full !text-white uppercase !text-[16px] !mt-5 !mb-3 hover:!bg-gray-400 border-none !font-semibold"
//                   onClick={() => context.setOpenAddAddress(false)} // ✅ Fix 15: handleClose → proper close
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Drawer>
//     </>
//   );
// };

// export default Address;

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
import AccountSidebar from "../../Components/AccountSidebar";
import { useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useContext } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import AddressBox from "./AddressBox";
import { IoCloseSharp } from "react-icons/io5";
import { BsGeoAltFill } from "react-icons/bs"; // ✅ added for "use my location"
import PageTitle from "../../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const Address = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const context = useContext(MyContext);
  const [addressType, setAddressType] = useState("");
  const [addressId, setAddressId] = useState("");

  // ✅ same pattern used in Checkout.jsx — tracks the geolocation button
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | detecting | success | error

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    landmark: "",
    addressType: "",
    latitude: null,
    longitude: null,
  });

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
    }
  }, [context?.userDetails]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Same "use my current location" flow as Checkout.jsx — without this,
  // any address added from THIS page would never get latitude/longitude,
  // even though the checkout form does capture it. Both entry points need
  // to save coordinates for delivery tracking to work consistently.
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
        setFormFields((prev) => ({
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

    if (formFields.address_line1 === "") {
      context.openAlertBox("error", "Please add Address Line 1");
      setIsLoading(false);
      return;
    }
    if (formFields.city === "") {
      context.openAlertBox("error", "Please add City");
      setIsLoading(false);
      return;
    }
    if (formFields.state === "") {
      context.openAlertBox("error", "Please add State");
      setIsLoading(false);
      return;
    }
    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please add Pincode");
      setIsLoading(false);
      return;
    }
    if (formFields.country === "") {
      context.openAlertBox("error", "Please add Country");
      setIsLoading(false);
      return;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please add Mobile Number");
      setIsLoading(false);
      return;
    }
    if (formFields.landmark === "") {
      context.openAlertBox("error", "Please add Landmark");
      setIsLoading(false);
      return;
    }
    if (formFields.addressType === "") {
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
          { ...formFields, userId: context?.userDetails?.data?._id },
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
          { ...formFields, userId: context?.userDetails?.data?._id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res?.data?.success) {
          context.openAlertBox("success", res.data.message);
          setAddress((prev) => [...prev, res.data.address]);
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
          setFormFields({
            address_line1: data?.address_line1 || "",
            city: data?.city || "",
            state: data?.state || "",
            pincode: data?.pincode || "",
            country: data?.country || "",
            mobile: data?.mobile || "",
            landmark: data?.landmark || "",
            addressType: type,
            userId: data?.userId || "",
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
    setFormFields((prev) => ({ ...prev, addressType: event.target.value }));
  };

  const handleOpenAddModal = () => {
    context.setAddressMode("add");
    setAddressId("");
    setAddressType("");
    setPhone("");
    setLocationStatus("idle");
    setFormFields({
      address_line1: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      mobile: "",
      userId: "",
      landmark: "",
      addressType: "",
      latitude: null,
      longitude: null,
    });
    context.setOpenAddAddress(true);
  };

  useEffect(() => {
    if (context?.addressMode === "edit" && context?.addressId) {
      editAddress(context?.addressId);
    }
  }, [context?.addressMode, context?.addressId]);

  return (
    <>
      <PageTitle  title="Address"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
      <section className="py-6 sm:py-10 bg-gray-100 w-full">
        <div className="container flex flex-col lg:flex-row gap-5 px-3 sm:px-4 lg:px-0">
          <div className="w-full lg:w-[20%]">
            <AccountSidebar />
          </div>
          <div className="w-full lg:w-[50%]">
            <div className="card bg-white p-4 sm:p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-3 font-semibold">Address</h2>
              </div>
              <hr />
              <div
                className="flex items-center justify-center p-5 border border-dashed border-gray-500 cursor-pointer"
                onClick={handleOpenAddModal}
              >
                <span className="text-[14px] font-semibold">Add Address</span>
              </div>
              <div className="flex gap-2 flex-col mt-4">
                {address?.length > 0 &&
                  address?.map((item) => (
                    <AddressBox
                      key={item._id}
                      item={item}
                      removeAddress={removeAddress}
                      editAddress={editAddress}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Drawer
        open={context.openAddAddress}
        // ✅ FIX: this was `onClose={context.toggleAddAddress(false)}` —
        // calling the function immediately during render (and passing
        // whatever it returns as onClose) instead of passing a handler
        // that runs on close. That both fires the toggle on every render
        // and leaves onClose non-functional. Wrapped in an arrow fn.
        onClose={() => context.setOpenAddAddress(false)}
        anchor="right"
        // ✅ RESPONSIVE FIX: fixed 450px drawer overflows small screens —
        // cap width to the viewport on mobile.
        className="!w-[92vw] sm:!w-[450px] addressPanel"
        PaperProps={{ sx: { width: { xs: "92vw", sm: 450 } } }}
      >
        <div className="flex items-center justify-between relative left-2 border-b border-gray-300">
          <DialogTitle>
            {context.addressMode === "edit" ? "Edit" : "Add"} Delivery Address
          </DialogTitle>
          <IoCloseSharp
            className="text-[20px] cursor-pointer mr-4"
            onClick={() => context.setOpenAddAddress(false)}
          />
        </div>
        <div className="flex items-center py-2 px-4">
          <div className="leftCol w-[100%]">
            <form className="w-full mt-5 pb-8" onSubmit={handleSubmit}>
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
                  {formFields.latitude != null && formFields.longitude != null
                    ? "Location Captured ✓ (tap to update)"
                    : "Use My Current Location"}
                </Button>
              </div>
              {locationStatus === "error" && (
                <p className="text-[12px] text-red-500 -mt-3 pb-4">
                  Location access denied or unavailable. Delivery tracking on
                  the map will not work for this address without it.
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
                    value={formFields.address_line1}
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
                    value={formFields.city}
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
                    value={formFields.state}
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
                    value={formFields.country}
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
                    value={formFields.pincode}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <PhoneInput
                    defaultCountry="ae"
                    value={phone}
                    onChange={(phoneValue) => {
                      setPhone(phoneValue);
                      setFormFields((prev) => ({
                        ...prev,
                        mobile: phoneValue,
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
                    value={formFields.landmark}
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
              <div className="flex flex-col sm:flex-row items-center gap-5">
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
    </>
  );
};

export default Address;