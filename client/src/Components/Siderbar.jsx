// // // // import React, { use, useState } from "react";
// // // // import CategoryCollapse from "./CategoryCollapse";
// // // // import FormGroup from "@mui/material/FormGroup";
// // // // import FormControlLabel from "@mui/material/FormControlLabel";
// // // // import Checkbox from "@mui/material/Checkbox";
// // // // import { Collapse } from "react-collapse";
// // // // import { Button, Rating } from "@mui/material";
// // // // import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// // // // import RangeSlider from "react-range-slider-input";
// // // // import "react-range-slider-input/dist/style.css";
// // // // import { MyContext } from "../App";
// // // // import { useContext } from "react";
// // // // import { useEffect } from "react";
// // // // import axios from "axios";
// // // // import { useLocation } from "react-router-dom";

// // // // const Siderbar = (props) => {
// // // //   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
// // // //   const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] =
// // // //     useState(true);
// // // //   const location = useLocation();
// // // //   const context = useContext(MyContext);
// // // //   const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
// // // //   const [filters, setFilters] = useState({
// // // //     category: [],
// // // //     minPrice: "",
// // // //     maxPrice: "",
// // // //     page: 1,
// // // //     limit: 15,
// // // //   });
// // // //   const [price,setPrice]= useState([0,5000])

// // // //   const handleCheckboxChange = (field,value)=>{
// // // //     const currentValues = filters[field] || []
// // // // const updateValues= currentValues?.includes(value) ? currentValues.filter((cat)=>cat !== value): [...currentValues,value]
// // // // setFilters((prev)=>({
// // // //   ...prev,
// // // //   [field]:updateValues
// // // // }))
// // // //   }
// // // //   useEffect(()=>{
// // // // const url = window.location.href
// // // // const queryParameters = new URLSearchParams(location.search)
// // // // if (url.includes('category')) {
// // // //   const categoryId = queryParameters.get('category')
// // // //   const catArr = []
// // // //   catArr.push(categoryId)
// // // //   filters.cat = catArr
// // // // }
// // // // filters.page = 1
// // // // setTimeout(()=>{
// // // //   filterData()
// // // // })
// // // //   },[location])

// // // //   const filterData = async()=>{
// // // //         try {
// // // //       props.setIsLoading(true);

// // // //       const res = await axios.post(
// // // //         "http://localhost:5000/api/product/filter",
// // // //         filters,
// // // //       );

// // // //       props.setProductsData(res.data);
// // // //       props.setTotalPages(res.data.totalPages);
// // // //       window.scrollTo(0, 0);
// // // //     } catch (error) {
      
// // // //     } finally {
// // // //       props.setIsLoading(false);
// // // //     }
// // // //     // try {
// // // //     //   props.setIsLoading(true)
// // // //     //   const res = await axios.post('http://localhost:5000/api/product/filter',filters)
// // // //     //   props.setProductsData(res.data)
// // // //     //   props.setTotalPages(res.data.totalPages)
// // // //     //   window.scrollTo(0,0)
// // // //     // } catch (error) {
// // // //     // } finally{
// // // //     //   props.setIsLoading(false)
// // // //     // }
// // // //   }
// // // //   useEffect(()=>{
// // // //     filters.page = props.page
// // // //     filterData()
// // // //   },[filters,props.page])

// // // //   useEffect(()=>{
// // // //     setFilters((prev)=>({
// // // //       ...prev,minPrice:price[0],
// // // //       maxPrice:price[1]
// // // //     }))
// // // //   }, [price])
// // // //   // useEffect(() => {
// // // //   //   const url = window.location.href;
// // // //   //   const queryParameters = new URLSearchParams(location.search);
// // // //   //   if (url.includes("category")) {
// // // //   //     const categoryId = queryParameters.get("category");
// // // //   //     const catArr = [];
// // // //   //     catArr.push(categoryId);
// // // //   //     filters.category = catArr;
// // // //   //   }
// // // //   //   // console.log(filters)
// // // //   //   // if (url.includes("subCatId")) {
// // // //   //   //   const subCategoryId = queryParameters.get("subCatId");
// // // //   //   //   const subCatArr = [];
// // // //   //   //   subCatArr.push(subCategoryId);
// // // //   //   //   filters.subCatId = subCatArr;
// // // //   //   //   filters.catId = [];
// // // //   //   // }
// // // //   //   filters.page = 1;
// // // //   //   setTimeout(() => {
// // // //   //     filtesData();
// // // //   //   }, 200);
// // // //   // }, [location]);
// // // //   // const [price, setPrice] = useState([100, 5000]);

// // // //   // // Filter API
// // // //   // const filtesData = async () => {
// // // //   //   try {
// // // //   //     props.setIsLoading(true);

// // // //   //     const res = await axios.post(
// // // //   //       "http://localhost:5000/api/product/filter",
// // // //   //       filters,
// // // //   //     );

// // // //   //     props.setProductsData(res.data);
// // // //   //     props.setTotalPages(res.data.totalPages);
// // // //   //     window.scrollTo(0, 0);
// // // //   //   } catch (error) {
      
// // // //   //   } finally {
// // // //   //     props.setIsLoading(false);
// // // //   //   }
// // // //   // };

// // // //   // // Update page safely
// // // //   // useEffect(() => {
// // // //   //   setFilters((prev) => ({
// // // //   //     ...prev,
// // // //   //     page: props.page,
// // // //   //   }));
// // // //   // }, [props.page]);

