import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../img/logo.png";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const { username, email, password } = inputs

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!inputs.username) {
      newErrors.username = "Username is required";
    }

    if (!inputs.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!inputs.password) {
      newErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = validateInputs();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.info("Please fill the fields")
      } else {
        // Proceed with form submission
        console.log("Form submitted successfully", inputs);
        await axios.post("/auth/register", inputs);
        toast.success("Registered successfully.Please login")
        navigate("/login");
      }



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
        {errors.username && <span className="error">{errors.username}</span>}
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
