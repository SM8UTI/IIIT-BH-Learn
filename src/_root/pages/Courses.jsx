import { RiLock2Line } from "react-icons/ri";
import PrimaryButton from "../../components/PrimaryButton";
import useCourses from "../../hook/useCourses";
import RouterData from "../../router/RouterData";
import Wrapper from "../layouts/Wrapper";
import Cookies from "js-cookie";
import CourseCard from "../layouts/CourseCard";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Courses = () => {
  const { courses, loading } = useCourses();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  return (
    <div className="pb-20">
      <div className="w-full h-full  bg-darkPrimary text-white">
        <Wrapper>
          <div className="min-h-[250px] flex flex-col items-center justify-center py-8">
            <h1 className="text-5xl font-medium text-center font-primary">
              Explore <span className="italic font-bold">Courses</span>
            </h1>
            <p className="w-full max-w-[500px] mx-auto mt-4 text-center">
              Learn from the best to become the best. Our courses are designed
              to help you grow in your career.
            </p>
          </div>
        </Wrapper>
      </div>
      <div>
        <Wrapper>
          <div>
            {courses && token ? (
              <>
                {loading ? (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                    <Skeleton height={200} className="w-full" />
                  </div>
                ) : (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
                    {courses.map((course, index) => (
                      <CourseCard data={course} key={index} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col gap-4 py-20">
                <Wrapper>
                  <div className="flex flex-col gap-2 items-center justify-center w-full  text-center max-w-[400px] mx-auto">
                    <RiLock2Line className="text-6xl text-primary mb-1" />
                    <h2 className="text-2xl font-bold">
                      Login to view courses
                    </h2>
                    <p className="text-text/80">
                      You need to login to view the courses. If you don't have
                      an account, you can create one.
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
            )}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Courses;
