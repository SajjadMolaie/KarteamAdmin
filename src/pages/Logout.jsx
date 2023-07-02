import { useEffect } from "react";
import { logout } from "../services/authService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/login";
  }, []);
};

export default Logout;
