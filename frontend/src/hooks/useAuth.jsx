import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem("token"), []);

  const isAuthenticated = Boolean(token);

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  return { token, isAuthenticated, signOut };
};
