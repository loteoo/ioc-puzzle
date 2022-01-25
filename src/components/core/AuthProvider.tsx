import React, { createContext, useState, useCallback } from "react";
import { CurrentUser } from "/src/utils/types";
import {
  readUserFromStorage,
  writeUserToStorage,
} from "/src/utils/userStorage";

interface IAuthContext {
  me?: CurrentUser;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUserPreference: (preferences: CurrentUser["preferences"]) => void;
}

const currentUserKey = "current-user-email";

const loggedInUserEmail = localStorage.getItem(currentUserKey);

const userOnLoad = loggedInUserEmail
  ? readUserFromStorage(loggedInUserEmail)
  : undefined;

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(userOnLoad);

  const login = useCallback((email, _password) => {
    let user = readUserFromStorage(email);
    if (!user) {
      user = {
        email,
      };
      writeUserToStorage(user);
    }
    localStorage.setItem(currentUserKey, email);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(currentUserKey);
    setUser(undefined);
  }, []);

  const setUserPreference = useCallback(
    (preferences: CurrentUser["preferences"]) => {
      if (user) {
        writeUserToStorage({
          ...user,
          preferences,
        });
      }
    },
    []
  );

  const auth: IAuthContext = {
    me: user,
    login,
    logout,
    setUserPreference,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
