import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AuthCallback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.loginCallback().then(() => {
      navigate("/home");
    });
  }, []);

  return <div>Processing signin...</div>;
}
