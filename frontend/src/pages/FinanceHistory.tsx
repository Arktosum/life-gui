import { useEffect, useState } from "react";
import {
  arrowRightIcon,
  calendarIcon,
  clockIcon,
  searchIcon,
  successIcon,
  warningIcon,
} from "../assets/assets";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchAllTransactions,
  FinanceUser,
  Transaction,
  updateTransactionById,
} from "../redux/reducers/financeReducer";
import { showToast } from "../utils";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { setState } from "../types";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

export default function FinanceHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions()).then((response) => {
      if (response.meta.requestStatus == "rejected") {
        showToast("Error fetching users!", "ERROR");
        return;
      }
      setTransactions(response.payload as Transaction[]);
    });
  }, [dispatch]);

  return (
    <PageContainer>
      <Navbar setTransactions={setTransactions} />
      <TransactionListDisplay
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </PageContainer>
  );
}

function Navbar({
  setTransactions,
}: {
  setTransactions: setState<Transaction[]>;
}) {
  const dispatch = useAppDispatch();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const userRegex = e.target.value.toUpperCase();
    if (userRegex == "") return;
    dispatch(fetchAllTransactions()).then((response) => {
      if (response.meta.requestStatus == "rejected") {
        showToast("Error fetching users!", "ERROR");
        return;
      }
      setTransactions(response.payload as Transaction[]);
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
interface TransactionListDisplayProps {
  transactions: Transaction[];
  setTransactions: setState<Transaction[]>;
}

function TransactionListDisplay({
  transactions,
  setTransactions,
}: TransactionListDisplayProps) {
  const paymentUserList = transactions.map((transaction) => {
    return (
      <TransactionItem
        transaction={transaction}
        setTransactions={setTransactions}
      />
    );
  });
  return (
    <div className="flex-1 overflow-y-scroll flex flex-col p-5 gap-5">
      {paymentUserList}
    </div>
  );
}
interface TransactionItem {
  transaction: Transaction;
  setTransactions: setState<Transaction[]>;
}

function TransactionItem({ transaction, setTransactions }: TransactionItem) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const is_send = transaction.mode == "SEND";
  const is_complete = transaction.status == "PAID";
  const display_at = is_complete
    ? transaction.completedAt
    : transaction.createdAt;
  const displayDate = moment(display_at).format("DD MMM YYYY");
  const displayTime = moment(display_at).format("HH:mm");
  const transactee_name = (transaction.transactee as FinanceUser).transactee
  return (
    <div
      key={transaction._id}
      className={`flex flex-col items-center gap-2 
      text-white text-sm font-bold 
      bg-[#161616] p-5 rounded-xl 
      border-2 border-[#161616] ${
        is_send ? "border-b-red-600" : "border-b-green-600"
      } font-sm`}
    >
      <div className="flex w-full justify-between">
        <div className="text-xl">{transactee_name}</div>
        <div className={is_send ? "text-red-600" : "text-green-600"}>
          {is_send ? "-" : "+"} ₹ {transaction.amount}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="text-gray-600 text-sm">{transaction.remarks}</div>
        <div
          onClick={() => {
            navigate(`/finance/checkout_update/${transaction._id}`);
          }}
        >
          {arrowRightIcon}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-blue-600">{calendarIcon}</span>
          <div className="text-sm">{displayDate}</div>
        </div>
        <div
          onClick={() => {
            const newStatus = is_complete ? "UNPAID" : "PAID";
            const newDate = new Date();
            const newTransaction = {
              ...transaction,
              status: newStatus,
              completedAt: newDate,
            } as Transaction;
            dispatch(updateTransactionById(newTransaction)).then((request) => {
              const payload = request.payload as Transaction;
              setTransactions(
                (prev) =>
                  prev.map((item) => {
                    if (item._id == payload._id) {
                      return payload;
                    }
                    return item;
                  }) as Transaction[]
              );
            });
          }}
          className={is_complete ? "text-green-600" : "text-yellow-600"}
        >
          {is_complete ? successIcon : warningIcon}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-blue-600">{clockIcon}</span>
          <div className="text-sm">{displayTime}</div>
        </div>
      </div>
    </div>
  );
}
