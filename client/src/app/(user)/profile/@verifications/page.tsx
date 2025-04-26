"use client";

import React from "react";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function VerificationsPage() {
  return (

    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Verifications</h2>
      <div className="bg-blue-50 p-8 rounded-lg text-center border border-blue-100">
        <CheckCircleIcon className="h-12 w-12 mx-auto text-blue-400 mb-2" />
        <p className="text-gray-700">You have no pending verifications.</p>
      </div>
    </div>
  );
} 