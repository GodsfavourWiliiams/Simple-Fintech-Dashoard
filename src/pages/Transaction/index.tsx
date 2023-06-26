// import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { fetchTransactions } from "../../logic/reducers/TransactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { EmptyTransaction, ArrowLeft, ArrowRIght } from "./providerIcons";

const Transactions = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const { payload, loading } = useSelector(
    (state: any) => state.ViewTransaction || {}
  );
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "text-green-500 bg-green-100";
      case "PENDING":
        return "text-yellow-500 bg-yellow-100";
      case "CANCELLED":
        return "text-red-500 bg-red-100";
      default:
        return "";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = payload?.data.transaction.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  return (
    <>
      {/* <Breadcrumb pageName="Transactions" /> */}
      {payload?.data.transaction.length === 0 || loading === "failed" ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <EmptyTransaction />
          <p className="text-gray-400 text-sm mt-4">
            You have no transaction yet
          </p>
        </div>
      ) : null}
      {loading === "pending" ? (
        <div className="mb-10 rounded-sm bg-white shadow-sm p-4 ">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-t-transparent"></div>
          </div>
        </div>
      ) : (
        payload?.data.transaction.length > 0 && (
          <div className="mb-10 rounded-sm bg-white shadow-sm p-4 ">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto ">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b bg-white p-5">
                    <th className="py-5">Reference</th>
                    <th className="py-5">Transaction information</th>
                    <th className="py-5">Amount</th>
                    <th className="py-5">Date</th>
                    <th className="py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y ">
                  {currentResults?.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="py-5">
                        <p className="text-xs ">{item.reference}</p>
                      </td>
                      <td className="py-5 text-sm capitalize">
                        {item.type + " " + item.description}
                      </td>
                      <td className="py-5 text-sm">{item.amount}</td>
                      <td className="py-5 text-sm">
                        {formatDate(item.created_at)}
                      </td>{" "}
                      <td className="py-5 text-xs">
                        <span
                          className={`px-3 py-2 font-semibold leading-tight rounded-md ${getStatusColor(
                            item.status
                          )}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {payload?.data.transaction.length > resultsPerPage ? (
              <div className="flex justify-between mt-4">
                <div className="text-sm text-gray-400">
                  Showing {indexOfFirstResult + 1} to{" "}
                  {Math.min(
                    indexOfLastResult,
                    payload?.data.transaction.length
                  )}{" "}
                  of {payload?.data.transaction.length} results
                </div>
                <div className="flex items-center">
                  <button
                    className={`mr-2 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <ArrowLeft />
                  </button>
                  <div>{`${currentPage} out of ${Math.ceil(
                    payload?.data.transaction.length / resultsPerPage
                  )}`}</div>
                  <button
                    className={`ml-2 ${
                      currentPage ===
                      Math.ceil(
                        payload?.data.transaction.length / resultsPerPage
                      )
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(
                        payload?.data.transaction.length / resultsPerPage
                      )
                    }>
                    <ArrowRIght />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )
      )}
    </>
  );
};

export default Transactions;
