import { useAuth } from "./AuthContext";

function LoginContainer() {
  const auth = useAuth();

  const login = () => {
    auth.login();
  };
  return (
    <div className="container">
      <div className="headline">Some headline</div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
}

export default LoginContainer;
