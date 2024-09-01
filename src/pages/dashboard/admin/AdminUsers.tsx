import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaCreditCard,
  FaArrowLeft,
  FaEdit,
  FaSearch,
  FaTools,
} from "react-icons/fa";
import useScrollToTop from "../../../components/useScrollToTop";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaTrash } from "react-icons/fa6";

type Property = {
  id: number;
  title: string;
  image: string;
  price: string;
};

let properties: Property[] = [
  {
    id: 1,
    title: "Chicken Pizza",
    image: "https://via.placeholder.com/300",
    price: "$45",
  },
  {
    id: 2,
    title: "Cheese Burger",
    image: "https://via.placeholder.com/300",
    price: "$23",
  },
  // Add more properties here
];

type Residents = {
  id: number;
  img: string;
  firstname: string;
  email: string;
  role: string;
  status: string;
  registered: string;
};

let residents: Residents[] = [
  {
    id: 1,
    img: "https://via.placeholder.com/300",
    firstname: "Joshua",
    email: "johndoe@gmail.com",
    status: "available",
    registered: "2024/6/8",
    role: "customer",
  },
  {
    id: 2,
    img: "https://via.placeholder.com/300",
    firstname: "Stephanie",
    email: "stephanie@gmail.com",
    status: "outdoor",
    registered: "2023/10/11",
    role: "customer",
  },
  {
    id: 3,
    img: "https://via.placeholder.com/300",
    firstname: "Gloria",
    email: "gloria@gmail.com",
    status: "available",
    role: "customer",
    registered: "2021/12/21",
  },
];

const AdminUsers: React.FC = () => {
  useScrollToTop();
  const navigate = useNavigate();
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

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  const handleDeleteConfirm = () => {
    const updatedProperties = properties.filter(
      (property) => property.id !== editFormData.id
    );
    properties = updatedProperties;
    setShowDeleteConfirmation(false);
    alert(`Property with ID ${editFormData.id} deleted!`);
  };

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
    try {
      if (newPropertyForm.images) {
        // Create FormData for the secondary images
        const secondaryImagesFormData = new FormData();
        for (let i = 0; i < newPropertyForm.images.length; i++) {
          secondaryImagesFormData.append("images", newPropertyForm.images[i]);
        }

        // Upload the secondary images
        const secondaryImagesResponse = await axios.post(
          "https://veronica-sweets-server.onrender.com/api/v1/uploads",
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
        await axios.post(
          "https://veronica-sweets-server.onrender.com/api/v1/properties",
          propertyData
        );
        alert("Food added!");
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("There was an error uploading the images:", error);
    }
  };

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
        <div className="text-center bg-gray-700 flex-1 h-screen w-screen content-center mx-auto text-white">
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
        </div>
      ) : (
        <div className="flex max-[450px]:block min-h-screen w-[98.75vw] bg-gray-800">
          {/* Sidebar */}
          <div
            className={`fixed md:fixed inset-0 z-50 bg-gray-600 lg:bg-gray-50 shadow w-64 lg:ml-[2%] lg:mt-[1.5%] lg:rounded-lg p-6 transition-transform duration-300 ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <h1 className="text-xl pt-6 md:pt-0 md:text-3xl max-[450px]:text-white font-bold mb-10">
              Admin Dashboard
            </h1>
            <ul className="space-y-6">
              <Link to={"/admin-dashboard"}>
                <li
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 lg:text-black md:hover:text-white lg:hover:bg-gray-600 text-white py-1 pl-2"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHome />
                  <span>Overview</span>
                </li>
              </Link>
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

              <li className="flex items-center space-x-3 cursor-pointer text-white bg-gray-800 md:bg-gray-600 py-1 pl-2">
                <FaUsers />
                <span>All Users</span>
              </li>

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
            <div className="lg:w-[68vw] lg:ml-[19vw] pt-4 lg:pt-6 max-[450px]:px-2">
              <div className="flex justify-between items-center">
                <h2 className="text-[0.8rem] lg:text-[1.7rem] ml-11 lg:ml-20 font-bold text-white">
                  All Residents
                </h2>

                <span className="flex gap-4 lg:ml-[-4rem]">
                  <form id="search-form">
                    <FaSearch className="absolute mt-[0.74rem] ml-2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Find Resident"
                      className="py-[0.45rem] lg:py-2 max-[450px]:w-[9rem] pl-8 rounded-lg shadow-md shadow-gray-300"
                    />
                  </form>
                  <span className="flex text-white gap-3 items-center">
                    <FaTools className="cursor-pointer hover:text-blue-400" />
                    <FaBell className="cursor-pointer hover:text-blue-400" />
                  </span>
                </span>
              </div>

              <div className="bg-gray-50 max-[450px]:overflow-x-scroll py-3 lg:py-5 max-[450px]:pl-2 max-[450px]:pr-4 lg:px-5 rounded-xl shadow shadow-gray-500 mt-[12%] lg:mt-[5%] z-20 absolute w-[95.5vw] lg:w-[64vw] lg:ml-20">
                <table className="w-[95vw] lg:w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="py-1 lg:py-2 text-left pl-4 pr-5">
                        Resident
                      </th>
                      <th className="py-1 lg:py-2 text-left pl-4 pr-5">Role</th>
                      <th className="py-1 lg:py-2 text-center pl-4 pr-5">
                        Status
                      </th>
                      <th className="py-1 lg:py-2 text-left pl-4 pr-5">
                        Registered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {residents.map((user) => (
                      <tr key={user.id} className="border-b border-gray-300">
                        <td className="px-2 lg:px-4 py-2">
                          <div className="my-1 lg:my-2 block lg:flex gap-3">
                            <span>
                              <img
                                src={user.img}
                                alt=""
                                className="w-[3rem] lg:w-[4rem] rounded-lg"
                              />
                            </span>
                            <span>
                              <h2>{user.firstname}</h2>
                              <h2>{user.email}</h2>
                            </span>
                          </div>
                        </td>
                        <td className="px-2 lg:px-4 py-2">
                          <div className="my-2">
                            <h2>{user.role}</h2>
                          </div>
                        </td>
                        <td className="px-2 lg:px-4 py-2">
                          <div className="my-2">
                            <h2
                              className={`py-2 max-[450px]:px-2 shadow shadow-gray-300 text-center rounded-lg ${
                                user.status === "available"
                                  ? "bg-emerald-500"
                                  : "bg-gradient-to-b from-gray-400 to-gray-600"
                              }  text-white font-bold`}
                            >
                              {user.status}
                            </h2>
                          </div>
                        </td>
                        <td className="px-2 lg:px-4 py-2">
                          <div className="my-2">
                            <h2>{user.registered}</h2>
                          </div>
                        </td>
                        <td className="px-2 lg:px-4 py-2">
                          <div className="my-0 lg:my-2 grid grid-cols-1 md:grid-cols-2 gap-3 lg:flex lg:gap-1 mt-[35%]">
                            <FaEdit className="cursor-pointer hover:text-blue-600" />
                            <FaTrash className="text-red-600 cursor-pointer hover:text-red-700" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-100 mt-[50vh] lg:mt-[50vh] h-[70vh] lg:h-[50vh] absolute w-[98.7vw]">
              <p className="lg:ml-[24vw] lg:mt-[38vh]">
                {" "}
                &copy; 2024. Built by <b>Ebeano Market ltd</b>
              </p>
            </div>
          </div>
        </div>
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
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[30%] p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this property?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteConfirm}
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

export default AdminUsers;
