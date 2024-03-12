import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  FriendFormData,
  FriendItem,
  createFriendItem,
  fetchFriendItems,
} from "../features/friendSlice";
import { logoutUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

import brandLogo from "../assets/brand-logo.svg";
import homeButton from "../assets/home-button.svg";
import addButton from "../assets/add-button.svg";
import logoutButton from "../assets/logout-button.svg";

import moment from "moment";

export default function FriendPage() {
  const friendItems = useAppSelector((state) => state.friend.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchFriendItems());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const rowElements = friendItems.map((item) => {
    return <FriendElement key={item._id} item={item} />;
  });

  return (
    <div className="bg-black flex flex-col">
      {/* Top Navbar */}
      {isModalOpen && <Modal closeModal={closeModal} />}

      {/* Middle Section - Finance Items */}
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

function FriendElement({ item }: { item: FriendItem }) {
  // const dispatch = useAppDispatch();
  // function updateStatus(){
  //   // const newItem = {...item,status:newStatus} as FriendItem
  //   // dispatch(updateFriendItem(newItem));
  // }
  // function deleteItem(){
  //   const choice = prompt("Are you sure you want to delete? y/n");
  //   if(choice?.toLowerCase() !== 'y') return;
  //   dispatch(deleteFriendItem(item));
  // }
  return (
    <div className={`text-white grid bg-[#202020] p-5 border-black border-2`}>
      <img src={item.displayImage} alt="" />
      <div className="text-white">
        {item.name}{" "}
        {item.gender == "MALE" ? "♂️" : item.gender == "FEMALE" ? "♀️" : "⚧️"}
      </div>
      <div className="text-white">📞 {item.phoneNumber}</div>
      <div className="text-white">
        🎂 {moment(item.dateOfBirth).format("DD-MM-YYYY")}
      </div>
      <div className="text-white">{item.description}</div>
      {/* <div className="text-white">{item.story}</div> */}
    </div>
  );
}

function FriendForm({ closeModal }: { closeModal: () => void }) {
  const [formData, setFormData] = useState<FriendFormData>({
    name: "",
    phoneNumber: "",
    story: "",
    dateOfBirth: new Date(),
    displayImage: "",
    description: "",
    gender: "OTHER",
  });

  const dispatch = useAppDispatch();
  function handleSubmit() {
    dispatch(createFriendItem(formData));
    closeModal();
  }
  function handleChange(e: { target: { name: any; value: any } }) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleImageSubmission() {}
  return (
    <div className="p-5 bg-gray-700 rounded-xl grid grid-cols-2 gap-5 place-content-center overflow-y-auto">
      <label htmlFor="name" className="text-white">
        Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
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
      <label htmlFor="phoneNumber" className="text-white">
        Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        className="border-black border-2"
        onChange={handleChange}
        required
      />
      <textarea
        name="story"
        className="col-span-2"
        id=""
        cols={30}
        rows={5}
        value={formData.story}
        onChange={handleChange}
      ></textarea>
      <input
        type="file"
        name="inputImage"
        id=""
        onInput={handleImageSubmission}
      />
      <input
        type="date"
        name=""
        id=""
        value={moment(formData.dateOfBirth).format("YYYY-MM-DD")}
        onChange={handleChange}
      />
      <select name="gender" onChange={handleChange} value={formData.gender}>
        <option value="OTHER">OTHER</option>
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
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
        <FriendForm closeModal={closeModal} />
      </div>
    </div>
  );
};
