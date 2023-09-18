import { useModalLogic } from '../../../hooks/useModalLogic'
import { InputWUnderline } from '../../common/input-w-underline/input-w-underline'
import styles from './appointment-modal.module.css'

export function AppointmentModal({ closeModal, selectedPatient }) {
  useModalLogic({ closeModal, scroll: true })

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
        <form className={styles.form}>
          <div className={styles.doubleInput}>
            <div className={styles.formGroup}>
              <label htmlFor='fecha'>Fecha y hora</label>
              <InputWUnderline
                type='datetime-local'
                id='date'
                style={{ outline: 'none', padding: '2px 5px' }}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='title'>Titulo / Motivo</label>
              <InputWUnderline
                type='text'
                autoFocus
                id='title'
                style={{ outline: 'none', padding: '2px 5px' }}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='description'>Descripción</label>
            <InputWUnderline
              type='description'
              id='description'
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

          <button type='submit' className={styles.submit}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
