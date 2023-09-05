import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import '../App.css';

export default function Finance() {
  let account = 0;
  let due = 0;
  let [financeItems, setFinanceItems] = useState([]);
  let [showModal, setshowModal] = useState(false);

  useEffect(() => {
    axios.get("/api/finance/read").then(({ data }) => { 
      data = data.sort((a,b)=>{
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      setFinanceItems(data);
    });
  }, []);

  let financeElements = financeItems.map((item) => {
    account += item.amount * (item.status == "PAID" ? 1 : 0)*(item.mode == "RECEIVE" ? 1:-1 );
    due += item.amount * (item.status == "UNPAID" ? 1 : 0)*(item.mode == "RECEIVE" ? 1:-1 );
    return <FinanceItem key={item._id} props={{ item, setFinanceItems }} />;
  });

  return (
    <div 
    className={`min-h-[90dvh] bg-[#121212] flex flex-col overflow-hidden relative duration-200`}>
      {showModal && <Modal
          setshowModal={setshowModal}
          showModal={showModal}
          setFinanceItems={setFinanceItems}
      ></Modal>}
      <div className="p-5 flex justify-evenly ">
        <div className="text-white ">
          Account :{" "}
          <span className={account < 0 ? "text-red-600" : "text-green-600"}>
            {account < 0 ? "-" : "+"}${account}
          </span>
        </div>
        <div className="text-white">
          Due :{" "}
          <span className={due < 0 ? "text-red-600" : "text-green-600"}>
            {due < 0 ? "-" : "+"}${due}
          </span>
        </div>
      </div>
      <div className="h-[70vh] flex flex-col gap-5 overflow-y-scroll">
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
          onClick={() => setshowModal(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

function Modal({ setshowModal, showModal,setFinanceItems }) {
  let INITIAL_FORM = {
    status: "UNPAID",
    mode: "SEND",
    category: "FOOD",
  };
  let [formData, setFormData] = useState(INITIAL_FORM);
  function handleSubmit(e) {
    e.preventDefault();
    axios.post("/api/finance/create", formData).then((res) => {
      if (res.status == 201) {
        toast.success("Successfully added a transaction!");
        setFinanceItems((prev)=>[...prev,res.data]);
      }
    });
    setFormData(INITIAL_FORM);
    setshowModal(false);
  }
  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  return (
    <>
      <div className={`bg-[#0000007f] w-full h-full absolute ${showModal ? ' fade-in':' fade-out'}`}>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg m-5">
          <div className="mb-4">
            <label htmlFor="transactee" className="text-white">
              Transactee
            </label>
            <input
              type="text"
              name="transactee"
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg p-2 w-full transition-opacity duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-white">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg p-2 w-full transition-opacity duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="text-white">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg p-2 w-full transition-opacity duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mode" className="text-white">
              Mode
            </label>
            <select
              name="mode"
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg p-2 w-full transition-opacity duration-300"
              required
            >
              <option value="SEND">SEND</option>
              <option value="RECEIVE">RECEIVE</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="text-white">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="bg-gray-700 text-white rounded-lg p-2 w-full transition-opacity duration-300"
            >
              <option value="FOOD">FOOD</option>
              <option value="TRANSPORT">TRANSPORT</option>
              <option value="GROOMING">GROOMING</option>
              <option value="OTHER">OTHER</option>
              <option value="EDUCATION">EDUCATION</option>
            </select>
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="px-5 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors duration-300"
            >
              SEND
            </button>
            <div
              onClick={() => setshowModal(false)}
              className="px-5 py-2 bg-red-500 text-center rounded-lg text-white cursor-pointer hover:bg-red-600 transition-colors duration-300"
            >
              CANCEL
            </div>
          </div>
         
        </form>
      </div>
    </>
  );
}

function FinanceItem(props) {
  let { item, setFinanceItems } = props.props;
  let createdAt = moment(item.createdAt).format("DD-MM-YYYY @HH:mm");
  let updatedAt = moment(item.updatedAt).format("DD-MM-YYYY @HH:mm");

  function handleDelete() {
    let choice = prompt("Are you sure you want to delete? y | n");
    if (choice != "y") return;
    axios.get("/api/finance/delete/" + item._id).then((res) => {
      if (res.status == 200) {
        toast.success("Deleted Transaction successfully!");
        setFinanceItems((prev)=>{
          return prev.filter((x) => x._id != item._id);
        });
      }
    });
  }
  function handleToggle() {
    let newStatus = item.status == "PAID" ? "UNPAID" : "PAID";
    let data = {
      _id: item._id,
      update: {
        status: newStatus,
      },
    };
    axios.post("/api/finance/update", data).then((res) => {
      setFinanceItems((prev)=>{
        return prev.map((x)=>{
          if(x._id == item._id) return {...x,status:newStatus};
          return x;
        })
      });
    });
  }
  return (
    <>
      <div
        className={`bg-[#000000] p-5 mx-2 border-b-2 ${
          item.mode == "SEND" ? "border-b-red-600" : "border-b-green-600"
        } rounded-xl`}
      >
        <p className="flex justify-between">
          <span className="text-white font-bold">{item.transactee}</span>
          <span className={`font-bold ${item.mode == "SEND" ? "text-red-600" : "text-green-600"}`}>{item.mode == 'SEND' ? '-':'+'}${item.amount}</span>
        </p>
        <p className="text-gray-500">{item.description}</p>
        <p className="text-gray-600">{item.category}</p>

        <div className="flex gap-5">
          <div onClick={handleDelete}>{deleteIcon}</div>
          <div onClick={handleToggle}>
            {item.status == "PAID" ? completedIcon : incompletedIcon}
          </div>
        </div>
        <div className="flex justify-evenly">
          <p className="text-gray-600 text-sm">{createdAt}</p>
          <p className="text-gray-600 text-sm">{updatedAt}</p>
        </div>

      </div>
    </>
  );
}


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