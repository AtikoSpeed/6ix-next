"use client";
import { SidebarProvider } from "../ui/sidebar";

export default function RootProvider({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
