import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  FinanceFormData,
  FinanceItem,
  createFinanceItem,
  deleteFinanceItem,
  fetchFinanceItems,
  updateFinanceItem,
} from "../features/financeSlice";
import { logoutUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

import brandLogo from "../assets/brand-logo.svg";
import homeButton from "../assets/home-button.svg";
import addButton from "../assets/add-button.svg";
import logoutButton from "../assets/logout-button.svg";
import foodCat from "../assets/food-cat.svg";
import tick from "../assets/tick.svg";
import cross from "../assets/cross.svg";

import moment from "moment";
const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="red"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
);

export default function FinancePage() {
  const financeItems = useAppSelector((state) => state.finance.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchFinanceItems());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  let amount = 0;

  const rowElements = financeItems.map((item) => {
    amount +=
      item.amount *
      (item.mode == "RECEIVE" ? 1 : -1) *
      (item.status == "PAID" ? 1 : 0);
    return <FinanceElement key={item._id} item={item} />;
  });

  return (
    <div className="bg-black min-h-[100dvh] flex flex-col">
      {/* Top Navbar */}
      {isModalOpen && <Modal closeModal={closeModal} />}

      {/* Middle Section - Finance Items */}
      <div className="font-bold text-white p-4 text-xl sticky top-10 z-10">
        Current balance :{" "}
        <span className={amount < 0 ? "text-red-600" : "text-green-600"}>
          ₹ {amount}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
        {rowElements}
      </div>

      {/* Bottom Section */}
      <div className="bg-[#121212] p-4 flex justify-between sticky bottom-0 z-10">
        <img
          src={homeButton}
          alt="brand-logo"
          width="50"
          className="hover:scale-125 duration-200 ease-in-out"
        />
        <img
          src={addButton}
          alt="brand-logo"
          width="50"
          className="hover:scale-125 duration-200 ease-in-out"
          onClick={openModal}
        />
        <img
          onClick={() => {
            dispatch(logoutUser());
            navigate("/");
          }}
          src={logoutButton}
          alt="brand-logo"
          width="50"
          className="hover:scale-125 duration-200 ease-in-out"
        />
      </div>
    </div>
  );
}

function FinanceElement({ item }: { item: FinanceItem }) {
  const dispatch = useAppDispatch();
  function updateStatus() {
    const newStatus = item.status == "PAID" ? "UNPAID" : "PAID";
    const newItem = { ...item, status: newStatus } as FinanceItem;
    dispatch(updateFinanceItem(newItem));
  }
  function deleteItem() {
    const choice = prompt("Are you sure you want to delete? y/n");
    if (choice?.toLowerCase() !== "y") return;
    dispatch(deleteFinanceItem(item));
  }
  const hasPaid = item.status == "PAID";

  return (
    <div
      className={`text-white z-10 grid bg-[#0C0C0C] p-5 border-black border-2 ${
        hasPaid ? "border-b-green-600" : "border-b-red-600"
      }`}
    >
      <div className="grid grid-cols-5 place-content-center place-items-center">
        <img src={foodCat} alt="" />
        <div className="font-bold text-md col-span-3">{item.transactee}</div>
        <div className={hasPaid ? "text-green-300" : "text-red-600"}>
          ₹ {item.amount}
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div className="text-sm text-gray-600 col-span-3">
          {item.description}
        </div>
        <img
          src={item.status == "PAID" ? tick : cross}
          className="w-10 h-10"
          alt=""
          onMouseDown={updateStatus}
        />
      </div>
      <div className="grid grid-cols-2 place-items-center">
        <div className="text-sm text-gray-300 font-bold">
          {moment(item.updatedAt).format("DD-MM-YYYY | HH:mm:ss")}
        </div>
        <div onMouseDown={deleteItem}>{deleteIcon}</div>
      </div>
    </div>
  );
}

function FinanceForm({ closeModal }: { closeModal: () => void }) {
  const [formData, setFormData] = useState<FinanceFormData>({
    transactee: "",
    amount: 0,
    description: "",
    category: "OTHER",
    mode: "SEND",
    status: "UNPAID",
  });
  const dispatch = useAppDispatch();
  function handleSubmit() {
    dispatch(createFinanceItem(formData));
    closeModal();
  }
  function handleChange(e: { target: { name: string; value: string } }) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <div className="p-5 bg-gray-700 rounded-xl grid grid-cols-2 gap-5 place-content-center">
      <label htmlFor="transactee" className="text-white">
        Transactee
      </label>
      <input
        type="text"
        name="transactee"
        value={formData.transactee}
        className="border-black border-2"
        onChange={handleChange}
        required
      />
      <label htmlFor="amount" className="text-white">
        Amount
      </label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        className="border-black border-2"
        onChange={handleChange}
        required
      />
      <label htmlFor="description" className="text-white">
        Description
      </label>
      <input
        type="text"
        name="description"
        value={formData.description}
        className="border-black border-2"
        onChange={handleChange}
        required
      />
      <select name="category" onChange={handleChange} value={formData.category}>
        <option value="OTHER">OTHER</option>
        <option value="FOOD">FOOD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="GROOMING">GROOMING</option>
      </select>
      <select name="mode" onChange={handleChange} value={formData.mode}>
        <option value="SEND">SEND</option>
        <option value="RECEIVE">RECEIVE</option>
      </select>
      <button
        onClick={handleSubmit}
        className="px-5 py-2 rounded-xl text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-black duration-200 ease-in-out hover:scale-105"
      >
        SUBMIT
      </button>
      <button
        onClick={closeModal}
        className="px-5 py-2 rounded-xl text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-black duration-200 ease-in-out hover:scale-105"
      >
        CANCEL
      </button>
    </div>
  );
}

const Modal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10">
        <FinanceForm closeModal={closeModal} />
      </div>
    </div>
  );
};
