import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAlEo3uTDE9-AQlm798cQePWFEfUgazvxc",
    authDomain: "proj-aa5d0.firebaseapp.com",
    databaseURL: "https://proj-aa5d0.firebaseio.com",
    projectId: "proj-aa5d0",
    storageBucket: "proj-aa5d0.appspot.com",
    messagingSenderId: "746885030417"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
