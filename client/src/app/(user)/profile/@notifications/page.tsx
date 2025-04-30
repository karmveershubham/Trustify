 "use client";

import React, { useEffect, useState } from "react";
import { BellIcon } from "lucide-react";

type NotificationType = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  senderId: string;
  productId: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`,{
        method: "GET",
        credentials: "include",
      }); 
        const data = await response.json();
        console.log(data)
        const notification = Array.isArray(data) ? data : [];
        setNotifications(notification);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  function groupNotifications(notifications: NotificationType[]) {
    const grouped: Record<string, NotificationType[]> = {};

    notifications.forEach((n) => {
      const date = n.timestamp.slice(0, 10); // "DD-MM-YYYY"
      grouped[date] = [...(grouped[date] || []), n];
    });

    return grouped;
  }

  const groupedNotifications = groupNotifications(notifications);

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading notifications...</div>;
  }

  if (notifications.length === 0) {
    return  <>
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Notifications</h2>
      <div className="bg-blue-50 p-8 rounded-lg text-center border border-blue-100">
        <BellIcon className="h-12 w-12 mx-auto text-blue-400 mb-2" />
        <p className="text-gray-700">You have no new notifications.</p>
      </div>
    </div>
    </>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
    {Object.keys(groupedNotifications).map((date) => (
      <div key={date}>
        <h2 className="text-sm font-bold text-gray-800 mb-3">{date}</h2>
        <div className="space-y-2">
          {groupedNotifications[date].map((n) => (
            <div
              key={n.id}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                <p className="text-sm text-gray-700 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.timestamp.slice(11)}</p>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0">
                <a
                  href={`/products/${n.productId}`}
                  className="text-blue-500 text-xs font-medium hover:underline"
                >
                  View Product
                </a>

                <button
                  className="text-green-500 text-xs font-medium hover:underline"
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  );
}
