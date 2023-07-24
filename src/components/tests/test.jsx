import { useUser } from '../../hooks/useUser'
import styles from './test.module.css'

export function Test({ name, desc, download, onClick, slug, deassign, src }) {
  const user = useUser()

  return (
    <article className={styles.test1}>
      <header>{name}</header>
      <p>{desc}</p>
      <div className={styles.buttonsContainer}>
        {download ? (
          <>
            <a target='_blank' rel='noreferrer' href={src}>
              Descargar
            </a>
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
