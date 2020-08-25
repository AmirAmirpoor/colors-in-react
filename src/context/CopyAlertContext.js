import React, { useState, createContext, useContext } from "react";

const CopyAlertContext = createContext();

export const CopyAlertProvider = ({ children }) => {
  const [shouldShow, setShouldShow] = useState(false);

  const showAlert = () => {
    setShouldShow(true);
    setTimeout(() => {
      setShouldShow(false);
    }, 750);
  };

  return (
    <CopyAlertContext.Provider value={{ shouldShow, showAlert }}>
      {children}
    </CopyAlertContext.Provider>
  );
};

export const useCopyAlert = () => useContext(CopyAlertContext);