// // // //   // // Update price filter
// // // //   // useEffect(() => {
// // // //   //   setFilters((prev) => ({
// // // //   //     ...prev,
// // // //   //     minPrice: price[0],
// // // //   //     maxPrice: price[1],
// // // //   //   }));
// // // //   // }, [price]);

// // // //   // // Call API when filters change
// // // //   // useEffect(() => {
// // // //   //   filtesData();
// // // //   // }, [filters]);
// // // //   // const handleCheckBoxChange = (field, value) => {
// // // //   //   const currentValues = filters[field] || [];
// // // //   //   const updatedValues = currentValues.includes(value)
// // // //   //     ? currentValues.filter((cat) => cat !== value)
// // // //   //     : [...currentValues, value];
// // // //   //   setFilters((prev) => ({
// // // //   //     ...prev,
// // // //   //     [field]: updatedValues,
// // // //   //   }));
// // // //   //   if (field === "category") {
// // // //   //     setFilters((prev) => ({
// // // //   //       ...prev,
// // // //   //       category: updatedValues,
// // // //   //     }));
// // // //   //   }
// // // //   // };

// // // //   return (
// // // //     <aside className="sidebar py-5 overflow-hidden">
// // // //       <div className="box">
// // // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold ">
// // // //           Shop by Categroy
// // // //           <Button
// // // //             className=" hover:!bg-white !w-[30px] !h-[30px] !max-w-[30px] !rounded-full !ml-auto !text-black"
// // // //             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
// // // //           >
// // // //             {isOpenCategoryFilter === true ? (
// // // //               <FaAngleUp />
// // // //             ) : (
// // // //               <FaAngleDown className="" />
// // // //             )}
// // // //           </Button>
// // // //         </h3>
// // // //         <Collapse isOpened={isOpenCategoryFilter}>
// // // //           <div className="scroll relative px-4 -left-[13px]">
// // // //             {context?.catData?.length !== 0 &&
// // // //               context?.catData?.map((item, index) => {
// // // //                 return (
// // // //                   <FormControlLabel
// // // //                   key={index}
// // // //                   value={item?._id}
// // // //                     control={<Checkbox />}
// // // //                     checked={filters.category.includes(item?.slug)}
// // // //                     label={item?.name}
// // // //                     onChange={()=>handleCheckboxChange('category',item?.slug)}
// // // //                     className="w-full"
// // // //                   />
// // // //                 );
// // // //               })}
// // // //           </div>
// // // //         </Collapse>
// // // //       </div>
// // // //       {/* <div className="box">
// // // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold  ">
// // // //           Availability
// // // //           <Button
// // // //             className=" hover:!bg-white !w-[30px] !h-[30px] !max-w-[30px] !rounded-full !ml-auto !text-black"
// // // //             onClick={() =>
// // // //               setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)
// // // //             }
// // // //           >
// // // //             {isOpenAvailabilityFilter === true ? (
// // // //               <FaAngleUp />
// // // //             ) : (
// // // //               <FaAngleDown className="" />
// // // //             )}
// // // //           </Button>
// // // //         </h3>
// // // //         <Collapse isOpened={isOpenAvailabilityFilter}>
// // // //           <div className="scroll relative px-3 -left-[13px] ">
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="Available (17)"
// // // //               className="w-full"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="In Stock (17)"
// // // //               className="w-full"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="Not Available (17)"
// // // //               className="w-full"
// // // //             />
// // // //           </div>
// // // //         </Collapse>
// // // //       </div>
// // // //       <div className="box">
// // // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold  ">
// // // //           Size
// // // //           <Button
// // // //             className=" hover:!bg-white !w-[30px] !h-[30px] !max-w-[30px] !rounded-full !ml-auto !text-black"
// // // //             onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
// // // //           >
// // // //             {isOpenSizeFilter === true ? (
// // // //               <FaAngleUp />
// // // //             ) : (
// // // //               <FaAngleDown className="" />
// // // //             )}
// // // //           </Button>
// // // //         </h3>
// // // //         <Collapse isOpened={isOpenSizeFilter}>
// // // //           <div className="scroll relative px-3 -left-[13px] ">
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="Small (8)"
// // // //               className="w-full"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="Medium (5)"
// // // //               className="w-full"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="Large (7)"
// // // //               className="w-full"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="XL (5)"
// // // //               className="w-full"
// // // //             />
// // // //             <FormControlLabel
// // // //               control={<Checkbox size="small" />}
// // // //               label="XXL (4)"
// // // //               className="w-full"
// // // //             />
// // // //           </div>
// // // //         </Collapse>
// // // //       </div> */}
// // // //       <div className="box mt-4">
// // // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold  ">
// // // //           Filter by Price
// // // //         </h3>
// // // //         <RangeSlider
// // // //           value={price}
// // // //           onInput={setPrice}
// // // //           min={100}
// // // //           max={5000}
// // // //           step={5}
// // // //         />
// // // //         <div className="flex pt-4 pb-2 priceRange">
// // // //           <span className="text-[14px]">
// // // //             From: <storng className="font-semibold">AED: {price[0]}</storng>
// // // //           </span>
// // // //           <span className="ml-auto text-[14px]">
// // // //             From: <storng className="font-semibold">AED: {price[1]}</storng>
// // // //           </span>
// // // //         </div>
// // // //       </div>
// // // //       {/* <div className="box mt-4">
// // // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold  ">
// // // //           Filter by Rating
// // // //         </h3>
// // // //         <div className="w-full">
// // // //         <Rating name="size-small" defaultValue={5} size="small" readOnly />
// // // //         </div>
// // // //         <div className="w-full">
// // // //         <Rating name="size-small" defaultValue={4} size="small" readOnly />
// // // //         </div>
// // // //         <div className="w-full">
// // // //         <Rating name="size-small" defaultValue={3} size="small" readOnly />
// // // //         </div>
// // // //         <div className="w-full">
// // // //         <Rating name="size-small" defaultValue={2} size="small" readOnly />
// // // //         </div>
// // // //         <div className="w-full">
// // // //         <Rating name="size-small" defaultValue={1} size="small" readOnly />
// // // //         </div>
// // // //       </div> */}
// // // //     </aside>
// // // //   );
// // // // };

