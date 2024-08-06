import { useCallback } from "react";
import Cookies from "js-cookie";

const useLogout = () => {
  const logout = useCallback(async () => {
    try {
      localStorage.removeItem("token");

      Cookies.remove("token");

      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: error.message };
    }
  }, []);

  return logout;
};

export default useLogout;
