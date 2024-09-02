import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import bgImg from "../assets/img/pexels-robinstickel-70497.jpg";
import { FaTrashAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Link } from "react-router-dom";
import { removeFood } from "../redux/slices/FavouriteFoodSlice";

function Cart() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const favouriteFoods = state.FavouriteFood.favouriteFood;

  const total = useMemo(() => {
    return favouriteFoods.reduce((acc, item) => {
      const cleanedPrice = item.price.replace(/,/g, "");
      const itemPrice = Number(cleanedPrice);
      if (!isNaN(itemPrice)) {
        return acc + itemPrice;
      }
      return acc;
    }, 0);
  }, [favouriteFoods]);

  const handleFoodRemove = (foodId: string) => {
    dispatch(removeFood(foodId));
  };

  return (
    <>
      <Navbar current="cart" />
      <div className="mt-[12vh]">
        <div className="bg-black opacity-50 h-[30vh] absolute w-[98.6vw]"></div>
        <img src={bgImg} className="w-[100vw] h-[30vh] object-cover" alt="" />
        <h1 className="absolute top-[23.4vh] left-[7vw] z-20 text-white text-2xl md:text-4xl font-bold">
          Your Cart
        </h1>
      </div>

      <div className="p-8">
        <table className="w-[95vw] text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 p-4">Image</th>
              <th className="border-b-2 border-gray-200 p-4">Product Title</th>
              <th className="border-b-2 border-gray-200 p-4">Price</th>
              <th className="border-b-2 border-gray-200 p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {favouriteFoods.length < 1 ? (
              <h1 className="text-lg font-bold mt-6">Your cart is empty</h1>
            ) : (
              favouriteFoods.map((food, index) => (
                <tr key={index}>
                  <td className="p-4">
                    <img
                      src={food.images[0]}
                      alt={food.title}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="p-4">{food.title}</td>
                  <td className="p-4">₦{food.price}</td>
                  <td className="p-4">
                    <FaTrashAlt
                      onClick={() => handleFoodRemove(food._id)}
                      className="text-gray-500 cursor-pointer hover:text-red-600"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-8">
          <div>
            <p className="text-lg font-semibold">
              Subtotal:{" "}
              <span className="text-red-600 text-2xl">
                ₦{total.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Taxes and shipping will calculate at checkout
            </p>
            <div className="flex mt-4">
              <Link to={"/foods"}>
                <button className="bg-red-600 text-white py-2 px-4 rounded mr-4 hover:bg-red-700">
                  Continue Shopping
                </button>
              </Link>
              <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
