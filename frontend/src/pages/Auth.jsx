import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  Auth, Orders } from "../pages/";
import AdminDashboard from "./admin/Dashboard";
import Header from "../components/shared/Header";
import CreateOrder from "../pages/CreateOrder";
import SelectTable from "../pages/waiter/SelectTable";
// Importo komponentët e menaxherëve dhe roleve të tjera
import AuthProvider from "../context/AuthContext";
import Register from "../pages/Register";
import Login from "../pages/Login";
//import ProtectedRoute from "";
// Komponentët për dashboard-in e çdo roli
import ChefDashboard from "../pages/chef/DashboarChef";
import ClientDashboard from "../pages/client/DashboardClient";
import WaiterDashboard from "../pages/waiter/Dashboard";
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Header për aplikimin e saj */}
        <Header />
        <Routes>
          {/* Routes për aplikimin tuaj */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/CreateOrder" element={<CreateOrder />} />
          {/* Routes për regjistrim dhe login */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
           <Route path="/select-table" element={<SelectTable />} />
          {/* Routes për menaxherët dhe role të tjera */}
          <Route
            path="./admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/waiter/dashboard"
            element={
              <ProtectedRoute allowedRoles={["waiter"]}>
                <WaiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chef/dashboard"
            element={
              <ProtectedRoute allowedRoles={["chef"]}>
                <ChefDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/dashboard"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;