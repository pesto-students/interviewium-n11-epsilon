import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import 'firebase/compat/auth';

import app from '../../../utilities/firebase';

const appData = app;

const auth = getAuth();

export const passwordReset = (email: any, actionCodeSettings: any) => {
  actionCodeSettings = {
    url: 'http://localhost:3000/',
    handleCodeInApp: false,
  };
  sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      console.log('email send');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
