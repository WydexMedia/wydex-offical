"use client"
import Header from "./CommonElements/Header/Header";
import Footer from "./CommonElements/Footer/Footer";
import { Toaster } from 'react-hot-toast';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster position="top-center" />
      <Footer />
    </>
  );
} 