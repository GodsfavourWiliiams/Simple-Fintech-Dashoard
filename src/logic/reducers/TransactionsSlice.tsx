import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import actionTypes from "../actions/types";

const API_URL = `http://ec2-34-238-76-176.compute-1.amazonaws.com/api`;

const token = "97|fbsvHL9jhc6ZBrQuxvZeunKPt4n7IFraR9sDYhEo";

export const fetchTransactions = createAsyncThunk(
  actionTypes.GET_TRANSACTIONS,
  async () => {
    const response = await axios.get(`${API_URL}/user-wallet-transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

interface transactionState {
  payload: null | any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | any;
}

const initialState = {
  payload: null,
  loading: "idle",
  error: null,
} as unknown as transactionState;

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    ViewTransaction: (state, action) => {
      state.payload.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.payload = null;
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.payload = action.payload;
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.payload = null;
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export default transactionsSlice.reducer;
