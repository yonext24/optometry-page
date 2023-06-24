import { doc, getDoc } from 'firebase/firestore'
import { patientsCollection } from '../collections'

export async function createPatient (email, password, name, lastName) {
}

export async function getPatientAvailableData (id) {
  const docRef = doc(patientsCollection, id)
  return await getDoc(docRef)
    .then(doc => {
      if (!doc.exists) throw new Error('El paciente no existe')
      const data = doc.data()

      return { deberes: data.deberes, historia_clinica: data.historia_clinica }
    })
}

// Read
export async function getAllPatients () {
}

export async function getPatient (uid) {
}

// Update
export async function updatePatient (uid, newName, newLastName, newEmail, formerEmail, password, status) {
}
// Delete
export async function deletePatient (id, email, password) {
}

// Upload files
// Upload Profile Picture
export async function setPatientProfilePic (uid, file) {
}
