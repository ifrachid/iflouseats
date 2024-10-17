
import { useKeycloak } from "react-keycloak-js";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const SellerProtectedRoute = () => {
  const { keycloak, loading } = useKeycloak();
  if (loading) {
    return null;
  }
  if (keycloak?.tokenParsed?.realm_access?.roles.includes("seller")) {
    return <Outlet />;
  }
  toast.error("You do not have the permissions to access this page.")
  return <Navigate to="/" replace />;
};

export default SellerProtectedRoute;
