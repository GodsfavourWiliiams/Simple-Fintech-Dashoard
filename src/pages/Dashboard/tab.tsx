import { useState } from "react";
import { FormInput } from "../../components/form";

export const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap w-full">
        <div className="w-full">
          <ul className="flex list-none flex-wrap flex-row bg-white border-[#F7F9FA] border-[0.5px] rounded-md p-1">
            <li className=" flex-auto text-center cursor-pointer">
              <span
                className={
                  "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                  (openTab === 1
                    ? " bg-[#F7F9FA] shadow-sm rounded-md"
                    : "bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}>
                Add money
              </span>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <span
                className={
                  "text-xs text-black  font-bold uppercase px-5 py-3 block leading-normal " +
                  (openTab === 2
                    ? " bg-[#F7F9FA] shadow-sm rounded-md"
                    : "bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}>
                Withdraw
              </span>
            </li>
          </ul>
          <div className="relative mt-8 flex flex-col break-words bg-white w-full">
            <div className="flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="w-full flex flex-col gap-6">
                    <label className="text-sm font-medium leading-none text-gray-800">
                      Amount
                    </label>{" "}
                    <select className="bg-[#F7F9FA] w-fit rounded-md p-3 outline-none border-[#F7F9FA]">
                      <option value="volvo">Main</option>
                      <option value="saab">Saab</option>
                      <option value="opel">Opel</option>
                      <option value="audi">Audi</option>
                    </select>
                    <FormInput
                      type="text"
                      placeHolderClass="placeholder:text-start text-[11px] text-start"
                      placeholder="Enter Amount"
                      required
                      value=""
                      onChange={(e) => e.target.value}
                      className="bg-[#F7F9FA] mt-5 rounded-md w-full p-3 outline-none border-[#F7F9FA]"
                    />
                  </div>
                  <button className="w-full mt-8 rounded-lg border bg-[#1F28EB] py-4 text-[18px] font-semibold leading-none text-white hover:bg-blue-600">
                    Add
                  </button>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <p>Tab Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
