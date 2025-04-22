"use client"; // This ensures Redux is used only on the client

import { Provider } from "react-redux";
import { store } from "@/services/store";
import { Toaster } from 'sonner';


export function Providers({ children }: { children: React.ReactNode }) {
   return (
    <Provider store={store}>
      <Toaster position="bottom-right" richColors/>
      {children}
    </Provider>
  );

}
