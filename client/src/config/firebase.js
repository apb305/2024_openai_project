import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsna8OqU8kLKhBWyd3OEET0WSn2jiW3wk",
  authDomain: "openai-2024.firebaseapp.com",
  projectId: "openai-2024",
  storageBucket: "openai-2024.appspot.com",
  messagingSenderId: "830642873350",
  appId: "1:830642873350:web:bd87017f2048971bb9cf87",
  measurementId: "G-CGYW5GPMC8",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
