import { useNavigate, useParams } from "react-router-dom";
import PageScreen from "../components/PageScreen";
import {
  useCreateTransactionMutation,
  useGetFinanceUserQuery,
  type Transaction,
  type TransactionCategory,
} from "../services/api";
import { useState } from "react";
import clsx from "clsx";

type UserParams = {
  userId: string;
};
const categories = [
  "FOOD",
  "TRANSPORT",
  "RENT",
  "SALARY",
  "GROOMING",
  "EDUCATION",
  "OTHER",
];

export default function PaymentPage() {
  const { userId } = useParams<UserParams>();
  const { data: user, isLoading } = useGetFinanceUserQuery(userId as string);
  const [createTransaction] = useCreateTransactionMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Transaction>>({
    transactee: "",
    amount: 0,
    remarks: "",
    category: "FOOD",
    mode: "SEND",
    status: "PENDING",
    completedAt: new Date().toISOString().slice(0, 16),
  });

  const isSendMode = form.mode == "SEND";
  const isCompleted = form.status == "PAID";
  async function handleSubmit(e: { preventDefault: () => void }) {
    if (!userId) return;
    form.transactee = userId;
    e.preventDefault();
    await createTransaction(form);
    navigate("/");
  }
  if (isLoading || !user) {
    return <></>;
  }
  return (
    <PageScreen>
      <img src="/logo-full.svg" alt="" className=" w-[50%]" />
      {/* Header */}
      <div
        className={clsx(
          "w-full max-w-md rounded-xl p-6 mb-4 flex flex-col items-center"
        )}
      >
        <button
          className="text-gray-300 text-sm hover:underline"
          onClick={() =>
            setForm({ ...form, mode: isSendMode ? "RECEIVE" : "SEND" })
          }
        >
          {isSendMode ? `${user.username} ➝ Me` : `Me ➝ ${user.username}`}
        </button>
        <div className="flex justify-center items-center">
          <span
            className={clsx(
              "mt-2 text-4xl font-bold bg-transparent text-center focus:outline-none placeholder-[#1E1E1E]",
              isSendMode ? "text-red-500" : "text-green-500"
            )}
          >
            {isSendMode ? "-" : "+"}
          </span>
          <input
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: parseInt(e.target.value) })
            }
            className={clsx(
              "mt-2 text-7xl  font-bold bg-transparent text-center w-full focus:outline-none placeholder-[#1E1E1E]",
              isSendMode ? "text-red-500" : "text-green-500"
            )}
          />
        </div>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#131313] w-full max-w-md rounded-xl p-6 space-y-4"
      >
        <textarea
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          className="w-full bg-black text-white rounded-md p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value as TransactionCategory,
            })
          }
          className="w-full bg-black rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Completed Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={clsx(
              "w-10 h-6 flex items-center rounded-full p-1 transition-colors",
              isCompleted ? "bg-green-600" : "bg-gray-600"
            )}
            onClick={() =>
              setForm({
                ...form,
                status: isCompleted ? "PENDING" : "PAID",
                completedAt: isCompleted ? form.completedAt : "",
              })
            }
          >
            <div
              className={clsx(
                "bg-white w-4 h-4 rounded-full shadow-md transform transition-transform",
                isCompleted ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
          <span className="text-sm text-white">Completed</span>
        </div>
        {isCompleted && (
          <input
            type="datetime-local"
            value={form.completedAt}
            onChange={(e) => setForm({ ...form, completedAt: e.target.value })}
            className="w-full bg-black text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        <button
          type="submit"
          className={clsx(
            "w-full transition text-white font-bold py-3 rounded-md",
            isSendMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          )}
        >
          Pay
        </button>
      </form>
      );
    </PageScreen>
  );
}
