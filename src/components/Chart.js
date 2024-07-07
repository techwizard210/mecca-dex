import React from "react";
import { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { fetchOHLCData } from "../utils/DataProvider";

function Chart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    let candleSeries;
    async function fetchData() {
      const priceData = await fetchOHLCData();
      chart.current = await createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { type: "solid", color: "#253248" },
          textColor: "rgba(255, 255, 255, 0.9)",
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
      });

      candleSeries = await chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      await candleSeries.setData(priceData);

      await chart.current.timeScale().fitContent();

      // resizeObserver.current = await new ResizeObserver((entries) => {
      //     const { width, height } = entries[0].contentRect;
      //     chart.current.applyOptions({ width, height });
      //     setTimeout(() => {
      //         chart.current.timeScale().fitContent();
      //     }, 0);
      // });

      // await resizeObserver.current.observe(chartContainerRef.current);

      // return () => resizeObserver.current.disconnect();
    }
    fetchData();
  }, []);

  return (
    <>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
}

export default Chart;
