import { createContext } from "react";


const MainContext = createContext({
  country: {},
  setCountry: () => {},
});

export default MainContext;
export const MainContextProvider = MainContext.Provider;
