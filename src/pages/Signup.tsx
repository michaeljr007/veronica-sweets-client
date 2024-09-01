import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import signUpImg from "../assets/img/pexels-rajesh-tp-749235-1600727.jpg";
import logo1 from "../assets/img/res-logo.2f9021c4.png";
import { FaLocationDot } from "react-icons/fa6";
import useScrollToTop from "../components/useScrollToTop";
import axios from "axios";

// Define the shape of the form data
interface FormData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
}

const Signup: React.FC = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process form data here

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SIGNUP}`,
        formData
      );
      const { data } = response;

      if (data.msg === "User Created") {
        navigate("/signup-success");
      }
    } catch (error: any) {
      const errorArr = error.response?.data?.errors;
      const adminCodeErr = error.response?.data?.msg;

      if (adminCodeErr) {
        alert(adminCodeErr);
      }

      if (errorArr) {
        let errDiv = document.querySelector(".error-div") as HTMLDivElement;
        let errorMsg = errorArr[0];

        errDiv.textContent = errorMsg.msg;

        errDiv.classList.toggle("hidden");

        setTimeout(() => {
          errDiv.classList.toggle("hidden");
        }, 2000);
      }
    }
  };

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
          <h1 className="text-3xl font-semibold">Sign up</h1>
          <Link to="/">
            <IoHome className="text-3xl text-[#df2020] hover:text-[#c42626]" />
          </Link>
        </div>
        <div className="error-div hidden mb-4 bg-red-500 text-white w-[76%] px-6 mx-auto py-2 rounded-lg"></div>
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
              required
              value={formData.lastname}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 py-2 px-4 w-full rounded mb-3"
            />

            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            <p className="mt-2 flex gap-2">
              Already have an account?{" "}
              <Link className="font-semibold text-[#df2020]" to="/login">
                Log in
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

export default Signup;
