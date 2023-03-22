import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

//default url
axios.defaults.baseURL = "http://localhost:8000/api";

//credentials
// axios.defaults.withCredentials = true;

//set the token in the header
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("token");

if (localStorage.getItem("user")) {
    const auth = localStorage.getItem("token");

    const authObj = JSON.parse(auth);

    const token = authObj.token;

    //set the token in the header
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    //if unauthorized redirect to login page
    if (token != null) {
        //get axios response
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    //redirect to login page
                    window.location.href = "/login";
                    //clear local storage
                    localStorage.clear();
                }
                return Promise.reject(error);
            }
        );
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

