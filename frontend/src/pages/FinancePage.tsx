import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  createFinanceUser,
  fetchRecentUsers,
  fetchUsersByRegex,
  FinanceUser,
} from "../features/financeSlice";
import { Link, useNavigate } from "react-router-dom";
import { addIcon, homeIcon, userIcon, historyIcon } from "../app/assets";

export default function FinancePage() {
  const [searchUserName, setsearchUserName] = useState("");
  const [searchedUsers, setsearchedUsers] = useState<FinanceUser[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (searchUserName != "") return;
    dispatch(fetchRecentUsers()).then((response) => {
      setsearchedUsers(response.payload as FinanceUser[]);
    });
  }, [dispatch, searchUserName, setsearchedUsers]);
  return (
    <PageContainer>
      <TopNav
        searchUserName={searchUserName}
        setsearchUserName={setsearchUserName}
        setsearchedUsers={setsearchedUsers}
      />
      <Content
        searchUserName={searchUserName}
        setsearchedUsers={setsearchedUsers}
        searchedUsers={searchedUsers}
      />
      <BottomNav />
    </PageContainer>
  );
}

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

function TopNav({
  searchUserName,
  setsearchUserName,
  setsearchedUsers,
}: {
  searchUserName: string;
  setsearchUserName: React.Dispatch<React.SetStateAction<string>>;
  setsearchedUsers: React.Dispatch<React.SetStateAction<FinanceUser[]>>;
}) {
  const dispatch = useAppDispatch();

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchUsername = e.target.value;
    if (newSearchUsername == "") {
      setsearchUserName("");
      return;
    }
    setsearchUserName(newSearchUsername.toUpperCase());

    const response = await dispatch(
      fetchUsersByRegex(newSearchUsername.toUpperCase())
    );
    if (response.meta.requestStatus == "fulfilled") {
      setsearchedUsers(response.payload as FinanceUser[]);
    }
  }
  return (
    <div className="top-nav h-[10%] flex justify-between p-2 gap-5 bg-[#171717] mb-5">
      <img src={"/logo.svg"} alt="" className="" />
      <input
        value={searchUserName}
        type="text"
        id="regex"
        name="regex"
        placeholder="Pay Anyone!"
        onChange={handleInput}
        className=" px-5 w-full  bg-[#222222] py-3 self-center rounded-3xl text-white text-sm"
      />
    </div>
  );
}

function Content({
  searchUserName,
  searchedUsers,
}: {
  searchUserName: string;
  setsearchedUsers: React.Dispatch<React.SetStateAction<FinanceUser[]>>;
  searchedUsers: FinanceUser[];
}) {
  const searchUserElements = searchedUsers.map((item) => {
    return <FinanceItem key={item._id} item={item} />;
  });
  const addExtraUserElement = (
    <FinanceNewItem
      searchUserName={searchUserName}
      searchedUsers={searchedUsers}
    />
  );

  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate("/finance/analytics");
        }}
        className="text-right px-5 py-2 font-bold text-white"
      >
        Go to analytics -&gt;
      </div>
      <div className="content w-full h-[10%] p-5 flex-1 text-white flex flex-col gap-5 overflow-y-auto">
        {searchUserElements}
        {addExtraUserElement}
      </div>
    </>
  );
}
function FinanceNewItem({
  searchUserName,
  searchedUsers,
}: {
  searchUserName: string;
  searchedUsers: FinanceUser[];
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleNewUserCreate() {
    const response = await dispatch(
      createFinanceUser(searchUserName.toUpperCase())
    );
    if (response.meta.requestStatus == "fulfilled") {
      const user = response.payload as FinanceUser;
      navigate(`/finance/${user._id}`);
    }
  }
  const duplicate = searchedUsers.filter(
    (item) => item.transactee == searchUserName
  );

  if (searchUserName != "" && duplicate.length == 0) {
    return (
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
  return <></>;
}
function FinanceItem({ item }: { item: FinanceUser }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/finance/${item._id}`);
      }}
      key={item._id}
      className="grid grid-cols-2 w-full rounded-xl place-items-center gap-5 p-5 border-black border-b-green-600 border-2  bg-[#111111] hover:bg-[#262626] duration-200 ease-in-out"
    >
      <div className="text-left font-bold">{item.transactee}</div>
      <div className="text-[#4e4e4e] text-sm">
        {item.transactions.length} Transactions
      </div>
    </div>
  );
}
function BottomNav() {
  return (
    <div className="bottom-nav h-[10%] w-full bg-[#171717] text-white flex justify-evenly items-center">
      <Link to="/dashboard">
        <div className="bg-[#0e0e0e] p-4 rounded-full">{homeIcon}</div>
      </Link>
      <Link to="/finance">
        <div className="bg-[#414141] p-4 rounded-full">{userIcon}</div>
      </Link>
      <Link to="/finance/history">
        <div className="bg-[#0e0e0e] p-4 rounded-full">{historyIcon}</div>
      </Link>
    </div>
  );
}
