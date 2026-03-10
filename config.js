// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlM_v4vvD3ZPxhOkFn5AKtUMHSPMC1raQ",
  authDomain: "data-749fe.firebaseapp.com",
  projectId: "data-749fe",
  storageBucket: "data-749fe.firebasestorage.app",
  messagingSenderId: "736965464474",
  appId: "1:736965464474:web:773ba43c6a313c43b62a23",
  measurementId: "G-GRT97061FG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
