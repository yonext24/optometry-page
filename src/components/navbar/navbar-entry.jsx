import styles from './navbar.module.css'
import { Link } from 'react-router-dom'

export function NavbarEntry ({ name, href }) {
  return <Link to={href} className={styles.entry}>

    <span>{name}</span>

  </Link>
}
