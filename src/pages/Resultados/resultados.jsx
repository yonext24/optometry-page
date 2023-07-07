import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import styles from './resultados.module.css'
import { USER_POSSIBLE_STATES } from '../../utils/user-possible-states'
import { useEffect, useState } from 'react'
import { Spinner } from '../../components/spinner/spinner'
import { getUser } from '../../firebase/utils/user'
import { OpacidadGraphic } from '../../components/graphics/opacidad/opacidad'
import { PreferencialGraphic } from '../../components/graphics/preferencial/preferencial'

export function Resultados() {
  const [loading, setLoading] = useState(false)
  const [pageUser, setPageUser] = useState(null)
  const [error, setError] = useState(null)

  const [selectedTest, setSelectedTest] = useState('contraste')

  const loggedUser = useUser()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN) return
    if (loggedUser === USER_POSSIBLE_STATES.NOT_LOGGED)
      navigate('/login', { replace: true })

    if (
      loggedUser.role === 'patient' &&
      loggedUser.id !== params.id &&
      loggedUser.role !== 'doctor' &&
      loggedUser.role !== 'admin'
    ) {
      navigate('/', { replace: false })
    }
  }, [loggedUser])

  useEffect(() => {
    if (
      loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN ||
      loggedUser === USER_POSSIBLE_STATES.NOT_LOGGED
    )
      return
    setLoading(true)
    getUser(params.id, 'patient')
      .then(setPageUser)
      .catch((err) => {
        const errMessage = err instanceof Error ? err.message : err
        setError(errMessage)
      })
      .finally(() => setLoading(false))
  }, [loggedUser])

  if (loggedUser === USER_POSSIBLE_STATES.NOT_KNOWN || loading) {
    return (
      <div className={styles.loadingUser}>
        <Spinner
          style={{
            color: 'var(--azul-profundo)',
            width: 20,
            height: 20,
            borderWidth: '2px',
          }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.loadingUser}>
        <span style={{ color: 'red' }}>{error}</span>
      </div>
    )
  }
  console.log({ pageUser })

  return (
    <main className={styles.main}>
      <header>
        {pageUser && pageUser.deberes?.contraste && (
          <button
            data-selected={selectedTest === 'contraste'}
            onClick={() => setSelectedTest('contraste')}>
            Test Contraste
          </button>
        )}
        {pageUser && pageUser.deberes?.preferencial && (
          <button
            data-selected={selectedTest === 'preferencial'}
            onClick={() => setSelectedTest('preferencial')}>
            Test Mirada Preferencial
          </button>
        )}
      </header>
      <section className={styles.dataSection}>
        {pageUser && Object.values(pageUser?.deberes).some((el) => el) ? (
          selectedTest === 'contraste' ? (
            <OpacidadGraphic user={pageUser} />
          ) : (
            <PreferencialGraphic user={pageUser} />
          )
        ) : (
          <>
            {pageUser?.id === loggedUser?.id ? (
              pageUser.documento === '' ? (
                <Link
                  style={{ textAlign: 'center' }}
                  to={`/paciente/${loggedUser.id}`}>
                  Para acceder a los tests tienes que tener configurado tu
                  número de DNI, accede clickeando aquí.
                </Link>
              ) : (
                <span style={{ textAlign: 'center' }}>
                  No tienes ningún test asignado aún.
                </span>
              )
            ) : (
              <span style={{ textAlign: 'center' }}>
                El usuario no tiene ningún test asignado o no tiene asignado su
                número de dni.
              </span>
            )}
          </>
        )}
      </section>
    </main>
  )
}
