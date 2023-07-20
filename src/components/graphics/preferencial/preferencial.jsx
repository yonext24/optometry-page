import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Table } from 'react-bootstrap'
import styles from './preferencial.module.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ResultsContext } from '../../../contexts/ResultsContext'

export function PreferencialGraphic() {
  const [processedData, setProcessedData] = useState([])
  const [chartData, setChartData] = useState([])
  const [vAndR, setVAndR] = useState({})

  const { state } = useContext(ResultsContext)

  const document = useMemo(() => {
    const data = state.graphic_open
    const keys = Object.keys(data).sort()
    const vKeys = keys.filter((key) => key.startsWith('v'))
    const rKeys = keys.filter((key) => key.startsWith('R'))

    const newData = {
      id: data.id,
      CPCM: data.CPCM,
      CPD: data.CPD,
    }
    vKeys.forEach((vKey) => {
      newData[vKey] = data[vKey]
    })
    rKeys.forEach((rKey) => {
      newData[rKey] = data[rKey]
    })

    return newData
  }, [state.graphic_open])

  useEffect(() => {
    if (document && Object.keys(document).length > 0) {
      const { CPCM, CPD, ...rest } = document

      const vKeys = Object.keys(rest).filter((key) => key.startsWith('v'))
      const v1 = Object.values(rest).find((value) => Array.isArray(value))

      let processedRows = []
      if (v1) {
        processedRows = v1.map((_, index) => {
          let coincidenceCount = 0

          vKeys.forEach((vKey) => {
            if (rest[vKey][index] === rest[`R${vKey.substring(1)}`][index]) {
              coincidenceCount++
            }
          })

          return {
            index: index + 1,
            coincidenceCount,
            CPCM: CPCM[index],
            CPD: CPD[index],
          }
        })
      }
      const chartData = (processedRows || []).map((_, index) => ({
        index: index + 1,
        CPCM: CPCM[index],
        coincidenceCount: processedRows[index]['coincidenceCount'],
      }))

      setVAndR(rest)
      setProcessedData(processedRows)
      setChartData(chartData)
    }
  }, [document])

  const CustomizedDot = (props) => {
    const { cx, cy, payload } = props
    const coincidenceCount = payload.coincidenceCount
    let fill
    if (coincidenceCount === 0) {
      fill = '#FE3333'
    } else if (coincidenceCount === 1) {
      fill = '#FE6433'
    } else if (coincidenceCount === 2) {
      fill = '#FEA233'
    } else if (coincidenceCount === 3) {
      fill = '#C0FE33'
    } else if (coincidenceCount === 4) {
      fill = '#67FE33'
    } else if (coincidenceCount === 5) {
      fill = '#5ED934'
    } else if (coincidenceCount === 6) {
      fill = '#2CBF2E'
    } else if (coincidenceCount === 7) {
      fill = '#04FF00 '
    } else {
      fill = 'white'
    }

    return <circle cx={cx} cy={cy} r={2} stroke={fill} strokeWidth={3} />
  }
  return (
    <div className={styles.App}>
      <div className={styles.content}>
        {chartData && (
          <div className={styles.chartContainer}>
            <ResponsiveContainer
              className={styles.chart}
              width='100%'
              height={400}>
              <LineChart
                key={Date.now()} // Asegúrate de que este componente se vuelva a renderizar cuando los datos cambien
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='index' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='CPCM'
                  stroke='#8884d8'
                  dot={<CustomizedDot />}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className={styles.tableContainer}>
          {document && (
            <Table
              className={
                styles.table + ' ' + styles.striped + ' ' + styles.bordere
              }>
              <thead>
                <tr>
                  <th>Índice</th>
                  {(Object.keys(document) || []).map((column) => {
                    if (column !== 'id' && column !== 'idd') {
                      return <th key={column}>{column}</th>
                    } else {
                      return null
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  { length: (document?.v1 || []).length },
                  (_, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {(Object.entries(document) || []).map(
                        ([column, data]) => {
                          if (column !== 'id' && column !== 'idd') {
                            const value = Array.isArray(data) ? data[index] : ''
                            if (column === 'CPD' && typeof value === 'number') {
                              const roundedValue = value.toFixed(3)
                              return <td key={column}>{roundedValue}</td>
                            } else {
                              return <td key={column}>{value}</td>
                            }
                          } else {
                            return null
                          }
                        },
                      )}
                    </tr>
                  ),
                )}
              </tbody>
            </Table>
          )}
        </div>

        <div className={styles.tableContainer}>
          {document && (
            <div>
              <Table className={styles.table} striped bordered>
                <thead>
                  <tr>
                    <th>Índice</th>
                    <th>Coincidencias</th>
                    <th>CPCM</th>
                    <th>CPD</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    (Array.isArray(processedData) ? processedData : []) || []
                  ).map((row) => {
                    const halfCount = (Object.keys(vAndR).length - 2) / 2 / 2

                    return (
                      <tr
                        key={row.index}
                        className={
                          row.coincidenceCount >= halfCount
                            ? styles.greenRow
                            : ''
                        }>
                        <td>{row.index}</td>
                        <td>{row.coincidenceCount}</td>
                        <td>{row.CPCM}</td>
                        <td>{row.CPD.toFixed(3)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
