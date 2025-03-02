import { useParams } from "react-router";

export default function FinancePayment() {
  const params = useParams();
  return <div>FinancePayment : {params.user_id}</div>;
}
