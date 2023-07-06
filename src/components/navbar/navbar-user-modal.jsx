/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import styles from './navbar.module.css'
import { cerrarSesion } from '../../firebase/utils/user'
import { useUser } from '../../hooks/useUser'

export function NavbarUserModal() {
  const user = useUser()
  const handleClick = async () => {
    await cerrarSesion()
  }
  const magicString =
    user.role === 'patient'
      ? 'paciente'
      : user.role === 'doctor'
      ? 'doctor'
      : 'admin'
  return (
    <div className={styles.userModal}>
      <Link to={`/${magicString}/${user.id}`}>Mi perfil</Link>
      <button onClick={handleClick}>Cerrar Sesión</button>
    </div>
  )
}
