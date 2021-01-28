import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

export interface AuthState {
  ID: string;
  display_name: string;
  email: string;
  first_name: string;
  isLoggedIn: boolean;
  is_admin: boolean;
  last_name: string;
  picture: string;
  slug: string;
  token: string;
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
  is_admin: false,
  last_name: "",
  picture: "",
  slug: "",
  token: "",
  login: () => {},
  logout: () => {},
  check: () => {},
};

export const AuthContext = createContext<AuthState>(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);
  console.log({ state });

  const login = useCallback((code?: string) => {
    async function getUserData() {
      try {
        const { data } = await axiosWithAuth().get(`/auth/login?code=${code}`);
        setState({ ...data });
      } catch {
        setState({ ...initialState });
      }
    }
    getUserData();
  }, []);

  const logout = useCallback(() => {
    async function destroyCookie() {
      try {
        await axiosWithAuth().get("/auth/logout");
        setState({ ...initialState });
      } catch {}
    }
    destroyCookie();
  }, []);

  const check = useCallback(() => {
    async function checkIfLoggedIn() {
      try {
        const { data } = await axiosWithAuth().get(`/auth/check`);
        setState({ ...data });
      } catch (error) {
        setState({ ...initialState });
      }
    }
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, check }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
