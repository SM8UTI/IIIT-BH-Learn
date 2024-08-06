import { Link, useParams } from "react-router-dom";
import useGetCourse from "../../hook/useGetCourse";
import Wrapper from "../layouts/Wrapper";
import { Breadcrumbs } from "@material-tailwind/react";
import RouterData from "../../router/RouterData";
import { RiFolderVideoLine, RiListIndefinite } from "react-icons/ri";
import { useEffect, useState } from "react";
import usePlayCourse from "../../hook/usePlayCourse";

const CourseFullDetails = () => {
  const { id } = useParams(); // Ensure id is correctly obtained from useParams
  const [playFile, setPlayFile] = useState(null);

  const { course, loading, error, refetch } = useGetCourse(id); // Pass id directly
  const {
    play,
    loading: playLoading,
    error: playError,
    refetch: playRefetch,
  } = usePlayCourse(id, playFile);

  useEffect(() => {
    if (course && course.length > 0) {
      setPlayFile(course[0]);
      console.log("CourseFullDetails course:", course[0]);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full min-h-dvh">
      <div className="bg-darkPrimary">
        <Wrapper>
          <div className="flex flex-row flex-wrap items-center justify-between py-3 gap-2">
            <div className="flex flex-col gap-1">
              <Breadcrumbs className="bg-transparent text-white p-0">
                <Link to={"/"} className="text-white opacity-90 font-primary">
                  Home
                </Link>
                <Link
                  to={RouterData.course}
                  className="text-white opacity-90 font-primary"
                >
                  Courses
                </Link>
              </Breadcrumbs>
              <div className="text-white flex flex-row items-center gap-2 ml-0 text-lg sm:text-2xl font-semibold">
                <RiFolderVideoLine />
                <h3>{id}</h3>
              </div>
            </div>
            <div className="text-lg text-white flex flex-row items-center gap-2">
              <RiListIndefinite />
              <span>{course ? course.length : "00"} Video</span>
            </div>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="flex flex-row gap-8 mt-6">
          <div className="w-full flex-1 border border-red-500">
            Video Player
          </div>
          <div className="w-full max-w-[400px] border border-red-500">
            Play List
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CourseFullDetails;