// // // // export default Siderbar;
// // // import React, { useState, useEffect, useContext } from "react";
// // // import FormControlLabel from "@mui/material/FormControlLabel";
// // // import Checkbox from "@mui/material/Checkbox";
// // // import { Collapse } from "react-collapse";
// // // import { Button } from "@mui/material";
// // // import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// // // import RangeSlider from "react-range-slider-input";
// // // import "react-range-slider-input/dist/style.css";
// // // import { MyContext } from "../App";
// // // import axios from "axios";

// // // // props: slug, productsData, setProductsData, isLoading, setIsLoading, page, totalPages, setTotalPages
// // // const Siderbar = (props) => {
// // //   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
// // //   const context = useContext(MyContext);

// // //   // ✅ IMPORTANT: minPrice/maxPrice ko shuru me EMPTY rakho, "100/5000"
// // //   // jaisa koi guess-based range nahi — warna kam price wale products
// // //   // (jaise AED 40-90 ka chhota cake) galti se hamesha exclude ho jaayenge.
// // //   const [filters, setFilters] = useState({
// // //     category: [],
// // //     minPrice: "",
// // //     maxPrice: "",
// // //     page: 1,
// // //     limit: 15,
// // //   });

// // //   // Slider ke liye display range — isse sirf UI control hoti hai,
// // //   // jab tak user isse chhede, filters.minPrice/maxPrice khaali (no
// // //   // restriction) rehte hain.
// // //   const [price, setPrice] = useState([0, 5000]);
// // //   const [priceTouched, setPriceTouched] = useState(false);

// // //   const handleCheckboxChange = (field, value) => {
// // //     const currentValues = filters[field] || [];
// // //     const updatedValues = currentValues.includes(value)
// // //       ? currentValues.filter((item) => item !== value)
// // //       : [...currentValues, value];

// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       [field]: updatedValues,
// // //       page: 1,
// // //     }));
// // //   };

// // //   const filterData = async () => {
// // //     try {
// // //       props.setIsLoading(true);
// // //       const res = await axios.post("http://localhost:5000/api/product/filter", filters);
// // //       props.setProductsData(res.data);
// // //       props.setTotalPages(res.data.totalPages);
// // //       window.scrollTo(0, 0);
// // //     } catch (error) {
// // //       console.log("Filter error:", error);
// // //     } finally {
// // //       props.setIsLoading(false);
// // //     }
// // //   };

// // //   // ✅ Fix: URL query param ki jagah "slug" prop se category match karo.
// // //   // context.catData load hone ka wait karta hai (agar abhi khaali hai to
// // //   // yeh effect dobara chalega jab catData aa jaayega, kyunki woh bhi
// // //   // dependency me hai).
// // //   useEffect(() => {
// // //     if (!props.slug || !context?.catData?.length) return;

// // //     const matchedCategory = context.catData.find((cat) => cat.slug === props.slug);

// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       category: matchedCategory ? [matchedCategory._id] : [],
// // //       page: 1,
// // //     }));
// // //   }, [props.slug, context?.catData]);

// // //   // ✅ Page prop badalne par filters.page sync karo
// // //   useEffect(() => {
// // //     setFilters((prev) => ({ ...prev, page: props.page }));
// // //   }, [props.page]);

// // //   // ✅ Price sirf tab filter me jaayega jab user ne slider chhua ho —
// // //   // isse default load par koi bhi valid product galti se exclude nahi hoga
// // //   useEffect(() => {
// // //     if (!priceTouched) return;
// // //     setFilters((prev) => ({ ...prev, minPrice: price[0], maxPrice: price[1] }));
// // //   }, [price]);

// // //   // ✅ SIRF yahan se filterData call hoti hai — filters state badalte hi
// // //   useEffect(() => {
// // //     filterData();
// // //   }, [filters]);

// // //   return (
// // //     <aside className="sidebar py-5 overflow-hidden">
// // //       <div className="box">
// // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold">
// // //           Shop by Category
// // //           <Button
// // //             className=" hover:!bg-white !w-[30px] !h-[30px] !max-w-[30px] !rounded-full !ml-auto !text-black"
// // //             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
// // //           >
// // //             {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
// // //           </Button>
// // //         </h3>
// // //         <Collapse isOpened={isOpenCategoryFilter}>
// // //           <div className="scroll relative px-4 -left-[13px]">
// // //             {context?.catData?.length !== 0 &&
// // //               context?.catData?.map((item, index) => (
// // //                 <FormControlLabel
// // //                   key={index}
// // //                   value={item?._id}
// // //                   control={<Checkbox />}
// // //                   checked={filters.category.includes(item?._id)}
// // //                   label={item?.name}
// // //                   onChange={() => handleCheckboxChange("category", item?._id)}
// // //                   className="w-full"
// // //                 />
// // //               ))}
// // //           </div>
// // //         </Collapse>
// // //       </div>

