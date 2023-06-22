import { collection } from 'firebase/firestore'
import { db } from './config'

export const doctorsCollection = collection(db, 'medicos')
export const patientsCollection = collection(db, 'pacientes')
export const adminCollection = collection(db, 'admins')
export const asignCollection = collection(db, 'asignacion')
