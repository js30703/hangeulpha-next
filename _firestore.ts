import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const admin = require("firebase-admin");

const serviceAccount = process.env.NEXT_FIREBASE_ADMIN_CONFIG || ''

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