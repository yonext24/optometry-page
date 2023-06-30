import styles from './usuario.module.css'
import { USER_POSSIBLE_STATES } from '../../utils/user-possible-states'
import { Spinner } from '../../components/spinner/spinner'
import { useUser } from '../../hooks/useUser'
import { UserProfile } from '../../components/user-profile/user-profile'
import { useParams } from 'react-router-dom'

export function Usuario () {
  const user = useUser()
  const params = useParams()

  if (user === USER_POSSIBLE_STATES.NOT_KNOWN) {
    return <div className={styles.loadingUser}>
        <Spinner style={{ color: 'var(--azul-profundo)', width: 20, height: 20, borderWidth: '2px' }} />
      </div>
  }

  return <main className={styles.main}>
    <UserProfile id={params.id} />
  </main>
}
