import { useCallback, useMemo, useState } from 'react'
import { useModalLogic } from '../../../hooks/useModalLogic'
import { InputWUnderline } from '../../common/input-w-underline/input-w-underline'
import styles from './appointment-modal.module.css'
import { createAppointment } from '../../../firebase/utils/appointment'
import { useUser } from '../../../hooks/useUser'
import { Spinner } from '../../spinner/spinner'
import { toast } from 'react-toastify'

export function AppointmentModal({ closeModal, selectedPatient }) {
  const [status, setStatus] = useState(null) // null | loading | error | success

  useModalLogic({ closeModal, scroll: true })
  const user = useUser()

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setStatus('loading')

      const content = Object.fromEntries(new FormData(e.target))
      const { date } = content
      if (new Date(date) < Date.now()) {
        toast.error('La fecha de creación debe ser posterior a la actual')
        setStatus(null)
        return
      }

      const doctor = selectedPatient?.medico_asignado
      const patient = selectedPatient

      const doctorData = {
        id: doctor?.id,
        nombre: doctor?.nombre,
        apellido: doctor?.apellido,
        image: doctor?.image?.src ?? null,
      }
      const patientData = {
        id: patient?.id,
        nombre: patient?.nombre,
        apellido: patient?.apellido,
        image: patient?.image?.src ?? null,
      }

      const setByAdmin = user.role === 'admin'

      createAppointment({ content, patientData, doctorData, setByAdmin })
        .then(() => {
          setStatus(null)
          toast('La cita se ha creado correctamente')
        })
        .catch((err) => {
          console.log({ err })
          toast.error('Ha ocurrido un error al crear la cita')
          setStatus('error')
        })
    },
    [selectedPatient],
  )
  const hasNoDoctor = useMemo(() => {
    return !selectedPatient.medico_asignado
  }, [selectedPatient])

  return (
    <div
      id='modalBackground'
      onClick={closeModal}
      className={styles.modalBackground}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.name}>
          {selectedPatient.nombre} {selectedPatient.apellido}
        </span>
        <h3>Agendar cita</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor='fecha'>Fecha y hora</label>
              <InputWUnderline
                type='datetime-local'
                autoFocus={!hasNoDoctor}
                id='date'
                name='date'
                required
                style={{ outline: 'none', padding: '2px 5px' }}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='title'>Titulo / Motivo</label>
              <InputWUnderline
                type='text'
                id='title'
                name='title'
                required
                style={{ outline: 'none', padding: '2px 5px' }}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='description'>Descripción</label>
            <InputWUnderline
              type='description'
              id='description'
              name='description'
              textarea
              rows={3}
              style={{
                outline: 'none',
                padding: '2px 5px',
                resize: 'none',
                width: '100%',
                height: '100%',
              }}
            />
          </div>

          {user.role === 'admin' && (
            <p className={styles.advise}>
              Al crear esta cita se le asignará automáticamente al profesional
              asignado del paciente: {selectedPatient.medico_asignado.nombre}{' '}
              {selectedPatient.medico_asignado.apellido}
            </p>
          )}
          <button
            type='submit'
            disabled={
              hasNoDoctor || status === 'loading' || status === 'success'
            }
            className={styles.submit}>
            Enviar
          </button>
        </form>
        {status === 'loading' && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}
        {hasNoDoctor && (
          <div className={styles.noDoctor}>
            Este paciente no tiene un profesional asignado al que se le pueda
            agendar esta cita, por favor asígnele uno antes.
          </div>
        )}
      </div>
    </div>
  )
}
