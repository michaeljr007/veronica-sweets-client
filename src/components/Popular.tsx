import React from "react";
import bread from "../assets/img/bread.png";
import burgerIcon from "../assets/img/burger.png";
import pizzaIcon from "../assets/img/pizza.png";
import FoodColumn from "./FoodColumn";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

function Popular() {
  const State = useSelector((state: RootState) => state);
  const { allFoods: foodItems } = State.AllFood;

  return (
    <div className="my-10 w-full text-center font-serif">
      <h1 className="text-black text-xl font-bold">Popular Foods</h1>
      <div className="md:mx-[10rem] my-10 py-4 px-10 bg-[#df2020] rounded-md">
        <div className="items-center md:flex md:justify-evenly md:mx-[10rem] text-white mx-[10vw]">
          <button className="text-[#df2020] bg-white rounded py-2 px-5">
            All
          </button>
          <button className="rounded max-[450px]:mt-2 py-2 px-5 hover:bg-white hover:text-[#df2020] flex gap-3 items-center">
            <img src={burgerIcon} alt="burger" className="w-[1.6rem]" />
            Rice
          </button>
          <button className="rounded py-2 px-5 hover:bg-white hover:text-[#df2020] flex gap-3 items-center">
            <img src={pizzaIcon} alt="pizza" className="w-[1.6rem]" />
            Swallow
          </button>
          <button className="rounded py-2 px-5 hover:bg-white hover:text-[#df2020] flex gap-3 items-center">
            <img src={bread} alt="bread" className="w-[1.6rem]" />
            Junk
          </button>
        </div>
      </div>

      {/* Map over the items array to display the popular food items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 lg:gap-x-8 mt-12 mx-5 lg:mx-16">
        {foodItems.map((item) => (
          <FoodColumn key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Popular;
