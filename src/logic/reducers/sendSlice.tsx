import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import actionTypes from "../actions/types";

const API_URL = `http://ec2-34-238-76-176.compute-1.amazonaws.com/api`;
const token = "97|fbsvHL9jhc6ZBrQuxvZeunKPt4n7IFraR9sDYhEo";

interface SendState {
  payload: null | any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | any;
}

const initialState = {
  payload: null,
  loading: "idle",
  error: null,
} as SendState;

export const send = createAsyncThunk(
  actionTypes.WALLET_TRANSFER,
  async (requestBody: {
    from: string;
    description: string;
    amount: string;
    destination: string;
    pin: string;
  }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${API_URL}/wallets/wallet`,
      requestBody,
      config
    );
    return res;
  }
);

const WalletTransferSlide = createSlice({
  name: "walletTransfer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(send.pending, (state, action) => {
      state.payload = null;
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(send.fulfilled, (state, action) => {
      state.payload = action.payload;
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(send.rejected, (state, action) => {
      state.payload = null;
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export default WalletTransferSlide.reducer;
