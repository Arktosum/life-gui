import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { FinanceFormData, FinanceItem, createFinanceItem, fetchFinanceItems } from "../slices/financeSlice";

export default function FinancePage() {
  const financeItems = useAppSelector((state) => state.finance.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFinanceItems());
  }, []);

  const rowItems = financeItems.map((item) => {
    return <FinanceElement key={item._id} item={item} />;
  });
  return (
    <div className="min-h-screen bg-black">
      <FinanceForm/>
      <h1 className="text-white">Finance Items</h1>
      <div className="grid grid-cols-1">
        {rowItems}
      </div>
    </div>
  );
}

function FinanceElement({ item }: { item: FinanceItem }) {
  return (
    <div className="text-white flex flex-col bg-gray-950 p-5 m-5">
      <div className="flex justify-between">
        <div className="font-extrabold text-md">{item.transactee}</div>
        <div>${item.amount}</div>
      </div>
      <div className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, atque?
      </div>
      <div>{item.category}</div>
      <div>{item.mode}</div>
      <div>{item.status}</div>
      <div>{item.updatedAt.toString()}</div>
    </div>
  );
}



function FinanceForm(){
  const [formData,setFormData] = useState<FinanceFormData>({
    transactee : "",
    amount : 0,
    description : "",
    category : "OTHER",
    mode : "SEND",
    status : "UNPAID",
  })
  const dispatch = useAppDispatch();
  function handleSubmit(){
    dispatch(createFinanceItem(formData));
  }
  function handleChange(e : ChangeEvent<HTMLElement>) {
    setFormData(prev=>{return {...prev,[e.target.name] : e.target.value}})
  }

  return (
    <div>
      <input type="text" name="transactee" value={formData.transactee} className="border-black border-2" onChange={handleChange}/>
      <input type="number" name="amount" value={formData.amount} className="border-black border-2" onChange={handleChange}/>
      <input type="text" name="description" value={formData.description} className="border-black border-2" onChange={handleChange}/>
      <select name="category" onChange={handleChange} value={formData.category}>
        <option value="OTHER">OTHER</option>
        <option value="FOOD">FOOD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="GROOMING">GROOMING</option>
      </select>
      <select name="mode" onChange={handleChange} value={formData.mode}>
        <option value="SEND">SEND</option>
        <option value="RECEIVE">RECEIVE</option>
      </select>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}