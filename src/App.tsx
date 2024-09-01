import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Loader from "./components/Loader";
import Foods from "./pages/Foods";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/dashboard/users/UserDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import SignupSuccess from "./pages/signup-success";
import { fetchFoods } from "./redux/slices/AllFoodSlice";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // Preloader timeout
  useEffect(() => {
    dispatch(fetchFoods());

    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUsers />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
