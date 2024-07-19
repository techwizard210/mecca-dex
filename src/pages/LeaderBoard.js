import React, { useState, useEffect } from "react";

import {
  getTopTraders,
  shortenAddress,
  organizeNumber,
} from "../utils/DataProvider";

function LeaderBoard() {
  const [topTraders, setTopTraders] = useState([]);
  useEffect(() => {
    async function getTraders() {
      const traders = await getTopTraders();
      setTopTraders(traders);
    }

    getTraders();
  }, []);

  return (
    <div className="flex justify-center text-white/50 mt-5">
      <div className="w-[500px] border border-[#242424]">
        <div className="flex-1 w-full min-w-[300px]">
          <div className="flex flex-col text-[#84897a] text-[16px] w-[900px] overflow-hidden md:w-full lg:w-full">
            <div className="flex justify-between border-b border-[#242424] py-3">
              <span className="flex-1 text-center">Trader</span>
              <span className="flex-1 text-center">Profit</span>
            </div>
            {topTraders.map((trader, index) => {
              return (
                <div
                  className="flex justify-between border-b border-[#242424] py-3"
                  key={index}
                >
                  <span className="flex-1 text-center">
                    {shortenAddress(trader.walletAddress)}
                  </span>
                  <span className="flex-1 text-center">
                    $ {organizeNumber(trader.profit)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
