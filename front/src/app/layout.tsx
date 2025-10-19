import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import FloatingButton from "@/components/ui/FloatingButton";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Купить замки в Алматы, Замки, Замки врезные",
  description:
    "Замки в Алматы по доступной цене. Замки в большом ассортименте в Алматы. Высокачественные дверные замки у нас на сайте Zam-ok!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${robotoMono.variable} font-roboto-mono text-base antialiased`}
      >
        <Header />
        {children}
        <FloatingButton />
        <Footer />
      </body>
    </html>
  );
}
