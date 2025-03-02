import { Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Landing from "./pages/landing/Landing";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import FinancePayment from "./pages/finance/FinancePayment";
import FinanceAnalytics from "./pages/finance/FinanceAnalytics";
import FinanceHistory from "./pages/finance/FinanceHistory";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="finance">
          <Route index element={<FinanceDashboard />} />
          <Route path="payment/:user_id" element={<FinancePayment />} />
          <Route path="analytics" element={<FinanceAnalytics />} />
          <Route path="history" element={<FinanceHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
