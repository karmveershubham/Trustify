'use client'

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/services/store";
import { fetchUser, logout } from "@/services/slices/authSlices";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {  useSearchParams } from "next/navigation"; 

export default function Profile() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();  // ✅ Use it inside the component
  const userId = searchParams.get("userId");  // ✅ Extract userId from URL
  console.log("Extracted userId from URL:", userId);  // ✅ Debugging log
  useEffect(() => {
    if (!user && userId) {
      dispatch(fetchUser(userId));  // ✅ Fetch user by ID if not in Redux
    }
  }, [dispatch, user, userId]);
 
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logout()).unwrap();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center mt-20">Loading...</div>; // Loader Placeholder
  }

  return (
    <div className="min-h-screen flex justify-center items-center mt-24">
      <div className="grid grid-cols-[2fr_5fr] min-h-screen">
        
        {/* LEFT PANEL (Profile & Navigation) */}
        <Card className="w-[350px] mx-[30px] my-[30px]">
          <div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[4px] mb-4">
              <Image
                className="rounded-full object-cover w-full h-full"
                alt="User Profile"
                src={user?.profile_picture || "/images/profile.png"} 
                fill
              />
            </div>
            <CardTitle className="px-6 text-center">{user?.name}</CardTitle>
            <CardDescription className="px-6 py-2 text-center">{user?.email}</CardDescription>
          </div>

          {/* Navigation Buttons */}
          <div className="grid w-full items-center gap-5 my-4">
            <Button className="w-full" onClick={() => router.push('/products')}>Products</Button>
            <Button className="w-full" onClick={() => router.push(`/list-product?userId=${user.id}`)}>Sell Product</Button>
            <Button className="w-full" onClick={() => router.push('/contacts')}>My Contacts</Button>
            <Button className="w-full">My Orders</Button>
            <Button className="w-full">Change Password</Button>
            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleLogout} disabled={isLoading}>
              {isLoading ? "Logging Out..." : "Logout"}
            </Button>
          </div>
        </Card>

        {/* RIGHT PANEL (Account Info) */}
        <div className="min-h-screen">
          <Card className="bg-[#FAFAFA] w-[1055px] mx-[30px] my-[30px]">
            <CardTitle className="text-xl mx-[30px] my-[30px]">Account Info</CardTitle>
            <CardContent>
              <div className="grid w-full items-center gap-4 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input id="firstname" placeholder="First name" defaultValue={user?.name.split(" ")[0]} />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input id="lastname" placeholder="Last name" defaultValue={user?.name.split(" ")[1] || ""} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" placeholder="Email address" defaultValue={user?.email} disabled />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="phoneno">Phone No.</Label>
                  <Input id="phoneno" placeholder="Phone number" defaultValue={user?.mobile_no} />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button className="w-[120px] h-[50px] px-5">Save</Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
