import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  createTransaction,
  fetchFinanceUserById,
  FinanceUser,
  INITIAL_FINANCE_FORM_DATA,
} from "../reducers/financeReducer";
import { toast } from "react-toastify";

export default function FinancePayment() {
  return (
    <PageContainer style="flex flex-col overflow-hidden">
      <Navbar />
      <Content />
      <Footer />
    </PageContainer>
  );
}

function Navbar() {
  return (
    <div className="flex h-[10%] bg-secondary p-2">
      <img src="brand-logo.svg" alt="" className="" />
    </div>
  );
}

function Footer() {
  return <div className="h-[10%] bg-secondary">Yo</div>;
}

function Content() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [financeFormData, setFinanceFormData] = useState(
    INITIAL_FINANCE_FORM_DATA,
  );
  const [financeUsername, setFinanceUsername] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchFinanceUserById(id)).then((data) => {
      const financeUser = data.payload as FinanceUser;
      setFinanceUsername(financeUser.transactee);
      setFinanceFormData((prev) => {
        return { ...prev, transactee: financeUser._id };
      });
    });
  }, [dispatch, id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFinanceFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handlePayment() {
    dispatch(createTransaction(financeFormData)).then((data) => {
      if (data.meta.requestStatus == "rejected") {
        toast.error("Something went wrong while processing transaction!");
      } else {
        navigate("/finance");
      }
    });
  }
  if (!financeUsername) return <div>Loading....</div>;
  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-black text-white">
      {financeUsername}
      <div>
        <div
          onClick={() => {
            setFinanceFormData((prev) => {
              return {
                ...prev,
                mode: prev.mode == "SEND" ? "RECEIVE" : "SEND",
              };
            });
          }}
        >
          {financeFormData.mode}
        </div>
      </div>
      <div>
        <div className="text-white">Amount</div>
        <input
          value={financeFormData.amount}
          name="amount"
          onChange={handleChange}
          type="number"
          className="text-black"
        />
      </div>

      <div>
        <div className="text-white">Partial</div>
        <input
          value={financeFormData.partial}
          name="partial"
          onChange={handleChange}
          type="number"
          className="text-black"
        />
      </div>
      <div>
        <div className="text-white">Remarks</div>
        <input
          value={financeFormData.remarks}
          name="remarks"
          onChange={handleChange}
          type="text"
          className="text-black"
        />
      </div>

      <button onClick={handlePayment} className="bg-green-600 px-5 py-2">
        Pay
      </button>
    </div>
  );
}
