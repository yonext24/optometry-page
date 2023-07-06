/* eslint-disable no-unused-vars */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { patientsCollection } from '../collections'
import { getUserRole } from '../auth'
import { updateUser } from './user'
import { db } from '../config'

export async function createPatient(email, password, name, lastName) {}

export async function getPatientAvailableData(id) {
  const docRef = doc(patientsCollection, id)
  return await getDoc(docRef).then((doc) => {
    if (!doc.exists) throw new Error('El paciente no existe')
    const data = doc.data()

    return { deberes: data.deberes, historia_clinica: data.historia_clinica }
  })
}

export async function getAllPatientsWithoutDoctor() {
  if ((await getUserRole()) !== 'admin') throw new Error('No estás autorizado')

  return await getDocs(
    query(patientsCollection, where('medico_asignado', '==', null)),
  ).then((docs) => {
    if (docs.empty) return []

    const datas = docs.docs.map((doc) => {
      const id = doc.id
      const data = doc.data()

      return { ...data, id }
    })

    return datas
  })
}

export const updateTest = async (id, slug, deberes, assign = true) => {
  const role = await getUserRole()
  if (role !== 'admin' && role !== 'doctor')
    throw new Error('No estás autorizado')

  await updateUser(id, 'patient', { deberes: { ...deberes, [slug]: assign } })
}

export const getPatientTests = async (dni, test) => {
  const docRef = doc(db, test, dni)
  const testDoc = await getDoc(docRef).then((doc) => {
    const data = doc.data()
    return data
  })

  const promises = Object.entries(testDoc).map(async ([_, value]) => {
    const [doc] = await getDocs(collection(docRef, value))
    .then((docs) =>
      docs.docs.flatMap((doc) => {
        const id = doc.id
        const data = doc.data()
        return {...data, id}
      }),
    )
    return doc
  })

  return Promise.all(promises)
}

// Read
export async function getAllPatients() {}

export async function getPatient(uid) {}

// Update
export async function updatePatient(
  uid,
  newName,
  newLastName,
  newEmail,
  formerEmail,
  password,
  status,
) {}
// Delete
export async function deletePatient(id, email, password) {}

// Upload files
// Upload Profile Picture
export async function setPatientProfilePic(uid, file) {}
