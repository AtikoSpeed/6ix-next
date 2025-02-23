"use client";

import RootContext from "@/contexts/RootContext";

export default function RootProvider({ children }) {
  return <RootContext>{children}</RootContext>;
}
