import React from "react";
import whyImg from "../assets/img/location.c2a80861.png";
import { FaRegCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function WhyUs() {
  return (
    <div className="md:mt-20 mt-12 mb-14 pt-20 pb-14 md:mx-12 mx-7">
      <div className="block md:grid md:grid-cols-2">
        <div className="mt-6">
          <img src={whyImg} alt="" className="w-[80%]" />
        </div>
        <div>
          <h2 className="font-bold text-3xl">
            Why <span className="text-[#df2020]">Veronica Sweets?</span>
          </h2>
          <p className="text-gray-600 mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            minus. Tempora reprehenderit a corporis velit, laboriosam vitae
            ullam, repellat illo sequi odio esse iste fugiat dolor, optio
            incidunt eligendi deleniti!
          </p>
          <ul className="mt-8 md:w-[80%] w-[95%] gap-y-4 flex flex-col">
            <motion.li
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
            >
              <h3 className="font-semibold flex gap-2 items-center">
                <FaRegCheckCircle color="#df2020" /> Fresh and tasty foods
              </h3>
              <p className="text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                deserunt unde maiores!
              </p>
            </motion.li>
            <motion.li
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
            >
              <h3 className="font-semibold flex gap-2 items-center">
                <FaRegCheckCircle color="#df2020" /> Quality Support
              </h3>
              <p className="text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                deserunt unde maiores!
              </p>
            </motion.li>
            <motion.li
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
            >
              <h3 className="font-semibold flex gap-2 items-center">
                <FaRegCheckCircle color="#df2020" /> Order from any location
              </h3>
              <p className="text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                deserunt unde maiores!
              </p>
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
