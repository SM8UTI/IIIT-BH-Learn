import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/constant";
import axios from "axios";
import Cookies from "js-cookie";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${API_URL}/browse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredArray = response.data.courses.filter(
        (item) => item !== ".DS_Store" && item !== "temp"
      );
      setCourses(filteredArray);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const refetch = useCallback(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch };
};

export default useCourses;
