import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import actionTypes from "../actions/types";

const API_URL = `http://ec2-34-238-76-176.compute-1.amazonaws.com/api`;

interface dashboardState {
  payload: null | any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | any;
}

const initialState = {
  payload: null,
  loading: "idle",
  error: null,
} as dashboardState;

export const getTransactionSummary = createAsyncThunk(
  actionTypes.GET_TRANSACTION_SUMMARY,
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `${API_URL}/users/wallets/transactions/summaries`,
      config
    );
    return res;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTransactionSummary.pending, (state) => {
      state.loading = "pending";
      state.error = null;
      state.payload = null;
    });
    builder.addCase(getTransactionSummary.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.payload = action.payload;
      state.error = null;
    });
    builder.addCase(getTransactionSummary.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
      state.payload = null;
    });
  },
  reducers: undefined,
});

export default dashboardSlice.reducer;
