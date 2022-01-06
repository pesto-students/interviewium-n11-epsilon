import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../../../utilities/firebase";

import app from "../../../utilities/firebase"

const appData = app

const auth = getAuth();

export function signIn(email: string, password: string)  {
      return signInWithEmailAndPassword(auth,email,password)
}
export function claims()  {
      app.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
          console.log(idTokenResult);
      })
      .catch((error) => {
        console.log(error);
      });
}
