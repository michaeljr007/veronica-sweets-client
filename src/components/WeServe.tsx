import React from "react";
import { motion } from "framer-motion";
import icon1 from "../assets/img/download.png";
import icon2 from "../assets/img/download (1).png";
import icon3 from "../assets/img/download (2).png";

function WeServe() {
  return (
    <div className="pt-9 h-auto text-center font-serif">
      <h2 className="font-bold text-[#df2020] text-lg md:text-xl mb-4">
        We're Here To Serve
      </h2>
      <h2 className="font-bold text-black text-2xl md:text-3xl mb-5">
        Just sit back at home we'll <br className="hidden md:block" /> handle{" "}
        <span className="text-[#df2020]">the rest</span>
      </h2>
      <p className="px-5 md:px-40 lg:px-80 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam nihil
        deleniti sed suscipit iste beatae expedita impedit culpa?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 py-10 justify-center lg:mx-10">
        <motion.div
          initial={{
            translateY: -100,
            opacity: 0,
          }}
          whileInView={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="flex flex-col items-center gap-5 py-5 lg:px-12 font-semibold rounded"
        >
          <div>
            <img src={icon1} alt="" className="w-[4rem]" />
          </div>
          <h2>Quick Delivery</h2>
          <p className="text-sm text-gray-700 px-[1.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi optio
            animi tempora!
          </p>
        </motion.div>
        <motion.div
          initial={{
            translateY: -100,
            opacity: 0,
          }}
          whileInView={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
          className="flex flex-col items-center gap-5 py-5 lg:px-12 font-semibold rounded"
        >
          <div>
            <img src={icon2} alt="" className="w-[4rem]" />
          </div>
          <h2>Super Dine In</h2>
          <p className="text-sm text-gray-700 px-[1.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi optio
            animi tempora!
          </p>
        </motion.div>
        <motion.div
          initial={{
            translateY: -100,
            opacity: 0,
          }}
          whileInView={{
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 2,
          }}
          className="flex flex-col items-center gap-5 py-5 lg:px-12 font-semibold rounded"
        >
          <div>
            <img src={icon3} alt="" className="w-[4rem]" />
          </div>
          <h2>Quick Delivery</h2>
          <p className="text-sm text-gray-700 px-[1.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi optio
            animi tempora!
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default WeServe;
