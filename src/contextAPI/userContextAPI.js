"use client";
const { createContext, useState, useContext } = require("react");

const postContext = createContext({});

export function User({ children }) {
  const [user, setUser] = useState();
  return (
    <postContext.Provider value={{ user, setUser }}>
      {children}
    </postContext.Provider>
  );
}
export function useUserContext() {
  const context = useContext(postContext);
  if (!context) return;
  return context;
}
