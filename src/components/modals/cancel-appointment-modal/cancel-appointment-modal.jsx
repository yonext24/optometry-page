import { useParams } from 'react-router-dom'
import { ModalBackground } from '../../common/modal-background/modal-background'
import styles from './cancel-appointment-modal.module.css'
import { InputWUnderline } from '../../common/input-w-underline/input-w-underline'
import { cancelAppointment } from '../../../firebase/utils/appointment'
import { useState } from 'react'
import { useUser } from '../../../hooks/useUser'
import { toast } from 'react-toastify'
import { Spinner } from '../../spinner/spinner'

export function CancelAppointmentModal({ closeModal }) {
  const [status, setStatus] = useState(null)

  const params = useParams()
  const user = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    const { reason } = Object.fromEntries(new FormData(e.target))

    cancelAppointment({ ...params, byDoctor: user.role === 'doctor', reason })
      .then(() => {
        toast('Cita cancelada correctamente.')
        closeModal()
      })
      .catch((err) => {
        console.log({ err })
        toast('Ocurrió un error al cancelar la cita.')
        setStatus(null)
      })
  }

  return (
    <ModalBackground closeModal={closeModal}>
      <form
        onSubmit={handleSubmit}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}>
        <h2>¿Estás seguro que deseas cancelar la cita?</h2>
        <p>Si cancelas la cita, no podrás volver a agendarla.</p>

        <label htmlFor='reason'>Motivo de cancelación</label>
        <InputWUnderline id='reason' name='reason' autoFocus required />
        <button type='submit' disabled={status === 'loading'}>
          {status === null ? (
            'Cancelar cita'
          ) : (
            <Spinner style={{ width: 8, height: 8, borderWidth: 1 }} />
          )}
        </button>
      </form>
    </ModalBackground>
  )
}
