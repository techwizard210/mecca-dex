import moment from "moment-timezone";
import axios from "axios";
import { ethers } from "ethers";

const convertDateToSimpleFormat = (dateString) => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const processOHLCData = (array) => {
  const ohlcData = array.map((d) => ({
    time: convertDateToSimpleFormat(d[0]),
    open: d[1],
    high: d[2],
    low: d[3],
    close: d[4],
  }));

  return ohlcData;
};

export const fetchOHLCData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=365');
  const data = await response.json();

  const ohlcData = await processOHLCData(data);
  return ohlcData;
};

export const organizeNumber = (param) => {
  return parseFloat(param).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const convertUnixTime = (unixtime) => {
  const dateTime = moment.unix(unixtime);
  return dateTime
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("YYYY-MM-DD HH:mm:ss");
};

export const fetchETHPrice = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "ethereum",
        vs_currencies: "usd",
      },
    }
  );
  return response.data.ethereum.usd;
};

export const shortenAddress = (address) => {
  const start = address.slice(0, 6);
  const end = address.slice(-6);
  return `${start}...${end}`;
};

export const getETHBalance = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // Fetch the balance of the specified address
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};
