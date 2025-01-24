"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
        <Toaster position="bottom-center" />
      </NextUIProvider>
    </SessionProvider>
  );
};
export default SessionAuthProvider;
