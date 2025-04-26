"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Notifications</h2>
      <div className="bg-blue-50 p-8 rounded-lg text-center border border-blue-100">
        <BellIcon className="h-12 w-12 mx-auto text-blue-400 mb-2" />
        <p className="text-gray-700">You have no new notifications.</p>
      </div>
    </div>
  );
} 