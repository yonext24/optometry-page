import { useUser } from '../../hooks/useUser'
import styles from './test.module.css'

export function Test({ name, desc, download, onClick, slug, deassign }) {
  const user = useUser()

  return (
    <article className={styles.test1}>
      <header>{name}</header>
      <p>{desc}</p>
      <div className={styles.buttonsContainer}>
        {download ? (
          <>
            <button>Descargar</button>
            {(user.role === 'admin' || user.role === 'doctor') && (
              <button onClick={() => deassign(slug)}>Quitar</button>
            )}
          </>
        ) : (
          <button onClick={() => onClick(slug)}>Asignar</button>
        )}
      </div>
    </article>
  )
}
