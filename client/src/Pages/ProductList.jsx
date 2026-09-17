// import React, { useEffect, useState } from "react";
// import ProductsSlider from "../Components/ProductsSlider";
// import Siderbar from "../Components/Siderbar";
// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { Link as RouterLink,} from "react-router-dom";
// import Link from "@mui/material/Link";
// import ProductsItems from "../Components/ProductsItems";
// import { IoGridSharp } from "react-icons/io5";
// import { LuMenu } from "react-icons/lu";
// import { BiGridVertical } from "react-icons/bi";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ProductsItemsListView from "../Components/ProductsItemsListView";
// import Pagination from "@mui/material/Pagination";
// import { use } from "react";
// import ProductsLoading from "../Components/ProductsLoading";
// import axios from "axios";
// import CategoryLoading from "../Components/CategoryLoading";
// import { useParams } from "react-router-dom";
// // import CategoryColpass from '../Components/CategoryColpass';

// const ProductList = () => {
//   const [productsData, setProductsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [itemView, setItemView] = useState("grid");
//   const [selectedSort, setSelectedSort] = useState("Name, A to Z");
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const { slug } = useParams();

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleSortBy = async (name, order, product, value) => {
//     try {
//       setSelectedSort(value);

//       const res = await axios.post("http://localhost:5000/api/product/sortby", {
//         products: productsData?.products || [],
//         sortBy: name,
//         order: order,
//       });

//       // Keep same data structure
//       setProductsData((prev) => ({
//         ...prev,
//         products: res.data.products,
//       }));

//       setAnchorEl(null);
//     } catch (error) {
//       console.log("Sort Error:", error);
//     }
//   };
//   // const handleSortBy = (name, order, product, value) => {
//   //   setSelectedSort(value);
//   //   axios
//   //     .post(`http://localhost:5000/api/product/sortby`, {
//   //       products: productsData.product,
//   //       sortBy: name,
//   //       order,
//   //     })
//   //     .then((res) => {
//   //       setProductsData(res.data.products);
//   //       setAnchorEl(null);
//   //     });
//   // };
//   return (
//     <section className="py-5 bg-white pb-0">
//       <div className="container">
//         <div className="bg-gray-200 rounded-md py-1 px-1 w-[15%] text-gray-400">
//           <Breadcrumbs aria-label="breadcrumb">
//               <Link
//               component={RouterLink}
//               to={"/"}
//               color="inherit"
//               underline="hover"
//               className="hover:!text-black transition cursor-pointer"
//             >
//               Home
//             </Link>
//             <Link
//               color="inherit"
//               to={`/${slug}`}
//               className="hover:!text-black transition"
//             >
//               Categories
//             </Link>
//             {/* <Typography sx={{ color: 'text.primary' }}>Fashion</Typography> */}
//           </Breadcrumbs>
//         </div>
//       </div>
//       <div className="bg-white p-3 mt-4">
//         <div className=" flex gap-3 container">
//           <div className="sidebarWrapper w-[20%] h-full bg-white">
//             <Siderbar
//               productsData={productsData}
//               setProductsData={setProductsData}
//               isLoading={isLoading}
//               setIsLoading={setIsLoading}
//               page={page}
//               totalPages={totalPages}
//               setTotalPages={setTotalPages}
//             />
//             {/* <CategoryColpass/> */}
//           </div>
//           <div className="rightContent w-[80%] py-4">
//             <div className="bg-gray-200 p-2 w-full mb-5 rounded-md flex items-center justify-between sticky top-[130px] z-[50]">
//               <div className="col1 flex items-center gap-3 itemViewActions">
//                 <Button
//                   className={`!w-[40px] hover:!bg-gray-200 !h-[40px] !min-w-[40px] !rounded-full !text-gray-400 ${
//                     itemView === "list" && "active"
//                   }`}
//                   onClick={() => setItemView("list")}
//                 >
//                   {" "}
//                   <LuMenu className="text-[90px]" />{" "}
//                 </Button>
//                 <Button
//                   className={`!w-[40px] hover:!bg-gray-200 !h-[40px] !min-w-[40px] !rounded-full !text-gray-400 ${
//                     itemView === "grid" && "active"
//                   }`}
//                   onClick={() => setItemView("grid")}
//                 >
//                   {" "}
//                   <IoGridSharp className="text-xl" />{" "}
//                 </Button>

//                 <span className="text-[14px] font-semibold text-gray-500 pl-3">
//                   {/* There are {productsData?.products?.length !== 0 ? productsData?.products?.length : 0} Products */}
//                   There are{" "}
//                   {productsData?.products?.length === 0
//                     ? 0
//                     : productsData?.products?.length}
//                   Products
//                 </span>
//               </div>
//               <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
//                 <span className="text-[14px] font-semibold text-gray-500 pl-3">
//                   Short By
//                 </span>
//                 <Button
//                   id="basic-button"
//                   aria-controls={open ? "basic-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                   onClick={handleClick}
//                   className="!bg-gray-50 !text-[13px] !text-black !capitalize"
//                 >
//                   {selectedSort}
//                 </Button>
//                 <Menu
//                   id="basic-menu"
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   slotProps={{
//                     list: {
//                       "aria-labelledby": "basic-button",
//                     },
//                   }}
//                 >
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => {
//                       handleSortBy("name", "asc", productsData, "Name, A to Z");
//                     }}
//                   >
//                     Name, A to Z
//                   </MenuItem>
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => {
//                       handleSortBy(
//                         "price",
//                         "asc",
//                         productsData,
//                         "Price, low to high",
//                       );
//                     }}
//                   >
//                     Price low to high
//                   </MenuItem>
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => {
//                       handleSortBy(
//                         "price",
//                         "desc",
//                         productsData,
//                         "Price, high to low",
//                       );
//                     }}
//                   >
//                     Price high to low
//                   </MenuItem>
//                   <MenuItem
//                     className="!text-[13px] !capitalize !text-black"
//                     onClick={() => {
//                       handleSortBy("name", "desc", productsData, "Name,Z to A");
//                     }}
//                   >
//                     Name,Z to A
//                   </MenuItem>
//                 </Menu>
//               </div>
//             </div>
//             <div
//               className={`grid ${
//                 itemView === "grid"
//                   ? "grid-cols-4 md:grid-cols-4"
//                   : "grid-cols-1 md:grid-cols-1"
//               }  gap-5`}
//             >
//               {itemView === "grid" ? (
//                 <>
//                   {isLoading === true ? (
//                     <CategoryLoading view={itemView} />
//                   ) : (
//                     productsData?.products?.length !== 0 &&
//                     productsData?.products?.map((item, index) => {
//                       return <ProductsItems key={index} item={item} />;
//                     })
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {isLoading === true ? (
//                     <ProductsLoading view={itemView} />
//                   ) : (
//                     productsData?.products?.length !== 0 &&
//                     productsData?.products?.map((item, index) => {
//                       return <ProductsItemsListView key={index} item={item} />;
//                     })
//                   )}
//                 </>
//               )}
//             </div>
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

// export default ProductList;
import React, { useEffect, useState } from "react";

import Siderbar from "../Components/Siderbar";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

import {
  Link as RouterLink,
  useParams,
} from "react-router-dom";

import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

import ProductsItems from "../Components/ProductsItems";
import ProductsItemsListView from "../Components/ProductsItemsListView";

import ProductsLoading from "../Components/ProductsLoading";
import CategoryLoading from "../Components/CategoryLoading";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const ProductList = () => {

  // ==================================================
  // URL SLUG
  // ==================================================

  const { slug } = useParams();


  // ==================================================
  // PRODUCTS
  // ==================================================

  const [productsData, setProductsData] = useState({
    products: [],
  });


  const [isLoading, setIsLoading] =
    useState(false);


  // ==================================================
  // PAGINATION
  // ==================================================

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);


  // ==================================================
  // VIEW
  // ==================================================

  const [itemView, setItemView] =
    useState("grid");


  // ==================================================
  // SORT
  // ==================================================

  const [selectedSort, setSelectedSort] =
    useState("Name, A to Z");

  const [anchorEl, setAnchorEl] =
    useState(null);

  const open = Boolean(anchorEl);


  // ==================================================
  // CATEGORY
  // ==================================================

  const [categoryName, setCategoryName] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");


  // ==================================================
  // GET CATEGORY
  // ==================================================

  const getCategory = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/category`
      );


      const categories =
        Array.isArray(res?.data?.data)
          ? res.data.data
          : [];


      const category =
        categories.find(
          (cat) =>
            cat?.slug === slug
        );


      if (category) {

        setCategoryId(
          category._id
        );

        setCategoryName(
          category.name
        );

        return category;

      }


      setCategoryId("");
      setCategoryName(
        slug || "All Products"
      );


      return null;


    } catch (error) {

      console.error(
        "Category error:",
        error
      );

      setCategoryId("");

      setCategoryName(
        slug || "All Products"
      );

      return null;

    }

  };


  // ==================================================
  // GET PRODUCTS BY CATEGORY ID
  // ==================================================

  const getProductsByCategory =
    async (id) => {

      if (!id) {

        setProductsData({
          products: [],
        });

        return;

      }


      try {

        setIsLoading(true);


        const res = await axios.get(
          `${API_URL}/api/product/getproductbycat/${id}`
        );


        console.log(
          "CATEGORY PRODUCTS RESPONSE:",
          res.data
        );


        let products = [];


        if (
          Array.isArray(
            res?.data?.product
          )
        ) {

          products =
            res.data.product;

        } else if (
          Array.isArray(
            res?.data?.products
          )
        ) {

          products =
            res.data.products;

        } else if (
          Array.isArray(
            res?.data
          )
        ) {

          products =
            res.data;

        }


        setProductsData({
          ...res.data,
          products: products,
        });


        setTotalPages(
          res?.data?.totalPages || 1
        );


      } catch (error) {

        console.error(
          "Category products error:",
          error
        );


        setProductsData({
          products: [],
        });

        setTotalPages(1);


      } finally {

        setIsLoading(false);

      }

    };


  // ==================================================
  // WHEN SLUG CHANGES
  // ==================================================

  useEffect(() => {

    const loadCategory = async () => {

      setPage(1);

      setSelectedSort(
        "Name, A to Z"
      );


      const category =
        await getCategory();


      if (category?._id) {

        await getProductsByCategory(
          category._id
        );

      }

    };


    loadCategory();

  }, [slug]);


  // ==================================================
  // SORT MENU
  // ==================================================

  const handleClick = (event) => {

    setAnchorEl(
      event.currentTarget
    );

  };


  const handleClose = () => {

    setAnchorEl(null);

  };


  // ==================================================
  // SORT
  // ==================================================

  const handleSortBy = async (
    name,
    order,
    value
  ) => {

    try {

      setSelectedSort(value);


      const currentProducts =
        productsData?.products || [];


      if (
        currentProducts.length === 0
      ) {

        setAnchorEl(null);

        return;

      }


      const res =
        await axios.post(
          `${API_URL}/api/product/sortby`,
          {
            products:
              currentProducts,

            sortBy:
              name,

            order:
              order,
          }
        );


      const sortedProducts =
        res?.data?.products ||
        res?.data ||
        [];


      setProductsData((prev) => ({
        ...prev,

        products:
          Array.isArray(
            sortedProducts
          )
            ? sortedProducts
            : [],
      }));


      setAnchorEl(null);

    } catch (error) {

      console.error(
        "Sort error:",
        error
      );

    }

  };


  // ==================================================
  // PRODUCT COUNT
  // ==================================================

  const productCount =
    productsData?.products?.length || 0;


  // ==================================================
  // PAGE CHANGE
  // ==================================================

  const handlePageChange =
    (event, value) => {

      setPage(value);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };


  return (

    <section className="py-5">

      <div className="container-fluid">

        {/* ==========================================
            BREADCRUMB
        ========================================== */}

        <div className="mb-6">

          <Breadcrumbs>

            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="hover"
            >
              Home
            </Link>


            <Typography
              color="text.primary"
            >
              {categoryName}
            </Typography>

          </Breadcrumbs>

        </div>


        {/* ==========================================
            CATEGORY TITLE
        ========================================== */}

        <div className="mb-6">

          <Typography
            variant="h4"
            className="!font-semibold capitalize"
          >
            {categoryName ||
              "Products"}
          </Typography>

        </div>


        {/* ==========================================
            SIDEBAR + PRODUCTS
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[260px_1fr]
            gap-8
          "
        >


          {/* ========================================
              SIDEBAR
          ======================================== */}

          <div>

            <Siderbar
              page={page}
              setProductsData={
                setProductsData
              }
              setTotalPages={
                setTotalPages
              }
              setIsLoading={
                setIsLoading
              }
            />

          </div>


          {/* ========================================
              PRODUCTS
          ======================================== */}

          <div>


            {/* ======================================
                TOP BAR
            ====================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                flex-wrap
                gap-4
                mb-5
                p-3
                bg-gray-100
                rounded-lg
              "
            >


              {/* VIEW */}

              <div className="flex gap-2">

                <Button
                  onClick={() =>
                    setItemView("list")
                  }
                  className={`
                    !w-[40px]
                    !h-[40px]
                    !min-w-[40px]
                    !rounded-full
                    ${
                      itemView === "list"
                        ? "!bg-gray-300 !text-black"
                        : "!text-gray-400"
                    }
                  `}
                >
                  <LuMenu size={20} />
                </Button>


                <Button
                  onClick={() =>
                    setItemView("grid")
                  }
                  className={`
                    !w-[40px]
                    !h-[40px]
                    !min-w-[40px]
                    !rounded-full
                    ${
                      itemView === "grid"
                        ? "!bg-gray-300 !text-black"
                        : "!text-gray-400"
                    }
                  `}
                >
                  <IoGridSharp size={18} />
                </Button>

              </div>


              {/* COUNT */}

              <span
                className="
                  text-[14px]
                  font-semibold
                  text-gray-500
                "
              >
                There are{" "}
                {productCount}
                {" "}Products
              </span>


              {/* SORT */}

              <div className="flex items-center gap-3">

                <span
                  className="
                    text-[14px]
                    font-semibold
                    text-gray-500
                  "
                >
                  Sort By
                </span>


                <Button
                  onClick={handleClick}
                  className="
                    !bg-white
                    !text-[13px]
                    !text-black
                    !capitalize
                  "
                >
                  {selectedSort}
                </Button>


                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >

                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "name",
                        "asc",
                        "Name, A to Z"
                      )
                    }
                  >
                    Name, A to Z
                  </MenuItem>


                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "asc",
                        "Price, low to high"
                      )
                    }
                  >
                    Price low to high
                  </MenuItem>


                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "desc",
                        "Price, high to low"
                      )
                    }
                  >
                    Price high to low
                  </MenuItem>


                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "name",
                        "desc",
                        "Name, Z to A"
                      )
                    }
                  >
                    Name, Z to A
                  </MenuItem>

                </Menu>

              </div>

            </div>


            {/* ======================================
                PRODUCTS GRID
            ====================================== */}

            <div
              className={`
                grid
                ${
                  itemView === "grid"
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }
                gap-5
              `}
            >

              {isLoading ? (

                itemView === "grid" ? (

                  <CategoryLoading
                    view="grid"
                  />

                ) : (

                  <ProductsLoading
                    view="list"
                  />

                )

              ) : productCount > 0 ? (

                productsData.products.map(
                  (item, index) => (

                    itemView === "grid" ? (

                      <ProductsItems
                        key={
                          item?._id ||
                          item?.id ||
                          index
                        }
                        item={item}
                      />

                    ) : (

                      <ProductsItemsListView
                        key={
                          item?._id ||
                          item?.id ||
                          index
                        }
                        item={item}
                      />

                    )

                  )
                )

              ) : (

                <div
                  className="
                    col-span-full
                    text-center
                    py-20
                  "
                >

                  <Typography
                    className="!text-gray-500"
                  >
                    No products found in this
                    category.
                  </Typography>

                </div>

              )}

            </div>


            {/* ======================================
                PAGINATION
            ====================================== */}

            {totalPages > 1 && (

              <div className="mt-10 flex justify-center">

                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={
                    handlePageChange
                  }
                  shape="rounded"
                />

              </div>

            )}

          </div>

        </div>

      </div>

    </section>

  );

};


export default ProductList;