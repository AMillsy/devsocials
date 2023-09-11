import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useMutation } from "@apollo/client";
const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const [login, { error, data }] = useMutation(LOGIN_USER);
  return (
    <>
      <div class="log-form">
        <h2>Login to your account</h2>
        <form>
          <input type="text" title="username" placeholder="username" />
          <input type="password" title="username" placeholder="password" />
          <button type="submit" class="btn">
            Login
          </button>
          <Link class="signup" to={"/signup"}>
            Or Signup
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
