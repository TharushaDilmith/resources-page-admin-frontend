import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div>
      <input type="checkbox" name="" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span className="lab la-accusoft"></span> <span>Resource</span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/admin/home">
                {" "}
                <span className="las la-bus"></span>
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/awarding_bodies">
                {" "}
                <span className="las la-route"></span>
                <span>Awarding Bodies</span>
              </Link>
            </li>
            <li>
              <Link to="/resources_types">
                {" "}
                <span className="las la-calendar"></span>
                <span>Resources Types</span>
              </Link>
            </li>
            <li>
              <Link to="/courses">
                {" "}
                <span className="las la-calendar"></span>
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/resources">
                {" "}
                <span className="las la-bus"></span>
                <span>Resources</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <header>
          <h2>
            <label htmlFor="nav-toggle">
              <span className="las la-bars"></span>
            </label>
            Dashboard
          </h2>
          <div className="search-wrapper">
            <span className="las la-search"></span>
            <input type="search" name="" placeholder="Search here" id="" />
          </div>
          <div className="user-wrapper">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/513/075/small_2x/36_Admin_Roles.jpg"
              width="40px"
              height="40px"
            />
            <div className="">
              <h4>Admin Name</h4>
              <small>Admin</small>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
