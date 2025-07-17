"use client"
import Header from "./CommonElements/Header/Header";
import Footer from "./CommonElements/Footer/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
} 