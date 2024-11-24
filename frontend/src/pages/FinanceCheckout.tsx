import { useNavigate, useParams } from "react-router-dom";
import {
  createTransaction,
  fetchFinanceUserById,
  FinanceUser,
  Transaction,
} from "../redux/reducers/financeReducer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import moment from "moment";
import { calendarIcon, tagIcon, tickIcon } from "../assets/assets";
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
  completedAt: new Date(),
};

export default function FinanceCheckout() {
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
        setTransaction(INITIAL_STATUS); // Probably no need to do this.
        navigate("/finance/dashboard");
      }
    });
  }
  const IS_SENDING = transaction.mode == "SEND";
  const IS_COMPLETE = transaction.status == "PAID";
  return (
    <PageContainer>
      <div className="w-full h-full flex flex-col p-5 overflow-clip">
        <div className="text-white flex flex-col gap-2">
          <div
            className="italic"
            onClick={() => {
              setTransaction((prev) => {
                return {
                  ...prev,
                  mode: prev.mode == "SEND" ? "RECEIVE" : "SEND",
                };
              });
            }}
          >
            {IS_SENDING ? "Paying" : "Receiving"}
          </div>
          <div className="text-white text-xl font-bold">
            {financeUser?.transactee}
          </div>
        </div>
        <div
          className={`my-20 grid grid-cols-5 ${
            IS_SENDING ? "text-red-600" : "text-green-600"
          } `}
        >
          <span className="text-3xl col-span-1">{IS_SENDING ? "-" : "+"} ₹</span>
          <input
            type="number"
            name="amount"
            placeholder="0"
            className={`bg-inherit text-center text-3xl font-bold col-span-4`}
            onChange={handleChange}
          />
        </div>
        <BottomInput
          type="text"
          label="Remarks"
          name="remarks"
          handleChange={handleChange}
        />
        <div className="text-white flex gap-5 p-5">
          <span className="text-[#909090]">{tagIcon}</span>
          <select
            name="category"
            onChange={handleChange}
            className="bg-inherit text-white"
          >
            <option value="FOOD">FOOD</option>
            <option value="TRANSPORT">TRANSPORT</option>
            <option value="GROOMING">GROOMING</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div
          onClick={() => {
            setTransaction((prev) => {
              return {
                ...prev,
                status: prev.status == "PAID" ? "UNPAID" : "PAID",
              };
            });
          }}
          className="text-white p-5 flex gap-5"
        >
          <span className={IS_COMPLETE ? "text-green-600" : "text-red-600"}>
            {tickIcon}
          </span>
          {IS_COMPLETE ? "Completed" : "Incomplete"}
        </div>
        {transaction.status == "PAID" && (
          <div className="flex gap-5 p-5">
            <span className="text-blue-500">{calendarIcon}</span>
            <input
              className="bg-inherit text-white"
              type="datetime-local"
              name="completedAt"
              onChange={handleChange}
              defaultValue={moment(transaction.completedAt).format(
                "YYYY-MM-DDTHH:MM"
              )}
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="text-green-600 border-2 border-green-600 px-5 py-2 my-2 rounded-xl"
        >
          ADD
        </button>
      </div>
    </PageContainer>
  );
}
interface BottomInputProps {
  label: string;
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BottomInput({ label, name, handleChange, type }: BottomInputProps) {
  return (
    <>
      <label htmlFor="" className="text-[0.7rem] text-[#898686]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="bg-inherit outline-none border-black text-white block border-b-green-600 border-2"
        onChange={handleChange}
      />
    </>
  );
}
