import React from "react";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { getTradeHistory, quitTrade } from "../app/historySlice";
import { organizeNumber, convertUnixTime } from "../utils/DataProvider";

function History(props) {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(1);
  const tradeHistory = useSelector((state) => state.history.tradeHistory);
  let tab;

  if (category === 1) {
    tab = (
      <div className="flex flex-col text-[#84897a] text-[13px] w-[900px] overflow-hidden md:w-full lg:w-full">
        <div className="flex justify-between border-b border-[#242424] py-3">
          <span className="flex-1 text-center">Trade Type</span>
          <span className="flex-1 text-center">Entry Price</span>
          <span className="flex-1 text-center">Leverage</span>
          <span className="flex-1 text-center">Size</span>
          <span className="flex-1 text-center">Collateral</span>
          <span className="flex-1 text-center">Liq.Price</span>
          <span className="flex-1 text-center">Start Date</span>
          <span className="flex-1 text-center">Action</span>
        </div>
        {tradeHistory.filter((item) => item.profit === undefined).length ===
        0 ? (
          <div className="mt-5 flex justify-center px-8 py-3">
            There are no open positions
          </div>
        ) : (
          tradeHistory
            .filter((item) => item.profit === undefined)
            .map((history, index) => {
              return (
                <div
                  className="flex justify-between border-b border-[#242424] py-3"
                  key={index}
                >
                  <span className={`flex-1 text-center ${history.type}`}>
                    {history.type} trade
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice}
                  </span>
                  <span className="flex-1 text-center">
                    {history.leverage}x
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {(history.entryPrice * history.amount * history.leverage) /
                      2}
                  </span>
                  <span className="flex-1 text-center">
                    {convertUnixTime(history.startDate)}
                  </span>
                  <span className="flex-1 text-center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => exitTrade(history._id)}
                    >
                      Close
                    </Button>
                  </span>
                </div>
              );
            })
        )}
      </div>
    );
  } else if (category === 2) {
    tab = (
      <div className="flex flex-col text-[#84897a] text-[13px] w-[900px] overflow-hidden md:w-full lg:w-full">
        <div className="flex justify-between border-b border-[#242424] py-3">
          <span className="flex-1 text-center">Trade Type</span>
          <span className="flex-1 text-center">Entry Price</span>
          <span className="flex-1 text-center">End Price</span>
          <span className="flex-1 text-center">Amount</span>
          <span className="flex-1 text-center">Leverage</span>
          <span className="flex-1 text-center">Entry Size</span>
          <span className="flex-1 text-center">End Size</span>
          <span className="flex-1 text-center">Execution Fee</span>
          <span className="flex-1 text-center">Profit</span>
          <span className="flex-1 text-center">Collateral</span>
          <span className="flex-1 text-center">Liq.Price</span>
          <span className="flex-1 text-center">Start Date</span>
          <span className="flex-1 text-center">End Date</span>
        </div>
        {tradeHistory.filter(
          (item) => item.profit !== undefined && item.isExpire === undefined
        ).length === 0 ? (
          <div className="mt-5 flex justify-center px-8 py-3">
            There are no histories
          </div>
        ) : (
          tradeHistory
            .filter(
              (item) => item.profit !== undefined && item.isExpire === undefined
            )
            .map((history, index) => {
              return (
                <div
                  className="flex justify-between border-b border-[#242424] py-3"
                  key={index}
                >
                  <span className={`flex-1 text-center ${history.type}`}>
                    {history.type} trade
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice}
                  </span>
                  <span className="flex-1 text-center">{history.endPrice}</span>
                  <span className="flex-1 text-center">{history.amount}</span>
                  <span className="flex-1 text-center">
                    {history.leverage}x
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {history.endPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {organizeNumber(history.executionFee)}
                  </span>
                  <span className="flex-1 text-center">
                    {organizeNumber(history.profit)}
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {(history.entryPrice * history.amount * history.leverage) /
                      2}
                  </span>
                  <span className="flex-1 text-center">
                    {convertUnixTime(history.startDate)}
                  </span>
                  <span className="flex-1 text-center">
                    {convertUnixTime(history.endDate)}
                  </span>
                </div>
              );
            })
        )}
      </div>
    );
  } else {
    tab = (
      <div className="flex flex-col text-[#84897a] text-[13px] w-[900px] overflow-hidden md:w-full lg:w-full">
        <div className="flex justify-between border-b border-[#242424] py-3">
          <span className="flex-1 text-center">Trade Type</span>
          <span className="flex-1 text-center">Entry Price</span>
          <span className="flex-1 text-center">End Price</span>
          <span className="flex-1 text-center">Amount</span>
          <span className="flex-1 text-center">Leverage</span>
          <span className="flex-1 text-center">Entry Size</span>
          <span className="flex-1 text-center">End Size</span>
          <span className="flex-1 text-center">Execution Fee</span>
          <span className="flex-1 text-center">Profit</span>
          <span className="flex-1 text-center">Collateral</span>
          <span className="flex-1 text-center">Liq.Price</span>
          <span className="flex-1 text-center">Start Date</span>
          <span className="flex-1 text-center">End Date</span>
        </div>
        {tradeHistory.filter(
          (item) => item.profit !== undefined && item.isExpire === true
        ).length === 0 ? (
          <div className="mt-5 flex justify-center px-8 py-3">
            There are no expired positions
          </div>
        ) : (
          tradeHistory
            .filter(
              (item) => item.profit !== undefined && item.isExpire === true
            )
            .map((history, index) => {
              return (
                <div
                  className="flex justify-between border-b border-[#242424] py-3"
                  key={index}
                >
                  <span className={`flex-1 text-center ${history.type}`}>
                    {history.type} trade
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice}
                  </span>
                  <span className="flex-1 text-center">{history.endPrice}</span>
                  <span className="flex-1 text-center">{history.amount}</span>
                  <span className="flex-1 text-center">
                    {history.leverage}x
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {history.endPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {organizeNumber(history.executionFee)}
                  </span>
                  <span className="flex-1 text-center">
                    {organizeNumber(history.profit)}
                  </span>
                  <span className="flex-1 text-center">
                    {history.entryPrice * history.amount * history.leverage}
                  </span>
                  <span className="flex-1 text-center">
                    {(history.entryPrice * history.amount * history.leverage) /
                      2}
                  </span>
                  <span className="flex-1 text-center">
                    {convertUnixTime(history.startDate)}
                  </span>
                  <span className="flex-1 text-center">
                    {convertUnixTime(history.endDate)}
                  </span>
                </div>
              );
            })
        )}
      </div>
    );
  }

  let connectWallet = (
    <div className="w-full text-xs xl:px-0 overflow-x-auto webkit-scrollbar">
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
  );

  useEffect(() => {
    dispatch(getTradeHistory());
  }, []);

  function exitTrade(tradeId) {
    const param = {
      tradeId: tradeId,
      endPrice: props.ethPrice,
    };
    dispatch(quitTrade(param));
  }

  return (
    <>
      <div className="flex w-full lg:mx-auto bg-[#131313] relative">
        <div className="w-full max-w-full overflow-hidden">
          <div className="lg:flex flex-row justify-between w-full border-b border-[#242424]">
            <div className="flex justify-between px-3">
              <div className="flex space-x-6 justify-start items-center overflow-y-auto p-3 w-full">
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${
                    category === 1 ? "text-white" : ""
                  }`}
                  onClick={() => setCategory(1)}
                >
                  Open Positions
                </button>
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${
                    category === 2 ? "text-white" : ""
                  }`}
                  onClick={() => setCategory(2)}
                >
                  Ended Positions
                </button>
                <button
                  className={`flex items-center font-semibold text-xs whitespace-nowrap text-[#454d53] hover:text-white transition-all duration-150 ${
                    category === 3 ? "text-white" : ""
                  }`}
                  onClick={() => setCategory(3)}
                >
                  Expired Positions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full min-w-[300px] overflow-x-scroll bg-[#131313] pb-20">
        {tab}
      </div>
    </>
  );
}

export default History;
