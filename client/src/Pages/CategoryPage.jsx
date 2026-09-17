// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Container,
// //   Grid,
// //   Typography,
// //   Checkbox,
// //   FormControlLabel,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Button,
// //   Drawer,
// //   IconButton,
// //   Divider,
// //   CircularProgress,
// //   Alert,
// // } from "@mui/material";

// // // import MenuIcon from "@mui/icons-material/Menu";
// // // import CloseIcon from "@mui/icons-material/Close";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "axios";

// // const API_URL = "http://localhost:5000/api";

// // const CategoryPage = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();

// //   const [categories, setCategories] = useState([]);
// //   const [products, setProducts] = useState([]);

// //   const [loadingCategories, setLoadingCategories] = useState(true);
// //   const [loadingProducts, setLoadingProducts] = useState(true);

// //   const [error, setError] = useState("");

// //   const [sort, setSort] = useState("");

// //   const [mobileSidebar, setMobileSidebar] = useState(false);

// //   // --------------------------------------------------
// //   // GET CATEGORIES
// //   // --------------------------------------------------

// //   const fetchCategories = async () => {
// //     try {
// //       setLoadingCategories(true);

// //       const response = await axios.get(`${API_URL}/category`);

// //       const categoryData =
// //         response.data.categories || response.data.data || response.data;

// //       setCategories(Array.isArray(categoryData) ? categoryData : []);
// //     } catch (error) {
// //       console.error("Category error:", error);

// //       setCategories([]);
// //     } finally {
// //       setLoadingCategories(false);
// //     }
// //   };

// //   // --------------------------------------------------
// //   // GET PRODUCTS BY CATEGORY SLUG
// //   // --------------------------------------------------

// //   //   const fetchProducts = async () => {
// //   //     try {
// //   //       setLoadingProducts(true);
// //   //       setError("");

// //   //       let url = `${API_URL}/product`;

// //   //       // Category slug exists
// //   //       if (slug) {
// //   //         url = `${API_URL}${slug}`;
// //   //       }

// //   //       const response = await axios.get(url);

// //   //       const productData =
// //   //         response.data.products ||
// //   //         response.data.data ||
// //   //         response.data;

// //   //       setProducts(Array.isArray(productData) ? productData : []);
// //   //     } catch (error) {
// //   //       console.error("Product error:", error);

// //   //       setProducts([]);

// //   //       setError(
// //   //         error?.response?.data?.message ||
// //   //           "Unable to load products."
// //   //       );
// //   //     } finally {
// //   //       setLoadingProducts(false);
// //   //     }
// //   //   };

// //   // --------------------------------------------------
// //   // INITIAL LOAD
// //   // --------------------------------------------------

// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // --------------------------------------------------
// //   // WHEN CATEGORY SLUG CHANGES
// //   // --------------------------------------------------

// //   //   useEffect(() => {
// //   //     fetchProducts();

// //   //     // Reset sorting when category changes
// //   //     setSort("");
// //   //   }, [slug]);

// //   // --------------------------------------------------
// //   // CURRENT CATEGORY
// //   // --------------------------------------------------

// //   const currentCategory = categories.find((category) => category.slug === slug);

// //   // --------------------------------------------------
// //   // CATEGORY CLICK
// //   // --------------------------------------------------

// //   const handleCategoryChange = (categorySlug) => {
// //     setMobileSidebar(false);

// //     // navigate(`/categ`);
// //   };

// //   // --------------------------------------------------
// //   // SORT PRODUCTS
// //   // --------------------------------------------------

// //   const sortedProducts = [...products].sort((a, b) => {
// //     const priceA = Number(a.salePrice || a.discountPrice || a.price || 0);

// //     const priceB = Number(b.salePrice || b.discountPrice || b.price || 0);

// //     if (sort === "low-high") {
// //       return priceA - priceB;
// //     }

// //     if (sort === "high-low") {
// //       return priceB - priceA;
// //     }

// //     return 0;
// //   });

// //   // --------------------------------------------------
// //   // PRODUCT IMAGE
// //   // --------------------------------------------------

// //   //   const getProductImage = (product) => {
// //   //     if (product.image) {
// //   //       return product.image;
// //   //     }

// //   //     if (product.images?.length > 0) {
// //   //       return product.images[0];
// //   //     }

// //   //     return "/images/product-placeholder.jpg";
// //   //   };

