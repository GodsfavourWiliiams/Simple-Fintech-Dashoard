import React, { useState } from "react";
import PinInput from "react-pin-input";
import { FormInput } from "../../components/form";
import { EditIcon, ErrorIcon, SuccessIcon, TickIcon } from "./providerIcon";
import Modal from "../../components/modal";
import { useSelector, useDispatch } from "react-redux";
import { send } from "../../logic/reducers/sendSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { LoadingIcon } from "../Authentication/ProviderIcons";

interface State {
  from: string;
  description: string;
  amount: string;
  pin: string;
  destination: string;
}

const initialState: State = {
  from: "",
  description: "",
  amount: "",
  pin: "",
  destination: "",
};

const FormElements = () => {
  const formArray = [
    {
      id: 1,
      title: "Recipient",
    },
    {
      id: 2,
      title: "Summary",
    },
    {
      id: 3,
      title: "Pin",
    },
  ];

  const [formNo, setFormNo] = useState(formArray[0].id); // Initialize with the first form ID
  const [state, setState] = useState({ ...initialState });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRequestSuccessful, setIsRequestSuccessful] =
    useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading } = useSelector((state: any) => state.SendReducer || {});

  const inputHandle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const next = () => {
    if (
      formNo === 1 &&
      state.from &&
      state.description &&
      state.amount &&
      state.destination
    ) {
      setFormNo(formNo + 1);
    } else if (formNo === 2) {
      setFormNo(formNo + 1);
    } else {
      setIsButtonClicked(true); // Button clicked, show errors
    }
  };

  const previous = () => {
    setFormNo(formNo - 1);
  };

  const finalSubmit = () => {
    if (state.pin.length === 4) {
      dispatch(send(state));
      setTimeout(() => {
        setIsRequestSuccessful(true);
      }, 2000);
      // setIsModalOpen(true);
    } else {
      console.error("Please fill up the Pin field");
    }
  };

  const resetForm = () => {
    setState({ ...initialState });
    setFormNo(1);
    setIsRequestSuccessful(false);
    setIsButtonClicked(false);
  };

  if (isRequestSuccessful) {
    return (
      <div className="flex flex-col justify-center items-center gap-24">
        <h1 className="text-2xl font-semibold">Transfer Successful</h1>
        <div className="bg-[#000000] p-5 rounded-lg max-w-[461px] w-full">
          <div className="max-w-[340px] w-full flex flex-col justify-center items-center gap-5 mx-auto">
            <div className="flex flex-col justify-center items-center gap-5 mx-auto">
              <div className="relative">
                <SuccessIcon />{" "}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <TickIcon />
                </div>
              </div>
              <p className="text-center p-5 text-[#83879B]">
                Your transfer was successful. You can view the details in your
                transaction history.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm();
          }}
          className="bg-[#1F28EB] text-sm py-3 px-10 text-white rounded-md">
          Done
        </button>
      </div>
    );
  }

  return (
    <>
      {isModalOpen ? (
        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          showBottom={false}
          body={
            <div className="gap-3 flex items-center flex-col justify-center">
              <ErrorIcon />
              <h1 className="font-semibold text-2xl">Insufficient Fund</h1>
              <p className="text-center p-5 text-[#83879B]">
                You do not have sufficient balance in your wallet, add money to
                continue transaction
              </p>
            </div>
          }
        />
      ) : null}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full mb-10">
          {formArray.map((v, i) => (
            <React.Fragment key={v.id}>
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-[35px] my-3 text-white rounded-full ${
                    formNo === v.id ||
                    formNo === i + 2 ||
                    formNo === formArray.length
                      ? "bg-[#1F28EB]"
                      : "bg-[#B1B4C3]"
                  } h-[35px] flex justify-center items-center`}>
                  {v.id}
                </div>
                <span
                  className={`absolute -bottom-3 font-medium text-sm ${
                    formNo === v.id ||
                    formNo === i + 2 ||
                    formNo === formArray.length
                      ? "text-[#1F28EB]"
                      : "text-[#B1B4C3]"
                  }`}>
                  {v.title}
                </span>
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`w-[200px] h-[2px] ${
                    formNo === i + 2 || formNo === formArray.length
                      ? "bg-[#1F28EB]"
                      : "bg-[#B1B4C3]"
                  }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="max-w-[468px] w-full rounded-md shadow-sm bg-white border p-5">
          {formNo === 1 && (
            <div>
              <h1 className="text-xl font-bold">Details</h1>
              <div className="w-full mt-3">
                <label className="text-sm font-medium leading-none text-gray-800">
                  From
                </label>
                <FormInput
                  type="text"
                  placeHolderClass="placeholder:text-start text-start"
                  value={state.from}
                  placeholder="Enter Account to debit"
                  name="from"
                  required
                  onChange={inputHandle}
                  error={isButtonClicked && !state.from.trim()}
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="destination">Destination</label>
                <FormInput
                  value={state.destination}
                  onChange={inputHandle}
                  required
                  type="text"
                  name="destination"
                  placeholder="Enter Description"
                  error={isButtonClicked && !state.destination.trim()}
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="batch">Amount</label>
                <FormInput
                  value={state.amount}
                  onChange={inputHandle}
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  required
                  error={isButtonClicked && !state.amount.trim()}
                />
              </div>
              <div className="w-full mt-3">
                <label htmlFor="description">Description</label>
                <textarea
                  className={`p-2 border  mt-1 outline-0 rounded-md w-full ${
                    isButtonClicked && !state.description.trim()
                      ? "border-red-500"
                      : "border-gray-200"
                  } `}
                  name="description"
                  value={state.description}
                  onChange={inputHandle}
                  rows={5}
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={next}
                  className="py-6 text-lg rounded-md w-full text-white bg-[#1F28EB]">
                  Proceed
                </button>
              </div>
            </div>
          )}

          {formNo === 2 && (
            <div>
              <h1 className="text-xl font-bold">Summary</h1>
              <div className="bg-[#FAFAFA] p-2 rounded-md my-4">
                <div className="flex items-center justify-between py-2">
                  <span className="font-bold">Destination Details:</span>
                  <button
                    onClick={previous}
                    className="text-[#0177FD] flex items-center gap-2">
                    <EditIcon />
                    <span className="">Edit</span>
                  </button>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-[#83879B]">From:</span>
                  <span className="col-span-2">{state.from}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-[#83879B] ">Destinaton</span>
                  <span className="text-sm col-span-2">
                    {state.destination}
                  </span>
                </div>
              </div>
              <div className="bg-[#FAFAFA] p-2 rounded-md ">
                <span className="font-bold">Transaction Details:</span>
                <div className="grid grid-cols-3">
                  <span className="text-[#83879B]">Amount:</span>
                  <span className="col-span-2">{state.amount}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-[#83879B] ">Description</span>
                  <span className="text-sm col-span-2">
                    {state.description}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex justify-center items-center">
                <button
                  onClick={next}
                  className="py-6 text-lg rounded-md w-full text-white bg-[#1F28EB]">
                  Confirm and Send
                </button>
              </div>
            </div>
          )}

          {formNo === 3 && (
            <>
              <div className="flex flex-row justify-center text-center my-10">
                <PinInput
                  length={4}
                  initialValue=""
                  secret
                  secretDelay={100}
                  onChange={(value, index) => {
                    setState({ ...state, pin: value });
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
                    setState({ ...state, pin: value });
                  }}
                  autoSelect={true}
                  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
              </div>
              <div className="mb-3">
                {state.pin.length < 4 && (
                  <p className="text-sm text-red-500 text-center">
                    Please Provide your secret transaction pin
                  </p>
                )}
              </div>
              <div className="mt-5 flex justify-center items-center">
                <button
                  onClick={finalSubmit}
                  className="py-6 text-lg rounded-md w-full text-white bg-[#1F28EB]">
                  {loading === "pending" ? (
                    <LoadingIcon width={10} height={10} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FormElements;
