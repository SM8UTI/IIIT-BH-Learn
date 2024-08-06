import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { lazy } from "react";
import Auth from "../_auth/Auth";
import RouterData from "./RouterData";
const Home = lazy(() => import("../_root/pages/Home"));
const ContactUs = lazy(() => import("../_root/pages/ContactUs"));
const Courses = lazy(() => import("../_root/pages/Courses"));
const Signin = lazy(() => import("../_auth/layouts/Signin"));
const Signup = lazy(() => import("../_auth/layouts/Signup"));
const ForgotPassword = lazy(() => import("../_auth/layouts/ForgotPassword"));
const CourseFullDetails = lazy(() =>
  import("../_root/pages/CourseFullDetails")
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/course/:id",
        element: <CourseFullDetails />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: RouterData.auth.login,
        element: <Signin />,
      },
      {
        path: RouterData.auth.signup,
        element: <Signup />,
      },
      {
        path: RouterData.auth.forgotPassword,
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default AppRouter;
