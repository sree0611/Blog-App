import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import Logo from "../img/logo.png";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const { username, password } = inputs

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs, "inputs");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!username) {
        toast.warning("Please enter your username");
        return;
      }
      if (!password) {
        toast.warning("Please enter your password");
        return;
      }

      await login(inputs)
      toast.success("Loggined successfully")
      navigate("/");


    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <Link to="/" className="navbar_logo home_logo">
        <img src={Logo} alt="" />
        <span className="">Blog Nest</span>
      </Link>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
