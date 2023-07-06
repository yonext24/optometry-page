import styles from './asignacion-dashboard.module.css'

export function TableError({ err, refetch }) {
  return (
    <div className={styles.errorContainer}>
      <span>Ocurrió un error, {err}</span>
      <button onClick={refetch}>Volver a intentar</button>
    </div>
  )
}
