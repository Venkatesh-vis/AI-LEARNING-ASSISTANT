import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { useAppSelector } from "../../features/hooks/reduxHooks";
import Spinner from "../shared/Spinner";

export default function ProtectedRoute() {
  const { isAuthenticated, checkAuthLoading } = useAppSelector((state) => state.auth);

  if (checkAuthLoading) {
    return (
      <Spinner/>
    );
  }

  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}