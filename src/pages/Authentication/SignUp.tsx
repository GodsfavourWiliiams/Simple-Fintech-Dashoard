import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeIcon } from "./ProviderIcons";
import { FormCheckBox, FormInput } from "../../components/form";
import { register, setPin } from "../../logic/reducers/signUpSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import PinInput from "react-pin-input";
import { LoadingIcon } from "./ProviderIcons";
import useLocalStorage from "../../hooks/useLocalStorage";

const SignUp = () => {
  const [step, setStep] = useLocalStorage("signup-step", 1);

  const handleCreatePin = () => {
    setStep(step + 1);
  };

  const handleCreatePinSuccess = () => {
    // Clear the "signup-step" key from local storage
    localStorage.removeItem("signup-step");
  };

  return (
    <>
      <div className="h-screen overflow-y-scroll flex flex-col items-center justify-center px-4 py-10 bg-black">
        <div className="flex flex-col items-center justify-center ">
          {step === 1 ? (
            <Step1 next={handleCreatePin} />
          ) : (
            <Step2 clearStep={handleCreatePinSuccess} />
          )}
        </div>
      </div>
    </>
  );
};

const Step1 = ({ next }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const { loading } = useSelector((state: any) => state.Register || {});

  const validateForm = () => {
    if (!name || !email || !password || !phoneNumber) {
      return false;
    }

    if (!isValidEmail(email)) {
      return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return false;
    }

    return true;
  };

  const isValidEmail = (email: string) => {
    // Add your email validation logic here
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    return /^234\d{10}$/.test(phoneNumber);
  };

  const submit = () => {
    setIsButtonClicked(true); // Button clicked, show errors
    if (validateForm()) {
      setIsButtonClicked(false);
      const requestBody = {
        name: name,
        email: email,
        phone_number: phoneNumber,
        password: password,
      };

      dispatch(register(requestBody))
        .then((responseData) => {
          next();
          // navigate("/dashboard", { replace: true });
        })
        .catch((error: { message: any }) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-white rounded-lg px-4 py-10 w-full max-w-[557px]">
      <h3 className="text-2xl font-bold leading-6 text-gray-800 mb-4">
        Register your account
      </h3>
      <div className="w-full max-w-[464px]">
        <div className="w-full">
          <label className="text-sm font-medium leading-none text-gray-800">
            Business Name *
          </label>
          <FormInput
            type="text"
            placeHolderClass="placeholder:text-start text-start"
            value={name}
            placeholder="Enter text"
            required
            onChange={(e) => setName(e.target.value)}
            iconClass="mt-5"
            error={isButtonClicked && name.trim().length === 0} // Validation for empty name
          />
        </div>

        <div className="mt-3 w-full">
          <label className="text-sm font-medium leading-none text-gray-800">
            Email *
          </label>
          <FormInput
            type="email"
            value={email}
            placeholder="Enter email address"
            required
            onChange={(e) => setEmail(e.target.value)}
            error={
              isButtonClicked &&
              (email.trim().length === 0 || !isValidEmail(email))
            } // Validation for empty email or invalid format
          />
        </div>

        <div className="w-full mt-3">
          <label className="text-sm font-medium leading-none text-gray-800">
            Phone Number *
          </label>
          <FormInput
            type="number"
            value={phoneNumber}
            placeholder="234"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={
              isButtonClicked &&
              (phoneNumber.trim().length === 0 ||
                !isValidPhoneNumber(phoneNumber))
            }
          />
        </div>

        <div className="mt-3 w-full">
          <label className="text-sm font-medium leading-none text-gray-800">
            Password *
          </label>
          <FormInput
            type="password"
            value={password}
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
            iconClass="mt-[28px]"
            rightIcon={<EyeIcon />}
            error={isButtonClicked && password.trim().length === 0} // Validation for empty password
          />
        </div>

        <div className="flex items-center justify-between my-3">
          <FormCheckBox
            label="I consent to the collection and processing of my personal data in line with the data regulations as described in Persent’s Privacy Policy"
            isChecked={false}
            labelFont="text-[10px]"
          />
        </div>
        <div className="mt-8 w-full text-center">
          <button
            onClick={submit}
            className="w-full sm:w-96 rounded-lg border bg-[#1F28EB] py-4 text-sm font-semibold leading-none text-white hover:bg-blue-600">
            {loading === "pending" ? (
              <LoadingIcon width={5} height={6} />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="mt-4 text-sm font-medium leading-none text-blue-500">
            Already a user?
            <span className="cursor-pointer text-sm font-medium leading-none text-gray-800 underline">
              {" "}
              <Link to="/signin" className="text-[#83879B]">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Step2 = ({ clearStep }) => {
  const [pinValue, setPinValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { loading, payload } = useSelector(
    (state: any) => state.Register.pin || {}
  );

  const submit = () => {
    console.log(loading, payload, pinValue.length !== 4);
    if (pinValue.length === 4) {
      dispatch(setPin(pinValue))
        .then((responseData) => {
          setTimeout(() => {
            navigate("/signin", { replace: true });
          }, 2000);
          clearStep();
        })
        .catch((error: { message: any }) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-white rounded-lg px-4 py-10 w-full max-w-[557px]">
      <div className=" text-center">
        <h3 className="text-2xl font-bold leading-6 text-gray-800 mb-4">
          Create PIN
        </h3>
        <p tabIndex={0} className="text-sm leading-6 text-gray-800">
          Transaction PIN is a 4-digit, which will be used to authorize your
          transactions
        </p>
      </div>
      <div className="w-full max-w-[464px] border rounded-md flex flex-col items-center justify-center my-16">
        <div className="w-full max-w-[388px] mx-auto p-5">
          <div className="flex flex-row justify-center text-center my-10">
            <PinInput
              length={4}
              initialValue=""
              secret
              secretDelay={100}
              onChange={(value, index) => {
                setPinValue(value);
              }}
              type="numeric"
              inputMode="number"
              style={{ padding: "5px" }}
              inputStyle={{
                borderColor: "#DFDFE6",
                height: "70px",
                width: "70px",
                borderRadius: "10px",
              }}
              inputFocusStyle={{ borderColor: "blue" }}
              onComplete={(value, index) => {
                setPinValue(value);
              }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          </div>
          <div className="mb-3">
            {pinValue.length < 4 && (
              <p className="text-sm text-red-500 text-center">
                Please Provide your secret transaction pin
              </p>
            )}
          </div>
          <div className="mt-4 w-full text-center">
            <button
              onClick={() => submit()}
              className="w-full rounded-md border bg-[#1F28EB] py-4 text-sm font-semibold leading-none text-white hover:bg-blue-600">
              {loading === "pending" ? (
                <LoadingIcon width={5} height={6} />
              ) : (
                "Done"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
