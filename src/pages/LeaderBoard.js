import React from "react";

import { shortenAddress } from "../utils/DataProvider";

function LeaderBoard() {
  return (
    <div className="flex justify-center text-white/50 mt-5">
      <div className="w-[500px] border border-[#242424]">
        <div className="flex-1 w-full min-w-[300px]">
          <div className="flex flex-col text-[#84897a] text-[16px] w-[900px] overflow-hidden md:w-full lg:w-full">
            <div className="flex justify-between border-b border-[#242424] py-3">
              <span className="flex-1 text-center">Trader</span>
              <span className="flex-1 text-center">Profit</span>
            </div>
            <div className="flex justify-between border-b border-[#242424] py-3">
              <span className="flex-1 text-center">
                {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
              </span>
              <span className="flex-1 text-center">$1000</span>
            </div>
            <div className="flex justify-between border-b border-[#242424] py-3">
              <span className="flex-1 text-center">
                {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
              </span>
              <span className="flex-1 text-center">$1000</span>
            </div>
            <div className="flex justify-between border-b border-[#242424] py-3">
              <span className="flex-1 text-center">
                {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
              </span>
              <span className="flex-1 text-center">$1000</span>
            </div>
            <div className="flex justify-between border-b border-[#242424] py-3">
              <span className="flex-1 text-center">
                {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
              </span>
              <span className="flex-1 text-center">$1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
