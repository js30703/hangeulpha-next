import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const admin = require("firebase-admin");
//_todo_: 이거 숨겨야함.
const firebaseConfig =  process.env.NEXT_FIREBASE_ADMIN_CONFIG || ''
const serviceAccount = JSON.parse(firebaseConfig);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n')

!admin.apps.length ?
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}) : admin.app()

export const db = getFirestore()

export interface User {
  id:string,
  name:string,
  verbs?:string[],
}
export const auth = getAuth()

export async function adminAuthCheck(idToken?:string) {
  try {
    if (!idToken) {return false}
    
    const decoded = await auth.verifyIdToken(idToken);
    if (decoded?.uid) { return true; }
    
    return false;
  } catch (error) {
    return false;
  }
}