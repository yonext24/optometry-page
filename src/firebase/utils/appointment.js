import { getUserRole } from '../auth'
import { doc } from 'firebase/firestore'
import { appointmentsCollection } from '../collections'

// id: int
// doctorId: int
// setByAdmin: bool default false
// seenBy: {
//  doctor: bool default false
//  patient: bool default false
// }
// date: datetime
// content: {
//  title: string
//  description: string
// }
// status: {
//  patient: 'pending' | 'confirmed' default 'pending'
//  doctor: 'pending' | 'confirmed' default 'pending'
// }
//

export const createAppointment = async (appointment) => {
  const role = await getUserRole()
  if ((role !== 'admin') | (role !== 'doctor'))
    throw new Error('No estás autorizado')
  const appointmentRef = doc(appointmentsCollection)
  await appointmentRef.set(appointment)
}
