import { useEffect, useState } from "react";
// import {
//   RiBook3Line,
//   RiGraduationCapLine,
//   RiStarFill,
//   RiTimeLine,
// } from "react-icons/ri";
import { CourseImages } from "../../data/CourseImage";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CourseCard = ({ data }) => {
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data.toLowerCase().includes("figma")) {
      setImageUrl(CourseImages.figma);
    } else if (data.toLowerCase().includes("ui")) {
      setImageUrl(CourseImages.ui);
    } else {
      setImageUrl(CourseImages.development);
    }
  }, [data]);

  return (
    <div
      className="border border-text/15 rounded-lg overflow-hidden cursor-pointer"
      onClick={() => {
        navigate(`/course/${encodeURIComponent(data)}`);
      }}
    >
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full h-full max-h-[150px] rounded overflow-hidden">
          <img
            src={imageUrl}
            alt={data}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          {/* <div className="flex flex-row items-center gap-4 justify-between">
            <h6 className="text-sm w-full capitalize max-w-max  px-4 py-2 rounded-full bg-primary/10 text-primary">
              {data.type}
            </h6>
            <div className="flex flex-row items-center gap-2">
              <RiStarFill className="text-secondary" />
              <span>{data.rating}</span>
            </div>
          </div> */}
          <div className="mt-0">
            <h3 className="text-base text-text font-semibold">{data}</h3>
            {/* <div className="w-full flex flex-row items-center justify-between mt-4">
              <div className="flex flex-row items-center gap-2 text-sm text-text/80">
                <img
                  src={data.instructorImg}
                  alt={data.instructor}
                  className="size-[30px] rounded-full object-cover"
                />
                <span>{data.instructor}</span>
              </div>
              <img
                src={data.brand}
                className="w-full max-w-[50px] invert-[75%]"
                alt=""
              />
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="border-t border-text/15 flex flex-wrap items-center justify-evenly p-4">
        <div className="flex flex-row items-center gap-1 text-text/80 text-sm font-medium">
          <RiBook3Line className="text-primary text-xl" />
          <span>{data.lesson}</span>
        </div>
        <div className="flex flex-row items-center gap-1 text-text/80 text-sm font-medium">
          <RiTimeLine className="text-primary text-xl" />
          <span>{data.time}</span>
        </div>
        <div className="flex flex-row items-center gap-1 text-text/80 text-sm font-medium">
          <RiGraduationCapLine className="text-primary text-xl" />
          <span>{data.classes}</span>
        </div>
      </div> */}
    </div>
  );
};

export default CourseCard;
