import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

// Let's say the URL you are sending the requests to,
// in your application is always the same.
// So it's always ... and then slash something.
// So it would be nice if we could cut it out here
// and just send the request to get posts and automatically
// append this to some comments starting URL.

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

// common headers are simply the general headers which are set for all types of requests
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";

axios.defaults.headers.post["Content-Type"] = "application/json";

// In case you want to execute code globaly:
// You can do it with axios with the help of so-called interceptors,
// these are functions you can define globally which will be executed
// for every request leaving your app,
// and every response returning into it.
// This is especially useful for example for setting some common headers like authorization header maybe
// or for responses
// if you want to log responses or want to handle errors globally.

// index.js is the most global file
// interceptors is a specila obj
// here we access the 'request' obj
// and we add 'use' to register a new interceptor.
// Thast interceptor takes a func which receives the request (config).

axios.interceptors.request.use(
  request => {
    console.log(request);
    //   In your interceptor function here,
    //   you need to always return the request or the request config
    //   otherwise you're blocking the request.
    //   Now of course you can also edit the request config before you return it,
    //   that's the idea behind the interceptor,
    //   you can add headers, do stuff like that.
    return request;
  },
  // we can add a second function which handles any errors
  error => {
    // So here we can log an error like this
    console.log(error);
    // we should also return promise-reject-error here though
    // so that we still forward it to our request as
    // we wrote it in a component where we can handle it again
    // with the catch method.
    // This make sense if you
    // have some local task you want to do
    // like show something on the UI but also globally,
    // or you want to log it in the log file
    // which you send to a server or something like that.

    return Promise.reject(error);
  }
);

// We can also add an interceptor to handle responses though, we do in the
// same way as you do it for the request
// but we use the response object on the interceptors object.

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
