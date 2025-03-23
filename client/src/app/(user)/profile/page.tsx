'use client'

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Label} from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/services/store";
import { fetchUser, logout } from "@/services/slices/authSlices";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Profile() {
 
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    useEffect(() => {
      if (!user) dispatch(fetchUser()); // Fetch user if not in Redux state
    }, [dispatch, user]);
  
  const handleLogout = async () => {
    try {
      try {
      await dispatch(logout()).unwrap();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;   //show loader task to be created
  }

  return (
    <div className="min-h-screen flex justify-center items-center mt-24">
      <div className="grid grid-cols-[2fr_5fr] min-h-screen ">
        <Card className=" w-[350px] mx-[30px] my-[30px]">
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
          <div className="grid w-full items-center gap-10 my-2">
            <div className="flex flex-col px-5">
              <Button onClick={()=>router.push('/products')}>Products</Button>
            </div>
            <div className="flex flex-col px-5">
              <Button onClick={()=>router.push('/list-product')}>Sell Product</Button>
            </div>
             <div className="flex flex-col px-5 mb-2">
              <Button onClick={()=>router.push('/contacts')}>My Contacts</Button>
            </div>
            <div className="flex flex-col px-5">
              <Button>My Order</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button>Change password</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button  variant="destructive" onClick={handleLogout} disabled={isLoading}>
                  {isLoading ? "Logging Out..." : "Logout"}</Button>
            </div>
            
          </div>
        </Card>
        
        <div  className="min-h-screen ">
          <Card className="bg-[#FAFAFA] w-[1055px] mx-[30px] my-[30px]">
            <CardTitle className= "text-xl mx-[30px] my-[30px]">Account Info</CardTitle>
            <CardContent>
              <div className="grid w-full items-center gap-4 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="First name">First Name</Label>
                    <Input id="firstname" placeholder="First name" />
                  </div>
                  <div>
                    <Label htmlFor="Last name">Last Name</Label>
                    <Input id="lastname" placeholder="Last name" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="Email address">Email address</Label>
                  <Input id="email" placeholder="Email address" />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="Phone no.">Phone no.</Label>
                  <Input id="phoneno" placeholder="Phone number" />
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