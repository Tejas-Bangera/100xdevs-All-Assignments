import { createContext } from "react";

// Create context
const GlobalContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
  username: "",
  setUsername: () => {},
});

export default GlobalContext;
