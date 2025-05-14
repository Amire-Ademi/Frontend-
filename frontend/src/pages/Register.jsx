import { useState } from 'react';
import bgRestaurant from "../assets/bg-restaurant.jpg"; 
import restaurantImage from "../assets/restaurant.jpg"; 

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");  // Clear previous error messages
    setSuccessMessage("");  // Clear previous success messages

    if (!form.name || !form.email || !form.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // You can add more validation for password strength if needed here

    setIsLoading(true); // Set loading state to true before sending the request

    const requestBody = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Error: " + response.statusText);
      const data = await response.json();

      setSuccessMessage("User registered! Now login.");
      console.log("Dërgimi i të dhënave:", data);

      setForm({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      setErrorMessage("Error: " + err.message);
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white bg-opacity-90 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full m-4">
        {/* Left Side */}
        <div className="relative md:w-1/2 h-64 md:h-auto">
          <img src={restaurantImage} alt="Restaurant" className="w-full h-full object-cover" />
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 p-8 bg-white bg-opacity-90 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
          <p className="text-gray-600 text-center mb-6">
            We're excited to have you on board, please activate your account by filling the details below.
          </p>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2"
            />
            {/* Optional role dropdown */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2"
            >
             
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-orange-500 text-black font-bold py-2 rounded"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
