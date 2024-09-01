import React from "react";
import headerImg from "../assets/img/hero.e3ef74be.png";
import { MdArrowForwardIos } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="items-center font-serif md:py-[17vh] md:mb-[18vh] lg:mb-[24vh] justify-center h-[70vh]">
      <div className="grid grid-cols-2 max-[450px]:block my-auto mx-auto justify-between md:w-[80vw] w-[90vw]">
        <div className="w-[100%] lg:w-[93%] mt-[43vh] md:mt-[7rem]">
          <h3 className="mb-5 font-semibold">Easy way to make an order</h3>
          <h1 className="md:text-4xl text-gray-900 text-xl font-bold md:leading-[3rem]">
            <span className="text-[#df2020]">HUNGRY?</span> Just wait. Food
            Delivery within <span className="text-[#df2020]">20mins</span>
          </h1>
          <p className="mt-4 text-lg">
            The best eatery in Enugu state is here to satisty your taste buds.
          </p>
          <div className="mt-6 flex gap-5">
            <Link to={"/cart"}>
              <button className="flex bg-[#df2020] hover:bg-[#aa2121] rounded-md font-semibold py-[0.5rem] md:px-[1.1rem] px-[0.8rem] items-center text-white">
                Order Now <MdArrowForwardIos className="ml-1" />
              </button>
            </Link>
            <button className="text-[#df2020] rounded-md font-semibold py-[0.5rem] md:px-[1.1rem] px-[0.8rem] items-center border-[#df2020] border">
              See all foods
            </button>
          </div>
          <div className="flex gap-5 md:mt-9 mt-4">
            <h3 className="flex gap-3 items-center font-semibold max-[450px]:text-sm">
              <span className="p-1 bg-[#df2020] rounded-[50%]">
                <FaCar className="text-white" />
              </span>
              No shipping charge
            </h3>
            <h3 className="flex gap-3 items-center font-semibold max-[450px]:text-sm">
              <span className="p-1 bg-[#df2020] rounded-[50%]">
                <IoShieldCheckmarkOutline className="text-white" />
              </span>
              100% secure checkout
            </h3>
          </div>
        </div>
        <div>
          <img
            src={headerImg}
            className="hero-img w-[65%] z-10 md:w-[90%] ml-auto max-[450px]:right-0 max-[450px]:top-[10vh] max-[450px]:absolute md:mt-7"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
