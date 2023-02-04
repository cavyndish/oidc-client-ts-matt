import { Routes, Route } from "react-router-dom";
import AuthCallback from "./AuthCallback";
import { AuthProvider, RequireAuth } from "./AuthContext";
import Layout from "./Layout";
import LayoutWithAuth from "./LayoutWithAuth";
import LoginPage from "./Login";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PublicPage from "./pages/PublicPage";
import "./styles.css";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route element={<LayoutWithAuth />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
          {/* <Route path="/" element={<PublicPage />} /> */}
          {/* <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          /> */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}
