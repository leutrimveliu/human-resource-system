import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCcs6YZJx3C3-M2uXyL916A19bR_5peIQ4",
    authDomain: "hrsystem-a86fa.firebaseapp.com",
    databaseURL: "https://hrsystem-a86fa.firebaseio.com",
    projectId: "hrsystem-a86fa",
    storageBucket: "hrsystem-a86fa.appspot.com",
    messagingSenderId: "738256369872",
    appId: "1:738256369872:web:d36cece2c2f354cfaf06d5",
    measurementId: "G-PLCSVXMHVB"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  export { auth };