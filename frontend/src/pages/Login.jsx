import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import bgRestaurant from "../assets/bg-restaurant.jpg"; 
import restaurantImage from "../assets/restaurant.jpg";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      login(res.data.user); 
    
      navigate(`/${res.data.user.role}/dashboard`);
      
    } catch (err) {
      alert("Login failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgRestaurant})` }}>
     
     <div className="flex flex-col md:flex-row bg-white bg-opacity-90 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full m-4">
        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto">
          <img
            src={restaurantImage}
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Form */}
        <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-lg w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded transition transform hover:scale-105 hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
