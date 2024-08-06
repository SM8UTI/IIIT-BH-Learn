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
  RiMenu4Line,
} from "react-icons/ri";
import { useState } from "react";

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
  return (
    <>
      <div className="py-5 border-b border-darkPrimary/20 sticky top-0 left-0 bg-white z-[999]">
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
              <Button
                className="font-primary capitalize text-base font-semibold bg-secondary text-text rounded-full BoxShadow shadow-none hover:shadow-none hidden sm:flex"
                onClick={() => {
                  navigate(RouterData.auth.login);
                }}
              >
                <span>Get Started</span>
              </Button>
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
            <Button
              className="font-primary capitalize text-base font-semibold bg-secondary text-text rounded-full BoxShadow shadow-none hover:shadow-none"
              onClick={() => {
                navigate(RouterData.auth.login);
              }}
            >
              <span>Get Started</span>
            </Button>
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
