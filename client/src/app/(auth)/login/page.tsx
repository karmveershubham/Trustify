"use client";

import React, { useState } from "react";
import Image from "next/image";
import loginImage from "@/../public/images/login.png";
import {login} from "@/services/slices/authSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { loginSchema } from "@/validations/schemas";
import { useAppDispatch, useAppSelector } from "@/services/store";

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();
  const router = useRouter();
  const {error} = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    // Validate using Zod
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const errorObj: any = {};
      result.error.errors.forEach((err) => {
        errorObj[err.path[0]] = err.message;
      });
      setErrors(errorObj);
      return;
    }
  
    try {
      setIsLoading(true);
      
      // Dispatch login action and get the returned user data
      const user = await dispatch(login(formData)).unwrap();
      console.log("Login successful, User Data:", user); // Debugging log
  
      if (user?.id) {
        toast.success("Login successful!");
        router.push('/products');
      } else {
        toast.error("User ID not found in response.");
      }
      
    } catch (error) {
      toast.error("Failed to login. Please try again.");
      console.error("Login Error:", error);
    }
  
    setIsLoading(false);
  };
  
  
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="mt-8 flex justify-center m-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex items-center p-8 mx-4">
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
           
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <label className="text-sm text-black">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="h-11 w-full border border-gray-300 rounded-lg px-3"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <p></p>
              
              {/* Password Input */}
              <label className="text-sm text-black">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="h-11 w-full border border-gray-300 rounded-lg pl-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="w-[15.2px] h-[12px] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 uppercase text-sm font-medium"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Signup Link */}
            <div className="flex justify-center">
              <Link href="/downloads">
                <span className="text-xs uppercase text-gray-500">New User? Download App</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