// // //       <div className="box mt-4">
// // //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold">
// // //           Filter by Price
// // //         </h3>
// // //         <RangeSlider
// // //           value={price}
// // //           onInput={(val) => {
// // //             setPriceTouched(true); // ✅ ab se price filter apply hoga
// // //             setPrice(val);
// // //           }}
// // //           min={0}
// // //           max={5000}
// // //           step={5}
// // //         />
// // //         <div className="flex pt-4 pb-2 priceRange">
// // //           <span className="text-[14px]">
// // //             From: <strong className="font-semibold">AED {price[0]}</strong>
// // //           </span>
// // //           <span className="ml-auto text-[14px]">
// // //             To: <strong className="font-semibold">AED {price[1]}</strong>
// // //           </span>
// // //         </div>
// // //       </div>
// // //     </aside>
// // //   );
// // // };

// // // export default Siderbar;

// // import React, { useState, useEffect, useContext } from "react";
// // import FormControlLabel from "@mui/material/FormControlLabel";
// // import Checkbox from "@mui/material/Checkbox";
// // import { Collapse } from "react-collapse";
// // import { Button } from "@mui/material";
// // import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// // import RangeSlider from "react-range-slider-input";
// // import "react-range-slider-input/dist/style.css";
// // import { MyContext } from "../App";
// // import axios from "axios";

// // // props: slug, productsData, setProductsData, isLoading, setIsLoading, page, totalPages, setTotalPages
// // const Siderbar = (props) => {
// //   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
// //   const context = useContext(MyContext);

// //   // ✅ IMPORTANT: minPrice/maxPrice ko shuru me EMPTY rakho, "100/5000"
// //   // jaisa koi guess-based range nahi — warna kam price wale products
// //   // (jaise AED 40-90 ka chhota cake) galti se hamesha exclude ho jaayenge.
// //   const [filters, setFilters] = useState({
// //     category: [],
// //     minPrice: "",
// //     maxPrice: "",
// //     page: 1,
// //     limit: 15,
// //   });

// //   // Slider ke liye display range — isse sirf UI control hoti hai,
// //   // jab tak user isse chhede, filters.minPrice/maxPrice khaali (no
// //   // restriction) rehte hain.
// //   const [price, setPrice] = useState([0, 5000]);
// //   const [priceTouched, setPriceTouched] = useState(false);

// //   const handleCheckboxChange = (field, value) => {
// //     const currentValues = filters[field] || [];
// //     const updatedValues = currentValues.includes(value)
// //       ? currentValues.filter((item) => item !== value)
// //       : [...currentValues, value];

// //     setFilters((prev) => ({
// //       ...prev,
// //       [field]: updatedValues,
// //       page: 1,
// //     }));
// //   };

// //   // ✅ Fix: URL query param ki jagah "slug" prop se category match karo.
// //   // context.catData load hone ka wait karta hai (agar abhi khaali hai to
// //   // yeh effect dobara chalega jab catData aa jaayega, kyunki woh bhi
// //   // dependency me hai).
// //   useEffect(() => {
// //     if (!props.slug || !context?.catData?.length) return;

// //     const matchedCategory = context.catData.find((cat) => cat.slug === props.slug);

// //     setFilters((prev) => ({
// //       ...prev,
// //       category: matchedCategory ? [matchedCategory._id] : [],
// //       page: 1,
// //     }));
// //   }, [props.slug, context?.catData]);

// //   // ✅ Page prop badalne par filters.page sync karo
// //   useEffect(() => {
// //     setFilters((prev) => ({ ...prev, page: props.page }));
// //   }, [props.page]);

// //   // ✅ Price sirf tab filter me jaayega jab user ne slider chhua ho —
// //   // isse default load par koi bhi valid product galti se exclude nahi hoga
// //   useEffect(() => {
// //     if (!priceTouched) return;
// //     setFilters((prev) => ({ ...prev, minPrice: price[0], maxPrice: price[1] }));
// //   }, [price]);

// //   // ✅ SIRF yahan se filterData call hoti hai — filters state badalte hi.
// //   // AbortController se PURANI (abhi bhi chal rahi) request cancel ho
// //   // jaati hai jab filters dobara badal jaayein — isse race condition
// //   // (purana response late aakar sahi wale ko overwrite karna) nahi hoga.
// //   useEffect(() => {
// //     const controller = new AbortController();

// //     const fetchFilteredProducts = async () => {
// //       try {
// //         props.setIsLoading(true);
// //         const res = await axios.post(
// //           "http://localhost:5000/api/product/filter",
// //           filters,
// //           { signal: controller.signal }
// //         );
// //         props.setProductsData(res.data);
// //         props.setTotalPages(res.data.totalPages);
// //         window.scrollTo(0, 0);
// //       } catch (error) {
// //         // ✅ Request cancel hone par yeh normal hai, error mat treat karo
// //         if (axios.isCancel(error) || error.code === "ERR_CANCELED") return;
// //         console.log("Filter error:", error);
// //       } finally {
// //         if (!controller.signal.aborted) {
// //           props.setIsLoading(false);
// //         }
// //       }
// //     };

// //     fetchFilteredProducts();

