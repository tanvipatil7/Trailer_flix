import { useState } from "react";
import logo from "../assets/login-logo.png";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  setError("");
  navigate("/profiles");
};

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="Netflix Logo" className="login-logo" />

        <h1>Sign In</h1>

        {error && <p className="login__error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={!email || !password}>
             Sign In
          </button>

        </form>

        <p>
          New to Netflix? <span>Sign up now.</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
