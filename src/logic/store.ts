import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import LoginReducer from "./reducers/loginSlice";
import Register from "./reducers/signUpSlice";
import TransactionSummary from "./reducers/dashboardSlice";
import Notification from "./reducers/notificationSlice";
import ViewTransaction from "./reducers/TransactionsSlice";
import SendReducer from "./reducers/sendSlice";

const loggerMiddleware = createLogger();
const middleware = [thunk, loggerMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(loggerMiddleware);
}

export default configureStore({
  reducer: {
    LoginReducer,
    Register,
    TransactionSummary,
    Notification,
    ViewTransaction,
    SendReducer,
  },
  middleware: [thunk, loggerMiddleware],
});
