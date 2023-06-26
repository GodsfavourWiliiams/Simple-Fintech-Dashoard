import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, LoadingIcon } from "./ProviderIcons";
import { FormCheckBox, FormInput } from "../../components/form";
import { signin } from "../../logic/reducers/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ThunkDispatch } from "@reduxjs/toolkit";

const SignIn = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading } = useSelector((state: any) => state.LoginReducer || {});

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const validateForm = () => {
    if (!email || !password) {
      return false;
    }

    if (!isValidEmail(email)) {
      return false;
    }

    if (!password) {
      return false;
    }

    return true;
  };

  const isValidEmail = (email: string) => {
    // Add your email validation logic here
    return /\S+@\S+\.\S+/.test(email);
  };

  const submit = () => {
    setIsButtonClicked(true); // Button clicked, show errors
    if (validateForm()) {
      setIsButtonClicked(false);
      const requestBody = {
        email,
        password,
      };
      dispatch(signin(requestBody))
        .then((responseData: any) => {
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 2000);
          if (responseData?.payload.status === 200) {
            setToken(""); // Set the token value in the local storage
          }
        })
        .catch((error: { message: any }) => {
          console.log(error.message);
        });
    }
    console.log(token);
  };
  return (
    <div className="h-screen overflow-auto flex flex-col items-center justify-center px-4 bg-black">
      <div className="mx-auto flex flex-col items-center justify-center bg-white rounded-lg px-4 py-10 w-full max-w-[557px]">
        <div className="mb-14 text-center">
          <h3 className="text-2xl font-bold leading-6 text-gray-800 mb-4">
            Welcome Back!
          </h3>
          <p
            tabIndex={0}
            aria-label="Login to your account"
            className="text-base leading-6 text-gray-800">
            Securely login into your F&G account
          </p>
        </div>
        <div className="w-full max-w-[464px]">
          <div className="w-full">
            <label className="text-sm font-medium leading-none text-gray-800">
              Email address
            </label>
            <FormInput
              type="email"
              placeHolderClass="placeholder:text-start text-start"
              value={email.trim()}
              placeholder="Enter phone or email"
              required
              onChange={(e) => setEmail(e.target.value.trim())}
              iconClass="mt-5"
              isDisabled={loading === "pending"}
              error={
                isButtonClicked &&
                (email.trim().length === 0 || !isValidEmail(email))
              }
            />
          </div>
          <div className="mt-3  w-full">
            <label className="text-sm font-medium leading-none text-gray-800">
              Password
            </label>
            <FormInput
              type="password"
              value={password.trim()}
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value.trim())}
              iconClass="mt-[28px]"
              rightIcon={<EyeIcon />}
              isDisabled={loading === "pending"}
              error={isButtonClicked && password.trim().length === 0}
            />
          </div>

          <div className="flex items-center justify-between my-3">
            <div className="flex items-center justify-center gap-1">
              <FormCheckBox
                labelFont="text-base"
                label="Remember me"
                isChecked={false}
              />
            </div>
            <div className="">
              <span className="text-[#1F28EB] font-medium">
                Forgot Password?
              </span>
            </div>
          </div>
          <div className="mt-8 w-full text-center">
            <button
              disabled={loading === "pending"}
              onClick={submit}
              className="w-full sm:w-96 rounded-lg border bg-[#1F28EB] py-4 text-[18px] font-semibold leading-none text-white hover:bg-blue-600">
              {loading === "pending" ? (
                <LoadingIcon width={5} height={6} />
              ) : (
                "Login"
              )}
            </button>

            <p className="mt-4 text-sm font-medium leading-none text-blue-500">
              Dont have an account?{" "}
              <span className="cursor-pointer text-sm font-medium leading-none text-gray-800 underline">
                {" "}
                <Link to="/signup" className="text-[#83879B]">
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
