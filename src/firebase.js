// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpm8rYrLOIuM1i_0b2Kt0022OJjFzKJ6s",
    authDomain: "samplefirebase-5c21a.firebaseapp.com",
    projectId: "samplefirebase-5c21a",
    storageBucket: "samplefirebase-5c21a.appspot.com",
    messagingSenderId: "493000639248",
    appId: "1:493000639248:web:c1638dae661026d7175b95"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;