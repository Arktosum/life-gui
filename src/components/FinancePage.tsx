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

import homeButton from "../assets/home-button.svg";
import addButton from "../assets/add-button.svg";
import logoutButton from "../assets/logout-button.svg";
import foodCat from "../assets/food-cat.svg";
import tickSVG from "../assets/tick.svg";
import crossSVG from "../assets/cross.svg";
import trashSVG from "../assets/trash-icon.svg";
import moment from "moment";


export default function FinancePage() {
  const financeItems = useAppSelector((state) => state.finance.items);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFinanceItems());
  }, [dispatch]);
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
    <div className="bg-black flex-1 flex flex-col overflow-y-auto ">
      {/* Top Navbar */}
      {isModalOpen && <Modal closeModal={closeModal} />}
      {/* Middle Section - Finance Items */}
      <div className="font-bold text-white p-4 text-xl">
        Current balance :{" "}
        <span className={amount < 0 ? "text-red-600" : "text-green-600"}>
          ₹ {amount}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 ">
        {rowElements}
      </div>
      <BottomNav openModal={openModal} />
    </div>
  );
}

function BottomNav({ openModal }: { openModal: () => void }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#121212] px-2 py-3 rounded-full flex justify-between sticky bottom-0 m-5">
        <img
          src={homeButton}
          alt="brand-logo"
          width="40"
          className="hover:scale-125 duration-200 ease-in-out"
        />
        <img
          src={addButton}
          alt="brand-logo"
          width="40"
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
          width="40"
          className="hover:scale-125 duration-200 ease-in-out"
        />
      </div>
    </>
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
  const sending = item.mode == "SEND"
  return (
    <div className={`px-5 py-2 flex flex-col gap-2 mx-5 bg-[#101010] rounded-xl ${sending ? 'border-b-red-600' : 'border-b-green-600'} border-b-2`}>
      <div className="flex justify-between gap-5 items-center">
        <img src={foodCat} className="w-[4rem] h-[4rem]"></img>
        <div className="text-white text-xl font-bold">{item.transactee}</div>
        <div className={sending ? 'text-red-600' : 'text-green-600'}>${item.amount}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-white justify-self-start text-sm">{item.description}</div>
        <div className="text-white rounded-full" onClick={updateStatus}><img src={hasPaid? tickSVG : crossSVG} alt="" className="w-10 h-10"/></div>
        <div className="text-white rounded-full" onClick={deleteItem}><img src={trashSVG} alt="" className="w-10 h-10"/></div>
      </div>
      <div className="flex justify-end items-center">
        <div className="text-gray-500 text-sm">{moment(item.updatedAt).format("DD-MM-YYYY || hh:mm:ss")}</div>
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
