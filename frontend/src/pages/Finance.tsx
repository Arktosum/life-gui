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
import { useNavigate } from "react-router-dom";

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
  const transactionElements = transactions.map((item) => {
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
      <header className="h-[10%] borderize">
        <input type="text" value={financeUserRegex} onChange={handleChange} />
      </header>
      <main className="flex-1 borderize overflow-scroll">
        <div className="flex flex-col gap-5">
          {financeUserRegex == "" ? transactionElements : financeUserElements}
        </div>
      </main>
      <footer className="h-[10%] borderize"></footer>
    </PageContainer>
  );
}

function TransactionItem({ item }: { item: Transaction }) {
  const transactee = item.transactee as FinanceUser;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/finance/info/${item._id}`);
      }}
      className="bg-[#141414] p-5 m-2 rounded-xl"
    >
      <div className="flex justify-between text-nowrap">
        <div className="text-white font-bold">
          {transactee.transactee as string}
        </div>
        <div className="text-white">$ {item.amount}</div>
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
