import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

export interface AuthState {
  ID: string;
  display_name: string;
  email: string;
  first_name: string;
  isLoggedIn: boolean;
  loading: boolean;
  is_admin?: boolean;
  last_name: string;
  picture: string;
  slug: string;
  token: string;
}

export interface AuthMethods {
  login: (code?: string) => void;
  logout: () => void;
  check: () => any;
}

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const initialState = {
  ID: "",
  display_name: "",
  email: "",
  first_name: "",
  isLoggedIn: false,
  loading: true,
  last_name: "",
  picture: "",
  slug: "",
  token: "",
};

const initialMethods = {
  login: () => {},
  logout: () => {},
  check: () => {},
};

export const AuthContext = createContext<AuthState & AuthMethods>({
  ...initialState,
  ...initialMethods,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback((code?: string) => {
    async function getUserData() {
      try {
        const { data } = await axiosWithAuth().get(`/auth/login?code=${code}`);
        setState({ ...data });
      } catch {
        setState({ ...initialState, loading: false });
      }
    }
    getUserData();
  }, []);

  const logout = useCallback(() => {
    async function destroyCookie() {
      try {
        await axiosWithAuth().get("/auth/logout");
        setState({ ...initialState, loading: false });
      } catch {}
    }
    destroyCookie();
  }, []);

  const check = useCallback(() => {
    async function checkIfLoggedIn() {
      try {
        const { data } = await axiosWithAuth().get(`/auth/check`);
        setState({ ...data, loading: false });
      } catch {
        setState({ ...initialState, loading: false });
      }
    }
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, check }}>
      {state.loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
