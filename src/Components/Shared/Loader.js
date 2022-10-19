import React from "react";
import { InfinitySpin, Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    </div>
  );
};

export default Loader;
