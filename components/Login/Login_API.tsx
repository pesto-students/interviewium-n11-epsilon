import { getAuth , signInWithEmailAndPassword } from "firebase/auth";

import app from "../../utilities/firebase"

const appData = app

const auth = getAuth();


export function signIn(email: string, password: string)  {
      return signInWithEmailAndPassword(auth,email,password)
}