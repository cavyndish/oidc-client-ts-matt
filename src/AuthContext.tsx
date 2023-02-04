import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthService from "./auth";

interface AuthContextType {
  user: any;
  login: (user: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<any>(
    JSON.parse(
      sessionStorage.getItem(process.env.REACT_APP_SESSION_ID!) || "null"
    ) || undefined
  );

  const authService = new AuthService();

  const loginCallback = async () => {
    const authedUser = await authService.loginCallback();
    setUser(authedUser);
  };

  const login = () => authService.login();
  const logout = () => authService.logout();

  // Login and logout methods

  const value = { user, login, loginCallback, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { useAuth, AuthStatus, RequireAuth, AuthProvider };
