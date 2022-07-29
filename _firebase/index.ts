// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig =  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || ''
// Initialize Firebase
export const app = initializeApp(JSON.parse(firebaseConfig));;


// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const google_login = () =>
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user:any = result.user;
    // save token data in localStorage
    return user
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

  //frontEnd token refresh
    
  //storage 
export const storage = getStorage(app);


export async function getCurrentUser() {
  const idToken = await auth?.currentUser?.getIdToken(true)
  return auth?.currentUser
};

export async function refreshTokenFirebase() {
  const idToken = await auth?.currentUser?.getIdToken(true)
  return idToken
};