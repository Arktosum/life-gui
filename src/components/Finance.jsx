import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Finance() {
  let [financeItems, setfinanceItems] = useState([]);

  useEffect(() => {
    axios.get("/api/finance/read").then((res) => {
      setfinanceItems(res.data);
    });
  }, []);
  let balance = 0;
  let financeElements = financeItems.map((item) => {
    balance += item.amount * (item.mode == "SEND" ? -1 : 1);
    return (
      <FinanceItem
        key={item._id}
        item={item}
        setfinanceItems={setfinanceItems}
      />
    );
  });
  return (
    <div className="h-[90vh] bg-black flex p-5">
      <div className="w-1/4 h-full bg-[#0B0B0B] rounded-xl">
        <div className="text-white text-center text-xl">
          Balance :
          <span
            className={`${balance < 0 ? "text-red-600" : "text-green-600"}`}
          >
            {balance}
          </span>
        </div>
        <InputContainer setfinanceItems={setfinanceItems} />
      </div>
      <div className="w-1/2 h-full">
        <div className="flex flex-col h-full gap-5  p-5 overflow-y-auto">
          {financeElements}
        </div>
      </div>
      <div className="w-1/3 h-full bg-[#191919] rounded-xl mx-5"></div>
      <ToastContainer />
    </div>
  );
}
function FinanceItem({ item, setfinanceItems }) {
  async function deleteItem() {
    await axios.get(`/api/finance/delete/${item._id}`);
    toast.success("Deleted item successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setfinanceItems((prev) =>
      prev.filter((finance) => finance._id != item._id)
    );
  }
  let isSend = item.mode == "SEND";
  return (
    <div
      className={`bg-[#141414] p-2 rounded-xl border-b-2 ${
        isSend ? "border-b-red-600" : "border-b-green-600"
      }`}
    >
      <div className="flex justify-between">
        <div className="text-white text-xl font-bold">{item.transactee}</div>
        <div className={`${isSend ? "text-red-600" : "text-green-600"}`}>
          {isSend ? "-" : "+"}${item.amount}
        </div>
      </div>
      <div>
        <div className="text-[#6e6e6ea8] text-sm">{item.description}</div>
      </div>
      <div className="flex justify-evenly items-center">
        <div className="text-white border-2 border-cyan-600 px-5 py-2 rounded-xl">
          {item.category}
        </div>
        <div className="flex gap-2">
          <div
            onClick={deleteItem}
            className="rounded-full w-5 h-5 hover:scale-125 duration-200 cursor-pointer"
          >
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
          </div>
          <div className="rounded-full w-5 h-5 bg-white"></div>
        </div>
      </div>
    </div>
  );
}
function InputContainer({ setfinanceItems }) {
  const INITIAL_DATA = {
    transactee: "",
    description: "",
    amount: 0,
    status: "UNPAID",
    mode: "SEND",
    category: "FOOD",
  };
  let [formData, setformData] = useState(INITIAL_DATA);

  async function addItem(e) {
    e.preventDefault();
    let { data } = await axios.post("/api/finance/create", formData);
    setfinanceItems((prev) => [...prev, data]);
    setformData(INITIAL_DATA);
    toast.success("Added item successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  return (
    <form onSubmit={addItem} className="flex flex-col gap-5">
      <input
        type="text"
        name="transactee"
        id=""
        value={formData.transactee}
        className="w-fit border-2 border-black"
        onChange={(e) =>
          setformData({ ...formData, transactee: e.target.value })
        }
        required
      />

      <textarea
        type="text"
        name="description"
        id=""
        value={formData.description}
        className="w-fit border-2 border-black"
        onChange={(e) =>
          setformData({ ...formData, description: e.target.value })
        }
        required
      />

      <input
        type="number"
        name="amount"
        id=""
        value={formData.amount}
        className="w-fit border-2 border-black"
        onChange={(e) => setformData({ ...formData, amount: e.target.value })}
        required
      />

      <select
        name="category"
        id=""
        value={formData.category}
        className="w-fit border-2 border-black"
        onChange={(e) => setformData({ ...formData, category: e.target.value })}
      >
        <option value="FOOD">FOOD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="GROOMING">GROOMING</option>
        <option value="OTHER">OTHER</option>
      </select>
      <select
        name="mode"
        id=""
        value={formData.mode}
        className="w-fit border-2 border-black"
        onChange={(e) => setformData({ ...formData, mode: e.target.value })}
      >
        <option value="SEND">SEND</option>
        <option value="RECEIVE">RECEIVE</option>
      </select>

      <button
        className="px-5 py-2 border-2 hover:scale-105
         border-green-600 text-green-600 w-fit rounded-xl hover:bg-green-600 hover:text-white duration-200"
      >
        ADD
      </button>
    </form>
  );
}
