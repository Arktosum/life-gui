import { useEffect, useState } from "react";
import { setState } from "../../app/types";
import { useAppDispatch } from "../../app/hooks";
import {
  createFinanceUser,
  searchFinanceUsers,
  FinanceUser,
} from "../../features/financeUserSlice";
import { useNavigate } from "react-router";
import {
  fetchAllTransactions,
  Transaction,
} from "../../features/transactionSlice";
import moment from "moment";
// import { RootState } from "../../app/store";
// import { useAppSelector } from "../../app/hooks";

export default function FinanceDashboard() {
  const [searchUser, setSearchUser] = useState("");
  const [regexUsers, setRegexUsers] = useState<FinanceUser[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const { loading, error } = useAppSelector(
  //   (state: RootState) => state.FinanceUsers
  // );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchFinanceUsers({ username: searchUser })).then((action) => {
      setRegexUsers(action.payload as FinanceUser[]);
    });
    dispatch(fetchAllTransactions()).then((action) => {
      setTransactions(action.payload as Transaction[]);
    });
  }, [dispatch, searchUser]);

  let income = 0;
  let expense = 0;

  for (const transaction of transactions) {
    const isPaid = transaction.status == "PAID";
    const isSend = transaction.mode == "SEND";
    const isInCurrentMonth = moment(transaction.completedAt).isSame(
      moment(),
      "month"
    );
    if (!isInCurrentMonth) continue;
    if (isSend) {
      expense += transaction.amount * (isPaid ? 1 : 0);
    } else {
      income += transaction.amount * (isPaid ? 1 : 0);
    }
  }
  return (
    <>
      <div className="min-h-[100dvh] bg-black overflow-hidden">
        <Header />
        <div className="m-2 flex flex-col gap-2">
          <SearchBar setSearchUser={setSearchUser} />
          {searchUser ? (
            <SearchUserContent
              regexUsers={regexUsers}
              searchUser={searchUser}
            />
          ) : (
            <>
              <BalanceDisplayGroup income={income} expense={expense} />
              <RecentFinancesGroup />
            </>
          )}
          <BottomNav />
        </div>
      </div>
    </>
  );
}

function SearchUserContent({
  searchUser,
  regexUsers,
}: {
  searchUser: string;
  regexUsers: FinanceUser[];
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userElements = regexUsers.map((item) => {
    return (
      <div
        key={item._id}
        onClick={() => {
          navigate(`/finance/payment/${item._id}`);
        }}
        className="flex items-center gap-2 bg-[#1C1C1C] p-3 rounded-xl"
      >
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="text-white">{item.username}</div>
      </div>
    );
  });

  if (regexUsers.length == 0) {
    userElements.push(
      <div
        onClick={() => {
          dispatch(createFinanceUser({ username: searchUser })).then(
            (action) => {
              const new_created_user = action.payload as FinanceUser;
              navigate(`/finance/payment/${new_created_user._id}`);
            }
          );
        }}
        className="flex items-center gap-2 bg-[#1C1C1C] p-3 rounded-xl"
      >
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="text-white">ADD : {searchUser}</div>
      </div>
    );
  }
  return <div className="flex-1 flex flex-col gap-2">{userElements}</div>;
}
export function Header() {
  return (
    <div className="flex items-center justify-between p-2">
      <img src="/brand.svg" alt="" />
      <div className="bg-white w-10 h-10 rounded-full"></div>
    </div>
  );
}

export function BottomNav() {
  return (
    <div className="bg-[#1C1C1C] flex justify-center items-center rounded-xl">
      <img src="/homeIcon.svg" alt="" className="p-5" />
    </div>
  );
}

function SearchBar({ setSearchUser }: { setSearchUser: setState<string> }) {
  return (
    <div className="rounded-xl px-5 py-2 bg-[#1C1C1C] gap-2 flex items-center flex-1">
      <img src="searchIcon.svg" className="w-5 h-5"></img>
      <input
        onChange={(e) => {
          setSearchUser(e.target.value.toUpperCase());
        }}
        type="text"
        className="w-full p-2 text-white outline-none"
        placeholder="Pay Anyone..."
      />
    </div>
  );
}

function BalanceDisplayGroup({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const balance = income - expense;
  return (
    <div className="flex flex-col gap-2 bg-[#1C1C1C] flex-1">
      <div className="bg-gradient-to-br from-[#00ffd9] via-[#0240fa] to-[#fd0000] p-6 rounded-xl">
        <div className="text-white text-sm">Current Balance</div>
        <div className="font-bold text-white text-3xl">
          {balance < 0 ? "-" : "+"}₹ {Math.abs(balance)}
        </div>
      </div>
      <div className=" flex gap-2 justify-evenly">
        <div className="income bg-gradient-to-tr from-[#1d2118]  to-[#00ff00] flex-1 p-5 rounded-xl">
          <div className="flex justify-between">
            <div className="text-white text-sm">Income</div>
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div className="font-bold text-white text-2xl">₹ {income}</div>
        </div>
        <div className="expense bg-gradient-to-tr from-[#1d2118]  to-[#ff0000] flex-1 p-5 rounded-xl">
          <div className="flex justify-between">
            <div className="text-white text-sm">Expense</div>
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div className="font-bold text-white text-2xl">₹ {expense}</div>
        </div>
      </div>
    </div>
  );
}

function RecentFinancesGroup() {
  const navigate = useNavigate();

  const recent_users = [1, 2, 3, 4, 5, 6, 7, 8];

  const gridElements = recent_users.map((item) => {
    return (
      <div key={item} className="flex flex-col gap-2 items-center">
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="text-white">{item}</div>
      </div>
    );
  });
  return (
    <div className="bg-[#1C1C1C] flex flex-col gap-5 p-5 rounded-xl">
      <div className="flex justify-between">
        <div className="text-white">Recent Finances</div>
        <div
          onClick={() => {
            navigate("/finance/history");
          }}
          className="text-white font-bold"
        >
          View History
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">{gridElements}</div>
    </div>
  );
}
