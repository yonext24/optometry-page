import React, { useState, useEffect, useContext } from 'react'
import { Table } from 'react-bootstrap'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import styles from './opacidad.module.css'
import { ResultsContext } from '../../../contexts/ResultsContext'

export function OpacidadGraphic() {
  const [chartData, setChartData] = useState([])
  const [minx, setMinx] = useState(null)
  const [maxx, setMaxx] = useState(null)
  const [umbralNEstimulosAcertados, setUmbralNEstimulosAcertados] = useState(0)
  const COLORS = [
    '#FE3333',
    '#FE6433',
    '#FEA233',
    '#C0FE33',
    '#67FE33',
    '#5ED934',
    '#2CBF2E',
    '#04FF00',
  ]

  const { state } = useContext(ResultsContext)

  useEffect(() => {
    const max = Math.max(...state.graphic_open.NEstimulosAcertados)
    setUmbralNEstimulosAcertados(max / 2)
    const { ...rest } = state.graphic_open

    const Contraste = rest.Contraste
    const Filtro = rest.Filtro
    const NEstimulosAcertados = rest.NEstimulosAcertados
    const chartData = (Contraste || []).map((_, index) => ({
      index: index + 1,
      Contraste: Contraste[index],
      Filtro: Filtro[index],
      NEstimulosAcertados: NEstimulosAcertados[index],
    }))

    setChartData(chartData)
  }, [state.selected_test])

  useEffect(() => {
    const maxX = Math.max(...chartData.map((data) => data.Filtro))
    const minX = Math.min(...chartData.map((data) => data.Filtro))
    setMaxx(maxX)
    setMinx(minX)
  }, [chartData])

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <div className={styles.chart + ' ' + styles.container}>
          {chartData && (
            <ResponsiveContainer
              className={styles.chart}
              width='100%'
              height={400}>
              <ScatterChart
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  ticks={[-5, 1, 5, 10, 15]}
                  type='number'
                  dataKey='Filtro'
                  name='filtro'
                  unit=''
                  domain={[minx, maxx]}
                />
                <YAxis
                  type='number'
                  dataKey='Contraste'
                  name='contraste'
                  unit=''
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name='A data' data={chartData}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.NEstimulosAcertados % COLORS.length]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className={styles.table + ' ' + styles.container}>
          <div className={styles.table + ' ' + styles.container}>
            {state.graphic_open && (
              <Table
                className={
                  styles.table + ' ' + styles.striped + ' ' + styles.border
                }>
                <thead>
                  <tr>
                    <th>Índice</th>
                    <th>Tamaño</th>
                    <th>NEstimulos</th>
                    <th>NEstimulosAcertados</th>
                    <th>Filtro</th>
                    <th>Contraste</th>
                  </tr>
                </thead>
                <tbody>
                  {state.graphic_open['Tamaño'].map((_, index) => {
                    const nEstimulosAcertados =
                      state.graphic_open.NEstimulosAcertados[index]
                    const isHighlighted =
                      nEstimulosAcertados > umbralNEstimulosAcertados
                    const rowClassName = isHighlighted ? 'highlighted-row' : ''
                    return (
                      <tr key={index} className={styles[rowClassName]}>
                        <td>{index + 1}</td>
                        <td>{state.graphic_open['Tamaño'][index]}</td>
                        <td>{state.graphic_open.NEstimulos[index]}</td>
                        <td>{nEstimulosAcertados}</td>
                        <td>{state.graphic_open.Filtro[index]}</td>
                        <td>{state.graphic_open.Contraste[index]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
