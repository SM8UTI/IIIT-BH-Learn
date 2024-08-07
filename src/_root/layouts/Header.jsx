import Wrapper from "./Wrapper";
import Logo from "../../assets/logo.svg";
import RouterData from "../../router/RouterData";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Drawer } from "@material-tailwind/react";
import {
  RiBookmark3Line,
  RiChatSmile2Line,
  RiCloseLine,
  RiHome2Line,
  RiLogoutBoxLine,
  RiMenu4Line,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import useUserFetch from "../../hook/useUserFetch";
import Gravatar from "react-gravatar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cookies from "js-cookie";
import useLogout from "../../hook/useLogout";

export const headerLinks = [
  {
    title: "Home",
    link: "/",
    icon: <RiHome2Line />,
  },
  {
    title: "Courses",
    link: RouterData.course,
    icon: <RiBookmark3Line />,
  },
  {
    title: "Contact Us",
    link: RouterData.contactus,
    icon: <RiChatSmile2Line />,
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const { user, loading, refetch } = useUserFetch();
  const logout = useLogout();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    refetch();
    navigate("/");
    setOpen(false);
    if (result.success) {
      console.log(result.message);
      // Handle successful logout (e.g., redirect to login page)
    } else {
      console.error(result.message);
      // Handle logout failure
    }
  };

  return (
    <>
      <div className="py-5 border-b border-darkPrimary/20 sticky  bg-white z-[999]">
        <Wrapper>
          <div className="flex flex-row items-center justify-between">
            <div className="logo w-full max-w-[160px]">
              <img src={Logo} alt="" />
            </div>
            <div className="flex flex-row items-center gap-6">
              <nav className="lg:flex flex-row items-center gap-2 hidden">
                {headerLinks.map((link, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={link.link}
                      className={({ isActive }) =>
                        `font-primary capitalize text-sm font-medium px-3 py-2 rounded-full transition-all ease-in-out duration-300   flex flex-row items-center gap-1 ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-transparent text-text"
                        }`
                      }
                    >
                      {link.icon}
                      {link.title}
                    </NavLink>
                  );
                })}
              </nav>
              {!token ? (
                <Button
                  className="font-primary capitalize text-base font-semibold bg-secondary text-text rounded-full BoxShadow shadow-none hover:shadow-none hidden sm:flex"
                  onClick={() => {
                    navigate(RouterData.auth.login);
                  }}
                >
                  <span>Get Started</span>
                </Button>
              ) : loading ? (
                <SkeletonTheme>
                  <div className="flex flex-row items-center gap-2">
                    <div className="hidden sm:flex flex-col items-end">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={50} height={20} />
                    </div>
                    <Skeleton width={50} height={50} borderRadius={500} />
                  </div>
                </SkeletonTheme>
              ) : (
                <div className="flex flex-row items-center gap-2">
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <h5 className="font-semibold text-sm">{user?.name}</h5>
                    <h6 className="text-xs font-normal">@{user?.username}</h6>
                  </div>

                  <Gravatar
                    email={user?.email}
                    size={50}
                    className="rounded-full border-4 border-white"
                    default="identicon"
                  />
                  <Button
                    onClick={handleLogout}
                    className="bg-transparent hidden sm:flex border-none rounded-full text-text/80  flex-row items-center justify-center shadow-none hover:shadow-none font-primary font-medium gap-2 text-xl p-0 "
                  >
                    <RiLogoutBoxLine />
                  </Button>
                </div>
              )}
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="lg:hidden p-0 bg-background text-primary shadow-none hover:shadow-none text-2xl size-[50px] grid place-content-center"
              >
                <RiMenu4Line />
              </Button>
            </div>
          </div>
        </Wrapper>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="p-4"
      >
        <div>
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-xl font-semibold text-text">Menu</h3>
            <Button
              className="lg:hidden p-0 bg-red-500/10 text-red-500 shadow-none hover:shadow-none text-2xl size-[40px] grid place-content-center"
              onClick={() => {
                setOpen(false);
              }}
            >
              <RiCloseLine />
            </Button>
          </div>
          <nav className="flex flex-col gap-2 mt-4 flex-1  w-full min-h-[calc(100dvh_-_140px)]">
            {headerLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    `font-primary capitalize text-sm font-medium px-3 py-3 rounded-full transition-all ease-in-out duration-300   flex flex-row items-center gap-1 ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-transparent text-text"
                    }`
                  }
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {link.icon}
                  {link.title}
                </NavLink>
              );
            })}

            {token ? (
              loading ? (
                <SkeletonTheme>
                  <div className="flex flex-row items-center gap-2 mt-4">
                    <Skeleton width={50} height={50} borderRadius={500} />
                    <div className="flex flex-col">
                      <Skeleton width={120} height={20} />
                      <Skeleton width={60} height={20} />
                    </div>
                  </div>
                </SkeletonTheme>
              ) : (
                <>
                  <div className="flex flex-row items-center gap-2">
                    <Gravatar
                      email={user?.email}
                      size={50}
                      className="rounded-full border-4 border-white"
                      default="identicon"
                    />
                    <div className="flex flex-col text-left">
                      <h5 className="font-semibold text-sm">
                        {user?.name && user?.name.length > 24
                          ? user.name.slice(0, 24) + "..."
                          : user.name}
                      </h5>
                      <h6 className="text-xs font-normal">@{user?.username}</h6>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="mt-4 bg-transparent border border-text/15 rounded-full text-text/80 flex flex-row items-center justify-center shadow-none hover:shadow-none font-primary font-medium gap-2"
                  >
                    <RiLogoutBoxLine />
                    <span>Logout</span>
                  </Button>
                </>
              )
            ) : (
              <Button
                className="font-primary capitalize text-base font-semibold bg-secondary text-text rounded-full BoxShadow shadow-none hover:shadow-none  flex"
                onClick={() => {
                  navigate(RouterData.auth.login);
                }}
              >
                <span>Get Started</span>
              </Button>
            )}
          </nav>
          <div className="text-center text-sm text-text/70">
            <p>Maintained by Tech Society IIIT Bhubaneswar</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
