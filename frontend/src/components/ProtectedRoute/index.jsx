import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.usernames.token);
  if (!token) {
    return <Navigate to="/SignIn" replace />;
  }
  return children;
}

export default ProtectedRoute;
