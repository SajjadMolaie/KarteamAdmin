import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Cartable from "./pages/Cartable";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Company from "./pages/Company";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={user} type={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute user={user} type={false}>
                <Verify />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} type={true}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cartable"
            element={
              <ProtectedRoute user={user} type={true}>
                <Cartable user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute user={user} type={true}>
                <Users user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute user={user} type={true}>
                <Reports user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company"
            element={
              <ProtectedRoute user={user} type={true}>
                <Company user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute user={user} type={true}>
                <Logout />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
