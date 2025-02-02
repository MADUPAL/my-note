import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import ReactQueryProvider from "@/components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "my-note",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <ReactQueryProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
