var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

module.exports = db;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// //Enable firebase in the react application
// //import { getfirestore } from "@firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// //Initialize cloud firestore and get a reference to the service
// export const db = getfirestore(app);