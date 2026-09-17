import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../App";
import {
  BsHouseDoor,
  BsHouseDoorFill,
  BsHeart,
  BsHeartFill,
  BsBag,
  BsBagFill,
  BsReceipt,
  BsReceiptCutoff,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";

// Fixed bottom tab bar — mobile only (hidden from `md` breakpoint up,
// where the regular header nav takes over).
const MobileBottomNav = () => {
  const context = useContext(MyContext);
  const location = useLocation();

  const cartCount = context?.cartData?.data?.length || 0;
  const wishlistCount = context?.myListData?.data?.length || 0;

  const isActive = (path) => location.pathname === path;

  const Badge = ({ count }) =>
    count > 0 ? (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] leading-none rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
        {count > 9 ? "9+" : count}
      </span>
    ) : null;

  const tabs = [
    {
      key: "home",
      label: "Home",
      to: "/",
      active: isActive("/"),
      icon: isActive("/") ? (
        <BsHouseDoorFill className="text-[20px]" />
      ) : (
        <BsHouseDoor className="text-[20px]" />
      ),
    },
    {
      key: "wishlist",
      label: "Wishlist",
      to: "/my-list",
      active: isActive("/my-list"),
      badge: wishlistCount,
      icon: isActive("/my-list") ? (
        <BsHeartFill className="text-[19px]" />
      ) : (
        <BsHeart className="text-[19px]" />
      ),
    },
  ];

  const accountTabs = [
    {
      key: "orders",
      label: "Orders",
      to: "/my-orders",
      active: isActive("/my-orders"),
      icon: isActive("/my-orders") ? (
        <BsReceiptCutoff className="text-[19px]" />
      ) : (
        <BsReceipt className="text-[19px]" />
      ),
    },
    {
      key: "account",
      label: "Account",
      to: "/my-account",
      active: isActive("/my-account"),
      icon: isActive("/my-account") ? (
        <BsPersonFill className="text-[20px]" />
      ) : (
        <BsPerson className="text-[20px]" />
      ),
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 items-stretch">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            to={tab.to}
            className={`flex flex-col items-center justify-center gap-1 py-2 relative ${
              tab.active ? "text-slate-900" : "text-slate-400"
            }`}
          >
            <span className="relative">
              {tab.icon}
              <Badge count={tab.badge} />
            </span>
            <span className="text-[10.5px] font-medium">{tab.label}</span>
          </Link>
        ))}

        {/* CART — opens the existing slide-over cart panel instead of navigating */}
        <button
          type="button"
          onClick={context.toggleCartPanel(true)}
          className="flex flex-col items-center justify-center gap-1 py-2 relative text-slate-400"
        >
          <span className="relative -mt-3 w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
            <BsBag className="text-[19px]" />
            <Badge count={cartCount} />
          </span>
          <span className="text-[10.5px] font-medium text-slate-900">
            Cart
          </span>
        </button>

        {accountTabs.map((tab) => (
          <Link
            key={tab.key}
            to={tab.to}
            className={`flex flex-col items-center justify-center gap-1 py-2 relative ${
              tab.active ? "text-slate-900" : "text-slate-400"
            }`}
          >
            <span className="relative">{tab.icon}</span>
            <span className="text-[10.5px] font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;