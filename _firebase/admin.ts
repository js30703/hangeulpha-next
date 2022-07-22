import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const admin = require("firebase-admin");
//_todo_: 이거 파일이어야함.
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