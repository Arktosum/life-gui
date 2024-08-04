import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchAllTransactions, Transaction } from "../redux/reducers/finance";

function PageContainer({ children }: React.PropsWithChildren) {
  return <div className="w-[100vw] h-[100dvh] bg-black">{children}</div>;
}

export default function Finance() {
  const dispatch = useAppDispatch();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    dispatch(fetchAllTransactions()).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        setTransactions(action.payload as Transaction[]);
      }
    });
  }, [dispatch]);
  return (
    <PageContainer>
      {transactions.map((item) => {
        return <div className="text-white">{item.transactee}</div>;
      })}
    </PageContainer>
  );
}
