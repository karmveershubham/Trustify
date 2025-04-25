"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/services/store";
import { fetchUser, logout } from "@/services/slices/authSlices";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  Share2Icon, 
  EditIcon,
  UserIcon,
  LockIcon,
  LogOutIcon
} from "lucide-react";
import profile from '@/../../public/images/profile.png'
import Link from "next/link";

type EditFieldType = 'username' | 'phone' | 'password';

interface EditProfileDialogProps {
  type: EditFieldType;
  currentValue?: string;
}

interface ProductCardProps {
  title: string;
  price: string;
  timeAgo: string;
  condition: string;
  imageUrl: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) dispatch(fetchUser()); // Fetch user if not in Redux state
  }, [dispatch, user]);

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

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    ); // Simple loading indicator
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

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-screen-xl mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-1 ">
          <div className="bg-slate-100 p-6 rounded-lg shadow-sm flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-32 w-32 mb-2">
                <div className="relative h-full w-full">
                  <Image 
                    src={user?.profile_picture || "/images/profile.png"}
                    alt="Profile" 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Avatar>
              <Badge className="absolute bottom-2 right-2 bg-green-500 text-white border-none px-2">
                Verified
              </Badge>
            </div>
            
            <h1 className="text-2xl font-bold mt-4 mb-1 text-center">{user?.name}</h1>
            
            <div className="flex items-center mb-4">
              <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold ml-1">
                {typeof user?.trust_score === "object" && user.trust_score ? 
                  ((user.trust_score.low + user.trust_score.high) / 2).toFixed(1) : 
                  user?.trust_score || "4.8"}
              </span>
              <span className="text-gray-500 ml-1">({user.reviewCount || "47"} reviews)</span>
            </div>
            
            <div className="grid grid-cols-2 w-full mb-6 text-center bg-gray-100 rounded-lg overflow-hidden">
              <div className="p-3 border-r border-gray-200">
                <div className="font-bold">{user.soldItemsCount || "156"}</div>
                <div className="text-sm text-gray-500">Sold</div>
              </div>
              <div className="p-3">
                <span className="font-semibold ml-1">
                  {typeof user?.trust_score === "object" && user.trust_score ? 
                    ((user.trust_score.low + user.trust_score.high) / 2).toFixed(1) : 
                    user?.trust_score || "4.8"}
                </span>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
            
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-gray-700 w-full">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{user?.name}</span>
                </div>
                <EditProfileDialog type="username" currentValue={user?.name} />
              </div>
              
              <div className="flex items-center justify-between text-gray-700 w-full">
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{user?.mobile_no || "(+91)12345-67890"}</span>
                </div>
                <EditProfileDialog type="phone" currentValue={user?.mobile_no} />
              </div>
              
              <div className="flex items-center justify-between text-gray-700 w-full">
                <div className="flex items-center">
                  <LockIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Password</span>
                </div>
                <EditProfileDialog type="password" />
              </div>
              
              <div className="flex items-center text-gray-700 ">
                <MapPinIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{user?.location || "Delhi, India"}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <ClockIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                
                <span>Joined since { joinedDate ||"Jan 2025"}</span> 
              </div>
            </div>
            
            <div className="mt-6 w-full flex justify-around items-center space-x-4">
              <Button className=" w-full bg-green-600 hover:bg-green-700 text-white">
              <Link href={`/list-product?userId=${user.id}`}>Sell Products</Link>

              </Button>
              {/* <Button variant="outline" size="icon" className="col-span-1">
                <Share2Icon className="h-6 w-6" />
              </Button> */}
              <Button 
                className=" bg-red-500 hover:bg-red-600 text-white"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                ) : (
                  <>
                    <LogOutIcon className="h-4 w-4 mr-1" />
                    Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Listings */}
        <div className="md:col-span-2">
          <Tabs defaultValue="selling" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="selling" className="font-medium">
                Selling
              </TabsTrigger>
              <TabsTrigger value="sold" className="font-medium">
                Sold
              </TabsTrigger>
              <TabsTrigger value="reviews" className="font-medium">
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="selling" className="space-y-6">
              {user.sellingItems && user.sellingItems.length > 0 ? (
                user.sellingItems.map((item, index) => (
                  <ProductCard
                    key={index}
                    title={item.title}
                    price={item.price}
                    timeAgo={item.timeAgo}
                    condition={item.condition}
                    imageUrl={item.imageUrl}
                  />
                ))
              ) : (
                <ProductCard
                  title="Vintage Leather Jacket"
                  price="$120"
                  timeAgo="2 days ago"
                  condition="Good"
                  imageUrl="/leather-jacket.jpg"
                />
              )}
            </TabsContent>
            
            <TabsContent value="sold" className="space-y-6">
              {user.soldItems && user.soldItems.length > 0 ? (
                user.soldItems.map((item, index) => (
                  <ProductCard
                    key={index}
                    title={item.title}
                    price={item.price}
                    timeAgo={item.timeAgo}
                    condition={item.condition}
                    imageUrl={item.imageUrl}   //replaced by image url from the item object
                  />
                ))
              ) : (
                <ProductCard
                  title="iPhone 12 Pro"
                  price="$450"
                  timeAgo="1 week ago"
                  condition="Like New"
                  imageUrl="/iphone.jpg"
                />
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              {user.reviews && user.reviews.length > 0 ? (
                user.reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                    {/* Render review content */}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <p className="text-gray-500">User reviews will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function EditProfileDialog({ type, currentValue }: EditProfileDialogProps) {
  const [value, setValue] = useState(currentValue || "");
  
  // Define dialog configuration types
  interface DialogConfig {
    title: string;
    label: string;
    placeholder: string;
    initialValue: string;
    type: string;
    extraField?: {
      label: string;
      placeholder: string;
    };
  }
  
  // Configure dialog based on type
  const config: Record<EditFieldType, DialogConfig> = {
    username: {
      title: "Edit Username",
      label: "Username",
      placeholder: "Enter new username",
      initialValue: currentValue || "Sarah Johnson",
      type: "text"
    },
    phone: {
      title: "Edit Phone Number",
      label: "Phone Number",
      placeholder: "Enter new phone number",
      initialValue: currentValue || "(+91)-12345-67890",
      type: "tel"
    },
    password: {
      title: "Change Password",
      label: "New Password",
      placeholder: "Enter new password",
      initialValue: "",
      type: "password",
      extraField: {
        label: "Current Password",
        placeholder: "Enter current password"
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the submission to your backend
    console.log(`Updated ${type} to:`, value);
    // Close dialog
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{config[type].title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "password" && config[type].extraField && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="current-password">{config[type].extraField.label}</Label>
              <Input 
                id="current-password"
                type="password"
                placeholder={config[type].extraField.placeholder}
                required
              />
            </div>
          )}
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={`new-${type}`}>{config[type].label}</Label>
            <Input 
              id={`new-${type}`}
              type={config[type].type}
              placeholder={config[type].placeholder}
              defaultValue={type !== "password" ? config[type].initialValue : ""}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          
          {type === "password" && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                required
              />
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogTrigger>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProductCard({ title, price, timeAgo, condition, imageUrl }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/3 h-48 md:h-auto">
          <div className="relative w-full h-full">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <Badge className="absolute top-2 right-2 bg-white text-gray-800 font-medium shadow-sm">
            {condition}
          </Badge>
        </div>
        
        <div className="p-4 md:p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <ClockIcon className="h-4 w-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mt-4">
              <div className="text-2xl font-bold">{price}</div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0">
                  <Share2Icon className="h-4 w-4" />
                </Button>
                <Button size="sm" className="px-4 bg-orange-500 hover:bg-orange-600">View Details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}