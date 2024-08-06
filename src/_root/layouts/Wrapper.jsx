/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-8 lg:px-12 ">
      {children}
    </div>
  );
};

export default Wrapper;
