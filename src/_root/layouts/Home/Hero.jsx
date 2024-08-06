import { Button, Typography } from "@material-tailwind/react";
import Wrapper from "../Wrapper";
import iiit from "../../../assets/iiitBh.svg";
import Marquee from "react-fast-marquee";
import brand1 from "../../../assets/brand01.png.png";
import brand2 from "../../../assets/brand02.png.png";
import brand3 from "../../../assets/brand03.png.png";
import brand4 from "../../../assets/brand04.png.png";
import brand5 from "../../../assets/brand05.png.png";
import brand6 from "../../../assets/brand06.png.png";
import brandStar from "../../../assets/brand_star.svg";

const Hero = () => {
  return (
    <div className="bg-white  w-full h-full">
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center mt-12 lg:pb-16">
            <Typography
              variant="h1"
              color="white"
              className="font-primary text-darkPrimary font-semibold text-[40px] sm:text-5xl leading-[1.4] sm:leading-[1.2]"
            >
              Unlock{" "}
              <span className="italic font-bold text-primary">
                Knowledge For Free
              </span>{" "}
              - Curated Courses for{" "}
              <div className="size-[60px] hidden  sm:inline-block">
                <img
                  src={iiit}
                  alt="IIIT Bhubaneswar Tech Society"
                  className="w-full h-full object-contain"
                />
              </div>{" "}
              IIIT-BH Students
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="font-primary text-text/70 font-medium"
            >
              At IIIT-BH Learn, we curate the best courses from various learning
              platforms and provide them exclusively for the students of IIIT
              Bhubaneswar—absolutely free!
            </Typography>
            <Button
              className="BoxShadow w-full  max-w-max rounded-full text-base mt-8 shrink-0 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text bg-secondary text-darkPrimary font-primary capitalize font-medium"
              size="lg"
            >
              Explore Courses
            </Button>
          </div>
          <div className="w-full max-w-[800px]">
            <img
              src="/heroImage.webp"
              alt="IIT Bhubaneswar Learn Image 1"
              className="w-full h-full"
            />
          </div>
        </div>
      </Wrapper>
      <div className="-rotate-4">
        <Marquee className="bg-darkPrimary py-4">
          <img
            src={brand1}
            alt="brand1"
            className="w-full h-[40px] object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand2}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand3}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand4}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand5}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand6}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand2}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
          <img
            src={brand3}
            alt="brand1"
            className="w-full max-w-[100px] h-auto object-contain ml-4"
          />
          <img
            src={brandStar}
            alt="brand1"
            className="w-full h-[40px] object-contain mx-4"
          />
        </Marquee>
      </div>
    </div>
  );
};

export default Hero;
