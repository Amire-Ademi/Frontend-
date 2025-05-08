import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);

  // Nëse nuk ka përdorues të loguar, ridrejtoje në login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Nëse roli i përdoruesit nuk është në listën e lejuar, ridrejtoje në faqen kryesore
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // Nëse përdoruesi ka rolin e duhur, lejo qasje në komponentin e fëmijës
  return children;
};

export default ProtectedRoute;
