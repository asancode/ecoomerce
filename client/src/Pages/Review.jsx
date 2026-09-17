// import { Button, Rating, TextField } from "@mui/material";
// import React from "react";
// import { useContext } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { MyContext } from "../App";
// import axios from "axios";

// const Review = (props) => {
//   const context = useContext(MyContext);
//   const [reviews, setReviews] = useState({
//     image: "",
//     userName: "",
//     rating: "", // ⚠️ Agar rating number hogi to "" ki jagah 0 rakho
//     review: "",
//     userId: "",
//     productId: "",
//   });
//   const [isLoading, setIsLoding] = useState(false);
//   const [reviewsData, setReviewsData] = useState([]);
//   useEffect(() => {
//     setReviews(() => ({
//       ...reviews, // Existing reviews ko preserve karne ke liye
//       image: context?.userDetails?.data?.avatar,
//       userName: context?.userDetails?.data?.name,
//       userId: context?.userDetails?.data?._id,
//       productId: props.productId,
//     }));
//   }, [context?.userDetails, props.productId]); // ✅ Sahi hai
//   const onChangeInput = (e) => {
//     setReviews(() => ({
//       ...reviews,
//       review: e.target.value,
//     }));
//   };
//   const addReview = (e) => {
//     e.preventDefault();
//     if (reviews?.review !== "") {
//       const token = localStorage.getItem("accessToken");
//       axios
//         .post(`http://localhost:5000/api/user/add-review`, reviews, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           if (res?.error !== false) {
//             context.openAlertBox("success", res.data.message);
//             setReviews((e) => ({ ...e, review: "", rating: 1 }));
//             // setReviewsData(res.data.data);
//             getReviews();
//           } else {
//             context.openAlertBox("error", res.data.message);
//           }
//         });
//     } else {
//       context.openAlertBox("error", "Please add review");
//     }
//   };
//   const getReviews = () => {
//     axios
//       .get(
//         `http://localhost:5000/api/user/get-reviews?productId=${props.productId}`,
//       )
//       .then((res) => {
//         if (res?.error !== false) {
//           setReviewsData(res?.data?.reviews);
//           props.setReviewsCount(res?.data?.reviews?.length);
//         }
//         // setReviewsData(res?.data?.reviews);
//         // props.setReviewsCount(res?.data?.reviews?.length);
//       });
//   };
//   useEffect(() => {
//     // if (props.productId) {
//       // ✅ Pehle check karo productId hai ya nahi
//       getReviews();
    
//   }, [props.productId]);
//   //   const getReviews = () => {
//   //     axios
//   //       .get(
//   //         `http://localhost:5000/api/user/get-reviews/${props.productId}`,
//   //       )
//   //       .then((res) => {
//   //         setReviewsData(res.data.reviews);
//   //         props.setReviewsCount(res.data.reviews.length);
//   //         console.log(res);
//   //       });
//   //   };
//   return (
//     <div className="w-full productReviewsContainer">
//       <h2 className="text-[18px] font-semibold">
//         Customer Questions & Answers
//       </h2>
//       {Array.isArray(reviewsData) && reviewsData.length > 0 && (
//         <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-3 pr-5">
//           {reviewsData?.map((review, index) => (
//             <div className="review pt-5 pb-5 border-b border-gray-300 w-full flex items-center justify-between">
//               <div className="info w-[60%] flex items-center gap-4">
//                 <div className="img">
//                   <img
//                     src={review?.images?.[0]}
//                     className="w-[80px] h-[80px] overflow-hidden rounded-full"
//                   />
//                 </div>
//                 <div className="w-[80%]">
//                   <h4 className="text-[16px]">{review?.userName}</h4>
//                   <p className="mt-0 mb-0">{review?.review}</p>
//                   <h5 className="text-[13px] mb-0">
//                     {new Date(review?.createdAt).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                     })}
//                   </h5>
//                 </div>
//               </div>
//               <Rating value={review?.rating} />
//             </div>
//           ))}
//         </div>
//       )}

