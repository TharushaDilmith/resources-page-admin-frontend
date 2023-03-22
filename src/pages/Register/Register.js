import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../login/login.css";
import { useHistory } from "react-router";
import axios from "axios";

export default function Register() {
    //state for login form
    const [values, setValues] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        phone: "",
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
                if(res.data.success){
                    localStorage.setItem("user", res.data.data.user);
                    localStorage.setItem("token", res.data.data.token);
                    history.push('admin/home');
                    window.location.reload();
                }else{
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="login">
            <div class="center">
                <h1>Register</h1>
                <form method="post" onSubmit={onSubmit}>
                    <div className="txt_field">
                        <input
                            type="text"
                            name="name"
                            required
                            onChange={handleChange}
                            value={values.email}
                        />
                        <span></span>
                        <label>Name</label>
                    </div>
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
                    <div className="txt_field">
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            onChange={handleChange}
                            value={values.password}
                        />
                        <span></span>
                        <label>Confirm Password</label>
                    </div>
                    <div className="txt_field">
                        <input
                            type="tel"
                            name="phone"
                            required
                            onChange={handleChange}
                            value={values.email}
                        />
                        <span></span>
                        <label>Phone Number</label>
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
