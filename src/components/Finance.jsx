import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
let deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="red"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

let incompletedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="yellow"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    />
  </svg>
);

let completedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="green"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
    />
  </svg>
);

export default function Finance() {
  let account = 0;
  let owed = 0;
  let [financeItems, setFinanceItems] = useState([
    {
      _id: "1913992139",
      transactee: "Raghul",
      description: "lorem ipsum dolor sit amet, consect",
    },
  ]);

  useEffect(() => {
    axios.get("/api/finance/read").then(({ data }) => {
      setFinanceItems(data);
    });
  }, []);

  let financeElements = financeItems.map((item) => {
    account +=
      item.amount *
      (item.status == "PAID" ? 0 : 1) *
      (item.mode == "SEND" ? -1 : 1);
    owed += item.amount * (item.status == "PAID" ? 0 : 1);
    return <FinanceItem key={item._id} props={{ item }} />;
  });
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col overflow-hidden">
      <div className="p-5 flex justify-evenly">
        <div className="text-white">
          Account :{" "}
          <span className={account < 0 ? "text-red-600" : "text-green-600"}>
            ${account}
          </span>
        </div>
        <div className="text-white">
          Owed :{" "}
          <span className={owed < 0 ? "text-red-600" : "text-green-600"}>
            ${owed}
          </span>
        </div>
      </div>
      <div className="flex-grow flex flex-col gap-5 overflow-y-scroll">
        {financeElements}
      </div>
      <div className="my-auto bg-[#171616] h-[10vh] flex item-center justify-center border-t-gray-700 border-t-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="green"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}

function FinanceItem(props) {
  let { item } = props.props;
  return (
    <>
      <div
        className={`bg-slate-950 p-5 mx-2 border-b-2 ${
          item.mode == "SEND" ? "border-b-red-600" : "border-b-green-600"
        } rounded-xl`}
      >
        <p className="flex justify-between">
          <p className="text-blue-500 font-bold">{item.transactee}</p>
          <p className="text-white">${item.amount}</p>
        </p>
        <p className="text-white">{item.description}</p>
        <p className="">{item.category}</p>
        <div className="flex gap-5">
          <div>{deleteIcon}</div>
          <div>{item.status == "PAID" ? completedIcon : incompletedIcon}</div>
        </div>
      </div>
    </>
  );
}
