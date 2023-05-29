import { createContext, useState } from "react";


export const Context = createContext();

const ProviderStore = ({ children }) => {
  const [currUser, setCurrUser] = useState({});

  const value = {
    currUser,
    setCurrUser
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default ProviderStore;