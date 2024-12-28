'use client';
import React, { useState } from "react";
import Image from "next/image";
import loginImage from "@/../public/images/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    const host = process.env.BACKEND_HOST || 'http://localhost:8080';
    console.log("Host:", host);
    try {
      const result = await axios.post(`${host}/api/login`, {
        email,
        password,
      });
      console.log("Login successful:", result.data);
      router.push("/home"); // Navigate to user profile upon success
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to login. Please try again.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex items-center p-8 ">
          {/* Left Section with Image */}
          <div className="w-1/2 flex items-center justify-center">
            <Image src={loginImage} alt="Login" width={400} height={330} />
          </div>

          {/* Right Section with Form */}
          <div className="w-1/2 flex flex-col space-y-6 px-6">
            <h3 className="text-2xl font-bold text-black">Welcome Back</h3>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Login to Continue
            </p>

            {/* Display Error */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <label className="text-sm text-black">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <label className="text-sm text-black">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full border border-gray-300 rounded-lg pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="w-[15.2px] h-[12px] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 uppercase text-sm font-medium"
              >
                Login
              </button>
            </form>

            {/* Signup Link */}
            <div className="flex justify-center">
              <Link href="/register">
                <span className="text-xs uppercase text-gray-500">
                  New User? <span className="text-blue-600">Signup</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
