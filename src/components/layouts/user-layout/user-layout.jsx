import { Link, useLocation, useParams } from 'react-router-dom'
import styles from './user-layout.module.css'
import { useMemo } from 'react'

export function UserLayout({ children, isRelative = false }) {
  const location = useLocation()
  const params = useParams()

  const routesMatches = useMemo(() => {
    return isRelative
      ? {
          resultados: location.pathname === `/paciente/${params.id}/resultados`,
          deberes: location.pathname === `/paciente/${params.id}/deberes`,
          perfil: location.pathname === `/paciente/${params.id}`,
        }
      : {}
  }, [isRelative, location, params])

  return (
    <>
      <header className={styles.menu}>
        <Link
          className={`${styles.menuEntry} ${
            routesMatches.resultados ? styles.selected : ''
          }`}
          to={`/paciente/${isRelative ? `${params.id}/` : ''}resultados`}
        >
          Resultados
        </Link>
        <Link
          className={`${styles.menuEntry} ${
            routesMatches.deberes ? styles.selected : ''
          }`}
          to={`/paciente/${isRelative ? `${params.id}/` : ''}deberes`}
        >
          Deberes
        </Link>
        <Link
          className={`${styles.menuEntry} ${
            routesMatches.perfil ? styles.selected : ''
          }`}
          to={`/paciente${isRelative ? `/${params.id}` : ''}`}
        >
          Perfil
        </Link>
      </header>
      {children}
    </>
  )
}