//       <br />
//       <div className="reviewForm bg-gray-100 p-4 rounded-md">
//         <h2 className="text-[18px] font-semibold">Add a review</h2>

//         <form className="!w-full !focus:outline-none mt-5" onSubmit={addReview}>
//           <TextField
//             className="w-full !mt-3"
//             id="filled-multiline-static"
//             label="Write a review...."
//             multiline
//             onChange={onChangeInput}
//             rows={4}
//             name="review"
//             value={reviews.review}
//             // defaultValue="Default Value"
//             // variant="filled"
//           />
//           <br />
//           <Rating
//             defaultValue={reviews.rating}
//             onChange={(e, newValue) =>
//               setReviews((e) => ({ ...reviews, rating: newValue }))
//             }
//           />
//           <div className="flex items-center">
//             <Button
//               type="submit"
//               className="!mt-3 !bg-black !text-white !font-[500] !text-[16px] !p-5 !mb-3 hover:!bg-gray-400  border-none !h-[25px] hover:!border-none"
//             >
//               {/* <MdOutlineShoppingCart className="text-[19px] " /> */}
//               Submit Review{" "}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Review;
import {
  Button,
  CircularProgress,
  Rating,
  TextField,
} from "@mui/material";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { MyContext } from "../App";
import axios from "axios";
import {
  FiMessageSquare,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { HiOutlineStar } from "react-icons/hi2";

const API_URL = import.meta.env.VITE_API_URL

const Review = (props) => {
  const context = useContext(MyContext);

  const [reviews, setReviews] = useState({
    image: "",
    userName: "",
    rating: 0,
    review: "",
    userId: "",
    productId: "",
  });

  const [reviewsData, setReviewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingReviews, setIsFetchingReviews] =
    useState(false);

  // =====================================================
  // USER + PRODUCT DATA
  // =====================================================

  useEffect(() => {
    setReviews((prev) => ({
      ...prev,
      image:
        context?.userDetails?.data?.avatar || "",
      userName:
        context?.userDetails?.data?.name || "",
      userId:
        context?.userDetails?.data?._id || "",
      productId: props?.productId || "",
    }));
  }, [
    context?.userDetails?.data?.avatar,
    context?.userDetails?.data?.name,
    context?.userDetails?.data?._id,
    props?.productId,
  ]);

  // =====================================================
  // GET REVIEWS
  // =====================================================

  const getReviews = async () => {
    if (!props?.productId) return;

    try {
      setIsFetchingReviews(true);

      const res = await axios.get(
        `${API_URL}/user/get-reviews?productId=${props.productId}`
      );

      if (res?.data) {
        const data = Array.isArray(
          res?.data?.reviews
        )
          ? res.data.reviews
          : [];

        setReviewsData(data);

        props?.setReviewsCount?.(data.length);
      }
    } catch (error) {
      console.error(
        "Get reviews error:",
        error
      );

      setReviewsData([]);
      props?.setReviewsCount?.(0);
    } finally {
      setIsFetchingReviews(false);
    }
  };

  // =====================================================
  // LOAD REVIEWS
  // =====================================================

  useEffect(() => {
    getReviews();
  }, [props?.productId]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const onChangeInput = (e) => {
    const value = e.target.value;

    setReviews((prev) => ({
      ...prev,
      review: value,
    }));
  };

  // =====================================================
  // RATING CHANGE
  // =====================================================

  const handleRatingChange = (event, newValue) => {
    setReviews((prev) => ({
      ...prev,
      rating: newValue || 0,
    }));
  };

  // =====================================================
  // SUBMIT REVIEW
  // =====================================================

  const addReview = async (e) => {
    e.preventDefault();

    const reviewText = reviews?.review?.trim();

    if (!reviewText) {
      context?.openAlertBox?.(
        "error",
        "Please write a review."
      );
      return;
    }

    if (!reviews?.rating || reviews.rating < 1) {
      context?.openAlertBox?.(
        "error",
        "Please select a rating."
      );
      return;
    }

    if (!reviews?.productId) {
      context?.openAlertBox?.(
        "error",
        "Product not found."
      );
      return;
    }

    const token =
      localStorage.getItem("accessToken");

    if (!token) {
      context?.openAlertBox?.(
        "error",
        "Please login to submit a review."
      );
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        ...reviews,
        review: reviewText,
      };

      const res = await axios.post(
        `${API_URL}/user/add-review`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data) {
        context?.openAlertBox?.(
          "success",
          res?.data?.message ||
            "Review submitted successfully."
        );

        // Reset only review/rating
        setReviews((prev) => ({
          ...prev,
          review: "",
          rating: 0,
        }));

        // Reload reviews
        await getReviews();
      }
    } catch (error) {
      console.error(
        "Add review error:",
        error
      );

      context?.openAlertBox?.(
        "error",
        error?.response?.data?.message ||
          "Unable to submit review."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // AVATAR
  // =====================================================

  const getAvatar = (review) => {
    return (
      review?.images?.[0] ||
      review?.image ||
      ""
    );
  };

  // =====================================================
  // CALCULATE AVERAGE RATING
  // =====================================================

  const averageRating =
    reviewsData.length > 0
      ? reviewsData.reduce(
          (sum, item) =>
            sum + Number(item?.rating || 0),
          0
        ) / reviewsData.length
      : 0;

  return (
    <div className="w-full">

      {/* =================================================
          HEADER
      ================================================== */}

      <div
        className="
          mb-5
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <div className="flex items-center gap-2">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-green-50
                text-[#16a34a]
              "
            >
              <FiMessageSquare className="text-lg" />
            </div>

            <div>

              <h2
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-gray-900
                "
              >
                Customer Reviews
              </h2>

              <p className="text-xs sm:text-sm text-gray-500">
                {reviewsData.length}{" "}
                {reviewsData.length === 1
                  ? "review"
                  : "reviews"}
              </p>

            </div>

          </div>

        </div>

        {/* Average Rating */}

        {reviewsData.length > 0 && (
          <div
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-green-100
              bg-green-50
              px-3
              py-2
            "
          >

            <HiOutlineStar className="text-lg text-yellow-500" />

            <span className="text-sm font-bold text-gray-800">
              {averageRating.toFixed(1)}
            </span>

            <span className="text-xs text-gray-500">
              / 5
            </span>

          </div>
        )}

      </div>

      {/* =================================================
          REVIEWS
      ================================================== */}

      {isFetchingReviews ? (
        <div
          className="
            flex
            min-h-[180px]
            items-center
            justify-center
          "
        >
          <CircularProgress
            size={30}
            sx={{
              color: "#16a34a",
            }}
          />
        </div>
      ) : reviewsData.length > 0 ? (
        <div
          className="
            max-h-[420px]
            space-y-3
            overflow-y-auto
            overflow-x-hidden
            pr-1
            sm:pr-2
          "
        >
          {reviewsData.map(
            (review, index) => {
              const avatar =
                getAvatar(review);

              return (
                <div
                  key={
                    review?._id ||
                    review?.id ||
                    index
                  }
                  className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    p-4
                    sm:p-5
                    shadow-sm
                    transition-all
                    duration-200
                    hover:border-green-100
                    hover:shadow-md
                  "
                >

                  {/* TOP */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >

                    {/* User */}

                    <div className="flex min-w-0 items-center gap-3">

                      {/* Avatar */}

                      {avatar ? (
                        <img
                          src={avatar}
                          alt={
                            review?.userName ||
                            "Customer"
                          }
                          className="
                            h-11
                            w-11
                            sm:h-12
                            sm:w-12
                            flex-shrink-0
                            rounded-full
                            border
                            border-gray-100
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            sm:h-12
                            sm:w-12
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-green-50
                            text-[#16a34a]
                          "
                        >
                          <FiUser className="text-lg" />
                        </div>
                      )}

                      {/* Name + Date */}

                      <div className="min-w-0">

                        <h4
                          className="
                            truncate
                            text-sm
                            sm:text-base
                            font-bold
                            text-gray-800
                          "
                        >
                          {review?.userName ||
                            "Anonymous Customer"}
                        </h4>

                        <p
                          className="
                            mt-0.5
                            text-[11px]
                            sm:text-xs
                            text-gray-400
                          "
                        >
                          {formatDate(
                            review?.createdAt
                          )}
                        </p>

                      </div>

                    </div>

                    {/* Rating */}

                    <div
                      className="
                        flex-shrink-0
                        rounded-lg
                        bg-yellow-50
                        px-2
                        py-1
                      "
                    >
                      <Rating
                        value={Number(
                          review?.rating || 0
                        )}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </div>

                  </div>

                  {/* REVIEW TEXT */}

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-gray-600
                    "
                  >
                    {review?.review}
                  </p>

                </div>
              );
            }
          )}
        </div>
      ) : (
        /* EMPTY STATE */

        <div
          className="
            flex
            min-h-[180px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-gray-200
            bg-gray-50
            px-5
            text-center
          "
        >

          <div
            className="
              mb-3
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white
              text-gray-400
              shadow-sm
            "
          >
            <FiMessageSquare className="text-xl" />
          </div>

          <h3 className="text-sm sm:text-base font-bold text-gray-700">
            No reviews yet
          </h3>

          <p className="mt-1 max-w-sm text-xs sm:text-sm text-gray-400">
            Be the first customer to share your
            experience with this product.
          </p>

        </div>
      )}

      {/* =================================================
          ADD REVIEW
      ================================================== */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-green-100
          bg-gradient-to-br
          from-green-50
          via-white
          to-white
          p-4
          sm:p-6
        "
      >

        {/* Form Header */}

        <div className="mb-5">

          <h2
            className="
              text-lg
              sm:text-xl
              font-bold
              text-gray-900
            "
          >
            Write a Review
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Share your experience and help other
            customers make a better decision.
          </p>

        </div>

        <form
          onSubmit={addReview}
          className="w-full"
        >

          {/* Review */}

          <TextField
            fullWidth
            label="Write your review"
            placeholder="Tell us what you think about this product..."
            multiline
            rows={5}
            name="review"
            value={reviews.review}
            onChange={onChangeInput}
            disabled={isLoading}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "#fff",

                "& fieldset": {
                  borderColor: "#e5e7eb",
                },

                "&:hover fieldset": {
                  borderColor: "#86efac",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#16a34a",
                  borderWidth: "1px",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#16a34a",
              },
            }}
          />

          {/* Rating */}

          <div
            className="
              mt-5
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-center
            "
          >

            <span
              className="
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Your Rating
            </span>

            <div className="flex items-center gap-2">

              <Rating
                value={Number(
                  reviews.rating || 0
                )}
                onChange={handleRatingChange}
                size="medium"
                disabled={isLoading}
              />

              {reviews.rating > 0 && (
                <span
                  className="
                    rounded-full
                    bg-yellow-50
                    px-2
                    py-1
                    text-xs
                    font-bold
                    text-yellow-600
                  "
                >
                  {reviews.rating}/5
                </span>
              )}

            </div>

          </div>

          {/* Submit */}

          <div className="mt-5">

            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              className="
                !min-h-[48px]
                !w-full
                sm:!w-auto
                !rounded-xl
                !bg-[#16a34a]
                !px-6
                !text-sm
                !font-bold
                !normal-case
                !text-white
                !shadow-none
                hover:!bg-[#15803d]
                hover:!shadow-md
                disabled:!bg-gray-300
              "
            >
              {isLoading ? (
                <CircularProgress
                  size={22}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiSend className="text-base" />
                  Submit Review
                </span>
              )}
            </Button>

          </div>

        </form>
      </div>

    </div>
  );
};

export default Review;