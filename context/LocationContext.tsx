import { createContext } from "react";

export const LocationContext = createContext({
  location: null,
  errorMsg: null,
});
