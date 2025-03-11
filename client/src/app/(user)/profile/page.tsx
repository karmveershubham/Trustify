'use client'

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Label} from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import Cookies from "js-cookie";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const {user, logout} = authContext;
  
  const auth = Cookies.get("is_auth");
  // useEffect(() => { 
  //   if (auth===undefined) {
  //     router.push('/login');
  //   }
  // }, [auth]);


  if(!user) return <p className="min-h-screen flex justify-center items-center">Loading.....</p>;

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const [user, setUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  //   useEffect(() => {
  //   fetchUserProfile();
  //   if (!user) router.push('/login');
  // }, []);

  // const fetchUserProfile = async () => {
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
  //       credentials: 'include',
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setUser(data.user);
  //     } else {
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     setIsLoading(true);
  //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
  //       method: 'POST',
  //       credentials: 'include',
  //     });
  //     setUser(null);
  //     router.push('/login');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  return (
    <div>
      <div className="grid grid-cols-[2fr_5fr] min-h-screen ">
        <Card className=" w-[350px] mx-[30px] my-[30px]">
          <div>
            <Image
            className="justify-center mx-auto"
              alt="profile"
              src="/images/profile.png"
              width={200}
              height={200}
            />
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