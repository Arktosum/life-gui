import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute({ children }: React.PropsWithChildren) {
  const auth = useAppSelector((root) => root.auth);
  const isAuthorized = auth.user._id != null;
  return (isAuthorized && children) || <Navigate to="/login" />;
}
