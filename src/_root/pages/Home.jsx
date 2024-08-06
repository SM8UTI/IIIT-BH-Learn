import { useEffect } from "react";
import Courses from "../layouts/Home/Courses";
import Hero from "../layouts/Home/Hero";

const Home = () => {
  useEffect(() => {
    document.title = "Home | IIIT-BH Learn";
  }, []);
  return (
    <div>
      <Hero />
      <Courses />
    </div>
  );
};

export default Home;
