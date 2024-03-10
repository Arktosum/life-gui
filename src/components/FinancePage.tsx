import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  FinanceFormData,
  FinanceItem,
  createFinanceItem,
  fetchFinanceItems,
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

export default function FinancePage() {
  const financeItems = useAppSelector((state) => state.finance.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchFinanceItems());
  }, []);

  return (
    <div className="bg-black min-h-[100dvh] flex flex-col">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between bg-[#121212] p-4 sticky top-0 z-10">
        {/* Hamburger Icon */}
        <button className="text-white focus:outline-none hover:scale-125 duration-200 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {/* Brand Logo SVG */}
        <img src={brandLogo} alt="brand-logo" width="100" />
      </nav>

      {/* Middle Section - Finance Items */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
        {financeItems.map((item) => (
          <FinanceElement key={item._id} item={item} />
        ))}
        {financeItems.map((item) => (
          <FinanceElement key={item._id} item={item} />
        ))}
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
        />
        <img
          onClick={() => {
            dispatch(logoutUser());
            navigate("/login");
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
  return (
    <div className="text-white grid bg-[#0C0C0C] p-5 border-black border-b-red-600 border-2">
      <div className="grid grid-cols-5 place-content-center place-items-center">
        <img src={foodCat} alt="" />
        <div className="font-bold text-md col-span-3">{item.transactee}</div>
        <div>${item.amount}</div>
      </div>
      <div className="grid grid-cols-4">
        <div className="text-sm text-gray-600 col-span-3">{item.description}</div>
        <img src={tick} className="w-10 h-10" alt="" />
      </div>
      <div className="grid grid-cols-1">
        <div className="text-sm text-blue-300">{moment(item.updatedAt).format("DD-MM-YYYY | HH:mm:ss")}</div>
      </div>
    </div>
  );
}

function FinanceForm() {
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
  }
  function handleChange(e: ChangeEvent<HTMLElement>) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div>
      <input
        type="text"
        name="transactee"
        value={formData.transactee}
        className="border-black border-2"
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        className="border-black border-2"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        className="border-black border-2"
        onChange={handleChange}
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
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
