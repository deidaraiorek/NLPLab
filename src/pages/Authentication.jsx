import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const AuthPage = () => {
  const { setIsLoggedIn, setIsAdmin } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const backendUrl = process.env.REACT_APP_API_URL;
    const url = `${backendUrl}/contract/user/${isLogin ? "login" : "register"}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Check if the response was successful
        // in your login or register function, after successful login/register
        
        if (responseData.token) {

          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: responseData.userId,
              token: responseData.token,
              isAdmin: responseData.isAdmin,
            })
          );
          setIsLoggedIn(true);
          setIsAdmin(responseData.isAdmin);

          navigate("/"); // Navigate to home page or dashboard after successful login/registration
        }
      } else {
        // If the response was not successful, throw an error
        throw new Error(responseData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!"); // This line uses react-hot-toast to display an error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                type="button"
                onClick={switchMode}
              >
                {isLogin ? "Create an Account" : "Already have an account?"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
