import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  createFinanceUser,
  fetchAllTransactions,
  fetchFinanceUsersRegex,
  FinanceUser,
  Transaction,
  updateTransactionById,
} from "../redux/reducers/financeReducer";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { setState } from "../types";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

const UNPAID_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="yellow"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
    />
  </svg>
);

const PAID_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="green"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  </svg>
);

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
  let due = 0;
  const transactionElements = transactions.map((item) => {
    const isSending = item.mode == "SEND";
    balance +=
      item.amount * (isSending ? -1 : 1) * (item.status == "PAID" ? 1 : 0);
    due +=
      item.amount * (isSending ? -1 : 1) * (item.status == "UNPAID" ? 1 : 0);
    return (
      <TransactionItem
        setTransactions={setTransactions}
        key={item._id}
        item={item}
      />
    );
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
      <main className="flex-1 overflow-y-scroll">
        <div className="text-xl text-white self-center">
          <div className="flex gap-5">
            <div> Balance :</div>
            <span
              className={`${balance < 0 ? "text-red-500" : "text-green-600"}`}
            >
              ₹ {balance}
            </span>
          </div>
          <div className="flex gap-5">
            <div> Due :</div>
            <span className={`${due < 0 ? "text-red-500" : "text-green-600"}`}>
              ₹ {due}
            </span>
          </div>
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
        <Link to="/">
          <div className="w-10 h-10 rounded-full bg-gray-600 grid place-items-center">
            A
          </div>
        </Link>
        <div className="w-10 h-10 rounded-full bg-gray-600 grid place-items-center">
          A
        </div>
      </footer>
    </PageContainer>
  );
}

function TransactionItem({
  item,
  setTransactions,
}: {
  item: Transaction;
  setTransactions: setState<Transaction[]>;
}) {
  const transactee = item.transactee as FinanceUser;
  const navigate = useNavigate();
  const isSending = item.mode == "SEND";
  const dispatch = useAppDispatch();
  function handleStatusChange(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const data = {
      ...item,
      status: item.status == "PAID" ? "UNPAID" : "PAID",
    } as Transaction;
    dispatch(updateTransactionById(data)).then((action) => {
      const result = action.payload as Transaction;
      setTransactions((prev) => {
        return prev.map((prev_item) => {
          return prev_item._id == item._id ? result : prev_item;
        });
      });
    });
  }
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
          {isSending ? "-" : "+"} ₹ {item.amount}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-yellow-500">{item.remarks}</div>
        <div onClick={handleStatusChange}>
          {item.status == "UNPAID" ? UNPAID_SVG : PAID_SVG}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-600">
          {moment(item.createdAt).toString()}
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
