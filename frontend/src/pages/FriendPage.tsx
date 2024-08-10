import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchAllFriendUsers,
  FriendUser,
  updateFriendUserById,
} from "../redux/reducers/friendReducer";
import moment from "moment";
import { setState } from "../types";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}
const GENDER = {
  MALE: {
    displayPicture: "placeholder-male.jpg",
    icon: "♂️",
  },
  FEMALE: {
    displayPicture: "placeholder-female.jpg",
    icon: "♀️",
  },
  OTHER: {
    displayPicture: "placeholder-other.jpg",
    icon: "⚧️",
  },
};
export default function FriendPage() {
  const dispatch = useAppDispatch();
  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<FriendUser | null>(null);
  const [showModal, setshowModal] = useState(false);
  useEffect(() => {
    dispatch(fetchAllFriendUsers()).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setFriends(action.payload as FriendUser[]);
      }
    });
  }, [dispatch, setSelectedUser]);

  const friendItems = friends.map((item) => {
    return (
      <FriendItem
        key={item._id}
        item={item}
        setshowModal={setshowModal}
        setSelectedUser={setSelectedUser}
      />
    );
  });
  return (
    <PageContainer>
      {showModal && selectedUser && (
        <Modal
          setshowModal={setshowModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      <div className="flex flex-col overflow-y-auto gap-5">{friendItems}</div>
    </PageContainer>
  );
}

function Modal({
  setshowModal,
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: FriendUser | null;
  setSelectedUser: setState<FriendUser | null>;
  setshowModal: setState<boolean>;
}) {
  const [friendForm, setfriendForm] = useState<FriendUser>(
    selectedUser ?? ({ name: "" } as FriendUser)
  );
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setfriendForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  const dispatch = useAppDispatch();
  function handleSubmit() {
    dispatch(updateFriendUserById(friendForm)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setSelectedUser(null);
        setshowModal(false);
      }
    });
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleImageClick() {
    fileInputRef.current?.click();
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setfriendForm((prev) => {
          return { ...prev, displayImage: base64String as string };
        });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }
  return (
    <div className="absolute w-screen h-[100dvh] bg-[#0000009b] flex justify-center items-center p-5">
      <div className="bg-[#181818] flex flex-col justify-center items-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className=""
          onChange={handleImageChange}
        />
        {friendForm?.displayImage && (
          <img
            onClick={handleImageClick}
            src={
              friendForm.displayImage != ""
                ? friendForm.displayImage
                : GENDER[friendForm.gender].displayPicture
            }
            alt=""
            className="w-[50%]"
          />
        )}
        <input
          className="bg-[#1a1a1a] text-white w-full px-5 py-2"
          type="text"
          name="name"
          value={friendForm?.name}
          onChange={handleChange}
        />
        <input
          className="bg-[#1a1a1a] text-white w-full px-5 py-2"
          type="text"
          name="phoneNumber"
          placeholder="+91 ...."
          value={friendForm?.phoneNumber}
          onChange={handleChange}
        />
        <input
          className="bg-[#1a1a1a] text-white w-full px-5 py-2"
          type="text"
          name="description"
          placeholder="description..."
          value={friendForm?.description}
          onChange={handleChange}
        />
        <input
          className="bg-[#1a1a1a] text-white w-full px-5 py-2"
          type="text"
          name="story"
          placeholder="story.."
          value={friendForm?.story}
          onChange={handleChange}
        />
        <input
          className="bg-[#1a1a1a] text-white w-full px-5 py-2"
          type="date"
          name="dateOfBirth"
          value={moment(friendForm?.dateOfBirth).format("YYYY-MM-DD")}
          onChange={handleChange}
        />
        <select
          className="bg-[#1a1a1a] text-white w-full px-5 py-2"
          name="gender"
          value={friendForm?.gender}
          onChange={handleChange}
        >
          <option value="OTHER">OTHER</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <div className="flex justify-evenly my-2">
          <button
            onClick={handleSubmit}
            className="text-green-600 border-2 border-green-600 px-5 py-2 uppercase"
          >
            Send
          </button>
          <button
            onClick={() => {
              setSelectedUser(null);
              setshowModal(false);
            }}
            className="text-red-600 border-2 border-red-600 px-5 py-2 uppercase"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
function FriendItem({
  item,
  setshowModal,
  setSelectedUser,
}: {
  item: FriendUser;
  setSelectedUser: setState<FriendUser | null>;
  setshowModal: setState<boolean>;
}) {
  const age = moment().diff(moment(item.dateOfBirth), "years");

  return (
    <div
      onClick={() => {
        setshowModal(true);
        setSelectedUser(item);
      }}
      className="m-2 p-5 bg-[#1c1c1c] rounded-lg"
    >
      <img
        src={
          item.displayImage != ""
            ? item.displayImage
            : GENDER[item.gender].displayPicture
        }
        alt=""
      />
      <div className="p-5">
        <div className="flex justify-between">
          <div className="text-white">{item.name}</div>
          <div className="text-gray-600 text-sm">
            {GENDER[item.gender].icon}
          </div>
        </div>
        <div>
          <div className="text-gray-600 text-sm">{item.description}</div>
          <div className="text-gray-600">
            🎂 {moment(item.dateOfBirth).format("DD-MM-YYYY")}{" "}
            {`(${age} years old)`}
          </div>
        </div>
      </div>
    </div>
  );
}
