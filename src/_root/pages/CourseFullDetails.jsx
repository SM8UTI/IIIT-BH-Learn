import { Link, useParams } from "react-router-dom";
import useGetCourse from "../../hook/useGetCourse";
import Wrapper from "../layouts/Wrapper";
import { Breadcrumbs } from "@material-tailwind/react";
import RouterData from "../../router/RouterData";
import {
  RiFolderVideoLine,
  RiListIndefinite,
  RiPlayCircleLine,
} from "react-icons/ri";
import { useEffect, useLayoutEffect, useState } from "react";
import usePlayCourse from "../../hook/usePlayCourse";

import sampleVideo from "../../temp/sample.mp4";
import VideoPlayer from "../../components/VideoPlayer";

const CourseFullDetails = () => {
  const { id } = useParams(); // Ensure id is correctly obtained from useParams
  const [playFile, setPlayFile] = useState(sampleVideo);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { course, loading, error, refetch } = useGetCourse(id); // Pass id directly
  // const {
  //   play,
  //   loading: playLoading,
  //   error: playError,
  //   refetch: playRefetch,
  // } = usePlayCourse(id, playFile);

  // useEffect(() => {
  //   if (course && course.length > 0) {
  //     setPlayFile(course[0]);
  //     console.log("CourseFullDetails course:", course[0]);
  //   }
  // }, []);

  if (loading)
    return (
      <div className="w-full h-full grid place-content-center min-h-dvh">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full grid place-content-center min-h-dvh">
        Error: {error}
      </div>
    );

  return (
    <div className="w-full h-full min-h-dvh pb-20">
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
        <div className="flex flex-col sm:flex-row gap-8 mt-6">
          <div className="w-full flex-1 ">
            <VideoPlayer videoSrc={playFile} />
          </div>
          <div className="w-full max-w-[400px]">
            <h4 className="text-xl font-semibold text-darkPrimary mb-8">
              Lessons List
            </h4>
            <div>
              {loading ? (
                <div>loading...</div>
              ) : (
                <div className="flex flex-col gap-4  h-[calc(100dvh_-_200px)] overflow-hidden overflow-y-scroll">
                  {Array.isArray(course) && course.length > 0 ? (
                    course.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center gap-2 bg-background p-4 text-text rounded-lg cursor-pointer"
                      >
                        <div className="size-[40px] shrink-0 rounded-full grid place-content-center bg-darkPrimary text-white text-xl">
                          <RiPlayCircleLine />
                        </div>
                        <div>
                          <h5>
                            {item
                              .replace(/^\d+\.\s*/, "")
                              .replace(/\.mp4$/, "")}
                          </h5>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No lessons available.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CourseFullDetails;
