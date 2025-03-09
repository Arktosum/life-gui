export default function FinanceDashboard() {
  return (
    <>
      <div className="min-h-[100dvh] bg-black overflow-hidden">
        <div className="flex items-center justify-between p-2">
          <img src="brand.svg" alt="" />
          <div className="bg-white w-10 h-10 rounded-full"></div>
        </div>
        <div className="m-2 flex flex-col gap-2">
          <SearchBar />
          <BalanceDisplayGroup />
          <RecentTransactionsGroup />
          <BottomNav />
        </div>
      </div>
    </>
  );
}

function BottomNav() {
  return (
    <div className="bg-[#1C1C1C] flex justify-center items-center rounded-xl flex-1">
      <img src="homeIcon.svg" alt="" className="p-5" />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="rounded-xl px-5 py-2 bg-[#1C1C1C] gap-2 flex items-center flex-1">
      <img src="searchIcon.svg" className="w-5 h-5"></img>
      <input
        type="text"
        className="w-full p-2 text-white outline-none"
        placeholder="Pay Anyone..."
      />
    </div>
  );
}

function BalanceDisplayGroup() {
  return (
    <div className="flex flex-col gap-2 bg-[#1C1C1C] flex-1">
      <div className="bg-gradient-to-br from-[#00ffd9] via-[#0240fa] to-[#fd0000] p-6 rounded-xl">
        <div className="text-white text-sm">Current Balance</div>
        <div className="font-bold text-white text-3xl">$ 5000.00</div>
      </div>
      <div className=" flex gap-2 justify-evenly">
        <div className="income bg-gradient-to-tr from-[#1d2118]  to-[#00ff00] flex-1 p-5 rounded-xl">
          <div className="flex justify-between">
            <div className="text-white text-sm">Income</div>
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div className="font-bold text-white text-2xl">$ 5000.00</div>
        </div>
        <div className="expense bg-gradient-to-tr from-[#1d2118]  to-[#ff0000] flex-1 p-5 rounded-xl">
          <div className="flex justify-between">
            <div className="text-white text-sm">Expense</div>
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div className="font-bold text-white text-2xl">$ 5000.00</div>
        </div>
      </div>
    </div>
  );
}

function RecentTransactionsGroup() {
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
      <div className="text-white">Recent Transactions</div>
      <div className="grid grid-cols-4 gap-5">{gridElements}</div>
    </div>
  );
}
