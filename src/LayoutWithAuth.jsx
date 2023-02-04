import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  return <div>Header</div>;
};

const Body = () => {
  return <div>Body</div>;
};
const Footer = () => {
  return <div>Footer</div>;
};

function RequireAuth({ children }) {
  const auth = useAuth();
  return auth.user === undefined ? <Navigate to="/login" replace /> : children;
}

export default function LayoutWithAuth() {
  return (
    <RequireAuth>
      <>
        <Header />
        <Body />
        <Footer />
      </>
    </RequireAuth>
  );
}
