import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import signUpImg from "../assets/img/pexels-rajesh-tp-749235-1600727.jpg";
import logo1 from "../assets/img/res-logo.2f9021c4.png";
import { FaLocationDot } from "react-icons/fa6";
import useScrollToTop from "../components/useScrollToTop";
import axios from "axios";
import { addProfile } from "../redux/slices/ProfileSlice";
import { useDispatch } from "react-redux";

// Define the shape of the form data
interface FormData {
  userEmail: string;
  userPassword: string;
}

const AdminLogin: React.FC = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOGIN}`,
        formData
      );
      const { data } = response;

      if (data.user) {
        dispatch(
          addProfile({
            id: data.user.id,
            name: data.user.name,
            image: data.user.image,
            token: data.user.token,
            email: data.user.email,
          })
        );
        navigate("/admin-dashboard");
      } else {
        alert("No user found");
      }
    } catch (error: any) {
      const errorArr = error?.response?.data?.errors;
      if (errorArr) {
        let errorMsg = errorArr[0];
        showAlert(errorMsg.msg);
      }
    }
  };

  function showAlert(msg: string) {
    const errDiv = document.querySelector(".error-div");

    if (errDiv) {
      errDiv.textContent = msg;
      errDiv.classList.toggle("hidden");

      setTimeout(() => {
        errDiv.classList.toggle("hidden");
      }, 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen flex flex-col md:flex-row"
    >
      <div className="hidden md:flex w-full md:w-1/2 relative">
        <img src={logo1} alt="Logo" className="w-16 ml-4 mt-2 absolute" />
        <img
          src={signUpImg}
          className="w-full h-full object-cover"
          alt="bg-img"
        />
        <h3 className="absolute bottom-8 left-4 text-lg font-semibold text-gray-400 flex items-center gap-1">
          Victoria Sweets
          <FaLocationDot className="animate-pulse" />
        </h3>
      </div>
      <div className="w-full md:w-1/2 lg:pt-10 bg-slate-50 flex flex-col justify-center p-8">
        <div className="flex bg-slate-50 justify-between items-center mb-8 md:mb-4 md:pt-12">
          <h1 className="text-3xl font-semibold">Admin Log in</h1>
          <Link to="/">
            <IoHome className="text-3xl text-[#df2020] hover:text-[#c42626]" />
          </Link>
        </div>
        <div className="error-div hidden mb-4 bg-red-500 text-white w-[76%] px-6 mx-auto py-2 rounded-lg"></div>
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Email address"
              required
              value={formData.userEmail}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="Password"
              required
              value={formData.userPassword}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />
            <p className="mt-2 flex gap-2">
              Don't have an account?{" "}
              <Link className="font-semibold text-[#df2020]" to="/sign-up">
                Sign up
              </Link>
            </p>
            <button
              className="w-full py-2 mt-5 bg-[#df2020] text-white font-semibold rounded hover:bg-[#c42626]"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <h3 className="font-bold mt-8 text-center text-[#df2020] md:mt-32">
          Veronica Sweets
        </h3>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
