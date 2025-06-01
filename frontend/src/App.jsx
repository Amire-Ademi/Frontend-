import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  Auth } from "./pages";
import AdminDashboard from "./pages/admin/Dashboard"
import WaiterMenagament from "./pages/admin/WaiterMenagament";
import Header from "./components/shared/Header";
import CreateOrder from "./pages/CreateOrder";
import TablesList from "./pages/admin/TablesList";
import AdminProducts from "./pages/admin/AdminProducts";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthContext";
import Register from "./pages/Register";
import WaiterDashboard from "./pages/waiter/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/admin/Dashboard" element={<AdminDashboard/>}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/WaiterMenagament" element={<WaiterMenagament />}></Route>
          <Route path="/CreateOrder" element={<CreateOrder />}></Route>
          <Route path="/TablesList" element={<TablesList />}></Route>
          <Route path="/AdminProducts" element={<AdminProducts />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/waiter/Dashboard" element={<WaiterDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
