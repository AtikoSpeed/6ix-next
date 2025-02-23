import { useState, createContext } from "react";

const RootContext = createContext();

export default function RootContextProvider({ children }) {
  return <RootContext.Provider>{children}</RootContext.Provider>;
}
