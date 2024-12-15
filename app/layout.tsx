import { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { WalletProvider } from "./components/WalletContext";

export const metadata: Metadata = {
  title: "Crypflip - Truly BIG wins.",
  description: "Win BIG and gain points!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text main-font">
        <WalletProvider>
          <Navbar></Navbar>
          <Sidebar></Sidebar>
          <div className="relative xl:ml-[13%] min-w-[calc(100vw-64rem)] h-[90vh]">
            {children}
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
