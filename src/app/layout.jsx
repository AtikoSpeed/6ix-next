import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/Layout.sass";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "6ixarchive",
  description: "6ixarchive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
