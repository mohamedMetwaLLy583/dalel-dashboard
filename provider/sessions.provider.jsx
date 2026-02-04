"use client"; // Next.js requirement for components that run on the client

import { createContext } from "react";

// Create the context
const SessionContext = createContext(null);

// The provider component
export const SessionProvider = ({ children, session }) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

// Export the context to be used with useContext in other components
export default SessionContext;
