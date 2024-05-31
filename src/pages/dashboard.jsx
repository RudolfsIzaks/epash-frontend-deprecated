import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import NavLogo from "../components/navLogo";
import Swal from "sweetalert2";
import DashNav from "../components/dashNav";
import { useAuth } from "../components/auth";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userDone, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Confirm Log Out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'include'  // Ensures cookies are included with the request
          });
  
          const data = await response.json();
          if (response.ok) {
            console.log("Logout successful:", data.message);
            navigate("/login");
          } else {
            console.error("Logout failed:", data.error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Logout failed! Please try again.'
            });
          }
        } catch (error) {
          console.error("Network error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Please check your connection and try again.'
          });
        }
      }
    });
  };

  useEffect(() => {
    fetch("https://epash-ai-jaroslavsbolsak.replit.app/api/user_info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setError("Failed to fetch data");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDone) {
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <div className="flex gap-3 items-center animate-pulse">
          <img src="../assets/logo.png" alt="Logo Epash" className="w-16" />
          <h1 className="font-bold text-4xl">Epash AI</h1>
        </div>
      </div>
    );// O r any other loading indicator
  }
  
  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />

        <div className="flex gap-3">
          <Link
            to="/new/campaign"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            New Campaign
          </Link>
        </div>
      </div>
      <DashNav handleLogout={handleLogout}/>
      <div className="mx-20 my-10">
       <h1 className="text-3xl font-custom font-black">Welcome, {userDone ? userDone.name : "Guest"}!</h1>
      </div>
    </>
  );
}

export default Dashboard;