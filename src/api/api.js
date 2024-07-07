import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export async function postTrade(amount, entryPrice, leverage, tradeType) {
  const param = {
    amount: amount,
    leverage: leverage,
    tradeType: tradeType,
  };
  let trades = [];
  await axios.post(`${SERVER_URL}/startTrade`, param).then(
    (response) => {
      trades = response.data.data;
    },
    (error) => {
      console.log(error);
    }
  );
  return trades;
}

export async function getTradeHistory() {
  let trades = [];
  await axios.get(`${SERVER_URL}/getTradeHistory`).then(
    (response) => {
      trades = response.data.data;
    },
    (error) => {
      console.log(error);
    }
  );
  return trades;
}

export async function quitTrade(tradeId, entryPrice) {
  const param = {
    tradeId: tradeId,
  };
  let trades = [];
  await axios.post(`${SERVER_URL}/quitTrade`, param).then(
    (response) => {
      trades = response.data.data;
    },
    (error) => {
      console.log(error);
    }
  );
  return trades;
}
