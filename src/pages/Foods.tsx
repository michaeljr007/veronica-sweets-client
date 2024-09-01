import React from "react";
import Navbar from "../components/Navbar";
import bgImg from "../assets/img/pexels-robinstickel-70497.jpg";

import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import FoodColumn from "../components/FoodColumn";

function Foods() {
  const State = useSelector((state: RootState) => state);
  const { allFoods: foodItems } = State.AllFood;

  return (
    <>
      <Navbar current="foods" />
      <div className="mt-[12vh]">
        <div className="bg-black opacity-50 md:h-[30vh] h-[25vh] absolute w-[98.7vw]"></div>
        <img
          src={bgImg}
          className="w-[98.7vw] md:h-[30vh] h-[25vh] object-cover"
          alt=""
        />
        <h1 className="absolute top-[23.4vh] left-[7vw] z-20 text-white text-2xl md:text-4xl font-bold">
          All Foods
        </h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="I'm looking for...."
            className="border p-2 w-1/2"
          />
          <select className="border p-2">
            <option value="default">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foodItems.map((item) => (
            <FoodColumn key={item._id} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Foods;
