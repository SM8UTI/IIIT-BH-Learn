import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RouterData from "../router/RouterData";
import image from "../assets/authImage.png";
import iiit from "../assets/iiitBh.svg";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate(RouterData.auth.login);
    }
  }, [location.pathname]);
  return (
    <div className="font-primary grid  lg:grid-cols-2 w-full h-dvh">
      <div className="border-r border-text/20">
        <Suspense
          fallback={
            <div className="w-full h-full grid place-content-center text-sm text-darkPrimary">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <div className="bg-background relative hidden lg:inline-block">
        <div className="w-full h-[500px]  absolute bottom-0 left-0  authImage text-white px-4 flex flex-col justify-end">
          <h1 className="text-6xl p-8 font-semibold leading-[1.2]">
            Unlock
            <br /> <span className="font-bold italic">Knowledge</span>
          </h1>
        </div>
        <img
          src={image}
          alt="IIIT Bhubaneswar Tech Society"
          className="w-full h-full object-cover"
        />
        <img
          src={iiit}
          alt="IIIT Bhubaneswar Logo"
          className="absolute top-4 right-4 size-[80px] object-contain"
        />
      </div>
    </div>
  );
};

export default Auth;
