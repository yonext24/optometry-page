import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import {
  getFirestore,
  updateDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'

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

// Create
export async function addToDB(uid, email, nombre, apellido, table) {
  const collectionRef = collection(db, table)
  const docRef = doc(collectionRef, uid)
  try {
    await setDoc(docRef, { id: uid, email, nombre, apellido })
  } catch (error) {
    console.error('Error al agregar a base de datos ' + table + ': ' + error)
  }
}

// Update
export async function updateDB(newName, newLastName, newEmail, docRef) {
  try {
    const userRef = docRef
    await updateDoc(userRef, {
      nombre: newName,
      apellido: newLastName,
      email: newEmail,
    })
  } catch (error) {
    console.log('Error actualizando la DB: ' + error)
  }
}

// Delete

export async function deleteFromDB(docRef) {
  try {
    const toBeDeleted = docRef
    await deleteDoc(toBeDeleted)
  } catch (error) {
    console.error('Error al eliminar admin: ' + error)
  }
}
