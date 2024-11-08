import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteTransactionById,
  fetchTransactionById,
  FinanceUser,
  Transaction,
} from "../redux/reducers/financeReducer";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import moment from "moment";

export default function FinanceInfo() {
  const { transaction_id } = useParams();
  const _id = transaction_id;
  const [transaction, setTransaction] = useState<Transaction>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleDelete() {
    if (_id == null) return;
    dispatch(deleteTransactionById(_id)).then(() => {
      navigate("/finance");
    });
  }

  useEffect(() => {
    if (_id == null) return;
    dispatch(fetchTransactionById(_id)).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setTransaction(action.payload as Transaction);
      }
    });
  }, [_id, dispatch]);

  const financeUser = transaction?.transactee as FinanceUser;
  
  return (
    <div>
      <div>Transactee: {financeUser?.transactee}</div>
      <div>Amount: {transaction?.amount}</div>
      <div>Category: {transaction?.category}</div>
      <div>Mode: {transaction?.mode}</div>
      <div>Created At: {moment(transaction?.createdAt).toString()}</div>
      <div>Updated At: {moment(transaction?.updatedAt).toString()}</div>
      <div>Completed At : {moment(transaction?.completedAt).toString()}</div>
      <div>Remarks : {transaction?.remarks}</div>
      <div>Status: {transaction?.status}</div>
      <Link to="/finance">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
          Go back
        </button>
      </Link>
      <button
        onClick={handleDelete}
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Delete transaction!
      </button>
    </div>
  );
}
