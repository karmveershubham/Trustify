"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/services/store";
import { fetchUser, logout } from "@/services/slices/authSlices";
import { toast } from 'sonner';
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon,
  LogOutIcon,
  ShoppingBagIcon,
  HeartIcon,
  BellIcon,
  UserCircleIcon,
  PencilIcon,
  UploadIcon,
  XIcon,
  CheckCircleIcon
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProfileLayout({
  children,
  profile,
  orders,
  wishlist,
  notifications,
  verifications,
  listings,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  orders: React.ReactNode;
  wishlist: React.ReactNode;
  notifications: React.ReactNode;
  verifications: React.ReactNode;
  listings: React.ReactNode;
}) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await dispatch(fetchUser()).unwrap();
      } catch (error) {
        toast.error("Failed to load user data");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    // Initial load
    loadUserData();
    
    // Set up interval to refresh user data every 30 seconds
    const refreshInterval = setInterval(loadUserData, 30000);
    
    // Set active tab based on pathname
    if (pathname.includes("/orders")) {
      setActiveTab("orders");
    } else if (pathname.includes("/wishlist")) {
      setActiveTab("wishlist");
    } else if (pathname.includes("/notifications")) {
      setActiveTab("notifications");
    } else if (pathname.includes("/verifications")) {
      setActiveTab("verifications");
    } else if (pathname.includes("/listings")) {
      setActiveTab("listings");
    } else {
      setActiveTab("profile");
    }

    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [dispatch, pathname, router]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout()).unwrap();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      setIsLoading(true);
      // Here you would implement the actual upload logic
      // For example, using FormData to send to your API
      // const formData = new FormData();
      // formData.append('profile_picture', selectedFile);
      // await uploadProfilePicture(formData);
      
      // For now, we'll just simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Profile picture updated successfully");
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      
      // Refresh user data to get the new profile picture
      dispatch(fetchUser());
    } catch (error) {
      toast.error("Failed to update profile picture. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  
  const joinedDate = user?.created_at ? new Date(
    user.created_at.year.low,
    user.created_at.month.low - 1,
    user.created_at.day.low
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }): null;

  // Extract trust score safely
  const trustScore = user?.trust_score?.low || 0;

  return (
    <div className="container mx-auto py-6 max-w-6xl mt-16">
      {/* Profile Card Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Profile Card & Navigation Container */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Navigation Sidebar */}
          <div className="lg:w-64 bg-blue-50 lg:border-r border-blue-100 h-full flex flex-col">
            <div className="flex flex-col p-4 space-y-6 flex-grow justify-between">
              <div className="space-y-6">
                <Button 
                  className={`w-full h-32 text-base font-medium items-center bg-transparent ${activeTab === "profile" ? "border-2 border-blue-700 text-blue-700 bg-blue-100" : "border-2 border-blue-500 text-blue-500"} hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 shadow-sm transition-all duration-200`}
                  onClick={() => setActiveTab("profile")}
                >
                  <div className="flex items-center justify-center w-full">
                    <UserCircleIcon className="h-6 w-6 mr-3" />
                    <span>Profile</span>
                  </div>
                </Button>
                
                <Button 
                  className={`w-full h-32 text-base font-medium items-center bg-transparent ${activeTab === "orders" ? "border-2 border-blue-700 text-blue-700 bg-blue-100" : "border-2 border-blue-500 text-blue-500"} hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 shadow-sm transition-all duration-200`}
                  onClick={() => setActiveTab("orders")}
                >
                  <div className="flex items-center justify-center w-full">
                    <ShoppingBagIcon className="h-6 w-6 mr-3" />
                    <span>Orders</span>
                  </div>
                </Button>
                
                <Button 
                  className={`w-full h-32 text-base font-medium items-center bg-transparent ${activeTab === "listings" ? "border-2 border-blue-700 text-blue-700 bg-blue-100" : "border-2 border-blue-500 text-blue-500"} hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 shadow-sm transition-all duration-200`}
                  onClick={() => setActiveTab("listings")}
                >
                  <div className="flex items-center justify-center w-full">
                    <UploadIcon className="h-6 w-6 mr-3" />
                    <span>My Listings</span>
                  </div>
                </Button>
                
                <Button 
                  className={`w-full h-32 text-base font-medium items-center bg-transparent ${activeTab === "wishlist" ? "border-2 border-blue-700 text-blue-700 bg-blue-100" : "border-2 border-blue-500 text-blue-500"} hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 shadow-sm transition-all duration-200`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  <div className="flex items-center justify-center w-full">
                    <HeartIcon className="h-6 w-6 mr-3" />
                    <span>Wishlist</span>
                  </div>
                </Button>
                
                <Button 
                  className={`w-full h-32 text-base font-medium items-center bg-transparent ${activeTab === "notifications" ? "border-2 border-blue-700 text-blue-700 bg-blue-100" : "border-2 border-blue-500 text-blue-500"} hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 shadow-sm transition-all duration-200`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <div className="flex items-center justify-center w-full">
                    <BellIcon className="h-6 w-6 mr-3" />
                    <span>Notifications</span>
                  </div>
                </Button>
                
                <Button 
                  className={`w-full h-32 text-base font-medium items-center bg-transparent ${activeTab === "verifications" ? "border-2 border-blue-700 text-blue-700 bg-blue-100" : "border-2 border-blue-500 text-blue-500"} hover:bg-blue-100 hover:border-blue-700 hover:text-blue-700 shadow-sm transition-all duration-200`}
                  onClick={() => setActiveTab("verifications")}
                >
                  <div className="flex items-center justify-center w-full">
                    <CheckCircleIcon className="h-6 w-6 mr-3" />
                    <span>Verifications</span>
                  </div>
                </Button>
              </div>
              
              <Button
                className="w-full h-32 text-base font-medium items-center bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-red-50 hover:border-red-500 hover:text-red-500 shadow-sm transition-all duration-200"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <LogOutIcon className="h-6 w-6 mr-3" />
                    <span>Logout</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="flex-1">
            {/* Profile header with avatar - centered on top */}
            <div className="relative px-6 py-8 flex flex-col items-center text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-40 w-40 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg">
                    <Image 
                      src={user?.profile_picture || "/images/profile.png"}
                      alt="Profile" 
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                      priority
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                  <div 
                    className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-md cursor-pointer hover:bg-blue-600 transition-colors"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-blue-900">{user?.name}</h1>
                
                <div className="flex items-center mt-1 text-blue-700 text-sm justify-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{user?.location}</span>
                  <span className="mx-2">•</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>Since {joinedDate || "Jan 2025"}</span>
                </div>
                
                <div className="flex items-center mt-2 text-sm justify-center">
                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full text-blue-600">
                    <StarIcon className="h-4 w-4 text-blue-500 fill-blue-500 mr-1" />
                    <span className="font-semibold">{trustScore}</span>
                    <span className="text-blue-500 ml-1">Trust Score</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    <Link href={`/list-product?userId=${user.id}`}>Sell Products</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Content based on active tab */}
            {activeTab === "profile" && profile}
            {activeTab === "orders" && orders}
            {activeTab === "wishlist" && wishlist}
            {activeTab === "notifications" && notifications}
            {activeTab === "verifications" && verifications}
            {activeTab === "listings" && listings}
          </div>
        </div>
      </div>

      {/* Profile Picture Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-blue-900">Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            {previewUrl ? (
              <div className="relative h-40 w-40 rounded-full overflow-hidden">
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  width={160} 
                  height={160}
                  className="object-cover w-full h-full"
                />
                <button 
                  className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="h-40 w-40 rounded-full bg-blue-50 flex items-center justify-center">
                <UploadIcon className="h-12 w-12 text-blue-400" />
              </div>
            )}
            <div className="w-full">
              <label 
                htmlFor="profile-upload" 
                className="w-full flex items-center justify-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer"
              >
                <UploadIcon className="h-5 w-5 mr-2" />
                Choose a file
              </label>
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
            <p className="text-xs text-blue-500 text-center">
              Recommended: Square image, at least 400x400px
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsUploadDialogOpen(false);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}