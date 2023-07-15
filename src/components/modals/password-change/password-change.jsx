import { useEffect, useState } from 'react'
import styles from './password-change.module.css'
import { PasswordModal } from '../password-modal/password-modal'

export function PasswordChange({ closeModal, id }) {
  const [passwordChanging, setPasswordChanging] = useState(false)

  useEffect(() => {
    localStorage.setItem('pass-setted', 'true')
  }, [])
  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <img className={styles.logo} src='/logo.webp' height={35} />
          <p>Puedes cambiar tu contraseña en cualquier momento</p>
          <div className={styles.buttons}>
            <button onClick={closeModal}>Cancelar</button>
            <button onClick={() => setPasswordChanging(true)}>Cambiar</button>
          </div>
        </div>
      </div>
      {passwordChanging && (
        <PasswordModal closeModal={closeModal} closeAtEnd id={id} />
      )}
    </>
  )
}
