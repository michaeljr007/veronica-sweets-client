import React from "react";
import { GiHamburger } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaPizzaSlice } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { motion } from "framer-motion";

function OptionRow() {
  return (
    <div className="md:pt-10 pb-[4rem] md:pb-[7rem] md:mt-[5vh]">
      <div className="flex flex-wrap justify-evenly max-[450px]:grid max-[450px]:grid-cols-2 gap-4 md:p-4 p-2 md:gap-6">
        <motion.div
          whileHover={{
            translateY: -12,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center gap-5 bg-[#fde4e4] py-5 md:px-12 font-semibold rounded hover:cursor-pointer"
        >
          <span className="bg-[#df2020] md:p-4 p-2 rounded-[50%]">
            <GiHamburger className="text-white text-xl md:text-4xl" />
          </span>
          Fast Food
        </motion.div>
        <motion.div
          whileHover={{
            translateY: -12,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center gap-5 bg-[#fde4e4] py-5 md:px-12 font-semibold rounded hover:cursor-pointer"
        >
          <span className="bg-[#df2020] md:p-4 p-2 rounded-[50%]">
            <RiDrinks2Fill className="text-white text-xl md:text-4xl" />
          </span>
          Soft Drinks
        </motion.div>
        <motion.div
          whileHover={{
            translateY: -12,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center gap-5 bg-[#fde4e4] py-5 md:px-12 font-semibold rounded hover:cursor-pointer"
        >
          <span className="bg-[#df2020] md:p-4 p-2 rounded-[50%]">
            <FaPizzaSlice className="text-white text-xl md:text-4xl" />
          </span>
          Pizza
        </motion.div>
        <motion.div
          whileHover={{
            translateY: -12,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center gap-5 bg-[#fde4e4] py-5 md:px-12 font-semibold rounded hover:cursor-pointer"
        >
          <span className="bg-[#df2020] md:p-4 p-2 rounded-[50%]">
            <PiBowlFoodFill className="text-white text-xl md:text-4xl" />
          </span>
          African
        </motion.div>
      </div>
    </div>
  );
}

export default OptionRow;