// //   // --------------------------------------------------
// //   // SIDEBAR
// //   // --------------------------------------------------

// //   const Sidebar = () => {
// //     return (
// //       <Box
// //         sx={{
// //           width: "100%",
// //           background: "#fff",
// //           border: "1px solid #e5e5e5",
// //           borderRadius: "10px",
// //           p: 2.5,
// //         }}
// //       >
// //         <Typography
// //           variant="h6"
// //           sx={{
// //             fontWeight: 700,
// //             mb: 2,
// //           }}
// //         >
// //           Categories
// //         </Typography>

// //         <Divider sx={{ mb: 2 }} />

// //         {/* ALL PRODUCTS */}
// //         <FormControlLabel
// //           control={
// //             <Checkbox
// //               checked={!slug}
// //               onChange={() => {
// //                 setMobileSidebar(false);
// //                 navigate("/category");
// //               }}
// //             />
// //           }
// //           label={
// //             <Typography
// //               sx={{
// //                 fontWeight: !slug ? 700 : 400,
// //               }}
// //             >
// //               All Products
// //             </Typography>
// //           }
// //           sx={{
// //             display: "flex",
// //             width: "100%",
// //             mb: 0.5,
// //           }}
// //         />

// //         {/* CATEGORIES */}
// //         {loadingCategories ? (
// //           <Box sx={{ textAlign: "center", py: 3 }}>
// //             <CircularProgress size={25} />
// //           </Box>
// //         ) : categories.length === 0 ? (
// //           <Typography
// //             sx={{
// //               color: "text.secondary",
// //               fontSize: 14,
// //             }}
// //           >
// //             No categories found.
// //           </Typography>
// //         ) : (
// //           categories.map((category) => {
// //             const isActive = category.slug === slug;

// //             return (
// //               <FormControlLabel
// //                 key={category._id || category.id}
// //                 control={
// //                   <Checkbox
// //                     checked={isActive}
// //                     onChange={() => handleCategoryChange(category.slug)}
// //                   />
// //                 }
// //                 label={
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "space-between",
// //                       width: "100%",
// //                     }}
// //                   >
// //                     <Typography
// //                       sx={{
// //                         fontSize: 15,
// //                         fontWeight: isActive ? 700 : 400,
// //                       }}
// //                     >
// //                       {category.name}
// //                     </Typography>

// //                     {category.productCount !== undefined && (
// //                       <Typography
// //                         sx={{
// //                           fontSize: 12,
// //                           color: "#888",
// //                           ml: 1,
// //                         }}
// //                       >
// //                         ({category.productCount})
// //                       </Typography>
// //                     )}
// //                   </Box>
// //                 }
// //                 sx={{
// //                   display: "flex",
// //                   width: "100%",
// //                   mb: 0.5,
// //                   borderRadius: "6px",
// //                   px: 0.5,

// //                   backgroundColor: isActive ? "#f5f5f5" : "transparent",

// //                   "&:hover": {
// //                     backgroundColor: "#f7f7f7",
// //                   },
// //                 }}
// //               />
// //             );
// //           })
// //         )}

// //         <Divider sx={{ my: 2 }} />

// //         {/* PRICE SORT */}
// //         <Typography
// //           variant="h6"
// //           sx={{
// //             fontWeight: 700,
// //             mb: 1,
// //           }}
// //         >
// //           Sort by Price
// //         </Typography>

// //         <FormControlLabel
// //           control={
// //             <Checkbox
// //               checked={sort === "low-high"}
// //               onChange={() => setSort(sort === "low-high" ? "" : "low-high")}
// //             />
// //           }
// //           label="Price: Low to High"
// //         />

// //         <FormControlLabel
// //           control={
// //             <Checkbox
// //               checked={sort === "high-low"}
// //               onChange={() => setSort(sort === "high-low" ? "" : "high-low")}
// //             />
// //           }
// //           label="Price: High to Low"
// //         />
// //       </Box>
// //     );
// //   };

// //   // --------------------------------------------------
// //   // RENDER
// //   // --------------------------------------------------

// //   return (
// //     <Container
// //       maxWidth="xl"
// //       sx={{
// //         py: 4,
// //       }}
// //     >
// //       {/* PAGE HEADER */}

// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           mb: 3,
// //           gap: 2,
// //           flexWrap: "wrap",
// //         }}
// //       >
// //         <Box>
// //           <Typography
// //             variant="h4"
// //             sx={{
// //               fontWeight: 700,
// //               mb: 0.5,
// //             }}
// //           >
// //             {currentCategory?.name || "All Products"}
// //           </Typography>

