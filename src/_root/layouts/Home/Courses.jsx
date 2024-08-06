/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import CourseCard from "../CourseCard";
// import brand1 from "../../../assets/brand01.png.png";
// import brand2 from "../../../assets/brand02.png.png";
// import brand3 from "../../../assets/brand03.png.png";
// import brand4 from "../../../assets/brand04.png.png";
// import brand5 from "../../../assets/brand05.png.png";
// import brand6 from "../../../assets/brand06.png.png";
import useCourses from "../../../hook/useCourses";
import Cookies from "js-cookie";
import { RiLock2Line } from "react-icons/ri";
import PrimaryButton from "../../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import RouterData from "../../../router/RouterData";

// export const courseData = [
//   {
//     name: "Learning JavaScript With Imagination",
//     type: "technology",
//     rating: "4.8",
//     instructor: "John Doe",
//     lesson: 5,
//     time: "11h 30m",
//     classes: 22,
//     img: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     instructorImg:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     brand: brand1,
//   },
//   {
//     name: "The Complete Graphic Design for Beginners",
//     type: "design",
//     rating: "4.5",
//     instructor: "Wilson",
//     lesson: 60,
//     time: "76h 30m",
//     classes: 202,
//     img: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     instructorImg:
//       "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     brand: brand2,
//   },
//   {
//     name: "The Complete Graphic Design for Beginners",
//     type: "design",
//     rating: "4.5",
//     instructor: "Wilson",
//     lesson: 60,
//     time: "76h 30m",
//     classes: 202,
//     img: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     instructorImg:
//       "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     brand: brand2,
//   },
//   {
//     name: "The Complete Graphic Design for Beginners",
//     type: "design",
//     rating: "4.5",
//     instructor: "Wilson",
//     lesson: 60,
//     time: "76h 30m",
//     classes: 202,
//     img: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     instructorImg:
//       "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     brand: brand2,
//   },
// ];

const Courses = () => {
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState("all");
  // const tabs = [
  //   {
  //     name: "All Courses",
  //     value: "all",
  //   },
  //   {
  //     name: "Design",
  //     value: "design",
  //   },
  //   {
  //     name: "Business",
  //     value: "business",
  //   },
  //   {
  //     name: "Technology",
  //     value: "technology",
  //   },
  // ];

  const { courses, loading, error, refetch } = useCourses();
  const token = Cookies.get("token");

  return courses && token ? (
    <div className="w-full h-full py-24">
      <Wrapper>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h6 className="text-base px-4 py-2 rounded-full bg-primary/10 text-primary">
            Top Courses
          </h6>
          <h2 className="text-4xl font-semibold text-darkPrimary">
            Explore{" "}
            <span className="font-bold italic text-primary">Best Courses</span>
          </h2>
          <p className="w-full max-w-[500px] text-center text-text/80">
            Learn from the best to become the best. Our courses are designed to
            help you grow in your career.
          </p>
        </div>
        <div className="flex flex-col items-center mt-8 w-full">
          {/* <div className=" flex flex-wrap justify-center gap-2 items-center border-b border-darkPrimary/15 gap-y-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`${
                  activeTab === tab.value
                    ? " border-primary text-text"
                    : "border-transparent"
                } text-text/80 bg-transparent font-medium border-b-4 px-4 pb-2 transition-all ease-linear duration-300`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.name}
              </button>
            ))}
          </div> */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
            {courses.map((course, index) => (
              <CourseCard data={course} key={index} />
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  ) : (
    <div className="flex flex-col gap-4 py-20">
      <Wrapper>
        <div className="flex flex-col gap-2 items-center justify-center w-full  text-center max-w-[400px] mx-auto">
          <RiLock2Line className="text-6xl text-primary mb-1" />
          <h2 className="text-2xl font-bold">Login to view courses</h2>
          <p className="text-text/80">
            You need to login to view the courses. If you don't have an account,
            you can create one.
          </p>
          <PrimaryButton
            className="mt-4"
            onClick={() => {
              navigate(RouterData.auth.login);
            }}
          >
            Login
          </PrimaryButton>
        </div>
      </Wrapper>
    </div>
  );
};

export default Courses;
