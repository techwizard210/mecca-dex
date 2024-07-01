import React from "react";
import { Outlet, Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

function Layout() {
  return (
    <div className="bg-[#131313] min-h-screen flex flex-col">
      <div className="flex justify-between bg-[#131313] text-[#b3c2c8] px-5 items-center h-[60px]">
        <Link to="/" className="no-underline text-lg">
          <img alt="logo" src={logo} className="h-[50px]" />
        </Link>
        <div className="flex">
          <button className="h-[60px] px-[15px] hover:bg-[#192531] active:text-[#a6f284]">
            Trade
          </button>
          <button className="h-[60px] px-[15px] hover:bg-[#192531] active:text-[#a6f284]">
            Perps
          </button>
        </div>
        <button className="rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-content transition-all duration-200">
          <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-2 px-5 text-lg font-medium leading-none">
            <span className="text-[#e69f00] text-[16px]">Connect Wallet</span>
          </div>
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
