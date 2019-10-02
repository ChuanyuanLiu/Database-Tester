// Your web app's Firebase configuration
// Test server
var firebaseConfig = {
   apiKey: "AIzaSyD1XO5L2AYwpimMVN6pzl2OtFRJE2yE9Zc",
   authDomain: "testing-e1ec1.firebaseapp.com",
   databaseURL: "https://testing-e1ec1.firebaseio.com",
   projectId: "testing-e1ec1",
   storageBucket: "testing-e1ec1.appspot.com",
   messagingSenderId: "656238030591",
   appId: "1:656238030591:web:ee3f92b02ce48007"
};

// Your web app's Firebase configuration
// Official server
// var firebaseConfig = {
//     apiKey: "AIzaSyC1HQX45nzJr6SDRMsPkA_zAgAYM9iGjTg",
//     authDomain: "heirloom22-2b4a8.firebaseapp.com",
//     databaseURL: "https://heirloom22-2b4a8.firebaseio.com",
//     projectId: "heirloom22-2b4a8",
//     storageBucket: "heirloom22-2b4a8.appspot.com",
//     messagingSenderId: "323147351760",
//     appId: "1:323147351760:web:bf785136b38cb3a4d380d5"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Link to database
const db = firebase.firestore();
