import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDUoL98Aqlmm5DtW0t20cISChVUfpmCWso",
    authDomain: "interviewium-334906.firebaseapp.com",
    projectId: "interviewium-334906",
    storageBucket: "interviewium-334906.appspot.com",
    messagingSenderId: "1067871085404",
    appId: "1:1067871085404:web:4e03f9c682808234569799",
    measurementId: "G-T02TE2NZLX"
  };

export const app : any = initializeApp(firebaseConfig);