// //           <Typography
// //             sx={{
// //               color: "#777",
// //               fontSize: 14,
// //             }}
// //           >
// //             {sortedProducts.length} products found
// //           </Typography>
// //         </Box>

// //         {/* MOBILE FILTER BUTTON */}

// //         <Button
// //           variant="outlined"
// //           //   startIcon={<MenuIcon />}
// //           onClick={() => setMobileSidebar(true)}
// //           sx={{
// //             display: {
// //               xs: "flex",
// //               md: "none",
// //             },
// //           }}
// //         >
// //           Categories
// //         </Button>

// //         {/* DESKTOP SORT */}

// //         <FormControl
// //           size="small"
// //           sx={{
// //             minWidth: 210,
// //             display: {
// //               xs: "none",
// //               md: "flex",
// //             },
// //           }}
// //         >
// //           <InputLabel>Sort by Price</InputLabel>

// //           <Select
// //             value={sort}
// //             label="Sort by Price"
// //             onChange={(e) => setSort(e.target.value)}
// //           >
// //             <MenuItem value="">Default</MenuItem>

// //             <MenuItem value="low-high">Price: Low to High</MenuItem>

// //             <MenuItem value="high-low">Price: High to Low</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </Box>

// //       {/* MOBILE SORT */}

// //       <FormControl
// //         fullWidth
// //         size="small"
// //         sx={{
// //           mb: 3,
// //           display: {
// //             xs: "flex",
// //             md: "none",
// //           },
// //         }}
// //       >
// //         <InputLabel>Sort by Price</InputLabel>

// //         <Select
// //           value={sort}
// //           label="Sort by Price"
// //           onChange={(e) => setSort(e.target.value)}
// //         >
// //           <MenuItem value="">Default</MenuItem>

// //           <MenuItem value="low-high">Price: Low to High</MenuItem>

// //           <MenuItem value="high-low">Price: High to Low</MenuItem>
// //         </Select>
// //       </FormControl>

// //       {/* MAIN CONTENT */}

// //       <Grid container spacing={3}>
// //         {/* DESKTOP SIDEBAR */}

// //         <Grid
// //           item
// //           xs={12}
// //           md={3}
// //           sx={{
// //             display: {
// //               xs: "none",
// //               md: "block",
// //             },
// //           }}
// //         >
// //           <Sidebar />
// //         </Grid>

// //         {/* PRODUCTS */}

// //         <Grid item xs={12} md={9}>
// //           {loadingProducts ? (
// //             <Box
// //               sx={{
// //                 minHeight: 300,
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <CircularProgress />
// //             </Box>
// //           ) : error ? (
// //             <Alert severity="error">{error}</Alert>
// //           ) : sortedProducts.length === 0 ? (
// //             <Box
// //               sx={{
// //                 textAlign: "center",
// //                 py: 8,
// //               }}
// //             >
// //               <Typography variant="h6" sx={{ mb: 1 }}>
// //                 No products found
// //               </Typography>

// //               <Typography
// //                 sx={{
// //                   color: "#777",
// //                 }}
// //               >
// //                 There are no products in this category.
// //               </Typography>
// //             </Box>
// //           ) : (
// //             <Grid container spacing={2.5}>
// //               {sortedProducts.map((product) => {
// //                 const price = Number(
// //                   product.salePrice ||
// //                     product.discountPrice ||
// //                     product.price ||
// //                     0,
// //                 );

// //                 const oldPrice = Number(product.price || 0);

// //                 const hasDiscount =
// //                   product.salePrice && Number(product.salePrice) < oldPrice;

// //                 return (
// //                   <Grid
// //                     item
// //                     xs={12}
// //                     sm={6}
// //                     lg={4}
// //                     key={product._id || product.id}
// //                   >
// //                     <Card
// //                       sx={{
// //                         height: "100%",
// //                         borderRadius: "10px",
// //                         overflow: "hidden",
// //                         border: "1px solid #eee",
// //                         boxShadow: "none",
// //                         transition: "0.3s",

// //                         "&:hover": {
// //                           transform: "translateY(-4px)",
// //                           boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
// //                         },
// //                       }}
// //                     >
// //                       <CardMedia
// //                         component="img"
// //                         height="230"
// //                         image={product.images?.[0] || product.image || "/images/product-placeholder.jpg"}
// //                         alt={product.name}
// //                         sx={{
// //                           objectFit: "cover",
// //                         }}
// //                       />

