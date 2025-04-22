import { useState, useEffect } from "react";
import { DropdownMenu,DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Backend socket URL

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  timestamp: string;
}

const NotificationButton = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Join a unique room for this user
    socket.emit("joinRoom", { roomId: userId });

    // Listen for incoming notifications
    socket.on("receiveNotification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [userId]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    // Here you can call your API to update the notification status
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="relative p-3 rounded-full bg-blue-600 text-white">
          Notifications
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 text-sm text-red-500">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className="p-2">
              <div
                className={`flex justify-between ${notif.isRead ? "text-gray-500" : "font-bold"}`}
              >
                <span>{notif.message}</span>
                <button
                  onClick={() => handleMarkAsRead(notif.id)}
                  className="text-xs text-blue-500"
                >
                  Mark as read
                </button>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(notif.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No new notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationButton;
