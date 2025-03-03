export default function FinanceDashboard() {
  return (
    <>
      <div className="min-h-[100dvh] bg-black overflow-hidden border-green-500 border-2">
        <img src="brand.svg" alt="" />
        <SearchBar />
        <BalanceDisplayGroup />
        <RecentTransactionsGroup />
        <BottomNav />
      </div>
    </>
  );
}

function BottomNav() {
  return <div></div>;
}

function SearchBar() {
  return (
    <div>
      <div></div>
      <div>Pay Anyone</div>
    </div>
  );
}

function BalanceDisplayGroup() {
  return (
    <>
      <div>
        <div>Current Balance</div>
        <div>$ 5000.00</div>
      </div>
      <div>
        <div className="income">
          <div>
            <div>Income</div>
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div>$ 5000.00</div>
        </div>
        <div className="expense">
          <div>
            <div>Expense</div>
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div>$ 5000.00</div>
        </div>
      </div>
    </>
  );
}

function RecentTransactionsGroup() {
  return <div></div>;
}
