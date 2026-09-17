import React from 'react'

const CategoryLoading = () => {
  return (
    <>
     <div className="flex items-center py-5 gap-5 animate-pulse">
            <div className="col w-[100%] h-[250px]">
              <div
                role="status"
                class="flex items-center justify-center h-48 max-w-sm bg-neutral-400 rounded-lg animate-pulse mb-3 sm:mb-6"
              >
                <svg
                  class="w-11 h-11 text-fg-disabled"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <div class="h-2 bg-neutral-400 rounded-full max-w-[480px] mb-2"></div>
              <div class="h-2.5 bg-neutral-400 rounded-full w-48 mb-2"></div>
              <div class="h-2 bg-neutral-400 rounded-full mb-2"></div>
            </div>
            <div className="col w-[100%] h-[250px]">
              <div
                role="status"
                class="flex items-center justify-center h-48 max-w-sm bg-neutral-400 rounded-lg animate-pulse mb-3 sm:mb-6"
              >
                <svg
                  class="w-11 h-11 text-fg-disabled"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <div class="h-2 bg-neutral-400 rounded-full max-w-[480px] mb-2"></div>
              <div class="h-2.5 bg-neutral-400 rounded-full w-48 mb-2"></div>
              <div class="h-2 bg-neutral-400 rounded-full mb-2"></div>
            </div>
            <div className="col w-[100%] h-[250px]">
              <div
                role="status"
                class="flex items-center justify-center h-48 max-w-sm bg-neutral-400 rounded-lg animate-pulse mb-3 sm:mb-6"
              >
                <svg
                  class="w-11 h-11 text-fg-disabled"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <div class="h-2 bg-neutral-400 rounded-full max-w-[480px] mb-2"></div>
              <div class="h-2.5 bg-neutral-400 rounded-full w-48 mb-2"></div>
              <div class="h-2 bg-neutral-400 rounded-full mb-2"></div>
            </div>
            <div className="col w-[100%] h-[250px]">
              <div
                role="status"
                class="flex items-center justify-center h-48 max-w-sm bg-neutral-400 rounded-lg animate-pulse mb-3 sm:mb-6"
              >
                <svg
                  class="w-11 h-11 text-fg-disabled"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <div class="h-2 bg-neutral-400 rounded-full max-w-[480px] mb-2"></div>
              <div class="h-2.5 bg-neutral-400 rounded-full w-48 mb-2"></div>
              <div class="h-2 bg-neutral-400 rounded-full mb-2"></div>
            </div>
          </div>
          </>
  )
}

export default CategoryLoading
// import React from "react";
// import { MdCategory } from "react-icons/md";

// const CategoryLoading = ({ count = 4 }) => {
//   return (
//     <section className="w-full py-5 sm:py-8">
//       <div className="w-full">

//         {/* =========================================
//             LOADING HEADER
//         ========================================== */}
//         <div className="flex items-center justify-between mb-5 sm:mb-7">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-200 animate-pulse flex items-center justify-center">
//               <MdCategory className="text-slate-300 text-xl sm:text-2xl" />
//             </div>

//             <div>
//               <div className="h-4 sm:h-5 w-32 sm:w-40 bg-slate-200 rounded-md animate-pulse" />

//               <div className="h-2.5 sm:h-3 w-24 sm:w-32 bg-slate-100 rounded-full mt-2 animate-pulse" />
//             </div>
//           </div>

//           <div className="hidden sm:block">
//             <div className="h-8 w-20 bg-slate-100 rounded-lg animate-pulse" />
//           </div>
//         </div>

//         {/* =========================================
//             CATEGORY SKELETON GRID
//         ========================================== */}
//         <div
//           className="
//             grid
//             grid-cols-1
//             xs:grid-cols-2
//             sm:grid-cols-2
//             md:grid-cols-3
//             lg:grid-cols-4
//             xl:grid-cols-4
//             gap-4
//             sm:gap-5
//             lg:gap-6
//           "
//         >
//           {Array.from({ length: count }).map((_, index) => (
//             <div
//               key={index}
//               className="
//                 bg-white
//                 rounded-2xl
//                 border
//                 border-slate-100
//                 overflow-hidden
//                 shadow-sm
//                 animate-pulse
//               "
//             >
//               {/* IMAGE */}
//               <div
//                 className="
//                   relative
//                   w-full
//                   h-[180px]
//                   xs:h-[160px]
//                   sm:h-[180px]
//                   md:h-[190px]
//                   lg:h-[200px]
//                   bg-slate-100
//                 "
//               >
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div
//                     className="
//                       w-12
//                       h-12
//                       sm:w-14
//                       sm:h-14
//                       rounded-2xl
//                       bg-slate-200
//                       flex
//                       items-center
//                       justify-center
//                     "
//                   >
//                     <svg
//                       className="w-7 h-7 sm:w-8 sm:h-8 text-slate-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.5"
//                         d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
//                       />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* IMAGE BADGE */}
//                 <div className="absolute top-3 left-3">
//                   <div className="w-14 h-5 bg-slate-200 rounded-full" />
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-4 sm:p-5">

//                 {/* TITLE */}
//                 <div className="h-4 bg-slate-200 rounded-md w-[70%] mb-3" />

//                 {/* DESCRIPTION */}
//                 <div className="space-y-2">
//                   <div className="h-2.5 bg-slate-100 rounded-full w-full" />
//                   <div className="h-2.5 bg-slate-100 rounded-full w-[80%]" />
//                 </div>

//                 {/* FOOTER */}
//                 <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
//                   <div className="h-3 bg-slate-100 rounded-full w-16" />

//                   <div className="h-8 w-8 bg-slate-100 rounded-lg" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryLoading;