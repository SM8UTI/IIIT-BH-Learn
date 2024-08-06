import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/constant";
import axios from "axios";
import Cookies from "js-cookie";

const usePlayCourse = (id, file) => {
  const [play, setPlay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!id || !file) {
      setError("Course ID and file name are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Play course:", id, file);

      const token = Cookies.get("token");
      const response = await axios.get(`${API_URL}/play`, {
        params: { courseName: id, fileName: file },
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlay(response.data);
      console.log("Play response:", response);
    } catch (err) {
      console.error("Fetch play error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while fetching the course"
      );
    } finally {
      setLoading(false);
    }
  }, [id, file]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { play, loading, error, refetch: fetch };
};

export default usePlayCourse;
