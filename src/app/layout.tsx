import SessionAuthProvider from "@/context/SessionAuthProvider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba técnica - Armando Aliaga Saldaña",
  description: "Esto es una prueba técnica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={montserrat.className}>
        <SessionAuthProvider>
          <main>{children}</main>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
