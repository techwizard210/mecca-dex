import React from "react";
import { useState, useEffect } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import eth from "../assets/images/eth.png";

function Perps() {
  const [tradeType, setTradeType] = useState("long");

  const handleTrade = (type) => () => {
    setTradeType(type);
  };

  const valuetext = (value) => {
    return `${value}x`;
  }

  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];

  return (
    <div className="flex">
      <div className="w-[calc(100vw-360px)]"></div>
      <div className="w-[360px] bg-[#1c2936] flex flex-col text-white text-[25px]">
        <div className="bg-[#304256] px-4 py-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center rounded-full bg-[#19232D]">
              <button
                type="button"
                className={`w-[70px] h-7 lg:h-auto lg:w-20 flex flex-row items-center justify-center font-semibold space-x-2 text-white/50 fill-current border-2 border-transparent rounded-full px-2 py-1 lg:m-1 bg-perps-green transition-all duration-200 ${tradeType === "long" ? "long-trade" : ""
                  }`}
                onClick={handleTrade("long")}
              >
                <span className="text-xs lg:text-sm leading-none">Long</span>
                <TrendingUpIcon
                  className={`${tradeType === "long" ? "long-trade" : ""}`}
                />
              </button>
              <button
                type="button"
                className={`w-[70px] h-7 lg:h-auto lg:w-20 flex flex-row items-center justify-center font-semibold space-x-2 text-white/50 fill-current border-2 border-transparent rounded-full px-2 py-1 lg:m-1 bg-perps-green transition-all duration-200 ${tradeType === "short" ? "short-trade" : ""
                  }`}
                onClick={handleTrade("short")}
              >
                <span className="text-xs lg:text-sm leading-none">Short</span>
                <TrendingDownIcon
                  className={`${tradeType === "short" ? "short-trade" : ""}`}
                />
              </button>
            </div>
            <div className="flex items-center">
              <IconButton aria-label="add an alarm">
                <RefreshIcon />
              </IconButton>
              <IconButton aria-label="add an alarm">
                <TuneIcon />
              </IconButton>
            </div>
          </div>
          <div>
            <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
              You're paying
            </div>
            <div className="bg-[#19232D] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
              <div className="flex flex-col dark:text-white h-full justify-center">
                <div className="flex items-center">
                  <div className="p-1 pr-2 lg:p-2 rounded-lg flex items-center bg-[#304256]">
                    <img src={eth} alt="eth icon" className="w-[50px]" />
                    <div className="font-semibold text-xs lg:text-base">
                      ETH
                    </div>
                  </div>
                  <div className="">
                    <input
                      inputMode="decimal"
                      data-lpignore="true"
                      placeholder="0.00"
                      className="h-full bg-transparent text-right font-semibold dark:placeholder:text-white/25 outline-none text-lg"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
              Size of {tradeType === "long" ? "Long" : "Short"}
            </div>
            <div className="bg-[#19232D] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
              <div className="flex flex-col dark:text-white h-full justify-center">
                <div className="flex items-center">
                  <div className="p-1 pr-2 lg:p-2 rounded-lg flex items-center bg-[#304256]">
                    <img src={eth} alt="eth icon" className="w-[50px]" />
                    <div className="font-semibold text-xs lg:text-base">
                      ETH
                    </div>
                  </div>
                  <div className="">
                    <input
                      inputMode="decimal"
                      data-lpignore="true"
                      placeholder="0.00"
                      className="h-full bg-transparent text-right font-semibold dark:placeholder:text-white/25 outline-none text-lg"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
              Leverage
            </div>
            <div className="bg-[#19232D] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
              <div className="flex dark:text-white h-full">
                <IconButton aria-label="add an alarm">
                  <RemoveIcon />
                </IconButton>
                <input
                  inputMode="decimal"
                  placeholder="0.00"
                  className="h-full bg-transparent font-semibold outline-none text-lg"
                  type="text"
                />
                <IconButton aria-label="add an alarm">
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div>
            <Box sx={{ width: 300 }}>
              <Slider
                aria-label="Restricted values"
                defaultValue={1}
                // getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Box>
          </div>
          <div>
            <div class="border-t border-t-black/10 lg:pt-4 px-2 lg:px-4">
              <div class="hidden lg:block">
                <div class="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span class="text-xs text-white/50 ">Collateral</span>
                  <div>
                    <div translate="no" class="text-xs text-white/75 mt-0.5">
                      <span>13,717.49 USD</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span class="text-xs text-white/50 leading-none">Size in USD</span>
                  <div translate="no" class="text-xs text-white/75 mt-0.5">
                    <span translate="no" class="text-xs h-[14px] text-white/75">
                      <span>
                        17,809.59 USD</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full !bg-transparent css-g53se3">
            <button className="h-full rounded-xl text-white group bg-none bg-[#141519] hover:bg-gradient-to-r from-[rgba(199,242,132,1))] to-[rgba(0,190,240,1)] border border-transparent hover:border hover:border-[#c7f284] w-full transition-all duration-200">
              <div className="rounded-xl bg-v2-text-gradient bg-clip-text text-transparent group-disabled:bg-none group-disabled:text-opacity-25 group-disabled:text-[#CFF3FF] py-5 text-lg font-medium leading-none"><span>Connect Wallet</span></div>
            </button>
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  );
}

export default Perps;
