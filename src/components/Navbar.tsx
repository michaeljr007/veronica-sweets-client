import React, { useState } from "react";
import logo from "../assets/img/tribebyveronicaLogo.png";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store"; // Adjust the import path to where RootState is defined
import useScrollToTop from "./useScrollToTop";
import { removeFood } from "../redux/slices/FavouriteFoodSlice";

const Navbar = ({ current }: { current: string }) => {
  useScrollToTop();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const State = useSelector((state: RootState) => state);

  const userProfile = State.Profile[0];
  const favouriteFoods = State.FavouriteFood.favouriteFood;

  console.log(userProfile);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveFood = (itemId: string): void => {
    dispatch(removeFood(itemId));
  };

  return (
    <>
      <nav className="bg-white font-serif z-50 fixed top-0 shadow-lg w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between h-[5rem] py-5 md:px-10 pr-7">
            <div className="flex justify-between items-center w-full">
              <div className="text-[#df2020] text-xl font-bold md:ml-10">
                <Link to={"/"}>
                  <img src={logo} alt="Logo" className="md:w-[13%] w-[25%]" />
                </Link>
              </div>
              <div className="hidden lg:block">
                <ul className="ml-0 lg:mr-10 flex items-center space-x-4">
                  <Link to={"/"}>
                    <li
                      className={`${
                        current === "home" ? "text-[#df2020]" : "text-gray-900"
                      } hover:text-red-700 px-3 py-2 rounded-md text-lg font-medium`}
                    >
                      Home
                    </li>
                  </Link>
                  <Link to={"/foods"}>
                    <li
                      className={`${
                        current === "foods" ? "text-[#df2020]" : "text-gray-900"
                      } hover:text-red-700 px-3 py-2 rounded-md text-lg font-medium`}
                    >
                      Foods
                    </li>
                  </Link>
                  <Link to={"/cart"}>
                    <li
                      className={`${
                        current === "cart" ? "text-[#df2020]" : "text-gray-900"
                      } hover:text-red-700 px-3 py-2 rounded-md text-lg font-medium`}
                    >
                      Cart
                    </li>
                  </Link>
                  <Link to={"/contact"}>
                    <li
                      className={`${
                        current === "contact"
                          ? "text-[#df2020]"
                          : "text-gray-900"
                      } hover:text-red-700 px-3 py-2 rounded-md text-lg font-medium`}
                    >
                      Contact
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="flex gap-1 lg:ml-4 items-center">
                {!userProfile ? (
                  <div className="flex gap-4 max-[900px]:hidden">
                    <Link to={"/login"}>
                      <button>Log in</button>
                    </Link>
                    <Link to={"/signup"}>
                      <button>Sign up</button>
                    </Link>
                  </div>
                ) : (
                  <div className="max-[450px]:hidden">
                    <Link to={"/dashboard"}>
                      <button>Dashboard</button>
                    </Link>
                  </div>
                )}

                <div className="flex gap-3 ml-5">
                  <button onClick={toggleCart}>
                    {favouriteFoods.length < 1 ? null : (
                      <span className="text-[1rem] bg-[#df2020] text-white px-2 py-0 rounded-[50%] absolute top-[0.6rem]">
                        {favouriteFoods.length}
                      </span>
                    )}

                    <RiShoppingBasketLine className="text-[1.5rem] hover:text-[#df2020]" />
                  </button>
                  <Link to={"/dashboard"}>
                    <button>
                      <FaRegUser className="hover:text-[#df2020] text-[1.1rem] mt-1" />
                    </button>
                  </Link>

                  <Link to={"/admin-login"}>
                    <button className="mt-[0.15rem] max-[900px]:hidden">
                      Admin
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mr-7 ml-3 lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-[#df2020] focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={!isMenuOpen ? "block" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                  <path
                    className={isMenuOpen ? "block" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } z-50 fixed w-full bg-white`}
        >
          <ul className="px-2 pt-2 pb-3 space-y-5 sm:px-3 h-[90vh]">
            <Link to={"/"}>
              <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </li>
            </Link>
            <Link to={"/foods"}>
              <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Foods
              </li>
            </Link>
            <Link to={"/cart"}>
              <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Cart
              </li>
            </Link>
            <Link to={"/contact"}>
              <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </li>
            </Link>
            {!userProfile ? (
              <>
                <Link to={"/login"}>
                  <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Log in
                  </li>
                </Link>
                <Link to={"/signup"}>
                  <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Sign up
                  </li>
                </Link>
                <Link to={"/admin-login"}>
                  <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Admin
                  </li>
                </Link>
              </>
            ) : (
              <div>
                <Link to={"/dashboard"}>
                  <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </li>
                </Link>
                <Link to={"/admin-login"}>
                  <li className="text-[#df2020] hover:bg-red-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Admin
                  </li>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-80 z-50 shadow-lg transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={toggleCart} className="text-red-600">
            Close
          </button>
        </div>
        <div className="p-5">
          {favouriteFoods.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="mt-4">
              {favouriteFoods.map((food, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-8"
                >
                  <div className="flex items-center">
                    <img
                      src={food.images[0]}
                      alt={food.title}
                      className="w-12 h-12 mr-3"
                    />
                    <div>
                      <h3 className="text-[1rem] font-medium">{food.title}</h3>
                      <p className="text-gray-600">{food.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFood(food._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
              <Link to={"/cart"}>
                <button className="bg-[#df2020] text-white py-2 px-4 rounded-md border-none hover:bg-red-800">
                  Checkout
                </button>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
