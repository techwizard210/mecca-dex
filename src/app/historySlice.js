import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  tradeHistory: [],
  balance: 0,
  walletAddress: undefined,
};

export const getTradeHistory = createAsyncThunk(
  "tradeHistory/getTradeHistory",
  async (walletAddress) => {
    const response = await axios.get(
      `${SERVER_URL}/getTradeHistory/${walletAddress}`
    );
    return response.data.data;
  }
);

export const postTrade = createAsyncThunk(
  "tradeHistory/postTrade",
  async (param) => {
    const response = await axios.post(`${SERVER_URL}/startTrade`, param);
    return response.data.data;
  }
);

export const quitTrade = createAsyncThunk(
  "tradeHistory/quitTrade",
  async (param) => {
    const response = await axios.post(`${SERVER_URL}/quitTrade`, param);
    return response.data.data;
  }
);

export const connectWallet = createAsyncThunk(
  "tradeHistory/connectWallet",
  async () => {
    let account;
    if (typeof window.ethereum === "undefined") {
      toast.error("Please install coinbase wallet");
    } else {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        account = accounts[0];
      } else {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        account = accounts[0];
      }
    }
    return account;
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    disconnectWallet: (state, action) => {
      state.walletAddress = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTradeHistory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tradeHistory = action.payload.trades;
      state.balance = action.payload.balance;
    });
    builder.addCase(postTrade.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tradeHistory.push(action.payload.trade);
      state.balance = action.payload.balance;
    });
    builder.addCase(quitTrade.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.balance = action.payload.balance;
      state.tradeHistory.forEach((trade, index) => {
        if (trade._id === action.payload.trade._id) {
          state.tradeHistory[index] = action.payload.trade;
        }
      });
    });
    builder.addCase(connectWallet.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.walletAddress = action.payload;
    });
  },
});

export const { disconnectWallet } = historySlice.actions;

export default historySlice.reducer;