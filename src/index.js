import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

//default url
axios.defaults.baseURL = "http://localhost:8000/api";

//credentials
axios.defaults.withCredentials = true;

//set the token in the header
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

