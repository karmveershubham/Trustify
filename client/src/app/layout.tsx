import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import  { Providers } from "@/services/Provider"

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Trustify",
  description: "Trustify is a marketplace where trust is built through your contacts. Every seller is someone within your network, ensuring authenticity and reliability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-amber-50`} >
          <Providers>
            <Header/>
            <main>{children}</main>
            <Footer/>
          </Providers>
      </body>
    </html>
  );
}
