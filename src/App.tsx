import { Suspense, lazy, startTransition } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Spinner from "./common/Spinner";
import Notification from "./components/Notifications";

const Transaction = lazy(() => import("./pages/Transaction"));
const Beneficiary = lazy(() => import("./pages/Beneficiary"));
const Send = lazy(() => import("./pages/Send"));
const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));
const DashBoard = lazy(() => import("./pages/Dashboard"));
const Wallet = lazy(() => import("./pages/Wallet"));

function App() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <>
      <Notification />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center gap-3 mt-20 index-200">
              <h1 className="text-2xl font-semibold">Welcome to F&G</h1>
              <p className="bg-red-400 rounded p-3 text-white">
                Please disregard the modal displaying the Syncfusion chart on
                the page. If you encounter this, simply refresh the page. It
                appears because I am using the Syncfusion chart without a valid
                key.
              </p>
              <button
                onClick={() => handleNavigation("/signin")}
                className="py-4 px-10 text-lg rounded-md text-white bg-[#1F28EB]">
                Login
              </button>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="py-4 px-10 text-lg rounded-md text-white bg-[#1F28EB]">
                Go to Dashboard
              </button>
            </div>
          }
        />
        <Route element={<DefaultLayout />}>
          <Route
            index
            path="/dashboard"
            element={
              <Suspense fallback={<Spinner />}>
                <DashBoard />
              </Suspense>
            }
          />
          <Route
            path="/transaction"
            element={
              <Suspense fallback={<Spinner />}>
                <Transaction />
              </Suspense>
            }
          />
          <Route
            path="/beneficiary"
            element={
              <Suspense fallback={<Spinner />}>
                <Beneficiary />
              </Suspense>
            }
          />
          <Route
            path="/wallet"
            element={
              <Suspense fallback={<Spinner />}>
                <Wallet />
              </Suspense>
            }
          />
          <Route
            path="/send"
            element={
              <Suspense fallback={<Spinner />}>
                <Send />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
