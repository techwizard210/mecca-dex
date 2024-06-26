import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-[#192531] h-[1000px]">
      <div className="flex justify-between bg-[#121b23] text-[#b3c2c8] px-5 items-center h-[60px]">
        <Link to="/" className="no-underline text-lg">
          Mecca
        </Link>
        <div className="flex">
          <button className="h-[60px] px-[15px] hover:bg-[#192531] active:text-[#a6f284]">
            Trade
          </button>
          <button className="h-[60px] px-[15px] hover:bg-[#192531] active:text-[#a6f284]">
            Perps
          </button>
        </div>
        <button className="box-border px-[15px] py-[5px] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text border-solid border-[1.5px] hover:border-[#c7e574] border-transparent rounded-full">
          Connect Wallet
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
