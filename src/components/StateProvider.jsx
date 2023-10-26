/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Step 1: Create a context
export const AppContext = createContext();

// Step 2: Create a provider component
const StateProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    theme: "Light",
    response_length: "Detailed",
  });

  // Step 3: Pass down the state and functions through the context
  const contextValue = {
    appState,
    setAppState,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default StateProvider;
