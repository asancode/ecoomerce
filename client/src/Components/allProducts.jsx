import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { FiSearch, FiShoppingCart, FiStar, FiSliders } from "react-icons/fi";
import { FiHome, FiChevronRight } from "react-icons/fi";
import { Breadcrumbs } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "name_az", label: "Name: A to Z" },
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // =====================================================
  // FETCH ALL PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`${API_URL}/api/product/getAllProduct`);

        setProducts(res?.data?.products || res?.data?.product || []);
      } catch (error) {
        console.error("All products fetch error:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // SEARCH + SORT (client side)
  // =====================================================

  const visibleProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p?.name?.toLowerCase().includes(q));
    }

    switch (sortBy) {
      case "price_low":
        list.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case "price_high":
        list.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case "name_az":
        list.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
        break;
      default:
        list.sort(
          (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
        );
    }

    return list;
  }, [products, search, sortBy]);

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <section className="min-h-[70vh] bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CircularProgress
              size={32}
              thickness={4}
              sx={{ color: "#16a34a" }}
            />
          </div>
          <p className="text-sm font-medium text-gray-500">
            Loading products...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8fafc]">
      {/* =================================================
        BREADCRUMB
      ================================================== */}

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="inline-flex max-w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <Breadcrumbs
              separator={<FiChevronRight className="text-gray-400" />}
              aria-label="breadcrumb"
              className="!text-xs sm:!text-sm"
            >
              <Link
                to="/"
                className="flex items-center gap-1.5 !text-gray-500 hover:!text-[#16a34a] transition font-medium no-underline"
              >
                <FiHome className="text-sm" />
                Home
              </Link>
              <span className="!text-gray-900 font-semibold">
                All Products
              </span>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        {/* =================================================
          HEADING
        ================================================== */}

        <div className="mb-6 sm:mb-8">
          <p className="mb-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#16a34a]">
            Shop the full range
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            All Products
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {visibleProducts.length} item
            {visibleProducts.length === 1 ? "" : "s"} available
          </p>
        </div>

        {/* =================================================
          SEARCH + SORT BAR
        ================================================== */}

        <div className="mb-6 sm:mb-8 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  py-2.5
                  pl-10
                  pr-4
                  text-sm
                  text-gray-700
                  placeholder:text-gray-400
                  outline-none
                  focus:border-[#16a34a]
                  focus:bg-white
                  transition
                "
              />
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-2.5
                text-sm
                font-semibold
                text-gray-600
                hover:bg-gray-100
                transition
                sm:hidden
              "
            >
              <FiSliders />
              Sort
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                outline-none
                focus:border-[#16a34a]
                transition
                sm:block
                ${filtersOpen ? "block" : "hidden"}
              `}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* =================================================
          PRODUCT GRID
        ================================================== */}

        {visibleProducts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              No products found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Try a different search term or check back later.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-3
              sm:gap-4
              lg:gap-5
            "
          >
            {visibleProducts.map((product) => {
              const hasDiscount =
                product?.oldPrice && product.oldPrice > product?.price;

              const discountPct = hasDiscount
                ? Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                  )
                : 0;

              return (
                <Link
                  key={product?._id}
                  to={`/product/${product?._id}`}
                  className="
                    group
                    relative
                    flex
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    no-underline
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  {/* DISCOUNT BADGE */}

                  {hasDiscount && (
                    <span
                      className="
                        absolute
                        left-2.5
                        top-2.5
                        z-10
                        rounded-full
                        bg-[#d94667]
                        px-2.5
                        py-1
                        text-[11px]
                        font-bold
                        text-white
                      "
                    >
                      -{discountPct}%
                    </span>
                  )}

                  {/* IMAGE */}

                  <div className="aspect-square w-full overflow-hidden bg-gray-50">
                    <img
                      src={product?.images?.[0] || "/placeholder.png"}
                      alt={product?.name}
                      className="
                        h-full
                        w-full
                        object-contain
                        p-4
                        transition
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* DETAILS */}

                  <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
                    {product?.category?.name && (
                      <span className="text-[11px] font-medium text-gray-400 truncate">
                        {product.category.name}
                      </span>
                    )}

                    <h3
                      className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-gray-800
                        leading-snug
                        line-clamp-2
                        min-h-[2.5em]
                      "
                    >
                      {product?.name}
                    </h3>

                    {product?.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <FiStar className="text-amber-400 fill-amber-400 text-sm" />
                        <span className="text-xs font-medium text-gray-500">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          ₹{product?.price}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        title="Add to cart"
                        onClick={(e) => e.preventDefault()}
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-green-50
                          text-[#16a34a]
                          transition
                          hover:bg-[#16a34a]
                          hover:text-white
                        "
                      >
                        <FiShoppingCart className="text-base" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;