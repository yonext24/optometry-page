import { useContext } from 'react'
import { ResultsRow } from './results-row'
import styles from './results-table.module.css'
import { ResultsContext } from '../../../contexts/ResultsContext'
import { Spinner } from '../../spinner/spinner'

export function ResultsTable() {
  const { state } = useContext(ResultsContext)

  if (state.data.loading) {
    return (
      <div className={styles.tableSkeleton}>
        <Spinner style={{ height: 15, width: 15, borderWidth: 2 }} />
      </div>
    )
  }
  if (state.data.error)
    return (
      <div className={styles.tableSkeleton} style={{ color: 'red' }}>
        {state.data.error}
      </div>
    )

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>FECHA</td>
            <td>NOMBRE</td>
            <td>DATOS</td>
            <td>NOTA DE REVISIÓN</td>
          </tr>
        </thead>
        <tbody>
          {state.data?.data?.map((el) => {
            if (el === undefined) return null
            return <ResultsRow key={el.id} data={el} />
          })}
        </tbody>
      </table>
    </div>
  )
}