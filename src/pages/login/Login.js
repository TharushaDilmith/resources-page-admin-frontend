import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useHistory } from "react-router";
import axios from "axios";

export default function Login() {
  //state for login form
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //on change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //use history to redirect
  const history = useHistory();

  //on login form submit
  const onSubmit = (e) => {
    e.preventDefault();
      axios
        .post("/admin/login", values)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          history.push('admin/home');
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="login">
      <div class="center">
        <h1>Login</h1>
        <form method="post" onSubmit={onSubmit}>
          <div class="txt_field">
            <input
              type="text"
              name="email"
              required
              onChange={handleChange}
              value={values.email}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div class="txt_field">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={values.password}
            />
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass">Forgot Password?</div>
          <button type="submit" className="login_btn">
            Sign In
          </button>
          <div class="signup_link">
            Not a member? <Link to="/register">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
