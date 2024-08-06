import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./_root/layouts/Header";
import Footer from "./_root/layouts/Footer";
import animation from "./assets/Animation.json";
import Lottie from "lottie-react";

const App = () => {
  return (
    <div className="font-primary">
      <Header />

      <Suspense
        fallback={
          <div className=" bg-white w-full h-dvh grid place-content-center overflow-hidden">
            <Lottie
              animationData={animation}
              loop={true}
              className="w-[200px]"
            />
            <span className="text-center -mt-12">Loading...</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
