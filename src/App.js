import firebase from "firebase";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAQZ8-QQihLpHAHIdVPIp9jfKElzcr56I0",
    authDomain: "my-first-web-157ab.firebaseapp.com",
    databaseURL: "https://my-first-web-157ab.firebaseio.com",
    projectId: "my-first-web-157ab",
    storageBucket: "my-first-web-157ab.appspot.com",
    messagingSenderId: "142308988002"
};
let fire = firebase.initializeApp(config);
export default fire;