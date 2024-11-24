import { useEffect, useState } from "react";
import {
  arrowRightIcon,
  searchIcon,
  userIcon,
  userPlusIcon,
} from "../assets/assets";
import { useAppDispatch } from "../redux/hooks";
import {
  createFinanceUser,
  fetchFinanceBalance,
  fetchFinanceUsersRegex,
  FinanceUser,
} from "../redux/reducers/financeReducer";
import { showToast } from "../utils";
import { useNavigate } from "react-router-dom";
import { setState } from "../types";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

export default function FinanceDashboard() {
  const [paymentUsers, setPaymentUsers] = useState<FinanceUser[]>([]);
  const [userRegex, setUserRegex] = useState("");
  const showPaymentUsers = userRegex.length > 0;
  return (
    <PageContainer>
      <Navbar setPaymentUsers={setPaymentUsers} setUserRegex={setUserRegex} />
      {showPaymentUsers ? (
        <PaymentUserListDisplay
          paymentUsers={paymentUsers}
          userRegex={userRegex}
        />
      ) : (
        <>
          <BalanceDisplay />
          <RecentDisplay />
          <UnusedDisplay />
        </>
      )}
    </PageContainer>
  );
}

interface NavbarProps {
  setPaymentUsers: setState<FinanceUser[]>;
  setUserRegex: setState<string>;
}
function Navbar({ setPaymentUsers, setUserRegex }: NavbarProps) {
  const dispatch = useAppDispatch();
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const userRegex = e.target.value.toUpperCase();
    setUserRegex(userRegex);
    if (userRegex == "") return;
    dispatch(fetchFinanceUsersRegex(userRegex)).then((response) => {
      if (response.meta.requestStatus == "rejected") {
        showToast("Error fetching users!", "ERROR");
        return;
      }
      setPaymentUsers(response.payload as FinanceUser[]);
    });
  }
  return (
    <div className="w-full h-[10%] flex p-5 items-center my-2 justify-evenly">
      <img src="/brand-logo.svg" className="w-10 h-10"></img>
      <div className="flex w-full justify-center items-center gap-2">
        <span className="text-white">{searchIcon}</span>
        <input
          type="text"
          placeholder="Pay anyone..."
          className="bg-inherit text-white outline-none border-black block border-b-green-600 border-2"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
function BalanceDisplay() {
  const [balance, setBalance] = useState<{ balance: number; due: number }>({
    balance: 0,
    due: 0,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFinanceBalance()).then((request) => {
      if (request.meta.requestStatus == "rejected") return;
      setBalance(request.payload as { balance: number; due: number });
    });
  }, [dispatch]);
  const balance_okay = balance.balance > 0;
  const due_okay = balance.due > 0;
  return (
    <div className="text-white border-[0.5px] border-[#414141] m-2 rounded-xl flex flex-col p-5 gap-5">
      <div>
        <div className="text-sm font-light">Balance</div>
        <div
          className={`text-xl font-bold ${
            balance_okay ? "text-green-600" : "text-red-600"
          }`}
        >
          $ {balance.balance.toLocaleString()}
        </div>
      </div>
      <div>
        <div className="text-sm font-light">Due</div>
        <div
          className={`text-xl font-bold ${
            due_okay ? "text-green-600" : "text-red-600"
          }`}
        >
          $ {balance.due.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
function RecentDisplay() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-white  bg-[#1F1F1F] m-2 rounded-xl flex flex-col p-5 gap-5">
        <div className="flex justify-between">
          <div className="font-bold">Recent Transactees</div>
        </div>
        <div className="grid grid-cols-4 place-items-center">
          <div className="flex flex-col items-center">
            <img src="https://robohash.org/abc" className="rounded-full"></img>
            <div>Name</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://robohash.org/abcd" className="rounded-full"></img>
            <div>Name</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://robohash.org/abce" className="rounded-full"></img>
            <div>Name</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://robohash.org/abcf" className="rounded-full"></img>
            <div>Name</div>
          </div>
        </div>
        <div className="grid grid-cols-4 place-items-center">
          <div className="flex flex-col items-center">
            <img src="https://robohash.org/abcg" className="rounded-full"></img>
            <div>Name</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://robohash.org/abcdh"
              className="rounded-full"
            ></img>
            <div>Name</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://robohash.org/abcei"
              className="rounded-full"
            ></img>
            <div>Name</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://robohash.org/abcfd"
              className="rounded-full"
            ></img>
            <div>Name</div>
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/finance/history");
          }}
          className="text-sm flex self-end gap-5"
        >
          View Transactions <span>{arrowRightIcon}</span>
        </div>
      </div>
    </>
  );
}
function UnusedDisplay() {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate("/finance/analytics");
        }}
        className="text-white text-sm flex mx-5 gap-5"
      >
        View Analytics <span>{arrowRightIcon}</span>
      </div>
    </>
  );
}

interface PaymentUserListDisplayProps {
  paymentUsers: FinanceUser[];
  userRegex: string;
}
function PaymentUserListDisplay({
  paymentUsers,
  userRegex,
}: PaymentUserListDisplayProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const paymentUserList = paymentUsers.map((user) => {
    return (
      <div
        key={user._id}
        onClick={() => {
          navigate(`/finance/checkout/${user._id}`);
        }}
        className="flex items-center gap-2 text-white text-sm font-bold bg-[#161616] p-5 rounded-xl hover:bg-[#1e1e1e] font-sm"
      >
        <span>{userIcon}</span>
        <div>{user.transactee}</div>
      </div>
    );
  });
  if (paymentUserList.length === 0) {
    // New user is added to the list
    const new_user = (
      <div
        key={userRegex}
        onClick={() => {
          dispatch(createFinanceUser(userRegex)).then((response) => {
            if (response.meta.requestStatus == "rejected") {
              return;
            }
            const user = response.payload as FinanceUser;
            navigate(`/finance/checkout/${user._id}`);
          });
        }}
        className="flex items-center gap-2 text-white text-sm font-bold bg-[#161616] p-5 rounded-xl hover:bg-[#1e1e1e] font-sm"
      >
        <span>{userPlusIcon}</span>
        <div>{userRegex}</div>
      </div>
    );
    paymentUserList.push(new_user);
  }
  return (
    <div className="flex-1 overflow-y-scroll flex flex-col p-5 gap-5">
      {paymentUserList}
    </div>
  );
}
