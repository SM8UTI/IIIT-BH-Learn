import Wrapper from "./Wrapper";
import logo from "../../assets/logo-white.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="bg-primary py-8 text-white">
        <Wrapper>
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <img src={logo} alt="Powered by Tech Society IIIT Bhubaneswar" />
              <p>Powered by Tech Society IIIT Bhubaneswar</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                Developed by
                <a
                  href="https://www.swoyam.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 "
                >
                  Swoyam Siddharth
                </a>{" "}
              </p>
              <p>Maintained by Tech Society IIIT Bhubaneswar</p>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="bg-darkPrimary text-white">
        <Wrapper>
          <div className="flex flex-wrap  flex-row w-full items-center justify-between gap-4 py-4">
            <p className="text-sm text-center sm:text-left">
              © 2021 Tech Society IIIT Bhubaneswar. All rights reserved.
            </p>
            <div className="flex flex-col justify-center w-full sm:max-w-max sm:flex-row  items-center gap-4 text-sm">
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms and Conditions</Link>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Footer;
