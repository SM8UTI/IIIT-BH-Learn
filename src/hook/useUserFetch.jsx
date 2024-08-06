import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../utils/constant";

const useUserFetch = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");

      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetch = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch };
};

export default useUserFetch;
