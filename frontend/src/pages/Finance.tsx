import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  createFinanceUser,
  fetchAllTransactions,
  fetchFinanceUsersRegex,
  FinanceUser,
  Transaction,
} from "../redux/reducers/financeReducer";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

export default function Finance() {
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [financeUsers, setFinanceUsers] = useState<FinanceUser[]>([]);
  const [financeUserRegex, setFinanceUserRegex] = useState<string>("");
  useEffect(() => {
    dispatch(fetchAllTransactions()).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setTransactions(action.payload as Transaction[]);
      }
    });
  }, [dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const userRegex = e.target.value.toUpperCase();
    setFinanceUserRegex(userRegex);
    if (userRegex == "") {
      return;
    }
    dispatch(fetchFinanceUsersRegex(userRegex)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setFinanceUsers(action.payload as FinanceUser[]);
      }
    });
  }
  function handleCreateFinanceUser() {
    dispatch(createFinanceUser(financeUserRegex)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setFinanceUsers((prev) => [action.payload as FinanceUser, ...prev]);
      }
      setFinanceUserRegex("");
    });
  }
  let balance = 0;
  const transactionElements = transactions.map((item) => {
    const isSending = item.mode == "SEND";
    balance += item.amount * (isSending ? -1 : 1);
    return <TransactionItem key={item._id} item={item} />;
  });
  const financeUserElements = financeUsers.map((item) => {
    return <FinanceUserItem key={item._id} item={item} />;
  });
  if (financeUserElements.length == 0) {
    financeUserElements.push(
      <div key={0} onClick={handleCreateFinanceUser} className="text-white">
        Add {financeUserRegex} as a new user!
      </div>
    );
  }

  return (
    <PageContainer>
      <header className="h-[10%] flex flex-col">
        <input
          type="text"
          className="m-5 bg-[#1f1f1f] justify-center items-center rounded-xl border-2 border-green-600 text-white px-5 py-2"
          value={financeUserRegex}
          onChange={handleChange}
        />
      </header>
      <main className="flex-1 overflow-scroll">
        <div className="text-xl text-white self-center">
          Balance :{" "}
          <span
            className={`${balance < 0 ? "text-red-500" : "text-green-600"}`}
          >
            ₹ {balance}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          {financeUserRegex == "" ? transactionElements : financeUserElements}
        </div>
      </main>
      <footer className="h-[10%] grid grid-cols-3 place-items-center">
        <Link to="/finance/analytics">
          <div className="w-10 h-10 rounded-full bg-gray-600 grid place-items-center">
            A
          </div>
        </Link>
        <div className="w-10 h-10 rounded-full bg-gray-600 grid place-items-center">
          A
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-600 grid place-items-center">
          A
        </div>
      </footer>
    </PageContainer>
  );
}

function TransactionItem({ item }: { item: Transaction }) {
  const transactee = item.transactee as FinanceUser;
  const navigate = useNavigate();
  const isSending = item.mode == "SEND";
  return (
    <div
      onClick={() => {
        navigate(`/finance/info/${item._id}`);
      }}
      className={`bg-[#141414] p-5 m-2 rounded-xl border-b-2 ${
        isSending ? "border-b-red-600" : "border-b-green-600"
      } `}
    >
      <div className="flex justify-between text-nowrap">
        <div className="text-white font-bold">
          {transactee.transactee as string}
        </div>
        <div className={`${isSending ? "text-red-500" : "text-green-600"}`}>
          ₹ {item.amount}
        </div>
      </div>
      <div>
        <div className="text-yellow-500">{item.remarks}</div>
      </div>
      <div>
        <div className="text-sm text-gray-600">
          {moment(item.updatedAt).toString()}
        </div>
      </div>
    </div>
  );
}

function FinanceUserItem({ item }: { item: FinanceUser }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/finance/payment/${item._id}`);
  }
  return (
    <div onClick={handleClick} className="text-white">
      {item.transactee}
    </div>
  );
}
