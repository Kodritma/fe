import { createContext, ReactNode, useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

interface AuthState {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  isLoggedIn: boolean;
  token: string;
  login: (code?: string) => void;
  logout: () => void;
  check: () => any;
}

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const initialState = {
  isLoggedIn: false,
  token: "",
  login: () => {},
  logout: () => {},
  check: () => {},
  id: "",
  email: "",
  verified_email: true,
  name: "",
  given_name: "",
  family_name: "",
  picture: "",
  locale: "",
};

export const AuthContext = createContext<AuthState>(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);
  console.log({ state });
  useEffect(() => {
    check();
  }, []);

  const login = (code?: string) => {
    async function getUserData() {
      try {
        const { data } = await axiosWithAuth().get(`/auth/login?code=${code}`);
        setState({ ...data });
      } catch {
        setState({ ...initialState });
      }
    }
    getUserData();
  };

  const logout = () => {
    async function destroyCookie() {
      try {
        await axiosWithAuth().get("/auth/logout");
        setState({ ...initialState });
      } catch {}
    }
    destroyCookie();
  };

  const check = () => {
    async function checkIfLoggedIn() {
      try {
        const { data } = await axiosWithAuth().get(`/auth/check`);
        setState({ ...data });
      } catch (error) {
        setState({ ...initialState });
        console.log("check failed", JSON.stringify(error));
      }
    }
    checkIfLoggedIn();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, check }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
