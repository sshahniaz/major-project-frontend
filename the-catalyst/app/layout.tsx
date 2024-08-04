import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "next-themes";
import ThemeSwitchBtn from "./components/ThemeSwitchBtn";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Catalyst",
  description: "A tool for predicting sales for a given ML project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NavBar />
          
        <main className="text-gray-700 dark:text-gray-200">
          {children}
          </main>

         
        
        </Providers>
      </body>
    </html>
  );
}
