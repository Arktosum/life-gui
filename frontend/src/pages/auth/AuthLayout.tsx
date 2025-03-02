import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <div>AuthLayout</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
