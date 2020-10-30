import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux"

/* redux */
import {store} from "./store/store"
import App from "./App"

/* firebase */
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyD6qhw7dKgcnFABlllk-Yko_4i6t8norOI",
    authDomain: "car-dealer-27bc6.firebaseapp.com",
    databaseURL: "https://car-dealer-27bc6.firebaseio.com",
    projectId: "car-dealer-27bc6",
    storageBucket: "car-dealer-27bc6.appspot.com",
    messagingSenderId: "1079340295477",
    appId: "1:1079340295477:web:2aaeb69b54213edf78187c",
    measurementId: "G-9788RQT0KF"
}

const app = firebase.initializeApp(firebaseConfig)

const database = app.database()

const firebaseStorage = firebase.storage()

export const storageRef = firebaseStorage.ref().child('/cars/image/cards')


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
  document.getElementById('root')
)
