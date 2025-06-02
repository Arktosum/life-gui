import { useState } from "react";
import PageScreen from "../components/PageScreen";

function BalanceCard() {
  return (
    <div className="flex flex-col text-white bg-gradient-to-tr from-pink-600 to-yellow-300 p-4 rounded-xl my-5 py-6 px-4">
      <div className="text-sm">Balance</div>
      <div className="text-2xl font-bold">$ 100,000,000</div>
    </div>
  );
}

function LimitBar({
  type,
  value,
  max,
}: {
  type: string;
  value: number;
  max: number;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const isOverLimit = value > max;

  let barColor = "bg-green-500";
  if (value > max) barColor = "bg-red-500 animate-pulse";
  else if (percentage > 75) barColor = "bg-red-500";
  else if (percentage > 50) barColor = "bg-orange-400";
  else if (percentage > 25) barColor = "bg-yellow-400";

  return (
    <div className="bg-black text-white py-2 w-full text-xs font-light space-y-1">
      <div className="flex justify-between">
        <span>
          {isOverLimit ? (
            <span className="text-red-400 font-semibold">
              {type} | Over Limit!
            </span>
          ) : (
            `${type} Limit | $${max - value} left`
          )}
        </span>
        <span>${value}</span>
      </div>

      <div className="w-full h-2 bg-neutral-800 rounded overflow-hidden">
        <div
          className={`h-full rounded transition-all duration-300 ${barColor}`}
          style={{ width: isOverLimit ? "100%" : `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function SearchBox({
  inputFinanceUserName,
  setinputFinanceUserName,
}: {
  inputFinanceUserName: string;
  setinputFinanceUserName: setStateType<string>;
}) {
  return (
    <div className="flex w-full gap-5 items-center">
      <img src="./logo.svg" className="w-10 h-10" alt="" />
      <input
        value={inputFinanceUserName}
        onChange={(e) => {
          setinputFinanceUserName(e.target.value);
        }}
        type="text"
        className="flex-1 text-white border-b-green-600 border-2 border-black focus:outline-none focus-visible:border-3"
      />
    </div>
  );
}

function LimitCard() {
  return (
    <>
      <LimitBar type={"Daily"} value={153} max={200} />
      <LimitBar type={"Weekly"} value={153} max={1500} />
    </>
  );
}

function RecentProfile() {
  const randomValue = Math.random() * 10000;
  return (
    <div className="flex flex-col gap-2">
      <img
        src={`https://robohash.org/${randomValue}`}
        className="w-15 h-15 rounded-full"
      />
      <div className="text-white text-sm text-center">Francis</div>
    </div>
  );
}
function RecentsCard() {
  return (
    <div className="my-2">
      <div className="text-white">Frequent Transactees</div>
      <div className="grid grid-cols-4 place-items-center">
        <RecentProfile />
        <RecentProfile />
        <RecentProfile />
        <RecentProfile />
        <RecentProfile />
        <RecentProfile />
        <RecentProfile />
        <RecentProfile />
      </div>
    </div>
  );
}
function SearchUserList({ query }: { query: string }) {
  function handleAddUser() {}
  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push({
      avatar: `https://robohash.org/${Math.random() * 10000}`,
      id: Math.random() * 100,
      name: "Jacob",
    });
  }
  const exactMatch = users.some(
    (user) => user.name.toLowerCase() === query.toLowerCase()
  );
  console.log(query, exactMatch);

  return (
    <div className="my-2 h-[85vh] p-4 space-y-4 text-white overflow-y-scroll">
      {query &&
        exactMatch &&
        users.map((user) => (
          <a
            href={`/users/${user.id}`}
            key={user.id}
            className="flex items-center p-3 bg-neutral-800 rounded-xl shadow hover:bg-neutral-700 transition group"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-4 border border-white/10"
            />
            <div className="font-medium">{user.name}</div>
          </a>
        ))}
      {query && !exactMatch && (
        <button
          onClick={handleAddUser}
          className="w-full flex items-center justify-center gap-2 text-white font-medium text-sm py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 hover:scale-[1.02] hover:brightness-110 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add <span className="font-semibold">{query}</span>
        </button>
      )}
    </div>
  );
}

type setStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export default function Dashboard() {
  const [inputFinanceUserName, setinputFinanceUserName] = useState("");
  console.log(inputFinanceUserName);
  return (
    <PageScreen>
      <SearchBox
        inputFinanceUserName={inputFinanceUserName}
        setinputFinanceUserName={setinputFinanceUserName}
      />
      {inputFinanceUserName ? (
        <SearchUserList query={inputFinanceUserName} />
      ) : (
        <>
          <BalanceCard />
          <LimitCard />
          <RecentsCard />
        </>
      )}
      {/* <BottomNav /> */}
    </PageScreen>
  );
}
