"use client";
import React, { useState } from "react";
import Image from "next/image";
import loginImage from "../../../public/images/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import HeaderSignLogin from "../../components/Header";
import axios from "axios";
//import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
export default function Signup() {
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };
   const router=useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
   // Check if email format is valid
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailPattern.test(email)) {
     alert("Please enter a valid email address.");
     return; // Prevent form submission if email is invalid
   }

   // Check if passwords match
   if (password !== correctPassword) {
     alert("Passwords do not match!");
     return; // Prevent form submission if passwords don't match
   }

   // Check password length
   if (password.length < 6) {
     alert("Password must be at least 6 characters long.");
     return; // Prevent form submission if password is too short
   }

    const signupData = {
      name, // Use the state variable directly
      email,
      password,
      confirmPassword: correctPassword, // Match the backend schema
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/signup", signupData, {
        headers: {
          "Content-Type": "application/json", // Ensure the request sends JSON data
        },
      });
      console.log("Signup successful:", response.data);
      router.push('/login'); 
      // Handle success (e.g., navigate to another page or show a success message)
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      // Display error message to the user if needed
    }
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white">
      <HeaderSignLogin />
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex">
          {/* Left Section with Image */}
          <div className="w-1/2 flex items-center justify-center">
            <Image src={loginImage} alt="Login" width={400} height={330} />
          </div>

          {/* Right Section with Form */}
          <div className="w-1/2 flex flex-col p-8 space-y-3">
            <h3 className="text-2xl font-bold text-black">Register</h3>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Join us
            </p>
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-black">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              

              <label className="text-sm text-black">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <label className="text-sm text-black">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full border border-gray-300 rounded-lg pl-10"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>

              <label className="text-sm text-black">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11 w-full border border-gray-300 rounded-lg pl-10"
                  onChange={(e) => {
                    setCorrectPassword(e.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>

              {/* Register Button */}
              <button className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <span className="uppercase text-sm font-medium">Register</span>
              </button>
            </form>
            {/* Already a user link */}
            <div className="text-center">
              <Link href="/login">
                <span className="text-xs uppercase text-gray-500">
                  Already user? LOGIN here
                </span>
              </Link>
            </div>

            {/* OR Divider */}
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:border-gray-400 hover:shadow transition"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                width={24}
                height={24}
              />
              <span>Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
