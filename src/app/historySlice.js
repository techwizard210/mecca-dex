import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  tradeHistory: [],
  balance: 0,
};

export const getTradeHistory = createAsyncThunk(
  "tradeHistory/getTradeHistory",
  async () => {
    const response = await axios.get(`${SERVER_URL}/getTradeHistory`);
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

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTradeHistory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tradeHistory = action.payload.trades;
      state.balance = action.payload.balance;
      console.log(state.balance);
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
  },
});

export default historySlice.reducer;
