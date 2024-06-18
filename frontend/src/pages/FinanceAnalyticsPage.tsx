import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { Link } from "react-router-dom";
import { homeIcon, userIcon, historyIcon } from "../app/assets";
import { fetchAllTransactions, Transaction } from "../features/financeSlice";
import moment from "moment";

function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

function TopNav() {
  return (
    <div className="top-nav h-[10%] w-full flex p-2 gap-5 bg-[#171717]">
      <img src={"/logo.svg"} alt="" className="" />
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
        <div className="bg-[#0e0e0e] p-4 rounded-full">{userIcon}</div>
      </Link>
      <Link to="/finance/history">
        <div className="bg-[#414141] p-4 rounded-full">{historyIcon}</div>
      </Link>
    </div>
  );
}

function Content() {
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [displayMode, setDisplayMode] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY"
  >("DAILY");
  useEffect(() => {
    dispatch(fetchAllTransactions()).then((response) => {
      setTransactions(response.payload as Transaction[]);
    });
  }, [dispatch]);

  // (timestamp,amount,count)
  const daily: Record<string, number[]> = {};
  const monthly: Record<string, number[]> = {};
  const weekly: Record<string, number[]> = {};
  for (const transaction of transactions) {
    const timestamp = transaction.createdAt;
    const positive = transaction.mode == "RECEIVE" ? transaction.amount : 0;
    const negative = transaction.mode == "SEND" ? transaction.amount : 0;
    const total = positive - negative;

    // daily
    const daily_date = moment(timestamp).format("DD-MM-YYYY");
    const monthly_date = moment(timestamp).format("MM-YYYY");
    const weekly_date = moment(timestamp).format("ww"); // as .week() (2 digits) like '01'
    if (!(daily_date in daily)) {
      daily[daily_date] = [0, 0, 0, 0];
    }
    if (!(monthly_date in monthly)) {
      monthly[monthly_date] = [0, 0, 0, 0];
    }
    if (!(weekly_date in weekly)) {
      weekly[weekly_date] = [0, 0, 0, 0];
    }
    daily[daily_date] = [
      daily[daily_date][0] + 1,
      daily[daily_date][1] + positive,
      daily[daily_date][2] + negative,
      daily[daily_date][3] + total,
    ];

    monthly[monthly_date] = [
      monthly[monthly_date][0] + 1,
      monthly[monthly_date][1] + positive,
      monthly[monthly_date][2] + negative,
      monthly[monthly_date][3] + total,
    ];

    weekly[weekly_date] = [
      weekly[weekly_date][0] + 1,
      weekly[weekly_date][1] + positive,
      weekly[weekly_date][2] + negative,
      weekly[weekly_date][3] + total,
    ];
  }
  const selectMap = { DAILY: daily, MONTHLY: monthly, WEEKLY: weekly };
  const selected = selectMap[displayMode];
  const displayElements = [];

  for (const date in selected) {
    displayElements.push(
      <div key={date} className="flex gap-5 text-white text-sm">
        {displayMode == "WEEKLY" ? (
          <div className="font-bold">Week {date} : </div>
        ) : (
          <div className="font-bold">{date}</div>
        )}
        <div className="text-blue-600">{selected[date][0]}</div>
        <div className="text-green-600">+ ${selected[date][1]}</div>
        <div className="text-red-600">- ${selected[date][2]}</div>
        <div className="">$ {selected[date][3]}</div>
      </div>
    );
  }
  return (
    <>
      <div className="text-white flex-1 w-full h-full overflow-y-auto">
        Analytics
        <select
          className="text-black"
          name="displayMode"
          id=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setDisplayMode(e.target.value as "DAILY" | "WEEKLY" | "MONTHLY");
          }}
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>
        {displayElements}
      </div>
    </>
  );
}

export default function FinanceAnalyticsPage() {
  return (
    <PageContainer>
      <TopNav />
      <Content />
      <BottomNav />
    </PageContainer>
  );
}
