import styles from './pacientes.module.css'

export function PacienteRow ({ apellido, email, nombre, active, handleClick, isSelected }) {
  return <tr className={isSelected ? styles.selected : ''} onClick={handleClick}>
    <td className={styles.nombre}>{nombre} {apellido}</td>
    <td className={styles.email}>{email}</td>
    <td className={styles.status} data-text={active ? 'Activo' : 'No Activo'} >{active ? 'Activo' : 'No Activo'}</td>

  </tr>
}
