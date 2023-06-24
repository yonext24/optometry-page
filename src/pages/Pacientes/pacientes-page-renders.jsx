import { Menu } from '../../components/menu/menu'
import { PacientesAdmin } from '../../components/tablas/pacientes/pacientes-admin'
import styles from './pacientes-page.module.css'

export function PacientesPageAdminRender () {
  return <>
      <Menu />
      <section className={styles.tableSection}>
        <h1 className={styles.heading}>Todos los pacientes</h1>
        <PacientesAdmin />
      </section>
    </>
}
