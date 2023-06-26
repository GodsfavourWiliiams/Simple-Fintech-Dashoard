import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import actionTypes from "../actions/types";

const API_URL = `http://ec2-34-238-76-176.compute-1.amazonaws.com/api`;

interface LoginState {
  user: null | any;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | any;
}

const initialState = {
  user: null,
  loading: "idle",
  error: null,
} as LoginState;

export const signin = createAsyncThunk(
  actionTypes.LOGIN,
  async (requestBody: { email: string; password: string }) => {
    const res = await axios.post(`${API_URL}/login`, requestBody);
    return res;
  }
);

const loginSlice = createSlice({
  name: "signIn",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
      state.user = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
      state.user = null;
    });
  },
  reducers: {},
});

export default loginSlice.reducer;
