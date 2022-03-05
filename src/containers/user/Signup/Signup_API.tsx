import { getAuth , createUserWithEmailAndPassword , GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import app from "../../../utilities/firebase"
import "firebase/compat/auth"
// import { toast } from "react-toastify";
// import { GREAT, SAD, toastMessage } from "../../utilities/variables";
const appData = app

const auth = getAuth();
auth.languageCode = 'it';

export function signUp(email: string, password: string)  {
      return createUserWithEmailAndPassword(auth,email,password)
}

export function popUp()  {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return  signInWithPopup(auth, provider)
}
