import "./globals.css";

import {
  Plus_Jakarta_Sans,
} from "next/font/google";

import {
  CartProvider,
} from "@/context/CartContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "Shopify Store",
  description: "Shopify Integration Project",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <CartProvider>
          <Navbar />

          {children}

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}