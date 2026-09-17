// import React from "react";
// import { Link } from "react-router-dom";

// const BannerBox2 = (props) => {
//   return (
//     <div className="bannerBoxv2 -z-50 w-full h-[192px] rounded-md overflow-hidden group relative">
//       <img
//         src={props.image}
//         className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
//       />
//       {/* <div
//         className={`info absolute p-5 top-0 ${
//           props.info === "left" ? "left-0" : "right-0"
//         } w-[50%] h-[100%] z-50 flex items-center justify-center flex-col`}
//       >
//         <h2 className="text-[22px] font-[700]">Samsung Gear VR Camera</h2>
//         <span className="text-[25px] font-[600] text-blue-600 w-full">AED 130</span>
//         <div className="w-full">
//         <Link to="/" className="text-[16px] font-[700] hover:text-gray-600 hover:underline ">SHOP NOW</Link>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default BannerBox2;
import React from "react";
import { Link } from "react-router-dom";

const BannerBox2 = (props) => {
  return (
    <div
      className="
        bannerBoxv2
        relative
        z-0
        w-full
        overflow-hidden
        rounded-md
        group

        h-[130px]
        xs:h-[150px]
        sm:h-[170px]
        md:h-[190px]
        lg:h-[192px]
        xl:h-[230px]
      "
    >
      <img
        src={props.image}
        alt="Banner"
        className="
          block
          w-full
          h-full
          object-cover
          object-center
          transition-transform
          duration-300
          group-hover:scale-105
        "
      />

      {/* Optional Content */}
      {/*
      <div
        className={`
          absolute
          top-0
          ${
            props.info === "left"
              ? "left-0"
              : "right-0"
          }

          w-full
          sm:w-[60%]
          md:w-[50%]

          h-full
          z-10

          p-3
          sm:p-4
          md:p-5

          flex
          items-center
          justify-center
          flex-col
        `}
      >
        <h2
          className="
            text-[14px]
            sm:text-[18px]
            md:text-[22px]
            font-[700]
          "
        >
          Samsung Gear VR Camera
        </h2>

        <span
          className="
            text-[18px]
            sm:text-[22px]
            md:text-[25px]
            font-[600]
            text-blue-600
            w-full
          "
        >
          AED 130
        </span>

        <div className="w-full">
          <Link
            to="/"
            className="
              text-[12px]
              sm:text-[14px]
              md:text-[16px]
              font-[700]
              hover:text-gray-600
              hover:underline
            "
          >
            SHOP NOW
          </Link>
        </div>
      </div>
      */}
    </div>
  );
};

export default BannerBox2;