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
        firstname: "",
        lastname: "",
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
            .post("/admin/register", values)
            .then((res) => {
                if(res.data.success){
                    localStorage.setItem("user", res.data.data.user);
                    localStorage.setItem("token", res.data.data.token);
                    history.push('admin/home');
                    // window.location.reload();
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
                            name="firstname"
                            required
                            onChange={handleChange}
                            value={values.firstname}
                        />
                        <span></span>
                        <label>First Name</label>
                    </div>
                    <div className="txt_field">
                        <input
                            type="text"
                            name="lastname"
                            required
                            onChange={handleChange}
                            value={values.lastname}
                        />
                        <span></span>
                        <label>Last Name</label>
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
                            value={values.confirmPassword}
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
                            value={values.phone}
                        />
                        <span></span>
                        <label>Phone Number</label>
                    </div>
                    <div class="pass">Forgot Password?</div>
                    <button type="submit" className="login_btn">
                        Register
                    </button>
                    <div class="signup_link">
                        Not a member? <Link to="/register">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
