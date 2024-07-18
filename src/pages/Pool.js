import React, { useEffect, useState, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { shortenAddress } from "../utils/DataProvider";

function Pool() {
  const chartRef = useRef();
  const chartContainerRef = useRef();
  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: "rgba(255, 255, 255, 0.9)",
        background: { type: "solid", color: "#253248" },
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    };
    chartRef.current = createChart(chartContainerRef.current, chartOptions);
    let lineSeries = chartRef.current.addLineSeries({ color: "#2962FF" });

    const data = [
      { value: 0, time: 1642425322 },
      { value: 8, time: 1642511722 },
      { value: 10, time: 1642598122 },
      { value: 20, time: 1642684522 },
      { value: 3, time: 1642770922 },
      { value: 43, time: 1642857322 },
      { value: 41, time: 1642943722 },
      { value: 43, time: 1643030122 },
      { value: 56, time: 1643116522 },
      { value: 46, time: 1643202922 },
    ];

    lineSeries.setData(data);

    chartRef.current.timeScale().fitContent();

    return () => {
      chartRef.current.remove();
    };
  }, []);
  return (
    <div className="flex p-[20px] text-white/50 gap-3">
      <div className="flex-1 flex-col">
        <h1 className="mb-2 text-[25px]">Pool Profit Chart</h1>
        <div ref={chartContainerRef} className="w-[100%] h-[600px]" />
      </div>

      <div className="flex-1">
        <h1 className="mb-2 text-[25px]">Pool History</h1>
        <div className="flex flex-col text-[#84897a] text-[15px] w-[900px] overflow-hidden md:w-full lg:w-full border border-[#242424]">
          <div className="flex justify-between border-b border-[#242424] py-3">
            <span className="flex-1 text-center">Timestamp</span>
            <span className="flex-1 text-center">Trader</span>
            <span className="flex-1 text-center">Profit</span>
          </div>
          <div className="flex justify-between border-b border-[#242424] py-3">
            <span className="flex-1 text-center">2024-07-10 15:05:40</span>
            <span className="flex-1 text-center">
              {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
            </span>
            <span className="flex-1 text-center">$1000</span>
          </div>
          <div className="flex justify-between border-b border-[#242424] py-3">
            <span className="flex-1 text-center">2024-07-10 15:05:40</span>
            <span className="flex-1 text-center">
              {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
            </span>
            <span className="flex-1 text-center">$1000</span>
          </div>
          <div className="flex justify-between border-b border-[#242424] py-3">
            <span className="flex-1 text-center">2024-07-10 15:05:40</span>
            <span className="flex-1 text-center">
              {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
            </span>
            <span className="flex-1 text-center">$1000</span>
          </div>
          <div className="flex justify-between border-b border-[#242424] py-3">
            <span className="flex-1 text-center">2024-07-10 15:05:40</span>
            <span className="flex-1 text-center">
              {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
            </span>
            <span className="flex-1 text-center">$1000</span>
          </div>
          <div className="flex justify-between border-b border-[#242424] py-3">
            <span className="flex-1 text-center">2024-07-10 15:05:40</span>
            <span className="flex-1 text-center">
              {shortenAddress("0x09c553CEC41c745F4e2A8c12d76D85d1cFf6dD9e")}
            </span>
            <span className="flex-1 text-center">$1000</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Pool;