// //     // ✅ Cleanup: agar filters dobara badal gaye (naya effect chalne se
// //     // pehle), to yeh purani request ko cancel kar dega
// //     return () => controller.abort();
// //   }, [filters]);

// //   return (
// //     <aside className="sidebar py-5 mb-52 overflow-hidden">
// //       <div className="box">
// //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold">
// //           Shop by Category
// //           <Button
// //             className=" hover:!bg-white !w-[30px] !h-[30px] !max-w-[30px] !rounded-full !ml-auto !text-black"
// //             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
// //           >
// //             {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
// //           </Button>
// //         </h3>
// //         <Collapse isOpened={isOpenCategoryFilter}>
// //           <div className="scroll relative px-4 -left-[13px]">
// //             {context?.catData?.length !== 0 &&
// //               context?.catData?.map((item, index) => (
// //                 <FormControlLabel
// //                   key={index}
// //                   value={item?._id}
// //                   control={<Checkbox />}
// //                   checked={filters.category.includes(item?._id)}
// //                   label={item?.name}
// //                   onChange={() => handleCheckboxChange("category", item?._id)}
// //                   className="w-full"
// //                 />
// //               ))}
// //           </div>
// //         </Collapse>
// //       </div>

// //       <div className="box mt-4">
// //         <h3 className="text-lg flex items-center w-full mb-3 font-semibold">
// //           Filter by Price
// //         </h3>
// //         <RangeSlider
// //           value={price}
// //           onInput={(val) => {
// //             setPriceTouched(true); // ✅ ab se price filter apply hoga
// //             setPrice(val);
// //           }}
// //           min={0}
// //           max={5000}
// //           step={5}
// //         />
// //         <div className="flex pt-4 pb-2 priceRange">
// //           <span className="text-[14px]">
// //             From: <strong className="font-semibold">AED {price[0]}</strong>
// //           </span>
// //           <span className="ml-auto text-[14px]">
// //             To: <strong className="font-semibold">AED {price[1]}</strong>
// //           </span>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // };

// // export default Siderbar;

// import React, { useState, useEffect, useContext } from "react";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Collapse } from "react-collapse";
// import { Button } from "@mui/material";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// import { FiFilter, FiX, FiRotateCcw } from "react-icons/fi";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import { MyContext } from "../App";
// import axios from "axios";

// const Siderbar = (props) => {
//   const context = useContext(MyContext);

//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
//   const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);

//   const [filters, setFilters] = useState({
//     category: [],
//     minPrice: "",
//     maxPrice: "",
//     page: 1,
//     limit: 15,
//   });

//   const [price, setPrice] = useState([0, 5000]);
//   const [priceTouched, setPriceTouched] = useState(false);

//   /* =========================================================
//      CATEGORY CHECKBOX
//   ========================================================= */

//   const handleCheckboxChange = (field, value) => {
//     const currentValues = filters[field] || [];

//     const updatedValues = currentValues.includes(value)
//       ? currentValues.filter((item) => item !== value)
//       : [...currentValues, value];

//     setFilters((prev) => ({
//       ...prev,
//       [field]: updatedValues,
//       page: 1,
//     }));
//   };

//   /* =========================================================
//      CATEGORY FROM URL / SLUG
//   ========================================================= */

//   useEffect(() => {
//     if (!props.slug || !context?.catData?.length) return;

//     const matchedCategory = context.catData.find(
//       (cat) => cat.slug === props.slug
//     );

//     setFilters((prev) => ({
//       ...prev,
//       category: matchedCategory ? [matchedCategory._id] : [],
//       page: 1,
//     }));
//   }, [props.slug, context?.catData]);

//   /* =========================================================
//      PAGE CHANGE
//   ========================================================= */

//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       page: props.page,
//     }));
//   }, [props.page]);

//   /* =========================================================
//      PRICE FILTER
//   ========================================================= */

//   useEffect(() => {
//     if (!priceTouched) return;

//     setFilters((prev) => ({
//       ...prev,
//       minPrice: price[0],
//       maxPrice: price[1],
//       page: 1,
//     }));
//   }, [price, priceTouched]);

