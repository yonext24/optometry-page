import { AsignacionDashboard } from '../../../components/dashboard/asignacion-dashboard/asignacion-dashboard'
import styles from './asignacion.module.css'

export function Asignacion () {
  return <section className={styles.pageSection}>
    <h1>Asignación de pacientes</h1>
    <AsignacionDashboard />
  </section>
}
