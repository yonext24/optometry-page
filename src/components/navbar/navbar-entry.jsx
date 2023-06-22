import { Link } from 'react-router-dom'

export function NavbarEntry ({ name, href }) {
  return <Link to={href}>

    <span>{name}</span>

  </Link>
}
