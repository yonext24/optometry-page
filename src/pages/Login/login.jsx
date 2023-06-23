import { useState } from 'react'
import { iniciarSesion } from '../../firebase/auth'
import styles from './login.module.css'
import { Spinner } from '../../components/spinner/spinner'

export function Login () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    setLoading(true)

    const data = new FormData(e.target)
    const { email, password } = Object.fromEntries(data)
    console.log({ email, password })

    iniciarSesion(String(email), String(password))
      .catch(err => {
        console.log(err)
        if (['auth/invalid-email', 'auth/wrong-password'].includes(err.code)) {
          setError('Email inválido')
        } else setError('Error al iniciar sesión')
      })
      .finally(() => { setLoading(false) })
  }

  return <main className={styles.main}>
    <section className={styles.sectionForm}>
      <form onSubmit={handleSubmit}>
        <h1>Inicia Sesión</h1>
        <p>Introduce tus datos de inicio de sesión</p>
        <div className={styles.inputs}>
          <div>
            <input id='email' name='email' type='email' placeholder='Email...' />
            <input id='password' name='password' type='password' placeholder='Contraseña...' />
          </div>
        </div>
        <div className={styles.error}>
          {
            error && <span>{error}</span>
          }
        </div>
        <button type='submit'>
          {
            loading
              ? <Spinner style={{ width: 20, height: 20, borderColor: 'var(--azul-oscuro)', borderBottomColor: 'transparent' }} />
              : 'Iniciar sesión'
          }
        </button>
      </form>
    </section>
    <section className={styles.sectionLogo}>
      <img src='/logo.webp' width={400} height={74} />
    </section>
  </main>
}
