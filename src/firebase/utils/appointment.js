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
// content: {
//  date: datetime
//  title: string
//  description: string
// }
// status: {
//  patient: 'pending' | 'confirmed' | 'canceled' default 'pending'
//  patientReason: string
//  doctor: 'pending' | 'confirmed' | 'canceled' default 'pending'
// doctorReason: string
// }
//

export const createAppointment = async ({
  content,
  patientData,
  doctorData,
  setByAdmin = false,
  status = { patient: 'pending', doctor: 'pending' },
}) => {
  const role = await getUserRole()
  if (!(role !== 'admin' || role !== 'doctor'))
    throw new Error('No estás autorizado')
  if (!content || !patientData || !doctorData) return

  const appointmentRef = doc(appointmentsCollection, doctorData.id)

  /* Se obtiene el indice del último appointment creado, para saber cual va a ser el índice del siguiente */
  const indexOfAppointment = await getDoc(appointmentRef).then((snap) => {
    if (!snap.exists()) return 1
    const data = snap.data()
    const appointments = Object.keys(data)
    console.log({ keys: appointments })
    const indexOfAppointment = appointments.length + 1
    return indexOfAppointment
  })

  /*
    Se setea el documento para tener un índice de las subolecciones creadas, este documento contiene la id del paciente
    para que después se facilite filtrar las subcolecciones al obtenerlas desde el paciente                               
  */
  await setDoc(
    appointmentRef,
    { [indexOfAppointment]: patientData.id },
    { merge: true },
  )

  /*
    Se crea la subcolección con el índice obtenido anteriormente, y se agrega el documento con los datos del appointment
    se crea con addDoc para que tenga un id autogenerado, no por nada en especial, podría haber hecho que se genere con la id del usuario
  */
  const subcollectionRef = collection(appointmentRef, `${indexOfAppointment}`)
  const ref = await addDoc(subcollectionRef, {
    content,
    patientData,
    doctorData,
    setByAdmin,
    status,
  })

  const url = `/${doctorData.id}/${indexOfAppointment}/${ref.id}`

  return url
}

export const getAllDoctorAppointments = async (doctorId) => {
  const role = await getUserRole()
  if (!(role !== 'admin' || role !== 'doctor'))
    throw new Error('No estás autorizado')

  const appointmentRef = doc(appointmentsCollection, doctorId)

  /*
    Se obtienen las keys de los documentos que contienen las subcolecciones, estas keys sirven para obtener las subcolecciones,
    pero no son las subcolecciones en sí, son documentos que sólamente sirven como indices para las subcolecciones
  */
  const keys = await getDoc(appointmentRef).then((snap) => {
    if (!snap.exists()) return []
    const data = snap.data()

    const appointments = Object.keys(data)
    return appointments
  })

  /*
    Se obtienen las subcolecciones, y se mapean para obtener los datos de cada documento, y se retorna un array de arrays,
    donde cada array contiene los datos de cada documento de cada subcolección
  */
  const promises = keys.map(async (key) => {
    const subcollectionRef = collection(appointmentRef, `${key}`)
    const appointment = await getDocs(subcollectionRef).then((snap) => {
      if (snap.empty) return []
      return snap.docs.flatMap((doc) => {
        const id = doc.id
        const data = doc.data()
        return { ...data, id, url: `/${doctorId}/${key}/${id}` }
      })
    })

    return appointment
  })

  return await Promise.all(promises)
}

export const getAllPatientAppointments = async ({ patientId, doctorId }) => {
  const role = await getUserRole()
  if (!(role !== 'admin' || role !== 'doctor'))
    throw new Error('No estás autorizado')

  const appointmentRef = doc(appointmentsCollection, doctorId)

  console.log(appointmentRef)

  const keys = await getDoc(appointmentRef).then((snap) => {
    if (!snap.exists()) return []
    const data = snap.data()

    /*
      Como dentro del documento que contiene los indices de las subcolecciones, se guardan las id de los pacientes 
      (como value, es decir: { index: id }). Se filtran las keys de los documentos que contienen las subcolecciones,
      para obtener sólo las que contienen la id del paciente 
    */
    const entries = Object.entries(data)
    const filteredValues = entries.filter(([_, id]) => id === patientId) // eslint-disable-line
    const keys = filteredValues.map(([key]) => key)
    return keys
  })

  const promises = keys.map(async (key) => {
    const subcollectionRef = collection(appointmentRef, `${key}`)
    const appointment = await getDocs(subcollectionRef).then((snap) => {
      console.log({ empty: snap.empty })
      if (snap.empty) return []
      return snap.docs.flatMap((doc) => {
        const id = doc.id
        const data = doc.data()
        return { ...data, id, url: `/${doctorId}/${key}/${id}` }
      })
    })

    return appointment
  })

  return await Promise.all(promises)
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

export const confirmAppointment = async ({
  appointmentId,
  doctorId,
  number,
  byDoctor,
}) => {
  const appointmentOwnerRef = doc(appointmentsCollection, doctorId)
  const appointmentRef = collection(appointmentOwnerRef, `${number}`)
  const docRef = doc(appointmentRef, appointmentId)

  const who = byDoctor ? 'doctor' : 'patient'

  await setDoc(docRef, { status: { [who]: 'confirmed' } }, { merge: true })
}

export const cancelAppointment = async ({
  appointmentId,
  doctorId,
  number,
  byDoctor,
  reason,
}) => {
  const appointmentOwnerRef = doc(appointmentsCollection, doctorId)
  const appointmentRef = collection(appointmentOwnerRef, `${number}`)
  const docRef = doc(appointmentRef, appointmentId)

  const who = byDoctor ? 'doctor' : 'patient'

  await setDoc(
    docRef,
    { status: { [who]: 'canceled', [`${who}Reason`]: reason } },
    { merge: true },
  )
}
