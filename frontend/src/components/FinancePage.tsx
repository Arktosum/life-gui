import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  createFinanceUser,
  fetchUsersByRegex,
  FinanceUser,
} from "../features/financeSlice";
const addIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export default function FinancePage() {
  const [searchUserName, setsearchUserName] = useState("");
  const [searchedUsers, setsearchedUsers] = useState<FinanceUser[]>([]);
  const dispatch = useAppDispatch();

  async function handleNewUserCreate() {
    dispatch(createFinanceUser(searchUserName));
  }
  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setsearchUserName(e.target.value);
    const response = await dispatch(fetchUsersByRegex(searchUserName));
    if (response.meta.requestStatus == "fulfilled") {
      setsearchedUsers(response.payload as FinanceUser[]);
    }
  }
  const searchUserElements = searchedUsers.map((item) => {
    return (
      <div
        id={item._id}
        className="grid grid-cols-2 w-full place-items-center gap-5 p-5 border-black border-b-green-600 border-2  bg-[#131313] hover:bg-[#262626] duration-200 ease-in-out"
      >
        <div className="text-left">{item.transactee.toUpperCase()}</div>
        <div>{item.transactions.length}</div>
      </div>
    );
  });
  const duplicate = searchedUsers.filter(
    (item) => item.transactee.toUpperCase() == searchUserName.toUpperCase()
  );

  if (searchUserName != "" && duplicate.length == 0) {
    searchUserElements.push(
      <div
        key={searchUserName}
        onClick={handleNewUserCreate}
        className="flex place-items-center gap-5 p-5 border-black border-b-green-600 border-2  bg-[#131313] hover:bg-[#262626] duration-200 ease-in-out"
      >
        {addIcon}
        <div className="text-left">ADD '{searchUserName}'</div>
      </div>
    );
  }
  const BALANCE = 1000;
  const theRed = BALANCE < 0;

  return (
    <div className="h-[100dvh] bg-black flex flex-col items-center justify-center">
      <div className="top-nav h-[10%] flex justify-end p-2 gap-5">
        <img src={"/logo.svg"} alt="" className="borderize" />
        <input
          value={searchUserName}
          type="text"
          id="regex"
          name="regex"
          placeholder=""
          onChange={handleInput}
          className="appearance-none px-5 w-full h-full bg-inherit border-[1px] border-cyan-500 rounded-xl text-white text-sm"
        />
      </div>
      <div className="text-center text-xl p-5 font-bold text-white">
        Balance <span className="text-green-600">|</span>{" "}
        <span className={theRed ? "text-red-600" : "text-green-300"}>
          {theRed ? "-" : "+"} ${BALANCE}
        </span>
      </div>
      <div className="content w-full h-[10%]  flex-1 text-white flex flex-col gap-5 overflow-y-auto">
        {searchUserElements}
      </div>
      <div className="bottom-nav borderize h-[10%] w-full"></div>
    </div>
  );
}
