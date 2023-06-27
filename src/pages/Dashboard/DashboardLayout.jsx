// import styles from './dashboard.module.css'
import { AdminDashboardMenu } from '../../components/dashboard/admin-dashboard-menu'

export function DashboardLayout ({ children }) {
  return <main>
    <AdminDashboardMenu />
    {children}
  </main>
}
