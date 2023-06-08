import { createContext, useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const userCurr = cookies.get('currUser') ?? null;

export const Context = createContext();

export const getTokenFromCookie = () => {
  return document.cookie.split('access-token=')[1];
}

const ProviderStore = ({ children }) => {
  const [currUser, setCurrUser] = useState(userCurr);
  const [isAudio, setIsAudio] = useState(false);

  const value = {
    currUser,
    setCurrUser,
    setIsAudio,
    isAudio
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default ProviderStore;