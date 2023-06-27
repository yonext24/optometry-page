import { doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { patientsCollection } from '../collections'
import { getUserRole } from '../auth'

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

export async function getAllPatientsWithoutDoctor () {
  if (await getUserRole() !== 'admin') throw new Error('No estás autorizado')

  return await getDocs(query(patientsCollection, where('medico_asignado', '==', null)))
    .then(docs => {
      if (docs.empty) return []

      const datas = docs.docs.map(doc => {
        const id = doc.id
        const data = doc.data()

        return { ...data, id }
      })

      return datas
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
