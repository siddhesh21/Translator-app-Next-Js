// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCSZo2SKkwtoOQFnxpds0vU4-eVZ5AtKv0",
  authDomain: "translator-app-e3d39.firebaseapp.com",
  projectId: "translator-app-e3d39",
  storageBucket: "translator-app-e3d39.appspot.com",
  messagingSenderId: "816459789340",
  appId: "1:816459789340:web:b1cd606cbdcf84f92d9bd9",
  measurementId: "G-L6LQ98S22H",
};
let app;
if (!firebase.apps.length > 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();

export { db };
