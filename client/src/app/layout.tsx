import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata:Metadata = {
  title: "Trustify",
  description: "Trustify is a marketplace where trust is built through your contacts. Every seller is someone within your network, ensuring authenticity and reliability.",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const initialUser = null;
  return (
    <html lang="en">
      <body>
          <AuthProvider>
            <Header/>
              {children}
            <Footer/>
          </AuthProvider>
      </body>
    </html>
  );
}
