import { useNavigate, useParams } from "react-router";
import { Header } from "./FinanceDashboard";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  fetchFinanceUserById,
  FinanceUser,
} from "../../features/financeUserSlice";
import moment from "moment";
import {
  createTransaction,
  Transaction,
  TransactionCategory,
} from "../../features/transactionSlice";

export default function FinancePayment() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentUser, setPaymentUser] = useState<FinanceUser>();
  //n <div>FinancePayment : {params.user_id}</div>;
  const user_id = params.user_id;
  useEffect(() => {
    if (!user_id) return;
    dispatch(fetchFinanceUserById({ _id: user_id })).then((action) => {
      setPaymentUser(action.payload as FinanceUser);
    });
  }, [dispatch, user_id]);

  const [formData, setFormData] = useState<Transaction>({
    transactee: user_id,
    amount: 0,
    remarks: "",
    category: "OTHER",
    isCompleted: false,
    completedAt: moment().toDate(),
    mode: "SEND",
  });

  const isSending = formData.mode == "SEND";

  function handleSubmit() {
    dispatch(createTransaction(formData)).then(() => {
      navigate("/finance");
    });
  }
  return (
    <div className="flex flex-col gap-5 min-h-[100dvh] bg-black overflow-hidden">
      <Header />
      <div
        className={`p-2 flex justify-center ${
          isSending ? "text-red-600" : "text-green-600"
        }`}
      >
        <div className=" text-4xl self-center">{isSending ? "-" : "+"} ₹</div>
        <input
          onChange={(e) => {
            setFormData((form) => {
              return { ...form, amount: parseInt(e.target.value) };
            });
          }}
          type="number"
          className="w-[70%] p-5 text-center text-6xl outline-none"
          placeholder="0"
        ></input>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <div className="text-white">
          {isSending ? "Me" : paymentUser?.username}
        </div>
        <div
          className="text-white"
          onClick={() => {
            setFormData((data) => {
              return { ...data, mode: isSending ? "RECEIVE" : "SEND" };
            });
          }}
        >
          To
        </div>
        <div className="text-white">
          {isSending ? paymentUser?.username : "Me"}
        </div>
      </div>

      <textarea
        onChange={(e) => {
          setFormData((data) => {
            return { ...data, remarks: e.target.value };
          });
        }}
        className="self-center  text-white bg-[#1C1C1C] rounded-xl p-5"
        placeholder="Remarks..."
        rows={2}
        cols={20}
      ></textarea>
      <select
        onChange={(e) => {
          setFormData((prev) => {
            return { ...prev, category: e.target.value as TransactionCategory };
          });
        }}
        name="category"
        id=""
        className="bg-[#1C1C1C] text-white self-center p-5 rounded-xl"
      >
        <option value="OTHER">OTHER</option>
        <option value="FOOD">FOOD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="HOUSING">HOUSING</option>
        <option value="GROOMING">GROOMING</option>
        <option value="LENDING">LENDING</option>
      </select>

      <div className="self-center flex gap-2 items-center">
        <div
          onClick={() => {
            setFormData((data) => {
              return { ...data, isCompleted: !data.isCompleted };
            });
          }}
          className={`p-5 ${
            formData.isCompleted ? "bg-green-600" : "bg-[#1C1C1C]"
          } rounded-xl`}
        ></div>
        <div className="text-white">Mark As Completed</div>
      </div>

      {formData.isCompleted && (
        <div className="self-center">
          <input
            onChange={(e) => {
              setFormData((data) => {
                return {
                  ...data,
                  completedAt: moment(e.target.value).toDate(),
                };
              });
            }}
            defaultValue={moment().format("YYYY-MM-DDTHH:mm:ss")}
            type="datetime-local"
            className="text-white bg-[#1C1C1C] px-5 py-2 rounded xl"
          />
        </div>
      )}
      <div className="flex justify-evenly">
        <button
          onClick={() => {
            navigate("/finance");
          }}
          className="px-7 py-5 text-red-600 border-red-600 rounded-xl border-2"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          className="px-7 py-5 text-green-600 border-green-600 rounded-xl border-2"
        >
          PROCEED
        </button>
      </div>
    </div>
  );
}
