"use client"; // This ensures Redux is used only on the client

import { Provider } from "react-redux";
import { store } from "@/services/store";
import { Toaster } from "react-hot-toast";


export function Providers({ children }: { children: React.ReactNode }) {
   return (
    <Provider store={store}>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
      {children}
    </Provider>
  );

}
