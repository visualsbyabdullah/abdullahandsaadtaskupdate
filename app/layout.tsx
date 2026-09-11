import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets:["latin"],
  variable:"--font-manrope",
});

export const metadata = {
 title:"Social Tracker",
 description:"Daily tracker"
};

export default function RootLayout({children}: { children: ReactNode }) {
 return (
  <html lang="en">
   <body className={manrope.variable}>
    {children}
   </body>
  </html>
 );
}
