import { getAuth , createUserWithEmailAndPassword } from "firebase/auth";

import { app } from "../../utilities/firebase"

const appData = app

const auth = getAuth();


export function signUp(email: string, password: string)  {
      return createUserWithEmailAndPassword(auth,email,password)
}

export function popUp()  {
let provider  = new app.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
app.auth().signInWithPopup(provider).then((result : any) =>  {
 // This gives you a Google Access Token.
 var token = result.credential.accessToken;
 // The signed-in user info.
 var user = result.user;
 console.log(result)

}).catch((err : any)=> {
    console.log(err)
});

}
