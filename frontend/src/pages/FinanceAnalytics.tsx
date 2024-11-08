import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  Transaction,
  fetchAllTransactions,
} from "../redux/reducers/financeReducer";
import moment from "moment";
import { Link } from "react-router-dom";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

export default function FinanceAnalytics() {
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    dispatch(fetchAllTransactions()).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setTransactions(action.payload as Transaction[]);
      }
    });
  }, [dispatch]);

  // By Time - daily,weekly,monthly
  const daily: Record<
    string,
    {
      received: number;
      sent: number;
      count: number;
      total: number;
    }
  > = {};
  const weekly: Record<
    string,
    {
      received: number;
      sent: number;
      count: number;
      total: number;
    }
  > = {};
  const monthly: Record<
    string,
    {
      received: number;
      sent: number;
      count: number;
      total: number;
    }
  > = {};
  for (const item of transactions) {
    const daily_datetime = moment(item.completedAt).format("YYYY-MM-DD");
    const weekly_datetime = moment(item.completedAt).week();
    const monthly_datetime = moment(item.completedAt).format("YYYY-MM");

    const sentAmount = item.amount * (item.mode == "SEND" ? 1 : 0);
    const receivedAmount = item.amount * (item.mode == "RECEIVE" ? 1 : 0);

    const totalAmount = receivedAmount - sentAmount;
    daily[daily_datetime] = {
      total: (daily[daily_datetime]?.total || 0) + totalAmount,
      sent: (daily[daily_datetime]?.sent || 0) + sentAmount,
      received: (daily[daily_datetime]?.received || 0) + receivedAmount,
      count: (daily[daily_datetime]?.count || 0) + 1,
    };
    weekly[weekly_datetime] = {
      total: (weekly[weekly_datetime]?.total || 0) + totalAmount,
      sent: (weekly[weekly_datetime]?.sent || 0) + sentAmount,
      received: (weekly[weekly_datetime]?.received || 0) + receivedAmount,
      count: (weekly[weekly_datetime]?.count || 0) + 1,
    };
    monthly[monthly_datetime] = {
      total: (monthly[monthly_datetime]?.total || 0) + totalAmount,
      sent: (monthly[monthly_datetime]?.sent || 0) + sentAmount,
      received: (monthly[monthly_datetime]?.received || 0) + receivedAmount,
      count: (monthly[monthly_datetime]?.count || 0) + 1,
    };
  }

  const [selected, setSelected] = useState("DAILY");

  const selectedData = { DAILY: daily, MONTHLY: monthly, WEEKLY: weekly }[
    selected
  ];
  const rowItems = [
    <div className="grid grid-cols-5">
      <div className="text-white text-xl font-bold">Timestamp</div>
      <div className="text-white text-xl font-bold">Count</div>
      <div className="text-green-500 text-xl font-bold">Received</div>
      <div className="text-red-500 text-xl font-bold">Sent</div>
      <div className="text-white text-xl font-bold">Total</div>
    </div>,
  ];
  for (const timestamp in selectedData) {
    const item = selectedData[timestamp];
    rowItems.push(
      <div className="grid grid-cols-5 place-items-center">
        <div className="text-white text-sm">{timestamp}</div>
        <div className="text-white text-sm">{item.count}</div>
        <div className="text-green-500 text-sm">+ {item.received}</div>
        <div className="text-red-500 text-sm">- {item.sent}</div>
        <div
          className={`${
            item.total < 0 ? "text-red-500" : "text-green-500"
          } text-sm `}
        >
          {item.total < 0 ? "" : "+"} {item.total}
        </div>
      </div>
    );
  }
  return (
    <PageContainer>
      <div
        onClick={() => {
          setSelected("DAILY");
        }}
        className="text-black font-bold bg-green-600 px-5 py-2 text-center"
      >
        DAILY
      </div>
      <div
        onClick={() => {
          setSelected("WEEKLY");
        }}
        className="text-black font-bold bg-yellow-600 px-5 py-2 text-center"
      >
        WEEKLY
      </div>
      <div
        onClick={() => {
          setSelected("MONTHLY");
        }}
        className="text-black font-bold bg-red-600 px-5 py-2 text-center"
      >
        MONTHLY
      </div>
      <Link to="/finance">
        <div className="text-black font-bold bg-blue-600 px-5 py-2 text-center">
          GO BACK
        </div>
      </Link>
      <div className="flex flex-col gap-5 overflow-scroll">{rowItems}</div>
    </PageContainer>
  );
}
