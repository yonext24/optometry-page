import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDeUbC9dNte22gqGASi2r6Pwx_ObhzenG8',
  authDomain: 'la-salle-nuevo.firebaseapp.com',
  projectId: 'la-salle-nuevo',
  storageBucket: 'la-salle-nuevo.appspot.com',
  messagingSenderId: '377695167984',
  appId: '1:377695167984:web:40e10d1645d94b20512935',
  measurementId: 'G-89HN9KXMR6',
}

// fundamental firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage()