// //                       <CardContent>
// //                         <Typography
// //                           variant="h6"
// //                           sx={{
// //                             fontSize: 17,
// //                             fontWeight: 600,
// //                             mb: 1,
// //                           }}
// //                         >
// //                           {product.name}
// //                         </Typography>

// //                         <Box
// //                           sx={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: 1,
// //                           }}
// //                         >
// //                           <Typography
// //                             sx={{
// //                               fontSize: 18,
// //                               fontWeight: 700,
// //                             }}
// //                           >
// //                             AED {price.toFixed(2)}
// //                           </Typography>

// //                           {hasDiscount && (
// //                             <Typography
// //                               sx={{
// //                                 color: "#999",
// //                                 textDecoration: "line-through",
// //                                 fontSize: 14,
// //                               }}
// //                             >
// //                               AED {oldPrice.toFixed(2)}
// //                             </Typography>
// //                           )}
// //                         </Box>

// //                         <Button
// //                           fullWidth
// //                           variant="contained"
// //                           sx={{
// //                             mt: 2,
// //                             textTransform: "none",
// //                           }}
// //                           onClick={() =>
// //                             navigate(`/product/${product.slug || product._id}`)
// //                           }
// //                         >
// //                           View Product
// //                         </Button>
// //                       </CardContent>
// //                     </Card>
// //                   </Grid>
// //                 );
// //               })}
// //             </Grid>
// //           )}
// //         </Grid>
// //       </Grid>

// //       {/* MOBILE SIDEBAR */}

// //       <Drawer
// //         anchor="left"
// //         open={mobileSidebar}
// //         onClose={() => setMobileSidebar(false)}
// //       >
// //         <Box
// //           sx={{
// //             width: 300,
// //             p: 2,
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               mb: 2,
// //             }}
// //           >
// //             <Typography
// //               variant="h6"
// //               sx={{
// //                 fontWeight: 700,
// //               }}
// //             >
// //               Filters
// //             </Typography>

// //             <IconButton onClick={() => setMobileSidebar(false)}>
// //               {/* <CloseIcon /> */}
// //             </IconButton>
// //           </Box>

// //           <Sidebar />
// //         </Box>
// //       </Drawer>
// //     </Container>
// //   );
// // };

// // export default CategoryPage;
// import React, { useContext, useState } from "react";
// import Siderbar from "../Components/Siderbar";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import { Link as RouterLink, useParams } from "react-router-dom";
// import ProductsItems from "../Components/ProductsItems";
// import { IoGridSharp } from "react-icons/io5";
// import { LuMenu } from "react-icons/lu";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ProductsItemsListView from "../Components/ProductsItemsListView";
// import Pagination from "@mui/material/Pagination";
// import ProductsLoading from "../Components/ProductsLoading";
// import CategoryLoading from "../Components/CategoryLoading";
// import axios from "axios";
// import { MyContext } from "../App";

// const CategoryPage = () => {
//   const { slug } = useParams();
// const context = useContext(MyContext);
//   const [productsData, setProductsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [itemView, setItemView] = useState("grid");
//   const [selectedSort, setSelectedSort] = useState("Default");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   // ✅ Price low-to-high / high-to-low + name sort — sab yahin se
//   const handleSortBy = async (name, order, label) => {
//     try {
//       setSelectedSort(label);

//       const res = await axios.post("http://localhost:5000/api/product/sortby", {
//         products: productsData?.products || [],
//         sortBy: name,
//         order: order,
//       });

//       setProductsData((prev) => ({
//         ...prev,
//         products: res.data.products,
//       }));

//       setAnchorEl(null);
//     } catch (error) {
//       context.error("Sort Error:", error);
//     }
//   };

//   const productCount =
//     productsData?.products?.length === 0 ? 0 : productsData?.products?.length || 0;

//   return (
//     <section className="py-5 bg-white pb-0">
//       {/* Breadcrumb */}
//       <div className="container">
//         <div className="bg-gray-200 rounded-md py-1 px-3 w-fit text-gray-400">
//           <Breadcrumbs aria-label="breadcrumb">
//             <Link
//               component={RouterLink}
//               to={"/"}
//               underline="hover"
//               className="hover:!text-black transition cursor-pointer"
//             >
//               Home
//             </Link>
//             <Link
//               component={RouterLink}
//               to={`/category/${slug}`}
//               underline="hover"
//               color="inherit"
//               className="hover:!text-black transition capitalize"
//             >
//               {slug?.replace(/-/g, " ")}
//             </Link>
//           </Breadcrumbs>
//         </div>
//       </div>

