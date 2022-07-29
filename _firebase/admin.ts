import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const admin = require("firebase-admin");
//_todo_: 이거 숨겨야함.
const serviceAccount = require('./serviceAccountKey.json');

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