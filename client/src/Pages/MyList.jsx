// import { Button, Rating } from "@mui/material";
// import { BsFillBagCheckFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import MyListItem from "./MyListItem";
// import AccountSidebar from "../Components/AccountSidebar";
// import { useContext } from "react";
// import { MyContext } from "../App";
// // import CartItems from "./CartItems";
// const MyList = () => {
//   const context = useContext(MyContext);
//   return (
//     <section className="section py-10 w-full bg-gray-100 ">
//       {/* <section className="py-10 w-full"> */}
//       <div className="container flex gap-5">
//         <div className="col1 w-[20%]">
//           <AccountSidebar />
//         </div>
//         <div className="container w-[80%] max-w-[70%] flex gap-4">
//           <div className="leftPart w-[70%]  ">
//             <div className="shadow-md rounded-md bg-gray-50">
//               <div className="py-2 px-3 border-b border-gray-300">
//                 <h2 className="text-[18px] font-semibold">My List</h2>
//                 <p className="mt-0 mb-3">
//                   There are{" "}
//                   <span className="font-bold text-gray-800">
//                     {context?.myListData?.data?.length}
//                   </span>{" "}
//                   products in your my list
//                 </p>
//               </div>
//               {context?.myListData?.data?.length !== 0?
//                 context?.myListData?.data?.map((item) => {
//                   return <MyListItem  data={item} />;
//                 })
//               :
//               <>
//              <div className="flex items-center py-8 px-3 justify-center flex-col gap-2">
//             <img src="/mylist.png" className="w-[120px]"/>
//             <h4>Your My List is Currently Empty</h4>
//             <Link to={"/"}>
//             <Button variant="contained" className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800  border-none !h-[25px] hover:!border-none  !capitalize !transition-colors !duration-200" onClick={context.toggleCartPanel(false)}>Continue Shopping</Button>
//             </Link>
//           </div>
//             </>}

//               {/* <MyListItem />
//               <MyListItem />
//               <MyListItem />
//               <MyListItem />
//               <MyListItem /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     // </section>
//   );
// };

// export default MyList;
import { Button, Rating } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import MyListItem from "./MyListItem";
import AccountSidebar from "../Components/AccountSidebar";
import { useContext } from "react";
import { MyContext } from "../App";
import PageTitle from "../Components/PageTitle";

const MyList = () => {
  const context = useContext(MyContext);
  return (
     <><PageTitle  title="My List"
        description="Shop the latest products at the best prices. Discover quality products and fast delivery." />
    <section className="section py-6 sm:py-10 w-full bg-gray-100">
      {/* ✅ RESPONSIVE FIX: fixed w-[20%]/w-[80%] plus a container capped at
          max-w-[70%] plus a child at w-[70%] — three competing fixed
          widths that squeeze everything into a sliver on mobile. Now
          stacks vertically until lg. */}
      <div className="container flex flex-col lg:flex-row gap-5 px-3 sm:px-4 lg:px-0">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>
        <div className="w-full lg:w-[80%] flex gap-4">
          <div className="leftPart w-full lg:w-[70%]">
            <div className="shadow-md rounded-md bg-gray-50">
              <div className="py-2 px-3 border-b border-gray-300">
                <h2 className="text-[18px] font-semibold">My List</h2>
                <p className="mt-0 mb-3">
                  There are{" "}
                  <span className="font-bold text-gray-800">
                    {context?.myListData?.data?.length}
                  </span>{" "}
                  products in your my list
                </p>
              </div>
              {context?.myListData?.data?.length !== 0 ? (
                context?.myListData?.data?.map((item) => {
                  // ✅ FIX: missing "key" prop on a mapped list — React
                  // needs a stable key here to correctly track/re-render
                  // items when the list changes (e.g. after removing one).
                  return <MyListItem key={item?._id} data={item} />;
                })
              ) : (
                <div className="flex items-center py-8 px-3 justify-center flex-col gap-2">
                  <img src="/mylist.png" className="w-[120px]" />
                  <h4 className="text-center">
                    Your My List is Currently Empty
                  </h4>
                  <Link to={"/"}>
                    <Button
                      variant="contained"
                      className="!mt-3 !bg-gray-700 !text-white !font-[500] !text-[16px] !p-5 hover:!bg-gray-800 border-none !h-[25px] hover:!border-none !capitalize !transition-colors !duration-200"
                      // ✅ FIX: this was
                      // onClick={context.toggleCartPanel(false)} — calling
                      // the function immediately during render (firing the
                      // panel toggle on every render) instead of passing a
                      // click handler. Wrapped in an arrow function.
                      onClick={() => context.toggleCartPanel(false)}
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default MyList;