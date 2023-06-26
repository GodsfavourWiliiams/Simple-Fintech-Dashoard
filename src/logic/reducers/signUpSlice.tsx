import {
  createAsyncThunk,
  createSlice,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import actionTypes from "../actions/types";

const API_URL = `http://ec2-34-238-76-176.compute-1.amazonaws.com/api`;
const token = "97|fbsvHL9jhc6ZBrQuxvZeunKPt4n7IFraR9sDYhEo";

// Async thunk for user registration
export const register = createAsyncThunk(
  actionTypes.REGISTER,
  async (requestBody: {
    name: string;
    phone_number: string;
    email: string;
    password: string;
  }) => {
    const config = {
      headers: {
        Authorization: ``,
        "Content-Type": "application/json",
        withCredentials: true, // Add this line
      },
    };
    const res = await axios.post(`${API_URL}/register`, requestBody, config);
    return res;
  }
);

// Async thunk for setting PIN
export const setPin = createAsyncThunk(
  actionTypes.SET_PIN,
  async (pin: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        withCredentials: true, // Add this line
      },
    };
    const res = await axios.patch(`${API_URL}/users/set-pin`, { pin }, config);
    return res;
  }
);

// Slice for handling PIN state
const pinSlice = createSlice({
  name: "pin",
  initialState: { payload: null, loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPin.pending, (state) => {
      state.payload = null;
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(setPin.fulfilled, (state, action) => {
      state.payload = action.payload;
      state.error = null;
      state.loading = "succeeded";
    });
    builder.addCase(setPin.rejected, (state, action) => {
      state.payload = null;
      state.error = action.payload;
      state.loading = "failed";
    });
  },
});

// Slice for handling sign up state
const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    user: null,
    loading: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = "pending";
      state.error = null;
      state.user = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
      state.user = null;
    });
  },
  reducers: undefined,
});

// Combine the slices
const rootReducer = combineReducers({
  signUp: signUpSlice.reducer,
  pin: pinSlice.reducer,
});

export default rootReducer;