//       <div className="bg-white p-3 mt-4">
//         <div className="flex gap-3 container flex-col md:flex-row">
//           {/* Sidebar: category checkboxes + price range slider */}
//           <div className="sidebarWrapper w-full md:w-[20%] h-full bg-white">
//             <Siderbar
//               slug={slug}
//               productsData={productsData}
//               setProductsData={setProductsData}
//               isLoading={isLoading}
//               setIsLoading={setIsLoading}
//               page={page}
//               totalPages={totalPages}
//               setTotalPages={setTotalPages}
//             />
//           </div>

//           {/* Right content: toolbar + product grid */}
//           <div className="rightContent w-full md:w-[80%] py-4">
//             <div className="bg-gray-200 p-2 w-full mb-5 rounded-md flex flex-wrap items-center justify-between gap-3 sticky top-[130px] z-[50]">
//               {/* View toggle + count */}
//               <div className="col1 flex items-center gap-3 itemViewActions">
//                 <Button
//                   className={`!w-[40px] hover:!bg-gray-200 !h-[40px] !min-w-[40px] !rounded-full !text-gray-400 ${
//                     itemView === "list" && "active"
//                   }`}
//                   onClick={() => setItemView("list")}
//                 >
//                   <LuMenu className="text-xl" />
//                 </Button>
//                 <Button
//                   className={`!w-[40px] hover:!bg-gray-200 !h-[40px] !min-w-[40px] !rounded-full !text-gray-400 ${
//                     itemView === "grid" && "active"
//                   }`}
//                   onClick={() => setItemView("grid")}
//                 >
//                   <IoGridSharp className="text-xl" />
//                 </Button>
//                 <span className="text-[14px] font-semibold text-gray-500 pl-3">
//                   There are {productCount} Products
//                 </span>
//               </div>

//               {/* Sort dropdown */}
//               <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
//                 <span className="text-[14px] font-semibold text-gray-500 pl-3">Sort By</span>
//                 <Button
//                   id="sort-button"
//                   aria-controls={open ? "sort-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                   onClick={handleClick}
//                   className="!bg-gray-50 !text-[13px] !text-black !capitalize"
//                 >
//                   {selectedSort}
//                 </Button>
//                 <Menu
//                   id="sort-menu"
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   slotProps={{ list: { "aria-labelledby": "sort-button" } }}
//                 >
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => handleSortBy("name", "asc", "Name, A to Z")}
//                   >
//                     Name, A to Z
//                   </MenuItem>
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => handleSortBy("name", "desc", "Name, Z to A")}
//                   >
//                     Name, Z to A
//                   </MenuItem>
//                   {/* ✅ Price increasing */}
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => handleSortBy("price", "asc", "Price: Low to High")}
//                   >
//                     Price: Low to High
//                   </MenuItem>
//                   {/* ✅ Price decreasing */}
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => handleSortBy("price", "desc", "Price: High to Low")}
//                   >
//                     Price: High to Low
//                   </MenuItem>
//                 </Menu>
//               </div>
//             </div>

//             {/* Product grid/list */}
//             <div
//               className={`grid ${
//                 itemView === "grid"
//                   ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
//                   : "grid-cols-1"
//               } gap-5`}
//             >
//               {itemView === "grid" ? (
//                 isLoading ? (
//                   <CategoryLoading view={itemView} />
//                 ) : productCount !== 0 ? (
//                   productsData?.products?.map((item, index) => (
//                     <ProductsItems key={item?._id || index} item={item} />
//                   ))
//                 ) : (
//                   <p className="col-span-full text-center py-16 text-gray-400">
//                     No products found in this category.
//                   </p>
//                 )
//               ) : isLoading ? (
//                 <ProductsLoading view={itemView} />
//               ) : productCount !== 0 ? (
//                 productsData?.products?.map((item, index) => (
//                   <ProductsItemsListView key={item?._id || index} item={item} />
//                 ))
//               ) : (
//                 <p className="text-center py-16 text-gray-400">
//                   No products found in this category.
//                 </p>
//               )}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-10 flex">
//                 <Pagination
//                   count={totalPages}
//                   page={page}
//                   onChange={(e, value) => setPage(value)}
//                   shape="rounded"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <hr />
//     </section>
//   );
// };

