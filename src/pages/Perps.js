import React from "react";
import { useState, useEffect, useRef } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Slider from "@mui/material/Slider";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import eth from "../assets/images/eth.png";

import History from "../components/History";
import Chart from "../components/Chart";

import {
  organizeNumber,
  fetchETHPrice,
  getETHBalance,
} from "../utils/DataProvider";

import { useDispatch, useSelector } from "react-redux";
import { postTrade, connectWallet } from "../app/historySlice";

function Perps() {
  const dispatch = useDispatch();
  const [tradeType, setTradeType] = useState("long");
  const [leverage, setLeverage] = useState(2);
  const [entryPrice, setEntryPrice] = useState(3312);
  const [amount, setAmount] = useState(0);
  const [collateral, setCollateral] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [txConfirmModal, setTxConfirmModal] = useState(false);

  const poolBalance = useSelector((state) => state.history.balance);
  const walletAddress = useSelector((state) => state.history.walletAddress);
  const userBalance = useSelector((state) => state.history.userBalance);

  const txConfirmModalRef = useRef();

  const handleTrade = (type) => {
    setTradeType(type);
  };

  const changeLeverage = (step) => {
    if (step === -0.1) {
      if (leverage <= 2) return;
      else setLeverage((prev) => ((prev * 10 + step * 10) / 10).toFixed(1));
    }

    if (step === 0.1) {
      if (leverage >= 4.9) return;
      else setLeverage((prev) => ((prev * 10 + step * 10) / 10).toFixed(1));
    }
  };

  const submitTrade = async () => {
    if (amount == 0 || amount > userBalance) {
      toast.error("Please input correct amount");
      return;
    } else {
      // try {
      //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      //   const walletSigner = provider.getSigner();
      //   setLoading(true);
      //   const transactionHash = await walletSigner.sendTransaction({
      //     to: process.env.REACT_APP_RECEIVER_ADDRESS,
      //     value: ethers.utils.parseEther(amount.toString()),
      //     from: walletAddress,
      //   });
      //   const receipt = await transactionHash.wait();
      //   if (receipt) {
      //     setLoading(false);
      //     toast.success("Transaction confirmed");
      //     const param = {
      //       amount,
      //       entryPrice,
      //       leverage,
      //       tradeType,
      //       walletAddress,
      //     };
      //     dispatch(postTrade(param));
      //   }
      // } catch (error) {
      //   setLoading(false);
      //   toast.error("Transaction rejected by the user");
      // }
      setLoading(true);
      setTxConfirmModal(true);
    }
  };

  const continuePostTrade = async () => {
    const param = {
      amount,
      entryPrice,
      leverage,
      tradeType,
      walletAddress,
    };
    await dispatch(postTrade(param));
    setLoading(false);
    setTxConfirmModal(false);
  };

  const cancelTX = async () => {
    setLoading(false);
    setTxConfirmModal(false);
  };

  const marks = [
    {
      value: 2,
      label: "2x",
    },
    {
      value: 3,
      label: "3x",
    },
    {
      value: 4,
      label: "4x",
    },
    {
      value: 5,
      label: "5x",
    },
  ];

  useEffect(() => {
    const getPrice = async () => {
      const price = await fetchETHPrice();
      setEntryPrice(price);
    };

    getPrice();

    const priceInterval = setInterval(async () => {
      await getPrice();
    }, 60000);
    return () => clearInterval(priceInterval);
  }, []);

  useEffect(() => {
    if (amount > userBalance) {
      toast.error("You don't have sufficient amount of ETH");
    }
  }, [amount, walletAddress]);

  return (
    <>
      <div
        className={`text-[#84897a] absolute top-[50px] right-[10px] z-40 p-[40px] pb-[30px] bg-[#1b1b1b] w-[250px] flex flex-col gap-2 rounded transition-all duration-200 ${
          txConfirmModal === true ? "block" : "hidden"
        }`}
        ref={txConfirmModalRef}
      >
        <h4>Are you sure to send {amount} ETH ?</h4>
        <button
          className="rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-100 transition-all duration-200 mt-3"
          onClick={continuePostTrade}
        >
          <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-2 px-5 text-lg font-medium leading-none">
            <span className="text-[#e69f00] text-[16px]">Confirm</span>
          </div>
        </button>
        <button
          className="rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-100 transition-all duration-200 mt-3"
          onClick={cancelTX}
        >
          <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-2 px-5 text-lg font-medium leading-none">
            <span className="text-white text-[16px]">Cancel</span>
          </div>
        </button>
      </div>
      <div
        className={`${
          loading ? "show" : "hidden"
        } absolute top-[50%] left-[50%] z-50`}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress size={60} sx={{ color: "#e69f00" }} />
        </Box>
      </div>
      <div className="hidden lg:flex lg:flex-1 min-h-full gap-3">
        <div className="w-[360px] bg-[#131313] flex flex-col text-white text-[25px]">
          <div className="bg-[#1b1b1b] px-4 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center rounded-full bg-[#272626]">
                <button
                  type="button"
                  className={`w-[70px] h-7 lg:h-auto lg:w-20 flex flex-row items-center justify-center font-semibold space-x-2 text-white/50 fill-current border-2 border-transparent rounded-full px-2 py-1 lg:m-1 bg-perps-green transition-all duration-200 ${
                    tradeType === "long" ? "long-trade" : ""
                  }`}
                  onClick={() => handleTrade("long")}
                >
                  <span className="text-xs lg:text-sm leading-none">Long</span>
                  <TrendingUpIcon
                    className={`${tradeType === "long" ? "long-trade" : ""}`}
                  />
                </button>
                <button
                  type="button"
                  className={`w-[70px] h-7 lg:h-auto lg:w-20 flex flex-row items-center justify-center font-semibold space-x-2 text-white/50 fill-current border-2 border-transparent rounded-full px-2 py-1 lg:m-1 bg-perps-green transition-all duration-200 ${
                    tradeType === "short" ? "short-trade" : ""
                  }`}
                  onClick={() => handleTrade("short")}
                >
                  <span className="text-xs lg:text-sm leading-none">Short</span>
                  <TrendingDownIcon
                    className={`${tradeType === "short" ? "short-trade" : ""}`}
                  />
                </button>
              </div>
              <div className="flex items-center">
                {/* <IconButton aria-label="add an alarm">
                  <RefreshIcon />
                </IconButton>
                <IconButton aria-label="add an alarm">
                  <TuneIcon />
                </IconButton> */}
              </div>
            </div>
            <div>
              <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
                Pay
              </div>
              <div className="bg-[#272626] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
                <div className="flex flex-col dark:text-white h-full justify-center">
                  <div className="flex justify-between">
                    <div className="p-1 lg:p-1 lg:pr-4 rounded-lg flex items-center bg-[#1b1b1b]">
                      <img src={eth} alt="eth icon" className="w-[40px]" />
                      <div className="font-semibold text-xs lg:text-base">
                        ETH
                      </div>
                    </div>
                    <div className="text-right">
                      <input
                        placeholder="0.00"
                        className="bg-transparent text-right font-semibold dark:placeholder:text-white/25 outline-none text-lg w-[180px]"
                        type="text"
                        onChange={(event) => {
                          setAmount(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
                {tradeType === "long" ? "Long" : "Short"}
              </div>
              <div className="bg-[#272626] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
                <div className="flex flex-col dark:text-white h-full justify-center">
                  <div className="flex items-center justify-between">
                    <div className="p-1 pr-2 lg:p-1 lg:pr-4 rounded-lg flex items-center bg-[#1b1b1b]">
                      <img src={eth} alt="eth icon" className="w-[40px]" />
                      <div className="font-semibold text-xs lg:text-base">
                        ETH
                      </div>
                    </div>
                    <div className="">
                      <input
                        inputMode="decimal"
                        data-lpignore="true"
                        placeholder="0.00"
                        className="h-full bg-transparent text-right font-semibold dark:placeholder:text-white/25 outline-none text-lg w-[180px]"
                        type="text"
                        value={amount * leverage}
                        onChange={() => {}}
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
              <div className="bg-[#272626] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
                <div className="flex dark:text-white h-full">
                  <IconButton
                    aria-label="add an alarm"
                    onClick={() => changeLeverage(-0.1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <input
                    inputMode="decimal"
                    placeholder="0.00"
                    className="bg-transparent disabled:opacity-100 disabled:text-black dark:text-white dark:placeholder:text-white/25 outline-none font-semibold text-white text-xs lg:text-sm text-center w-full h-full"
                    type="text"
                    value={`${leverage}x`}
                    onChange={(event) => {
                      setLeverage(event.target.value.replace("x", ""));
                    }}
                  />
                  <IconButton
                    aria-label="add an alarm"
                    onClick={() => changeLeverage(0.1)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Restricted values"
                  defaultValue={2}
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  step={0.1}
                  valueLabelDisplay="auto"
                  marks={marks}
                  max={5.0}
                  min={2}
                  sx={{
                    color: tradeType === "long" ? "#32df7b" : "#eb5757",
                  }}
                />
              </Box>
            </div>
            <div>
              <div className="border-t border-t-black/10 lg:pt-4 px-2 lg:px-4">
                <div className="hidden lg:block">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50 ">Collateral</span>
                    <div>
                      <div
                        translate="no"
                        className="text-xs text-white/75 mt-0.5"
                      >
                        <span>{organizeNumber(entryPrice * amount)} USD</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50 leading-none">
                      Position Size
                    </span>
                    <div
                      translate="no"
                      className="text-xs text-white/75 mt-0.5"
                    >
                      <span
                        translate="no"
                        className="text-xs h-[14px] text-white/75"
                      >
                        <span>
                          {organizeNumber(entryPrice * amount * leverage)} USD
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full !bg-transparent css-g53se3">
              {walletAddress !== undefined ? (
                <button
                  className="h-full rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-full transition-all duration-200"
                  onClick={submitTrade}
                >
                  <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-5 text-lg font-medium leading-none">
                    {/* <span className="text-[#e69f00]">Connect Wallet</span> */}
                    <span className="text-[#e69f00]">Start Trade</span>
                  </div>
                </button>
              ) : (
                <button
                  className="h-full rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-full transition-all duration-200"
                  onClick={() => dispatch(connectWallet())}
                >
                  <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-5 text-lg font-medium leading-none">
                    {/* <span className="text-[#e69f00]">Connect Wallet</span> */}
                    <span className="text-[#e69f00]">Connect Wallet</span>
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="rounded-lg p-3 w-full">
            <div className="border border-white/5 rounded-lg p-3 w-full">
              <div className="space-y-1">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span className="text-xs text-white/50">Entry price</span>
                  <span className="text-xs text-white/50">
                    ${organizeNumber(entryPrice)}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span className="text-xs text-white/50">
                    Liquidation price
                  </span>
                  <span className="text-xs text-white/50">
                    ${organizeNumber(entryPrice * (1 - 1 / leverage))}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span className="text-xs text-white/50">
                    Execution Fee (0.4%)
                  </span>
                  <span className="text-xs text-white/50">
                    {organizeNumber(
                      (entryPrice * amount * leverage * 0.004).toFixed(1)
                    )}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span className="text-xs text-white/50">
                    Net Position Value
                  </span>
                  <span className="text-xs text-white/50">
                    {organizeNumber(entryPrice * amount * leverage * 0.996)}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <span className="text-xs text-white/50">
                    Available liquidity
                  </span>
                  <span className="text-xs text-white/50">
                    ${organizeNumber(poolBalance)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[calc(100vw-360px)] flex flex-col border-t border-b border-[#242424]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:h-[64px] w-full border-b border-[#242424] px-[20px]">
            <div className="p-1 lg:p-1 lg:pr-4 rounded-lg flex items-center">
              <img src={eth} alt="eth icon" className="w-[40px]" />
              <div className="font-semibold text-xs lg:text-base text-white">
                ETH-PERP
              </div>
            </div>
            <div className="flex gap-7 items-center">
              <div className="text-white">${organizeNumber(entryPrice)}</div>
              <div className="flex gap-3 xl:gap-7">
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">
                    24h change
                  </p>
                  <div className="text-xs text-white">2.42%</div>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">
                    24h Vol
                  </p>
                  <div className="text-xs text-white">23.16M</div>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">
                    24h High
                  </p>
                  <div className="text-xs text-white">
                    ${organizeNumber(3512.22)}
                  </div>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">
                    24h Low
                  </p>
                  <div className="text-xs text-white">
                    ${organizeNumber(3389.31)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Chart />
          <History ethPrice={entryPrice} setLoading={setLoading} />
        </div>
      </div>
      <div className="flex lg:hidden min-h-full w-100">
        <div className="flex flex-col w-full">
          {/* <div className="flex flex-col lg:flex-row lg:items-center justify-between lg:h-[64px] w-full border-b border-[#242424] px-[20px]">
            <div className="p-1 lg:p-1 lg:pr-4 rounded-lg flex items-center">
              <img src={eth} alt="eth icon" className="w-[40px]" />
              <div className="font-semibold text-xs lg:text-base text-white">
                ETH-PERP
              </div>
            </div>
            <div className="flex gap-7 items-center">
              <div className="text-white">${organizeNumber(3471.20)}</div>
              <div className="flex gap-3 xl:gap-7">
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">24h change</p>
                  <div className="text-xs text-white">2.42%</div>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">24h Vol</p>
                  <div className="text-xs text-white">23.16M</div>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">24h High</p>
                  <div className="text-xs text-white">${organizeNumber(3512.22)}</div>
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-xs text-white/30 whitespace-nowrap">24h Low</p>
                  <div className="text-xs text-white">${organizeNumber(3389.31)}</div>
                </div>
              </div>
            </div>
          </div> */}
          <Chart />
          <div className="bg-[#131313] flex flex-col text-white text-[25px]">
            <div className="bg-[#1b1b1b] px-4 py-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-full bg-[#272626]">
                  <button
                    type="button"
                    className={`w-[70px] h-7 lg:h-auto lg:w-20 flex flex-row items-center justify-center font-semibold space-x-2 text-white/50 fill-current border-2 border-transparent rounded-full px-2 py-1 lg:m-1 bg-perps-green transition-all duration-200 ${
                      tradeType === "long" ? "long-trade" : ""
                    }`}
                    onClick={() => handleTrade("long")}
                  >
                    <span className="text-xs lg:text-sm leading-none">
                      Long
                    </span>
                    <TrendingUpIcon
                      className={`${tradeType === "long" ? "long-trade" : ""}`}
                    />
                  </button>
                  <button
                    type="button"
                    className={`w-[70px] h-7 lg:h-auto lg:w-20 flex flex-row items-center justify-center font-semibold space-x-2 text-white/50 fill-current border-2 border-transparent rounded-full px-2 py-1 lg:m-1 bg-perps-green transition-all duration-200 ${
                      tradeType === "short" ? "short-trade" : ""
                    }`}
                    onClick={() => handleTrade("short")}
                  >
                    <span className="text-xs lg:text-sm leading-none">
                      Short
                    </span>
                    <TrendingDownIcon
                      className={`${
                        tradeType === "short" ? "short-trade" : ""
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center">
                  {/* <IconButton aria-label="add an alarm">
                    <RefreshIcon />
                  </IconButton>
                  <IconButton aria-label="add an alarm">
                    <TuneIcon />
                  </IconButton> */}
                </div>
              </div>
              <div>
                <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
                  pay
                </div>
                <div className="bg-[#272626] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
                  <div className="flex flex-col dark:text-white h-full justify-center">
                    <div className="flex justify-between">
                      <div className="px-2 py-1 lg:p-1 lg:pr-4 rounded-lg flex items-center bg-[#1b1b1b]">
                        <img src={eth} alt="eth icon" className="w-[40px]" />
                        <div className="font-semibold text-xs lg:text-base">
                          ETH
                        </div>
                      </div>
                      <div className="text-right">
                        <input
                          placeholder="0.00"
                          className="bg-transparent text-right font-semibold dark:placeholder:text-white/25 outline-none text-lg w-[200px] pr-2"
                          type="text"
                          onChange={(event) => {
                            setAmount(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white text-xs font-[500] flex flex-row justify-between px-2 lg:px-4">
                  {tradeType === "long" ? "Long" : "Short"}
                </div>
                <div className="bg-[#272626] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
                  <div className="flex flex-col dark:text-white h-full justify-center">
                    <div className="flex items-center justify-between">
                      <div className="px-2 py-1 lg:p-1 lg:pr-4 rounded-lg flex items-center bg-[#1b1b1b]">
                        <img src={eth} alt="eth icon" className="w-[40px]" />
                        <div className="font-semibold text-xs lg:text-base">
                          ETH
                        </div>
                      </div>
                      <div className="text-right">
                        <input
                          placeholder="0.00"
                          className="bg-transparent text-right font-semibold dark:placeholder:text-white/25 outline-none text-lg w-[200px] pr-2"
                          type="text"
                          value={amount * leverage}
                          onChange={() => {}}
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
                <div className="bg-[#272626] rounded-xl h-14 pl-3 pr-2 py-2 lg:p-4 mt-2">
                  <div className="flex dark:text-white h-full">
                    <IconButton
                      aria-label="add an alarm"
                      onClick={() => changeLeverage(-0.1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <input
                      inputMode="decimal"
                      placeholder="0.00"
                      className="bg-transparent disabled:opacity-100 disabled:text-black dark:text-white text-center dark:placeholder:text-white/25 outline-none font-semibold text-white text-xs lg:text-sm w-full h-full"
                      type="text"
                      value={`${leverage}x`}
                      onChange={(event) => {
                        setLeverage(event.target.value.replace("x", ""));
                      }}
                    />
                    <IconButton
                      aria-label="add an alarm"
                      onClick={() => changeLeverage(0.1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Box sx={{ width: "100%", padding: "15px" }}>
                  <Slider
                    aria-label="Restricted values"
                    defaultValue={2}
                    value={leverage}
                    onChange={(e) => setLeverage(e.target.value)}
                    step={0.1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    max={5.0}
                    min={2}
                    sx={{
                      color: tradeType === "long" ? "#32df7b" : "#eb5757",
                    }}
                  />
                </Box>
              </div>
              <div>
                <div className="border-t border-t-black/10 lg:pt-4 px-2 lg:px-4">
                  <div className="hidden lg:block">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                      <span className="text-xs text-white/50 ">Collateral</span>
                      <div>
                        <div
                          translate="no"
                          className="text-xs text-white/75 mt-0.5"
                        >
                          <span>{entryPrice * amount} USD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                      <span className="text-xs text-white/50 leading-none">
                        Position Size
                      </span>
                      <div
                        translate="no"
                        className="text-xs text-white/75 mt-0.5"
                      >
                        <span
                          translate="no"
                          className="text-xs h-[14px] text-white/75"
                        >
                          <span>
                            {organizeNumber(entryPrice * amount * leverage)} USD
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full !bg-transparent css-g53se3">
                {walletAddress !== undefined ? (
                  <button
                    className="h-full rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-full transition-all duration-200"
                    onClick={submitTrade}
                  >
                    <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-5 text-lg font-medium leading-none">
                      {/* <span className="text-[#e69f00]">Connect Wallet</span> */}
                      <span className="text-[#e69f00]">Start Trade</span>
                    </div>
                  </button>
                ) : (
                  <button
                    className="h-full rounded-xl text-white group bg-[#E69F00]/10 hover:bg-[#E69F00]/25 w-full transition-all duration-200"
                    onClick={() => dispatch(connectWallet())}
                  >
                    <div className="rounded-xl bg-clip-text text-transparent group-disabled:bg-none py-5 text-lg font-medium leading-none">
                      {/* <span className="text-[#e69f00]">Connect Wallet</span> */}
                      <span className="text-[#e69f00]">Connect Wallet</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div className="rounded-lg p-3 w-full">
              <div className="border border-white/5 rounded-lg p-3 w-full">
                <div className="space-y-1">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50">Entry price</span>
                    <span className="text-xs text-white/50">
                      ${organizeNumber(entryPrice)}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50">
                      Liquidation price
                    </span>
                    <span className="text-xs text-white/50">
                      {organizeNumber(entryPrice * (1 - 1 / leverage))}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50">
                      Execution Fee (0.4%)
                    </span>
                    <span className="text-xs text-white/50">
                      {organizeNumber(
                        (entryPrice * amount * leverage * 0.004).toFixed(1)
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50">
                      Net Position Value
                    </span>
                    <span className="text-xs text-white/50">
                      {organizeNumber(entryPrice * amount * leverage * 0.996)}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                    <span className="text-xs text-white/50">
                      Available liquidity
                    </span>
                    <span className="text-xs text-white/50">
                      ${organizeNumber(poolBalance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <History ethPrice={entryPrice} />
        </div>
      </div>
    </>
  );
}

export default Perps;
