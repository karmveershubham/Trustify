"use client";

import React from "react";
import { RootState, useAppSelector } from "@/services/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  UserIcon,
  PhoneIcon,
  LockIcon,
  MapPinIcon,
  EditIcon
} from "lucide-react";

type EditFieldType = 'username' | 'phone' | 'password';

interface EditProfileDialogProps {
  type: EditFieldType;
  currentValue?: string;
}

export default function ProfilePage() {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div className="px-6 pb-8">
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between text-gray-700 w-full py-3 border-b border-gray-100">
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
            <span className="font-medium">Username</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{user?.name}</span>
            <EditProfileDialog type="username" currentValue={user?.name} />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-gray-700 w-full py-3 border-b border-gray-100">
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
            <span className="font-medium">Phone Number</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{user?.mobile_no}</span>
            <EditProfileDialog type="phone" currentValue={user?.mobile_no} />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-gray-700 w-full py-3 border-b border-gray-100">
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
            <span className="font-medium">Location</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{user?.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-gray-700 w-full py-3">
          <div className="flex items-center">
            <LockIcon className="h-5 w-5 mr-3 flex-shrink-0 text-gray-500" />
            <span className="font-medium">Password</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">••••••••</span>
            <EditProfileDialog type="password" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProfileDialog({ type, currentValue }: EditProfileDialogProps) {
  const [value, setValue] = React.useState(currentValue || "");
  
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
      initialValue: currentValue || "",
      type: "text"
    },
    phone: {
      title: "Edit Phone Number",
      label: "Phone Number",
      placeholder: "Enter new phone number",
      initialValue: currentValue || "",
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
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
          <EditIcon className="h-4 w-4 text-gray-500" />
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