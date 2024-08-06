import { useNavigate, useParams } from "react-router-dom";
import {
  createTransaction,
  fetchFinanceUserById,
  FinanceUser,
  Transaction,
} from "../redux/reducers/financeReducer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="w-[100vw] h-[100dvh] flex flex-col bg-black">
      {children}
    </div>
  );
}

const INITIAL_STATUS: Transaction = {
  transactee: "",
  amount: 0,
  category: "OTHER",
  mode: "SEND",
  status: "UNPAID",
  partial: 0,
  remarks: "",
};

export default function FinancePayment() {
  const { finance_user_id } = useParams();
  const _id = finance_user_id;
  const [financeUser, setFinanceUser] = useState<FinanceUser>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (_id == null) return;
    dispatch(fetchFinanceUserById(_id)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setFinanceUser(action.payload as FinanceUser);
      }
    });
  }, [_id, dispatch]);

  const [transaction, setTransaction] = useState<Transaction>(INITIAL_STATUS);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTransaction((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleSubmit() {
    transaction.transactee = _id as string;
    dispatch(createTransaction(transaction)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        console.log(action.payload);
        setTransaction(INITIAL_STATUS); // Probably no need to do this.
        navigate("/finance");
      }
    });
  }
  return (
    <PageContainer>
      <div className="text-white">
        FinancePayment : {financeUser?.transactee}
      </div>
      <input type="number" name="amount" onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option value="FOOD">FOOD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="GROOMING">GROOMING</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="OTHER">OTHER</option>
      </select>
      <select name="mode" onChange={handleChange}>
        <option value="SEND">SEND</option>
        <option value="RECEIVE">RECEIVE</option>
      </select>
      <input type="text" name="remarks" onChange={handleChange} />
      <button onClick={handleSubmit} className="text-green-600 border-2 border-green-600 px-5 py-2">Send!</button>
    </PageContainer>
  );
}
