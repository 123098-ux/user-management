import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const handleLogin = (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }


    const storedUser = localStorage.getItem("registeredUser");

    if (!storedUser) {
      setError("No registered user found. Please register first.");
      return;
    }


    const user = JSON.parse(storedUser);


    if (
      email === user.email &&
      password === user.password
    ) {

      // Login status
      localStorage.setItem("isLoggedIn", "true");

      // Store current user
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: user.username,
          email: user.email
        })
      );

      navigate("/dashboard");

    } else {

      setError("Invalid email or password");

    }
  };


  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Login</h1>

        <p>Login to User Management</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;