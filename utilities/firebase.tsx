import { initializeApp } from 'firebase/app';

import { firebaseData } from '../env/env';

const firebaseConfig = {
  apiKey: firebaseData.APIKEY,
  authDomain: firebaseData.AUTHDOMAIN,
  projectId: firebaseData.PROJECTID,
  storageBucket: firebaseData.STORAGEBUCKET,
  messagingSenderId: firebaseData.MESSAGINGSENDERID,
  appId: firebaseData.APPID,
  measurementId: firebaseData.MEASUREMENTID,
};

const app: any = initializeApp(firebaseConfig);

export default app;
