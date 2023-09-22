import { useEffect, useState } from 'react'
import { iniciarSesion } from '../../firebase/auth'
import styles from './login.module.css'
import { Spinner } from '../../components/spinner/spinner'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { cerrarSesion } from '../../firebase/utils/user'
import { useModal } from '../../hooks/useModal'
import { RecoverModal } from '../../components/modals/recover-modal/recover-modal'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const user = useUser()

  const { openModal, closeModal, isOpen } = useModal()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setLoading(true)

    const data = new FormData(e.target)
    const { email, password } = Object.fromEntries(data)

    iniciarSesion(String(email), String(password))
      .catch((err) => {
        console.log(err)
        if (
          [
            'auth/invalid-email',
            'auth/wrong-password',
            'auth/user-not-found',
          ].includes(err.code)
        ) {
          setError('Email o contraseña inválidos.')
        } else setError('Error al iniciar sesión')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (user) {
      if (!user.active) {
        cerrarSesion()
        setError('Tu cuenta está desactivada, no puedes iniciar sesión.')
      } else {
        navigate('/')
      }
    }
  }, [user])

  return (
    <>
      <main className={styles.main}>
        <section className={styles.sectionForm}>
          <form onSubmit={handleSubmit}>
            <h1>Inicia Sesión</h1>
            <p>Introduce tus datos de inicio de sesión</p>
            <div className={styles.inputs}>
              <div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoFocus
                  placeholder='Email...'
                />
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Contraseña...'
                />
              </div>
            </div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
            <button
              className={styles.recover}
              type='button'
              onClick={openModal}>
              No recuerdas tu contraseña?
            </button>
            <button type='submit'>
              {loading ? (
                <Spinner
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: 'var(--azul-oscuro)',
                    borderBottomColor: 'transparent',
                  }}
                />
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </section>
        <section className={styles.sectionLogo}>
          <img src='/logo.webp' width={400} height={74} />
        </section>
      </main>
      {isOpen && <RecoverModal closeModal={closeModal} />}
    </>
  )
}
