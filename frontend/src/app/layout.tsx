import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./globals.css";

const lexend = Lexend({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do App",
  description: "It's a to-do app ;)",
};

library.add(faPlusCircle);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className}`}>{children}</body>
    </html>
  );
}
