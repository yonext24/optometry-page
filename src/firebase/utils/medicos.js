import {
  arrayRemove,
  arrayUnion,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { getUserRole } from '../auth'
import { doctorsCollection, patientsCollection } from '../collections'

export async function getAllDoctors() {
  if ((await getUserRole()) !== 'admin') throw new Error('No estás autorizado')
  
  return await getDocs(doctorsCollection).then((docs) => {
    if (docs.empty) return []

    const datas = docs.docs.map((doc) => {
      const id = doc.id
      const data = doc.data()

      return { ...data, id }
    })

    return datas
  })
}

export async function assignPatientToDoctor(selectedDoctor, patient) {
  if (!selectedDoctor || !patient) return
  if ((await getUserRole()) !== 'admin') throw new Error('No estás autorizado')

  const docRef = doc(doctorsCollection, selectedDoctor.id)
  const patientRef = doc(patientsCollection, patient.id)

  const docPromise = updateDoc(docRef, {
    pacientes_asignados: arrayUnion(patient),
  })
  const patientPromise = updateDoc(patientRef, {
    medico_asignado: selectedDoctor,
  })

  return Promise.all([docPromise, patientPromise])
}

export async function deassignPatientToDoctor(selectedDoctor, patient) {
  if (!selectedDoctor || !patient) return
  if ((await getUserRole()) !== 'admin') throw new Error('No estás autorizado')

  const docRef = doc(doctorsCollection, selectedDoctor.id)
  const patientRef = doc(patientsCollection, patient.id)

  const docPromise = updateDoc(docRef, {
    pacientes_asignados: arrayRemove(patient),
  })
  const patientPromise = updateDoc(patientRef, {
    medico_asignado: null,
  })

  return Promise.all([docPromise, patientPromise])
}

