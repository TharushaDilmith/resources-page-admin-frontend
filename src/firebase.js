
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCg24t_8q88_Qo9c8cungmMrbfA2HpcZq4",
    authDomain: "gel-free-resources.firebaseapp.com",
    projectId: "gel-free-resources",
    storageBucket: "gel-free-resources.appspot.com",
    messagingSenderId: "716628996382",
    appId: "1:716628996382:web:c1d4175ae44f271436990f"
  };

firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const storage = firebase.storage();

  export {
      storage , firebase as default
  }