import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./auth/AuthCallbackPage";

import SellerProtectedRoute from "./auth/SellerProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrdersPage from "./pages/OrdersPage";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import AdminPage from "./pages/AdminPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/details/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailsPage />
          </Layout>
        }
      />
      <Route
        path="/orders/:orderId"
        element={
          <Layout showHero={false}>
            <OrderDetailPage />
          </Layout>
        }
      />
      <Route
        path="/allOrders"
        element={
          <Layout showHero={false}>
            <OrdersPage />
          </Layout>
        }
      />
      <Route element={<SellerProtectedRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>
      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/adminpage"
          element={
            <Layout>
              <AdminPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
