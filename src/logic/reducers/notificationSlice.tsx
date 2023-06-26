import { createSlice } from "@reduxjs/toolkit";
import { createAction } from "redux-promise-middleware-actions";

export const notificationType = {
  ERROR_NOTIFICATION: "ERROR_NOTIFICATION",
  SUCCESS_NOTIFICATION: "SUCCESS_NOTIFICATION",
  WARNING_NOTIFICATION: "WARNING_NOTIFICATION",
  CLOSE_NOTIFICATION: "CLOSE_NOTIFICATION",
};

export const successMessage = createAction(
  notificationType.SUCCESS_NOTIFICATION,
  (message) => message
);
export const errorMessage = createAction(
  notificationType.ERROR_NOTIFICATION,
  (message) => message
);
export const warningMessage = createAction(
  notificationType.WARNING_NOTIFICATION,
  (message) => message
);
export const closeMessage = createAction(notificationType.CLOSE_NOTIFICATION);

interface NotificationState {
  message: string;
  type: string;
  open: boolean;
}

const initialState: NotificationState = {
  message: "",
  type: "",
  open: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    successMessage(state, action) {
      state.message = action.payload;
      state.type = "success";
      state.open = true;
    },
    errorMessage: (state, action) => {
      state.message = action.payload;
      state.type = "error";
      state.open = true;
    },
    warningMessage: (state, action) => {
      state.message = action.payload;
      state.type = "warning";
      state.open = true;
    },
    closeMessage: (state) => {
      state.message = "";
      state.type = "";
      state.open = false;
    },
  },
});

export const {
  successMessage: successMessageActionCreator,
  errorMessage: errorMessageActionCreator,
  warningMessage: warningMessageActionCreator,
  closeMessage: closeMessageActionCreator,
} = notificationSlice.actions;

export default notificationSlice.reducer;
