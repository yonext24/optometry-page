import { getUserRole } from '../auth'
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { appointmentsCollection } from '../collections'

// id: int
// doctorData: {
//  id: int
//  nombre: string
//  apellido: string
//  image: string
// }
// patientData: {
//  id: int
//  nombre: string
//  apellido: string
//  image: string
// }
// setByAdmin: bool default false
// seenBy: {
//  doctor: bool default false
//  patient: bool default false
// }
// content: {
//  date: datetime
//  title: string
//  description: string
// }
// status: {
//  patient: 'pending' | 'confirmed' default 'pending'
//  doctor: 'pending' | 'confirmed' default 'pending'
// }
//

export const createAppointment = async ({
  content,
  patientData,
  doctorData,
  setByAdmin = false,
  seenBy = { doctor: false, patient: false },
  status = { patient: 'pending', doctor: 'pending' },
}) => {
  const role = await getUserRole()
  if (!(role !== 'admin' || role !== 'doctor'))
    throw new Error('No estás autorizado')
  if (!content || !patientData || !doctorData) return

  const appointmentRef = doc(appointmentsCollection, doctorData.id)

  const indexOfAppointment = await getDoc(appointmentRef).then((snap) => {
    if (!snap.exists()) return 1
    const data = snap.data()
    const appointments = Object.keys(data)
    const indexOfAppointment = appointments.length + 1
    return indexOfAppointment
  })

  await setDoc(appointmentRef, { [indexOfAppointment]: true })

  const subcollectionRef = collection(appointmentRef, `${indexOfAppointment}`)
  return await addDoc(subcollectionRef, {
    content,
    patientData,
    doctorData,
    setByAdmin,
    seenBy,
    status,
  })
}

export const getAllDoctorAppointments = async (doctorId) => {
  const role = await getUserRole()
  if (!(role !== 'admin' || role !== 'doctor'))
    throw new Error('No estás autorizado')

  const appointmentRef = doc(appointmentsCollection, doctorId)

  const keys = await getDoc(appointmentRef).then((snap) => {
    if (!snap.exists()) return []
    const data = snap.data()

    const appointments = Object.keys(data)
    return appointments
  })

  const promises = keys.map(async (key) => {
    const subcollectionRef = collection(appointmentRef, `${key}`)
    const appointment = await getDocs(subcollectionRef).then((snap) => {
      if (snap.empty) return []
      return snap.docs.flatMap((doc) => {
        const id = doc.id
        const data = doc.data()
        return { ...data, id, url: `${key}/${id}` }
      })
    })

    return appointment
  })

  const values = await Promise.all(promises)

  return values
}

export const getSingleAppointment = ({ appointmentId, doctorId, number }) => {
  const appointmentOwnerRef = doc(appointmentsCollection, doctorId)
  const appointmentRef = collection(appointmentOwnerRef, `${number}`)
  const docRef = doc(appointmentRef, appointmentId)

  return getDoc(docRef).then((doc) => {
    if (!doc.exists()) throw new Error('notfound')
    const data = doc.data()
    return { ...data, id: doc.id }
  })
}
