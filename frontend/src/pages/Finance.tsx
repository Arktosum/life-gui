import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import { useAppDispatch } from "../redux/hooks";
import {
  createFinanceUser,
  fetchAllTransactions,
  fetchFinanceUsersRegex,
  FinanceUser,
  Transaction,
} from "../reducers/financeReducer";
import moment from "moment";
import { toast, Bounce, ToastOptions } from "react-toastify";
import { setState } from "../types";
import { useNavigate } from "react-router-dom";

export default function Finance() {
  const [searchName, setSearchName] = useState("");
  return (
    <PageContainer style="flex flex-col overflow-hidden">
      <Navbar setSearchName={setSearchName} />
      {searchName == "" ? (
        <TransactionHistoryContent />
      ) : (
        <FinanceUserContent searchName={searchName} />
      )}
      <Footer />
    </PageContainer>
  );
}

function FinanceUserContent({ searchName }: { searchName: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [financeUsers, setFinanceUsers] = useState<FinanceUser[]>([]);
  useEffect(() => {
    dispatch(fetchFinanceUsersRegex(searchName)).then((data) => {
      if (data.meta.requestStatus == "rejected") {
        toast.error("Network request rejected!", toastConfig);
      }
      setFinanceUsers(data.payload as FinanceUser[]);
    });
  }, [dispatch, searchName]);

  const financeUserElements = financeUsers.map((item) => {
    return <FinanceUserItem key={item._id} item={item} />;
  });

  if (financeUserElements.length == 0) {
    financeUserElements.push(
      <div
        onClick={() => {
          dispatch(createFinanceUser(searchName)).then((data) => {
            if (data.meta.requestStatus == "rejected") {
              toast.error(data.payload as string, toastConfig);
            } else {
              toast.success("Successfully created user!", toastConfig);
              const user = data.payload as FinanceUser;
              navigate(`/finance/payment/${user._id}`);
            }
          });
        }}
        className="m-2 rounded-xl border-2 border-gray-300 bg-dark p-5 text-white"
      >
        Add user : {searchName}
      </div>,
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-black text-white">
      <div className="flex flex-col gap-5 overflow-y-auto">
        {financeUserElements}
      </div>
    </div>
  );
}

function FinanceUserItem({ item }: { item: FinanceUser }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/finance/payment/${item._id}`);
      }}
      className="m-2 rounded-xl border-2 border-gray-300 bg-dark p-5 text-white"
    >
      {item.transactee}
    </div>
  );
}
function Navbar({ setSearchName }: { setSearchName: setState<string> }) {
  return (
    <div className="flex h-[10%] bg-secondary p-2">
      <img src="brand-logo.svg" alt="" className="" />
      <input
        onChange={(e) => setSearchName(e.target.value.toUpperCase())}
        type="text"
        className="mx-auto w-[70%] rounded-xl border-[1px] border-primary bg-black px-5 text-text"
        placeholder="Search anyone.."
      />
    </div>
  );
}

const toastConfig: ToastOptions<unknown> | undefined = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

function TransactionHistoryContent() {
  const dispatch = useAppDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    dispatch(fetchAllTransactions()).then((data) => {
      if (data.meta.requestStatus == "rejected") {
        toast.error("Network request rejected!", toastConfig);
      }
      setTransactions(data.payload as Transaction[]);
    });
  }, [dispatch]);
  let balance = 0;

  const transactionElements = transactions.map((item) => {
    balance += item.amount * (item.mode == "SEND" ? -1 : 1);
    return <TransactionItem key={item._id} item={item} />;
  });
  const sign = balance > 0 ? "+" : "-";
  const balanceColor = balance > 0 ? "text-success" : "text-failure";
  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-black text-white">
      <div className="font-xl borderize flex flex-col py-5">
        <span className="text-sm text-white">Balance</span>
        <span className={balanceColor + " text-3xl"}>
          {sign} ₹ {Math.abs(balance)}
        </span>
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto">
        {transactionElements}
      </div>
    </div>
  );
}

function TransactionItem({ item }: { item: Transaction }) {
  const transactee = item.transactee as FinanceUser;
  const balance = item.amount * (item.mode == "SEND" ? -1 : 1);
  const symbol = balance > 0 ? "+" : "-";
  const balanceColor = balance > 0 ? "text-success" : "text-failure";
  const dateTime = moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <div className="mx-2 flex flex-col gap-2 rounded-xl bg-dark p-4 text-white">
      <div className="flex justify-between">
        <div className="text-xl font-bold">{transactee.transactee}</div>
        <span className={balanceColor + " text-sm"}>
          {symbol} ₹ {Math.abs(balance).toFixed(2)}
        </span>
      </div>
      <div className="text-yellow-500">{item.remarks}</div>
      <div className="text-gray-500">{dateTime}</div>
    </div>
  );
}

function Footer() {
  return <div className="h-[10%] bg-secondary">Yo</div>;
}
