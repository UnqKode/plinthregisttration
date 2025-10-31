"use client";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [formData, setFormData] = useState({
    day: "",
    members: [{ name: "", college: "", contact: "", email: "" }],
    selectedEvents: [],
    referral: "",
    comments: "",
    totalAmount: 0,
  });

  return (
    <DataContext.Provider value={{ formData, setFormData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
