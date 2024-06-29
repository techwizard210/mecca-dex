import React from "react";
import { useState, useEffect, useRef } from "react";

function History() {
  const [category, setCategory] = useState(1);
  return (
    <>
      <div className="flex w-full lg:mx-auto bg-[#16202B] relative">
        <div className="w-full max-w-full overflow-hidden">
          <div className="lg:flex flex-row justify-between w-full border-b border-[#243c5a]">
            <div className="flex justify-between px-3">
              <div className="flex space-x-6 justify-start items-center overflow-y-auto p-3 w-full">
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${
                    category === 1 ? "text-white" : ""
                  }`}
                  onClick={() => setCategory(1)}
                >
                  Positions
                </button>
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${
                    category === 2 ? "text-white" : ""
                  }`}
                  onClick={() => setCategory(2)}
                >
                  Trade History
                </button>
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${
                    category === 3 ? "text-white" : ""
                  }`}
                  onClick={() => setCategory(3)}
                >
                  Expired Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full min-w-[300px] overflow-hidden bg-[#16202B] pb-20">
        <div className="w-full text-xs xl:px-0 overflow-x-auto webkit-scrollbar">
          <div className="flex flex-col items-center space-y-2 rounded-lg mt-4 bg-white-5 py-[60px] justify-start dark:border-white-10 mx-5 lg:mx-0">
            <div className="text-sm dark:text-white/50">
              Connect your wallet to see your Trades
            </div>
            <div className="!bg-transparent css-g53se3">
              <button className="box-border px-[15px] py-[5px] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text border-solid border-[1.5px] hover:border-[#c7e574] border-transparent rounded-full transition-all duration-200 font-bold text-sm">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
