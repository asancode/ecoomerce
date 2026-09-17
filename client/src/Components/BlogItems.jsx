// // import React from 'react'
// // import { IoIosArrowForward, IoMdTime } from 'react-icons/io'
// // import { Link } from 'react-router-dom'

// // const BlogItems = (props) => {
// //   return (
// //     <div className='blogItem group'>
// //       <div className='imgWrapper w-full rounded-md overflow-hidden cursor-pointer relative'>
// //         <img src={props.items?.images} alt={props.items?.title} className='w-full transition-all group-hover:scale-105 group-hover:rotate-1'/>
// //         <span className='flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-gray-500 rounded-md p-1 text-[11px] font-[500] gap-1'>
// //             <IoMdTime className='text-[16px]'/> {new Date(props.items?.createdAt).toLocaleDateString("en-US", {
// //               month: "short",
// //               day: "numeric",
// //               year: "numeric",
// //             })}
// //         </span>
// //       </div>
// //       <div className='info py-4'> 
// //         <h2 className='text-[16px] font-bold text-black'>
// //             <Link className='hover:text-gray-400'>{props.items?.title}</Link>
// //         </h2>
// //         <p className='text-[13px] font-[400] text-gray-400 pb-4'>{props.items?.description.slice(0, 300)}...</p>

// //         <Link className='font-[500] text-[14px] flex items-center gap-2 hover:text-gray-400'>Read More<IoIosArrowForward/></Link>
// //       </div>
// //     </div>
// //   )
// // }

// // export default BlogItems
// import React from "react";
// import { IoIosArrowForward, IoMdTime } from "react-icons/io";
// import { Link } from "react-router-dom";

// const BlogItems = (props) => {
//   // ✅ FIX: both <Link> elements below had no "to" prop at all — react-
//   // router's <Link> requires it internally (it reads to.pathname etc.),
//   // so this either crashed or rendered a dead link with no href. Build
//   // one link target and reuse it for both the title and "Read More".
//   const blogLink = `/blog/${props.items?.slug || props.items?._id || ""}`;

//   return (
//     <div className="blogItem group">
//       <div className="imgWrapper w-full rounded-md overflow-hidden cursor-pointer relative">
//         <img
//           src={props.items?.images}
//           alt={props.items?.title || "Blog post"}
//           className="w-full h-[180px] sm:h-[220px] object-cover transition-all group-hover:scale-105 group-hover:rotate-1"
//         />
//         <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-gray-500 rounded-md p-1 text-[11px] font-[500] gap-1">
//           <IoMdTime className="text-[16px]" />{" "}
//           {props.items?.createdAt
//             ? new Date(props.items.createdAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               })
//             : "N/A"}
//         </span>
//       </div>
//       <div className="info py-4">
//         <h2 className="text-[15px] sm:text-[16px] font-bold text-black line-clamp-2">
//           <Link to={blogLink} className="hover:text-gray-400">
//             {props.items?.title}
//           </Link>
//         </h2>
//         <p className="text-[13px] font-[400] text-gray-400 pb-4">
//           {/* ✅ FIX: "?." only guarded description, but .slice() was still
//               called unconditionally after it — a post with no
//               description threw "Cannot read properties of undefined
//               (reading 'slice')" and crashed the whole blog list. */}
//           {props.items?.description
//             ? `${props.items.description.slice(0, 300)}...`
//             : ""}
//         </p>

//         <Link
//           to={blogLink}
//           className="font-[500] text-[14px] flex items-center gap-2 hover:text-gray-400"
//         >
//           Read More
//           <IoIosArrowForward />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogItems;
import React from "react";
import { IoIosArrowForward, IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";

const BlogItems = ({ items }) => {
  const blogLink = `/blog/${items?.slug || items?._id || ""}`;

  const formattedDate = items?.createdAt
    ? new Date(items.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const description = items?.description
    ? items.description.length > 150
      ? `${items.description.slice(0, 150)}...`
      : items.description
    : "Discover useful information, tips and updates from our latest blog.";

  return (
    <article
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        border border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#E3A11F]/40
        hover:shadow-[0_15px_40px_rgba(36,28,41,0.12)]
      "
    >
      {/* ================= IMAGE ================= */}
      <Link
        to={blogLink}
        className="block relative overflow-hidden"
        aria-label={items?.title || "Read blog"}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F8F5FB]">
          <img
            src={items?.images || "/placeholder-blog.jpg"}
            alt={items?.title || "Blog post"}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />

          {/* Dark image overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#241C29]/45
              via-transparent
              to-transparent
              opacity-70
              transition-opacity
              duration-300
              group-hover:opacity-90
            "
          />

          {/* Date Badge */}
          <div
            className="
              absolute
              bottom-3
              right-3
              flex
              items-center
              gap-1.5
              rounded-full
              bg-white/95
              px-3
              py-1.5
              text-[11px]
              font-semibold
              text-[#241C29]
              shadow-md
              backdrop-blur-sm
              sm:text-[12px]
            "
          >
            <IoMdTime className="text-[15px] text-[#E3A11F]" />
            <span>{formattedDate}</span>
          </div>

          {/* Read overlay */}
          <div
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-[#E3A11F]
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-[#241C29]
              opacity-0
              translate-y-2
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
              sm:text-[11px]
            "
          >
            Read Article
          </div>
        </div>
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h2
          className="
            mb-2
            line-clamp-2
            min-h-[42px]
            text-[16px]
            font-bold
            leading-[1.4]
            text-[#241C29]
            transition-colors
            duration-300
            group-hover:text-[#7A4988]
            sm:text-[18px]
          "
        >
          <Link to={blogLink}>
            {items?.title || "Untitled Blog Post"}
          </Link>
        </h2>

        {/* Description */}
        <p
          className="
            mb-4
            line-clamp-3
            min-h-[57px]
            text-[13px]
            font-normal
            leading-6
            text-gray-500
            sm:text-[14px]
          "
        >
          {description}
        </p>

        {/* Bottom section */}
        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-gray-100
            pt-4
          "
        >
          {/* Category / Label */}
          {/* <span
            className="
              rounded-full
              bg-[#F8F5FB]
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-wide
              text-[#7A4988]
              sm:text-[11px]
            "
          >
            Blog
          </span> */}

          {/* Read More */}
          <Link
            to={blogLink}
            className="
              group/read
              inline-flex
              items-center
              gap-1.5
              text-[13px]
              font-bold
              text-[#3D2350]
              transition-all
              duration-300
              hover:text-[#E3A11F]
              sm:text-[14px]
            "
          >
            <span>Read More</span>

            <IoIosArrowForward
              className="
                text-[17px]
                transition-transform
                duration-300
                group-hover/read:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogItems;