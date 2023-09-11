import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const onChange = (e) => {
    const { value, name } = e.target;

    setFormState({ ...formState, [name]: value });

    console.log(formState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.loginUser.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="log-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <button type="submit" className="btn">
            Login
          </button>
          <Link className="signup" to={"/signup"}>
            Or Signup
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
