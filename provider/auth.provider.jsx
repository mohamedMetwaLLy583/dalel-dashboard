"use client";

import { createContext, useContext } from "react";

const TokenContext = createContext(null);

export const useToken = () => {
  const token = useContext(TokenContext);
  if (token === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return token;
};

const AuthProvider = ({ children, token }) => {
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export default AuthProvider;
