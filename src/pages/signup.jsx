import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import NavLogo from "../components/navLogo";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

function SignUserUp() {
  const navigate = useNavigate();

  const handleSuccess = (tokenResponse) => {
    console.log(tokenResponse);
    navigate.push("/dashboard");
  };

  // const handleAppleSuccess = (appleToken) => {
  //   // Send appleToken to backend
  //   // Redirect user to dashboard
  //   console.log("Apple token:", appleToken);
  //   navigate.push("/dashboard");
  // };

  // const login = useGoogleLogin({
  //   onSuccess: handleSuccess,
  //   redirect_uri: "http://localhost:5173/auth/google/callback",
  // });

  const [formData, setFormData] = useState({
    user_id: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0, // Score from 0 to 4
    length: 0, // Length of the password
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "password") {
      const result = zxcvbn(value);
      setPasswordStrength({
        score: result.score,
        length: value.length,
        feedback: result.feedback.suggestions[0] || "Strong", // Default to "Strong" if no suggestion
      });
    }
  };
  const showAlertSuccess = () => {
    Swal.fire({
      title: "Welcome!",
      text: "Account Created.",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const showAlertError = () => {
    Swal.fire({
      title: "Something is wrong...",
      text: "Please make sure your passwords match.",
      icon: "error",
      showDenyButton: true,
      showConfirmButton: false,
      denyButtonText: "Dismiss",
    });
  };

  const getStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
        return "bg-red-500"; // Weak
      case 1:
        return "bg-orange-500"; // Fair
      case 2:
        return "bg-yellow-500"; // Good
      case 3:
        return "bg-green-500"; // Strong
      case 4:
        return "bg-blue-500"; // Very Strong
      default:
        return "bg-gray-300"; // No input
    }
  };

  const getBarWidth = () => {
    const minBarWidth = 20; // Minimum width for the progress bar
    const maxBarWidth = 100; // Maximum width for the progress bar
    const passwordLength = formData.password.length;
    const barWidth = (passwordLength / 16) * 100; // Assume maximum password length of 16 characters
    return `${Math.min(maxBarWidth, Math.max(minBarWidth, barWidth))}%`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword == formData.password) {
      try {
        const response = await fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/signup",
          {
            // Update the URL to match your Flask backend URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Assuming formData contains user input
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Handle successful response
        const data = await response.json();
        console.log("Signup successful:", data);
      } catch (error) {
        // Handle errors
        console.error("Error signing up:", error.message);
      }
      showAlertSuccess();
    } else if (formData.confirmPassword != formData.password) {
      showAlertError();
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
          <h1 className="font-custom font-bold text-2xl mb-8">
            Welcome to Epash AI!
          </h1>
          <form onSubmit={handleSubmit} className="w-full mx-auto">
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
            <div className="mb-4">
              <label
                className="block text-epash-green font-custom italic text-md font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-4 px-5 text-epash-green italic leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                onChange={handleChange}
                value={formData.fullName}
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-6">
              <div
                className={`${getStrengthColor()} h-2 rounded-full mb-2`}
                style={{ width: getBarWidth() }}
              ></div>
              <p className="text-sm text-gray-600">
                {passwordStrength.feedback}
              </p>
            </div>
            <div className="mb-6">
              <label
                className="block text-epash-green font-custom italic text-md font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-4 px-5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="***************"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <div className="flex gap-3 items-center my-5">
            <input
                type="checkbox"
                required
              />
            <p className="text-sm text-stone-800">I agree to the <Link to="/privacy-policy" className="text-epash-green underline">Privacy Policy</Link> and <Link to="/terms-conditions" className="text-epash-green underline">Terms & Conditions of Epash AI</Link></p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-epash-green hover:bg-green-600 hover:scale-110 duration-150 text-white font-bold text-xl py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="flex justify-between items-center gap-2 w-full mt-8">
              <hr className="flex-grow" />
              <p className="px-2 text-xs text-gray-400">Or With</p>
              <hr className="flex-grow" />
            </div>
            <div className="flex gap-3 justify-center my-10">
              <button
                className="h-16 w-16 rounded-xl shadow-md p-2 flex justify-center items-center hover:scale-105 duration-200"
                // onClick={() => login()}
              >
                <img src="../src/assets/google.png" className="w-8" />
              </button>
              <button className="h-16 w-16 rounded-xl shadow-md p-2 flex justify-center items-center hover:scale-105 duration-200">
                <img src="../src/assets/apple.png" className="w-8" />
              </button>
              <button className="h-16 w-16 rounded-xl shadow-md p-2 flex justify-center items-center hover:scale-105 duration-200">
                <img src="../src/assets/meta.png" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUserUp;