//   /* =========================================================
//      FILTER API
//   ========================================================= */

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchFilteredProducts = async () => {
//       try {
//         props.setIsLoading(true);

//         const res = await axios.post(
//           "http://localhost:5000/api/product/filter",
//           filters,
//           {
//             signal: controller.signal,
//           }
//         );

//         props.setProductsData(res.data);
//         props.setTotalPages(res.data.totalPages);

//         window.scrollTo({
//           top: 0,
//           behavior: "smooth",
//         });
//       } catch (error) {
//         if (
//           axios.isCancel(error) ||
//           error?.code === "ERR_CANCELED"
//         ) {
//           return;
//         }

//         console.log("Filter error:", error);
//       } finally {
//         if (!controller.signal.aborted) {
//           props.setIsLoading(false);
//         }
//       }
//     };

//     fetchFilteredProducts();

//     return () => controller.abort();
//   }, [filters]);

//   /* =========================================================
//      CLEAR FILTERS
//   ========================================================= */

//   const clearFilters = () => {
//     setFilters({
//       category: [],
//       minPrice: "",
//       maxPrice: "",
//       page: 1,
//       limit: 15,
//     });

//     setPrice([0, 5000]);
//     setPriceTouched(false);
//   };

//   const selectedCategoryCount = filters.category.length;

//   /* =========================================================
//      UI
//   ========================================================= */

//   return (
//     <aside
//       className="
//         w-full
//         lg:w-[280px]
//         xl:w-[300px]
//         shrink-0
//         mb-8
//         lg:mb-0
//       "
//     >
//       <div
//         className="
//           bg-white
//           border
//           border-[#eee8f1]
//           rounded-2xl
//           shadow-[0_8px_30px_rgba(36,28,41,0.06)]
//           overflow-hidden
//           sticky
//           top-[110px]
//         "
//       >
//         {/* =================================================
//             FILTER HEADER
//         ================================================= */}

//         <div
//           className="
//             px-4
//             sm:px-5
//             py-4
//             border-b
//             border-[#eee8f1]
//             bg-gradient-to-r
//             from-[#241C29]
//             to-[#3D2350]
//           "
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <div
//                 className="
//                   w-9
//                   h-9
//                   rounded-xl
//                   bg-[#E3A11F]
//                   text-[#241C29]
//                   flex
//                   items-center
//                   justify-center
//                   shadow-sm
//                 "
//               >
//                 <FiFilter className="text-[17px]" />
//               </div>

//               <div>
//                 <h2 className="text-[15px] sm:text-[16px] font-bold text-white">
//                   Filters
//                 </h2>

//                 <p className="text-[11px] text-white/60">
//                   Refine your products
//                 </p>
//               </div>
//             </div>

//             {(selectedCategoryCount > 0 || priceTouched) && (
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="
//                   flex
//                   items-center
//                   gap-1
//                   text-[11px]
//                   sm:text-[12px]
//                   font-semibold
//                   text-[#E3A11F]
//                   hover:text-white
//                   transition
//                 "
//               >
//                 <FiRotateCcw />
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* =================================================
//             CATEGORY FILTER
//         ================================================= */}

//         <div className="p-4 sm:p-5 border-b border-[#eee8f1]">
//           <button
//             type="button"
//             onClick={() =>
//               setIsOpenCategoryFilter(!isOpenCategoryFilter)
//             }
//             className="
//               w-full
//               flex
//               items-center
//               justify-between
//               text-left
//               group
//             "
//           >
//             <div className="flex items-center gap-2">
//               <span
//                 className="
//                   w-1
//                   h-5
//                   rounded-full
//                   bg-[#E3A11F]
//                 "
//               />

//               <div>
//                 <h3 className="text-[14px] sm:text-[15px] font-bold text-[#241C29]">
//                   Shop by Category
//                 </h3>

//                 {selectedCategoryCount > 0 && (
//                   <p className="text-[11px] text-[#7A4988] mt-0.5">
//                     {selectedCategoryCount} selected
//                   </p>
//                 )}
//               </div>
//             </div>

//             <span
//               className="
//                 w-8
//                 h-8
//                 rounded-full
//                 bg-[#F8F5FB]
//                 flex
//                 items-center
//                 justify-center
//                 text-[#3D2350]
//                 group-hover:bg-[#E3A11F]
//                 group-hover:text-[#241C29]
//                 transition
//               "
//             >
//               {isOpenCategoryFilter ? (
//                 <FaAngleUp className="text-[13px]" />
//               ) : (
//                 <FaAngleDown className="text-[13px]" />
//               )}
//             </span>
//           </button>

//           <Collapse isOpened={isOpenCategoryFilter}>
//             <div className="mt-4 max-h-[300px] overflow-y-auto pr-1 custom-filter-scrollbar">
//               {context?.catData?.length > 0 ? (
//                 <div className="space-y-1">
//                   {context.catData.map((item) => {
//                     const isChecked = filters.category.includes(
//                       item?._id
//                     );

//                     return (
//                       <div
//                         key={item?._id}
//                         className={`
//                           rounded-xl
//                           px-2
//                           py-1
//                           transition
//                           ${
//                             isChecked
//                               ? "bg-[#F8F5FB]"
//                               : "hover:bg-[#faf8fb]"
//                           }
//                         `}
//                       >
//                         <FormControlLabel
//                           value={item?._id}
//                           control={
//                             <Checkbox
//                               checked={isChecked}
//                               onChange={() =>
//                                 handleCheckboxChange(
//                                   "category",
//                                   item?._id
//                                 )
//                               }
//                               sx={{
//                                 color: "#cfc6d4",
//                                 padding: "6px",

//                                 "&.Mui-checked": {
//                                   color: "#E3A11F",
//                                 },
//                               }}
//                             />
//                           }
//                           label={
//                             <span
//                               className={`
//                                 text-[13px]
//                                 sm:text-[14px]
//                                 transition
//                                 ${
//                                   isChecked
//                                     ? "font-semibold text-[#3D2350]"
//                                     : "font-medium text-[#555]"
//                                 }
//                               `}
//                             >
//                               {item?.name}
//                             </span>
//                           }
//                           className="!m-0 !w-full"
//                         />
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="py-6 text-center">
//                   <p className="text-[13px] text-gray-400">
//                     No categories available
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Collapse>
//         </div>

//         {/* =================================================
//             PRICE FILTER
//         ================================================= */}

//         <div className="p-4 sm:p-5">
//           <button
//             type="button"
//             onClick={() =>
//               setIsOpenPriceFilter(!isOpenPriceFilter)
//             }
//             className="
//               w-full
//               flex
//               items-center
//               justify-between
//               text-left
//               group
//               mb-4
//             "
//           >
//             <div className="flex items-center gap-2">
//               <span
//                 className="
//                   w-1
//                   h-5
//                   rounded-full
//                   bg-[#E3A11F]
//                 "
//               />

//               <div>
//                 <h3 className="text-[14px] sm:text-[15px] font-bold text-[#241C29]">
//                   Filter by Price
//                 </h3>

//                 {priceTouched && (
//                   <p className="text-[11px] text-[#7A4988] mt-0.5">
//                     Custom price range
//                   </p>
//                 )}
//               </div>
//             </div>

//             <span
//               className="
//                 w-8
//                 h-8
//                 rounded-full
//                 bg-[#F8F5FB]
//                 flex
//                 items-center
//                 justify-center
//                 text-[#3D2350]
//                 group-hover:bg-[#E3A11F]
//                 group-hover:text-[#241C29]
//                 transition
//               "
//             >
//               {isOpenPriceFilter ? (
//                 <FaAngleUp className="text-[13px]" />
//               ) : (
//                 <FaAngleDown className="text-[13px]" />
//               )}
//             </span>
//           </button>

//           <Collapse isOpened={isOpenPriceFilter}>
//             <div>
//               {/* PRICE RANGE VALUES */}

//               <div className="flex items-center justify-between gap-2 mb-4">
//                 <div
//                   className="
//                     flex-1
//                     bg-[#F8F5FB]
//                     border
//                     border-[#eee8f1]
//                     rounded-xl
//                     px-3
//                     py-2.5
//                   "
//                 >
//                   <span className="block text-[10px] text-[#8b8190] uppercase tracking-wide">
//                     Minimum
//                   </span>

//                   <strong className="block text-[13px] sm:text-[14px] text-[#3D2350] mt-0.5">
//                     AED {price[0]}
//                   </strong>
//                 </div>

//                 <div className="text-[#c8bdcc]">
//                   —
//                 </div>

//                 <div
//                   className="
//                     flex-1
//                     bg-[#F8F5FB]
//                     border
//                     border-[#eee8f1]
//                     rounded-xl
//                     px-3
//                     py-2.5
//                   "
//                 >
//                   <span className="block text-[10px] text-[#8b8190] uppercase tracking-wide">
//                     Maximum
//                   </span>

//                   <strong className="block text-[13px] sm:text-[14px] text-[#3D2350] mt-0.5">
//                     AED {price[1]}
//                   </strong>
//                 </div>
//               </div>

//               {/* RANGE SLIDER */}

//               <div className="px-1 py-2">
//                 <RangeSlider
//                   value={price}
//                   onInput={(val) => {
//                     setPriceTouched(true);
//                     setPrice(val);
//                   }}
//                   min={0}
//                   max={5000}
//                   step={5}
//                 />
//               </div>

//               {/* PRICE LABELS */}

//               <div className="flex justify-between mt-2">
//                 <span className="text-[10px] sm:text-[11px] text-gray-400">
//                   AED 0
//                 </span>

//                 <span className="text-[10px] sm:text-[11px] text-gray-400">
//                   AED 5,000+
//                 </span>
//               </div>
//             </div>
//           </Collapse>
//         </div>

//         {/* =================================================
//             MOBILE CLEAR BUTTON
//         ================================================= */}

//         {(selectedCategoryCount > 0 || priceTouched) && (
//           <div className="px-4 sm:px-5 pb-4 lg:hidden">
//             <button
//               type="button"
//               onClick={clearFilters}
//               className="
//                 w-full
//                 h-11
//                 rounded-xl
//                 border
//                 border-[#3D2350]
//                 text-[#3D2350]
//                 text-[13px]
//                 font-semibold
//                 flex
//                 items-center
//                 justify-center
//                 gap-2
//                 hover:bg-[#3D2350]
//                 hover:text-white
//                 transition
//               "
//             >
//               <FiX />
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* =====================================================
//           CUSTOM CSS
//       ===================================================== */}

//       <style>{`
//         .custom-filter-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }

//         .custom-filter-scrollbar::-webkit-scrollbar-track {
//           background: #f8f5fb;
//           border-radius: 10px;
//         }

//         .custom-filter-scrollbar::-webkit-scrollbar-thumb {
//           background: #c9bdce;
//           border-radius: 10px;
//         }

//         .custom-filter-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #7a4988;
//         }

//         /* React Range Slider */

//         .range-slider {
//           height: 5px !important;
//           background: #eee8f1 !important;
//           border-radius: 20px !important;
//         }

//         .range-slider .range-slider__range {
//           background: #E3A11F !important;
//         }

//         .range-slider .range-slider__thumb {
//           width: 18px !important;
//           height: 18px !important;
//           background: #E3A11F !important;
//           border: 3px solid #fff !important;
//           box-shadow: 0 2px 8px rgba(36, 28, 41, 0.25) !important;
//         }

//         .range-slider .range-slider__thumb:hover {
//           transform: scale(1.12);
//         }

//         @media (max-width: 1023px) {
//           .sidebar {
//             width: 100%;
//           }
//         }

//         @media (max-width: 640px) {
//           .range-slider .range-slider__thumb {
//             width: 20px !important;
//             height: 20px !important;
//           }
//         }
//       `}</style>
//     </aside>
//   );
// };

// export default Siderbar;

import React, { useState, useEffect, useContext } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { Button } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { MyContext } from "../App";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
// props: slug, productsData, setProductsData, isLoading, setIsLoading, page, totalPages, setTotalPages
const Siderbar = (props) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);
  const context = useContext(MyContext);

  const [filters, setFilters] = useState({
    category: [],
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 15,
  });

  const [price, setPrice] = useState([0, 5000]);
  const [priceTouched, setPriceTouched] = useState(false);

  const handleCheckboxChange = (field, value) => {
    const currentValues = filters[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues,
      page: 1,
    }));
  };

  useEffect(() => {
    if (!props.slug || !context?.catData?.length) return;

    const matchedCategory = context.catData.find(
      (cat) => cat.slug === props.slug,
    );

    setFilters((prev) => ({
      ...prev,
      category: matchedCategory ? [matchedCategory._id] : [],
      page: 1,
    }));
  }, [props.slug, context?.catData]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: props.page }));
  }, [props.page]);

  useEffect(() => {
    if (!priceTouched) return;
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFilteredProducts = async () => {
      try {
        props.setIsLoading(true);
        const res = await axios.post(
          `${API_URL}/api/product/filter`,
          filters,
          { signal: controller.signal },
        );
        props.setProductsData(res.data);
        props.setTotalPages(res.data.totalPages);
        window.scrollTo(0, 0);
      } catch (error) {
        if (axios.isCancel(error) || error.code === "ERR_CANCELED") return;
        console.log("Filter error:", error);
      } finally {
        if (!controller.signal.aborted) {
          props.setIsLoading(false);
        }
      }
    };

    fetchFilteredProducts();
    return () => controller.abort();
  }, [filters]);

  return (
    // ✅ DESIGN: warm cream card instead of a plain white/gray sidebar,
    // hairline border in the brand's warm beige rather than cold gray.
    // ✅ FIX: "mb-52" was an unexplained fixed 13rem bottom margin —
    // replaced with normal, responsive spacing.
    <aside className="sidebar overflow-hidden bg-[#FBF6F1] border border-[#E9DED2] rounded-2xl p-4 sm:p-5 mb-6 md:mb-0">
      {/* Locally scoped range-slider color overrides — the library ships
          its own default (blue) styling with no color prop, so we retint
          it to the brand palette via its own class names. */}
      <style>{`
        .brandSlider .range-slider__track { background: #E9DED2; }
        .brandSlider .range-slider__range { background: linear-gradient(90deg, #C79A4B, #B23A5C); }
        .brandSlider .range-slider__thumb { background: #B23A5C; border: 2px solid #FBF6F1; box-shadow: 0 1px 4px rgba(45,27,18,0.35); }
      `}</style>

      <div className="box">
        <h3 className="text-[17px] flex items-center w-full mb-3 font-serif font-semibold text-[#2D1B12]">
          Shop by Category
          <Button
            className="!ml-auto !min-w-[30px] !w-[30px] !h-[30px] !rounded-full !text-[#2D1B12] hover:!bg-[#F3D9E1]"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll relative px-1">
            {context?.catData?.length !== 0 &&
              context?.catData?.map((item, index) => {
                const isActive = filters.category.includes(item?._id);
                return (
                  // ✅ DESIGN (signature element): active category gets a
                  // small gold "ribbon tab" on the left — a nod to gift
                  // ribbon, on-brand for a cake & flower shop — plus a
                  // soft blush background, instead of a flat checkbox row.
                  <div
                    key={index}
                    className={`relative flex items-center rounded-lg mb-1 pl-2 pr-1 transition-colors ${
                      isActive ? "bg-[#F3D9E1]" : "hover:bg-[#F3D9E1]/50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] rounded-full bg-[#C79A4B]" />
                    )}
                    <FormControlLabel
                      value={item?._id}
                      control={
                        <Checkbox
                          sx={{
                            color: "#C79A4B",
                            "&.Mui-checked": { color: "#B23A5C" },
                          }}
                        />
                      }
                      checked={isActive}
                      label={
                        <span
                          className={`text-[14px] ${
                            isActive
                              ? "font-semibold text-[#B23A5C]"
                              : "text-[#4A3B30]"
                          }`}
                        >
                          {item?.name}
                        </span>
                      }
                      onChange={() =>
                        handleCheckboxChange("category", item?._id)
                      }
                      className="w-full"
                    />
                  </div>
                );
              })}
          </div>
        </Collapse>
      </div>

      <div className="h-px bg-[#E9DED2] my-4" />

      <div className="box">
        <h3 className="text-[17px] flex items-center w-full mb-3 font-serif font-semibold text-[#2D1B12]">
          Filter by Price
          <Button
            className="!ml-auto !min-w-[30px] !w-[30px] !h-[30px] !rounded-full !text-[#2D1B12] hover:!bg-[#F3D9E1]"
            onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
          >
            {isOpenPriceFilter ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenPriceFilter}>
          <div className="brandSlider px-1">
            <RangeSlider
              value={price}
              onInput={(val) => {
                setPriceTouched(true);
                setPrice(val);
              }}
              min={0}
              max={5000}
              step={5}
            />
            <div className="flex pt-4 pb-1 priceRange">
              <span className="text-[13px] text-[#4A3B30]">
                From{" "}
                <strong className="font-semibold text-[#2D1B12]">
                  AED {price[0]}
                </strong>
              </span>
              <span className="ml-auto text-[13px] text-[#4A3B30]">
                To{" "}
                <strong className="font-semibold text-[#2D1B12]">
                  AED {price[1]}
                </strong>
              </span>
            </div>
          </div>
        </Collapse>
      </div>
    </aside>
  );
};

export default Siderbar;