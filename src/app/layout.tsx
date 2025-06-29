import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BookProvider } from "../context/BookContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cade Meu Livro",
  description: "Sistema de gerenciamento de coleção de livros e mangás",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen text-gray-900`}
      >
        <AuthProvider>
          <BookProvider>
            <ThemeProvider>
              <Navbar />
              <main className="container mx-auto py-8 px-4">
                {children}
              </main>
            </ThemeProvider>
          </BookProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
