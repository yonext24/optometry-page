import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import {
  getFirestore, updateDoc, collection,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRABASE_APIKEY,
  authDomain: process.env.REACT_APP_FIRABASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIRABASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIRABASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIRABASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIRABASE_APPID,
  measurementId: process.env.REACT_APP_FIRABASE_MEASUREMENTID,
  databaseURL: process.env.REACT_APP_FIRABASE_DATABASEURL
}

// fundamental firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Create
export async function addToDB (uid, email, nombre, apellido, table) {
  const collectionRef = collection(db, table)
  const docRef = doc(collectionRef, uid)
  try {
    await setDoc(docRef, { id: uid, email, nombre, apellido })
  } catch (error) {
    console.error('Error al agregar a base de datos ' + table + ': ' + error)
  }
}

// Update
export async function updateDB (newName, newLastName, newEmail, docRef) {
  try {
    const userRef = docRef
    await updateDoc(userRef, {
      nombre: newName,
      apellido: newLastName,
      email: newEmail
    })
  } catch (error) {
    console.log('Error actualizando la DB: ' + error)
  }
}

// Delete

export async function deleteFromDB (docRef) {
  try {
    const toBeDeleted = docRef
    await deleteDoc(toBeDeleted)
  } catch (error) {
    console.error('Error al eliminar admin: ' + error)
  }
}
