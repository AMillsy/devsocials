import { Link } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [signup, { error, data }] = useMutation(CREATE_USER);
  const [singupError, setSignupError] = useState("");
  const onChange = (e) => {
    const { value, name } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      Auth.login(data.createUser.token);
    } catch (error) {
      setSignupError(error.message);
      setTimeout(function () {
        setSignupError("");
      }, 2000);
    }
  };
  return (
    <>
      <div className="log-form">
        <h2>Welcome to RunDev! Let's Create your Account</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="username"
            name="username"
          ></input>
          <input
            onChange={onChange}
            type="text"
            placeholder="email address"
            name="email"
          />
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p className="danger-signup">{singupError}</p>
          <Link className="login" to={"/login"}>
            Login Now
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
