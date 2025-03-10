import { useEffect, useState } from "react";
import { Header } from "./FinanceDashboard";
import {
  fetchAllTransactions,
  Transaction,
} from "../../features/transactionSlice";
import { useAppDispatch } from "../../app/hooks";
import { FinanceUser } from "../../features/financeUserSlice";
import moment from "moment";
import { useNavigate } from "react-router";

export default function FinanceHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllTransactions()).then((action) => {
      const fetched_transactions = action.payload as Transaction[];
      // TODO : more filtering and sorting options.
      const newest_first = fetched_transactions.sort((a, b) => {
        const dateA = new Date(a.completedAt!);
        const dateB = new Date(b.completedAt!);
        return dateB.getTime() - dateA.getTime();
      });
      setTransactions(newest_first);
    });
  }, [dispatch]);

  const transactionElements = transactions.map((item) => {
    return <TransactionElement key={item._id} item={item} />;
  });
  return (
    <div className="flex flex-col gap-5 min-h-[100dvh] bg-black overflow-hidden">
      <Header />
      <div
        onClick={() => {
          navigate("/finance");
        }}
        className="text-white mx-5 font-bold"
      >
        Go back
      </div>
      <div className="flex flex-col m-5 gap-5">{transactionElements}</div>
    </div>
  );
}

function TransactionElement({ item }: { item: Transaction }) {
  const isSend = item.mode == "SEND";
  return (
    <div className="text-white flex gap-2 justify-between">
      <div className="w-10 h-10 bg-white rounded-full"></div>
      <div className="flex-1">
        <div>{(item.transactee as FinanceUser).username}</div>
        <div className="text-sm text-gray-600">
          {moment(item.completedAt).format("DD MMMM HH:MM")}
        </div>
      </div>
      <div className="">
        <div className={isSend ? "text-red-600" : "text-green-600"}>
          {isSend ? "-" : "+"}₹ {item.amount}
        </div>
        <div></div>
      </div>
    </div>
  );
}
