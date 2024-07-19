import React, { useEffect, useState, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/images/logo.png";
import { organizeNumber, shortenAddress } from "../utils/DataProvider";
import { Toaster } from "react-hot-toast";
import { connectWallet, disconnectWallet } from "../app/historySlice";

function Layout() {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.history.walletAddress);
  const userBalance = useSelector((state) => state.history.userBalance);
  const [selectedNav, setSelectedNav] = useState("perps");
  const [accountModal, setAccountModal] = useState(false);
  const accountModalRef = useRef();

  function handleNav(param) {
    setSelectedNav(param);
  }

  function disconnect() {
    setAccountModal(false);
    dispatch(disconnectWallet());
  }

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (
        accountModalRef.current &&
        !accountModalRef.current.contains(event.target)
      ) {
        setAccountModal(false);
      }
    });
    return () => {};
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen flex flex-col">
      <Toaster
        position="bottom-right"
        // reverseOrder={false}
        // gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            padding: "16px 25px",
          },
        }}
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 40,
          right: 30,
        }}
      />
      <div
        className={`text-[#84897a] absolute top-[50px] right-[10px] z-40 p-[40px] pb-[30px] bg-[#1b1b1b] w-[250px] flex flex-col gap-2 rounded transition-all duration-200 ${
          accountModal === true ? "block" : "hidden"
        }`}
        ref={accountModalRef}
      >
        <h5 className="text-[16px]">Balance</h5>
        <h4 className="border-b border-[#242424] text-center pb-3 text-white">
          $ {organizeNumber(userBalance)}
        </h4>
        <h3>Initial balance</h3>
        <h4 className="text-center">$ {organizeNumber(1000000)}</h4>
        <button
          className="rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-100 transition-all duration-200 mt-3"
          onClick={disconnect}
        >
          <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-2 px-5 text-lg font-medium leading-none">
            <span className="text-[#e69f00] text-[16px]">Disconnect</span>
          </div>
        </button>
      </div>
      <div className="flex justify-between bg-[#131313] text-[#b3c2c8] px-5 items-center h-[60px]">
        <Link to="/" className="no-underline text-lg">
          <img alt="logo" src={logo} className="h-[50px]" />
        </Link>
        <div className="flex">
          <Link to="/perps" onClick={() => handleNav("perps")}>
            <button
              className={`h-[60px] px-[15px] hover:bg-[#192531] transition-all duration-200 ${
                selectedNav === "perps" ? "bg-[#192531]" : ""
              }`}
            >
              Perps
            </button>
          </Link>
          <Link to="/leaderboard" onClick={() => handleNav("leaderboard")}>
            <button
              className={`h-[60px] px-[15px] hover:bg-[#192531] transition-all duration-200 ${
                selectedNav === "leaderboard" ? "bg-[#192531]" : ""
              }`}
            >
              Leaderboard
            </button>
          </Link>
          {/* <Link to="/pool" onClick={() => handleNav("pool")}>
            <button
              className={`h-[60px] px-[15px] hover:bg-[#192531] transition-all duration-200 ${
                selectedNav === "pool" ? "bg-[#192531]" : ""
              }`}
            >
              Pool History
            </button>
          </Link> */}
          <Link to="/rule" onClick={() => handleNav("rule")}>
            <button
              className={`h-[60px] px-[15px] hover:bg-[#192531] transition-all duration-200 ${
                selectedNav === "rule" ? "bg-[#192531]" : ""
              }`}
            >
              Rules
            </button>
          </Link>
        </div>
        {walletAddress !== undefined ? (
          <div>
            <button
              className="rounded-xl bg-[#E69F00]/10 hover:bg-[#E69F00]/25 text-white group w-content transition-all duration-200"
              onClick={() => setAccountModal(true)}
            >
              <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-2 px-5 text-lg font-medium leading-none">
                <span className="text-[#e69f00] text-[16px]">
                  {shortenAddress(walletAddress)}
                </span>
              </div>
            </button>
          </div>
        ) : (
          <button
            className="rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-content transition-all duration-200"
            onClick={() => dispatch(connectWallet())}
          >
            <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-2 px-5 text-lg font-medium leading-none">
              <span className="text-[#e69f00] text-[16px]">Connect Wallet</span>
            </div>
          </button>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
