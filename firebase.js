import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCnAfe8Dc6ZZFy3QBGEx0F-CIpbOWj1e1U",
    authDomain: "familynest-88e60.firebaseapp.com",
    projectId: "familynest-88e60",
    storageBucket: "familynest-88e60.firebasestorage.app",
    messagingSenderId: "888794901178",
    appId: "1:888794901178:web:15b2b704ed44d781d27083",
    measurementId: "G-18N7BG9423"
  };

  if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseConfig);
  }
  //const db = app.firestore();
  //const auth = firebase.auth();

  export { firebase};

  {/* 
  export const firebaseApp = initializeApp(firebaseConfig);
  export const auth = getAuth(firebaseApp);
  export const firebaseDB = getFirestore(firebaseApp);
*/}