import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { secret } from './secret'

const configFirebase = Object.freeze({
  apiKey: secret.FIREBASE_API_KEY || '',
  authDomain: secret.FIREBASE_AUTH_DOMAIN || '',
  databaseURL: secret.FIREBASE_DATABASE_URL || '',
  projectId: secret.FIREBASE_PROJECT_ID || '',
  storageBucket: secret.FIREBASE_STORAGE_BUCKET || ''
})

firebase.initializeApp(configFirebase)

export const db = firebase.firestore()
