import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../utils/constant";

const useGetCourse = (id) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourse = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${API_URL}/course?courseName=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Response:", response.data.courses);

      const filteredArray = response.data.courses
        .filter((item) => item !== "__MACOSX")
        .sort((a, b) => {
          const numA = parseInt(a.split(".")[0]);
          const numB = parseInt(b.split(".")[0]);
          return numA - numB;
        });
      // console.log("Filtered Array:", filteredArray);

      setCourse(filteredArray);
      setError(null);
    } catch (err) {
      console.error("Fetch course error:", err); // Log error details
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [fetchCourse, id]); // Ensure id is included in dependency array

  const refetch = useCallback(() => {
    fetchCourse();
  }, [fetchCourse]);

  return { course, loading, error, refetch };
};

export default useGetCourse;
