// Note: Dashboard Page
import { useEffect } from "react";
import { getTransactionSummary } from "../../logic/reducers/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import StatCard from "./statCard";
import LineChart from "../../components/chart";
import TableOne from "../../components/Table";
import { Tabs } from "./tab";

const Index = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { payload, loading } = useSelector(
    (state: any) => state.TransactionSummary || {}
  );

  let titleValuePairs = [];

  if (payload && payload.data && payload.data.data) {
    titleValuePairs = Object.entries(payload.data.data).map(
      ([title, value]) => ({
        title,
        value,
      })
    );
  }

  useEffect(() => {
    dispatch(getTransactionSummary());
  }, [dispatch]);

  return (
    <>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"> */}
      <div
        className={`relative grid ${
          loading === "pending" && " animate-pulse w-full"
        } gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4`}>
        {loading === "pending" ? (
          <>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
          </>
        ) : (
          titleValuePairs.map((item: any, index: number) => (
            <StatCard key={index} title={item.title} value={item.value} />
          ))
        )}
        {loading === "failed" && (
          <>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
            <div className="w-full bg-gray-300 h-40 rounded-md "></div>
          </>
        )}
      </div>
      <LineChart />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-6 gap-6 ">
        <div className="col-span-2">
          <TableOne />
        </div>

        <div className="bg-white rounded-md p-3 w-full">
          <h1 className="font-semibold">Quick Transaction</h1>
          <div className="mt-8 ">
            <Tabs color="#F7F9FA" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
