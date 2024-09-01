import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUsers,
  FaCreditCard,
  FaArrowLeft,
} from "react-icons/fa";
import useScrollToTop from "../../../components/useScrollToTop";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBowlFood } from "react-icons/fa6";
import logo from "../../../assets/img/tribebyveronicaLogo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchFoods } from "../../../redux/slices/AllFoodSlice";

type Property = {
  id: number;
  title: string;
  image: string;
  price: string;
};

const AdminDashboard: React.FC = () => {
  useScrollToTop();
  const State = useSelector((state: RootState) => state);
  const { allFoods: foodItems } = State.AllFood;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Property>({
    id: 0,
    title: "",
    image: "",
    price: "",
  });

  type NewPropertyForm = {
    title: string;
    images: FileList | null;

    price: string;

    description: string;
  };

  const [newPropertyForm, setNewPropertyForm] = useState<NewPropertyForm>({
    title: "",
    images: null, // Use FileList or null to handle multiple images

    price: "",

    description: "",
  });

  const userProfile: boolean = true;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // const handleDeleteConfirm = () => {
  //   const updatedProperties = properties.filter(
  //     (property) => property.id !== editFormData.id
  //   );
  //   properties = updatedProperties;
  //   setShowDeleteConfirmation(false);
  //   alert(`Property with ID ${editFormData.id} deleted!`);
  // };

  // const handleDeleteCancel = () => {
  //   setShowDeleteConfirmation(false);
  // };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Property updated!");
    setShowEditModal(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): any => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  // const handleAddModalClose = () => {
  //   setShowAddModal(false);
  // };

  const handleNewPropertyInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "images" && files) {
      setNewPropertyForm({
        ...newPropertyForm,
        images: files,
      });
    } else {
      setNewPropertyForm({
        ...newPropertyForm,
        [name]: value,
      });
    }
  };

  const handleAddPropertySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (newPropertyForm.images) {
        // Create FormData for the secondary images
        const secondaryImagesFormData = new FormData();
        for (let i = 0; i < newPropertyForm.images.length; i++) {
          secondaryImagesFormData.append("images", newPropertyForm.images[i]);
        }

        // Upload the secondary images
        const secondaryImagesResponse = await axios.post(
          `${process.env.REACT_APP_UPLOADS}`,
          secondaryImagesFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const secondaryImageUrls = secondaryImagesResponse.data.images;

        // Add other form data
        const propertyData = {
          title: newPropertyForm.title,

          price: newPropertyForm.price,
          description: newPropertyForm.description,

          images: secondaryImageUrls, // Use uploaded secondary image URLs
        };

        // Submit property data
        await axios.post(`${process.env.REACT_APP_CREATE_FOOD}`, propertyData);
        alert("Food added!");
        // Preloader timeout

        dispatch(fetchFoods());
        setIsLoading(false);
        setShowAddModal(false);
        setNewPropertyForm({
          title: "",
          images: null,
          price: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("There was an error uploading the images:", error);
    }
  };

  // Calculate total residents, staff, and properties (dummy data)
  const totalResidents = 120;

  const logoutHandler = () => {
    if (window.confirm("Log out?")) {
      // Assuming removeProfile is imported or defined somewhere else
      // dispatch(removeProfile());
      navigate("/home");
    }
  };

  return (
    <>
      {!userProfile ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="text-center bg-gray-700 flex-1 h-screen w-screen content-center mx-auto text-white"
        >
          <div>
            <h2 className="font-semibold text-xl">Please log in or sign up</h2>
            <div className="flex gap-3 my-5 justify-center">
              <Link to={"/login"}>
                <button className="bg-gray-500 rounded hover:bg-gray-600 py-[0.5rem] px-[1.5rem]">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-gray-500 rounded hover:bg-gray-600 py-[0.5rem] px-[1.5rem]">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="flex max-[450px]:block min-h-screen w-[98.75vw] bg-gray-800"
        >
          {/* Sidebar */}
          <div
            className={`fixed md:static inset-0 z-50 bg-gray-600 lg:bg-gray-50 shadow w-64 lg:ml-[2%] lg:mt-[1.5%] lg:rounded-lg p-6 transition-transform duration-300 ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <h1 className="text-xl pt-6 md:pt-0 md:text-3xl max-[450px]:text-white font-bold mb-10">
              Admin Dashboard
            </h1>
            <ul className="space-y-6">
              <li
                className="flex items-center space-x-3 cursor-pointer bg-gray-800 md:bg-gray-600 text-white py-1 pl-2"
                onClick={() => setSidebarOpen(false)}
              >
                <FaHome />
                <span>Overview</span>
              </li>
              <Link to={"/"}>
                <li
                  className="flex items-center space-x-3 mt-4 cursor-pointer text-white lg:text-black md:hover:text-white lg:hover:bg-gray-600 hover:bg-gray-800 py-1 pl-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaArrowLeft />
                  <span>Back Home</span>
                </li>
              </Link>
              <li
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 lg:text-black md:hover:text-white lg:hover:bg-gray-600 text-white py-1 pl-2"
                onClick={() => {
                  handleAddModalOpen();
                  setSidebarOpen(false);
                }}
              >
                <FaPlus />
                <span>Create New Food</span>
              </li>

              <Link to={"/admin-users"}>
                <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 lg:text-black md:hover:text-white lg:hover:bg-gray-600 text-white py-1 pl-2 mt-4">
                  <FaUsers />
                  <span>All Users</span>
                </li>
              </Link>

              <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 lg:text-black md:hover:text-white lg:hover:bg-gray-600 text-white py-1 pl-2">
                <FaCreditCard />
                <span>Transactions</span>
              </li>
            </ul>
            <div className="pt-4">
              <div
                onClick={logoutHandler}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 lg:text-black md:hover:text-white lg:hover:bg-gray-600 text-white py-1 pl-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <header className="flex justify-between items-center px-4 py-3 text-white top-0">
              <h1 className="text-lg md:text-2xl font-bold">
                Dashboard Overview
              </h1>
              <button
                className="lg:hidden block text-white text-2xl"
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
            </header>

            <section className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                <div className="bg-slate-50 shadow-md rounded-md p-6 items-center">
                  <h2 className="text-xl font-semibold mb-3">Total Foods</h2>
                  <FaBowlFood size={40} className="mx-auto mb-1 text-red-500" />
                  <p className="text-3xl font-bold mt-2">{totalResidents}</p>
                </div>

                <div className="bg-slate-50 shadow-md rounded-md p-6 items-center">
                  <h2 className="text-xl font-semibold mb-3">Total Users</h2>
                  <FaUsers size={40} className="mx-auto mb-1 text-blue-500" />
                  <p className="text-3xl font-bold mt-2">{totalResidents}</p>
                </div>
              </div>
            </section>

            <section className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Foods</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 lg:mx-3">
                {foodItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-slate-50 shadow-md rounded-md p-2"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-lg font-bold mb-4">{item.price}</p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          // setEditFormData(property);
                          setShowEditModal(true);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          // setEditFormData(property);
                          setShowDeleteConfirmation(true);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      )}
      {/* Modals */}
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[30%] p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Property</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />
              <input
                type="text"
                name="image"
                value={editFormData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />

              <input
                type="text"
                name="price"
                value={editFormData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-y-scroll flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[30%] p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Food</h2>
            <form onSubmit={handleAddPropertySubmit}>
              <input
                type="text"
                name="title"
                value={newPropertyForm.title}
                onChange={handleNewPropertyInputChange}
                placeholder="Title"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />
              <input
                type="file"
                name="images"
                multiple
                onChange={handleNewPropertyInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />

              <input
                type="text"
                name="price"
                value={newPropertyForm.price}
                onChange={handleNewPropertyInputChange}
                placeholder="Price"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />

              <textarea
                name="description"
                value={newPropertyForm.description}
                onChange={handleNewPropertyInputChange}
                placeholder="Description"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />

              {isLoading ? (
                <>
                  <img
                    src={logo}
                    className="w-[8rem] bg-white p-6 animate-pulse self-center"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add Food
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                  >
                    Cancel
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[30%] p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this food?</p>
            <div className="flex justify-end mt-4">
              <button
                // onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
