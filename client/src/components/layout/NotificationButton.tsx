import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { io } from "socket.io-client";
import { BellIcon } from "lucide-react";
import { toast } from "sonner";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const socket = io(api_url);

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  senderId: string;
  productId: string;
}

const NotificationButton = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId || !socket) return;

    const handleNotification = (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      toast.message(notification.message);
    };

    socket.emit("joinRoom", { userId });
    socket.on("receiveNotification", handleNotification);

    return () => {
      socket.off("receiveNotification", handleNotification);
    };
  }, [userId]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <BellIcon className="w-7 h-7 text-gray-600 mb-2 hover:scale-105" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif.id} className="p-2 border-b last:border-none">
              <div
                className={`flex justify-between ${
                  notif.isRead ? "text-gray-500" : "font-bold"
                }`}
              >
                <span>{notif.message}</span>
                {!notif.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="text-xs text-blue-500"
                  >
                    Mark as read
                  </button>
                )}
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