// export default CategoryPage;
import React, { useContext, useState } from "react";
import Siderbar from "../Components/Siderbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
import ProductsItems from "../Components/ProductsItems";
import { IoGridSharp } from "react-icons/io5";
import { LuMenu, LuSlidersHorizontal } from "react-icons/lu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductsItemsListView from "../Components/ProductsItemsListView";
import Pagination from "@mui/material/Pagination";
import ProductsLoading from "../Components/ProductsLoading";
import CategoryLoading from "../Components/CategoryLoading";
import axios from "axios";
import { MyContext } from "../App";
import PageTitle from "../Components/PageTitle";
const API_URL = import.meta.env.VITE_API_URL
const CategoryPage = () => {
  const { slug } = useParams();
  const context = useContext(MyContext);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemView, setItemView] = useState("grid");
  const [selectedSort, setSelectedSort] = useState("Default");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // ✅ RESPONSIVE: mobile filter drawer toggle — the sidebar used to just
  // sit in normal flow above the products on small screens, pushing the
  // whole catalog down. Now it's collapsed by default on mobile and
  // opened via a "Filters" button, like the desktop-only pattern from
  // the old commented-out draft, but built with what's already used
  // elsewhere in this codebase (no extra MUI Drawer needed).
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSortBy = async (name, order, label) => {
    try {
      setSelectedSort(label);

      const res = await axios.post(
        `${API_URL}/api/product/sortby`,
        {
          products: productsData?.products || [],
          sortBy: name,
          order: order,
        },
      );

      setProductsData((prev) => ({
        ...prev,
        products: res.data.products,
      }));

      setAnchorEl(null);
    } catch (error) {
      // ✅ FIX: context.error(...) doesn't exist — the rest of the app
      // uses context.openAlertBox("error", message). This crashed the
      // sort dropdown on any failed request instead of showing a message.
      context.openAlertBox(
        "error",
        error?.response?.data?.message || "Could not sort products",
      );
    }
  };

  const productCount =
    productsData?.products?.length === 0
      ? 0
      : productsData?.products?.length || 0;

  return (
    // ✅ DESIGN: warm cream page background instead of flat white, to
    // match the bakery/floral brand palette used across the redesigned
    // sidebar.
    <>
    <PageTitle  title="Category"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
   
    <section className="py-5 bg-[#FBF6F1] pb-10 min-h-screen">
      {/* Breadcrumb */}
      <div className="container px-3 sm:px-4 lg:px-0">
        <div className="bg-white border border-[#E9DED2] rounded-full py-1.5 px-4 w-fit text-[#8A7B6E]">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component={RouterLink}
              to={"/"}
              underline="hover"
              className="hover:!text-[#B23A5C] transition cursor-pointer !text-[13px]"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to={`/category/${slug}`}
              underline="hover"
              className="hover:!text-[#B23A5C] transition capitalize !text-[13px] !text-[#2D1B12] !font-medium"
            >
              {slug?.replace(/-/g, " ")}
            </Link>
          </Breadcrumbs>
        </div>

        {/* ✅ DESIGN: a short serif title anchors the page the way a
            category landing page should — the old version jumped
            straight into the toolbar with no page heading at all. */}
        <h1 className="font-serif text-[26px] sm:text-[32px] text-[#2D1B12] font-semibold mt-4 capitalize">
          {slug?.replace(/-/g, " ") || "All Products"}
        </h1>
      </div>

      <div className="bg-[#FBF6F1] p-3 mt-2">
        <div className="flex gap-5 container px-3 sm:px-4 lg:px-0 flex-col md:flex-row">
          {/* Mobile filter toggle */}
          <div className="md:hidden">
            <Button
              onClick={() => setShowMobileFilters((v) => !v)}
              className="!bg-white !border !border-[#E9DED2] !text-[#2D1B12] !normal-case !rounded-full !px-4 !py-2 !text-[13px] !font-semibold w-full !justify-start !gap-2"
            >
              <LuSlidersHorizontal /> Filters{" "}
              {showMobileFilters ? "▲" : "▼"}
            </Button>
          </div>

          {/* Sidebar */}
          <div
            className={`sidebarWrapper w-full md:w-[26%] lg:w-[22%] h-full ${
              showMobileFilters ? "block" : "hidden"
            } md:block`}
          >
            <Siderbar
              slug={slug}
              productsData={productsData}
              setProductsData={setProductsData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              page={page}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
            />
          </div>

          {/* Right content: toolbar + product grid */}
          <div className="rightContent w-full md:w-[74%] lg:w-[78%] py-1">
            {/* ✅ DESIGN: toolbar restyled — soft blush border/background
                instead of flat gray, rose accent on the active view
                toggle. ✅ RESPONSIVE: sticky offset now smaller on mobile
                (shorter mobile header) and full-width wrapping instead
                of overflowing. */}
            <div className="bg-white border border-[#E9DED2] p-2 w-full mb-5 rounded-xl flex flex-wrap items-center justify-between gap-3 sticky top-[70px] md:top-[130px] z-[50]">
              <div className="col1 flex items-center gap-2 itemViewActions">
                <Button
                  className={`!w-[38px] !h-[38px] !min-w-[38px] !rounded-full !transition-colors ${
                    itemView === "list"
                      ? "!bg-[#B23A5C] !text-white"
                      : "!text-[#8A7B6E] hover:!bg-[#F3D9E1]"
                  }`}
                  onClick={() => setItemView("list")}
                >
                  <LuMenu className="text-lg" />
                </Button>
                <Button
                  className={`!w-[38px] !h-[38px] !min-w-[38px] !rounded-full !transition-colors ${
                    itemView === "grid"
                      ? "!bg-[#B23A5C] !text-white"
                      : "!text-[#8A7B6E] hover:!bg-[#F3D9E1]"
                  }`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp className="text-lg" />
                </Button>
                <span className="text-[13px] font-semibold text-[#8A7B6E] pl-2 whitespace-nowrap">
                  {productCount} Products
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end gap-2">
                <span className="text-[13px] font-semibold text-[#8A7B6E] hidden sm:inline">
                  Sort By
                </span>
                <Button
                  id="sort-button"
                  aria-controls={open ? "sort-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-[#FBF6F1] !border !border-[#E9DED2] !text-[13px] !text-[#2D1B12] !capitalize !rounded-full !px-4"
                >
                  {selectedSort}
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{ list: { "aria-labelledby": "sort-button" } }}
                >
                  <MenuItem
                    className="!text-[13px] !capitalize !text-[#2D1B12]"
                    onClick={() => handleSortBy("name", "asc", "Name, A to Z")}
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    className="!text-[13px] !capitalize !text-[#2D1B12]"
                    onClick={() => handleSortBy("name", "desc", "Name, Z to A")}
                  >
                    Name, Z to A
                  </MenuItem>
                  <MenuItem
                    className="!text-[13px] !capitalize !text-[#2D1B12]"
                    onClick={() =>
                      handleSortBy("price", "asc", "Price: Low to High")
                    }
                  >
                    Price: Low to High
                  </MenuItem>
                  <MenuItem
                    className="!text-[13px] !capitalize !text-[#2D1B12]"
                    onClick={() =>
                      handleSortBy("price", "desc", "Price: High to Low")
                    }
                  >
                    Price: High to Low
                  </MenuItem>
                </Menu>
              </div>
            </div>

            {/* Product grid/list */}
            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              } gap-4 sm:gap-5`}
            >
              {itemView === "grid" ? (
                isLoading ? (
                  <CategoryLoading view={itemView} />
                ) : productCount !== 0 ? (
                  productsData?.products?.map((item, index) => (
                    <ProductsItems key={item?._id || index} item={item} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-[#2D1B12] font-serif text-lg mb-1">
                      Nothing here yet
                    </p>
                    <p className="text-[#8A7B6E] text-sm">
                      Try a different category or widen your price range.
                    </p>
                  </div>
                )
              ) : isLoading ? (
                <ProductsLoading view={itemView} />
              ) : productCount !== 0 ? (
                productsData?.products?.map((item, index) => (
                  <ProductsItemsListView key={item?._id || index} item={item} />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-[#2D1B12] font-serif text-lg mb-1">
                    Nothing here yet
                  </p>
                  <p className="text-[#8A7B6E] text-sm">
                    Try a different category or widen your price range.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center md:justify-start">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#2D1B12",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#B23A5C !important",
                      color: "#fff",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
     </>
  );
};

export default CategoryPage;