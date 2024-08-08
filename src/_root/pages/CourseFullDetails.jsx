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
import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import VideoPlayer from "../../components/VideoPlayer";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import Skeleton from "react-loading-skeleton";

const CourseFullDetails = () => {
  const [playFile, setPlayFile] = useState("");
  const { id } = useParams();
  const { course, loading } = useGetCourse(id);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (course && course.length > 0) {
      setPlayFile(course[0]);
    }
  }, [course]);

  const fetchVideo = useCallback(async () => {
    if (!id || !playFile) {
      return;
    }

    // Check if the video URL is already cached in localStorage
    const cachedVideoUrl = localStorage.getItem(`${id}-${playFile}`);
    if (cachedVideoUrl) {
      setVideoUrl(cachedVideoUrl);
      setIsVideoLoading(false);
      return;
    }

    try {
      setIsVideoLoading(true);
      const response = await axios.get(
        `${API_URL}/play?courseName=${id}&fileName=${playFile}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const newVideoUrl = URL.createObjectURL(
        new Blob([response.data], { type: "video/mp4" })
      );
      setVideoUrl(newVideoUrl);

      // Cache the video URL in localStorage
      localStorage.setItem(`${id}-${playFile}`, newVideoUrl);
      setIsVideoLoading(false);
    } catch (error) {
      console.error("Error fetching video:", error);
      setIsVideoLoading(false);
    }
  }, [id, playFile]);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const handlePlayFileClick = (item) => {
    setPlayFile(item);
    fetchVideo();
  };

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
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <div className="w-full flex-1 ">
            {isVideoLoading ? (
              <div className="relative">
                <Skeleton height={400} width={"full"} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-2">
                  <RiPlayCircleLine className="text-text text-6xl" />
                  <p className="text-text w-full max-w-[250px] text-center">
                    Please wait while the video is loading...
                  </p>
                </div>
                <div>
                  <h3 className="text-text text-2xl font-semibold mt-4">
                    {playFile &&
                      playFile.replace(/^\d+\.\s*/, "").replace(/\.mp4$/, "")}
                  </h3>
                </div>
              </div>
            ) : (
              <VideoPlayer videoSrc={videoUrl} />
            )}
          </div>
          <div className="w-full lg:max-w-[400px]">
            <h4 className="text-xl font-semibold text-darkPrimary mb-4">
              Lessons List
            </h4>
            <div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="flex flex-col w-full gap-4 lg:h-[calc(100dvh_-_100px)] overflow-hidden overflow-y-scroll">
                  {Array.isArray(course) && course.length > 0 ? (
                    course.map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-row w-full items-center gap-2 bg-background p-4 text-text rounded-lg cursor-pointer ${
                          playFile === item ? "bg-darkPrimary text-white" : ""
                        }`}
                        onClick={() => handlePlayFileClick(item)}
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
