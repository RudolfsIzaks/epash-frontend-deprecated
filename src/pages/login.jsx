import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../components/navLogo";
import Swal from "sweetalert2";
import { useAuth } from "../components/auth"; // Ensure this path is correct based on your project structure

function LogUserIn() {
  const navigate = useNavigate();
  const { login } = useAuth();  // Destructure to get login function from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have been logged in.",
        confirmButtonColor: "green",
      });

      // Here you call login from AuthContext to update the user's logged-in status
      login(data.user_id); 
      console.log(data.user_id) // Assume the backend sends `user_id` on successful login
      navigate("/dashboard");

    } catch (error) {
      console.error("Error logging in:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "An error occurred while logging in. Please check your login info.",
        confirmButtonColor: "red",
      });
    }
  };

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />
        <div className="flex gap-3">
          <Link
            to="/"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            Back
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex w-auto my-10 justify-center items-center">
        <div className="rounded-xl bg-white shadow-2xl h-auto w-1/2 flex flex-col p-5">
          <h1 className="font-custom font-bold text-2xl mb-8">Welcome Back!</h1>
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-epash-green font-custom italic text-md font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-4 px-5 text-epash-green italic leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-epash-green font-custom italic text-md font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-4 px-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="***************"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-epash-green hover:bg-green-600 hover:scale-110 duration-150 text-white font-bold text-xl py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogUserIn;
