import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAK-p1AWf9u5i1-rkPnb2xfRuOx5niFgY",
    authDomain: "trivia-kviz.firebaseapp.com",
    projectId: "trivia-kviz",
    databaseUrl: "https://trivia-kviz-default-rtdb.firebaseio.com/",
    storageBucket: "trivia-kviz.appspot.com",
    messagingSenderId: "551019412003",
    appId: "1:551019412003:web:576c9392e2cb6879ee8f96",
    measurementId: "G-48PBTCERNN"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
