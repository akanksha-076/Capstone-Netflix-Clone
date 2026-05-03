import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXvTfiD_FbLVpMdVmCfjX4tRzzZtFxHfs",
  authDomain: "netflix-clone-e30b1.firebaseapp.com",
  projectId: "netflix-clone-e30b1",
  storageBucket: "netflix-clone-e30b1.firebasestorage.app",
  messagingSenderId: "85502348196",
  appId: "1:85502348196:web:b4d83a635f638c2a054f31"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };