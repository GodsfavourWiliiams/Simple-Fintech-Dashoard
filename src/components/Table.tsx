const TableOne = () => {
  const tableData = [
    {
      id: "TRUD9393BJEKFN",
      date: "19 July  4:30 PM",
      amount: "NGN 3,041,730",
      status: "Success",
      color: "bg-green-200 text-[#52C41A]",
    },
    {
      id: "HYUD9393BJEKFN",
      date: "19 July  4:30 PM",
      amount: "USD 30,400",
      status: "Pending",
      color: "bg-[#FAAD141A] text-[#FAAD14]",
    },
    {
      id: "TRUD9393BJEKFN",
      date: "19 July  4:30 PM",
      amount: "GBP 65,000",
      status: "Canceled",
      color: "bg-[#FC34001A] text-[#F5222D]",
    },
    {
      id: "IUJK9393BJEKFN",
      date: "19 July  4:30 PM",
      amount: "USD 30,400",
      status: "Success",
      color: "bg-green-200 text-[#52C41A]",
    },
    {
      id: "IUJK9393BJEKFN",
      date: "19 July  4:30 PM",
      amount: "USD 30,400",
      status: "Success",
      color: "bg-green-200 text-[#52C41A]",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-sm bg-white">
      <div className="w-full overflow-x-auto p-4">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-base font-semibold text-back">Transaction</h1>
            </div>
            <div className="flex items-center">
              <button className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-[#83879B] transition-colors duration-150 bg-[#F5F5F5] border border-transparent rounded-md ">
                View All
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.63525 9.96411L8.85353 6.74584L5.63525 3.52757"
                    stroke="#83879B"
                    strokeWidth="1.20685"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b bg-white p-5">
              <th className="py-5">ID</th>
              <th className="py-5">Date</th>
              <th className="py-5">Amount</th>
              <th className="py-5">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y ">
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="py-5">
                  <p className="text-xs ">{item.id}</p>
                </td>
                <td className="py-5 text-sm">{item.date}</td>
                <td className="py-5 text-sm">{item.amount}</td>{" "}
                <td className="py-5 text-xs">
                  <span
                    className={`px-3 py-2 font-semibold leading-tight ${item.color} rounded-md`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOne;
