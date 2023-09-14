import { Link } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Signup = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const [signup, { error, data }] = useMutation(CREATE_USER);

  const onChange = (e) => {
    const { value, name } = e.target;

    setFormState({ ...formState, [name]: value });

    console.log(formState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await signup({
        variables: { ...formState },
      });
      Auth.Signup(data.loginUser.token);
    } catch (error) {
      console.log(error);
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
          <Link className="login" to={"/login"}>
            Login Now
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
