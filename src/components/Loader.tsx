import React from "react";
import loader from "../assets/img/tribebyveronicaLogo.png";

function Loader() {
  return (
    <div className="h-[100vh] self-center items-center object-center justify-center content-center text-center w-[100vw] my-auto bg-gray-100 mx-auto">
      {/* Full-screen container with gray background */}
      <div className="py-10">
        {/* Padding for content */}
        <span>
          <img
            className="loading-img animate-pulse mt-[-1rem] max-[380px]:mt-[-4.5rem] lg:mt-[-4rem] mx-auto md:w-[200px] w-[170px] my-auto"
            src={loader} // Using the imported loader image
            alt="loader" // Alt text for accessibility
          />
        </span>
      </div>
    </div>
  );
}

export default Loader;
