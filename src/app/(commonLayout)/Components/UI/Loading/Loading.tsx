import React from "react";
import { Spinner } from "./Spinner";

const Loading = () => {
  return (
    <div className="bg-violet-500/10 h-screen w-full fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spinner size="large" show={true} className="text-violet-500">
        <span className="text-lg">Loading. Please wait...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
