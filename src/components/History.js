import React from "react";
import { useState, useEffect, useRef } from "react";
import { getTradeHistory } from "../api/api";

function History() {
  const [category, setCategory] = useState(1);
  const [tradeHistory, setTradeHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const history = await getTradeHistory();
      setTradeHistory(history);
    }

    getHistory();
  }, []);

  return (
    <>
      <div className="flex w-full lg:mx-auto bg-[#131313] relative">
        <div className="w-full max-w-full overflow-hidden">
          <div className="lg:flex flex-row justify-between w-full border-b border-[#242424]">
            <div className="flex justify-between px-3">
              <div className="flex space-x-6 justify-start items-center overflow-y-auto p-3 w-full">
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${category === 1 ? "text-white" : ""
                    }`}
                  onClick={() => setCategory(1)}
                >
                  Positions
                </button>
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${category === 2 ? "text-white" : ""
                    }`}
                  onClick={() => setCategory(2)}
                >
                  Trade History
                </button>
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${category === 3 ? "text-white" : ""
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
      <div className="flex-1 w-full min-w-[300px] overflow-hidden bg-[#131313] pb-20">
        {
          tradeHistory ? <div className="text-white">
            {tradeHistory}
          </div> : <div className="w-full text-xs xl:px-0 overflow-x-auto webkit-scrollbar">
            <div className="flex flex-col items-center space-y-4 rounded-lg mt-4 bg-white-5 py-[60px] justify-start dark:border-white-10 mx-5 lg:mx-0">
              <div className="text-sm dark:text-white/50 text-white/50">
                Connect your wallet to see your Trades
              </div>
              <button className="h-full rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-content transition-all duration-200">
                <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-3 px-8 text-lg font-medium leading-none">
                  <span className="text-[#e69f00]">Connect Wallet</span>
                </div>
              </button>
            </div>
          </div>
        }

      </div>
    </>
  );
}

export default History;
